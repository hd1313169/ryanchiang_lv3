## Why

The site's current shell — a persistent left sidebar carrying identity, nav, and illustration on every page, plus a single-column horizontal case-study list — no longer matches the visual direction Ryan wants. He has a new reference layout (top nav, homepage hero, grid-based case-study cards, a heavier contact-focused footer) and a matching asset set (`content/img/web/`: new logo/favicon, two new illustrations, an avatar photo, and footer contact icons) ready to go. This change carries that layout and motion-surface rework across every page without changing the underlying content (case studies, About copy, personal projects) more than incidentally.

## What Changes

- **BREAKING**: Replace the persistent left `Sidebar` (identity block + nav + illustration, present on every page) with a top nav bar, fixed/sticky on every page, with a translucent blurred background.
- Nav shows the new `logo.svg` mark + wordmark, links to 作品實績 (home) and 關於我 (about), and a 履歷 link that opens an external CakeResume/cloud-folder URL in a new tab. The 個人專案 section stays on the About page but is dropped from nav.
- Remove `MobileIntro.astro` entirely — its reason to exist (repeating the sidebar's identity block for small screens) goes away once that identity content only lives in the homepage hero.
- Add a homepage hero section: one of the new illustrations (`1.png`/`2.png`) alongside the "Hi 我是 Ryan" intro copy (moved out of the sidebar), with a `long line.svg` divider under the tagline sentence.
- Rework the homepage case-study list from a single-column horizontal row layout into a 2-column card grid: drop the ordinal number (`01`, `02`...) and the subtitle line, keep tags + title + summary. Add a `short line.svg` divider under the "作品實績" section heading.
- Replace the footer: from a slim bar (single email + copyright) to a full-width dark section with a "任何合作機會／歡迎隨時和我聊聊 :)" heading and three contact links with icons — Email (existing copy-to-clipboard behavior, `gmail.png`), LinkedIn (`linkedin.png`, external link), CakeResume (`cake.png`, external link, replaces the previously-considered Medium link).
- Swap the site's logo and favicon to the new `logo.svg` mark.
- Re-point image sources at the reorganized `content/img/` tree (`web/`, `case/`); the old `content/` files and everything under `content/img/achive/` are superseded and unused.
- Dark-mode variants are explicitly out of scope for this change — the new components render a single light appearance only (existing `add-dark-mode` theming continues to apply only where it already did).
- About page and case-study pages keep their existing content sections; only their page chrome changes (top nav instead of sidebar, no mobile-intro duplication, no sidebar-driven layout offsets).

## Capabilities

### New Capabilities
- `site-navigation`: Sticky, blurred top nav bar present on every page — logo/favicon, 作品實績 + 關於我 + external 履歷 links, responsive behavior without a separate mobile-intro block.
- `home-page`: Homepage hero (illustration + intro copy + divider) and a 2-column case-study card grid (tags + title + summary, no ordinal/subtitle).
- `site-footer`: Full-width dark footer with a contact heading and three contact links (email copy-to-clipboard, LinkedIn, CakeResume), replacing the single-email footer bar.

### Modified Capabilities
- None — `openspec/specs` has no existing capabilities yet (the `build-portfolio-site` and `add-dark-mode` deltas were never synced to main specs), so there is nothing existing to modify. This change's `site-navigation`, `home-page`, and `site-footer` specs supersede the unsynced `site-navigation`/`home-page` deltas from `build-portfolio-site` in intent.

## Impact

- `src/components/Sidebar.astro`, `src/components/MobileIntro.astro` — removed.
- `src/components/Nav.astro` — rewritten as a top nav bar component; used from `BaseLayout.astro` instead of inside `Sidebar`.
- `src/layouts/BaseLayout.astro` — shell restructured (no sidebar grid column; nav is fixed/sticky at top; drops `MobileIntro` mount).
- `src/pages/index.astro` — new hero section added; work list markup/CSS reworked for a 2-column grid.
- `src/components/CaseStudyCard.astro` — card layout, content fields (drop ordinal + subtitle), and responsive rules rewritten for grid use.
- `src/components/Footer.astro` — rewritten for the three-link contact layout and heading copy.
- `src/pages/about.astro`, `src/pages/work/[slug].astro` — remove sidebar-width layout offsets tied to the old shell; no content changes.
- New/updated assets sourced from `content/img/web/` (`logo.svg`, `1.png`, `2.png`, `avatar.png`, `gmail.png`, `linkedin.png`, `cake.png`, `long line.svg`, `short line.svg`) and `content/img/case/`; `public/favicon.*` regenerated from `logo.svg`.
- No backend/data model changes; purely presentational/structural.
