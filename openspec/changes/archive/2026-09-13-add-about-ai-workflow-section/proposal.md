## Why

The About page currently describes the site owner's AI-assisted design workflow only as a single bullet inside "我擅長的事" (`AI 工作流程`). It doesn't show how AI is actually woven into the six stages of real project work, from requirements intake through acceptance documentation. A dedicated section makes that practice concrete and credible to visitors evaluating his design process.

## What Changes

- Add a new "AI 應用實踐高效設計" section to the About page, positioned after "我擅長的事" and before "工作經歷".
- Section heading follows the existing `.section-heading` pattern (diamond icon + title + rule) plus one short lead-in sentence.
- Six numbered step cards (01–06), each with a title and description, using the `.workflow-card`-style visual treatment (bordered card, bottom accent border) already established in case-study article content.
- Desktop (≥40em): 3-column × 2-row grid. Horizontal arrows point right between cards within each row. A connecting indicator bridges the end of row 1 (03) down into the start of row 2 (04) to preserve the sense of one continuous 6-step sequence.
- Mobile (<40em): 2-column × 3-row snake/boustrophedon layout. DOM order stays 01→06 for logical/screen-reader order; row 2's visual column order is reversed via CSS (`order`) so it reads right-to-left (04 rendered left, 03 rendered right), with its horizontal arrow direction flipped to point left. Vertical arrows connect row 1's rightmost column down to row 2, and row 2's leftmost column down to row 3.
- Content is fixed, provided copy (no CMS/data-driven authoring needed):
  1. 需求整理與知識管理
  2. 規格產出
  3. 概念發想
  4. UIUX 設計
  5. Prototype 製作
  6. 驗收文件產出

## Capabilities

### New Capabilities
- `about-page`: Adds the "AI 應用實踐高效設計" six-step workflow section to the About page (extends the existing About page capability, which has no archived spec yet).

### Modified Capabilities
(none — `about-page` has no prior spec under `openspec/specs/`, so this is captured as new)

## Impact

- Affected file: `src/pages/about.astro` (new section markup + scoped styles, no new dependencies).
- No changes to routing, data model, or other pages.
- Reuses existing design tokens (`tokens.css`) and the arrow/step visual language already used in `src/pages/work/[slug].astro`'s `.workflow-cards`.
