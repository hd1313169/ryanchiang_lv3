## Why

The site was built desktop-first, and mobile was patched page by page with scattered `max-width` overrides at inconsistent breakpoints (30 / 36 / 40 / 48 / 62em). On phone widths this leaves three visible problems: the top nav text wraps onto two lines, cards keep their desktop padding and squeeze their content, and the large vertical spacing tokens (`--space-5/6/7` = 48 / 72 / 112px) leave too much white space between blocks. Fixing them one page at a time keeps missing spots; this change handles them once, at the token and component level.

## What Changes

- **Nav**: below 40em, collapse the right-hand links (作品實績 / 關於我 / 履歷) into a hamburger menu that opens a dropdown panel; at 40em and above the nav is unchanged.
- **Spacing tokens**: below 40em, shrink the large spacing steps (`--space-5/6/7`) so section-to-section and heading gaps scale down on phones. Steps 1–4 are unchanged. Hardcoded desktop-only gaps/margins (e.g. hero `gap: 80px`, `margin-bottom: 9rem`, Footer 9rem/7rem) move onto tokens or `clamp()`.
- **Card padding**: introduce a `--card-padding` token (desktop 40px, mobile about 20px) and apply it to cards that hardcode desktop padding, starting with the case-page project info block.
- **Case page project info (`.meta`)**: below 40em, switch from a 2×2 grid to a single-column list (icon + label on the left, value on the right), with mobile card padding.
- **Case page dark image pair / split media**: when they stack below 40em, the desktop `gap` (112px / 48px) must not carry over as a vertical gap.
- **Case page prev/next pager**: below 40em, stack the two links vertically with 下一篇案例 first, instead of a side-by-side row that squeezes long titles.
- **Breakpoint**: unify the mobile/desktop switch for the items above at **40em**. `--page-padding-inline` currently switches at 48em; align it with 40em as part of this change.
- Out of scope: the About page community section's 160px vertical padding (fixed by an existing requirement), typography changes, desktop layouts above 40em.

## Capabilities

### New Capabilities
- `site-responsive-layout`: site-wide mobile behavior — the 40em breakpoint, the collapsing hamburger nav, and the rule that large vertical spacing steps and card padding are reduced on narrow viewports.

### Modified Capabilities
- `case-study-catalog`: adds mobile requirements for the case page — project info block renders as a single column, the prev/next pager stacks vertically with 下一篇案例 first, and stacked media blocks don't inherit desktop gaps.

## Impact

- Code: `src/styles/tokens.css`, `src/components/Nav.astro` (markup + small script/CSS for the toggle), `src/components/Footer.astro`, `src/pages/index.astro`, `src/pages/about.astro` (token-driven spacing only), `src/pages/work/[slug].astro`.
- No content, routing, or dependency changes. Desktop rendering at 40em and above must stay visually unchanged apart from the `--page-padding-inline` breakpoint moving from 48em to 40em.
- Verification requires viewing at 320 / 375 / 430 / 640 / 768px widths.
