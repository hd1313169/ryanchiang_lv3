## Why

The About page's "我擅長的事" section summarizes the AI-assisted design workflow in a single bullet ("AI 工作流程"). A dedicated, visually distinct showcase — built from an already-designed flowchart asset — makes the actual six-stage practice concrete and gives the page a stronger closing moment. Building it also forces a decision on the half-finished, currently-hidden dark mode (`add-dark-mode`, 14/15 tasks, toggle shipped as `display:none` pending visual polish): rather than give the new section light/dark variants, dark mode is being dropped outright so no new work has to account for it.

## What Changes

- Add a new full-bleed, black-background section "AI 應用實踐高效設計" to `about.astro`, positioned immediately after `.skills-band` with zero gap between the two sections.
- Section content: a light-on-dark variant of the existing `.section-heading` treatment (icon + title + rule) plus the supplied summary paragraph, followed by the flowchart image `content/img/web/ai.png` (pre-designed, transparent background — no hand-built card/arrow markup needed).
- Scroll interaction: `.skills-band` becomes `position: sticky; top: 0`; the new section sits above it in stacking order and slides up to fully cover it as the page scrolls, before the page continues scrolling past the new section normally. This is a new interaction pattern for the site — no existing section uses scroll-linked pinning (the current `.reveal` mechanism is a one-shot fade/slide-up on scroll-into-view).
- Click-to-expand lightbox on the flowchart image: opens a full-screen overlay showing the image at native resolution; closes via backdrop click, `Escape`, or a close button. Magnification relies on the browser's native pinch-zoom (the site's viewport meta does not disable it) — no custom zoom/pan logic.
- **BREAKING**: Remove dark mode entirely:
  - Delete `src/components/ThemeToggle.astro` and its mount point in `BaseLayout.astro`.
  - Remove the `:root[data-theme="dark"]` block from `src/styles/tokens.css`.
  - Delete `src/components/ThemedImage.astro` and revert its one call site (`CaseStudyCard.astro`'s cover image) to a single light-only image.
  - Remove the no-flash inline theme-detection script from `BaseLayout.astro`'s `<head>`.
  - Revert `<meta name="color-scheme">` in `BaseLayout.astro` back to `content="light"`.
  - Drop the now-unused `coverDark` field from the case-study content schema/frontmatter and any other `-dark` asset wiring; leave the `-dark` image files on disk unless removing them is requested separately.
- Accessibility is explicitly out of scope: the flowchart image ships with a minimal `alt`, no further ARIA/description work planned.

## Capabilities

### New Capabilities
- `about-page`: adds the "AI 應用實踐高效設計" showcase section (heading, copy, flowchart image, sticky-stack scroll effect, lightbox) to the About page. No spec currently lives at `openspec/specs/about-page/spec.md` despite prior changes touching this area, so it is captured fresh here. This also supersedes the archived `add-about-ai-workflow-section` change's design (hand-coded CSS grid of 6 cards + drawn arrows), which was never implemented and is replaced by the pre-designed image asset.

### Modified Capabilities
- `theme-switching`: revokes the capability entirely — the theme toggle, persisted preference, no-flash boot script, and per-theme asset variants introduced by `add-dark-mode` are all removed.

## Impact

- `src/pages/about.astro`: new section markup, scoped styles, and lightbox script.
- `src/layouts/BaseLayout.astro`: remove the no-flash script, the `ThemeToggle` mount, and revert the `color-scheme` meta.
- `src/styles/tokens.css`: remove the dark token block.
- `src/components/ThemeToggle.astro`, `src/components/ThemedImage.astro`: deleted.
- `src/components/CaseStudyCard.astro`: revert to a single light-only cover image.
- `src/content/case-studies/*`: drop the `coverDark` frontmatter field and its schema entry.
- New asset dependency: `content/img/web/ai.png`, to be brought into the project's existing `src/assets/...` import convention.
