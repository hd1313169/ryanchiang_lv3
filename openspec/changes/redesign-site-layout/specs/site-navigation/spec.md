## Purpose

Defines the site-wide navigation chrome — a sticky top nav bar present on every page — that replaces the previous persistent sidebar and carries the site's logo, primary links, and an external resume link.

## ADDED Requirements

### Requirement: Top nav bar present on every page
The system SHALL render a single nav bar fixed to the top of the viewport on every page (home, about, each case study), instead of a persistent left sidebar.

#### Scenario: Navigating between pages
- **WHEN** a visitor moves from the home page to the about page or a case study page
- **THEN** the same top nav bar renders in the same position on each page, with no left sidebar present

#### Scenario: Scrolling down a long page
- **WHEN** a visitor scrolls down any page
- **THEN** the nav bar remains visible, pinned to the top of the viewport

### Requirement: Translucent blurred nav background
The nav bar's background SHALL be translucent with a blur effect applied to the content scrolling behind it, so page content remains legible through the bar without a hard visual seam.

#### Scenario: Content scrolls under the nav
- **WHEN** page content (e.g. a case-study card or hero illustration) scrolls underneath the fixed nav bar
- **THEN** that content is visibly blurred and the nav bar's own text/logo stay fully legible

### Requirement: Logo and favicon identity
The nav bar SHALL display the site's logo mark, and the browser tab favicon SHALL use the same mark.

#### Scenario: Loading any page
- **WHEN** a visitor loads any page of the site
- **THEN** the nav bar shows the logo mark and the browser tab shows the matching favicon

### Requirement: Primary navigation links
The nav bar SHALL provide a link to 作品實績 (the home page) and a link to 關於我 (the about page), each indicating the current page when active.

#### Scenario: Viewing the home page
- **WHEN** a visitor is on the home page
- **THEN** the 作品實績 link is visually marked as the active/current page

#### Scenario: Viewing the about page
- **WHEN** a visitor is on the about page
- **THEN** the 關於我 link is visually marked as the active/current page

### Requirement: External resume link
The nav bar SHALL provide a 履歷 link that opens an externally hosted resume (a cloud-storage document) in a new browser tab, without navigating away from the site.

#### Scenario: Clicking the resume link
- **WHEN** a visitor clicks the 履歷 link
- **THEN** the external resume URL opens in a new tab and the site page remains open in the original tab

### Requirement: Responsive nav without a duplicate mobile intro
On small viewports, the nav SHALL remain a single top bar (collapsing or simplifying its own contents as needed) without any separate full-width block elsewhere on the page repeating the site identity or nav links.

#### Scenario: Viewing any page on a narrow viewport
- **WHEN** a visitor loads any page on a viewport narrow enough to trigger mobile layout
- **THEN** only the top nav bar carries navigation and identity — no separate mobile-only intro block is rendered before the footer or elsewhere in the page
