## 1. Renumber existing cases (04→01, 03→02, 02→03, 01→04)

- [x] 1.1 Confirm the tree is clean apart from untracked `content/case05.md` (`git status --short`), and record the old-number → title mapping from each md's frontmatter so it can be re-checked after the rename
- [x] 1.2 Stage-rename the four md files with `git mv` via neutral temp names, then to final names; verify `src/content/case-studies/` contains `01–04.md` and that `01.md` is the Echorise case (title 讓創作者自主掌控的訂閱制部落格), `02.md` 商業選址, `03.md` 證券業務分配, `04.md` 整合行銷
- [x] 1.3 Stage-rename `public/images/case-0X/` folders and the `X-` prefix of every file inside (e.g. old `case-04/4-a.jpg` → `case-01/1-a.jpg`); verify folder listing shows `case-01…04` and file prefixes match their folder number
- [x] 1.4 Stage-rename `src/assets/photos/cover-0X.png` and `cover-0X-dark.jpg` by the same mapping; verify the eight files exist under the new numbers
- [x] 1.5 Rewrite, per file, each md's `/images/case-0A/A-…` references and `cover:` path to the new number; verify with a script that every `/images/...` path in `01–04.md` resolves to an existing file in `public/` and every `cover:` path resolves under `src/assets/photos/`
- [x] 1.6 Apply the same mapping to `content/img/case/*` (`1-a…` ↔ `4-a…`, `cover-01…04.png`; leave `cover-a.jpg` / `cover-b.png` alone); verify the file list by prefix matches the mapping and no original was lost (file count before = after)

## 2. Ordering derived from case number

- [x] 2.1 Remove `order` from the schema in `src/content.config.ts` and from the frontmatter of `01–04.md`; verify `grep -rn "order:" src/content` returns nothing
- [x] 2.2 Sort by `Number(id)` descending in `src/pages/index.astro` and `src/pages/work/[slug].astro`; verify in dev that the homepage lists 04, 03, 02, 01 with unchanged visual order versus before, and that "下一篇案例" on case 01 links to the highest-numbered case

## 3. Add case 05

- [x] 3.1 Create `src/content/case-studies/05.md`: frontmatter from design.md (no `order`, no `cover`, no `ndaNote`), body copied from `content/case05.md` starting at `## 專案背景`, minus the title/version/基本資訊 block, the four `<!-- 📌 -->` annotations and the closing disclaimer; leave `content/case05.md` in place. Verify `astro build` succeeds and `dist/work/05/index.html` exists
- [x] 3.2 Verify `dist/work/05/index.html` (or dev page) has exactly one disclaimer sentence, no `<!--` image annotations, no `<img>` or placeholder blocks, and headings 專案背景 / 設計挑戰 / 設計決策 / 設計成果 / 心得與反思 in order
- [x] 3.3 Verify the floating section nav on `/work/05` shows 專案背景 / 研究與洞察 / 設計決策 / 設計成果 / 心得與反思, the 研究與洞察 link jumps to 設計挑戰, and the four metadata rows render in the header

## 4. Homepage five-card layout

- [x] 4.1 Add a `.work-card:nth-child(5)` transition delay (480ms) in `src/pages/index.astro`; verify in dev at desktop and mobile widths that all five cards reveal on scroll, case 05 shows the gray placeholder in the cover position, and the empty grid cell next to the last card does not break layout

## 5. Final verification

- [x] 5.1 Run `npm run build` and confirm no errors; confirm `dist/work/` contains exactly `01`–`05`
- [x] 5.2 Open `/work/01` through `/work/05` in dev and confirm each shows its own copy and images (no broken images, no image from another case), and that "下一篇案例" walks 05 → 04 → 03 → 02 → 01 → 05
- [x] 5.3 Run `openspec validate add-case-05-and-renumber` and confirm it passes
