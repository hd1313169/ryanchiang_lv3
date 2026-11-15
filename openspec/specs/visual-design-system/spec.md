# visual-design-system Specification

## Purpose

Defines the site-wide look, feel, and interaction rules every page must conform to, so the site itself demonstrates the restrained, detail-oriented judgment the owner wants to be known for.

## Requirements

### Requirement: Grayscale-only color palette
The system SHALL restrict all UI color to the following tokens: background `#FFFFFF`, primary text `#1A1A1A`, secondary text `#6B6B6B`, border/divider `#B0B0B0`, block background `#F2F2F2`. No other hue SHALL appear anywhere in the UI, including links, which SHALL use the dark-gray text color rather than a distinct link color.

#### Scenario: Any UI element is inspected for color
- **WHEN** any text, background, border, or link on the site is inspected
- **THEN** its color is one of the five defined grayscale tokens


<!-- @trace
source: build-portfolio-site
updated: 2026-09-20
code:
  - src/pages/work/[slug].astro
  - src/pages/index.astro
  - .spectra.yaml
  - src/styles/tokens.css
  - src/components/Nav.astro
-->

---
### Requirement: Typography
The system SHALL use Archivo for the Latin wordmark/headings and Noto Sans TC for Chinese body copy, both sans-serif.

#### Scenario: Page text is inspected
- **WHEN** the rendered font of the Latin wordmark and of Chinese body text is inspected
- **THEN** the wordmark uses Archivo and Chinese body text uses Noto Sans TC


<!-- @trace
source: build-portfolio-site
updated: 2026-09-20
code:
  - src/pages/work/[slug].astro
  - src/pages/index.astro
  - .spectra.yaml
  - src/styles/tokens.css
  - src/components/Nav.astro
-->

---
### Requirement: Decorative illustration placement
The system SHALL use black-and-white line-art illustrations of a "working / thinking / frustrated" designer character strictly as decoration, appearing only at three fixed placements: beside the home page hero/intro, between case study cards in the home page list, and in the site footer. The illustrations SHALL be static, with no animation applied to them, and SHALL NOT appear inside the body text of any page.

#### Scenario: Illustration locations checked
- **WHEN** the site is inspected for decorative illustrations
- **THEN** illustrations appear only beside the home hero, between home page case study cards, and in the footer, and nowhere else

#### Scenario: Illustration is static
- **WHEN** a decorative illustration is on screen
- **THEN** it does not animate, pulse, or otherwise move


<!-- @trace
source: build-portfolio-site
updated: 2026-09-20
code:
  - src/pages/work/[slug].astro
  - src/pages/index.astro
  - .spectra.yaml
  - src/styles/tokens.css
  - src/components/Nav.astro
-->

---
### Requirement: Restrained interaction motion
The system SHALL limit motion to: (1) a 150–200ms underline/color transition on link and button hover, with no scale or bounce; (2) a slight lift plus border/shadow change on case study card hover; (3) on the home and About pages, the "build from zero" entrance defined by the build-animation capability; (4) on all other pages, a one-time fade-plus-upward-shift entrance for content sections as they scroll into view, which SHALL NOT re-trigger on subsequent scrolls and SHALL NOT produce a parallax effect. The system SHALL NOT apply any custom page-transition animation between page navigations.

#### Scenario: Visitor hovers a link or button
- **WHEN** a visitor points at a link or button
- **THEN** the underline or text color transitions within 150–200ms, with no scaling or bounce

#### Scenario: Content section scrolls into view
- **WHEN** a content section on a case study page enters the viewport for the first time
- **THEN** it fades in and shifts upward once, and does not repeat this animation if scrolled past and back into view again

#### Scenario: Section on home or About scrolls into view
- **WHEN** a content section on the home or About page enters the viewport
- **THEN** it appears through the build-from-zero entrance instead of the fade-plus-upward-shift

#### Scenario: Visitor navigates to a different page
- **WHEN** a visitor clicks a link that navigates to another page
- **THEN** the browser performs a standard navigation with no custom transition animation

<!-- @trace
source: build-portfolio-site
updated: 2026-09-20
code:
  - src/pages/work/[slug].astro
  - src/pages/index.astro
  - .spectra.yaml
  - src/styles/tokens.css
  - src/components/Nav.astro
-->

---
### Requirement: Shared Open Graph image
The system SHALL use a single Open Graph share image, featuring the wordmark and one-line positioning statement, across every page.

#### Scenario: Any page is shared on social media
- **WHEN** a link to any page on the site is shared on a platform that renders Open Graph previews
- **THEN** the same sitewide Open Graph image is shown regardless of which page was shared

<!-- @trace
source: build-portfolio-site
updated: 2026-09-20
code:
  - src/pages/work/[slug].astro
  - src/pages/index.astro
  - .spectra.yaml
  - src/styles/tokens.css
  - src/components/Nav.astro
-->

---
### Requirement: Build overlay tokens
The system SHALL define a blue build accent (#2F54EB), a light variant for dark sections, skeleton fill shades, and a monospace typeface, used only by the build-animation overlay and its hint UI. Existing content colors, page background, and content typefaces SHALL remain unchanged.

#### Scenario: Viewing a finished page
- **WHEN** a build sequence has finished on the home page
- **THEN** no page content uses the blue build accent or the monospace typeface

#### Scenario: Viewing a case study page
- **WHEN** a visitor opens a case study page
- **THEN** its colors and typefaces are identical to before this change
