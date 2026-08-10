## Purpose

Presents each finalized case study in full on its own page, so a visitor can follow the owner's reasoning end to end, with placeholder visuals standing in until real screenshots exist.

## ADDED Requirements

### Requirement: Each case study has its own page
The system SHALL render each of the three case studies in `content/CaseStudy_前三份_v1.md` (商圈分析選址 SaaS, 整合行銷公司內部管理系統, Echorise 訂閱制部落格) as its own page, including all finalized subsections (摘要, 專案背景, 過程, 設計決策, 設計展示, 成果, 反思) and any NDA notice present in the source content.

#### Scenario: Visitor loads a case study page
- **WHEN** a visitor navigates to one of the three case study pages
- **THEN** all of that case study's finalized subsections render in the order given in the source content, including its NDA notice if the source content includes one

### Requirement: Screenshot placeholders
Where a case study's "設計展示" section references a screenshot that has not yet been supplied, the system SHALL render a flat gray placeholder block with a caption describing what the screenshot would show, instead of a broken image or an empty gap.

#### Scenario: Visitor views a design-showcase item without a real screenshot
- **WHEN** a visitor reaches a "設計展示" item that has no real screenshot yet
- **THEN** a gray placeholder block is shown with a caption describing the intended screenshot

#### Scenario: Real screenshot later supplied
- **WHEN** a real screenshot is added for a "設計展示" item
- **THEN** the placeholder block for that item is replaced by the real image without requiring changes to the surrounding page structure
