## Purpose

Defines how the portfolio's case studies are numbered, addressed, ordered and chained together, so that adding a new case study never requires renumbering the existing ones and numbering can never drift from what visitors see.

## Requirements

### Requirement: Case numbers grow with newer case studies
Each case study SHALL have a two-digit number that is unique across the catalog, and a newer case study SHALL receive a larger number than every case study added before it. The catalog SHALL contain five case studies numbered as follows: 01 訂閱制部落格 (Echorise), 02 商業選址分析平台, 03 證券業務管理系統 (業務分配), 04 整合行銷管理系統, 05 規格驅動 Prototype (證券業 CRM).

#### Scenario: Catalog is numbered by recency
- **WHEN** the catalog is inspected after this change
- **THEN** the five case studies carry the numbers 01–05 exactly as listed above, with no gaps and no duplicates

#### Scenario: A future case study is added
- **WHEN** a sixth case study is added later
- **THEN** it takes number 06 and no existing case study needs to change its number

---
### Requirement: Case study page address is its number
The system SHALL serve each case study at `/work/<NN>`, where `<NN>` is its two-digit number, for 01 through 05. No redirects from previous number assignments are required.

#### Scenario: Visitor opens a case study by number
- **WHEN** a visitor navigates to `/work/01`
- **THEN** the Echorise case study renders, and `/work/05` renders the 規格驅動 Prototype case study

---
### Requirement: Homepage lists case studies newest first
The homepage work list SHALL show every case study in the order given by a single, centrally maintained display-order list, initially 05, 02, 01, 04, 03. Changing the display order SHALL require editing only that one list, and SHALL NOT change any case study's number, page address or asset paths.

#### Scenario: Homepage order
- **WHEN** a visitor views the homepage work list
- **THEN** the cards appear top to bottom as 05, 02, 01, 04, 03 (in a two-column grid, reading left-to-right then top-to-bottom)

#### Scenario: Odd number of cards
- **WHEN** the work list has five cards in the two-column layout
- **THEN** the last row contains one card and the remaining cell may stay empty, with every card still revealing on scroll

#### Scenario: Reordering keeps addresses
- **WHEN** the display-order list is changed to put a different case first
- **THEN** the homepage order updates accordingly and every case study remains reachable at its existing `/work/<number>` address

#### Scenario: Order list out of sync with case studies
- **WHEN** the display-order list omits an existing case study, names a case study that does not exist, or names one twice
- **THEN** the site build fails with an error identifying the mismatch, rather than silently hiding or duplicating a case

---
### Requirement: Next-case link follows the homepage order
Each case study page SHALL link to "下一篇案例", which is the case study that follows it in the homepage display order, and the last case study in that order SHALL link back to the first.

#### Scenario: Next case from a middle case
- **WHEN** a visitor is on case 02 and follows "下一篇案例"
- **THEN** they land on case 01

#### Scenario: Wrap-around
- **WHEN** a visitor is on case 03 (last in the display order) and follows "下一篇案例"
- **THEN** they land on case 05

---
### Requirement: Cover image is optional
A case study SHALL be publishable without a cover image. When no cover is supplied, its homepage card SHALL render the site's gray placeholder block in the cover position; when a cover is later supplied, the card SHALL show it without other changes to the page.

#### Scenario: Case 05 before its cover exists
- **WHEN** the homepage renders case 05 and no cover image has been provided
- **THEN** its card shows the gray placeholder block with the same title, tags and summary layout as the other cards

---
### Requirement: Case 05 follows the established case study format
Case 05 SHALL provide the same metadata as cases 01–04 (title, subtitle, summary, three tags, one-line intro, 主要職責, 團隊成員, 專案時程, 使用工具) and SHALL render the sections 專案背景, 設計挑戰, 設計決策, 設計成果 and 心得與反思 in that order, using the copy from `content/case05.md`. Image slots that have no image yet SHALL NOT be rendered, annotated, or left as empty blocks, and the source's closing image disclaimer SHALL NOT appear twice because the page template already renders it.

#### Scenario: Case 05 page structure
- **WHEN** a visitor opens `/work/05`
- **THEN** the header shows subtitle, title and the four metadata rows, the floating section nav lists 專案背景 / 研究與洞察 / 設計決策 / 設計成果 / 心得與反思, and the sections render in the order above

#### Scenario: No image scaffolding
- **WHEN** the rendered HTML of `/work/05` is inspected
- **THEN** it contains no image placeholder, no HTML comment describing a missing image, and the disclaimer sentence appears exactly once

---
### Requirement: Case assets are addressed by the same number
Each case study's images, videos and cover SHALL be stored and referenced under that case's current number, so a case's assets and its page can be matched by number alone.

