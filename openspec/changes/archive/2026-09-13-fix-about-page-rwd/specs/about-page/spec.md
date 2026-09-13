## ADDED Requirements

### Requirement: Viewport-responsive section and card spacing
Vertical spacing between and within About page sections — page-level section gaps, section top padding, full-bleed band padding, experience item padding, grid gaps for the skills and side-project lists, the gap between a section heading and the content below it (我擅長的事/工作經歷/個人專案 alike), the gap between the AI workflow section's heading/summary/flowchart image, and the internal spacing within a skill card (icon-to-title, title-to-description) — SHALL scale with viewport size rather than using a single fixed spacing value across all breakpoints. Spacing on narrow viewports SHALL be visibly reduced relative to the value used on wide viewports.

#### Scenario: Mobile viewport uses reduced spacing
- **WHEN** the About page is viewed on a narrow (mobile-width) viewport
- **THEN** the vertical spacing between sections, around cards, between a section heading and its content, within the AI workflow section, and within each skill card is smaller than the spacing rendered on a wide desktop viewport for the same regions

#### Scenario: Desktop viewport uses full spacing
- **WHEN** the About page is viewed on a wide desktop viewport
- **THEN** the vertical spacing between sections, around cards, between a section heading and its content, within the AI workflow section, and within each skill card renders at its full (largest) value

#### Scenario: Tablet viewport gives the skills band noticeably larger top/bottom padding
- **WHEN** the skills band (我擅長的事) is viewed on a tablet-width viewport
- **THEN** its top and bottom padding is noticeably larger than at mobile width, not just marginally larger

#### Scenario: Mobile section-level spacing stays substantial, not collapsed
- **WHEN** the About page's section-to-section and band padding is viewed on a mobile-width viewport
- **THEN** it is reduced from the desktop value but still reads as deliberate section separation, not a near-collapse down to the page's smallest spacing values

### Requirement: Section heading outranks nested card/item titles
Each section's `<h2>` heading SHALL render at a font size at least as large as any card or item title nested within that section, at every supported viewport width.

#### Scenario: Work experience heading vs. job title
- **WHEN** the "工作經歷" section heading and an experience item's job title are both rendered, at any viewport width
- **THEN** the section heading's font size is greater than or equal to the job title's font size

#### Scenario: Skills heading vs. skill card title
- **WHEN** the "我擅長的事" section heading and a skill card's title are both rendered, at any viewport width
- **THEN** the section heading's font size is greater than or equal to the skill card title's font size

### Requirement: Intro heading scales with viewport
The "我是 Ryan，UI/UX Designer" intro heading SHALL scale its font size down as the viewport narrows, rather than rendering at one fixed size on every viewport width.

#### Scenario: Intro heading is smaller on mobile than on desktop
- **WHEN** the intro heading is viewed on a mobile-width viewport
- **THEN** its font size is smaller than when the same heading is viewed on a wide desktop viewport

### Requirement: Mobile body copy size
On mobile-width viewports, About page body copy (the intro/bio paragraphs and the AI workflow summary paragraph) SHALL render at 14px.

#### Scenario: Bio paragraph on mobile
- **WHEN** the About page's bio paragraphs are viewed on a mobile-width viewport
- **THEN** their font size is 14px

#### Scenario: AI workflow summary on mobile
- **WHEN** the AI workflow section's summary paragraph is viewed on a mobile-width viewport
- **THEN** its font size is 14px

### Requirement: Intro section side-by-side breakpoint
The intro section (bio text and portrait) SHALL render side by side (bio text on the left, portrait on the right) at 992px viewport width and above, and SHALL only stack below 992px. When side by side, the portrait SHALL shrink proportionally with the available width rather than the layout switching to stacked early to accommodate a narrower viewport.

#### Scenario: 992px width shows side-by-side layout
- **WHEN** the About page's intro section is viewed at exactly 992px viewport width
- **THEN** the bio text and portrait render side by side, not stacked

#### Scenario: Just below 992px shows stacked layout
- **WHEN** the About page's intro section is viewed at 991px viewport width
- **THEN** the bio text and portrait render stacked

