/* =====================================================================
   services.js — dynamic service catalogue for services.html
   Renders the eight categories from data, then filters, searches and
   sorts them in the browser. The static list inside <noscript> is the
   fallback for visitors without JavaScript.
   ===================================================================== */

(function () {
    'use strict';

    var grid = document.getElementById('services-grid');
    if (!grid) return;                      /* not the services page */

    var WHATSAPP = 'https://wa.me/27684570771?text=';

    /* ---------------------------------------------------------------
       1. The data
       Kept in a plain array rather than a fetched JSON file so the page
       also works when opened directly from disk (file://), where fetch
       is blocked by the browser's security policy.
       --------------------------------------------------------------- */
    var SERVICES = [
        {
            id: 'plumbing', name: 'Plumbing', group: 'home', requests: 184, responseHours: 2,
            blurb: 'Leaking taps, blocked drains and general plumbing repairs from vetted local plumbers.',
            includes: ['Leak detection and tap repairs', 'Blocked drains and toilets', 'Geyser and pipe replacements'],
            from: 450, icon: 'M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z M9.5 14.5a2.5 2.5 0 002.5 2.5'
        },
        {
            id: 'electrical', name: 'Electrical', group: 'home', requests: 167, responseHours: 2,
            blurb: 'Certified electricians for repairs, installations and load-shedding-related work.',
            includes: ['Fault finding and repairs', 'Plug, light and DB board work', 'Inverter and backup installations'],
            from: 550, icon: 'M13 2.5L5 13.5h6l-1 8 8-11h-6l1-8z'
        },
        {
            id: 'garden', name: 'Garden Services', group: 'outdoor', requests: 142, responseHours: 24,
            blurb: 'Lawn mowing, hedge trimming and general garden maintenance.',
            includes: ['Lawn mowing and edging', 'Hedge and tree trimming', 'Garden refuse removal'],
            from: 350, icon: 'M5 19c0-8 5-13 14-14-1 9-6 14-14 14z M5 19l7-7'
        },
        {
            id: 'cleaning', name: 'Cleaning', group: 'home', requests: 198, responseHours: 24,
            blurb: 'Trusted home cleaning services for a spotless, well-kept household.',
            includes: ['Standard and deep cleans', 'Post-renovation cleaning', 'Windows and upholstery'],
            from: 400, icon: 'M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z'
        },
        {
            id: 'handyman', name: 'Handyman', group: 'home', requests: 156, responseHours: 24,
            blurb: 'General repairs and odd jobs around the home, big or small.',
            includes: ['Shelving, doors and locks', 'Furniture assembly', 'Small repairs and mounting'],
            from: 300, icon: 'M14.7 6.3a4 4 0 00-5.3 5.3L3.5 17.5a1.5 1.5 0 002.1 2.1l5.9-5.9a4 4 0 005.3-5.3l-2.5 2.5-2.1-.6-.6-2.1 2.5-2.5z'
        },
        {
            id: 'pool', name: 'Pool Services', group: 'outdoor', requests: 88, responseHours: 48,
            blurb: 'Regular pool cleaning and maintenance to keep it swim-ready.',
            includes: ['Weekly cleaning and chemicals', 'Pump and filter servicing', 'Green pool recovery'],
            from: 500, icon: 'M2.5 16c1.6 0 1.6 1.5 3.2 1.5S7.3 16 8.9 16s1.6 1.5 3.2 1.5 1.6-1.5 3.2-1.5 1.6 1.5 3.2 1.5 1.6-1.5 3-1.5 M8 13V5.5a2 2 0 014 0M16 13V5.5a2 2 0 00-4 0 M8 9h8'
        },
        {
            id: 'painting', name: 'Painting', group: 'outdoor', requests: 97, responseHours: 48,
            blurb: 'Interior and exterior painting from experienced local painters.',
            includes: ['Interior rooms and ceilings', 'Exterior walls and roofs', 'Preparation and waterproofing'],
            from: 1200, icon: 'M3 3.5h14v6H3z M17 6.5h2.5V12H11v3 M9.5 15h3v6h-3z'
        },
        {
            id: 'security', name: 'Security', group: 'security', requests: 131, responseHours: 4,
            blurb: 'Installation and maintenance of estate and home security equipment.',
            includes: ['Gate motors and intercoms', 'CCTV and electric fencing', 'Beams and alarm servicing'],
            from: 950, icon: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z M9 12l2 2 4-4'
        }
    ];

    /* ---------------------------------------------------------------
       2. Controls
       --------------------------------------------------------------- */
    var searchInput = document.getElementById('service-search');
    var sortSelect = document.getElementById('service-sort');
    var filterButtons = document.querySelectorAll('[data-filter]');
    var resultCount = document.getElementById('service-result-count');
    var emptyState = document.getElementById('service-empty');

    var state = { query: '', group: 'all', sort: 'popular' };

    /* ---------------------------------------------------------------
       3. Rendering
       The whole list is rebuilt into a DocumentFragment and swapped in
       once, so the browser lays the page out a single time instead of
       once per card.
       --------------------------------------------------------------- */
    function render() {
        var visible = SERVICES.filter(matches).sort(compare);
        var fragment = document.createDocumentFragment();

        visible.forEach(function (service) { fragment.appendChild(buildCard(service)); });

        grid.innerHTML = '';
        grid.appendChild(fragment);

        resultCount.textContent = visible.length === SERVICES.length
            ? 'Showing all ' + SERVICES.length + ' categories'
            : 'Showing ' + visible.length + ' of ' + SERVICES.length + ' categories';

        emptyState.hidden = visible.length > 0;
    }

    function matches(service) {
        var inGroup = state.group === 'all' || service.group === state.group;
        if (!inGroup) return false;
        if (!state.query) return true;

        var haystack = (service.name + ' ' + service.blurb + ' ' + service.includes.join(' ')).toLowerCase();
        return haystack.indexOf(state.query) !== -1;
    }

    function compare(a, b) {
        if (state.sort === 'name') return a.name.localeCompare(b.name);
        if (state.sort === 'response') return a.responseHours - b.responseHours || a.name.localeCompare(b.name);
        if (state.sort === 'price') return a.from - b.from;
        return b.requests - a.requests;                       /* most requested */
    }

    function buildCard(service) {
        var article = document.createElement('article');
        article.className = 'card card-hover service-card is-visible';
        article.id = service.id;

        var paths = service.icon.split(' M').map(function (d, i) {
            return '<path d="' + (i === 0 ? d : 'M' + d) + '"/>';
        }).join('');

        article.innerHTML =
            '<span class="icon-circle"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg></span>' +
            '<h3>' + service.name + '</h3>' +
            '<p>' + service.blurb + '</p>' +
            '<p class="service-meta"><span class="service-price">From R' + service.from + '</span>' +
            '<span class="service-response">' + responseLabel(service) + '</span></p>' +
            '<p class="service-actions">' +
            '<button class="btn btn-ghost btn-sm" type="button" data-details="' + service.id + '">View details</button>' +
            '<a class="link-arrow" href="' + WHATSAPP + encodeURIComponent('Hi NeighbourlySpace, I\'d like to request a ' + service.name.toLowerCase() + ' service') + '" target="_blank" rel="noopener">Request<span class="visually-hidden"> ' + service.name + '</span> on WhatsApp</a>' +
            '</p>';

        return article;
    }

    function responseLabel(service) {
        if (service.responseHours <= 4) return 'Same-day response';
        if (service.responseHours <= 24) return 'Within 24 hours';
        return 'Within 48 hours';
    }

    /* ---------------------------------------------------------------
       4. Details modal
       One listener on the grid handles every button, including cards
       that do not exist yet — the cards are replaced on every render,
       so per-card listeners would have to be re-attached each time.
       --------------------------------------------------------------- */
    grid.addEventListener('click', function (e) {
        var button = e.target.closest('[data-details]');
        if (!button) return;

        var service = SERVICES.filter(function (s) { return s.id === button.getAttribute('data-details'); })[0];
        if (!service) return;

        window.NS.modal.open(service.name, [
            '<p>' + service.blurb + '</p>',
            '<h4>What this usually covers</h4>',
            '<ul class="modal-list"><li>' + service.includes.join('</li><li>') + '</li></ul>',
            '<dl class="modal-facts">',
            '<div><dt>Call-out from</dt><dd>R' + service.from + '</dd></div>',
            '<div><dt>Typical response</dt><dd>' + responseLabel(service) + '</dd></div>',
            '<div><dt>Requests this year</dt><dd>' + service.requests + '</dd></div>',
            '</dl>',
            '<p class="modal-actions"><a class="btn btn-primary" href="enquiry.html?service=' + service.id + '">Request this service</a>',
            '<a class="btn btn-ghost" href="' + WHATSAPP + encodeURIComponent('Hi NeighbourlySpace, I\'d like to request a ' + service.name.toLowerCase() + ' service') + '" target="_blank" rel="noopener">WhatsApp us</a></p>'
        ].join(''));
    });

    /* ---------------------------------------------------------------
       5. Control wiring
       The search box is debounced: it waits for a pause in typing so a
       fast typist triggers one render instead of one per keystroke.
       --------------------------------------------------------------- */
    var debounceTimer;
    searchInput.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () {
            state.query = searchInput.value.trim().toLowerCase();
            render();
        }, 180);
    });

    searchInput.addEventListener('search', function () {
        state.query = searchInput.value.trim().toLowerCase();
        render();
    });

    sortSelect.addEventListener('change', function () {
        state.sort = sortSelect.value;
        render();
    });

    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            state.group = button.getAttribute('data-filter');

            filterButtons.forEach(function (other) {
                var active = other === button;
                other.classList.toggle('is-active', active);
                other.setAttribute('aria-pressed', active ? 'true' : 'false');
            });

            render();
        });
    });

    render();
})();
