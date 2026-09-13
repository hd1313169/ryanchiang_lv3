## Context

All affected styles live in one `<style>` block in [src/pages/about.astro](src/pages/about.astro). The site's existing breakpoint vocabulary (used elsewhere in the codebase) is `40em`(640px), `48em`(768px), `62em`(992px), `80em`(1280px), `90em`(1440px). The About page currently only uses `40em` and `80em`. Global spacing/type tokens live in [src/styles/tokens.css](src/styles/tokens.css) and are shared by every page — see proposal.md for why fixed-value spacing/type mismatches are a problem here.

## Goals / Non-Goals

**Goals:**
- Make every affected spacing value and breakpoint decision concrete and traceable to the specs in this change.
- Keep all changes scoped to `about.astro`'s own styles — do not touch shared tokens in `tokens.css`, since other pages are out of scope.
- Achieve the new layouts (intro breakpoint, skills 2x2, stacked photo/text order) using CSS only — no markup/DOM reordering, no JS changes.

**Non-Goals:**
- No change to the `.experience` (two-column at `48em`) or `.side-projects` (two-column at `48em`) breakpoints — only their spacing scales, not their column-count logic, per the proposal.
- No change to the sticky skills/AI-band scroll-cover mechanism or its own `40em` breakpoint.
- No visual redesign beyond what the specs require (colors, borders, icons stay as they are, aside from icon sizing per the skill-icon requirement).

## Decisions

### Spacing: `clamp()` instead of fixed tokens or hard breakpoint jumps
Each affected padding/gap becomes a `clamp(min, preferred-vw, max)` expression instead of a single `var(--space-N)` value, so spacing scales continuously with viewport width rather than jumping at one breakpoint (or never changing at all). This is applied locally in `about.astro`, not by editing the shared `--space-*` tokens.

| Selector | Property | Current | New |
|---|---|---|---|
| `.about` | `padding-block` | `var(--space-4) var(--space-6)` (32px / 72px, fixed) | `clamp(1.5rem, 4vw, 2rem) clamp(2.5rem, 6vw, 4.5rem)` |
| `.section-row` | `padding-top` | `var(--space-6)` (72px, fixed) | `clamp(2rem, 6vw, 4.5rem)` |
| `.skills-band` | `padding-block` | `calc(var(--space-7) + var(--space-4))` (144px, fixed) | `clamp(3rem, 10vw, 9rem)` |
| `.ai-band` | `padding-block` | `var(--space-7)` (112px, fixed) | `clamp(2.5rem, 8vw, 7rem)` |
| `.experience-item` | `padding-block` | `40px` (fixed) | `clamp(1.5rem, 4vw, 2.5rem)` |
| `.side-projects` | `gap` | `var(--space-4)` (32px, fixed) | `clamp(1.5rem, 4vw, 2rem)` |
| `.section-heading` | `margin-bottom` (heading-to-content gap, shared by 我擅長的事/工作經歷/個人專案) | `var(--space-6)` (72px, fixed) | `clamp(1.5rem, 6vw, 4.5rem)` |
| `.ai-heading` | `margin-bottom` | `40px` (fixed) | `clamp(1.25rem, 5vw, 2.5rem)` |
| `.ai-summary` | `margin-bottom` (text-to-flowchart gap) | `var(--space-6)` (72px, fixed) | `clamp(2rem, 6vw, 4.5rem)` |
| `.skill-icon` | `margin-bottom` (icon-to-title gap) | `32px` (fixed) | `clamp(1rem, 4vw, 2rem)` |
| `.skill dt` | `margin-bottom` (title-to-description gap) | `8px` (fixed) | `clamp(4px, 1vw, 8px)` |

`.intro-grid`'s gap and `.bio`'s internal gap are left as-is (`var(--space-5)` / `var(--space-3)`) — they're already modest and not called out in the proposal.

Every internal card/section gap (icon→title, title→description, heading→content, AI text→flowchart) was originally reviewed and shrunk on mobile alongside the *outer* spacing above — an initial pass only fixed the outer spacing and missed these internal gaps, which is corrected here.

### Type scale: section heading must outrank card/item titles
`.section-heading h2` changes from `clamp(20px, 3vw, 27px)` to `clamp(22px, 4.5vw, 38px)`. Checked against every nested title it must dominate:
- `.job-title`: `clamp(20px, 4vw, 36px)` — new heading formula's floor (22 > 20), growth rate (4.5vw > 4vw), and ceiling (38 > 36) all dominate at every viewport width, so the heading is never smaller than the job title.
- `.skill dt`: fixed `20px` — dominated by the heading's `22px` floor at every width.

