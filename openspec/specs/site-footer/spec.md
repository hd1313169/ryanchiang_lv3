# site-footer Specification

## Purpose

Defines the site-wide footer — a full-width dark contact section with a heading and three contact links — replacing the previous slim single-email footer bar.

## Requirements

### Requirement: Footer present on every page
The system SHALL render a single footer, with a dark background, at the end of every page's content.

#### Scenario: Reaching the end of any page
- **WHEN** a visitor scrolls to the end of the home page, about page, or a case-study page
- **THEN** the same dark footer renders below that page's content


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
### Requirement: Footer contact heading
The footer SHALL display a heading inviting visitors to get in touch ("任何合作機會／歡迎隨時和我聊聊 :)").

#### Scenario: Viewing the footer
- **WHEN** a visitor scrolls to the footer
- **THEN** the contact heading text is visible


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
### Requirement: Three contact links
The footer SHALL display three contact links, each with an icon: an email contact, a LinkedIn profile, and a CakeResume profile.

#### Scenario: Viewing the footer contact links
- **WHEN** a visitor views the footer
- **THEN** three contact links are visible, each showing its own icon (email, LinkedIn, CakeResume)


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
### Requirement: Email link copies address to clipboard
Clicking the email contact link SHALL copy the email address to the visitor's clipboard and show a temporary confirmation in place of the address, then revert to the original label after a short delay.

#### Scenario: Clicking the email link
- **WHEN** a visitor clicks the email contact link
- **THEN** the email address is copied to the clipboard and the link's label temporarily changes to a "copied" confirmation before reverting


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
### Requirement: LinkedIn and CakeResume links open externally
The LinkedIn and CakeResume contact links SHALL open their respective external profile URLs in a new browser tab.

#### Scenario: Clicking the LinkedIn link
- **WHEN** a visitor clicks the LinkedIn contact link
- **THEN** the visitor's LinkedIn profile URL opens in a new tab

#### Scenario: Clicking the CakeResume link
- **WHEN** a visitor clicks the CakeResume contact link
- **THEN** the visitor's CakeResume profile URL opens in a new tab

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