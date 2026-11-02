# Changelog

All notable changes to the NeighbourlySpace website are recorded in this file. The format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [Part 3: Enhancing Functionality and SEO] 2026-10-22

### Changed: working through the Part 2 feedback
Part 2 was marked **98/100**. The per-row rubric sheet was no longer available when Part 3 began, so instead of guessing at the two lost marks, the Part 2 submission was re-reviewed row by row against the Part 2 rubric and the Part 3 brief. Everything found is listed below with the change made.

| # | Area reviewed | What the review found | Change made in Part 3 | Files |
|---|---|---|---|---|
| 1 | Maps on the Contact page | The two `<iframe>` embeds were static pictures of a map: no markers, no popups, nothing to interact with, and they only covered two of the six suburbs served. | Replaced with one Leaflet map covering all six suburbs, each with a marker, a popup describing the work done there and a link to the enquiry form, plus a 12 km coverage circle and suburb buttons that fly the map to a location. | `contact-us.html`, `js/maps.js`, `css/style.css` |
| 2 | Services page | The eight categories were hard-coded markup. There was no way to search, filter or sort, and no detail beyond two lines per card. | The catalogue is now rendered from data with live search, category filters, four sort orders, a live result count, an empty state, and a details dialog carrying the call-out price, typical response and what the service covers. | `services.html`, `js/services.js` |
| 3 | Recent Work gallery | Photographs could only be seen at thumbnail size and were not reachable by keyboard. | Each photograph is now a button that opens a lightbox with the 1200 px version, a caption, a counter, previous and next controls, arrow-key and swipe navigation, and focus trapping. | `js/gallery.js`, `css/style.css` |
| 4 | Forms | Validation relied entirely on the browser's built-in bubbles, and submitting did nothing at all — no response, no processing, no email. | Both forms now validate field by field with written messages, and then do something: the enquiry form returns a reference, an indicative cost range and a call-back deadline; the contact form compiles the message into an email to the business. | `enquiry.html`, `contact-us.html`, `js/forms.js` |
| 5 | Contact form fields | The form collected only a name, an email and a message, so there was no way to tell a quote request from a complaint, and no phone number to call back on. | Added an optional phone field with South African number validation and a required message-type selector, both of which feed into the compiled email's subject and body. | `contact-us.html` |
| 6 | SEO | Pages had unique `<title>` tags, but nothing else: no descriptions, no keywords, no canonical URLs, no structured data, no `robots.txt` and no sitemap. | Full per-page meta set (description, keywords, author, robots, canonical), Open Graph and Twitter cards, JSON-LD `LocalBusiness` data, `robots.txt` and `sitemap.xml`. | All pages, `robots.txt`, `sitemap.xml` |
| 7 | Image names and alt text | Audited against the SEO requirement. File names were already descriptive (`work-gate-motor-install.jpg`) and alt text described each job. | No change needed; recorded here as evidence the row was checked rather than assumed. | `images/` |
| 8 | Deployment | The site existed only as files in a repository. | Deployed on GitHub Pages and the live URL added to this README. | — |
| 9 | Accessibility of new components | New interactive components can easily become keyboard traps. | Dialogs trap focus while open and return it to the opener; the result count and empty state are announced with `role="status"`; tabs follow the ARIA tab pattern with arrow-key support; every animation is skipped under `prefers-reduced-motion`. | `js/app.js`, `js/services.js`, `js/home.js` |
| 10 | Security of visitor input | Nothing on the site wrote user input back into the page in Part 2, but Part 3 does in three places. | All visitor input passes through `escapeHTML()` before being written to the DOM, so typed markup is displayed, not executed. Verified with an automated test that submits an `onerror` payload. | `js/app.js`, `js/forms.js` |

### Added
- `js/app.js`: site-wide behaviour — menu conveniences (Escape, outside click, close on link), scroll-reveal animations through `IntersectionObserver`, animated statistics that count up from zero, a reusable modal dialog with focus trapping, and the shared `escapeHTML()` helper.
- `js/services.js`: the service catalogue rendered from data, with debounced search, category filter chips, four sort orders, a live result count, an empty state and a per-service details dialog.
- `js/gallery.js`: the Recent Work lightbox, with keyboard, button and swipe navigation and a WebP-to-JPEG fallback.
- `js/forms.js`: validation rules for names, emails, South African phone numbers, dates and message lengths; enquiry processing with indicative pricing; contact-message compilation into a `mailto:` email.
- `js/maps.js`: the interactive service-area map, its brand-coloured CSS markers, popups, coverage circle and suburb navigation.
- `js/home.js`: the homepage article feed, its ARIA tabs and "Load more" pagination.
- `js/vendor/leaflet.js` and `css/vendor/leaflet.css`: Leaflet 1.9.4, bundled with the site rather than loaded from a CDN.
- Homepage: a statistics strip with four animated figures, and the article feed described above.
- Enquiry page: urgency selector, preferred-date field, live character counter and the processed response panel.
- Contact page: phone and message-type fields, character counter and the compiled-email panel.
- `robots.txt` and `sitemap.xml`.
- Section 16 of `css/style.css`: styles for every Part 3 component, with its own responsive rules at 1024, 768 and 480 px.
- Fifteen new screenshots covering the search, dialog, lightbox, map, validation, processed response, compiled email, tabs and statistics.
- `test/smoke.py`: Playwright test script that checks the forms, search, filter, sort, dialog, lightbox, map, tabs and mobile menu.

