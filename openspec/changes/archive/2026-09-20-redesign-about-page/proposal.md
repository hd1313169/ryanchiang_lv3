## Why

The About page content and layout are stale relative to a finalized reference design the site owner has approved (screenshot + prepared image assets in `content/img/web/`). The bio copy, skills section, and experience section no longer match the intended presentation, and the finalized copy/asset set is ready to apply.

## What Changes

- Replace the intro bio copy with the finalized text, including the full name ("我是 Ryan 江浩正") and a highlighted key sentence ("我認為設計師的核心價值是定義問題與提供解決方案。").
- Swap the portrait to the updated circular-crop asset (`content/img/web/avatar.png`).
- Move the Specialty/Experience/Email facts list from a vertical column beside the photo to a horizontal row below the bio text; values are unchanged.
- Rename "我的技能" to "我擅長的事" and restyle it from bordered text cards to a full-bleed banded section with a numbered icon per item, using the four prepared skill icons (`skill-01.png`–`skill-04.png`); replace the four skill entries' titles and descriptions with the finalized copy (複雜系統規劃 / AI 工作流程 / 跨職能協作 / 目標導向設計).
- Rename "我的經歷" to "工作經歷" and restyle the experience list from a period-led single-line layout to a two-column layout (role/org/period on the left; a bold outcome headline plus a checklist of bullet achievements on the right); replace all three experience entries' content with the finalized copy (UI/UX Designer, Marketing, Freelancer).
- Nav and Footer are unchanged — both are already shared components (via `BaseLayout`) and already match the reference design's navigation and contact-CTA presentation.

## Capabilities

### New Capabilities
- `about-page`: The About page's bio, facts, skills, and experience sections, their content, and their presentation order.

### Modified Capabilities
(none — no existing capability spec is currently tracked for this page)

## Impact

- Affected code: `src/pages/about.astro` (content data arrays, markup, and styles for the bio/facts/skills/experience sections).
- Affected assets: portrait and four skill icons need to move from `content/img/web/` into `src/assets/` so they can be processed via `astro:assets`.
- No changes to `src/components/Nav.astro`, `src/components/Footer.astro`, or `src/layouts/BaseLayout.astro`.
