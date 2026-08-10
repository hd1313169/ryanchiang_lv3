## 1. Project Setup

- [x] 1.1 Scaffold Astro project in the repo root (`npm create astro@latest`), commit initial structure
- [ ] 1.2 Initialize git, create private GitHub repo, push initial commit
- [x] 1.3 Add `@fontsource/archivo` and `@fontsource/noto-sans-tc`, wire into base layout
- [x] 1.4 Create `src/styles/tokens.css` with the five grayscale color custom properties and shared spacing/font-stack variables
- [x] 1.5 Build `BaseLayout.astro` (fonts, tokens, `<head>` meta including shared OG image tag)

## 2. Navigation & Footer

- [x] 2.1 Build `Nav.astro` — persistent, unnumbered `首頁 / About / Contact` list, `Contact` as `mailto:wsad71155@gmail.com`
- [x] 2.2 Build `Footer.astro` — `mailto:` contact link + copyright notice, included on every page via `BaseLayout`

## 3. Content Modeling

- [x] 3.1 Define `case-studies` content collection schema (`title`, `summary`, `tags`, `order`, `ndaNote`, screenshot entries with placeholder-vs-real state)
- [x] 3.2 Transcribe the three case studies from `content/CaseStudy_前三份_v1.md` into `src/content/case-studies/*.md` per the schema
- [x] 3.3 Transcribe About page sections from `content/About_頁面內容_v1.md` into a structured source (frontmatter or `src/content/about.md`), using the Beyond Work placeholder text and the real email address

## 4. Shared Components

- [x] 4.1 Build `CaseStudyCard.astro` (title + one-line summary, links to case study page, hover lift/border per motion spec)
- [x] 4.2 Build `PlaceholderBlock.astro` (`#F2F2F2` block + caption, swappable for a real image later)
- [x] 4.3 Build `Illustration.astro` (renders a named static illustration asset, no animation)
- [x] 4.4 Add placeholder or final illustration assets to `src/assets/illustrations/` for the three fixed placements (home hero, between home-page cards, footer)

## 5. Pages

- [x] 5.1 Build Home page: intro (wordmark + one-line positioning statement, no photo) + illustration + list of `CaseStudyCard`s for all case studies
- [x] 5.2 Build About page: photo, 人/思維/經歷/技能/Experience sections, Beyond Work placeholder, email `mailto:` link
- [x] 5.3 Build case study page template: renders 摘要/背景/過程/決策/展示/成果/反思, NDA notice when present, `PlaceholderBlock` for each screenshot slot
- [x] 5.4 Generate the three case study pages from the content collection via the template

## 6. Motion & Interaction

- [x] 6.1 Add CSS hover transitions (150–200ms) for links/buttons and case study cards
- [x] 6.2 Add the one-time scroll-reveal `IntersectionObserver` script (fade + upward shift, unobserve after first trigger)
- [x] 6.3 Verify no page-transition animation is applied between navigations

## 7. Deployment

- [ ] 7.1 Create Cloudflare Pages project connected to the private GitHub repo (build command `npm run build`, output `dist`)
- [ ] 7.2 Verify the deployed site on the `*.pages.dev` preview URL against all specs
- [ ] 7.3 Add `ryan-chiang.com` as a custom domain on the Cloudflare Pages project and point DNS at it
- [ ] 7.4 Confirm the old site is fully replaced at `ryan-chiang.com` and the new deployment is live

## 8. Verification

- [x] 8.1 Walk every scenario in `specs/site-navigation/spec.md`, `specs/home-page/spec.md`, `specs/about-page/spec.md`, `specs/case-study-pages/spec.md`, `specs/visual-design-system/spec.md`, and `specs/site-deployment/spec.md` against the live preview and confirm each passes
- [x] 8.2 Check color usage sitewide against the five defined tokens only (no stray colors, including links)
- [x] 8.3 Spot-check responsive behavior of nav, footer, and case study card grid on a narrow viewport