`.ai-heading h2` inherits this change (it shares the `.section-heading h2` rule).

### Mobile body copy: 14px below `40em`
`.run-in` and `.ai-summary` get a mobile-first base of `font-size: 14px`, with the existing `var(--text-base)` (17px) restored inside the page's existing `@media (min-width: 40em)` block. Reusing `40em` keeps this aligned with the page's other tablet-and-up transitions instead of introducing a new breakpoint.

### Intro section: side-by-side at `62em` (992px), not `80em`
The `.intro-grid` row-layout rule moves from `@media (min-width: 80em)` into the page's existing `@media (min-width: 62em)` block (shared with the skills grid's 4-column state, since both land on the same site-standard `62em`/992px breakpoint). This was originally drafted as a new `64em` (1024px) breakpoint, but the requirement is that the side-by-side (左文右圖) layout holds through 992px itself and only stacks *below* it — `64em` would have wrongly stacked the 992–1023px range. `62em` (`min-width`, so it applies at exactly 992px and up) matches this exactly. The desktop layout doesn't otherwise change: `.bio`/`.side` keep shrinking together via `flex: 3`/`flex: 2`, and the photo's existing `width: min(100%, 22rem)` cap means it scales down proportionally as the row narrows near 992px, rather than needing separate shrink logic.

### Stacked intro layout: keep `order: -1`, center via `align-items`
`.side` keeps `order: -1` (its original value), which visually reorders the photo before the bio text when `.intro-grid` is a column (stacked) — satisfying "photo-on-top, text-below" (上圖下文). `order: 0` is added inside the `@media (min-width: 62em)` block to reset this for the desktop side-by-side layout, where DOM order (bio, then side) already puts text on the left and photo on the right.

`align-items: flex-end` on `.side` (used to right-align the photo) changes to `align-items: center` at the base (stacked) level. To preserve the existing desktop appearance, `align-items: flex-end` is re-added inside the `@media (min-width: 62em)` block.

### Facts list: hard switch, not wrap
`.facts` drops `flex-flow: row wrap` in favor of `flex-direction: column` (mobile-first) and switches to `flex-direction: row` inside a `@media (min-width: 30em)` block. `justify-content: space-between` is kept for the row state. This guarantees exactly two states — full column or full row — with no partial-wrap in between. `30em` (480px) is chosen because it's comfortably above the narrowest supported phone widths (~320–375px), where three columns of "SPECIALTY / EXPERIENCE / EMAIL" plus values would otherwise crowd.

### Skills grid: three-state column count
`.skills`'s `grid-template-columns` gains a middle state:
- `< 36em` (576px): `1fr` (single column) — unchanged.
- `36em`–`62em` (576px–992px): new `repeat(2, 1fr)` state.
- `≥ 62em` (992px): `repeat(4, 1fr)` — unchanged (currently gated at `40em`; moved to `62em` since `40em` now belongs to the new 2x2 state).

`36em`/`62em` are exact matches for the user-specified 576px/992px range and reuse the site's existing `62em` breakpoint value (used elsewhere for a similar 4-column decision on `index.astro`).

The same `36em`–`62em` tablet range gets a dedicated `.skills-band` `padding-block` override, `clamp(4.5rem, 12vw, 8rem)` (72px–128px) — noticeably larger than what the base continuous curve (`clamp(3rem, 10vw, 9rem)`) alone produces in that range (~77–99px), per explicit tablet-specific feedback that the band felt too tight there.

Gap also needs a value for the new 2x2 state (previously it was only ever `0` at ≥40em or `var(--space-4)` below it):
- `< 36em`: `gap: clamp(2.5rem, 10vw, 3.5rem)` (40px–56px) — see skill-card-spacing decision below.
- `36em`–`62em`: `gap: clamp(2.5rem, 6vw, 3rem) var(--space-3)` (40px–48px row-gap / 24px column-gap) — a real 2D grid needs both axes spaced, unlike the 4-column row where cards touch and rely on `padding-inline` + implicit division instead of a gap. Both the single-column and 2x2 states need a visibly larger *row*-gap than the original draft used (card-to-card vertical spacing specifically, not just any spacing) — that's the row-gap component here and in the state above.
- `≥ 62em`: `gap: 0` — unchanged (single row, no vertical stacking to space).

### Skill icon: raise the floor, don't just scale by viewport
`.skill-icon`'s `clamp(3.5rem, 8vw, 108px)` changes to `clamp(4.5rem, 10vw, 108px)`. The old floor (56px) was reached by ~700px viewport width and stayed flat below that — meaning the icon looked equally small whether the card was full-width (mobile, 1 column) or a quarter-width (desktop, 4 columns) once shrunk. Raising the floor to 72px keeps the icon legible relative to the card's title/description text across the single-column and 2x2 states where each card has more width to spare; the `108px` ceiling (reached on wide viewports) is unchanged.

