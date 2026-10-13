## ADDED Requirements

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
