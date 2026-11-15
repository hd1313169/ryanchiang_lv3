# Spec Delta

## MODIFIED Requirements

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

## ADDED Requirements

### Requirement: Build overlay tokens
The system SHALL define a blue build accent (#2F54EB), a light variant for dark sections, skeleton fill shades, and a monospace typeface, used only by the build-animation overlay and its hint UI. Existing content colors, page background, and content typefaces SHALL remain unchanged.

#### Scenario: Viewing a finished page
- **WHEN** a build sequence has finished on the home page
- **THEN** no page content uses the blue build accent or the monospace typeface

#### Scenario: Viewing a case study page
- **WHEN** a visitor opens a case study page
- **THEN** its colors and typefaces are identical to before this change
