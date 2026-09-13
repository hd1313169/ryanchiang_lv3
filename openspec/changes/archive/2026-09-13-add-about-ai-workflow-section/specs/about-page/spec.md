## Purpose

Presents the site owner's introduction, contact facts, skill areas, work experience, AI-assisted workflow, and personal projects so a visitor can understand his background and working method.

## ADDED Requirements

### Requirement: About page AI workflow section
The About page SHALL display an "AI 應用實踐高效設計" section, positioned after the "我擅長的事" section and before the "工作經歷" section, presenting exactly six numbered workflow steps in a fixed sequence.

#### Scenario: Visitor views the AI workflow section
- **WHEN** a visitor reaches the "AI 應用實踐高效設計" section
- **THEN** six entries are shown in order — 01 需求整理與知識管理, 02 規格產出, 03 概念發想, 04 UIUX 設計, 05 Prototype 製作, 06 驗收文件產出 — each numbered and paired with its title and description text

### Requirement: AI workflow step sequence on desktop
On viewports at or above the site's tablet breakpoint, the AI workflow section SHALL lay out its six steps as a 3-column by 2-row grid, connect same-row adjacent steps with a rightward-pointing arrow, and visually connect the end of the first row to the start of the second row.

#### Scenario: Visitor views the AI workflow section on desktop
- **WHEN** a visitor with a viewport at or above the tablet breakpoint reaches the AI workflow section
- **THEN** steps 01-03 render as the first row and steps 04-06 as the second row, a rightward arrow appears between 01→02 and 02→03, a rightward arrow appears between 04→05 and 05→06, and a connecting indicator appears between step 03 and step 04

### Requirement: AI workflow step sequence on mobile
Below the site's tablet breakpoint, the AI workflow section SHALL lay out its six steps as a 2-column by 3-row snake sequence in which the reading order remains 01 through 06, the second row's visual column order is reversed relative to the first and third rows, and vertical arrows connect the end of each row to the start of the next.

#### Scenario: Visitor views the AI workflow section on mobile
- **WHEN** a visitor with a viewport below the tablet breakpoint reaches the AI workflow section
- **THEN** row 1 displays 01 in the left column and 02 in the right column with a rightward arrow between them, row 2 displays 04 in the left column and 03 in the right column with a leftward arrow between them, row 3 displays 05 in the left column and 06 in the right column with a rightward arrow between them, a downward arrow appears below 02 connecting to 03, and a downward arrow appears below 04 connecting to 05
- **AND** the document order of the six steps for assistive technology remains 01, 02, 03, 04, 05, 06
