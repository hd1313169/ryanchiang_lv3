## Purpose

Presents the site owner's introduction, contact facts, skill areas, and work experience so a visitor can understand his background and get in touch, matching the finalized reference layout and copy.

## ADDED Requirements

### Requirement: About page bio section
The About page SHALL display a bio section containing the site owner's name and title, an emphasized statement of his core design value, and supporting paragraphs describing his background.

#### Scenario: Visitor views the bio section
- **WHEN** a visitor loads the About page
- **THEN** the bio section displays "我是 Ryan 江浩正", "UI/UX Designer", and the sentence "我認為設計師的核心價值是定義問題與提供解決方案。" rendered with visual emphasis distinct from the surrounding paragraph text

### Requirement: About page facts row
The About page SHALL display a horizontal row of facts (Specialty, Experience, Email) positioned below the bio text.

#### Scenario: Visitor views the facts row
- **WHEN** a visitor loads the About page
- **THEN** the Specialty, Experience, and Email facts are displayed in a horizontal row beneath the bio paragraphs

### Requirement: About page skills section
The About page SHALL display a "我擅長的事" section presenting exactly four numbered skill entries, each with an icon, title, and one-sentence description.

#### Scenario: Visitor views the skills section
- **WHEN** a visitor reaches the "我擅長的事" section
- **THEN** four entries are shown in order — 複雜系統規劃, AI 工作流程, 跨職能協作, 目標導向設計 — each numbered 01-04 and paired with an icon and description

### Requirement: About page experience section
The About page SHALL display a "工作經歷" section listing the site owner's roles in reverse-chronological order, each with role title, organization, period, an outcome headline, and a list of achievement bullets.

#### Scenario: Visitor views the experience section
- **WHEN** a visitor reaches the "工作經歷" section
- **THEN** three entries are shown in order — UI/UX Designer at 筑今數位設計股份有限公司 (2023.02–2026.09), Marketing at 敦煌書局股份有限公司 (2020.07–2022.11), and Freelancer as 自由工作者 (2020.04–Present) — each with its outcome headline and achievement bullets

### Requirement: About page email contact
The About page SHALL display the owner's email address as copyable text in the facts row.

#### Scenario: Visitor copies the email
- **WHEN** a visitor activates the email fact
- **THEN** `wsad71155@gmail.com` is copied to the clipboard and the control confirms the copy
