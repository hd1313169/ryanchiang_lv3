# home-page Specification

## Purpose

Gives a first-time visitor an immediate sense of who the site owner is and a scannable path into the case studies, without requiring extra navigation.

## Requirements

### Requirement: Home intro without portrait
The home page SHALL open with an intro composed of the owner's name wordmark ("Ryan Chiang", set horizontally) and a one-line positioning statement. The intro SHALL NOT include a portrait photo.

#### Scenario: Visitor loads home page
- **WHEN** a visitor loads the home page
- **THEN** the "Ryan Chiang" wordmark and a one-line positioning statement are visible at the top of the page, and no portrait photo is shown in the intro area


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
### Requirement: Home page lists all case studies
The home page SHALL list every published case study as a card showing the case study's title and a one-line summary. The home page IS the site's work index — there is no separate `/works` listing page.

#### Scenario: All case studies listed
- **WHEN** a visitor loads the home page
- **THEN** exactly the set of published case studies is shown, each as a card with a title and one-line summary

#### Scenario: Card links to full case study
- **WHEN** a visitor clicks a case study card
- **THEN** the browser navigates to that case study's full page


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
### Requirement: Case study card hover feedback
Case study cards SHALL provide a restrained hover response, per the site-wide motion rules defined in the visual design system.

#### Scenario: Visitor hovers a case study card
- **WHEN** a visitor points at a case study card
- **THEN** the card lifts slightly and its border/shadow changes, with no image scaling or flip effect

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
### Requirement: Homepage hero section
The home page SHALL render a hero section containing an illustration and the site owner's introduction copy (role, name, and tagline), positioned above the case-study list. This content SHALL appear only on the home page, not as a persistent element on other pages.

#### Scenario: Loading the home page
- **WHEN** a visitor loads the home page
- **THEN** a hero section renders at the top of the page content, showing the illustration and introduction copy

#### Scenario: Loading a non-home page
- **WHEN** a visitor loads the about page or a case-study page
- **THEN** no hero section or introduction copy renders on that page


<!-- @trace
source: redesign-site-layout
updated: 2026-09-20
code:
  - src/pages/work/[slug].astro
  - src/components/Nav.astro
  - .spectra.yaml
  - src/pages/index.astro
  - src/styles/tokens.css
-->

---
### Requirement: Decorative divider under the hero tagline
The hero section SHALL render a decorative line graphic directly beneath the introduction tagline sentence.

#### Scenario: Viewing the hero section
- **WHEN** a visitor views the hero section
- **THEN** a decorative divider line appears immediately below the tagline sentence


<!-- @trace
source: redesign-site-layout
updated: 2026-09-20
code:
  - src/pages/work/[slug].astro
  - src/components/Nav.astro
  - .spectra.yaml
  - src/pages/index.astro
  - src/styles/tokens.css
-->

---
### Requirement: Case-study section heading with divider
The home page SHALL render a "作品實績" section heading above the case-study grid, with a decorative line graphic beneath it.

#### Scenario: Viewing the case-study section
- **WHEN** a visitor scrolls to the case-study section
- **THEN** the "作品實績" heading renders with a decorative divider directly beneath it, above the card grid


<!-- @trace
source: redesign-site-layout
updated: 2026-09-20
code:
  - src/pages/work/[slug].astro
  - src/components/Nav.astro
  - .spectra.yaml
  - src/pages/index.astro
  - src/styles/tokens.css
-->

---
### Requirement: Case-study cards in a multi-column grid
The home page SHALL render case studies as cards arranged in a multi-column grid (2 columns at desktop widths, collapsing to fewer columns on narrower viewports), replacing the previous single-column horizontal row layout.

#### Scenario: Viewing the home page at desktop width
- **WHEN** a visitor views the home page on a desktop-width viewport
- **THEN** case-study cards render in a 2-column grid

#### Scenario: Viewing the home page at narrow width
- **WHEN** a visitor views the home page on a narrow (mobile) viewport
- **THEN** case-study cards render in a single column


<!-- @trace
source: redesign-site-layout
updated: 2026-09-20
code:
  - src/pages/work/[slug].astro
  - src/components/Nav.astro
  - .spectra.yaml
  - src/pages/index.astro
  - src/styles/tokens.css
-->

---
### Requirement: Case-study card content
Each case-study card SHALL show a cover image, its tags, its title, and its summary. Cards SHALL NOT show an ordinal number or a separate subtitle line.

#### Scenario: Viewing a case-study card
- **WHEN** a visitor views any case-study card in the grid
- **THEN** the card displays the cover image, tags, title, and summary, and does not display an ordinal number or subtitle


<!-- @trace
source: redesign-site-layout
updated: 2026-09-20
code:
  - src/pages/work/[slug].astro
  - src/components/Nav.astro
  - .spectra.yaml
  - src/pages/index.astro
  - src/styles/tokens.css
-->

---
### Requirement: Case-study card navigation
Each case-study card SHALL link to that case study's individual page.

#### Scenario: Clicking a case-study card
- **WHEN** a visitor clicks anywhere on a case-study card
- **THEN** the visitor navigates to that case study's page

<!-- @trace
source: redesign-site-layout
updated: 2026-09-20
code:
  - src/pages/work/[slug].astro
  - src/components/Nav.astro
  - .spectra.yaml
  - src/pages/index.astro
  - src/styles/tokens.css
-->