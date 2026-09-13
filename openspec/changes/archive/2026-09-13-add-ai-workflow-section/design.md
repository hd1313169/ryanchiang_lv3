## Context

`about.astro` today ends its "我擅長的事" band (`.skills-band`, full-bleed `#f9f9f9`) and moves straight into "工作經歷". The only entrance animation on the page is `.reveal`: a one-shot IntersectionObserver-driven fade + `translateY` that fires once per element and never re-triggers on scroll position. Nothing on the site currently pins an element with `position: sticky` or drives layout from scroll offset.

Dark mode (`add-dark-mode`, 14/15 tasks done) added `:root[data-theme="dark"]` tokens, a `ThemeToggle` component, a no-flash boot script in `BaseLayout.astro`, and `ThemedImage` (used only by `CaseStudyCard`'s cover). The toggle button has been shipped `display: none` since it landed — it has never been user-facing. See proposal.md - Why for why this is being removed rather than finished.

The flowchart itself (`content/img/web/ai.png`) is a finished, transparent-background PNG (2160×924, confirmed via `sharp` `isOpaque: false`) — no card/arrow markup needs to be built by hand.

## Goals / Non-Goals

**Goals:**
- Ship the sticky-stack cover effect using plain CSS (`position: sticky`), not a scroll-listener/JS-driven transform.
- Use the provided `ai.png` as-is; no responsive re-layout of its internal content.
- Give mobile viewers a way to see the flowchart at a legible size via a click-to-expand lightbox, relying on the browser's native pinch-zoom rather than custom zoom/pan code.
- Fully remove dark mode's runtime behavior and dead code in the same change, since it was never user-facing.

**Non-Goals:**
- No redesign of `.skills-band` or its cards beyond the `position: sticky` change needed for the cover effect.
- No CMS/data-driven authoring for the new section — heading and copy are hardcoded like the rest of `about.astro`.
- No alt-text/ARIA work for the flowchart image beyond a minimal `alt` (per proposal.md, accessibility is out of scope for this change).
- No change to the site-wide `.reveal` mechanism used elsewhere.
- No deletion of the `-dark` image files themselves (only their wiring/references) unless separately requested.

## Decisions

**1. Sticky-stack effect via `position: sticky`, not a scroll-linked JS transform.**
`.skills-band` gets `position: sticky; top: 0`. The new AI section immediately follows it in DOM order with an opaque black background and a higher stacking context, so as the page scrolls, the new section's top edge rides up over the still-pinned `skills-band` and occludes it, until the AI section's own top reaches `top: 0` and normal document flow scrolling resumes.
- *Alternative considered*: an IntersectionObserver/`scroll` listener driving a manual `translateY` (JS parallax). Rejected — adds scroll-jank risk, needs its own reduced-motion carve-out, and duplicates what `position: sticky` already gives for free, including working with JS disabled.

**2. Image goes through `astro:assets`, copied into `src/assets/` first.**
Every other image `about.astro` renders (`avatar.png`, skill icons, case-study covers) is imported from `src/assets/...` and rendered via `<Image>`, never read directly out of `content/`. `content/img/web/ai.png` gets copied to `src/assets/illustrations/ai-workflow.png` (or equivalent) and imported the same way, so it benefits from the same build-time optimization as everything else on the page.

**3. Lightbox is inline, page-scoped vanilla JS — not a new shared component.**
`about.astro` already hand-rolls page-specific interactivity in an inline `<script>` (the email-copy button) rather than extracting a component for a single use site. The lightbox follows the same pattern: a plain `hidden`-toggled fixed overlay `<div>`, opened on image click, closed on backdrop click / `Escape` / a close button. No `<dialog>` element (not used elsewhere on the site) and no zoom/pan JS — the overlay just shows the image up to its native resolution and lets the browser's existing pinch-zoom (the viewport meta does not set `user-scalable=no` or a `maximum-scale`) do the magnification.

**4. Dark mode removal is a straight deletion, no staged rollback.**
Since the toggle has been `display: none` since it shipped, there are no real users mid-session with a stored dark preference to migrate. Delete the component, tokens, boot script, and `ThemedImage` call site in one pass rather than deprecating gradually.

## Risks / Trade-offs

- **[Risk]** `position: sticky` silently stops working if any ancestor between `.skills-band` and the scrolling viewport sets `overflow` to something other than `visible`. → **Mitigation**: audit `.about`, `<main>`, and `<body>` in `BaseLayout.astro`/`tokens.css` before implementing; today only `html` sets `overflow-x: hidden`, which does not break sticky on its own, but this needs re-checking once the new section's styles are added.
- **[Risk]** The "cover" illusion only reads as intentional if the AI section is at least one viewport tall on the breakpoints where this matters — a short section would cover `.skills-band` only for a brief, easy-to-miss scroll distance. → **Mitigation**: size the new section to roughly `100vh` (min-height) on wider breakpoints; verify by scrolling through it at common desktop and tablet widths during implementation.
- **[Trade-off]** Discarding ~14 completed dark-mode tasks' worth of code instead of finishing/polishing it. Accepted — the toggle was never user-facing, and the user has explicitly chosen removal over completion.
- **[Risk]** Deleting `coverDark`/theme wiring could leave orphaned `-dark` image files with nothing referencing them. → **Mitigation**: grep for remaining `-dark` references as a verification step in tasks.md; leave the files on disk per proposal.md's Impact section.

## Migration Plan

1. Build the new About-page section (heading, copy, image, sticky-stack CSS, lightbox) first — purely additive, doesn't touch dark-mode code, easy to verify in isolation.
2. Remove dark-mode code in a second pass (components, tokens, boot script, `ThemedImage` call site, content-schema field), then re-verify every page renders correctly in the (now sole) light theme.
3. No feature flag or staged deploy needed — static site, no persisted user data beyond a `localStorage` key (`theme` or similar) that simply becomes inert/ignored once the boot script is removed, no migration required for it.

## Open Questions

- Exact minimum height for the AI section to guarantee a convincing full cover on short/landscape viewports — a tuning detail to settle visually during implementation, doesn't change the approach or task breakdown.
