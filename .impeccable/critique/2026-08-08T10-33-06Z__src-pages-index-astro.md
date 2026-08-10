---
target: "src/pages/index.astro (site-wide: home, about, case study template)"
total_score: 27
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
timestamp: 2026-08-08T10-33-06Z
slug: src-pages-index-astro
---
Method: dual-agent (A: afed91cd2e0049b2d · B: a3ca6be47cfc87622)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | `aria-current="page"` on nav works; no visible state for `mailto:` opening a mail client |
| 2 | Match System / Real World | 4 | Plain-language section headers, meta fields map to how a hiring manager actually evaluates |
| 3 | User Control and Freedom | 3 | No in-page way back to the case study list from deep in a case study |
| 4 | Consistency and Standards | 4 | Tokens, illustration placement, hover treatment applied uniformly across all pages |
| 5 | Error Prevention | 3 | Static site, little to prevent; `mailto:` has no fallback for no-mail-client users |
| 6 | Recognition Rather Than Recall | 3 | Long single-scroll case studies have no anchor nav / table of contents |
| 7 | Flexibility and Efficiency | n/a | Experience-mode surface (portfolio); no power-user path expected |
| 8 | Aesthetic and Minimalist Design | 4 | Grayscale discipline followed exactly; no stray color or unnecessary chrome |
| 9 | Error Recovery | 3 | No error states to speak of; 404 handling unverified |
| 10 | Help and Documentation | n/a | Not applicable to a portfolio Experience surface |
| **Total** | | **27/32** | **Good (84%)** |

## Design Specificity Verdict

**LLM assessment**: This reads as authored for Ryan specifically, not a generic template — the tagline, About copy, and all three case studies use his actual decision language (「為什麼不做和為什麼做同樣重要」, the invoice-refund boundary story, the one-day-subscription loophole retro) and directly perform the "logical / detail-oriented / easy to collaborate with" positioning rather than just claiming it. Where it drifts toward generic: the visual chrome — Nav, Footer, CaseStudyCard hover, section rhythm — is competent boilerplate-portfolio pattern language. The differentiation lives almost entirely in the prose, not in any interface decision unique to this designer's point of view — echoed by the detector's flat type-hierarchy finding below (a 1.4:1 size ratio across 8 sizes is a template-typical scale, not a considered one).

**Deterministic scan**: CLI scan (`detect.mjs --json src`) is clean — 0 findings, exit code 0. Browser-runtime detector (injected into the live page) found real signal the CLI and Assessment A both missed:
- **`/about`**: 4 anti-patterns — 3× `line-length` (~88 chars/line, guideline <80), 1× `flat-type-hierarchy` (8 distinct sizes from 12.8px–17.6px, only a 1.4:1 ratio), 1× `em-dash-overuse` (13 em-dashes in body text).
- **`/work/01-site-selection-saas`**: 10 anti-patterns — 9× `line-length` (~90 chars/line), 1× `em-dash-overuse` (13 em-dashes).
- No findings on `/` (home).

**Visual overlays**: Screenshot compositing was unavailable in this environment for both assessments (a known Browser-pane limitation this session), so no user-visible annotated overlay was produced. Assessment B substituted DOM-based measurement (overflow, image-load, viewport checks at 1280px and 375px) instead of pixel screenshots.

**False positives**: The `em-dash-overuse` finding (13 em-dashes) is very likely a false positive in this context — the detector's heuristic almost certainly targets the AI-writing-tell pattern in *English* prose. In Chinese, 「——」is a standard, expected punctuation mark for parenthetical asides throughout professional writing, not a stylistic tell. I would not act on this finding. The `line-length` finding deserves more scrutiny before acting on it too: the ~80-character guideline is calibrated for Latin text; CJK readability guidelines typically target a different (usually lower, ~35–45 character) line length measured in full-width characters, not the mixed-width character count the detector is likely counting. Treat as a signal worth a manual look, not a confirmed defect.

## Overall Impression

This is a well-crafted, restrained portfolio where the writing does almost all of the persuasive work and does it very well — the three case studies are genuinely differentiated, and the visual system (grayscale tokens, two-font pairing, fixed illustration placement) is applied with unusual discipline for a solo-maintained static site. The gap is structural, not aesthetic: the site's most detail-dense pages (the case studies) offer a time-pressured hiring-manager reader zero scaffolding to reach the highest-value material (成果/反思) short of a full linear scroll, and the "detail-oriented" pillar of the positioning is carried entirely by prose rather than by any interface decision a visitor actually experiences.

## What's Working

1. The case study "反思" section on `/work/01-site-selection-saas` (the one-day-subscription/100-report loophole) — genuinely differentiated content that demonstrates judgment rather than asserting it, exactly matching the "決策過程優先於成果" principle in PRODUCT.md.
2. The NDA disclosure line on each case study header turns a real limitation into a confidence-building, professional signal instead of hiding it.
3. `tokens.css` discipline — five-color grayscale, two-font system, one shared `--transition-hover` reused everywhere — is unusually consistent and matches the "克制勝過張揚" brand commitment precisely; confirmed by both the clean CLI scan and the Aesthetic/Minimalist heuristic score of 4/4.

## Priority Issues

**[P1] No in-page navigation within case studies**
- **Why it matters**: PRODUCT.md names time-pressured hiring managers doing a fast initial screen as the primary use case. The case study template renders 背景/流程/決策/成果/反思/展示 as one continuous scroll with zero anchors — this structurally forces a full linear read to reach the sections most likely to close the decision.
- **Fix**: Add a lightweight anchor list (背景・決策・成果・反思) near the top of the article, styled as plain grayscale text links consistent with the existing token system — no icons needed.
- **Suggested command**: `/impeccable layout`

