# site-responsive-layout Specification

## Purpose

Defines how the whole site behaves on narrow (mobile) viewports: a single shared breakpoint, a collapsing top navigation, and reduced vertical spacing and card padding, so that phone layouts are not just scaled-down desktop layouts.

## Requirements

### Requirement: Single mobile breakpoint
The site SHALL treat viewports narrower than 40em (640px) as "mobile" for the behaviors defined in this capability: the collapsed navigation, the reduced spacing scale, and the reduced card padding. The horizontal page gutter SHALL also switch between its mobile and desktop values at this same 40em boundary.

#### Scenario: Behaviors switch together
- **WHEN** the viewport is resized across the 40em boundary
- **THEN** the navigation, the large spacing steps, the card padding and the page gutter all change to their mobile (below) or desktop (at or above) values at that same width, with no intermediate width where only some of them have switched


<!-- @trace
source: unify-mobile-layout
updated: 2026-09-20
code:
  - src/pages/index.astro
  - src/styles/tokens.css
  - src/components/Nav.astro
  - .spectra.yaml
  - src/pages/about.astro
  - src/pages/work/[slug].astro
-->

---
### Requirement: Navigation collapses into a hamburger menu on mobile
Below 40em, the top navigation SHALL show the brand and a hamburger button instead of the inline links; the 作品實績, 關於我 and 履歷 links SHALL be reachable through a dropdown panel opened by that button. At 40em and above, the inline links SHALL be shown and no hamburger button SHALL be visible. No navigation text SHALL wrap onto a second line at any viewport width from 320px upward.

#### Scenario: Mobile nav is collapsed by default
- **WHEN** any page is opened at a 375px-wide viewport
- **THEN** the nav bar shows the brand and a hamburger button on a single row, and the three links are not visible

#### Scenario: Opening the menu
- **WHEN** a visitor activates the hamburger button
- **THEN** a panel with 作品實績, 關於我 and 履歷 appears below the nav bar, the button's expanded state is exposed to assistive technology, and the current page's link is marked as current

#### Scenario: Panel matches the nav bar surface and has no lines
- **WHEN** the menu is open over page content
- **THEN** the panel has the same translucent, blurred background as the nav bar (page content behind it is visible but blurred), and no divider lines appear between the links or between the bar and the panel

#### Scenario: Closing the menu
- **WHEN** the menu is open and the visitor presses Escape, activates the hamburger button again, or follows one of the links
- **THEN** the panel closes

#### Scenario: Desktop nav is unchanged
- **WHEN** any page is opened at a viewport of 40em or wider
- **THEN** the three links are shown inline to the right of the brand and no hamburger button is visible

#### Scenario: Resizing up while the menu is open
- **WHEN** the menu is open and the viewport is widened to 40em or more
- **THEN** the inline links are shown and the panel is no longer displayed


<!-- @trace
source: unify-mobile-layout
updated: 2026-09-20
code:
  - src/pages/index.astro
  - src/styles/tokens.css
  - src/components/Nav.astro
  - .spectra.yaml
  - src/pages/about.astro
  - src/pages/work/[slug].astro
-->

---
### Requirement: Large vertical spacing is reduced on mobile
Below 40em, the large vertical spacing steps (48px, 72px and 112px on desktop) SHALL render visibly smaller than on desktop, so that gaps between sections, headings and blocks on mobile are not left at desktop size. Spacing values that were fixed pixel or rem amounts on desktop (for example the home hero's gaps and the Footer's outer spacing) SHALL follow the same reduction.

#### Scenario: Section gaps are smaller on mobile
- **WHEN** the home page, the About page and a case study page are compared at 375px and at 1280px wide
- **THEN** each vertical gap between major blocks (hero, section headings, Footer) is smaller at 375px than at 1280px

#### Scenario: Stacked layouts do not carry desktop side gaps into vertical gaps
- **WHEN** a two-column block stacks into a single column below 40em
- **THEN** the space between the stacked items is no larger than the mobile value of the spacing step used between other stacked content

