## Purpose

Gives visitors a consistent, low-friction way to move between the site's pages and reach the site owner directly, regardless of which page they land on.

## ADDED Requirements

### Requirement: Persistent site navigation
The system SHALL display a persistent, always-visible navigation listing exactly three items — `首頁`, `About`, `Contact` — as a plain, unnumbered text list, on every page. The navigation SHALL NOT be hidden behind a hamburger/menu toggle.

#### Scenario: Navigation present on every page
- **WHEN** a visitor loads any page of the site (home, about, or any case study)
- **THEN** the navigation list showing `首頁`, `About`, `Contact` is visible without requiring any interaction

#### Scenario: Navigation items are unnumbered
- **WHEN** the navigation list renders
- **THEN** no numeric prefixes (e.g. "01", "02") are shown next to the items

### Requirement: Contact via mailto
The system SHALL make the `Contact` navigation item and any other contact affordance a `mailto:` link addressed to the site owner's email, requiring no in-page form.

#### Scenario: Visitor initiates contact
- **WHEN** a visitor clicks `Contact` in the navigation or the footer contact link
- **THEN** the visitor's default email client opens a new message addressed to `wsad71155@gmail.com`

### Requirement: Site-wide footer
The system SHALL display a footer on every page containing a contact (`mailto:`) link and a copyright notice.

#### Scenario: Footer present on every page
- **WHEN** a visitor scrolls to the bottom of any page
- **THEN** a footer is shown with a `mailto:` contact link and a copyright notice
