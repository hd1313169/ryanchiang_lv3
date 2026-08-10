## Context

No code exists yet — only finalized content in `content/` (About text, three case studies, brand positioning guide, hero portrait photo) and five AI-generated character illustrations used as style reference. The owner knows only HTML/CSS/JS and will maintain this site solo going forward, which is why Astro was chosen over a heavier framework: `.astro` files are close to plain HTML, output is fully static, and no client-side framework knowledge is required to read or extend the code. See `proposal.md` for the full motivation and `specs/*/spec.md` for behavior requirements.

## Goals / Non-Goals

**Goals:**
- Ship a small, fully static Astro site the owner can extend by adding a new Markdown file per future case study
- Keep the component surface small enough that "越簡單越好" holds true after handoff
- Get a real, deployed site on `ryan-chiang.com` even though case study screenshots and the final illustration set aren't ready yet

**Non-Goals:**
- No CMS, backend, database, or contact form
- No i18n / language switching
- No analytics in this phase
- No visual polish pass on real case-study screenshots (placeholders only — real images are a future change)

## Decisions

### Astro with content collections for case studies
Each case study becomes a Markdown file in an Astro content collection (`src/content/case-studies/*.md`) with frontmatter: `title`, `summary` (one line, used on the home card), `tags`, `order`, `ndaNote` (optional). The page body holds the full case study text (摘要/背景/過程/決策/展示/成果/反思), split into a small set of typed sections so the "設計展示" section can interleave real `image` entries with placeholder captions.

*Alternative considered*: hardcoding three `.astro` pages. Rejected — the whole point of the content-collection approach is that adding case study #4 later is "add a Markdown file," matching the maintenance concern that drove the Astro decision in the first place.

### Component breakdown
Small, single-purpose components: `Nav.astro`, `Footer.astro`, `CaseStudyCard.astro`, `PlaceholderBlock.astro` (gray `#F2F2F2` block + caption), `Illustration.astro` (renders one of the fixed decorative SVG/PNG assets by name), and a shared `BaseLayout.astro` that wires in Nav, Footer, fonts, and the OG image meta tag. Home, About, and each case study page compose these.

### Design tokens as plain CSS custom properties
Colors, spacing, and font stacks live in one `src/styles/tokens.css` using `:root` custom properties (`--color-bg`, `--color-text`, `--color-text-secondary`, `--color-border`, `--color-block-bg`). No CSS-in-JS or utility framework — plain CSS keeps the codebase legible to someone who only knows HTML/CSS/JS.

### Fonts self-hosted via Fontsource
Archivo and Noto Sans TC are pulled in via `@fontsource` packages (npm) rather than a Google Fonts `<link>`, so the build has no runtime dependency on an external font CDN and font-loading behavior is predictable. `font-display: swap` avoids invisible text during load.

### Motion via plain CSS + one small IntersectionObserver script
Hover transitions are plain CSS (`transition` on color/border/transform). The one-time scroll-reveal fade+shift uses a single small vanilla-JS `IntersectionObserver` that adds a class the first time a section enters the viewport and then unobserves it (so it never re-triggers). No animation library.

*Alternative considered*: a library like GSAP or Framer Motion. Rejected as unnecessary weight for three restrained effects, and it would introduce an API the owner doesn't already know.

### Illustration assets are static files, produced out-of-band
The four/five decorative illustration poses (hero, between-cards, footer, ± spares) are produced separately (AI-assisted or hand-drawn, per the owner's earlier decision) as static SVG or PNG files checked into `src/assets/illustrations/`. Build tooling does not generate them. `Illustration.astro` just renders whichever named asset is passed in.

### Deployment: GitHub (private) → Cloudflare Pages → custom domain
Cloudflare Pages project connects to the private GitHub repo, build command `npm run build`, output directory `dist`. Once a deploy is verified on the `*.pages.dev` preview URL, `ryan-chiang.com` is added as a custom domain on the Pages project and DNS is pointed at it, replacing whatever currently serves the domain.

## Risks / Trade-offs

- **[Risk]** Illustration set isn't ready by the time the rest of the site is built → **[Mitigation]** `Illustration.astro` takes a named asset; ship with one simple placeholder line-art pose if needed and swap the file later without touching any page.
- **[Risk]** DNS cutover briefly breaks the live domain → **[Mitigation]** verify fully on the Pages preview URL first, then switch DNS; Cloudflare DNS changes propagate quickly and the old site's static files stay recoverable if a rollback is needed.
- **[Risk]** Content collection frontmatter schema doesn't fit a future, differently-shaped case study → **[Mitigation]** schema only encodes what all three current case studies already share; extending it later is additive, not breaking.
- **[Risk]** Owner unfamiliar with Astro syntax gets stuck maintaining it solo → **[Mitigation]** keep component count minimal and each component close to plain HTML, per the Goals above.

## Migration Plan

1. Scaffold Astro project, tokens, fonts, base layout
2. Build Nav/Footer, Home, About, Case Study pages against real content with placeholder screenshots
3. Add decorative illustrations (placeholder pose acceptable initially)
4. Push to a new private GitHub repo, connect Cloudflare Pages, verify on preview URL
5. Point `ryan-chiang.com` at the Cloudflare Pages project; confirm old site is fully replaced
6. No rollback path is being pre-built (personal portfolio, low stakes) — if something looks wrong post-cutover, redeploy the previous Pages deployment from Cloudflare's dashboard, which keeps prior deployments available

## Open Questions

- Whether the illustration poses are produced with AI generation or hand-drawn is left to the owner at implementation time — doesn't change the spec or the `Illustration.astro` approach either way.