#### Scenario: Desktop spacing is unchanged
- **WHEN** any page is viewed at 40em or wider
- **THEN** vertical spacing matches the values used before this change


<!-- @trace
source: unify-mobile-layout
updated: 2026-09-20
code:
  - src/pages/index.astro
  - src/styles/tokens.css
  - src/components/Nav.astro
  - .spectra.yaml
  - src/pages/about.astro
  - src/pages/work/[slug].astro
-->

---
### Requirement: Card padding is reduced on mobile
Cards and boxed blocks that use inner padding SHALL use a smaller padding below 40em than at 40em and above, so that on a 375px-wide viewport their content is not compressed into a narrow column. A boxed block's inner horizontal padding at mobile width SHALL NOT exceed 24px.

#### Scenario: Boxed block content keeps usable width
- **WHEN** a boxed block (such as the case page's project info block) is viewed at 375px
- **THEN** its inner horizontal padding is no more than 24px on each side, and its text is not wrapped into a column narrower than half the block's width

#### Scenario: Desktop card padding is unchanged
- **WHEN** the same block is viewed at 40em or wider
- **THEN** its padding matches the desktop value used before this change


<!-- @trace
source: unify-mobile-layout
updated: 2026-09-20
code:
  - src/pages/index.astro
  - src/styles/tokens.css
  - src/components/Nav.astro
  - .spectra.yaml
  - src/pages/about.astro
  - src/pages/work/[slug].astro
-->

---
### Requirement: No horizontal page overflow on mobile
At viewport widths from 320px up to (but not including) 40em, no page SHALL be wider than the viewport. Content that is inherently wider than the viewport, such as a multi-column comparison table on a case study page, SHALL scroll horizontally within its own container instead of widening the page.

#### Scenario: Wide table scrolls inside its container
- **WHEN** a case study page containing a four-column comparison table is viewed at 375px
- **THEN** the page's scroll width equals the viewport width and the table scrolls horizontally within the article column

#### Scenario: No page overflows at the narrowest supported width
- **WHEN** the home page, the About page and each case study page are viewed at 320px
- **THEN** none of them scrolls horizontally


<!-- @trace
source: unify-mobile-layout
updated: 2026-09-20
code:
  - src/pages/index.astro
  - src/styles/tokens.css
  - src/components/Nav.astro
  - .spectra.yaml
  - src/pages/about.astro
  - src/pages/work/[slug].astro
-->

---
### Requirement: Tablet widths do not crowd or break content
Between 40em and 62em (tablet widths, e.g. 768px), three-across card groups SHALL stack into a single column instead of rendering three cards side by side, two-column text/meta layouts SHALL NOT let one column's text run into the other, and dark callout cards SHALL span the full width of the article column. Above 62em the existing desktop layouts are unchanged.

#### Scenario: Three-across cards stack on tablet
- **WHEN** a case study page is viewed at 768px
- **THEN** the 痛點 / 設計挑戰 / 我的任務 cards and any three-across workflow card group render one per row, each spanning the article column

#### Scenario: Experience meta column does not overflow
- **WHEN** the About page's 工作經歷 is viewed at 768px
- **THEN** each job's title, company and period stay inside the left column (wrapping onto separate lines if needed) and do not overlap the bullet list beside it

#### Scenario: Callout cards are full column width on tablet
- **WHEN** a case study page with a 關鍵洞察 or 業主回饋 callout is viewed at 768px
- **THEN** the callout spans the full width of the article column rather than 60% of it

#### Scenario: Desktop layouts are unchanged
- **WHEN** the same pages are viewed at 62em or wider
- **THEN** three cards render side by side, the experience meta stays on one line, and callouts keep their desktop width cap

<!-- @trace
source: unify-mobile-layout
updated: 2026-09-20
code:
  - src/pages/index.astro
  - src/styles/tokens.css
  - src/components/Nav.astro
  - .spectra.yaml
  - src/pages/about.astro
  - src/pages/work/[slug].astro
-->