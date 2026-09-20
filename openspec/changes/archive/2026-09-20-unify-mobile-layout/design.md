## Context

The site is plain Astro with scoped CSS per page/component and shared tokens in `src/styles/tokens.css`. Spacing is already token-driven (`--space-1`…`--space-7`), and `--page-padding-inline` already switches value at a media query — so a "responsive token" pattern exists. What's missing is applying it to the large spacing steps and to card padding. See proposal.md for the motivation.

Current mobile-related breakpoints in the code are inconsistent: 30em (nav gap), 36em (About skills), 40em (case page stacking, Footer, About, home grids), 48em (`--page-padding-inline`, floating chapter index, BackToTop), 62em (two-column layouts). The chosen unification point is 40em, because it is already where most layouts stack.

Constraints found while reading the code:
- `--space-5` is also used for desktop-only rules (BackToTop offset inside a `min-width: 48em` query; About experience-item gap inside `min-width: 40em`); shrinking it only below 40em does not affect those.
- `about-page` already has a requirement ("Viewport-responsive section and card spacing") that mobile spacing be reduced but "still substantial", and a requirement that the community section keeps **160px** padding at every viewport width. The token change must not violate either.
- `.nav` uses `backdrop-filter`, which makes it the containing block for any `position: fixed` descendant, so a fixed full-screen menu inside it would be clipped to the nav height.

## Goals / Non-Goals

**Goals:**
- One mechanism (tokens) that fixes large-gap complaints site-wide, instead of per-page overrides.
- Every mobile fix keys off the same 40em boundary.
- Desktop (≥40em) rendering stays visually identical, except the page gutter switching at 40em instead of 48em.

**Non-Goals:**
- No changes to type sizes, colors, or copy.
- The About community section's 160px padding stays (fixed by an existing requirement).
- No new JS framework or dependency; the menu toggle is a few lines of inline script.

## Decisions

**1. Shrink only the top three spacing steps below 40em, in `tokens.css`.**
`--space-5/6/7` go from 3 / 4.5 / 7rem to roughly 2 / 3 / 4rem below 40em; steps 1–4 are untouched. This mirrors how `--page-padding-inline` is already handled and cascades to case-page heading margins, `.case-study` padding, Footer, and stacked `gap`s in one edit.
*Alternatives:* (a) semantic role tokens (`--section-gap`, `--block-gap`) — cleaner naming but requires renaming ~100 usages; deferred. (b) per-component `@media` overrides — what the codebase does today and the source of the inconsistency. The exact mobile values are tuned visually in the tasks, not fixed here.

**2. Hardcoded desktop values move onto tokens or `clamp()`.**
Home hero `gap: 80px` and `margin-bottom: calc(var(--space-7) + var(--space-4))`, and the Footer's `calc(var(--space-7) + var(--space-4))` / `padding: var(--space-7)`, become token/`clamp()`-based. `about.astro` community padding (160px) is left alone.

**3. `--card-padding` token for boxed blocks.**
Desktop 40px, below 40em about 20px (≤24px per spec). Applied first to the case page `.meta`; other boxed blocks with hardcoded padding are audited during implementation and moved onto it where they hardcode desktop values (`.image-pair-dark` horizontal padding, etc.).
*Alternative:* reuse `--space-3` (24px) directly — rejected because the desktop value (40px) isn't on the spacing scale and a named token makes the intent explicit.

**3a. `.meta` becomes a one-column list of rows below 40em.**
Each item is a row: icon + label left, value right (`display: grid` with two columns inside the row, or flex with `justify-content: space-between`), the value wrapping in its own cell. The user asked to "try" this layout; if it reads badly on real content, the fallback is label stacked over value (pure vertical) — same markup, CSS-only change.

**4. Pager stacks with next first, using CSS only.**
Below 40em `.case-pager` becomes a column and `.pager-link--next` gets a lower `order`. No markup change, so DOM/tab order stays prev → next while the visual order is next → prev. That mismatch is acceptable for two adjacent links but is noted as a trade-off.
*Alternative:* show only "next" on mobile — rejected because the pager is circular, both links always exist, and dropping one saves no space once stacked.

