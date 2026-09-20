## 1. Asset migration

- [x] 1.1 Copy `content/img/web/logo.svg` into `src/assets/brand/logo.svg` and regenerate `public/favicon.svg`/`favicon.png`/`favicon.ico` from it; verify the browser tab shows the new mark on every page. (favicon.svg copied and favicon.png regenerated via sharp from the new mark; favicon.ico left as-is since nothing in the codebase references it — only `favicon.png` is linked from `BaseLayout.astro`)
- [x] 1.2 Copy `content/img/web/1.png` and `2.png` into `src/assets/illustrations/hero-1.png` / `hero-2.png`; verify both import without error via `astro:assets`.
- [x] 1.3 Copy `content/img/web/avatar.png` into `src/assets/photos/avatar.png`; verify it renders on the About page (task 2.7) in place of `about-hero-portrait.png`.
- [x] 1.4 Copy `content/img/web/gmail.png`, `linkedin.png`, `cake.png` into `src/assets/icons/`; verify all three import without error.
- [x] 1.5 Copy `content/img/web/long line.svg` → `src/assets/graphics/long-line.svg` and `short line.svg` → `src/assets/graphics/short-line.svg`; verify both render as inline/`Image` assets.
- [x] 1.6 Grep the codebase for any remaining references to `content/` (outside `content/case-studies` frontmatter which is unaffected) or to `content/img/achive/**`, and confirm none exist once this change lands. (confirmed — only `src/content/case-studies` glob path matches, no `content/img` references anywhere in `src`)

## 2. Nav and page shell

