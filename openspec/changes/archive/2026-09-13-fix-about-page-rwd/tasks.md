## 1. Section and card spacing

- [x] 1.1 Change `.about` `padding-block` to `clamp(1.5rem, 4vw, 2rem) clamp(2.5rem, 6vw, 4.5rem)` and verify at 375px the top/bottom padding is visibly smaller than at 1440px, with no layout shift elsewhere on the page.
- [x] 1.2 Change `.section-row` `padding-top` to `clamp(2rem, 6vw, 4.5rem)` and verify spacing above "工作經歷" and "個人專案" scales down on a 375px viewport vs. a 1440px viewport.
- [x] 1.3 Change `.skills-band` `padding-block` to `clamp(3rem, 10vw, 9rem)` and `.ai-band` `padding-block` to `clamp(2.5rem, 8vw, 7rem)`, and verify both bands are noticeably shorter (less top/bottom whitespace) at 375px than at 1440px.
- [x] 1.4 Change `.experience-item` `padding-block` to `clamp(1.5rem, 4vw, 2.5rem)` and verify spacing between experience entries scales down on mobile.
- [x] 1.5 Change `.side-projects` `gap` to `clamp(1.5rem, 4vw, 2rem)` and verify the gap between project cards scales down on mobile.

## 2. Type scale

- [x] 2.1 Change `.section-heading h2` from `clamp(20px, 3vw, 27px)` to `clamp(22px, 4.5vw, 38px)` and verify, at 375px/768px/1024px/1440px, that the rendered `<h2>` font size is always ≥ `.job-title`'s font size and ≥ `.skill dt`'s 20px at the same width.
- [x] 2.2 Verify `.ai-heading h2` (which inherits the same rule) still reads correctly against the dark `.ai-band` background at all four widths above — no truncation or overlap with `.section-icon`/`.section-rule`.

## 3. Mobile body copy

- [x] 3.1 Set `.run-in` and `.ai-summary` base `font-size` to `14px`, then restore `font-size: var(--text-base)` for both inside the existing `@media (min-width: 40em)` block, and verify computed font size is 14px below 640px width and 17px at/above it.

## 4. Intro section breakpoint and stacked layout

- [x] 4.1 Move the `.intro-grid` row-layout rule (and its `.bio`/`.side` `flex` values) from `@media (min-width: 80em)` to `@media (min-width: 64em)`, and verify the intro section is side-by-side at 1024px and 1279px, and still stacked at 1023px.
- [x] 4.2 Remove `order: -1` from the base `.side` rule and remove the now-redundant `order: 0` reset from the (renamed) `min-width: 64em` block; verify that when stacked (e.g. 768px), the bio text renders above the portrait photo in visual order.
- [x] 4.3 Change base `.side` `align-items` from `flex-end` to `center`, and add `align-items: flex-end` inside the `min-width: 64em` block; verify the photo is horizontally centered when stacked (e.g. 768px) and right-aligned when side-by-side (e.g. 1280px, matching current desktop appearance).

## 5. Facts list

- [x] 5.1 Replace `.facts`'s `flex-flow: row wrap` with `flex-direction: column` as the base state, and add `flex-direction: row` (keeping `justify-content: space-between`) inside a new `@media (min-width: 30em)` block; verify at 320px–479px the three facts stack one per row, and at 480px+ they render in a single row with none wrapping to a second line.

## 6. Skills grid layout

- [x] 6.1 Change `.skills`'s `grid-template-columns` rules so: base (< 576px) stays `1fr`; a new `@media (min-width: 36em) and (max-width: 61.9375em)` block sets `repeat(2, 1fr)`; the existing 4-column rule moves from its `min-width: 40em` block to a `min-width: 62em` block. Verify column count is 1 at 400px, 2×2 at 600px and 900px, and a single row of 4 at 1000px.
- [x] 6.2 Set `.skills` `gap` per state: base (< 576px) `clamp(2rem, 8vw, 3rem)`; `36em`–`62em` block `var(--space-4) var(--space-3)`; `≥ 62em` block `0` (unchanged). Verify visible, even spacing between cards at 400px and at 600px/900px (both row-gap and column-gap present), and no gap at 1000px+.
- [x] 6.3 Verify moving the 4-column breakpoint to `min-width: 62em` doesn't break the existing sticky `.skills-band` pin behavior (still triggers via the separate `min-width: 40em` rule for `position: sticky`, which is unaffected by this change).

## 7. Skill icon sizing

- [x] 7.1 Change `.skill-icon` from `clamp(3.5rem, 8vw, 108px)` to `clamp(4.5rem, 10vw, 108px)` and verify, at 400px/600px/900px/1440px, the icon no longer looks disproportionately small against each card's title/description text (visual check against the 2x2 layout from task 6.1 in particular).

## 8. Cross-check against specs

