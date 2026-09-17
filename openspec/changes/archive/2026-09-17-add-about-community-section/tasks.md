## 1. Markup

- [x] 1.1 Import `content/img/web/online.png` and `content/img/web/offline.png` as Astro image assets in `about.astro`, and verify the dev server builds without an asset-resolution error
- [x] 1.2 Add the `積極參與設計社群與課程` `<section>` after `工作經歷`, reusing the existing `.section-heading`/`.section-icon`/`.section-rule` markup, and verify the heading renders with the same icon/rule treatment as 我擅長的事/工作經歷
- [x] 1.3 Add the two image+caption cards inside the section (online.png / "線上工作坊 & Side Project" on the left, offline.png / "線下講座 & 社群活動" on the right) and verify both render with visible captions

## 2. Layout and styling

- [x] 2.1 Make the section full-bleed (100vw + negative margins, inner content capped at the page's 90rem column), mirroring `.skills-band`/`.ai-band`, and verify the section's background spans the full viewport width while heading/cards stay aligned with the rest of the page content
- [x] 2.2 Apply 160px padding-block to the section at all viewport widths, and verify computed padding-top/padding-bottom are each 160px in devtools on both a desktop and mobile viewport
- [x] 2.3 Implement the two-card grid: desktop 2-column with an 80px column gap, mobile single column (`gap: 0`), and verify cards sit side by side with an 80px gap at a desktop width and stack vertically at a mobile width
- [x] 2.4 Constrain each card image to `max-height: 468px` (0.9× the original 520px cap) with proportional scaling and no quality loss, and verify neither image exceeds 468px tall or appears stretched/compressed at any viewport width
- [x] 2.5 Style each caption at 20px / font-weight 400 / `#1e1e1e`, and verify computed styles match in devtools
- [x] 2.6 Set the image-to-caption gap to 24px at desktop widths and 12px at mobile widths, and verify both breakpoints in devtools

## 3. Background decoration

- [x] 3.1 Reposition the two blurred circles to sit beside the cards (vertically centered on the cards row, horizontally at the left/right edge of the two-column grid) instead of the section's corners, and verify both are visible without overlapping/obscuring the heading or card text
- [x] 3.2 Let the glow's diffusion bleed upward past the section's own top edge into 工作經歷, without clipping it there, and verify it's visible extending into that section when scrolled to the boundary
- [x] 3.3 Clip the glow so it does not extend into the Footer below, and verify no tint is visible anywhere within the Footer
- [x] 3.4 Verify both circles remain non-interactive (`pointer-events: none` or equivalent) and don't shift page layout or trigger horizontal scroll
- [x] 3.5 Fix the glow painting on top of the section heading: give `.community-band-inner .section-heading` an explicit `position: relative; z-index: 1` (higher than `.community-cards`' `z-index: 0`) so it stacks above the glow-carrying cards row, and verify the heading text stays fully legible/undimmed at every scroll position
- [x] 3.6 Shrink the glow circles from 1000px to 600px diameter, and verify they still sit beside the cards without dominating the section visually

## 4. Verification

- [x] 4.1 Manually check the About page end-to-end at a desktop width and a mobile width (devtools responsive mode), confirming section order, spacing, card layout, 0.9× image scaling, and the repositioned/bleeding background circles all match the spec
- [x] 4.2 Run `openspec validate add-about-community-section --strict` and confirm it passes
- [x] 4.3 Override Footer's own `margin-top` to 0 scoped to the About page (`:global(footer.footer) { margin-top: 0 !important; }`), and verify in devtools that the Footer's computed `margin-top` is `0px` and it sits directly after the section's own 160px `padding-bottom` with no extra gap
- [x] 4.4 Zero out `.about`'s own trailing bottom padding (`padding-block: clamp(1.5rem, 4vw, 2rem) 0`), since it stacked on top of the section's 160px `padding-bottom` and the Footer margin-top fix alone left an unaccounted gap; verify via `getBoundingClientRect()` that the gap between `.community-band`'s bottom and the Footer's top is exactly 0
- [x] 4.5 Add a `reveal` class to each `.community-card` plus a `:nth-of-type` stagger (`transition-delay: 0ms` / `180ms`) so the two cards fade/slide in one after another on first scroll into view, and verify via computed `opacity` at staggered timeouts that the left card's opacity rises before the right card's