**5. Stacked media gaps.**
`.image-pair-dark` and `.split-media` set `gap` for the row layout; below 40em their stacked `gap` is reset to a mobile step (≤32px for the dark pair per spec) rather than inheriting the row gap.

**6. Hamburger menu: markup in `Nav.astro`, CSS breakpoint, minimal script.**
A `<button>` (with `aria-expanded`, `aria-controls`) toggles a panel containing the same `<ul>`. The panel is `position: absolute` under the nav bar (not `fixed`) to avoid the `backdrop-filter` containing-block issue. Script handles: toggle, Escape, close on link click, close on `matchMedia('(min-width: 40em)')` change. The same `<ul>` markup serves both layouts (CSS hides/shows it), so desktop markup and behavior are unchanged, and the links remain in the DOM for crawlers and no-JS fallback (without JS the panel simply stays closed; acceptable for a 3-link personal site, mitigated by the brand link and page-bottom Footer).
The panel uses the same translucent, blurred surface as the nav bar and has no divider lines (no border, no separators between links); while open, the bar's bottom hairline is made transparent so bar and panel read as one surface. Because an element with `backdrop-filter` is a backdrop root, the bar's own surface moved from `.nav` to `.nav::before`; otherwise the nested panel could only blur the nav's own empty content, not the page behind it.
*Alternatives:* `<details>`/popover (no JS, but Escape/outside-click/resize handling and styling are weaker), full-screen overlay (overkill for 3 links).

**7. Page gutter breakpoint moves from 48em to 40em.**
`--page-padding-inline: var(--space-5)` now applies from 40em. This brings the gutter in line with everything else; tablets between 40–48em get the wider gutter slightly earlier.

**8. Multi-column tables scroll inside their own block on mobile (found during implementation).**
The case 01 comparison table has about 470px of content in a ~327px column. Its `display: table; overflow-x: auto` never scrolled (overflow doesn't apply to `display: table`), so it widened the whole page and, on real phones, enlarged the layout viewport and shrank the page. Below 40em it becomes `display: block; overflow-x: auto` with tighter cell padding and a `min-width` on body cells, so it scrolls within the article column. Desktop is unchanged.

**9. Tablet (40em–62em): stack three-across groups, wrap experience meta, full-width callouts (found at 768px).**
62em is the site's existing two-column boundary, so it is reused as the tablet/desktop line. Below it: the 痛點/設計挑戰/我的任務 table and `.workflow-cards` (three-across, incl. the `--row` variant; the two-up `--two` variant keeps two columns until 40em) stack to one column; About's `.job-meta` is `nowrap` only from 62em (at 768px the 35% meta column is ~235px and the dates ran into the content column); and callout `max-width: 60%` now applies only from 62em instead of 48em.

## Risks / Trade-offs

- [Shrinking shared tokens affects pages that already looked fine, e.g. About] → About's own spec requires reduced-but-substantial mobile spacing; verify About at 375px after the change and adjust mobile token values if any About block collapses too tightly.
- [`--page-padding-inline` breakpoint shift changes 40–48em layouts] → Check 640–768px widths on all three page types; the floating chapter index (`min-width: 48em`) and case-page right padding (48–90em) keep their own 48em rules unchanged.
- [Nav panel overlapping page content / scroll behaviour] → Panel closes on navigation and Escape; verify it does not cover anchor targets and stays above the back-to-top button (z-index).
- [Visual-order ≠ DOM-order for the pager] → Only two adjacent links; verify screen-reader/tab order still reads sensibly.
- [No screenshots taken yet; the numbers here come from CSS reading] → Verify at 320 / 375 / 430 / 640 / 768px before considering the change done.

## Open Questions

- Exact mobile values for `--space-5/6/7` and `--card-padding` (tuned visually during implementation).
