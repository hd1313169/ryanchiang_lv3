## Purpose

Lets visitors manually switch the entire site between a light and dark visual theme — colors and images — and have that choice remembered across visits.

## ADDED Requirements

### Requirement: Manual theme toggle
The system SHALL provide a single, always-visible control that switches the site's active theme between "light" and "dark" when activated.

#### Scenario: Toggling from light to dark
- **WHEN** the visitor activates the toggle while the site is in light theme
- **THEN** the site's background, text, and border colors switch to their dark-theme values, and theme-aware images switch to their dark variants

#### Scenario: Toggling from dark to light
- **WHEN** the visitor activates the toggle while the site is in dark theme
- **THEN** the site's background, text, and border colors switch to their light-theme values, and theme-aware images switch to their light variants

### Requirement: Theme persistence
The system SHALL remember the visitor's explicitly chosen theme and re-apply it on subsequent page loads and navigations within the site, without following the operating system's color-scheme preference.

#### Scenario: Returning after choosing dark theme
- **WHEN** a visitor who previously chose dark theme reloads the page or navigates to another page on the site
- **THEN** the site loads in dark theme, regardless of the operating system's current color-scheme setting

#### Scenario: No stored preference
- **WHEN** a visitor with no previously stored theme choice loads the site for the first time
- **THEN** the site loads in light theme

### Requirement: No flash of incorrect theme
The system SHALL apply the visitor's stored theme before the page's first paint.

#### Scenario: Loading with a stored dark preference
- **WHEN** a visitor with dark theme previously stored loads any page on the site
- **THEN** the page never visibly renders in light theme before switching to dark theme

### Requirement: Theme-aware images
The system SHALL display a dark-appropriate version of every themed image (site illustrations, case-study cover photos, and the about-page portrait) whenever dark theme is active, and the original version whenever light theme is active.

#### Scenario: Viewing a case study cover in dark theme
- **WHEN** dark theme is active and a case-study cover image is displayed
- **THEN** the dark variant of that cover image is shown instead of the light variant

#### Scenario: Viewing the about-page portrait in light theme
- **WHEN** light theme is active and the about-page portrait is displayed
- **THEN** the original (light) portrait image is shown