#### Scenario: Echorise assets after renumbering
- **WHEN** case 01 (Echorise) renders
- **THEN** all of its in-content images load from `/images/case-01/` and its cover comes from `cover-01`, with no image broken or showing another case's artwork

---
### Requirement: Project info block is a single column on mobile
Below 40em, the case study page's project info block (主要職責, 團隊成員, 專案時程, 使用工具) SHALL render as a single column with one row per item — the item's icon and label on the left and its value on the right — instead of the two-column grid used at 40em and above. The block's inner padding SHALL follow the mobile card-padding rule of the `site-responsive-layout` capability.

#### Scenario: Mobile project info is one item per row
- **WHEN** a case study page is opened at a 375px-wide viewport
- **THEN** the four project info items appear stacked one per row, in their existing order, none of them sharing a row with another

#### Scenario: A long value wraps within its own row
- **WHEN** an item's value is longer than the space to the right of its label at 375px
- **THEN** the value wraps onto additional lines within that item's row and does not overlap or push into the next item

#### Scenario: Desktop project info is unchanged
- **WHEN** a case study page is opened at 40em or wider
- **THEN** the project info block keeps its two-column layout


<!-- @trace
source: unify-mobile-layout
updated: 2026-09-20
code:
  - src/pages/index.astro
  - src/styles/tokens.css
  - src/components/Nav.astro
  - .spectra.yaml
  - src/pages/about.astro
  - src/pages/work/[slug].astro
-->

---
### Requirement: Prev/next pager stacks on mobile
Below 40em, the pager at the end of a case study page SHALL stack its two links vertically at full width, with 下一篇案例 above 上一篇案例, so that long case titles are not compressed into half-width columns. At 40em and above the two links SHALL remain side by side, with 上一篇案例 on the left and 下一篇案例 on the right.

#### Scenario: Mobile pager is stacked with next first
- **WHEN** a case study page is scrolled to its end at 375px wide
- **THEN** 下一篇案例 and its title appear on the first row and 上一篇案例 and its title on the row beneath, each spanning the content width

#### Scenario: Desktop pager is unchanged
- **WHEN** the same page is viewed at 40em or wider
- **THEN** 上一篇案例 is on the left and 下一篇案例 is on the right on one row


<!-- @trace
source: unify-mobile-layout
updated: 2026-09-20
code:
  - src/pages/index.astro
  - src/styles/tokens.css
  - src/components/Nav.astro
  - .spectra.yaml
  - src/pages/about.astro
  - src/pages/work/[slug].astro
-->

---
### Requirement: Stacked media blocks use a mobile gap
When the case study page's side-by-side media blocks (paired dark-canvas images, and text-beside-image blocks) stack into one column below 40em, the space between the stacked items SHALL use the reduced mobile spacing rather than the desktop side-by-side gap.

#### Scenario: Paired phone mockups stacked on mobile
- **WHEN** a case study containing two paired dark-canvas images is viewed at 375px
- **THEN** the two images are stacked and the vertical space between them is no more than 32px

<!-- @trace
source: unify-mobile-layout
updated: 2026-09-20
code:
  - src/pages/index.astro
  - src/styles/tokens.css
  - src/components/Nav.astro
  - .spectra.yaml
  - src/pages/about.astro
  - src/pages/work/[slug].astro
-->

---
### Requirement: Three-image row stays three columns
A case study page SHALL be able to show three images side by side in equal-width columns, and the row SHALL remain three columns at every viewport width, using a smaller gap on mobile instead of stacking.

#### Scenario: Three phone screenshots on desktop
- **WHEN** case 01 is viewed at 1280px wide
- **THEN** the three 設計成果 screenshots appear in one row with equal widths

#### Scenario: Three phone screenshots on mobile
- **WHEN** case 01 is viewed at 375px wide
- **THEN** the three screenshots still share one row, the page has no horizontal scroll, and the gap between them is smaller than on desktop

---
### Requirement: Stacked text-and-toggle block keeps its animation
When a text block with a toggling image pair is laid out text-above-image, the image pair SHALL span the full column width and SHALL keep alternating between its two frames.

#### Scenario: Heatmap toggle stacked
- **WHEN** a visitor views case 02's heatmap toggle section on desktop
- **THEN** the paragraph appears above the image, the image spans the column width, and it alternates between the heatmap-off and heatmap-on frames

---
### Requirement: Image captions are real text
Explanatory labels for a case study image SHALL be rendered as text captions below the image, not embedded in the image pixels.

#### Scenario: Case 02 report views
- **WHEN** a visitor views case 02's report-page section
- **THEN** two full-width images appear one above the other, captioned 「預設全局概覽，顯示區域範圍內指標總和」 and 「點擊圖標，查詢個別店家的詳細數據」 respectively, and the captions remain selectable text
