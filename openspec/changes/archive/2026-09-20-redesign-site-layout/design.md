## Context

See `proposal.md` - Why/What Changes for motivation and scope. Relevant current-state facts that shape the approach:

- `BaseLayout.astro` lays out `.shell` as a 2-column CSS grid (`--sidebar-width` / `1fr`), with `Sidebar.astro` sticky in the left column and `MobileIntro.astro` + `Footer.astro` mounted below it. Every page (`index.astro`, `about.astro`, `work/[slug].astro`) assumes this shell and, at very wide viewports (`min-width: 99em`), assumes the sidebar overlays content and pads itself by `--sidebar-width`.
- `Nav.astro` today is a small vertical link list meant to live inside the sidebar column, not a standalone bar.
- `Illustration.astro` implements a scroll-position-driven two-frame cross-fade (advances frames every 920px of scroll), designed around a sidebar that stays on screen for the entire page scroll. It also carries built-in light/dark frame pairs.
- The color system (`tokens.css`) is fully token-driven (`--color-bg`, `--color-text`, `--color-text-secondary`, `--color-border`, `--color-block-bg`), swapped via `:root[data-theme="dark"]`. `Footer.astro` already exploits this by using `var(--color-text)` as its background — a light-on-dark bar in light mode that automatically becomes a dark-on-light bar in dark mode, no separate dark asset needed.
- Images referenced from `src/` currently live under `src/assets/` and are imported for Astro's `astro:assets` optimization pipeline (`Image` component, `ThemedImage.astro`). The user's new source files live under `content/img/web/` and `content/img/case/` and are not yet part of the buildable source tree.
- Two other changes touch overlapping files but haven't been synced to main specs: `build-portfolio-site` (established the current shell/nav/footer) and `add-dark-mode` (added the token/theme-toggle infrastructure this design continues to rely on).

## Goals / Non-Goals

**Goals:**
- Replace the sidebar-based shell with a fixed, blurred top nav on every page, and a new hero + grid layout on the home page, and a heavier contact footer — per the specs in this change.
- Bring the new asset set (`content/img/web/*`, `content/img/case/*`) into the buildable `src/assets/` tree, replacing now-superseded files.
- Keep all new UI pieces (nav, hero, cards, footer) built on the existing CSS custom-property tokens, so the already-shipped light/dark toggle (`add-dark-mode`) keeps working on them for free — without needing new `-dark` image variants, per the proposal's explicit dark-mode-out-of-scope decision.

**Non-Goals:**
- No new page transition system, cursor effects, or parallax — motion stays limited to the existing `.reveal` scroll-reveal pattern and hover/scale transitions already used elsewhere, applied to the new sections. Any deeper motion pass is a follow-up (per the earlier exploration: "先把版面改完再討論").
- No content rewrites — About page sections, case-study copy, and the personal-project section keep their existing text; only page chrome around them changes.
- No dark-mode-specific asset production (no `-dark` suffixed versions of the new logo, illustrations, avatar, or icons).
- No change to the case-study content model (`content.config.ts`, frontmatter fields) beyond dropping the two display fields (ordinal, subtitle) from the card — the underlying `subtitle` field can stay in frontmatter unused, or be dropped later; not required for this change.

## Decisions

**1. Fixed nav via `position: fixed` + `backdrop-filter`, content offset by padding, not a layout-shifting sticky-in-grid element.**
The sidebar's "sticky" behavior worked because it was a grid column. A top bar instead uses `position: fixed; top: 0; inset-inline: 0` with `backdrop-filter: blur(...)` and a translucent `background`, sitting above page content in stacking order. Each page's `<main>` gets `padding-top` equal to the nav's rendered height so content never starts underneath it. Alternative considered: `position: sticky` on a normal-flow wrapper — rejected because it still reserves layout space and complicates the homepage hero sitting flush behind/near the nav.

