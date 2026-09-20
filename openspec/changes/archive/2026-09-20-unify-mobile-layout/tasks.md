## 1. Tokens and breakpoint

- [x] 1.1 In `src/styles/tokens.css`, shrink `--space-5/6/7` below 40em (start at about 2 / 3 / 4rem) and verify at 375px that computed values differ from ≥40em while `--space-1`…`--space-4` are unchanged
- [x] 1.2 In `tokens.css`, move the `--page-padding-inline` switch from 48em to 40em and verify the gutter is 24px at 639px and 48px at 640px
- [x] 1.3 Add `--card-padding` (40px at ≥40em, about 20px below) and verify it resolves to both values in devtools at 375px and 1280px

## 2. Navigation

- [x] 2.1 In `src/components/Nav.astro`, add the hamburger button (`aria-expanded`, `aria-controls`) and dropdown panel styling below 40em; verify at 375px that only brand + button are visible on one row and links are hidden
- [x] 2.2 Add the toggle script (open/close, Escape, close on link click, close on resize to ≥40em) and verify each scenario in `site-responsive-layout` by hand at 375px and by resizing to 700px with the menu open
- [x] 2.3 Verify at 320 / 375 / 430 / 640px that no nav text wraps, the current page link is marked, and the panel sits above page content and the back-to-top button

## 3. Case page

- [x] 3.1 In `src/pages/work/[slug].astro`, make `.meta` a single-column row list below 40em using `--card-padding`; verify at 375px that the four items stack one per row and a long value wraps within its row, and that ≥40em still shows two columns
- [x] 3.2 Reset the stacked `gap` of `.image-pair-dark` (≤32px) and `.split-media` below 40em and verify on a case with a dark image pair (case 04 or 05) that the vertical space between stacked items is small
- [x] 3.3 Stack `.case-pager` below 40em with 下一篇案例 first (`order`) and verify at 375px on cases 01, 03 and 05 that both long titles are readable, full width, and that ≥40em is unchanged
- [x] 3.5 Make multi-column tables scroll inside their own block below 40em and verify at 375px that case 01's comparison table no longer widens the page (scroll width equals viewport width)
- [x] 3.4 Audit the remaining boxed blocks in `[slug].astro` that hardcode desktop padding (e.g. `.image-pair-dark` inline padding) and move them onto `--card-padding`; list what changed and verify none has inner horizontal padding over 24px at 375px

## 4. Home, Footer, About

- [x] 4.1 In `src/pages/index.astro`, replace hero `gap: 80px` and `margin-bottom: calc(var(--space-7) + var(--space-4))` with token/`clamp()` values and verify the hero-to-next-section gap is smaller at 375px and unchanged at 1280px
- [x] 4.2 In `src/components/Footer.astro`, replace the `calc(var(--space-7) + var(--space-4))` margin and `var(--space-7)` padding with reduced mobile values and verify the same 375px vs 1280px comparison
- [x] 4.3 Check `about.astro` at 375px after the token change (do not touch the community section's 160px padding); confirm section separation is reduced but still reads as deliberate per the existing `about-page` spacing requirement

## 5. Verification

- [x] 5.1 Screenshot home, About and one case page at 320 / 375 / 430 / 640 / 768px and confirm no horizontal scroll, no wrapped nav text, no squeezed cards, and no oversized gaps
- [x] 5.2 Screenshot the same pages at 1280 and 1440px and compare to `main` to confirm desktop rendering is unchanged
- [x] 5.3 Run `npm run build` and confirm it succeeds; run `openspec validate unify-mobile-layout --strict`

## 6. Tablet (~768px)

- [x] 6.1 Stack the 痛點/設計挑戰/我的任務 table and three-across `.workflow-cards` below 62em; verify at 768px that each is one column (case 05 two-up group stays two columns)
- [x] 6.2 Allow About's `.job-meta` to wrap below 62em; verify at 640px and 768px that no meta text overlaps the content column
- [x] 6.3 Make callouts full column width below 62em; verify at 768px that blockquote width equals its container's width
- [x] 6.4 Re-verify: desktop page heights at 1280/1440px unchanged, and no horizontal overflow at 375/640/768/991/992px on all 7 pages
