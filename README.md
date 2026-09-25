# NeighbourlySpace Website

Portfolio of Evidence (POE) for **WEDE5020: Web Development (Introduction)**, The Independent Institute of Education (IIE).

| | |
|---|---|
| **Student** | Lehlogonolo Matseke |
| **Student number** | ST10531956 |
| **Module** | WEDE5020 |
| **Current stage** | Part 2: Designing the Visuals (CSS Styling and Responsive Design) |
| **Organisation** | NeighbourlySpace, a platform connecting residents of gated communities and neighbourhoods across Alberton and Gauteng with vetted local service providers |

---

## Contents

1. [Project overview](#1-project-overview)
2. [Pages and site structure](#2-pages-and-site-structure)
3. [Part 2 summary](#3-part-2-summary)
4. [Brand identity and design system](#4-brand-identity-and-design-system)
5. [CSS styling for the desktop solution](#5-css-styling-for-the-desktop-solution)
6. [Responsive design](#6-responsive-design)
7. [Testing](#7-testing)
8. [Screenshot evidence](#8-screenshot-evidence)
9. [Changelog](#9-changelog)
10. [References](#10-references)

---

## 1. Project overview

NeighbourlySpace helps residents inside estates find trusted plumbers, electricians, gardeners, cleaners and other local professionals. Bookings are handled over WhatsApp while the NeighbourlySpace app is being built, so every call-to-action on the site opens a `wa.me` link with a pre-filled message.

The project is built in three parts:

| Part | Focus | Status |
|---|---|---|
| Part 1 | Proposal, research, wireframes and semantic HTML structure | Complete (tagged `part-1` in Git) |
| Part 2 | External CSS, visual design and responsive layouts | **This submission** |
| Part 3 | JavaScript functionality, form handling and SEO | Upcoming |

## 2. Pages and site structure

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, community and areas served, how it works, services summary, blog preview, FAQ |
| About | `about.html` | Our story, vision and mission, what we offer, coverage |
| Services | `services.html` | All 8 service categories, each with its own WhatsApp request link |
| Enquiry | `enquiry.html` | Service request form (name, email, phone, service type, message) |
| Contact Us | `contact-us.html` | WhatsApp number, areas served, location, two embedded maps, short contact form, provider call-to-action |

Every page shares the same header, primary navigation and footer, so every page links to every other page (see `../Wireframes/sitemap.png`).

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
- Worked through a self-review of Part 1 and fixed the issues it found (see [Changelog](#9-changelog)).
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

**Typography:** Inter (Google Fonts) at weights 400 to 800. The type scale runs from `--fs-xs` (0.75rem) to `--fs-3xl` (3.4rem), with line heights of 1.1 for headings and 1.6 for body text.

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
- **CSS Grid:** hero (`.hero-grid`), community cards (`.impact-grid`), steps (`.hiw-steps`), services (`.services-grid`), blog, FAQ, enquiry form (`.form-grid`) and footer.
- **`grid-template-areas`:** the footer (`"brand product services company support"`) and each How It Works step. The responsive layouts only rearrange these area maps.
- **Flexbox:** header, navigation, buttons, banners, cards and the FAQ list, using `display`, `flex-direction`, `justify-content`, `align-items`, `gap` and `flex-wrap`.
- A shared `.container` (`width: min(75rem, 92%)`) and `.section` spacing keep all pages aligned.

### 5.5 Visual styles
- `color`, `background-color`, `linear-gradient` and `radial-gradient` backgrounds, `border`, `border-radius` and `box-shadow` on cards, banners and inputs.
- Decorative glows on the inner-page heroes are drawn with `::before` and `::after`, with no extra images.

### 5.6 Pseudo-classes and pseudo-elements

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
- Custom properties are redefined inside media queries (for example `--fs-2xl` and `--section-pad`), so every heading and section updates without new selectors.

## 6. Responsive design

### 6.1 Breakpoints

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
- The hero mockup uses `<picture>` with a WebP `srcset` (320w, 480w and 640w) and a `sizes` attribute, so a phone downloads about 20KB instead of the 344KB PNG fallback.
- The logo mark uses density descriptors (`1x`, `2x`) for sharp display on retina screens.
- The five Recent Work photographs each use `<picture>` with WebP at 480w, 800w and 1200w, a `sizes` attribute matching the gallery columns (92vw on mobile, 44vw on tablet, 22vw on desktop) and a JPEG fallback.
- Images include `width` and `height` to prevent layout shift. Below-the-fold images use `loading="lazy"`.

## 7. Testing

| Check | Tool | Result |
|---|---|---|
| Layout on different devices | Chrome DevTools Device Mode and Playwright device emulation (MacBook Air 1440px, iPad Mini, iPhone 13, Pixel 7) | No horizontal scrolling at 1440, 1024, 820, 768, 390 or 320px |
| HTML validity and no inline styles | `html-validate` (recommended rules plus `no-inline-style`) | 0 errors on all 5 pages |
| CSS errors | `stylelint` (unknown properties, pseudo-classes, units, duplicate selectors) | 0 errors |
| Mobile menu | Opened and closed by mouse and keyboard (Tab, then Space) | Works without JavaScript |
| Form states | Invalid email and valid name entered | Red and green borders shown after interaction only |

## 8. Screenshot evidence

All screenshots are in `screenshots/`. The two map frames on the Contact page appear empty in these captures because the screenshots were taken on a machine without access to Google Maps; they load normally in a browser, and each map also has a text link as a fallback.

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

## 9. Changelog

The full history is also kept in [`CHANGELOG.md`](CHANGELOG.md).

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

## 10. References

Andersson, R. 2026. *Inter* [typeface]. Google Fonts. [Online]. Available at: https://fonts.google.com/specimen/Inter [Accessed 16 September 2026].

Basques, K. and Emelianova, S. 2024. *Simulate mobile devices with device mode*. Chrome for Developers. [Online]. Available at: https://developer.chrome.com/docs/devtools/device-mode [Accessed 16 September 2026].

Bell, A. 2023. *A (more) modern CSS reset*. Piccalilli, 18 September 2023. [Online]. Available at: https://piccalil.li/blog/a-more-modern-css-reset/ [Accessed 16 September 2026].

Coyier, C. 2011. *The "checkbox hack" (and things you can do with it)*. CSS-Tricks, 21 December 2011. [Online]. Available at: https://css-tricks.com/the-checkbox-hack/ [Accessed 16 September 2026].

Keith, J. 2021. *Responsive images*. Learn Responsive Design, web.dev. [Online]. Available at: https://web.dev/learn/design/responsive-images [Accessed 16 September 2026].

MDN Web Docs. 2026a. *CSS grid layout*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout [Accessed 16 September 2026].

MDN Web Docs. 2026b. *CSS flexible box layout*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout [Accessed 16 September 2026].

MDN Web Docs. 2026c. *Using media queries*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries [Accessed 16 September 2026].

MDN Web Docs. 2026d. *Pseudo-classes*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes [Accessed 16 September 2026].

MDN Web Docs. 2026e. *:user-invalid*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid [Accessed 16 September 2026].

MDN Web Docs. 2026f. *Using CSS custom properties (variables)*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties [Accessed 16 September 2026].

MDN Web Docs. 2026g. *Using responsive images in HTML*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images [Accessed 16 September 2026].

MDN Web Docs. 2026h. *&lt;details&gt;: The details disclosure element*. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details [Accessed 16 September 2026].

NeighbourlySpace. 2026. *NeighbourlySpace: Home*. [Online]. Available at: https://neighbourlyspace.co.za/ [Accessed 19 August 2026].

The Independent Institute of Education. 2026. *WEDE5020 Portfolio of Evidence brief*. Johannesburg: The IIE.

**Image and brand assets:** the NeighbourlySpace logo, app mockup and brand design are the organisation's own assets, used with permission. Icons are original inline SVGs drawn for this project.

---

Built by Lehlogonolo Matseke (ST10531956) for the WEDE5020 Portfolio of Evidence.
