## ADDED Requirements

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

### Requirement: Prev/next pager stacks on mobile
Below 40em, the pager at the end of a case study page SHALL stack its two links vertically at full width, with 下一篇案例 above 上一篇案例, so that long case titles are not compressed into half-width columns. At 40em and above the two links SHALL remain side by side, with 上一篇案例 on the left and 下一篇案例 on the right.

#### Scenario: Mobile pager is stacked with next first
- **WHEN** a case study page is scrolled to its end at 375px wide
- **THEN** 下一篇案例 and its title appear on the first row and 上一篇案例 and its title on the row beneath, each spanning the content width

#### Scenario: Desktop pager is unchanged
- **WHEN** the same page is viewed at 40em or wider
- **THEN** 上一篇案例 is on the left and 下一篇案例 is on the right on one row

### Requirement: Stacked media blocks use a mobile gap
When the case study page's side-by-side media blocks (paired dark-canvas images, and text-beside-image blocks) stack into one column below 40em, the space between the stacked items SHALL use the reduced mobile spacing rather than the desktop side-by-side gap.

#### Scenario: Paired phone mockups stacked on mobile
- **WHEN** a case study containing two paired dark-canvas images is viewed at 375px
- **THEN** the two images are stacked and the vertical space between them is no more than 32px