#### Scenario: Portrait shrinks proportionally near the breakpoint
- **WHEN** the intro section is side by side and the viewport narrows toward 992px
- **THEN** the portrait's rendered size decreases proportionally with the available space rather than the layout switching to stacked

### Requirement: Stacked intro layout order and alignment
When the intro section is stacked (below its side-by-side breakpoint), the portrait image SHALL render above the bio text, and the portrait image SHALL be horizontally centered.

#### Scenario: Photo renders before text when stacked
- **WHEN** the intro section is stacked on a narrow viewport
- **THEN** the portrait image appears above the bio text block in visual order

#### Scenario: Photo is centered when stacked
- **WHEN** the intro section is stacked on a narrow viewport
- **THEN** the portrait image is horizontally centered within its container

### Requirement: Stacked intro portrait sizing and spacing
When the intro section is stacked, the portrait image SHALL render smaller than its side-by-side (desktop) size, and the gap between the portrait and the bio text below it SHALL be shorter than the section-to-section spacing elsewhere on the page.

#### Scenario: Portrait is smaller when stacked
- **WHEN** the intro section is stacked on a narrow viewport
- **THEN** the portrait renders smaller than it does in the side-by-side desktop layout

#### Scenario: Photo-to-text gap is short when stacked
- **WHEN** the intro section is stacked
- **THEN** the vertical gap between the portrait and the bio text below it is visibly shorter than the page's section-level spacing

### Requirement: Facts list wraps cleanly
The facts list (Specialty, Experience, Email) SHALL render as either a single column (each fact on its own row) or a single row (all facts side by side), and SHALL NOT render as a partial wrap where some facts share a row and others do not.

#### Scenario: Narrow viewport renders single column
- **WHEN** the facts list is viewed on a narrow viewport
- **THEN** all three facts stack in a single column, one per row

#### Scenario: Wide viewport renders single row
- **WHEN** the facts list is viewed on a viewport wide enough for a single-row layout
- **THEN** all three facts render side by side in one row, with none wrapping to a second row

#### Scenario: Facts gap shrinks on mobile
- **WHEN** the facts list is viewed on a mobile-width viewport
- **THEN** the gap between facts is smaller than the gap rendered on a wide desktop viewport

### Requirement: Skills grid intermediate 2x2 layout
The skills grid (four skill cards) SHALL render as a single column below 576px viewport width, as a 2x2 grid between 576px and 992px viewport width, and as a single row of four columns at 992px viewport width and above.

#### Scenario: Mobile width renders single column
- **WHEN** the skills grid is viewed below 576px viewport width
- **THEN** the four skill cards stack in a single column

#### Scenario: Mid-range width renders 2x2 grid
- **WHEN** the skills grid is viewed between 576px and 992px viewport width
- **THEN** the four skill cards render in a 2-column, 2-row grid

#### Scenario: Desktop width renders single row
- **WHEN** the skills grid is viewed at 992px viewport width or above
- **THEN** the four skill cards render in a single row of four columns

### Requirement: Skill icon proportion
The skill card illustration icon SHALL maintain a size proportionate to its card at every skills-grid layout (single column, 2x2, and four-column row), and SHALL NOT shrink to a size that appears visually unbalanced against the card's title and description text.

#### Scenario: Icon remains proportionate in 2x2 layout
- **WHEN** the skills grid renders in its 2x2 layout
- **THEN** each skill card's icon renders large enough to remain visually balanced against that card's title and description text

### Requirement: Skill card spacing when stacked or 2x2
When the skills grid renders as a single column or as a 2x2 grid, the vertical gap between skill cards SHALL be large enough that adjacent cards do not visually appear connected or touching.

#### Scenario: Stacked skill cards have visible separation
- **WHEN** the skills grid renders as a single column on a narrow viewport
- **THEN** a visible gap separates each skill card from the next, distinct from the spacing used between elements within a single card

#### Scenario: 2x2 skill cards have visible row separation
- **WHEN** the skills grid renders as a 2x2 grid
- **THEN** a visible gap separates the top row of cards from the bottom row, distinct from the spacing used between elements within a single card
