## Purpose

Presents the site owner's AI-assisted design workflow as a dedicated, full-bleed showcase section on the About page, immediately following the existing skills summary.

## Requirements

### Requirement: AI workflow section placement and content
The About page SHALL display an "AI 應用實踐高效設計" section immediately after the "我擅長的事" skills section, with no visual gap between the two sections. The section SHALL show a heading, a summary paragraph, and a flowchart image depicting the six-stage workflow.

#### Scenario: Section appears in document order
- **WHEN** a visitor scrolls through the About page
- **THEN** the "AI 應用實踐高效設計" section renders directly after the "我擅長的事" section, with no other section or empty space between them

#### Scenario: Section renders on a dark background
- **WHEN** the "AI 應用實踐高效設計" section is visible
- **THEN** its heading, summary paragraph, and flowchart image are shown against a black, full-bleed background

---
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

---
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

---
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

---
### Requirement: Section heading outranks nested card/item titles
Each section's `<h2>` heading SHALL render at a font size at least as large as any card or item title nested within that section, at every supported viewport width.

#### Scenario: Work experience heading vs. job title
- **WHEN** the "工作經歷" section heading and an experience item's job title are both rendered, at any viewport width
- **THEN** the section heading's font size is greater than or equal to the job title's font size

#### Scenario: Skills heading vs. skill card title
- **WHEN** the "我擅長的事" section heading and a skill card's title are both rendered, at any viewport width
- **THEN** the section heading's font size is greater than or equal to the skill card title's font size

---
### Requirement: Intro heading scales with viewport
The "我是 Ryan，UI/UX Designer" intro heading SHALL scale its font size down as the viewport narrows, rather than rendering at one fixed size on every viewport width.

#### Scenario: Intro heading is smaller on mobile than on desktop
- **WHEN** the intro heading is viewed on a mobile-width viewport
- **THEN** its font size is smaller than when the same heading is viewed on a wide desktop viewport

---
### Requirement: Mobile body copy size
On mobile-width viewports, About page body copy (the intro/bio paragraphs and the AI workflow summary paragraph) SHALL render at 14px.

#### Scenario: Bio paragraph on mobile
- **WHEN** the About page's bio paragraphs are viewed on a mobile-width viewport
- **THEN** their font size is 14px

#### Scenario: AI workflow summary on mobile
- **WHEN** the AI workflow section's summary paragraph is viewed on a mobile-width viewport
- **THEN** its font size is 14px

---
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

---
### Requirement: Stacked intro layout order and alignment
When the intro section is stacked (below its side-by-side breakpoint), the portrait image SHALL render above the bio text, and the portrait image SHALL be horizontally centered.

#### Scenario: Photo renders before text when stacked
- **WHEN** the intro section is stacked on a narrow viewport
- **THEN** the portrait image appears above the bio text block in visual order

#### Scenario: Photo is centered when stacked
- **WHEN** the intro section is stacked on a narrow viewport
- **THEN** the portrait image is horizontally centered within its container

---
### Requirement: Stacked intro portrait sizing and spacing
When the intro section is stacked, the portrait image SHALL render smaller than its side-by-side (desktop) size, and the gap between the portrait and the bio text below it SHALL be shorter than the section-to-section spacing elsewhere on the page.

#### Scenario: Portrait is smaller when stacked
- **WHEN** the intro section is stacked on a narrow viewport
- **THEN** the portrait renders smaller than it does in the side-by-side desktop layout

#### Scenario: Photo-to-text gap is short when stacked
- **WHEN** the intro section is stacked
- **THEN** the vertical gap between the portrait and the bio text below it is visibly shorter than the page's section-level spacing

---
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

---
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

---
### Requirement: Skill icon proportion
The skill card illustration icon SHALL maintain a size proportionate to its card at every skills-grid layout (single column, 2x2, and four-column row), and SHALL NOT shrink to a size that appears visually unbalanced against the card's title and description text.

#### Scenario: Icon remains proportionate in 2x2 layout
- **WHEN** the skills grid renders in its 2x2 layout
- **THEN** each skill card's icon renders large enough to remain visually balanced against that card's title and description text

---
### Requirement: Skill card spacing when stacked or 2x2
When the skills grid renders as a single column or as a 2x2 grid, the vertical gap between skill cards SHALL be large enough that adjacent cards do not visually appear connected or touching.

#### Scenario: Stacked skill cards have visible separation
- **WHEN** the skills grid renders as a single column on a narrow viewport
- **THEN** a visible gap separates each skill card from the next, distinct from the spacing used between elements within a single card

#### Scenario: 2x2 skill cards have visible row separation
- **WHEN** the skills grid renders as a 2x2 grid
- **THEN** a visible gap separates the top row of cards from the bottom row, distinct from the spacing used between elements within a single card

---
### Requirement: Community participation section
The About page SHALL display a "積極參與設計社群與課程" section as the final section of the page, immediately after 工作經歷, using the page's existing section-heading treatment (icon + `<h2>` + rule). The section SHALL have 160px of padding above its content and 160px of padding below it, at every supported viewport width. No additional gap SHALL be added between this section and the Footer beyond that 160px of padding — the Footer SHALL sit immediately after it.

#### Scenario: Section renders at the bottom of the page
- **WHEN** a visitor scrolls to the bottom of the About page
- **THEN** the "積極參與設計社群與課程" heading and its content render as the last section on the page, with 160px of space above the heading and 160px of space between the section's content and the Footer that follows it, and no additional gap

