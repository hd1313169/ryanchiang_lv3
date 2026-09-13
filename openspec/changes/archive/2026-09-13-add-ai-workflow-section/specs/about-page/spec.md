## Purpose

Presents the site owner's AI-assisted design workflow as a dedicated, full-bleed showcase section on the About page, immediately following the existing skills summary.

## ADDED Requirements

### Requirement: AI workflow section placement and content
The About page SHALL display an "AI 應用實踐高效設計" section immediately after the "我擅長的事" skills section, with no visual gap between the two sections. The section SHALL show a heading, a summary paragraph, and a flowchart image depicting the six-stage workflow.

#### Scenario: Section appears in document order
- **WHEN** a visitor scrolls through the About page
- **THEN** the "AI 應用實踐高效設計" section renders directly after the "我擅長的事" section, with no other section or empty space between them

#### Scenario: Section renders on a dark background
- **WHEN** the "AI 應用實踐高效設計" section is visible
- **THEN** its heading, summary paragraph, and flowchart image are shown against a black, full-bleed background

### Requirement: Sticky cover-scroll transition
On wider viewports, as a visitor scrolls from the skills section into the AI workflow section, the skills section SHALL remain pinned in place while the AI workflow section visually rises to fully cover it, before scrolling continues normally into the AI workflow section's own content. On narrow viewports, where the skills section's single-column content is taller than the viewport, this pin-and-cover transition SHALL be skipped so the skills section instead scrolls normally and all of its content remains reachable.

#### Scenario: Scrolling from skills into the AI workflow section on a wide viewport
- **WHEN** a visitor on a wide viewport scrolls down past the "我擅長的事" section
- **THEN** that section stays fixed in the viewport while the "AI 應用實踐高效設計" section slides up over it until it is fully covered, after which further scrolling moves through the AI workflow section as normal

#### Scenario: Scrolling from skills into the AI workflow section on a narrow viewport
- **WHEN** a visitor on a narrow viewport scrolls down through the "我擅長的事" section
- **THEN** the section scrolls normally (it is not pinned), so every item in it becomes visible before the "AI 應用實踐高效設計" section follows

#### Scenario: JavaScript disabled
- **WHEN** a visitor has JavaScript disabled and scrolls through the same region on a wide viewport
- **THEN** the cover-scroll transition still occurs, since it relies only on CSS positioning

### Requirement: Flowchart lightbox
The flowchart image SHALL be expandable into a lightbox view on click/tap, allowing visitors to view it at a larger size against a dimmed backdrop, and SHALL be dismissible.

#### Scenario: Opening the lightbox
- **WHEN** a visitor clicks or taps the flowchart image
- **THEN** a lightbox opens: a semi-transparent mask dims the page, with the image shown inset over it at a larger size than its inline placement

#### Scenario: Closing via backdrop or button
- **WHEN** the lightbox is open and the visitor clicks outside the image or activates a visible close control
- **THEN** the overlay closes and the page returns to its prior scroll position

#### Scenario: Closing via keyboard
- **WHEN** the lightbox is open and the visitor presses the Escape key
- **THEN** the overlay closes

#### Scenario: Magnifying the image on a touch device
- **WHEN** the lightbox is open on a touch device
- **THEN** the visitor can use the browser's native pinch-to-zoom gesture to magnify the image, without any in-page zoom control
