## Context

- Cases live in `src/content/case-studies/NN.md`. The Astro glob loader uses the file name as the entry id, which is also the URL slug (`/work/NN`).
- `order` in frontmatter currently equals the file number, and both `src/pages/index.astro` and `src/pages/work/[slug].astro` sort ascending by it. The "下一篇案例" link is `list[(i+1) % n]` on that sorted list.
- Number-derived assets: `public/images/case-0X/X-*.{jpg,gif,mp4}` (referenced by absolute `/images/...` paths inside the md), `src/assets/photos/cover-0X(.png|-dark.jpg)` (only the `.png` is referenced, via `cover:` frontmatter), and the original source material in `content/img/case/` (not part of the build).
- Numbers are not displayed anywhere in the UI. The site has no external links to `/work/NN` (confirmed by the owner), so URL changes are free.
- `[slug].astro` already renders the "本文所有圖片與資料皆經過處理…" disclaimer for every case.

See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Numbers mean recency; placement follows numbers; one source of truth for both.
- Case 05 is indistinguishable in structure from 01–04 and needs no code path of its own.

**Non-Goals:**
- No redesign of the case page template or homepage layout beyond the five-card adjustments.
- No editing of the four existing cases' copy; they only move to new numbers.
- No cover or in-content images for case 05 (supplied later).
- No changes to `content/CaseStudy_合集.md`.

## Decisions

**1. Derive ordering from the id; drop `order`.**
Sort by `Number(id)` descending in both `index.astro` and `[slug].astro`; remove `order` from the schema and from all five md files. Alternative: keep `order` and set it to 5…1. Rejected: it recreates the exact coupling problem (two values to keep in sync) that motivated this change. Cost: manually reordering later requires reintroducing a field, which is acceptable because the owner explicitly wants placement to follow numbering.

**2. Renumber by staged swap, with `git mv`.**
The mapping is a permutation (04→01, 03→02, 02→03, 01→04), so direct renames collide. Move everything to a neutral staging name first (`_old-04` etc.), then to the final names, for each of: the md files, `public/images/case-0X/` folders and the `X-` file name prefixes inside them, `src/assets/photos/cover-0X*`, and `content/img/case/*`. Using `git mv` keeps history readable.

```
old key   final key        old key   final key
  01   →     04              03   →     02
  02   →     03              04   →     01
```

**3. Rewrite in-content paths mechanically, then verify.**
Inside each moved md file, `/images/case-0A/A-x` → `/images/case-0B/B-x` and `cover: "../../assets/photos/cover-0A.png"` → `cover-0B.png`. Do it per file (each file has exactly one old number) so no cross-file replace can double-map. Verify with a build plus a script that checks every `/images/...` reference in the five md files resolves to a file in `public/`.

**4. Case 05 is content only.**
Create `src/content/case-studies/05.md` from `content/case05.md`:
- "基本資訊" block → frontmatter (`mainDuties`, `team`, `timeline`, `tools`). The "類別標籤: 證券業" line has no frontmatter counterpart and informs `subtitle`/`tags` instead.
- Body starts at `## 專案背景`; the title heading, version line, "基本資訊" block, the four `<!-- 📌 ... -->` image annotations, and the closing disclaimer are dropped. Tables, blockquote "Key Insight" callouts and the bold closing line stay as written (same constructs 01–04 use).
- Not-yet-written frontmatter, drafted here for the owner to adjust:
  - `title`: 以規格驅動的 AI 工作流，重新定義 Prototype 的交付方式
  - `subtitle`: 證券業 CRM Prototype 工作流
  - `summary`: 證券業 CRM 系統的多模組交付專案。我建立一套以 Claude Code 為核心的規格驅動 Prototype 工作流，說服 PM 與外部團隊採用，讓三方直接操作 Prototype 取代靜態說明。
  - `tags`: ["AI 工作流", "Prototype 製作", "跨團隊協作"]
  - `intro`: 讓不擅長操作 Figma 的三方，也能親手驗證複雜的報表互動。
  - `mainDuties`: UIUX 設計 · Prototype 製作 · AI 工作流設計
  - `team`: SA · PM · 外部開發團隊
  - `timeline`: 2026.06 — 2026.09
  - `tools`: Figma · Claude Code · Gemini Notebook
  - `ndaNote`: omitted (optional field)
  - `cover`: omitted until an image exists
- Inline code such as `tokens.json` and `figma` in the source is kept as inline code; if it renders badly next to the surrounding prose, adjust in the styles task rather than rewording the copy.

**5. Five-card grid: minimal tweak.**
Add `.work-card:nth-child(5)` a 480ms stagger delay to continue the cascade. Leave the odd card alone in the two-column grid rather than stretching it, matching how `.side-projects` already tolerates empty cells. The one-column mobile layout is unaffected.

## Risks / Trade-offs

- [Half-done rename leaves a case pointing at another case's images] → Rename in one scripted pass, then run the reference-resolution check and a full `astro build`; also eyeball `/work/01`–`/work/05` in dev, since a wrong-but-existing image would pass the file-existence check.
- [Swap collisions overwrite files] → Staged rename (Decision 2) and run it on a clean tree, so `git status` shows only renames plus edits and `git checkout` can undo it.
- [Untracked `content/case05.md` is the only copy of the case 05 copy] → Leave it in place (it is source material) and create `05.md` as a copy, not a move.
- [Cached or bookmarked `/work/0X` URLs now show different cases] → Accepted: no external links exist.
- [Drafted frontmatter for case 05 is my wording, not the owner's] → Flagged above; edits are one-line changes in `05.md` and do not affect structure.
- [Case 05 and 03 both concern the same 證券業 CRM] → Content overlap is the owner's call; noted only. Titles/summaries are written to differentiate the angle (Prototype workflow vs. 業務分配 rules).

## Migration Plan

1. Work on a clean tree (only `content/case05.md` untracked today).
2. Do the staged renames and path rewrites, add `05.md`, update code.
3. `npm run build`, run the reference check, view the homepage and each `/work/NN` in `npm run dev`.
4. Commit as one change; rollback is a plain `git revert` since nothing outside the repo depends on the old numbers.