---
### Requirement: Community showcase cards
The section SHALL contain exactly two image-and-caption cards, each consisting of an image and a caption below it, with no border, shadow, or background applied to the card:
- The first card SHALL show `content/img/web/online.png` with the caption "線上工作坊 & Side Project".
- The second card SHALL show `content/img/web/offline.png` with the caption "線下講座 & 社群活動".

Each card's image SHALL render at a maximum height of 468px (0.9× the section's original 520px cap), scaled proportionally (preserving its aspect ratio, without cropping or distortion) and without any reduction in source image quality. Each caption SHALL render at 20px font size and 400 font weight, in `#1e1e1e`.

#### Scenario: Card image is proportionally constrained
- **WHEN** the section renders on any viewport
- **THEN** each of the two images renders no taller than 468px and keeps its original aspect ratio, with the caption visible below it in 20px/400 weight `#1e1e1e` text

---
### Requirement: Community showcase card layout
At desktop viewport widths, the two cards SHALL render side by side, each occupying an equal-width half of the section's content area with an 80px gap between the two halves; within each half, the image and its caption SHALL be horizontally centered. The gap between an image and its caption SHALL be 24px at desktop widths.

At mobile viewport widths, the two cards SHALL stack vertically, each spanning the full width of the section's content area, with the image and caption horizontally centered. The gap between an image and its caption SHALL be 12px at mobile widths.

#### Scenario: Desktop layout is side by side
- **WHEN** the section renders at a desktop viewport width
- **THEN** the two cards render side by side as equal-width halves with an 80px gap between them, each card's image and caption centered within its half, and 24px between each card's image and caption

#### Scenario: Mobile layout stacks
- **WHEN** the section renders at a mobile viewport width
- **THEN** the two cards render stacked vertically, each full width with its image and caption centered, and 12px between each card's image and caption

---
### Requirement: Section background decoration
The section SHALL render two large blurred circles in its background, horizontally aligned with the cards row (vertically centered on it) and positioned to the outer sides of the cards (one beside the left card, one beside the right card) rather than at the section's corners:
- A circle filled `#FFF4E4`, blurred, positioned beside the left card.
- A circle filled `#FFFDE5`, blurred, positioned beside the right card.

The circles SHALL render behind the section's heading and cards, and SHALL NOT obscure or reduce the legibility of that foreground content. The circles' diffusion effect is NOT constrained to this section's own box: it SHALL be visually free to extend into the page content immediately above the section (工作經歷). It SHALL NOT extend into the Footer below.

#### Scenario: Background circles sit beside the cards
- **WHEN** the section renders on any viewport
- **THEN** a blurred `#FFF4E4` circle appears beside the left card and a blurred `#FFFDE5` circle appears beside the right card, both vertically centered on the cards row and behind the heading and cards

#### Scenario: Diffusion bleeds above but not into the Footer
- **WHEN** a visitor views the boundary between 工作經歷 and the community section, and separately the boundary between the community section and the Footer
- **THEN** the glow's soft diffusion is visible extending upward past the community section's own top edge into 工作經歷, and is not visible anywhere within the Footer

---
### Requirement: Staggered card entrance
The two cards SHALL animate into view one after another (not simultaneously) the first time they scroll into the viewport, each entering with the same bottom-to-top fade/slide treatment already used elsewhere on the About page (e.g. 工作經歷's items).

#### Scenario: Cards enter in sequence
- **WHEN** a visitor scrolls the two cards into view for the first time
- **THEN** the left card begins its entrance animation before the right card does, rather than both animating in at the same instant

---
### Requirement: About page renders finalized content sections
The About page SHALL render, in order, the sections finalized in `content/About_頁面內容_v1.md`: photo, 人, 思維, 經歷, 技能, and Experience.

#### Scenario: Visitor loads About page
- **WHEN** a visitor loads the About page
- **THEN** the photo, 人, 思維, 經歷, 技能, and Experience sections are all present, in that order


<!-- @trace
source: build-portfolio-site
updated: 2026-09-20
code:
  - src/pages/work/[slug].astro
  - src/pages/index.astro
  - .spectra.yaml
  - src/styles/tokens.css
  - src/components/Nav.astro
-->

---
### Requirement: Beyond Work placeholder
Until real Beyond Work content is supplied, the About page SHALL render the placeholder text "AI 相關的個人專案整理中，稍後補上。" in the Beyond Work section instead of leaving the section empty or omitting it.

#### Scenario: Beyond Work section shown with placeholder
- **WHEN** a visitor reaches the Beyond Work section on the About page
- **THEN** the text "AI 相關的個人專案整理中，稍後補上。" is displayed


<!-- @trace
source: build-portfolio-site
updated: 2026-09-20
code:
  - src/pages/work/[slug].astro
  - src/pages/index.astro
  - .spectra.yaml
  - src/styles/tokens.css
  - src/components/Nav.astro
-->

---
### Requirement: About page email contact
The About page SHALL display the owner's email address as a `mailto:` link.

#### Scenario: Visitor views email section
- **WHEN** a visitor reaches the email section of the About page
- **THEN** a `mailto:` link addressed to `wsad71155@gmail.com` is shown

<!-- @trace
source: build-portfolio-site
updated: 2026-09-20
code:
  - src/pages/work/[slug].astro
  - src/pages/index.astro
  - .spectra.yaml
  - src/styles/tokens.css
  - src/components/Nav.astro
-->