## Context

See proposal.md - Why. The site's colors already route through five CSS custom properties defined in `src/styles/tokens.css` (`--color-bg`, `--color-text`, `--color-text-secondary`, `--color-border`, `--color-block-bg`), consumed across `Sidebar.astro`, `Nav.astro`, `CaseStudyCard.astro`, `work/[slug].astro`, and `about.astro`. A handful of hardcoded colors bypass these tokens (see proposal.md - Impact). Themed images in scope: the two sidebar illustration frames (`Illustration.astro`, already rendered as a stacked light/dark-style pair for its scroll-driven cross-fade), four case-study covers, and the about-page portrait.

## Goals / Non-Goals

**Goals:**
- Toggle the whole site's palette and themed images with one control, no page reload.
- Zero flash of the wrong theme on load.
- Keep the change additive: no restructuring of existing layout, grid, or component tree.

**Non-Goals:**
- Following `prefers-color-scheme` automatically (explicitly manual-only, per proposal).
- Generating the dark-variant image assets — the user supplies these files.
- Per-page or per-section theme overrides — theme is global only.

## Decisions

**State carrier: `data-theme` attribute on `<html>`, not a CSS class or a per-component prop.**
A single attribute at the document root lets every stylesheet — existing and new — key off `[data-theme="dark"]` selectors without threading a theme value through Astro component props. Alternatives considered: a `dark` class (equivalent, but `data-theme` self-documents the two-value nature and leaves room for a future `system` value); CSS-only `prefers-color-scheme` media query (rejected — proposal requires manual toggle with override).

**Persistence: `localStorage`, read by an inline synchronous `<head>` script.**
Astro ships no client-side router state; each navigation is a full page load, so the theme must be re-applied on every load. Reading `localStorage` in a blocking inline script (before any stylesheet paints) is the standard no-flash pattern — an async/deferred script would let the browser paint light theme first. Absence of a stored value defaults to `"light"` (matches Requirement: Theme persistence - No stored preference).

**Toggle placement: new `ThemeToggle.astro`, mounted in `BaseLayout.astro` as a fixed-position element, independent of `Sidebar`/`Nav`.**
Confirmed with the user: a floating button, not integrated into the nav list. This avoids touching `Sidebar.astro`'s layout (which has separate desktop/mobile flex arrangements already).

**Image swap mechanism: extend the existing two-frame stacking pattern from `Illustration.astro`, generalized into `ThemedImage.astro`.**
`Illustration.astro` already renders two `<img>`s absolutely stacked with opacity-based visibility, driven by scroll position. Reusing that structural pattern — both images always in the DOM, visibility switched by CSS — for theme means the swap is instant and CSS-only (no JS re-render, no layout shift, no waiting for a script to swap `src`). `ThemedImage.astro` takes `light`/`dark` image props and wires `[data-theme="dark"] & { opacity: 1 }` (or the equivalent visibility toggle) purely via `[data-theme]` attribute selectors — no new JS. `Illustration.astro`'s own scroll-driven frame logic is extended to also respect the theme attribute per frame pair (each of its two scroll-frames gets a light/dark pair), rather than being replaced.
Alternative considered: swap `src` via JS on toggle — rejected, adds a JS dependency for something CSS attribute selectors already solve, and risks a visible pop on first load before hydration.

**Dark image asset naming: `-dark` suffix alongside the original filename**, e.g. `content/cover-01-dark.jpg`, per explicit user instruction. Applied consistently to all themed image sources (covers, illustration frames, portrait).

**Hardcoded color fixes: fold into existing tokens or add theme-specific values inline, not new tokens where avoidable.**
`about.astro`'s `#454545` and `CaseStudyCard.astro`'s `#7c7c7c` are secondary-text-like grays close to `--color-text-secondary`'s intent — re-point them at that token. `work/[slug].astro`'s `#fff` / `color-mix(..., white NN%)` backgrounds are light-surface accents (table headers, blockquote tint) that need a dark-theme-safe equivalent; introduce them as `color-mix(in srgb, var(--color-text), var(--color-bg) NN%)` so the mix target follows the active theme's canvas color instead of literal white.

## Risks / Trade-offs

- **Missing dark image asset for a themed slot** → Author supplies all seven `-dark` files before this ships; `ThemedImage.astro` has no runtime fallback (out of scope per Non-Goals), so a missing file would 404 in dark mode. Verify all assets exist as a task before marking the change complete.
- **`color-mix()` browser support** → Already in use in `work/[slug].astro` today (`color-mix(in srgb, ...)`), so this introduces no new baseline requirement.
- **Inline `<head>` script blocks first paint slightly** → Negligible: it only reads one `localStorage` key and sets one attribute, no I/O or layout work.

## Migration Plan

Purely additive (new component files, new token block, new image assets, small edits to existing files to consume tokens/components). No data migration. Rollback is a plain revert of the change's commits — no persisted state format changes that would need cleanup (the `localStorage` key is harmless if left behind).