**2. `Sidebar.astro`, `MobileIntro.astro`, and `Illustration.astro`'s scroll-frame-swap mechanism are deleted, not adapted.**
`Sidebar.astro` and `MobileIntro.astro` have no remaining callers once the top nav + homepage hero ship. `Illustration.astro`'s two-frame scroll-swap was purpose-built for a sidebar illustration visible across an entire page scroll; a homepage-only hero doesn't have that relationship to scroll position. The hero renders one of the two new illustrations (`1.png`/`2.png`) as a single static `astro:assets` `Image`, wrapped in the existing `.reveal` fade-in-on-scroll-into-view treatment for its entrance. (Which of the two illustrations is the fallback content and whether both may still be worth eventually restoring as an existing multi-illustration set is a content pick, not an architectural question — the two files stay available; the design just doesn't wire the old swap mechanism to them.)

**3. New assets are imported into `src/assets/`, mirroring the existing folder shape, rather than served from `content/` or `public/` directly.**
This preserves `astro:assets` optimization (responsive sizing, format negotiation) that the rest of the site already relies on. Proposed mapping:
- `content/img/web/logo.svg` → `src/assets/brand/logo.svg` (also copied/exported to `public/favicon.svg` + regenerated `public/favicon.png`/`.ico` for browser-tab use, since favicons are served from a fixed `public/` path, not through the image pipeline).
- `content/img/web/1.png`, `2.png` → `src/assets/illustrations/hero-1.png`, `hero-2.png`.
- `content/img/web/avatar.png` → `src/assets/photos/avatar.png` (replaces `about-hero-portrait.png` as the About page photo).
- `content/img/web/gmail.png`, `linkedin.png`, `cake.png` → `src/assets/icons/`.
- `content/img/web/long line.svg`, `short line.svg` → `src/assets/graphics/long-line.svg`, `short-line.svg` (renamed to remove the space, per repo convention of hyphenated filenames).
- `content/img/case/*` → left as the existing case-study asset source (already referenced from `src/content/case-studies/*.md` frontmatter and `src/assets/photos/cover-0{1..4}.jpg`); no functional change here beyond confirming these are the canonical files going forward and `content/img/achive/**` (including the old `-dark` covers) is not referenced by any component.

**4. Case-study card becomes a vertical grid card; the underlying `CaseStudyCard.astro` component is rewritten rather than forked.**
Same component, same props (`slug`, `title`, `tags`, `summary`, `cover`/`coverDark`) minus rendering the `order`/`subtitle` props in markup (props can stay accepted-but-unused on the interface, or be trimmed — implementation's call at task time). Layout switches from `display: flex` (row) to a `<ul>`/`<li>` (or `<a>` list) CSS grid: `grid-template-columns: repeat(2, 1fr)` above the existing `40em` breakpoint already used elsewhere on the site (see `about.astro`'s `.skills`/`.side-projects` grids), single column below it. This reuses a breakpoint value the codebase already standardizes on for 1-column/2-column grid switches, instead of introducing a new one.

**5. Footer keeps the `var(--color-text)`-as-background trick and the existing email-copy script; LinkedIn/CakeResume are added as plain external `<a>` elements with icons, no new interaction logic.**
Only the email link needs the copy-to-clipboard behavior (already implemented in the current `Footer.astro` script) — extending that same script to the new markup is enough; LinkedIn and CakeResume are ordinary `target="_blank" rel="noopener noreferrer"` links.

**6. Dark-mode compatibility is achieved by token discipline, not by opting new sections out of theming.**
Every new color in nav/hero/footer/cards is expressed via the existing `--color-*` custom properties (extending them with new component-scoped tokens only if a new color is truly needed, e.g. a nav blur backdrop tint) so `ThemeToggle`'s existing `data-theme` flip continues to reskin the whole page. Only the new *image* assets (logo, illustrations, avatar, icons) are single-appearance — acceptable per the proposal's explicit scope cut, and consistent with how the rest of the site already only add dark variants for photographic/illustrated content, not for text or applied color.

## Risks / Trade-offs

- **[Risk]** A fixed, blurred top nav can visually clash with a busy hero background scrolling underneath it (contrast/legibility). → **Mitigation**: keep the nav's own text/logo on a stable, sufficiently opaque backdrop layer (tune blur + background alpha during implementation against the actual hero art) and verify contrast in both themes since dark mode still applies (Decision 6).
- **[Risk]** New illustration/logo/icon assets ship in only one appearance while the rest of the site is dark-mode aware; a visitor toggling dark mode will see a light-only logo/illustration/icons sitting inside an otherwise dark page. → **Mitigation**: this is an accepted, explicit scope cut (proposal + user decision); flag it in tasks as a known follow-up rather than solving now.
- **[Risk]** Removing `--sidebar-width`-based padding overrides in `about.astro` and `work/[slug].astro` (added for the old wide-viewport sidebar-overlay behavior) could leave a layout gap or regression at very wide viewports if not fully cleaned up. → **Mitigation**: audit both files' `@media (min-width: 99em)` blocks specifically when removing the sidebar, since that's the breakpoint the old shell used for sidebar overlay.
- **[Risk]** `CaseStudyCard.astro`'s `order` prop and case-study frontmatter's `subtitle` field become unused once the card stops rendering them. → **Mitigation**: leave the frontmatter field and prop in place (harmless, low cost) rather than editing content files in this change; a future cleanup can remove them once it's confirmed nothing else reads them.

## Migration Plan

1. Bring new assets into `src/assets/` per Decision 3; regenerate `public/favicon.*` from the new logo.
2. Build the new `Nav.astro` (top bar) and wire it into `BaseLayout.astro`, removing the `.shell` grid, `Sidebar.astro`, and `MobileIntro.astro`.
3. Update `about.astro` and `work/[slug].astro` to drop sidebar-era layout offsets now that there's no sidebar column.
4. Build the homepage hero in `index.astro` and rework the case-study grid + `CaseStudyCard.astro`.
5. Rewrite `Footer.astro` for the three-link layout.
6. Manual pass in both light and dark theme (toggle still present from `add-dark-mode`) to confirm nothing regresses per the Risks above.

No data migration, no deployment/rollback complexity beyond normal git revert — this is a static-site presentational change with no persisted state.

## Open Questions

- Real destination URLs (CakeResume/cloud-folder resume link, LinkedIn profile, CakeResume profile) are still placeholders — swapping in the final URLs at implementation time doesn't change any spec, approach, or task, so it's deferred rather than blocking this design.