**[P1] No cross-navigation between case studies from within a case study page**
- **Why it matters**: Once on one case study, the only way to reach another is browser-back or the top nav (which doesn't link to work at all). A recruiter who liked case study 1 has no prompted next step.
- **Fix**: Add a "下一篇案例" link/card at the bottom of the article (before Footer), pointing to the next entry by `order`.
- **Suggested command**: `/impeccable layout`

**[P2] Flat type hierarchy undermines the "detail-oriented" positioning it's supposed to embody**
- **Why it matters**: The detector confirms `/about` uses 8 distinct type sizes across only a 1.4:1 ratio (12.8px–17.6px) — a template-typical scale, not a considered one. Assessment A independently asked "where does a visitor *experience* 'detail-oriented,' not just read about it?" — this is the concrete answer: right now, nowhere in the type system.
- **Fix**: Collapse to a deliberate 3–4-step type scale with a clearer ratio (e.g. 1.25–1.333 modular scale), reserving the smallest sizes for genuinely secondary text (meta labels, captions) only.
- **Suggested command**: `/impeccable typeset`

**[P2] Nav has no link back to the work list itself**
- **Why it matters**: `Nav.astro` items are 首頁/About/Contact only. On a case study page, "首頁" (Home) is overloaded to mean "the case study list" — a visitor wanting to see other work has to infer that, costing a beat of thought recognition-over-recall says shouldn't be required.
- **Fix**: Rename or add a "作品" nav item pointing to `/`, keeping "首頁" only if it's also functioning as the brand/logo mark.
- **Suggested command**: `/impeccable clarify`

**[P2] CaseStudyCard hover breaks the site's own restraint rule**
- **Why it matters**: Every other hover on the site (Nav, footer, body links) is a plain color/underline change per `tokens.css`. `CaseStudyCard.astro`'s `.card:hover` adds `translateY(-4px)` + `box-shadow` on top of a border-color change — the loudest motion on the site, on the first surface recruiters see, breaking the "克制勝過張揚" principle applied everywhere else.
- **Fix**: Either drop the shadow and reduce to a smaller `translateY(2px)` + border-color only, or explicitly treat this as the one deliberate accent and note why.
- **Suggested command**: `/impeccable quieter`

## Persona Red Flags

**Sam (Accessibility)**: No custom `:focus` styles anywhere in the codebase (zero matches for "focus" across source) — relying entirely on the browser default outline against a `--color-border` #B0B0B0/grayscale-only palette risks a faint or inconsistent focus ring through the Nav → CaseStudyCard → Footer tab sequence. `mailto:` is the *only* contact method site-wide with no visible plain-text email alternative for a screen-reader user without a configured mail client.

**Riley (Stress-tester)**: Landing directly on `/work/02-...` or `/work/03-...` via a shared interview-prep link gives no indication it's part of a 3-case-study portfolio — the sparse top nav doesn't mention "work" at all (see P2 above). Unverified: 404/unknown-slug behavior on `/work/[slug].astro`, since `getStaticPaths` only returns known collection entries — an old or malformed shared link would hit Astro's default 404, unbranded against the otherwise-composed grayscale site.

**Casey (Mobile)**: Confirmed by Assessment B's DOM measurement: no horizontal overflow at 375px on any of the three pages tested, and `Nav.astro`'s three short items don't appear to need a hamburger treatment at that width. The `.hero` flex-row-to-column breakpoint (`max-width: 40em` / 640px) and the illustration's fit just above that breakpoint could not be pixel-verified this session (screenshot tooling unavailable) — worth a manual visual check next time screenshots are available.

## Minor Observations

- No skip-to-content link in `BaseLayout.astro` — low priority for a 2-item nav, but a near-zero-cost accessibility win.
- Footer doesn't repeat work/about links — someone reaching the page bottom via scroll has to scroll back up to navigate elsewhere.
- `og-image.png` referenced in `BaseLayout.astro` head meta — existence not verified by either assessment this session; if missing, social shares (a named secondary-audience channel in PRODUCT.md) would show a broken image.
- Line-length (`~88–90 chars/line` per the detector) on `/about` and case study prose is a real signal worth a manual look, but likely needs recalibration for CJK before acting on it (see False Positives above).
- The showcase caption mentioning "即將到期紅字警示" (a red-colored state in the client's *product*, not the portfolio itself) is accurate and not a real conflict with the grayscale-only rule — flagged by Assessment A only as a possible moment of reader doubt, not a defect.
- Detector's `em-dash-overuse` finding (13 occurrences) is a likely false positive for Chinese-language prose — see Design Specificity Verdict above.

## Questions to Consider

1. If the primary persona is a time-pressured hiring manager doing a "few-minutes" scan, why does the most detail-dense page (the case study) currently have the least scaffolding of any page on the site?
2. The positioning pillar "重視細節" (detail-oriented) is carried entirely by the writing right now — is that a deliberate bet that content should do 100% of the persuasive work, or a gap worth closing with one or two interface decisions (like the type scale) that let a visitor *feel* it too?
3. Is "首頁" doing double duty as both brand-anchor and work-list link, and how much of the case-study content are you comfortable with a visitor never finding if they don't resolve that ambiguity?
