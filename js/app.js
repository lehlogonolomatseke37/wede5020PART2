/* =====================================================================
   app.js — site-wide behaviour shared by all five pages
   NeighbourlySpace · WEDE5020 Part 3
   Loaded with `defer` on every page, so the DOM is ready when it runs.
   ===================================================================== */

(function () {
    'use strict';

    /* Respect the visitor's reduced-motion setting: every animation in
       this file checks this once instead of animating and apologising. */
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------------------------------------------------------------
       1. Mobile navigation
       The menu still works without JavaScript (CSS checkbox hack from
       Part 2). JavaScript only adds the conveniences a checkbox cannot:
       closing on Escape, on outside clicks and after following a link.
       --------------------------------------------------------------- */
    function initNav() {
        var toggle = document.getElementById('nav-toggle');
        if (!toggle) return;

        var nav = document.querySelector('.site-header');

        function close() { toggle.checked = false; }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && toggle.checked) {
                close();
                document.querySelector('.nav-toggle-label').focus();
            }
        });

        document.addEventListener('click', function (e) {
            if (!toggle.checked) return;
            if (!nav.contains(e.target)) close();
        });

        nav.querySelectorAll('.nav-links a').forEach(function (link) {
            link.addEventListener('click', close);
        });
    }

    /* ---------------------------------------------------------------
       2. Scroll-reveal animations
       IntersectionObserver fires once per element, then stops watching
       it — cheaper than listening to every scroll event.
       --------------------------------------------------------------- */
    function initReveal() {
        var targets = document.querySelectorAll('.section-head, .card, .work-card, .step, .stat');
        if (!targets.length) return;

        if (reduceMotion || !('IntersectionObserver' in window)) {
            targets.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }

        targets.forEach(function (el) { el.classList.add('reveal'); });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

        targets.forEach(function (el) { observer.observe(el); });
    }

    /* ---------------------------------------------------------------
       3. Animated statistics
       Counts an element's number up from zero the first time it is seen.
       The final value lives in the HTML, so the figure is still correct
       when JavaScript is unavailable.
       --------------------------------------------------------------- */
    function initCounters() {
        var counters = document.querySelectorAll('[data-count-to]');
        if (!counters.length || !('IntersectionObserver' in window)) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                countUp(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.5 });

        counters.forEach(function (el) { observer.observe(el); });

        function countUp(el) {
            var target = parseFloat(el.getAttribute('data-count-to'));
            var suffix = el.getAttribute('data-count-suffix') || '';
            var duration = 1200;

            if (reduceMotion) { el.textContent = format(target) + suffix; return; }

            var start = performance.now();
            requestAnimationFrame(function step(now) {
                var progress = Math.min((now - start) / duration, 1);
                /* ease-out cubic: fast at first, settles gently */
                var eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = format(target * eased) + suffix;
                if (progress < 1) requestAnimationFrame(step);
            });
        }

        function format(value) {
            return Number.isInteger(value) ? String(Math.round(value)) : Math.round(value).toString();
        }
    }

    /* ---------------------------------------------------------------
       4. Modal dialog
       One dialog element per page is reused by every opener. Focus is
       trapped while it is open and returned to the opener on close,
       which is what makes a modal usable with a keyboard.
       --------------------------------------------------------------- */
    var modal = {
        el: null,
        lastFocused: null,

        init: function () {
            this.el = document.getElementById('site-modal');
            if (!this.el) return;

            var self = this;

            this.el.addEventListener('click', function (e) {
                if (e.target === self.el || e.target.hasAttribute('data-modal-close')) self.close();
            });

            document.addEventListener('keydown', function (e) {
                if (!self.isOpen()) return;
                if (e.key === 'Escape') self.close();
                if (e.key === 'Tab') self.trapFocus(e);
            });
        },

        isOpen: function () { return this.el && this.el.classList.contains('is-open'); },

        open: function (title, bodyHTML) {
            if (!this.el) return;
            this.lastFocused = document.activeElement;
            this.el.querySelector('.modal-title').textContent = title;
            this.el.querySelector('.modal-body').innerHTML = bodyHTML;
            this.el.hidden = false;
            this.el.classList.add('is-open');
            document.body.classList.add('has-modal');
            this.el.querySelector('.modal-close').focus();
        },

        close: function () {
            if (!this.el) return;
            this.el.classList.remove('is-open');
            this.el.hidden = true;
            document.body.classList.remove('has-modal');
            if (this.lastFocused) this.lastFocused.focus();
        },

        trapFocus: function (e) {
            var focusable = this.el.querySelectorAll('button, [href], input, select, textarea');
            if (!focusable.length) return;
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
    };

    /* ---------------------------------------------------------------
       5. Helpers shared with the other scripts
       escapeHTML is the security boundary: anything a visitor types is
       passed through it before it is written back into the page, so a
       pasted <script> tag is displayed rather than executed.
       --------------------------------------------------------------- */
    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, function (ch) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
    }

    /* Published for the page-specific scripts that load after this one. */
    window.NS = {
        modal: modal,
        escapeHTML: escapeHTML,
        reduceMotion: reduceMotion
    };

    /* ---------------------------------------------------------------
       6. Start everything
       --------------------------------------------------------------- */
    document.documentElement.classList.add('js');
    initNav();
    initReveal();
    initCounters();
    modal.init();
})();
