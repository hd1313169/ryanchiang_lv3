## Why

The About page currently ends right after 工作經歷. It doesn't showcase the site owner's ongoing participation in the design community — workshops, side projects, talks, and events — which is part of how they position themselves professionally. Adding a closing section makes that visible.

## What Changes

- Add a new full-bleed section at the bottom of the About page, titled "積極參與設計社群與課程", using the page's existing section-heading pattern (icon + `<h2>` + rule).
- Add two image + caption cards inside the section:
  - Left: `content/img/web/online.png`, caption "線上工作坊 & Side Project" (20px / 400)
  - Right: `content/img/web/offline.png`, caption "線下講座 & 社群活動" (20px / 400)
  - Each image is capped at 520px max-height, scaled proportionally (no distortion/cropping).
  - Desktop: cards render side by side, each occupying an equal-width half of the section with no gap between the two halves. Mobile: cards stack vertically.
  - Cards have no border/shadow/background — just image and caption, centered.
- Add two large blurred decorative circles to the section background: `#FFF4E4` flush to the section's top edge and the viewport's left edge; `#FFFDE5` flush to the section's bottom edge and the viewport's right edge. **This is the first use of color and decorative blur in the site's design system**, which is otherwise deliberately grayscale (see `tokens.css`) — introduced here as a deliberate accent for this warmer, closing section rather than an oversight.
- Section padding: 160px top and bottom (fixed, not clamped/responsive, per explicit spec).

## Capabilities

### Modified Capabilities
- `about-page`: adds a new closing section (community/course participation) with its own layout, imagery, and background-decoration requirements.

## Impact

- `src/pages/about.astro`: new `<section>` markup + scoped styles, plus imports for `content/img/web/online.png` and `content/img/web/offline.png` as Astro image assets.
- No changes to shared components, tokens, or other pages. `tokens.css`'s grayscale-only color guidance is not amended — this section is a documented, scoped exception.
