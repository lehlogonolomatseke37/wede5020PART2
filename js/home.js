/* =====================================================================
   home.js — dynamic article feed for the homepage
   The three static cards inside <noscript> remain the no-JavaScript
   view. With JavaScript, the feed is rendered from data, filtered by
   category tabs, and extended by a "Load more" button.
   ===================================================================== */

(function () {
    'use strict';

    var feed = document.getElementById('blog-feed');
    if (!feed) return;

    var PAGE_SIZE = 3;

    /* ---------------------------------------------------------------
       1. The articles
       --------------------------------------------------------------- */
    var POSTS = [
        {
            title: 'Five signs your estate is ready to go digital',
            category: 'Community', cover: 'cover-orange', minutes: 4, date: '2026-09-02',
            summary: 'Paper notice boards and WhatsApp groups only stretch so far. Here is how to tell when your estate has outgrown them.'
        },
        {
            title: 'What to check before hiring a gardener',
            category: 'Home Upkeep', cover: 'cover-green', minutes: 3, date: '2026-08-21',
            summary: 'Five questions that separate a reliable garden service from a once-off call-out you will regret.'
        },
        {
            title: 'How we verify every service provider',
            category: 'Trust & Safety', cover: 'cover-blue', minutes: 5, date: '2026-08-07',
            summary: 'ID checks, references and a trial job — the three steps every professional passes before joining NeighbourlySpace.'
        },
        {
            title: 'Load-shedding: what your electrician wishes you knew',
            category: 'Home Upkeep', cover: 'cover-orange', minutes: 6, date: '2026-07-19',
            summary: 'Surge damage, inverter sizing and the small habits that keep your appliances alive through stage 6.'
        },
        {
            title: 'Why neighbours make the best referrals',
            category: 'Community', cover: 'cover-blue', minutes: 3, date: '2026-07-04',
            summary: 'A recommendation from two houses down beats a search result. We built the platform around that idea.'
        },
        {
            title: 'Gate motor servicing: the 12-month rule',
            category: 'Trust & Safety', cover: 'cover-green', minutes: 4, date: '2026-06-15',
            summary: 'Most gate motor failures are preventable. A yearly service costs a fraction of a replacement.'
        }
    ];

    var tabs = document.querySelectorAll('[data-category]');
    var moreButton = document.getElementById('blog-more');
    var status = document.getElementById('blog-status');

    var state = { category: 'all', shown: PAGE_SIZE };

    /* ---------------------------------------------------------------
       2. Rendering
       --------------------------------------------------------------- */
    function visiblePosts() {
        return POSTS.filter(function (post) {
            return state.category === 'all' || post.category === state.category;
        });
    }

    function render() {
        var matching = visiblePosts();
        var slice = matching.slice(0, state.shown);
        var fragment = document.createDocumentFragment();

        slice.forEach(function (post) { fragment.appendChild(buildCard(post)); });

        feed.innerHTML = '';
        feed.appendChild(fragment);

        status.textContent = 'Showing ' + slice.length + ' of ' + matching.length + ' articles';
        moreButton.hidden = slice.length >= matching.length;
    }

    function buildCard(post) {
        var article = document.createElement('article');
        article.className = 'blog-card is-visible';

        article.innerHTML =
            '<div class="blog-cover ' + post.cover + '" aria-hidden="true"></div>' +
            '<div class="blog-body">' +
            '<p class="cat">' + post.category + '</p>' +
            '<h3>' + post.title + '</h3>' +
            '<p class="blog-summary">' + post.summary + '</p>' +
            '<p class="blog-meta"><time datetime="' + post.date + '">' + formatDate(post.date) + '</time>' +
            '<span>' + post.minutes + ' min read</span></p>' +
            '</div>';

        return article;
    }

    function formatDate(value) {
        return new Date(value + 'T00:00:00').toLocaleDateString('en-ZA', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    }

    /* ---------------------------------------------------------------
       3. Tabs and pagination
       The tabs follow the ARIA tab pattern: one tab is focusable at a
       time and the arrow keys move between them.
       --------------------------------------------------------------- */
    tabs.forEach(function (tab, index) {
        tab.addEventListener('click', function () { activate(index); });

        tab.addEventListener('keydown', function (e) {
            var next = null;
            if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
            if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
            if (next === null) return;

            e.preventDefault();
            activate(next);
            tabs[next].focus();
        });
    });

    function activate(index) {
        state.category = tabs[index].getAttribute('data-category');
        state.shown = PAGE_SIZE;

        tabs.forEach(function (tab, i) {
            var selected = i === index;
            tab.setAttribute('aria-selected', selected ? 'true' : 'false');
            tab.setAttribute('tabindex', selected ? '0' : '-1');
            tab.classList.toggle('is-active', selected);
        });

        render();
    }

    moreButton.addEventListener('click', function () {
        state.shown += PAGE_SIZE;
        render();

        /* Move focus to the first newly added card so keyboard users do
           not lose their place when the list grows. */
        var cards = feed.querySelectorAll('.blog-card');
        var firstNew = cards[state.shown - PAGE_SIZE];
        if (firstNew) {
            firstNew.setAttribute('tabindex', '-1');
            firstNew.focus();
        }
    });

    render();
})();
