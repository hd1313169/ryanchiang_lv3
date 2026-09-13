## REMOVED Requirements

### Requirement: Manual theme toggle
The system SHALL provide a single, always-visible control that switches the site's active theme between "light" and "dark" when activated.

#### Scenario: Toggling from light to dark
- **WHEN** the visitor activates the toggle while the site is in light theme
- **THEN** the site's background, text, and border colors switch to their dark-theme values, and theme-aware images switch to their dark variants

#### Scenario: Toggling from dark to light
- **WHEN** the visitor activates the toggle while the site is in dark theme
- **THEN** the site's background, text, and border colors switch to their light-theme values, and theme-aware images switch to their light variants

**Reason**: The toggle has never been user-facing (shipped `display: none` pending visual polish) and dark mode is being dropped rather than finished, so no new work has to account for it.
**Migration**: None — the site now has a single, light-only theme. No stored preference is read or needs migrating.

### Requirement: Theme persistence
The system SHALL remember the visitor's explicitly chosen theme and re-apply it on subsequent page loads and navigations within the site, without following the operating system's color-scheme preference.

#### Scenario: Returning after choosing dark theme
- **WHEN** a visitor who previously chose dark theme reloads the page or navigates to another page on the site
- **THEN** the site loads in dark theme, regardless of the operating system's current color-scheme setting

#### Scenario: No stored preference
- **WHEN** a visitor with no previously stored theme choice loads the site for the first time
- **THEN** the site loads in light theme

**Reason**: There is no longer a theme choice to persist once the toggle is removed.
**Migration**: Any previously stored theme preference in `localStorage` is simply no longer read; it is left in place rather than actively cleared.

### Requirement: No flash of incorrect theme
The system SHALL apply the visitor's stored theme before the page's first paint.

#### Scenario: Loading with a stored dark preference
- **WHEN** a visitor with dark theme previously stored loads any page on the site
- **THEN** the page never visibly renders in light theme before switching to dark theme

**Reason**: With only one theme, there is no boot-time theme selection left to protect against flashing.
**Migration**: The no-flash boot script is deleted; the site always renders its single (light) theme.

### Requirement: Theme-aware images
The system SHALL display a dark-appropriate version of every themed image (site illustrations, case-study cover photos, and the about-page portrait) whenever dark theme is active, and the original version whenever light theme is active.

#### Scenario: Viewing a case study cover in dark theme
- **WHEN** dark theme is active and a case-study cover image is displayed
- **THEN** the dark variant of that cover image is shown instead of the light variant

#### Scenario: Viewing the about-page portrait in light theme
- **WHEN** light theme is active and the about-page portrait is displayed
- **THEN** the original (light) portrait image is shown

**Reason**: With dark theme removed, every image has only one version to show.
**Migration**: Case-study covers revert to rendering their single (light) cover image directly; the `coverDark` content field and its wiring are removed. The about-page portrait was already light-only (its dark variant was never supplied), so no change is needed there.
