/* =====================================================================
   maps.js — interactive service-area map for contact-us.html
   Built with Leaflet and OpenStreetMap tiles. The container holds a
   static fallback (an embedded map and a list of suburbs) which stays
   on screen if Leaflet cannot load, so the page is never left blank.
   ===================================================================== */

(function () {
    'use strict';

    var container = document.getElementById('service-map');
    if (!container) return;

    /* Leaflet is loaded from a CDN. If that request failed — offline, or
       a blocked network — leave the fallback markup alone and stop. */
    if (typeof window.L === 'undefined') {
        container.classList.add('map-fallback-visible');
        return;
    }

    /* ---------------------------------------------------------------
       1. Where we work
       Coordinates are the suburb centres; `base` marks the home suburb.
       --------------------------------------------------------------- */
    var AREAS = [
        { id: 'alberton', name: 'Alberton', lat: -26.2672, lng: 28.1220, base: true, note: 'Our home suburb and the base all professionals work from.' },
        { id: 'meyersdal', name: 'Meyersdal', lat: -26.2833, lng: 28.0833, note: 'Estate work most weekdays, including gate motors and CCTV.' },
        { id: 'brackenhurst', name: 'Brackenhurst', lat: -26.3167, lng: 28.1333, note: 'Plumbing, electrical and garden services across the suburb.' },
        { id: 'new-redruth', name: 'New Redruth', lat: -26.2614, lng: 28.1247, note: 'Same-day call-outs for emergencies.' },
        { id: 'randhart', name: 'Randhart', lat: -26.2878, lng: 28.1289, note: 'Regular pool and garden maintenance rounds.' },
        { id: 'glenvista', name: 'Glenvista', lat: -26.2833, lng: 28.0333, note: 'Security installations and handyman work.' }
    ];

    /* ---------------------------------------------------------------
       2. The map
       --------------------------------------------------------------- */
    var map = L.map(container, {
        scrollWheelZoom: false,          /* so the page still scrolls over the map */
        attributionControl: true
    }).setView([-26.2800, 28.1050], 12);

    /* Tapping or clicking the map enables the wheel, which keeps the
       convenience without hijacking the page scroll. */
    map.on('focus click', function () { map.scrollWheelZoom.enable(); });
    map.on('blur', function () { map.scrollWheelZoom.disable(); });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    }).addTo(map);

    /* The coverage radius, drawn in the brand orange. */
    L.circle([-26.2672, 28.1220], {
        radius: 12000,
        color: '#ff6a3d',
        weight: 1.5,
        fillColor: '#ff6a3d',
        fillOpacity: 0.07
    }).addTo(map);

    var markers = {};

    /* Markers are drawn with CSS instead of Leaflet's default blue PNG,
       so they carry the brand colours and stay sharp on any screen. */
    function pin(area) {
        return L.divIcon({
            className: 'ns-pin' + (area.base ? ' ns-pin-base' : ''),
            html: '<span class="ns-pin-shape"><span class="ns-pin-dot"></span></span>',
            iconSize: [26, 34],
            iconAnchor: [13, 34],
            popupAnchor: [0, -30]
        });
    }

    AREAS.forEach(function (area) {
        var marker = L.marker([area.lat, area.lng], {
            icon: pin(area),
            title: area.name,
            alt: 'Map marker for ' + area.name,
            riseOnHover: true
        }).addTo(map);

        marker.bindPopup(
            '<strong>' + area.name + (area.base ? ' (base)' : '') + '</strong><br>' +
            area.note +
            '<br><a href="enquiry.html?area=' + area.id + '">Request a service here</a>'
        );

        markers[area.id] = marker;
    });

    /* ---------------------------------------------------------------
       3. Suburb list ↔ map
       Each button flies the map to its suburb and opens the popup, so
       the map is usable from the keyboard as well as by dragging.
       --------------------------------------------------------------- */
    var list = document.getElementById('service-area-list');

    if (list) {
        list.innerHTML = AREAS.map(function (area) {
            return '<li><button type="button" class="area-chip' + (area.base ? ' is-base' : '') +
                '" data-area="' + area.id + '">' + area.name +
                (area.base ? '<span class="area-tag">Base</span>' : '') + '</button></li>';
        }).join('');

        list.addEventListener('click', function (e) {
            var button = e.target.closest('[data-area]');
            if (!button) return;

            var area = AREAS.filter(function (a) { return a.id === button.getAttribute('data-area'); })[0];
            if (!area) return;

            map.flyTo([area.lat, area.lng], 14, { duration: window.NS.reduceMotion ? 0 : 0.8 });
            markers[area.id].openPopup();

            list.querySelectorAll('.area-chip').forEach(function (chip) {
                chip.classList.toggle('is-active', chip === button);
            });
        });
    }

    /* Recalculate once everything has settled — Leaflet measures the
       container on creation, and web fonts can change its height after. */
    window.addEventListener('load', function () { map.invalidateSize(); });
})();
