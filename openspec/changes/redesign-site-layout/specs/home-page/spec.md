## Purpose

Defines the home page's composition — an introductory hero section followed by a grid of case-study cards — replacing the previous sidebar-driven identity block and single-column case-study list.

## ADDED Requirements

### Requirement: Homepage hero section
The home page SHALL render a hero section containing an illustration and the site owner's introduction copy (role, name, and tagline), positioned above the case-study list. This content SHALL appear only on the home page, not as a persistent element on other pages.

#### Scenario: Loading the home page
- **WHEN** a visitor loads the home page
- **THEN** a hero section renders at the top of the page content, showing the illustration and introduction copy

#### Scenario: Loading a non-home page
- **WHEN** a visitor loads the about page or a case-study page
- **THEN** no hero section or introduction copy renders on that page

### Requirement: Decorative divider under the hero tagline
The hero section SHALL render a decorative line graphic directly beneath the introduction tagline sentence.

#### Scenario: Viewing the hero section
- **WHEN** a visitor views the hero section
- **THEN** a decorative divider line appears immediately below the tagline sentence

### Requirement: Case-study section heading with divider
The home page SHALL render a "作品實績" section heading above the case-study grid, with a decorative line graphic beneath it.

#### Scenario: Viewing the case-study section
- **WHEN** a visitor scrolls to the case-study section
- **THEN** the "作品實績" heading renders with a decorative divider directly beneath it, above the card grid

### Requirement: Case-study cards in a multi-column grid
The home page SHALL render case studies as cards arranged in a multi-column grid (2 columns at desktop widths, collapsing to fewer columns on narrower viewports), replacing the previous single-column horizontal row layout.

#### Scenario: Viewing the home page at desktop width
- **WHEN** a visitor views the home page on a desktop-width viewport
- **THEN** case-study cards render in a 2-column grid

#### Scenario: Viewing the home page at narrow width
- **WHEN** a visitor views the home page on a narrow (mobile) viewport
- **THEN** case-study cards render in a single column

### Requirement: Case-study card content
Each case-study card SHALL show a cover image, its tags, its title, and its summary. Cards SHALL NOT show an ordinal number or a separate subtitle line.

#### Scenario: Viewing a case-study card
- **WHEN** a visitor views any case-study card in the grid
- **THEN** the card displays the cover image, tags, title, and summary, and does not display an ordinal number or subtitle

### Requirement: Case-study card navigation
Each case-study card SHALL link to that case study's individual page.

#### Scenario: Clicking a case-study card
- **WHEN** a visitor clicks anywhere on a case-study card
- **THEN** the visitor navigates to that case study's page
