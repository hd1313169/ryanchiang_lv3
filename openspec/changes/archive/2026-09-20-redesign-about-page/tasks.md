## 1. Assets

- [x] 1.1 Copy `content/img/web/avatar.png` over `src/assets/photos/avatar.png` and verify the about page's portrait `<Image>` still resolves without a build error
- [x] 1.2 Copy `skill-01.png`–`skill-04.png` from `content/img/web/` into `src/assets/icons/` and verify they import cleanly in `about.astro`

## 2. Bio section

- [x] 2.1 Replace the bio copy in `about.astro` with the finalized text ("我是 Ryan 江浩正" / "UI/UX Designer" / background paragraph / core-value sentence) and verify it renders on the page
- [x] 2.2 Style the core-value sentence ("我認為設計師的核心價值是定義問題與提供解決方案。") with visible emphasis (e.g. highlight background) distinct from the surrounding paragraph text

## 3. Facts row

- [x] 3.1 Move the `facts` list markup out of the sidebar column and render it below the bio paragraphs, keeping the existing `facts` data array and email copy-to-clipboard behavior unchanged
- [x] 3.2 Restyle the facts list from a vertical stack to a horizontal row and verify it stays legible at mobile widths (wraps or scrolls rather than overflowing)

## 4. Skills section ("我擅長的事")

- [x] 4.1 Rename the section heading from "我的技能" to "我擅長的事" and update the `skills` data array with the four finalized entries (複雜系統規劃, AI 工作流程, 跨職能協作, 目標導向設計) including their descriptions
- [x] 4.2 Restyle the section as a full-bleed banded block (background spans viewport width, content constrained to the page's max-width) replacing the bordered-card layout
- [x] 4.3 Add the imported skill icon above each entry's numbered title and verify all four render at a consistent size across the 1-column (mobile) and 2-column (desktop) grid breakpoints

## 5. Experience section ("工作經歷")

- [x] 5.1 Rename the section heading from "我的經歷" to "工作經歷" and change the `experience` array's item shape to `{ role, org, period, headline, bullets }`
- [x] 5.2 Populate the array with the three finalized entries (UI/UX Designer @ 筑今數位設計股份有限公司, Marketing @ 敦煌書局股份有限公司, Freelancer @ 自由工作者) including each headline and bullet list
- [x] 5.3 Restyle the list markup to the two-column layout (role/org/period left, bold headline + checklist-style bullets right) and verify it renders correctly for all three entries

## 6. Verification

- [x] 6.1 Run the dev server and visually compare the About page against the reference screenshot at mobile, tablet, and desktop breakpoints
- [x] 6.2 Confirm Nav and Footer are untouched (no diff in `Nav.astro`, `Footer.astro`, `BaseLayout.astro`)
- [x] 6.3 Run the project's lint/build check (e.g. `npm run build`) and verify it passes with no errors