- [x] 2.1 Rewrite `Nav.astro` as a top nav bar: logo mark + wordmark, 作品實績/關於我 links with active-page styling, and a 履歷 link (`target="_blank" rel="noopener noreferrer"`, placeholder CakeResume/cloud-folder URL) — verify by rendering the component in isolation (`npm run dev`) and checking all three links and the active-state styling on `/` and `/about`.
- [x] 2.2 Make the nav fixed to the top of the viewport with a translucent, blurred background (`position: fixed`, `backdrop-filter`); verify by scrolling any page and confirming the nav stays pinned and content blurs visibly behind it.
- [x] 2.3 Update `BaseLayout.astro`: remove the `.shell` grid, `Sidebar` import/mount, and `MobileIntro` import/mount; give `<main>` a `padding-top` matching the nav's rendered height (new `--nav-height` token). Verify no layout gap or overlap on `/`, `/about`, and a case-study page.
- [x] 2.4 Delete `src/components/Sidebar.astro` and `src/components/MobileIntro.astro`; verify the build has no dangling imports (`npm run build` succeeds).
- [x] 2.5 Delete `src/components/Illustration.astro`'s scroll-frame-swap usage entirely (component and its script) since its only callers (Sidebar, MobileIntro) are gone; verify `npm run build` succeeds with no unused-import warnings.
- [x] 2.6 In `about.astro` and `work/[slug].astro`, remove the `--sidebar-width`-based padding overrides and the `@media (min-width: 99em)` sidebar-overlay accommodations that are no longer relevant without a sidebar; verify page layout looks correct at a very wide viewport (e.g. 1920px+) with no leftover empty gutter. (`work/[slug].astro` had no such override to begin with; only `about.astro`'s did. `index.astro`'s own 99em sidebar-overlay media query is handled in task 3.4 while that file's layout is reworked anyway.)
- [x] 2.7 Update `about.astro` to import and render `src/assets/photos/avatar.png` in place of `about-hero-portrait.png`; verify the About page shows the new photo.

## 3. Homepage hero and case-study grid

- [x] 3.1 Add a hero section to `index.astro`: one of `hero-1.png`/`hero-2.png`, the "Hi 我是 Ryan" intro copy (moved from the old sidebar identity block), and `long-line.svg` directly beneath the tagline sentence; wrap the section in the existing `.reveal` class for scroll-in entrance. Verify by loading `/` and confirming the hero renders once, only on the home page. (`npm run build` succeeds; hero only added to `index.astro`)
- [x] 3.2 Add the "作品實績" section heading with `short-line.svg` beneath it, above the case-study grid on `index.astro`. Verify visually on `/`.
- [x] 3.3 Rewrite `CaseStudyCard.astro`'s markup/CSS from the horizontal row layout to a vertical card (cover image on top, tags, title, summary) with no ordinal number and no subtitle line. Verify by rendering a card and confirming ordinal/subtitle no longer appear.
- [x] 3.4 Update `index.astro`'s `.work-list` CSS from the flex column to a CSS grid: `repeat(2, 1fr)` at ≥40em, single column below. Verify by resizing the viewport across the 40em breakpoint and confirming the column count switches.
- [x] 3.5 Confirm each case-study card still links to `/work/[slug]` and that hover states (image zoom, title color shift) still work in the new grid layout. (markup preserves the `<a>` wrapper and hover rules for image scale + title color, carried over from the old card)

## 4. Footer

- [x] 4.1 Rewrite `Footer.astro` markup: contact heading ("任何合作機會／歡迎隨時和我聊聊 :)") plus three contact links (email, LinkedIn, CakeResume) each with its icon (`gmail.png`, `linkedin.png`, `cake.png`). Keep the dark background using the existing `var(--color-text)`-as-background approach.
- [x] 4.2 Keep/port the existing copy-to-clipboard script for the email link only; wire LinkedIn and CakeResume as plain external links (`target="_blank" rel="noopener noreferrer"`, placeholder URLs). Verify clicking email copies the address and shows the temporary confirmation label; verify LinkedIn/CakeResume open in new tabs.
- [x] 4.3 Verify the footer renders identically (same markup/behavior) at the bottom of `/`, `/about`, and a case-study page. (single shared `Footer.astro` mounted once in `BaseLayout.astro`, used by every page)

## 5. Cross-cutting verification

- [x] 5.1 Toggle dark mode (existing `ThemeToggle`) on each page and confirm nav, hero, cards, and footer text/backgrounds still read correctly via the shared color tokens, even though the new images (logo, illustrations, avatar, icons) stay single-appearance — file any resulting contrast issue as a follow-up rather than blocking this change, per design.md's accepted risk. (Verified with a headless-Chromium screenshot pass: nav, hero, cards, and footer all correctly re-theme via `data-theme="dark"`, including the footer's light/dark background inversion. No contrast issues found; images stay single-appearance as expected.)
- [x] 5.2 Run through all three pages (`/`, `/about`, `/work/[slug]` for each case study) at mobile, tablet, and desktop widths, confirming: no sidebar or mobile-intro block remains anywhere, the nav stays fixed and legible while scrolling, and no layout regression from the removed `--sidebar-width` offsets. (Verified with headless-Chromium screenshots at 1440px and 390px widths across `/`, `/about`, and `/work/01`: no sidebar/mobile-intro remnants, nav stays fixed with correct active-link state on every page, no layout gaps.)
- [x] 5.3 Run `npm run build` and confirm it completes with no errors or unused-asset/import warnings introduced by this change. (Build completes cleanly; console check during the browser pass also showed zero console/page errors on any route.)

## 6. Post-review fixes

Fixes requested after visual review of the first implementation pass.

