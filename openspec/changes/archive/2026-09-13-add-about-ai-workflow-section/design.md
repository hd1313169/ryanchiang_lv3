## Context

`src/pages/about.astro` already has two precedents this change draws from:
- `.skills-band` / `.skill` (about.astro): a full-bleed, numbered 4-card section using `.section-heading` for its title.
- `.workflow-cards` / `.workflow-card` / `.workflow-arrow` (`src/pages/work/[slug].astro`): bordered step cards connected by a text-glyph arrow that rotates 90deg on mobile (breakpoint `40em`, matching `tokens.css`'s scale).

See proposal.md - Why/What Changes for the section's purpose and content.

## Goals / Non-Goals

**Goals:**
- Reuse the existing bordered `.workflow-card` visual language and the site's `40em` mobile breakpoint rather than inventing new tokens.
- Keep the six steps in logical document order (01→06) regardless of viewport, so assistive tech and no-JS/no-CSS fallback read a straight sequence.
- Make the row-1→row-2 continuity legible on desktop despite the two rows having no shared column alignment in content (03 is column 3, 04 is column 1).

**Non-Goals:**
- No changes to `.skills-band` or `.workflow-cards` themselves — this is a new, sibling set of styles scoped to the new section, not a shared/extracted component (only 6 items across 2 pages so far; not worth abstracting yet).
- No data-driven/CMS authoring — content is hardcoded in the same array-literal style already used for `skills`/`experience` in about.astro.

## Decisions

**1. Mobile row-2 reversal via CSS `order`, not DOM reordering.**
The six step objects render in a `<ol>`/`<ul>` in source order 01→06. On mobile, row 2's two items (03, 04) get `order: 1` / `order: 2` swapped (or equivalent grid placement) so 04 paints left and 03 paints right, matching the snake's right-to-left visual flow. This keeps screen-reader order and no-CSS fallback order at 01→06, consistent with how the rest of the page already separates DOM order from visual effect (e.g. `.reveal`'s opacity/transform is purely presentational).
- Alternative considered: reorder the DOM itself for row 2 (1,2,4,3,5,6). Rejected — cards carry visible "03"/"04" numbering, so a screen reader announcing 1,2,4,3,5,6 would contradict the visible labels next to each card.

**2. Grid implementation: CSS Grid with `grid-template-columns` per breakpoint, not flexbox.**
Desktop is a straightforward `repeat(3, 1fr)` grid; mobile switches to `repeat(2, 1fr)` and uses explicit `grid-column`/`order` on the row-2 pair. Grid handles both the column count change and the per-item reordering with the least markup, consistent with `.skills` (`about.astro`) already switching `grid-template-columns` at the same `40em` breakpoint.

**3. Arrows are separate DOM nodes between cards (not `::after` pseudo-elements), following `.workflow-arrow`'s existing precedent.**
Horizontal arrows sit in their own grid cells between cards (desktop: 5 arrow cells across 2 rows plus one row-transition indicator; mobile: reuses the same glyph rotated, plus two vertical connector cells between rows). This mirrors `.workflow-cards`' `grid-template-columns: 1fr auto 1fr auto 1fr` pattern, extended to 2 rows.
- Row 2's horizontal arrow glyph is mirrored (`transform: scaleX(-1)` or swapped Unicode glyph) to point left, matching its reversed visual flow.
- The row1→row2 desktop connector and the mobile inter-row connectors reuse the same downward-arrow treatment `.workflow-arrow` already uses at its mobile breakpoint (`rotate(90deg)` on the same glyph), rather than introducing a new icon.

**4. Breakpoint reuses `40em`**, the same value `.skills`/`.side-projects`/`.experience-item` already switch on in about.astro, so the new section changes layout in lockstep with its neighbors instead of at a slightly different width.

## Risks / Trade-offs

- **[Risk]** Grid + `order`-based reversal can be non-obvious to a future maintainer reading the DOM vs. the rendered page. → **Mitigation**: comment the CSS block explaining the DOM-order-vs-visual-order split (matching the commenting style already used for `.skill-enter`'s no-JS fallback and `.skills-band-inner`'s max-width math).
- **[Risk]** Six short arrow/connector glyphs plus six cards adds visual density on mobile. → **Mitigation**: reuse the existing muted `color-text-secondary` arrow color and modest sizing from `.workflow-arrow` rather than introducing a bolder new arrow style.
- **[Trade-off]** Not extracting a shared "stepped workflow" component even though this is the second instance of the pattern (case-study `.workflow-cards` being the first). Accepted for now per Non-Goals — the two instances differ enough (bare list vs. `.prose`-scoped content, 3 vs. 6 steps, single-row vs. snake) that a premature abstraction would likely need to be reworked anyway.
