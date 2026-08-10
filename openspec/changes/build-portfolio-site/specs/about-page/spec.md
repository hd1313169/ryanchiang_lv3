## Purpose

Presents the finalized About page content so a hiring manager or collaborator can understand the site owner's working style, background, and how to reach him.

## ADDED Requirements

### Requirement: About page renders finalized content sections
The About page SHALL render, in order, the sections finalized in `content/About_頁面內容_v1.md`: photo, 人, 思維, 經歷, 技能, and Experience.

#### Scenario: Visitor loads About page
- **WHEN** a visitor loads the About page
- **THEN** the photo, 人, 思維, 經歷, 技能, and Experience sections are all present, in that order

### Requirement: Beyond Work placeholder
Until real Beyond Work content is supplied, the About page SHALL render the placeholder text "AI 相關的個人專案整理中，稍後補上。" in the Beyond Work section instead of leaving the section empty or omitting it.

#### Scenario: Beyond Work section shown with placeholder
- **WHEN** a visitor reaches the Beyond Work section on the About page
- **THEN** the text "AI 相關的個人專案整理中，稍後補上。" is displayed

### Requirement: About page email contact
The About page SHALL display the owner's email address as a `mailto:` link.

#### Scenario: Visitor views email section
- **WHEN** a visitor reaches the email section of the About page
- **THEN** a `mailto:` link addressed to `wsad71155@gmail.com` is shown
