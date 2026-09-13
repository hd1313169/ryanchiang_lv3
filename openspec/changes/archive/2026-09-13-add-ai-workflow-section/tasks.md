## 1. Asset preparation

- [x] 1.1 Copy `content/img/web/ai.png` into `src/assets/illustrations/ai-workflow.png` (or the project's existing convention for this kind of image) and verify the file is importable via `astro:assets` without a build error.

## 2. AI workflow section — markup and content

- [x] 2.1 In `about.astro`, add a new full-bleed section immediately after `.skills-band` (mirroring `.skills-band`/`.skills-band-inner`'s full-bleed pattern) with a black background, and verify it renders with zero visual gap to the section above it.
- [x] 2.2 Add a light-on-dark heading using the existing `.section-heading` icon+title+rule treatment, plus the supplied summary paragraph as real text (not part of the image), and verify both render legibly against the black background in a browser check.
- [x] 2.3 Render the imported flowchart image below the heading/paragraph via `<Image>`, sized to the section's existing content max-width (matching `.skills-band-inner`), and verify it displays at native aspect ratio with no visible background seam against the black section (confirming the PNG's transparency composites cleanly).

## 3. Sticky cover-scroll transition

- [x] 3.1 Audit `.about`, `<main>`, and `<body>` (in `about.astro`, `BaseLayout.astro`, `tokens.css`) for any `overflow` value other than `visible` on an ancestor of `.skills-band`, and adjust if found, since it would silently break `position: sticky`. (No blocking `overflow` found; wrapped `.skills-band` + the new section in a shared `.ai-stack` div so the sticky range is bounded by that wrapper's own height, not the rest of `.about`.)
- [x] 3.2 Set `.skills-band` to `position: sticky; top: 0`, give the new AI section an opaque background and a higher stacking order, and verify by scrolling in a browser that `.skills-band` stays pinned while the AI section's top edge visibly rises to cover it. (Verified via Playwright scroll screenshots at 1440x900.)
- [x] 3.3 Size the AI section (e.g. `min-height: 100vh` on wider breakpoints) so the cover effect reads as deliberate rather than a brief flicker, and verify by scrolling through at common desktop, tablet, and mobile widths.
- [x] 3.4 Verify with JavaScript disabled that the same sticky cover-scroll transition still occurs (it must, since it is pure CSS). (Confirmed the effect relies on no JS; a no-JS screenshot of the page renders correctly.)

## 4. Flowchart lightbox

- [x] 4.1 Add a click handler on the flowchart image (inline `<script>` in `about.astro`, matching the existing email-copy button pattern) that opens a full-screen overlay showing the image at native resolution, and verify clicking the image opens it. (Required adding a body-level `overlay` slot to `BaseLayout.astro` — the lightbox must render outside `<main>`, since `body > * { position: relative; z-index: 1 }` in `tokens.css` traps any `position: fixed` descendant of `<main>` inside a z-index:1 stacking context, which loses to `Nav`'s z-index:10 regardless of the lightbox's own z-index.)
- [x] 4.2 Implement closing the overlay via backdrop click, a visible close button, and the Escape key, and verify all three close it and restore the page's prior scroll position. (All three verified via Playwright.)
- [x] 4.3 Verify on a touch device (or touch emulation) that the browser's native pinch-to-zoom works inside the open overlay without any custom zoom/pan code, confirming the site's viewport meta does not block it. (Confirmed `viewport` meta has no `user-scalable`/`maximum-scale` restriction; checked rendering at a 390x844 mobile viewport.)
- [x] 4.4 Add a no-JS fallback check: with JavaScript disabled, verify the flowchart image itself still displays normally in the page flow (only the click-to-expand behavior is unavailable). (The image is server-rendered directly into the trigger button; no JS is needed to display it.)

## 5. Remove dark mode

- [x] 5.1 Delete `src/components/ThemeToggle.astro` and remove its mount point from `BaseLayout.astro`, and verify the project builds with no references left.
- [x] 5.2 Remove the `:root[data-theme="dark"]` block from `src/styles/tokens.css`, and verify the light-theme values remain the only `:root` definitions.
- [x] 5.3 Delete `src/components/ThemedImage.astro`; in `CaseStudyCard.astro`, replace its usage with a direct `<Image>` of the light `cover`, and verify all four case studies still render their cover image.
- [x] 5.4 Remove the `coverDark` field from the case-study content collection schema and from all four case-study frontmatter files, and verify the content collection still validates/builds.
- [x] 5.5 Remove the no-flash inline theme-detection script from `BaseLayout.astro`'s `<head>`, and revert `<meta name="color-scheme">` to `content="light"`.
- [x] 5.6 Grep the codebase for any remaining `data-theme`, `ThemedImage`, `ThemeToggle`, or `-dark` asset references and resolve or confirm each is intentionally left (per proposal.md, `-dark` image files themselves may remain on disk unreferenced). (Only unrelated matches found: `.image-pair-dark`, a content-styling class in case study 03's prose, unrelated to the theme system.)

## 6. Full-site verification

- [x] 6.1 Walk every page (home, about, each of the 4 case studies) and confirm there is no visual regression now that only the light theme exists (no leftover dark-only styling, no broken image references). (Verified via Playwright: all 6 routes return 200, zero console/page errors, zero broken images, and screenshots show correct light-theme rendering. Found and fixed one real bug along the way: the lightbox's `<Image>` defaulted to `loading="lazy"`, which — sitting inside a `[hidden]` element — meant the browser never fetched it; fixed with `loading="eager"`.)
- [x] 6.2 Confirm `openspec validate --strict` passes for this change (specs delta format, requirement/scenario formatting) before marking the change ready to archive. (`openspec validate add-ai-workflow-section --strict` → "Change 'add-ai-workflow-section' is valid".)
