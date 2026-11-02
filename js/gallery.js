/* =====================================================================
   gallery.js — lightbox for the Recent Work gallery (services.html)
   Progressive enhancement: the gallery is a plain responsive grid of
   figures without JavaScript. This script makes each photograph open
   full-size, with keyboard and swipe navigation.
   ===================================================================== */

(function () {
    'use strict';

    var gallery = document.querySelector('.work-grid');
    if (!gallery) return;

    var figures = Array.prototype.slice.call(gallery.querySelectorAll('.work-card'));
    if (!figures.length) return;

    var items = figures.map(function (figure, index) {
        var img = figure.querySelector('img');
        var caption = figure.querySelector('figcaption');

        /* Turn the thumbnail into a real control so it is reachable by
           keyboard and announced as a button, not decoration. */
        var trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.className = 'work-trigger';
        trigger.setAttribute('aria-label', 'Open larger view: ' + img.alt);
        trigger.setAttribute('data-index', String(index));
        figure.insertBefore(trigger, figure.firstChild);
        trigger.appendChild(figure.querySelector('picture'));

        return {
            /* The gallery ships 1200w WebP versions of every photo; the
               JPEG stays as the fallback for browsers without WebP. */
            large: img.src.replace(/\.jpg$/, '-1200.webp'),
            fallback: img.src,
            alt: img.alt,
            caption: caption ? caption.textContent.trim() : ''
        };
    });

    var current = 0;
    var lastFocused = null;
    var box = buildLightbox();
    document.body.appendChild(box.root);

    /* ---------------------------------------------------------------
       Opening and closing
       --------------------------------------------------------------- */
    gallery.addEventListener('click', function (e) {
        var trigger = e.target.closest('.work-trigger');
        if (!trigger) return;
        open(parseInt(trigger.getAttribute('data-index'), 10));
    });

    function open(index) {
        lastFocused = document.activeElement;
        current = index;
        show();
        box.root.classList.add('is-open');
        box.root.setAttribute('aria-hidden', 'false');
        document.body.classList.add('has-modal');
        box.close.focus();
    }

    function close() {
        box.root.classList.remove('is-open');
        box.root.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('has-modal');
        if (lastFocused) lastFocused.focus();
    }

    function step(delta) {
        /* Wraps around in both directions, so the arrows never dead-end. */
        current = (current + delta + items.length) % items.length;
        show();
    }

    function show() {
        var item = items[current];

        box.image.src = item.large;
        box.image.alt = item.alt;
        box.image.onerror = function () {
            box.image.onerror = null;
            box.image.src = item.fallback;      /* no WebP support */
        };

        box.caption.textContent = item.caption;
        box.counter.textContent = (current + 1) + ' of ' + items.length;
    }

    /* ---------------------------------------------------------------
       Keyboard, pointer and touch
       --------------------------------------------------------------- */
    document.addEventListener('keydown', function (e) {
        if (!box.root.classList.contains('is-open')) return;

        if (e.key === 'Escape') close();
        if (e.key === 'ArrowRight') step(1);
        if (e.key === 'ArrowLeft') step(-1);

        if (e.key === 'Tab') {
            var focusable = box.root.querySelectorAll('button');
            var first = focusable[0];
            var last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    box.root.addEventListener('click', function (e) {
        if (e.target === box.root || e.target === box.figure) close();
    });

    box.close.addEventListener('click', close);
    box.prev.addEventListener('click', function () { step(-1); });
    box.next.addEventListener('click', function () { step(1); });

    var touchStartX = 0;
    box.root.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    box.root.addEventListener('touchend', function (e) {
        var delta = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(delta) > 45) step(delta < 0 ? 1 : -1);
    }, { passive: true });

    /* ---------------------------------------------------------------
       Markup
       --------------------------------------------------------------- */
    function buildLightbox() {
        var root = document.createElement('div');
        root.className = 'lightbox';
        root.setAttribute('role', 'dialog');
        root.setAttribute('aria-modal', 'true');
        root.setAttribute('aria-label', 'Photograph viewer');
        root.setAttribute('aria-hidden', 'true');

        root.innerHTML =
            '<button class="lightbox-close" type="button" aria-label="Close viewer">&times;</button>' +
            '<button class="lightbox-nav lightbox-prev" type="button" aria-label="Previous photograph">&#8249;</button>' +
            '<figure class="lightbox-figure">' +
            '<img class="lightbox-image" src="" alt="">' +
            '<figcaption><span class="lightbox-caption"></span>' +
            '<span class="lightbox-counter"></span></figcaption>' +
            '</figure>' +
            '<button class="lightbox-nav lightbox-next" type="button" aria-label="Next photograph">&#8250;</button>';

        return {
            root: root,
            figure: root.querySelector('.lightbox-figure'),
            image: root.querySelector('.lightbox-image'),
            caption: root.querySelector('.lightbox-caption'),
            counter: root.querySelector('.lightbox-counter'),
            close: root.querySelector('.lightbox-close'),
            prev: root.querySelector('.lightbox-prev'),
            next: root.querySelector('.lightbox-next')
        };
    }
})();
