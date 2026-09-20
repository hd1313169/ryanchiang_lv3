## Purpose

Gives a first-time visitor an immediate sense of who the site owner is and a scannable path into the case studies, without requiring extra navigation.

## ADDED Requirements

### Requirement: Home intro without portrait
The home page SHALL open with an intro composed of the owner's name wordmark ("Ryan Chiang", set horizontally) and a one-line positioning statement. The intro SHALL NOT include a portrait photo.

#### Scenario: Visitor loads home page
- **WHEN** a visitor loads the home page
- **THEN** the "Ryan Chiang" wordmark and a one-line positioning statement are visible at the top of the page, and no portrait photo is shown in the intro area

### Requirement: Home page lists all case studies
The home page SHALL list every published case study as a card showing the case study's title and a one-line summary. The home page IS the site's work index — there is no separate `/works` listing page.

#### Scenario: All case studies listed
- **WHEN** a visitor loads the home page
- **THEN** exactly the set of published case studies is shown, each as a card with a title and one-line summary

#### Scenario: Card links to full case study
- **WHEN** a visitor clicks a case study card
- **THEN** the browser navigates to that case study's full page

### Requirement: Case study card hover feedback
Case study cards SHALL provide a restrained hover response, per the site-wide motion rules defined in the visual design system.

#### Scenario: Visitor hovers a case study card
- **WHEN** a visitor points at a case study card
- **THEN** the card lifts slightly and its border/shadow changes, with no image scaling or flip effect