- [x] 6.1 Remove the underline from the nav's active-page state in `Nav.astro`; keep the underline on hover only.
- [x] 6.2 Re-sync `content/img/web/logo.svg` (updated by the user after task 1.1) into `src/assets/brand/logo.svg` and regenerate `public/favicon.svg`/`favicon.png`.
- [x] 6.3 Rework the homepage hero in `index.astro`: replace the placeholder tagline with the bold headline "以邏輯思考拆解複雜問題，轉化成清晰直覺的介面設計。" directly above `long-line.svg` (tight spacing), and add the two missing body paragraphs (3年 Web、SAAS... / 目前專注於 AI 協作...) below it, at body-copy size/weight/color instead of the wrong secondary-color/oversized tagline styling.
- [x] 6.4 Widen `.work-list` on the home page to match the hero section's width (remove its separate `--content-max-width` cap so both sections align to the same edges).
- [x] 6.5 Move the case-study card's hover box-shadow from the whole `.feature` card to just the `.thumb` image area in `CaseStudyCard.astro`; the image-zoom-on-hover behavior is unchanged.
- [x] 6.6 Re-check case-study frontmatter (`src/content/case-studies/*.md`) and cover images against `content/img/case/**` for drift — confirmed identical (byte-for-byte matching covers, matching tags/titles/summaries already reflected in the rendered cards); no changes needed.
- [x] 6.7 Make the hero/work-section divider graphics (`long-line.svg`, `short-line.svg`) theme-aware: changed their fill to `currentColor` and switched `index.astro` to inline them via `?raw` import + `set:html` (instead of `astro:assets` `Image`) inside an element styled with `color: var(--color-text)`, so they flip with light/dark mode like the rest of the page. Verified the computed `color` on the inlined `<svg>` resolves to the dark-theme token when `data-theme="dark"`.

## 7. Post-review fixes (round 2)

Layout-precision fixes requested from an annotated screenshot of the hero section.

- [x] 7.1 Add a `--page-padding-inline: 160px` breakpoint at `min-width: 90em` in `tokens.css`, so the shared nav/main/footer side margins match the requested 160px inset at that width (smaller viewports keep the existing responsive padding).
- [x] 7.2 Rework the hero into a two-column grid (`grid-template-columns: 4fr 8fr`) at the existing ≥40em breakpoint: the illustration occupies the 4-part column, the text the 8-part column.
- [x] 7.3 Cap the hero illustration at a fixed display size (`max-width: 20rem`) instead of stretching to fill its column, and center it both horizontally (flex `justify-content: center`) and vertically (grid `align-items: center`) within that column.
- [x] 7.4 Remove the `max-width` cap on `.hero-body` at the desktop breakpoint so the two paragraphs use the full 8-column text width instead of being constrained narrower than their column.
- [x] 7.5 Verified via computed geometry at a 1440px viewport: hero left/right insets are exactly 160px, the illustration column is 4/12 of the content width with the 320px-capped image centered inside it (equal left/right whitespace), and the text column fills its full 8/12 share.

## 8. Post-review fixes (round 3)

Typography, spacing, color, and two real bugs found in this pass.

- [x] 8.1 Re-synced `content/img/web/logo.svg` (updated again) into `src/assets/brand/logo.svg` and regenerated `public/favicon.svg`/`favicon.png`.
- [x] 8.2 **Bug fix**: `ThemedImage.astro`'s inactive (dark) frame sat visually on top of the visible (light) frame with `opacity: 0` but no `pointer-events: none`, so right-click/"open image" on any themed cover was actually targeting the invisible dark-mode variant — explaining the "opening the image shows a different picture" report. Added `pointer-events: none` to `.themed-image-frame`.
- [x] 8.3 **Bug fix**: card cover images were requested at `width={800} height={600}` in `CaseStudyCard.astro`, but the source files (`cover-0{1..4}.png`) are only 593×444px — Astro was upscaling ~1.35x on every card, causing visible blur. Reduced the requested size to `592×444` (native resolution, same 4:3 ratio, no upscale) for both the `ThemedImage` and plain `Image` branches.
- [x] 8.4 Forced Archivo for the hero's Latin text: added `font-family: var(--font-latin), var(--font-cjk), sans-serif` to `.hero-eyebrow` and wrapped "Ryan" in `.hero-title` with a `.latin` span using the same stack (CJK text elsewhere in the hero is unaffected).
- [x] 8.5 Reduced `.hero-title` font-size by 2px via `calc(var(--text-2xl) - 2px)`.
- [x] 8.6 Changed the hero headline divider (`long-line.svg`) and headline to full-width block elements (`width: 100%` / `display: block`) so the underline always spans the same width as the headline text instead of stopping short at a fixed cap; tightened the gap between the divider and the paragraphs below it.
- [x] 8.7 Set the hero text block's color to `#3E3E3E` (`.hero-text`), removing the separate secondary-gray overrides on the eyebrow and body paragraphs so they inherit it (the bold headline keeps its own explicit dark color).
- [x] 8.8 Card style fixes in `CaseStudyCard.astro`: `.thumb` background `#F9F9F9`; title font-size 22px → 24px; summary font-size 15px → 16px; tag font-size 13px → 14px.
- [x] 8.9 Content fixes: `src/content/case-studies/01.md` title changed to "零到一建置整合行銷專案管理系統" and its tags reordered to `CRM / AI 流程設計 / RBAC 權限設計`; `02.md` tags reordered to `B2B 內部系統 / 大型團隊協作 / Data-heavy`.
- [x] 8.10 Spacing fixes on the home page: increased space above the hero (`margin-top` on `.hero`) and between the hero and the work section (`margin-bottom` on `.hero`); reduced the gap between the "作品實績" heading and its underline (`.work-divider` margin); increased the case-study grid's gap (both row and column) for more breathing room between cards.
- [x] 8.11 Shrank the hero illustration a further 20% (`max-width: 16rem`, down from `20rem`) per a follow-up request in this same round.

