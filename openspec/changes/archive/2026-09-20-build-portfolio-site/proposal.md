## Why

Ryan needs a personal portfolio site to replace the current static site at `ryan-chiang.com`. The existing site doesn't carry his content (About page, three case studies) or reflect his positioning as a designer who is trusted with ambiguous, complex problems. There is currently no site codebase — this is a 0→1 build from finalized content and a fully explored design direction (see `openspec/changes/build-portfolio-site/design.md` once written).

## What Changes

- New Astro static site with three page types: Home (intro + work list), About, and Case Study (×3, from existing content)
- Persistent, unnumbered text navigation (`首頁 / About / Contact`) and a footer with a `mailto:` contact link and copyright notice, present on every page
- Visual design system: white background, dark-gray/black text, three-step grayscale accent palette, no color, Archivo (Latin) + Noto Sans TC (CJK) typefaces, restrained hover/scroll-reveal motion only
- Decorative black-and-white line illustrations of a "working / thinking / frustrated" designer character at three fixed placements (home hero, between case studies, footer)
- Case study screenshots use flat gray placeholder blocks with captions until real screenshots are supplied
- Shared sitewide Open Graph share image
- Deployment: GitHub private repo connected to Cloudflare Pages for automatic deploys, serving the existing domain `ryan-chiang.com` (old site fully replaced, no redirect mapping)

## Capabilities

### New Capabilities
- `site-navigation`: Persistent site-wide navigation and footer (nav labels, contact link, copyright) present on every page
- `home-page`: Home page composition — logotype/tagline intro plus a list of case study cards (title + one-line summary)
- `about-page`: About page rendering the finalized About content sections, including the placeholder Beyond Work text
- `case-study-pages`: Individual case study page structure rendering the three finalized case studies, with placeholder screenshot blocks
- `visual-design-system`: Site-wide typography, color tokens, illustration placement, and motion/interaction rules that all pages must conform to
- `site-deployment`: Astro static build, GitHub-connected Cloudflare Pages deployment, and custom domain serving

### Modified Capabilities
- None — this is a new site with no pre-existing specs.

## Impact

- New Astro project (full codebase) in this repository, replacing the currently empty project root aside from `content/` and `openspec/`
- Content sourced from `content/About_頁面內容_v1.md`, `content/CaseStudy_前三份_v1.md`, `content/個人品牌定位指引.md`, and `content/about-hero-portrait.png`
- New GitHub repository (private) and a Cloudflare Pages project pointed at `ryan-chiang.com`, replacing the current site served from that domain
- No backend, database, forms, or analytics — fully static output
