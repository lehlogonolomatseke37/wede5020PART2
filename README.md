# NeighbourlySpace Website

Portfolio of Evidence (POE) for **WEDE5020: Web Development (Introduction)**, The Independent Institute of Education (IIE).

| | |
|---|---|
| **Student** | Lehlogonolo Matseke |
| **Student number** | ST10531956 |
| **Module** | WEDE5020 |
| **Current stage** | Part 3: Enhancing Functionality and SEO (JavaScript, forms and deployment) |
| **Live website** | https://lehlogonolomatseke37.github.io/wede5020PART2/ |
| **Organisation** | NeighbourlySpace, a platform connecting residents of gated communities and neighbourhoods across Alberton and Gauteng with vetted local service providers |

---

## Contents

1. [Project overview](#1-project-overview)
2. [Pages and site structure](#2-pages-and-site-structure)
3. [Part 2 summary](#3-part-2-summary)
4. [Brand identity and design system](#4-brand-identity-and-design-system)
5. [CSS styling for the desktop solution](#5-css-styling-for-the-desktop-solution)
6. [Responsive design](#6-responsive-design)
7. [Part 3 summary: JavaScript functionality](#7-part-3-summary-javascript-functionality)
8. [Search engine optimisation](#8-search-engine-optimisation)
9. [Forms, validation and processing](#9-forms-validation-and-processing)
10. [Deployment](#10-deployment)
11. [Testing](#11-testing)
12. [Screenshot evidence](#12-screenshot-evidence)
13. [Changelog](#13-changelog)
14. [References](#14-references)

---

## 1. Project overview

NeighbourlySpace helps residents inside estates find trusted plumbers, electricians, gardeners, cleaners and other local professionals. Bookings are handled over WhatsApp while the NeighbourlySpace app is being built, so every call-to-action on the site opens a `wa.me` link with a pre-filled message.

The brief for the project is set out in The Independent Institute of Education (2026), and the organisation's name, services and brand come from the NeighbourlySpace (2026) website. The project is built in three parts:

| Part | Focus | Status |
|---|---|---|
| Part 1 | Proposal, research, wireframes and semantic HTML structure | Complete (see the Part 1 entry in the [changelog](#13-changelog)) |
| Part 2 | External CSS, visual design and responsive layouts | Complete (98%) |
| Part 3 | JavaScript functionality, forms, SEO and deployment | **This submission** |

## 2. Pages and site structure

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, community and areas served, how it works, services summary, blog preview, FAQ |
| About | `about.html` | Our story, vision and mission, what we offer, coverage |
| Services | `services.html` | All 8 service categories, each with its own WhatsApp request link |
| Enquiry | `enquiry.html` | Service request form (name, email, phone, service type, message) |
| Contact Us | `contact-us.html` | WhatsApp number, areas served, location, two embedded maps, short contact form, provider call-to-action |

Every page shares the same header, primary navigation and footer, so every page links to every other page.

```
Website/
├── index.html
├── about.html
├── services.html
├── enquiry.html
├── contact-us.html
├── css/
│   └── style.css              # the single external stylesheet
├── images/
│   ├── favicon.png
│   ├── logo.png               # logo mark, PNG fallback
│   ├── logo-mark-48.webp      # logo mark, 1x
│   ├── logo-mark-96.webp      # logo mark, 2x (retina)
│   ├── logo-full.png          # full logo, PNG fallback
│   ├── logo-full-460.webp
│   ├── logo-full-920.webp
│   ├── hero-phone-mockup.png  # hero mockup, PNG fallback
│   ├── hero-phone-mockup-320.webp
│   ├── hero-phone-mockup-480.webp
│   ├── hero-phone-mockup-640.webp
│   └── work-*.jpg / work-*-480.webp / -800.webp / -1200.webp   # Recent Work photos
├── screenshots/               # desktop, tablet and mobile evidence
├── .gitignore
├── CHANGELOG.md
└── README.md
```

## 3. Part 2 summary

- Created one external stylesheet, `css/style.css`, and linked it from all five pages.
- Restyled the whole site in the NeighbourlySpace brand identity: blue gradient heroes, orange and green accents from the logo, the Inter typeface, pill-shaped labels and rounded cards.
- The homepage follows the approved NeighbourlySpace design. The About, Services, Enquiry and Contact Us pages were designed from the same components so the site reads as one brand.
- Added a CSS reset and base styles, a typography scale, Grid and Flexbox layouts, and hover, focus and active states.
- Made the site responsive at three breakpoints (1024px, 768px, 480px), including a CSS-only hamburger menu.
- Replaced the Part 1 images with responsive WebP sets that use `srcset`, `sizes` and `<picture>`, with PNG fallbacks.
- Worked through a self-review of Part 1 and fixed the issues it found (see [Changelog](#13-changelog)).
- **No JavaScript was added.** The FAQ accordion uses native `<details>` and `<summary>`, and the mobile menu uses the checkbox technique (Coyier, 2011). JavaScript is kept for Part 3.

## 4. Brand identity and design system

All brand values are CSS custom properties in `:root`, so every page inherits them through the cascade.

| Token | Value | Use |
|---|---|---|
| `--blue` / `--blue-deep` | `#0B4EA2` / `#083A7C` | Header, hero gradients, focus labels |
| `--orange` | `#FF6A3D` | Primary buttons, active-page dot, focus rings (logo house) |
| `--green` / `--green-deep` | `#22C55E` / `#16A34A` | WhatsApp actions, check marks (logo chat bubble) |
| `--dark` | `#0A0A0A` | Headings, dark cards and banners |
| `--light` | `#F7F8FB` | Light sections, form fields, pills |
| `--text` / `--muted` | `#2A2A2A` / `#6B6B6B` | Body copy and supporting text |

**Typography:** Inter (Andersson, 2026), served through Google Fonts, at weights 400 to 800. The type scale runs from `--fs-xs` (0.75rem) to `--fs-3xl` (3.4rem), with line heights of 1.1 for headings and 1.6 for body text.

**Shape:** radii of 0.875rem, 1.375rem and 1.75rem, plus pill (999px) buttons and labels.

## 5. CSS styling for the desktop solution

`style.css` is written desktop-first and split into 15 commented sections. A table of contents sits at the top of the file.

### 5.1 External stylesheet
- One file, `css/style.css`, linked in the `<head>` of all five pages with `<link rel="stylesheet" href="css/style.css">`.
- Naming convention: lower-case, hyphenated class names that describe what a component is (`.site-header`, `.service-card`, `.cta-dark`), plus modifier classes (`.btn-primary`, `.btn-whatsapp`).
- No inline `style` attributes or `<style>` blocks. This was checked with `html-validate` using the `no-inline-style` rule.

### 5.2 Base styles and CSS reset
- The reset (adapted from Bell, 2023) applies `box-sizing: border-box`, removes default margins and padding, makes images responsive, makes form controls inherit the font, and removes list and link defaults.
- Base styles set the font family, font size, line height, text colour and background on `body`, heading weights, `::selection` colours and a visible `:focus-visible` outline.

### 5.3 Typography
- `font-family`, `font-size`, `font-weight`, `line-height` and `letter-spacing` are set through tokens, so text is consistent across pages.
- Uppercase labels use wide letter-spacing, and headings use slightly negative tracking for a tighter look.
- Page titles use `clamp()` so they scale smoothly between breakpoints.

### 5.4 Layout structure
- **CSS Grid** (MDN Web Docs, 2026a): hero (`.hero-grid`), community cards (`.impact-grid`), steps (`.hiw-steps`), services (`.services-grid`), blog, FAQ, enquiry form (`.form-grid`) and footer.
- **`grid-template-areas`:** the footer (`"brand product services company support"`) and each How It Works step. The responsive layouts only rearrange these area maps.
- **Flexbox** (MDN Web Docs, 2026b): header, navigation, buttons, banners, cards and the FAQ list, using `display`, `flex-direction`, `justify-content`, `align-items`, `gap` and `flex-wrap`.
- A shared `.container` (`width: min(75rem, 92%)`) and `.section` spacing keep all pages aligned.

### 5.5 Visual styles
- `color`, `background-color`, `linear-gradient` and `radial-gradient` backgrounds, `border`, `border-radius` and `box-shadow` on cards, banners and inputs.
- Decorative glows on the inner-page heroes are drawn with `::before` and `::after`, with no extra images.

### 5.6 Pseudo-classes and pseudo-elements

The pseudo-classes below follow MDN Web Docs (2026d). The `:user-invalid` and `:user-valid` states, which only apply after the visitor has interacted with a field, follow MDN Web Docs (2026e).

| Selector | Where it is used |
|---|---|
| `:hover` | Buttons lift, cards raise with a shadow, nav and footer links, service chips, FAQ questions |
| `:focus-visible` / `:focus` | Keyboard focus rings on all interactive elements, skip link, form fields |
| `:active` | Buttons press down |
| `:focus-within` | Form label turns blue while its field is active; cards lift when their link is focused |
| `:checked` | Opens the mobile menu and animates the hamburger into an X |
| `:user-invalid` / `:user-valid` | Red or green field borders, shown only after the user interacts |
| `:has()` | Adds a `*` to labels of required fields only |
| `:target` | Highlights the service card a footer link jumped to (for example `services.html#pool`) |
| `:nth-child()` | Colour-codes service and offer icons without extra classes |
| `:first-child` / `:last-child` / `:not()` | Removes borders and spacing at list edges; hides the arrow after the last step |
| `::before` / `::after` | Arrows on links, hamburger bars, CSS counters on the enquiry steps, decorative glows |
| `::placeholder`, `::selection`, `::marker` | Placeholder colour, text-selection colour, hidden `<details>` marker |
| `[aria-current="page"]` | Highlights the current page in the navigation |

### 5.7 Using the cascade with few selectors
- Shared base classes (`.btn`, `.card`, `.section-head`, `.eyebrow`) set most properties once. Small modifiers change only what differs.
- Custom properties (MDN Web Docs, 2026f) are redefined inside media queries (for example `--fs-2xl` and `--section-pad`), so every heading and section updates without new selectors.

## 6. Responsive design

### 6.1 Breakpoints

The breakpoints are written as media queries (MDN Web Docs, 2026c).

| Breakpoint | Devices | Main changes |
|---|---|---|
| Default (above 1024px) | Laptops and desktops | Multi-column layouts, full navigation with header CTA, floating hero cards |
| `max-width: 1024px` | Tablets (landscape) | 3 to 2 column grids, steps become text-and-preview rows, header CTA hidden, smaller type scale |
| `max-width: 768px` | Tablets (portrait), large phones | Hamburger menu, single-column hero, stacked banners, 2-column footer |
| `max-width: 480px` | Mobile phones | Single-column grids and forms, full-width buttons, smaller headings and padding |

### 6.2 Adjustments at each breakpoint
- **Layout:** multi-column grids (4, 3 and 2 columns) collapse to fewer columns. The footer grid areas are re-mapped.
- **Typography:** type-scale tokens shrink at each breakpoint, and manual `<br>` breaks in headings are hidden on small screens.
- **Navigation:** the header CTA is hidden at 1024px. At 768px the menu becomes a CSS-only hamburger with a slide-down panel that stays keyboard accessible.
- **Images:** the hero mockup shrinks from 18.75rem to 15rem to 13rem, matching the `sizes` attribute.

### 6.3 Relative units
- `rem` for font sizes, spacing, radii and component sizes. `em` for button padding and icon sizes, so they scale with the button text.
- `%`, `vw` and `min()` for widths (for example `.container` uses `min(75rem, 92%)`), and `fr` units in grids.

### 6.4 Responsive images

The `<picture>`, `srcset` and `sizes` approach below follows Keith (2021) and MDN Web Docs (2026g).
- The hero mockup uses `<picture>` with a WebP `srcset` (320w, 480w and 640w) and a `sizes` attribute, so a phone downloads about 20KB instead of the 344KB PNG fallback.
- The logo mark uses density descriptors (`1x`, `2x`) for sharp display on retina screens.
- The five Recent Work photographs each use `<picture>` with WebP at 480w, 800w and 1200w, a `sizes` attribute matching the gallery columns (92vw on mobile, 44vw on tablet, 22vw on desktop) and a JPEG fallback.
- Images include `width` and `height` to prevent layout shift. Below-the-fold images use `loading="lazy"`.

## 7. Part 3 summary: JavaScript functionality

Part 3 adds behaviour to the site that CSS alone cannot provide: interactive components, a searchable service catalogue, client-side form validation and processing, search engine optimisation, and a deployed public website.

### 7.1 Folder and file structure

```
ST10531956_Part3_Website/
├── index.html
├── about.html
├── services.html
├── enquiry.html
├── contact-us.html
├── robots.txt
├── sitemap.xml
├── css/
│   ├── style.css            (sections 1–16, Part 3 components in section 16)
│   └── vendor/
│       ├── leaflet.css      (Leaflet 1.9.4, bundled with the site)
│       └── images/          (Leaflet's own UI images)
├── js/
│   ├── app.js               (site-wide: navigation, animations, counters, modal)
│   ├── home.js              (homepage article feed with tabs and pagination)
│   ├── services.js          (service catalogue: search, filter, sort, details modal)
│   ├── gallery.js           (Recent Work lightbox)
│   ├── forms.js             (validation, enquiry processing, contact email)
│   ├── maps.js              (interactive service-area map)
│   └── vendor/
│       └── leaflet.js       (Leaflet 1.9.4, bundled with the site)
├── images/                  (brand assets and job photographs, responsive sizes)
├── test/
│   └── smoke.py             (Playwright functional checks)
└── screenshots/             (evidence for this document)
```

### 7.2 Scripts and what each one does

| File | Page(s) | Responsibility |
|---|---|---|
| `app.js` | All five | Menu conveniences (Escape, outside click, link close), scroll-reveal animations, animated statistics, the shared modal dialog, and the `escapeHTML` helper every other script uses |
| `home.js` | `index.html` | Renders the article feed from data, filters it with ARIA tabs, pages through it with "Load more" |
| `services.js` | `services.html` | Renders the eight service categories from data; live search, category filters, four sort orders, and a details dialog per category |
| `gallery.js` | `services.html` | Turns the Recent Work photographs into a lightbox with keyboard, button and swipe navigation |
| `forms.js` | `enquiry.html`, `contact-us.html` | Field-level validation, the enquiry response, and compiling the contact message into an email |
| `maps.js` | `contact-us.html` | Draws the interactive service-area map, its markers, popups and coverage radius |

### 7.3 Interactive elements

- **Modal dialog** — opening a service category shows what it covers, the call-out price, the typical response and how many times it was requested this year. Focus moves into the dialog, is trapped while it is open, and returns to the button that opened it. Escape and the backdrop both close it.
- **Tabs** — the homepage article feed uses the ARIA tab pattern (W3C, 2024): one tab is focusable at a time and the left and right arrow keys move between them.
- **Accordion** — the FAQ continues to use native `<details>`/`<summary>` from Part 2 (MDN Web Docs, 2026h), which needs no JavaScript at all.
- **Animations** — sections and cards fade and rise into view through `IntersectionObserver` (MDN Web Docs, 2026i), which stops observing each element once it has appeared. The four headline statistics count up from zero with an ease-out curve. Every animation is skipped when the visitor has `prefers-reduced-motion: reduce` set (MDN Web Docs, 2026l).
- **DOM manipulation** — the service grid, article feed, dialog contents, lightbox, map markers and both form responses are all built in JavaScript and inserted as `DocumentFragment`s (MDN Web Docs, 2026k), so the browser lays out the page once per update rather than once per card.

### 7.4 Interactive map

`maps.js` replaces the Part 2 Google Maps `<iframe>` embeds with a Leaflet map (Agafonkin, 2024) covering all six service suburbs:

- A marker for every suburb, each with a popup naming the work done there and linking to the enquiry form.
- A 12 km coverage circle in the brand orange, centred on Alberton.
- Markers drawn as CSS shapes in the brand colours rather than Leaflet's default blue image.
- Suburb buttons beside the map that fly the map to a suburb and open its popup, so the map can be driven from the keyboard.
- Scroll-wheel zoom stays off until the map is clicked, so the page keeps scrolling normally when a visitor scrolls past it.

Map tiles and data are provided by OpenStreetMap contributors (2026). Leaflet is **bundled into the repository** (`js/vendor/`, `css/vendor/`) rather than loaded from a CDN, so the map still works when the site is opened from disk or on a restricted network.

### 7.5 Dynamic content and search

The service catalogue is held as data in `services.js` and rendered at runtime:

- **Search** — matches the category name, its description and everything it covers; debounced by 180 ms so a fast typist triggers one render, not one per keystroke.
- **Filter** — chips for all categories, inside the home, outdoors and security.
- **Sort** — most requested, A–Z, fastest response, and lowest call-out.
- **Result count and empty state** — both announced with `role="status"` so screen readers hear the list change.

The article feed on the homepage is rendered the same way, filtered by tabs and extended three at a time.

Data is kept in JavaScript arrays rather than a fetched JSON file on purpose: `fetch()` is blocked by browser security on `file://`, so a marker opening the site directly from the unzipped folder would see an empty page. Every dynamic list also has its full static version inside `<noscript>`, so content is never lost when JavaScript is unavailable.

## 8. Search engine optimisation

### 8.1 On-page SEO

| Element | Implementation |
|---|---|
| Title tags | Written to the guidance in Google (2026a): unique per page, keyword-led and under 60 characters where possible, for example *Our Services \| Plumbing, Electrical, Garden, Cleaning & Security* |
| Meta description | Unique per page, 150–160 characters, written to be read by a human in a results page rather than stuffed with keywords |
| Meta keywords | Per-page keyword sets built around the service plus the suburb, for example *gate motor repairs, CCTV installation Alberton* |
| Heading hierarchy | One `<h1>` per page, `<h2>` per section, `<h3>` per card — unchanged from Part 1 and still valid |
| Image names and alt text | Descriptive file names (`work-gate-motor-install.jpg`, not `IMG_2043.jpg`) and alt text that describes the job in the photograph |
| Internal linking | Every service card links to the enquiry form; map popups link to the enquiry form; the footer links to all five pages |
| Canonical URLs | `<link rel="canonical">` on every page, naming the deployed URL |
| Structured data | JSON-LD `LocalBusiness` (Schema.org, 2026; Google, 2026b) on the homepage and contact page: name, area served, opening hours, price range and contact details |
| Mobile friendliness | Responsive layouts from Part 2, verified at ten widths from 320 px to 1440 px |
| Page speed | WebP images with `srcset`, `loading="lazy"`, `width`/`height` on every image, one stylesheet, deferred scripts, no blocking third-party requests |

### 8.2 Off-page and technical SEO

- **`robots.txt`** — allows crawling of the site, keeps the coursework `screenshots/` folder and the bundled vendor libraries out of the index, and points to the sitemap.
- **`sitemap.xml`** (Sitemaps.org, 2016) — all five pages with `lastmod`, `changefreq` and `priority`, served from the site root.
- **Open Graph and Twitter cards** — title, description and image per page, so links shared to WhatsApp or social media show a proper preview card.
- **Local SEO** — suburb names appear in titles, descriptions, keywords, page content and the structured data, which is what local search ranks on.
- **Security** — every external link carries `rel="noopener"`; all visitor input is passed through `escapeHTML()` before it is written back into the page, so markup typed into a form is displayed rather than executed.

## 9. Forms, validation and processing

Both forms keep their HTML5 attributes (`required`, `type`, `pattern`, `minlength`, `maxlength`) as a baseline, with JavaScript validation added on top (MDN Web Docs, 2026j). `forms.js` then sets `novalidate` at runtime so the browser's default bubbles step aside for messages that name the field and say how to fix it.

### 9.1 Validation rules

| Field | Rule |
|---|---|
| Name | 2–60 characters, letters, spaces, apostrophes and hyphens |
| Email | Must contain a local part, `@`, a domain and a 2+ character top-level domain |
| Phone | South African format only: `0XX XXX XXXX` or `+27 XX XXX XXXX`, spaces, hyphens and brackets allowed |
| Service / urgency / message type | A selection must be made |
| Preferred date | A real date, today or later, no more than 90 days ahead |
| Message | 20–600 characters, with a live character counter that turns red past the limit |

Validation runs when a field loses focus, and then on every keystroke **only after** that field has already been marked invalid, so nobody is told they are wrong mid-word. Invalid fields get `aria-invalid="true"`, a red border and a message in a `role="alert"` paragraph; on submit the first invalid field is focused and scrolled into view.

### 9.2 Enquiry form processing

Once the enquiry form validates, the page replaces it with a processed response:

- A reference number built from the service and the timestamp, for example `NS-SEC-2210-120749`.
- The service and priority chosen.
- An **indicative cost range**, calculated from the price band for that service multiplied by an urgency factor (emergency ×1.35, urgent ×1.15, standard ×1).
- The preferred date, echoed back in full.
- A **call-back deadline** calculated from the urgency: 3 hours for an emergency, 24 for urgent, 72 for standard.
- Buttons to follow up on WhatsApp with the reference pre-filled, or to send another request.

### 9.3 Contact form processing

The contact form compiles the input into an email addressed to the business:

- Subject: `[message type] Website message from [name]`.
- Body: the visitor's message, then their name, email, phone, message type, the source of the message and the date.
- The compiled email is previewed on the page, then the **Open and send the email** button hands it to the visitor's own mail application through a `mailto:` link (MDN Web Docs, 2026m), addressed to `neighbourlyspace@gmail.com` (set once as `CONTACT_EMAIL` at the top of `js/forms.js`).
- Nothing is transmitted until the visitor presses send in their own mail app, and alternatives are offered: send on WhatsApp, or go back and edit.

## 10. Deployment

The website is deployed on **GitHub Pages**, which serves the `main` branch of the repository as a static site.

| | |
|---|---|
| **Live URL** | https://lehlogonolomatseke37.github.io/wede5020PART2/ |
| **Platform** | GitHub Pages (free static hosting) |
| **Source** | `main` branch, root folder |
| **Build** | None — the site is plain HTML, CSS and JavaScript, so the files are served exactly as they are in the repository |

Deployment steps: **Repository → Settings → Pages → Source: Deploy from a branch → Branch: `main` / root → Save.** The site is live a minute or two later at the URL above.

All asset paths are relative (`css/style.css`, `js/app.js`, `images/...`), so the site works from a subfolder URL, from the repository root, and from the unzipped folder on disk without changes.

## 11. Testing

| Check | Tool | Result |
|---|---|---|
| Layout on different devices | Chrome DevTools Device Mode (Basques and Emelianova, 2024) and Playwright device emulation (MacBook Air 1440px, iPad Mini, iPhone 13, Pixel 7) | No horizontal scrolling at 1440, 1024, 820, 768, 390 or 320px |
| HTML validity and no inline styles | `html-validate` (recommended rules plus `no-inline-style`) | 0 errors on all 5 pages |
| CSS errors | `stylelint` (unknown properties, pseudo-classes, units, duplicate selectors) | 0 errors |
| Mobile menu | Opened and closed by mouse and keyboard (Tab, then Space) | Works without JavaScript |
| Form states | Invalid email and valid name entered | Red and green borders shown after interaction only |

### Part 3 testing

| Check | Tool | Result |
|---|---|---|
| JavaScript errors on every page | Playwright (Chromium), console and `pageerror` listeners | 0 errors, 0 failed requests across all five pages |
| Dynamic rendering | Automated: count cards after render | 8 of 8 service categories rendered |
| Search | Automated: search "gate motor" | 1 result (Security), result count updated |
| Filter | Automated: filter "Outdoors" | 3 results (garden, pool, painting) |
| Sort | Automated: sort A–Z | First card "Cleaning" |
| Details modal | Automated: open, then press Escape | Opens with the right title, closes on Escape, focus returns to the button |
| Gallery lightbox | Automated: open, press Next | Opens at "1 of 5", advances to "2 of 5" |
| Form validation | Automated: submit empty, then with bad email, phone, past date and 5-character message | 6 errors on empty submit; a specific message for each invalid field |
| Enquiry processing | Automated: submit a valid request | Response panel with reference, indicative cost and call-back deadline |
| Contact email | Automated: submit a valid message | `mailto:neighbourlyspace@gmail.com` link compiled with subject and body |
| Interactive map | Automated: count markers and suburb buttons | 6 markers, 6 suburb buttons, popups open |
| Input escaping | Automated: submit `<img src=x onerror=alert(1)>` in the message | Displayed as text; 0 elements injected into the page |
| Layout at every breakpoint | Automated: 1440, 1280, 1024, 900, 820, 768, 600, 480, 390, 320 px on all 5 pages | No horizontal overflow anywhere (50 combinations) |
| Keyboard reachability | Automated: list focusable elements on the services page | Search box, 4 filter chips, 8 detail buttons and 5 gallery triggers all reachable |
| HTML validity | `html-validate` | 0 errors on all 5 pages |
| CSS errors | `stylelint` | 0 errors in the Part 3 stylesheet section |
| Without JavaScript | Scripts disabled in the browser | Every page still renders in full: the `<noscript>` service list, the `<noscript>` article list, the embedded map fallback, and HTML5 form validation all take over |

The functional checks above are in `test/smoke.py`, which serves the site locally, drives Chromium through Playwright and exits non-zero if any check fails. Run it from the project root with `python3 test/smoke.py` (needs `pip install playwright` and `playwright install chromium`). The layout screenshots in `screenshots/` were captured with Playwright device emulation.

## 12. Screenshot evidence

All screenshots are in `screenshots/`. The interactive map appears without its background tiles in these captures because they were taken on a machine with no access to the OpenStreetMap tile servers; the markers, coverage circle and popups are the real thing, and the map tiles load normally in a browser.

### Desktop (MacBook Air, 1440 × 900)
| Home | About | Services |
|---|---|---|
| ![Home desktop](screenshots/index-desktop-macbook-air.jpg) | ![About desktop](screenshots/about-desktop-macbook-air.jpg) | ![Services desktop](screenshots/services-desktop-macbook-air.jpg) |

| Enquiry | Contact Us | Form states |
|---|---|---|
| ![Enquiry desktop](screenshots/enquiry-desktop-macbook-air.jpg) | ![Contact desktop](screenshots/contact-us-desktop-macbook-air.jpg) | ![Form states](screenshots/enquiry-form-states-desktop.jpg) |

Recent Work gallery on the Services page: ![Recent Work gallery](screenshots/services-recent-work-desktop.jpg)

### Tablet (iPad Mini, 768 × 1024)
| Home | About | Services | Enquiry | Contact Us |
|---|---|---|---|---|
| ![Home tablet](screenshots/index-tablet-ipad-mini.jpg) | ![About tablet](screenshots/about-tablet-ipad-mini.jpg) | ![Services tablet](screenshots/services-tablet-ipad-mini.jpg) | ![Enquiry tablet](screenshots/enquiry-tablet-ipad-mini.jpg) | ![Contact tablet](screenshots/contact-us-tablet-ipad-mini.jpg) |

### Mobile (iPhone 13, 390 × 844, and Pixel 7, 412 × 915)
| Home | About | Services | Enquiry | Contact Us | Menu open |
|---|---|---|---|---|---|
| ![Home mobile](screenshots/index-mobile-iphone-13.jpg) | ![About mobile](screenshots/about-mobile-iphone-13.jpg) | ![Services mobile](screenshots/services-mobile-iphone-13.jpg) | ![Enquiry mobile](screenshots/enquiry-mobile-iphone-13.jpg) | ![Contact mobile](screenshots/contact-us-mobile-iphone-13.jpg) | ![Menu open](screenshots/nav-menu-open-mobile-iphone-13.jpg) |

Full homepage on Pixel 7: [screenshots/index-full-mobile-pixel-7.jpg](screenshots/index-full-mobile-pixel-7.jpg)

### Part 3 features

| Service search and filtering | Service details dialog |
|---|---|
| ![Search and filter](screenshots/services-search-filter-desktop.jpg) | ![Details modal](screenshots/services-modal-desktop.jpg) |

| Gallery lightbox | Interactive service-area map |
|---|---|
| ![Gallery lightbox](screenshots/gallery-lightbox-desktop.jpg) | ![Interactive map](screenshots/contact-map-desktop-macbook-air.jpg) |

| Form validation messages | Processed enquiry response |
|---|---|
| ![Validation](screenshots/enquiry-validation-desktop.jpg) | ![Enquiry response](screenshots/enquiry-response-desktop.jpg) |

| Compiled contact email | Article tabs and feed |
|---|---|
| ![Compiled email](screenshots/contact-email-compiled-desktop.jpg) | ![Article tabs](screenshots/home-article-tabs-desktop.jpg) |

| Animated statistics | Filtering on mobile | Map on mobile |
|---|---|---|
| ![Statistics](screenshots/home-stats-counters-desktop.jpg) | ![Filter on mobile](screenshots/services-filter-mobile-iphone-13.jpg) | ![Map on mobile](screenshots/contact-map-mobile-iphone-13.jpg) |

## 13. Changelog

The full history is also kept in [`CHANGELOG.md`](CHANGELOG.md).

### [Part 3: Enhancing Functionality and SEO] 2026-10-22

#### Changed: working through the Part 2 feedback
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

#### Added
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

#### Changed
- The Services page introduction now explains the search, filter and details behaviour rather than only pointing at WhatsApp.
- The Contact page "Find Us" section moved from two map cards to a single map plus a service-area panel, and its heading changed from "Two areas we work in every week" to "Six suburbs we work in every week".
- Every page carries deferred script tags; nothing blocks the first paint.
- Map markers are drawn with CSS in the brand colours instead of Leaflet's default blue image.

#### Decisions
- **No backend.** The brief asks for the contact message to be "compiled and included into an email" that the customer can then send to the recipient in the code. A `mailto:` handoff does exactly that with no server, no third-party key and nothing to pay for, and the visitor can see the message before it leaves their machine.
- **Data in JavaScript, not JSON.** `fetch()` is blocked on `file://`, so a marker opening the site from the unzipped folder would see empty lists. Keeping the data in `.js` files means the site works identically from disk, from GitHub Pages and from a local server.
- **Leaflet bundled, not from a CDN.** The map must work when the site is opened from disk or on a restricted network, and a bundled copy removes a third-party request from the page-speed budget.
- **`<noscript>` fallbacks everywhere content is rendered dynamically.** The full service list, the article list and an embedded map all remain in the HTML, so no content is lost when JavaScript is unavailable.
- **Progressive enhancement over replacement.** The Part 2 CSS-only navigation and the native `<details>` FAQ were left exactly as they were; JavaScript only adds conveniences on top of them.

### [Part 2: Designing the Visuals] 2026-09-16

#### Changed: working through the Part 1 feedback
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

#### Added
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

#### Replaced
- `images/logo.png` and `images/hero-phone-mockup.png` were re-exported at higher quality from the NeighbourlySpace brand files. They now serve as PNG fallbacks for the new WebP versions.

#### Decisions
- **Desktop-first CSS**, because the brief asks for a desktop solution first and then responsive adjustments.
- **No JavaScript in Part 2.** Interactive behaviour uses HTML and CSS only (`<details>`, `:checked`), leaving JavaScript enhancements for Part 3.
- **WhatsApp remains the booking channel.** The enquiry form still posts to `action="#"` until Part 3 adds form handling.
- Colours, type and components were taken from the NeighbourlySpace brand design, so the new pages match the homepage.

### [Part 1: Structure and Content] 2026-08-21

#### Added
- Image assets: resized `logo.png` and `hero-phone-mockup.png`.
- `index.html`, `about.html`, `services.html`, `enquiry.html` and `contact-us.html` with semantic HTML5 structure and real NeighbourlySpace content.
- Shared header, navigation and footer on all five pages.
- Descriptive HTML comments explaining each section.
- `README.md` and `CHANGELOG.md`.

#### Decisions
- No CSS in Part 1 (structure and content only).
- Contact and booking actions use `wa.me` WhatsApp links because bookings are taken over WhatsApp.

## 14. References

Agafonkin, V. 2024. *Leaflet 1.9.4: an open-source JavaScript library for mobile-friendly interactive maps* [software library]. [Online]. Available at: https://leafletjs.com/ [Accessed 22 October 2026].

Andersson, R. 2026. *Inter* [typeface]. Google Fonts. [Online]. Available at: https://fonts.google.com/specimen/Inter [Accessed 16 September 2026].

Basques, K. and Emelianova, S. 2024. *Simulate mobile devices with device mode*. Chrome for Developers. [Online]. Available at: https://developer.chrome.com/docs/devtools/device-mode [Accessed 16 September 2026].

Bell, A. 2023. *A (more) modern CSS reset*. Piccalilli, 18 September 2023. [Online]. Available at: https://piccalil.li/blog/a-more-modern-css-reset/ [Accessed 16 September 2026].

Coyier, C. 2011. *The "checkbox hack" (and things you can do with it)*. CSS-Tricks, 21 December 2011. [Online]. Available at: https://css-tricks.com/the-checkbox-hack/ [Accessed 16 September 2026].

Google. 2026a. *Influencing your title links in search results*. Google Search Central. [Online]. Available at: https://developers.google.com/search/docs/appearance/title-link [Accessed 22 October 2026].

Google. 2026b. *Intro to how structured data markup works*. Google Search Central. [Online]. Available at: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data [Accessed 22 October 2026].

Keith, J. 2021. *Responsive images*. Learn Responsive Design, web.dev. [Online]. Available at: https://web.dev/learn/design/responsive-images [Accessed 16 September 2026].

MDN Web Docs. 2026a. *CSS grid layout*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout [Accessed 16 September 2026].

MDN Web Docs. 2026b. *CSS flexible box layout*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout [Accessed 16 September 2026].

MDN Web Docs. 2026c. *Using media queries*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries [Accessed 16 September 2026].

MDN Web Docs. 2026d. *Pseudo-classes*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes [Accessed 16 September 2026].

MDN Web Docs. 2026e. *:user-invalid*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid [Accessed 16 September 2026].

MDN Web Docs. 2026f. *Using CSS custom properties (variables)*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties [Accessed 16 September 2026].

MDN Web Docs. 2026g. *Using responsive images in HTML*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images [Accessed 16 September 2026].

MDN Web Docs. 2026h. *&lt;details&gt;: The details disclosure element*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details [Accessed 16 September 2026].

MDN Web Docs. 2026i. *Intersection Observer API*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API [Accessed 22 October 2026].

MDN Web Docs. 2026j. *Client-side form validation*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation [Accessed 22 October 2026].

MDN Web Docs. 2026k. *DocumentFragment*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment [Accessed 22 October 2026].

MDN Web Docs. 2026l. *prefers-reduced-motion*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion [Accessed 22 October 2026].

MDN Web Docs. 2026m. *Email links*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks#e-mail_links [Accessed 22 October 2026].

NeighbourlySpace. 2026. *NeighbourlySpace: Home*. [Online]. Available at: https://neighbourlyspace.co.za/ [Accessed 19 August 2026].

OpenStreetMap contributors. 2026. *OpenStreetMap* [map data]. Open Data Commons Open Database License. [Online]. Available at: https://www.openstreetmap.org/copyright [Accessed 22 October 2026].

Schema.org. 2026. *LocalBusiness*. [Online]. Available at: https://schema.org/LocalBusiness [Accessed 22 October 2026].

Sitemaps.org. 2016. *Sitemap protocol 0.9*. [Online]. Available at: https://www.sitemaps.org/protocol.html [Accessed 22 October 2026].

The Independent Institute of Education. 2026. *WEDE5020 Portfolio of Evidence brief*. Johannesburg: The IIE.

W3C. 2024. *ARIA Authoring Practices Guide: tabs pattern*. World Wide Web Consortium. [Online]. Available at: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ [Accessed 22 October 2026].

**Third-party code:** Leaflet 1.9.4 (Agafonkin, 2024) is bundled in `js/vendor/` and `css/vendor/` under the BSD-2-Clause licence, unmodified. Map tiles are served by OpenStreetMap and credited in the map's attribution control. All other JavaScript on the site was written for this project.

**Image and brand assets:** the NeighbourlySpace logo, app mockup and brand design are the organisation's own assets, used with permission. Icons are original inline SVGs drawn for this project.

---

Built by Lehlogonolo Matseke (ST10531956) for the WEDE5020 Portfolio of Evidence.