## 9. Post-review fixes (round 4)

- [x] 9.1 Set `.hero-eyebrow` and `.hero-title` text color explicitly to `#1E1E1E` (previously inherited the hero block's `#3E3E3E`).
- [x] 9.2 Increased spacing above the hero (`.hero` `margin-top`) and between the hero and the work section (`.hero` `margin-bottom`) further.
- [x] 9.3 Increased the gap between the "作品實績" heading and the case-study grid (`.work-heading` `margin-bottom`).
- [x] 9.4 Removed left/right padding from the case-study card's text block (`.body` in `CaseStudyCard.astro`), keeping only top/bottom padding.

## 10. Post-review fixes (round 5)

- [x] 10.1 Removed the decorative `short-line.svg` underline beneath the "作品實績" heading, per an annotated screenshot marking it for removal; deleted the now-unused `src/assets/graphics/short-line.svg` asset and its import/usage in `index.astro`.
- [x] 10.2 Added a plain full-width `<hr class="work-separator">` divider between the "作品實績" heading and the case-study grid, replacing the removed decorative line with a simple hairline rule.

## 11. Post-review fixes (round 6)

Restyled the "作品實績" heading per an annotated screenshot: dropped the round-10 `<hr>` treatment for a single-row layout instead.

- [x] 11.1 Removed `.work-separator` (the full-width `<hr>` below the heading from round 10).
- [x] 11.2 Reworked `.work-heading` into a flex row: a custom icon, the left-aligned "作品實績" heading, then a trailing hairline rule (`.work-rule`, `flex: 1`) that extends to the right edge of the container — replacing the previous centered-heading-with-line-below layout.
- [x] 11.3 Added `.work-icon`: two 12×12px squares (`::before`/`::after` on a 21×21px box, one anchored top-left and one bottom-right) forming a diagonal step mark with a 3px corner overlap, matching the requested custom bullet symbol.
- [x] 11.4 Tuned `.work-icon`: squares reduced 12px → 11px (bounding box 21px → 19px); color went `var(--color-text)` → `#3E3E3E` → `#DEDEDE` → back to `#3E3E3E` across a few quick follow-ups.
- [x] 11.5 Re-specified `.work-icon` as two 16×16px squares offset 4px (bounding box 20×20px), color `#3E3E3E` — a larger, heavier-overlap version of the same diagonal step mark.
- [x] 11.6 Restyled the bottom-right square as an outline: `background: #FEFEFE`, `border: 1px solid #3E3E3E` (top-left square stays solid-filled).
- [x] 11.7 Increased the squares' offset to 5px (bounding box 20px → 21px) per a follow-up.
- [x] 11.8 Set the top-left square's stacking above the bottom-right one (`z-index: 1` on `::before`, within the `.work-icon` stacking context established by `position: relative`) so the solid square visually layers over the outlined one, per a follow-up.