### Changed
- The Services page introduction now explains the search, filter and details behaviour rather than only pointing at WhatsApp.
- The Contact page "Find Us" section moved from two map cards to a single map plus a service-area panel, and its heading changed from "Two areas we work in every week" to "Six suburbs we work in every week".
- Every page carries deferred script tags; nothing blocks the first paint.
- Map markers are drawn with CSS in the brand colours instead of Leaflet's default blue image.
- References: every source in the README reference list is now cited in the text where it was used (27 of 27), so the in-text citations and the reference list match. Part 2 earned "Technically correct referencing" on the IIE Technical Referencing Rubric, and Part 3 holds to the same standard.

### Decisions
- **No backend.** The brief asks for the contact message to be "compiled and included into an email" that the customer can then send to the recipient in the code. A `mailto:` handoff does exactly that with no server, no third-party key and nothing to pay for, and the visitor can see the message before it leaves their machine.
- **Data in JavaScript, not JSON.** `fetch()` is blocked on `file://`, so a marker opening the site from the unzipped folder would see empty lists. Keeping the data in `.js` files means the site works identically from disk, from GitHub Pages and from a local server.
- **Leaflet bundled, not from a CDN.** The map must work when the site is opened from disk or on a restricted network, and a bundled copy removes a third-party request from the page-speed budget.
- **`<noscript>` fallbacks everywhere content is rendered dynamically.** The full service list, the article list and an embedded map all remain in the HTML, so no content is lost when JavaScript is unavailable.
- **Progressive enhancement over replacement.** The Part 2 CSS-only navigation and the native `<details>` FAQ were left exactly as they were; JavaScript only adds conveniences on top of them.

## [Part 2: Designing the Visuals] 2026-09-16

### Changed: working through the Part 1 feedback
Part 1 was marked 52/100. The overall feedback read: *"Most of the documents appear to be corrupted."* The cause was that the proposal documents were submitted as Apple Pages (`.pages`) files, which could not be opened by the marker, so the sections inside them scored zero. The planning documents have been re-supplied in Word format outside this repository.

The rubric rows that lost marks on the website itself, and what was changed in Part 2:

| Part 1 rubric row | Mark | Change made in Part 2 |
|---|---|---|
| HTML Tags for Layout | 6/10 | Landmarks tightened: one `<header>` containing the `<nav>`, a single `<main id="main">` per page, `<section>` blocks each opened by a heading, `<article>` for service, offer and work cards, `<figure>`/`<figcaption>` for the Recent Work gallery, `<aside>` for the enquiry sidebar, and a skip link before the header |
| HTML Content Tags | 6/10 | One unique `<h1>` per page with headings running h1 → h2 → h3 in order, every image inside `<picture>` with descriptive `alt` plus `width` and `height`, `aria-current="page"` on the active nav link, and `<label for>` on every form field |
| Sufficient Content Added | 4/5 | New content added: FAQ section, blog preview, services summary, "What happens next" steps on the enquiry page and a Recent Work gallery of five real jobs |
| Page structure per the brief | — | The Contact page now carries the map, more than one location and a contact form that the Part 1 brief asks for, and the About page keeps history, vision and mission |
| Menu / Navigation Links | 3/5 | Navigation rebuilt as a `<ul>` list inside the header, current page marked, sticky on scroll, collapsing to a CSS-only hamburger on small screens, plus a full sitemap footer on every page |
| File and Folder Structure | 3/5 | Added the `css/` folder holding the single stylesheet, and a `screenshots/` folder for evidence, alongside the existing `images/` folder |
| References | 1/5 | A referenced source list in IIE Harvard style added to this README (section 10) |

The self-review carried out before the marks were released found these further issues, all fixed:

| # | Issue found in Part 1 | Change made in Part 2 | Files |
|---|---|---|---|
| 1 | Every page used the same `<h1>NeighbourlySpace</h1>` in the header, and page headings were demoted to `<h2>`. Screen readers and search engines saw five pages with the same main heading. | The site name is now a logo link. Each page has one unique `<h1>` in its hero, followed by `<h2>` and `<h3>` in order. | All pages |
| 2 | Images used inline `style="max-width: 100%; height: auto;"`, which mixes presentation into the HTML. | Inline styles removed. Image sizing now lives in `css/style.css`. `width` and `height` attributes added to stop layout shift. | `index.html`, `about.html` |
| 3 | `services.html` had a comment saying cards were "generated below from services_list", but no such script exists. | Comment rewritten to describe the real markup (8 cards in a CSS Grid with anchor ids). | `services.html` |
| 4 | `about.html` had a comment saying the logo "links back to Home like a favicon would", which is inaccurate. | Comment corrected, and a real favicon added to every page. | `about.html`, all pages |
| 5 | The hero image was wrapped in a WhatsApp link, but its alt text described the picture, not where the link goes. | Link removed from the image. Clear text buttons carry the call-to-action. | `index.html` |
| 6 | Form fields were wrapped in `<p>` tags with `<br>` for line breaks, and the textarea used presentational `rows` and `cols`. | Fields use `.field` containers laid out with CSS Grid. `<br>`, `rows` and `cols` removed. `autocomplete` and placeholder hints added. | `enquiry.html` |
| 7 | The navigation had no accessible name and no current-page indicator. | Navigation is inside the header with `aria-label="Primary"`, and the current page is marked with `aria-current="page"`. | All pages |
| 8 | There was no way for keyboard users to skip the navigation. | "Skip to main content" link added, targeting `<main id="main">`. | All pages |
| 9 | WhatsApp links opened in the same tab, taking visitors off the site. | External links now use `target="_blank" rel="noopener"`. | All pages |
| 10 | The footer only held copyright and contact text, so visitors reaching the bottom of a page had no links. | The footer is now a full sitemap (product, services, company, support) plus contact details. | All pages |
| 11 | Service sections had no ids, so they could not be linked to directly. | Each service card has an id (`#plumbing`, `#pool` and so on) used by the homepage and footer links. | `services.html` |
| 12 | macOS `.DS_Store` files showed as untracked in Git. | `.gitignore` added. | `.gitignore` |
| 13 | The About page had no page-level heading or introduction. | A hero with an `<h1>`, a breadcrumb and an introduction was added. | `about.html` |

### Added
- `css/style.css`: the single external stylesheet (design tokens, reset, typography, layout, components, page styles, responsive rules, reduced-motion support), linked from all five pages.
- Homepage rebuilt to the NeighbourlySpace design: hero with app mockup and floating feature cards, community cards with areas served, How It Works steps with phone previews, services summary, blog preview, dark call-to-action band and FAQ accordion.
- About page: story section with logo card and "gap we saw" list, vision and mission cards, four offer cards and a coverage call-to-action.
- Services page: 8 service cards in a responsive grid with colour-coded icons, WhatsApp request links and a "Don't see what you need?" banner.
- Services page: Recent Work gallery of five photographs of completed jobs, each served as a responsive image set (WebP at 480w, 800w and 1200w with a JPEG fallback) inside `<figure>`/`<figcaption>`.
- Enquiry page: styled two-column form with focus, validation and required-field states, plus a "What happens next" sidebar using CSS counters and a WhatsApp shortcut.
- Contact Us page: WhatsApp, areas served and location cards; two embedded Google Maps for the areas served (with text links as a fallback); a short contact form (name, email, message); and a call-to-action for service providers.
- Responsive breakpoints at 1024px, 768px and 480px, adjusting layout, typography, navigation and images.
- CSS-only hamburger navigation for screens 768px and narrower.
- FAQ accordion using native `<details>` and `<summary>` (no JavaScript).
- Responsive images: WebP sets with `srcset`, `sizes` and `<picture>`, PNG fallbacks, density descriptors for the logo, `loading="lazy"` below the fold.
- Inline SVG icons for services, contact methods and features (these inherit colour through `currentColor`).
- `screenshots/`: desktop, tablet and mobile evidence for every page.
- Google Fonts Inter typeface.

### Replaced
- `images/logo.png` and `images/hero-phone-mockup.png` were re-exported at higher quality from the NeighbourlySpace brand files. They now serve as PNG fallbacks for the new WebP versions.

### Decisions
- **Desktop-first CSS**, because the brief asks for a desktop solution first and then responsive adjustments.
- **No JavaScript in Part 2.** Interactive behaviour uses HTML and CSS only (`<details>`, `:checked`), leaving JavaScript enhancements for Part 3.
- **WhatsApp remains the booking channel.** The enquiry form still posts to `action="#"` until Part 3 adds form handling.
- Colours, type and components were taken from the NeighbourlySpace brand design, so the new pages match the homepage.

## [Part 1: Structure and Content] 2026-08-21

### Added
- Image assets: resized `logo.png` and `hero-phone-mockup.png`.
- `index.html`, `about.html`, `services.html`, `enquiry.html` and `contact-us.html` with semantic HTML5 structure and real NeighbourlySpace content.
- Shared header, navigation and footer on all five pages.
- Descriptive HTML comments explaining each section.
- `README.md` and `CHANGELOG.md`.

### Decisions
- No CSS in Part 1 (structure and content only).
- Contact and booking actions use `wa.me` WhatsApp links because bookings are taken over WhatsApp.
