## ADDED Requirements

### Requirement: Community participation section
The About page SHALL display a "積極參與設計社群與課程" section as the final section of the page, immediately after 工作經歷, using the page's existing section-heading treatment (icon + `<h2>` + rule). The section SHALL have 160px of padding above its content and 160px of padding below it, at every supported viewport width. No additional gap SHALL be added between this section and the Footer beyond that 160px of padding — the Footer SHALL sit immediately after it.

#### Scenario: Section renders at the bottom of the page
- **WHEN** a visitor scrolls to the bottom of the About page
- **THEN** the "積極參與設計社群與課程" heading and its content render as the last section on the page, with 160px of space above the heading and 160px of space between the section's content and the Footer that follows it, and no additional gap

### Requirement: Community showcase cards
The section SHALL contain exactly two image-and-caption cards, each consisting of an image and a caption below it, with no border, shadow, or background applied to the card:
- The first card SHALL show `content/img/web/online.png` with the caption "線上工作坊 & Side Project".
- The second card SHALL show `content/img/web/offline.png` with the caption "線下講座 & 社群活動".

Each card's image SHALL render at a maximum height of 468px (0.9× the section's original 520px cap), scaled proportionally (preserving its aspect ratio, without cropping or distortion) and without any reduction in source image quality. Each caption SHALL render at 20px font size and 400 font weight, in `#1e1e1e`.

#### Scenario: Card image is proportionally constrained
- **WHEN** the section renders on any viewport
- **THEN** each of the two images renders no taller than 468px and keeps its original aspect ratio, with the caption visible below it in 20px/400 weight `#1e1e1e` text

### Requirement: Community showcase card layout
At desktop viewport widths, the two cards SHALL render side by side, each occupying an equal-width half of the section's content area with an 80px gap between the two halves; within each half, the image and its caption SHALL be horizontally centered. The gap between an image and its caption SHALL be 24px at desktop widths.

At mobile viewport widths, the two cards SHALL stack vertically, each spanning the full width of the section's content area, with the image and caption horizontally centered. The gap between an image and its caption SHALL be 12px at mobile widths.

#### Scenario: Desktop layout is side by side
- **WHEN** the section renders at a desktop viewport width
- **THEN** the two cards render side by side as equal-width halves with an 80px gap between them, each card's image and caption centered within its half, and 24px between each card's image and caption

#### Scenario: Mobile layout stacks
- **WHEN** the section renders at a mobile viewport width
- **THEN** the two cards render stacked vertically, each full width with its image and caption centered, and 12px between each card's image and caption

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

### Requirement: Staggered card entrance
The two cards SHALL animate into view one after another (not simultaneously) the first time they scroll into the viewport, each entering with the same bottom-to-top fade/slide treatment already used elsewhere on the About page (e.g. 工作經歷's items).

#### Scenario: Cards enter in sequence
- **WHEN** a visitor scrolls the two cards into view for the first time
- **THEN** the left card begins its entrance animation before the right card does, rather than both animating in at the same instant
