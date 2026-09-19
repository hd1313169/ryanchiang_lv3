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

### Requirement: Case study page address is its number
The system SHALL serve each case study at `/work/<NN>`, where `<NN>` is its two-digit number, for 01 through 05. No redirects from previous number assignments are required.

#### Scenario: Visitor opens a case study by number
- **WHEN** a visitor navigates to `/work/01`
- **THEN** the Echorise case study renders, and `/work/05` renders the 規格驅動 Prototype case study

### Requirement: Homepage lists case studies newest first
The homepage work list SHALL show every case study in descending number order (05, 04, 03, 02, 01), and ordering SHALL be derived from the case number alone rather than from a separately maintained order value.

#### Scenario: Homepage order
- **WHEN** a visitor views the homepage work list
- **THEN** the cards appear top to bottom as 05, 04, 03, 02, 01 (in a two-column grid, reading left-to-right then top-to-bottom)

#### Scenario: Odd number of cards
- **WHEN** the work list has five cards in the two-column layout
- **THEN** the last row contains one card and the remaining cell may stay empty, with every card still revealing on scroll

### Requirement: Next-case link follows the homepage order
Each case study page SHALL link to "下一篇案例", which is the case study with the next lower number, and the case study numbered 01 SHALL link back to 05.

#### Scenario: Next case from a middle case
- **WHEN** a visitor is on case 04 and follows "下一篇案例"
- **THEN** they land on case 03

#### Scenario: Wrap-around
- **WHEN** a visitor is on case 01 and follows "下一篇案例"
- **THEN** they land on case 05

### Requirement: Cover image is optional
A case study SHALL be publishable without a cover image. When no cover is supplied, its homepage card SHALL render the site's gray placeholder block in the cover position; when a cover is later supplied, the card SHALL show it without other changes to the page.

#### Scenario: Case 05 before its cover exists
- **WHEN** the homepage renders case 05 and no cover image has been provided
- **THEN** its card shows the gray placeholder block with the same title, tags and summary layout as the other cards

### Requirement: Case 05 follows the established case study format
Case 05 SHALL provide the same metadata as cases 01–04 (title, subtitle, summary, three tags, one-line intro, 主要職責, 團隊成員, 專案時程, 使用工具) and SHALL render the sections 專案背景, 設計挑戰, 設計決策, 設計成果 and 心得與反思 in that order, using the copy from `content/case05.md`. Image slots that have no image yet SHALL NOT be rendered, annotated, or left as empty blocks, and the source's closing image disclaimer SHALL NOT appear twice because the page template already renders it.

#### Scenario: Case 05 page structure
- **WHEN** a visitor opens `/work/05`
- **THEN** the header shows subtitle, title and the four metadata rows, the floating section nav lists 專案背景 / 研究與洞察 / 設計決策 / 設計成果 / 心得與反思, and the sections render in the order above

#### Scenario: No image scaffolding
- **WHEN** the rendered HTML of `/work/05` is inspected
- **THEN** it contains no image placeholder, no HTML comment describing a missing image, and the disclaimer sentence appears exactly once

### Requirement: Case assets are addressed by the same number
Each case study's images, videos and cover SHALL be stored and referenced under that case's current number, so a case's assets and its page can be matched by number alone.

#### Scenario: Echorise assets after renumbering
- **WHEN** case 01 (Echorise) renders
- **THEN** all of its in-content images load from `/images/case-01/` and its cover comes from `cover-01`, with no image broken or showing another case's artwork