### Skill card spacing when stacked or 2x2
Addressed inside the same `.skills` gap decision above: both the single-column (`< 36em`) and 2x2 (`36em`–`62em`) states' row-gap increase — from the fixed `var(--space-4)` (32px) to `clamp(2.5rem, 10vw, 3.5rem)` (40px–56px) and `clamp(2.5rem, 6vw, 3rem)` (40px–48px) respectively — giving clearly more separation between card rows than the original draft's 32px, which still read as cramped.

### Third correction round: photo sizing, intro heading scale, facts gap, and section-spacing floors
Three further gaps surfaced after the second correction pass:

- **Stacked portrait wasn't shrinking or getting a shorter gap to the text below it.** `.photo`'s `width: min(100%, 22rem)` stayed the same whether stacked or side-by-side, and `.intro-grid`'s `gap` was a flat `var(--space-5)` (48px) in both layouts. Fixed by making the base (stacked) `.photo` width `clamp(9rem, 45vw, 14rem)` (144px–224px, well below the 352px desktop size) and re-asserting `width: min(100%, 22rem)` inside the `min-width: 62em` block for the desktop layout; `.intro-grid`'s `gap` became `clamp(1rem, 4vw, 3rem)` (16px–48px) so the stacked photo-to-text gap is short while the desktop row-gap still tops out at the original 48px.
- **`.intro` heading was a fixed `var(--text-xl)` (35px) at every width.** Changed to `clamp(1.5rem, 5vw, 2.1875rem)` (24px–35px) so it scales down like every other heading on the page.
- **`.facts` gap was a flat `var(--space-4)` (32px).** Changed to `clamp(1rem, 4vw, 2rem)` (16px–32px).
- **Several section-level spacing clamps (from the first correction pass) had floors set too low relative to their ceiling**, making mobile spacing collapse more than intended once seen rendered rather than just computed. Floors were raised while ceilings were left untouched:

| Selector | Property | Previous | Corrected |
|---|---|---|---|
| `.about` | `padding-block` (bottom) | `clamp(2.5rem, 6vw, 4.5rem)` | `clamp(3rem, 6vw, 4.5rem)` |
| `.section-row` | `padding-top` | `clamp(2rem, 6vw, 4.5rem)` | `clamp(3rem, 6vw, 4.5rem)` |
| `.skills-band` | `padding-block` | `clamp(3rem, 10vw, 9rem)` | `clamp(5rem, 10vw, 9rem)` |
| `.ai-band` | `padding-block` | `clamp(2.5rem, 8vw, 7rem)` | `clamp(4rem, 8vw, 7rem)` |
| `.experience-item` | `padding-block` | `clamp(1.5rem, 4vw, 2.5rem)` | `clamp(1.75rem, 4vw, 2.5rem)` |
| `.section-heading` | `margin-bottom` | `clamp(1.5rem, 6vw, 4.5rem)` | `clamp(2.5rem, 6vw, 4.5rem)` |
| `.ai-heading` | `margin-bottom` | `clamp(1.25rem, 5vw, 2.5rem)` | `clamp(1.5rem, 5vw, 2.5rem)` |
| `.ai-summary` | `margin-bottom` | `clamp(2rem, 6vw, 4.5rem)` | `clamp(3rem, 6vw, 4.5rem)` |

This is a deliberate distinction from the intro's photo-to-text gap and the `.facts` gap above: those are *component-internal* gaps that should shrink aggressively on mobile, while the table above is *section-level* spacing that should still shrink, just not as far down.

## Risks / Trade-offs

- **`clamp()` viewport-percentage math is harder to eyeball than fixed tokens** → mitigated by picking round `rem` floors/ceilings that match or bracket the existing fixed values, so the extremes match today's design intent and only the in-between scaling is new.
- **Moving the skills grid's 4-column breakpoint from `40em` to `62em`** changes behavior for viewports between 640px–992px that previously already showed 4 columns → this is the intended fix (proposal explicitly asks for a 2x2 middle state), called out here so it isn't mistaken for a regression.
- **Reusing `.section-heading h2` for both `.section-heading` and `.ai-heading`** means the AI band's heading also grows → acceptable since it's still a section heading and the dark band has room; not called out as a problem in the proposal.

## Migration Plan

Single-file CSS change with no data/runtime migration. Ship behind normal PR review; verify visually at 375px, 576px, 768px, 992px, 1024px, 1280px, 1440px per the scenarios in `specs/about-page/spec.md`.
