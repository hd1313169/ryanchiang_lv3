## Context

`src/pages/about.astro` currently renders bio copy, a vertical facts list beside the photo, a "我的技能" card grid, and a "我的經歷" timeline list, all defined as local data arrays inside the component's frontmatter (see proposal.md - Why/What Changes). The reference design's Nav and Footer are unaffected — both already come from shared `src/components/Nav.astro` and `src/components/Footer.astro` via `BaseLayout.astro`.

The finalized portrait and four skill icons currently live in `content/img/web/` (`avatar.png`, `skill-01.png`–`skill-04.png`), a staging folder outside `src/`. Every other image used on the site is imported from `src/assets/...` so Astro's `<Image>` component can process it (existing pattern: `src/assets/photos/`, `src/assets/icons/`).

## Goals / Non-Goals

**Goals:**
- Update `about.astro`'s data and markup so the bio, facts, skills, and experience sections match the finalized copy and layout from specs/about-page/spec.md.
- Bring the new portrait and skill icons into the `src/assets/` pipeline so they're optimized like the rest of the site's imagery.

**Non-Goals:**
- No changes to `Nav.astro`, `Footer.astro`, or `BaseLayout.astro`.
- No changes to the site-projects section's data or the Notion template link — screenshot styling nuances there are out of scope unless they fall out of shared section-heading/spacing tokens already in use.
- Not building a generic icon/CMS system — the four skill icons are a fixed, hand-picked set of raster images.

## Decisions

- **Move images into `src/assets/photos/` and a new `src/assets/icons/skills/` (or reuse `src/assets/icons/`)**: follows the existing convention (`gmail.png`, `linkedin.png`, `cake.png` already live under `src/assets/icons/`), keeps `<Image>` optimization consistent, and avoids introducing a second image-loading path (`public/` or raw `<img src>`) just for this page. The `content/img/web/` copies are the source hand-off from the user, not a runtime asset location.
- **Replace `src/assets/photos/avatar.png` in place** rather than adding a second differently-named file: the new crop supersedes the old one and nothing else references the old file (only `about.astro` imports `portrait`).
- **Keep facts as a `<dl>` row, only changing layout (flex column → flex row) via CSS**, not restructuring the underlying `facts` data array — content and semantics are unchanged, only position and axis change.
- **Skills section**: replace the `border + left-accent card` styling with a full-bleed banded `<section>` (background color spanning the viewport width, content constrained to the page's max-width) containing a 4-up icon grid, mirroring the page's existing `.section-row` heading pattern rather than introducing a new heading component. Icons render via `<Image>` at a fixed small display size (icons are pre-composed graphics, not tokens to recolor).
- **Experience section**: restructure the existing `experience` array's per-item shape from `{ role, org, period, description: string | string[] }` to `{ role, org, period, headline, bullets: string[] }` so the two-column (role/org/period left, headline+checklist right) layout has a dedicated field for the bold headline instead of overloading `description`. This is a local data-shape change inside `about.astro`, not a shared type.
- **Checklist bullets styled as checkboxes**: pure CSS (`::before` or a static square glyph) rather than real `<input type="checkbox">` elements, since these are static achievement statements, not interactive form controls.

## Risks / Trade-offs

- [Skill icons are static PNGs at fixed sizes, not theme-aware SVGs] → Acceptable: the reference design uses flat gray/white illustrations that read fine on both light and dark backgrounds already used elsewhere (e.g. `gmail.png`, `linkedin.png` icons in the footer follow the same pattern); no new dark-mode handling needed.
- [Restructuring the `experience` array shape is a breaking change to that local data structure] → Low risk: the array is only consumed within `about.astro` itself, so no other file needs updating.

## Migration Plan

1. Copy `content/img/web/avatar.png` over `src/assets/photos/avatar.png`; copy `skill-01.png`–`skill-04.png` into `src/assets/icons/`.
2. Update `about.astro`'s data arrays (bio copy, facts values unchanged, skills, experience) and markup/styles per the Decisions above.
3. Visually verify against the reference screenshot at mobile and desktop widths (the page already has responsive breakpoints for the intro grid, skills grid, and side-projects grid to extend the same pattern to the new sections).
4. No rollback complexity — this is a content/presentation-only change to one page with no data migration or external dependency.
