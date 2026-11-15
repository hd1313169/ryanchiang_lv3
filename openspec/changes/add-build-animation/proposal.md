# Proposal

## Why

網站定位強調「展示設計思考過程」，但目前首頁與 About 頁的入場只是通用的淡入上移，無法傳達「設計師如何從零建構介面」。`design_style/design_style.md` 定義了一套「從零建構」入場動畫（參考線 → 游標拉框 → 骨架 → 打字 → 收線），可以把這個定位直接演出來。這次是試驗性導入，必須能分階段合併、隨時關閉或整體退回。

## What Changes

- 新增建構動畫引擎（GSAP 3.12.x，純 TypeScript 模組，位於 `src/build-anim/`），依 `data-build` / `data-group` / `data-depth` 標記自動產生 timeline，所有參數集中於 `config.ts`，並提供總開關。
- 首頁 Hero、About 首屏（intro）與導覽列每次載入都播放。播放時鎖定捲動，可點擊略過、捲動加速。兩頁的 Nav 與 Footer 也各自獨立建構（案例頁不變）。
- 首頁的精選專案、個人專案，以及 About 的技能、AI 工作流程、工作經歷、社群區段，改為捲動觸發：每個區塊捲進畫面時以時間播完建構，往回捲離開畫面時收回（不使用規格的「釘住＋隨捲動拖動」，見 design.md 決策 21）。
- **BREAKING（視覺行為）**：首頁與 About 移除現有的 `.reveal` 淡入上移，以及 About 卡片的錯開入場，全部改用建構效果。案例頁的 `.reveal` 維持不變。
- About「我擅長的事 → AI 工作流程」的疊蓋轉場由 CSS sticky 改為 GSAP pin 實作，視覺效果不變；停用 JS 時不再有疊蓋。
- 視覺系統新增僅供 overlay 使用的 token：藍色建構色（#2F54EB）、深色區段用的反白版本、骨架色階、mono 字型（JetBrains Mono）。現有內容色、底色、字型不變。

## Capabilities

### New Capabilities

- `build-animation`: 「從零建構」入場動畫引擎的行為，包含標記規則、once／scrub 兩種模式、捲動鎖定與略過／加速、播放條件、手機版降級、JS 失敗時的保底，以及總開關。

### Modified Capabilities

- `visual-design-system`: 「Restrained interaction motion」改為容許首頁與 About 使用建構動畫，淡入上移只保留給案例頁；新增 overlay 專用的建構色與 mono 字 token。
- `about-page`: 「Sticky cover-scroll transition」改由 JS 實作（停用 JS 時無疊蓋）；移除「Staggered card entrance」，改由建構動畫負責各區段入場。

## Impact

- 程式碼：`src/pages/index.astro`、`src/pages/about.astro`（加標記、移除 `.reveal` 與 sticky，可能小幅調整排版）；`src/styles/tokens.css`；新增 `src/build-anim/*`。`BaseLayout.astro` 的 reveal 機制保留給案例頁使用。`Nav.astro`、`Footer.astro` 加上 `build` prop，只在首頁與 About 啟用；案例頁不動。
- 依賴：新增 `gsap`、`@fontsource/jetbrains-mono`。
- 使用體驗：首屏約 4–5 秒的捲動鎖定（可略過）；其餘區段不增加額外捲動距離。
- 退路：分支開發，分三階段 commit（首頁 Hero → 首頁 scrub → About），可只合併部分階段；上線後可用 `config.ts` 的開關停用。
