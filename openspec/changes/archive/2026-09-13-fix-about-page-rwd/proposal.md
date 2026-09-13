## Why

The About page's responsive behavior was never tuned as a system: spacing tokens are applied at a single fixed value regardless of viewport, the intro section only switches to a side-by-side layout at 1280px, the skills grid jumps straight from one column to four with no intermediate step, and several type-scale relationships (section heading vs. card title, mobile body copy) don't hold up under review. This produces cramped or oversized spacing on mobile, awkward line-wraps, and a visual hierarchy that inverts itself at some breakpoints.

## What Changes

- Section and card spacing (`.about`, `.section-row`, `.skills-band`/`.ai-band` padding, `.experience-item` padding, `.skills`/`.side-projects` gap) scale with viewport size instead of using one fixed spacing token everywhere.
- Section heading (`<h2>`) font size is raised so it is never smaller than any card/item title within that section, including `.job-title`, across all breakpoints.
- Body copy (`.run-in`, `.ai-summary`) renders at 14px on mobile.
- The intro/bio section (`.intro-grid`) switches from stacked to side-by-side well before 1280px.
- When the intro section is stacked (below its new breakpoint), the portrait image is centered and rendered *after* the bio text (text-on-top, photo-below), replacing the current photo-first, right-aligned stacked layout.
- The `.facts` list (Specialty / Experience / Email) only ever renders as a clean single column or a clean single row — never a partial/uneven wrap.
- The skills grid (`.skills`) gains an intermediate 2×2 layout between its existing single-column and 4-column states, active roughly in the 576px–992px range.
- Skill icon (`.skill-icon`) sizing is adjusted so it doesn't shrink disproportionately to the card, especially in the new 2×2 layout.
- Skill card spacing (`.skills` gap) is increased when cards are stacked in a single column, so cards no longer read as touching/connected.

No content, copy, or JavaScript behavior changes — this is CSS/layout only.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `about-page`: adds responsive-layout requirements governing spacing scale, type-scale hierarchy, the intro section's stacked/side-by-side breakpoint and stacked arrangement, the facts list's wrap behavior, and the skills grid's column count across breakpoints.

## Impact

- Affected file: [src/pages/about.astro](src/pages/about.astro) (styles only — no markup structure changes beyond what's needed for the bio/photo reorder).
- No API, data, or dependency changes.
- Visual regression risk is contained to the About page; other pages are unaffected.
