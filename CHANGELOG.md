# Changelog

All notable changes to the NeighbourlySpace website are recorded in this file. The format loosely follows [Keep a Changelog](https://keepachangelog.com/).

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