- [x] 8.1 Walk through every scenario in `openspec/changes/fix-about-page-rwd/specs/about-page/spec.md` at the widths it names (375/480/576/640/768/992/1024/1280/1440px) in a real browser (or devtools responsive mode) and confirm each passes.
- [x] 8.2 Run the project's build/lint check (whatever the repo uses, e.g. `npm run build`) to confirm the CSS changes don't break the Astro build.

## 9. Correction pass (post-review)

- [x] 9.1 Move the intro section's side-by-side breakpoint from `64em` (1024px) to `62em` (992px), merged into the existing skills-grid `62em` block, so 左文右圖 holds through 992px itself (only stacks below it) and the photo shrinks proportionally via its existing `width: min(100%, 22rem)` cap instead of switching layout early. Verify 991px is stacked and 992px is side-by-side.
- [x] 9.2 Increase `.skills` row-gap for both the single-column (`clamp(2rem,8vw,3rem)` → `clamp(2.5rem,10vw,3.5rem)`) and 2x2 (`var(--space-4)` → `clamp(2.5rem,6vw,3rem)`) states so card-to-card vertical spacing is clearly larger in both layouts, not just the single-column one. Verify visually at 400px and 600px.
- [x] 9.3 Make in-card spacing responsive: `.skill-icon` `margin-bottom` (`32px` → `clamp(1rem,4vw,2rem)`) and `.skill dt` `margin-bottom` (`8px` → `clamp(4px,1vw,8px)`). Verify icon-to-title and title-to-description gaps are visibly tighter at 375px than at 1440px.
- [x] 9.4 Make AI band internal spacing responsive: `.ai-heading` `margin-bottom` (`40px` → `clamp(1.25rem,5vw,2.5rem)`) and `.ai-summary` `margin-bottom` (`var(--space-6)` → `clamp(2rem,6vw,4.5rem)`). Verify heading→text→flowchart spacing shrinks on mobile.
- [x] 9.5 Make `.section-heading` `margin-bottom` responsive (`var(--space-6)` → `clamp(1.5rem,6vw,4.5rem)`), which controls the heading-to-content gap for 我擅長的事/工作經歷/個人專案 alike. Verify the gap under each section heading is visibly smaller at 375px than at 1440px.
- [x] 9.6 Rebuild (`npm run build`) and re-verify all scenarios in `specs/about-page/spec.md`, plus the corrected 992px boundary, via Playwright screenshots at 375/600/768/991/992/1024/1440px.

## 10. Second correction pass (post-review)

- [x] 10.1 Reverse the stacked intro order back to photo-on-top, text-below (上圖下文): restore `order: -1` on the base `.side` rule and add `order: 0` inside the `min-width: 62em` block to reset it for the desktop side-by-side layout. Verify at 375px/900px the photo renders above the bio text, and at 1440px the desktop left-text/right-photo layout is unaffected.
- [x] 10.2 Add a `.skills-band` `padding-block: clamp(4.5rem, 12vw, 8rem)` override inside the existing `@media (min-width: 36em) and (max-width: 61.9375em)` tablet-range block, so the skills band's top/bottom padding is noticeably larger at tablet widths than the base continuous curve alone produced. Verify at 900px the padding is visibly larger than the pre-change tablet rendering.
- [x] 10.3 Rebuild (`npm run build`) and re-verify via Playwright screenshots at 375/768/900/1440px.

## 11. Third correction pass (post-review)

- [x] 11.1 Shrink the stacked portrait: base `.photo` `width` from `min(100%, 22rem)` to `clamp(9rem, 45vw, 14rem)`, re-asserting `width: min(100%, 22rem)` inside the `min-width: 62em` block for the desktop side-by-side layout. Verify the portrait is visibly smaller at 375px/900px than at 1440px.
- [x] 11.2 Shorten the stacked photo-to-text gap and the desktop row-gap ceiling: `.intro-grid` `gap` from `var(--space-5)` to `clamp(1rem, 4vw, 3rem)`. Verify the gap below the portrait is visibly shorter at 375px than the page's section-level spacing.
- [x] 11.3 Make the intro heading responsive: `.intro` `font-size` from `var(--text-xl)` to `clamp(1.5rem, 5vw, 2.1875rem)`. Verify it's visibly smaller at 375px than at 1440px.
- [x] 11.4 Make `.facts` `gap` responsive: from `var(--space-4)` to `clamp(1rem, 4vw, 2rem)`. Verify the gap between facts is visibly smaller at 375px than at 1440px.
- [x] 11.5 Raise the floors (not ceilings) of the section-level spacing clamps introduced in task group 1 and task 9.5 — `.about` bottom padding, `.section-row` padding-top, `.skills-band` padding-block, `.ai-band` padding-block, `.experience-item` padding-block, `.section-heading` margin-bottom, `.ai-heading` margin-bottom, `.ai-summary` margin-bottom — per the corrected values in design.md, so mobile section spacing reads as deliberate rather than collapsed. Verify visually at 375px against the pre-correction rendering.
- [x] 11.6 Rebuild (`npm run build`) and re-verify via Playwright screenshots at 375px and 1440px (full page).
