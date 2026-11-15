# Design

## Context

- 動畫規格與原型：`design_style/design_style.md`、`design_style/design_style.html`。本設計以該文件為準，只記錄針對本站的調整。
- Astro 靜態站。現有入場效果是 `BaseLayout.astro` 的 `.reveal` + IntersectionObserver；About 的 skills／AI 區段用 CSS sticky 疊蓋。
- `Nav` 在 Layout 層、位於 `<main>` 外，全站共用。
- 維護者熟 HTML/CSS/JS，引擎需保持可讀、參數集中。

## Goals / Non-Goals

**Goals:**
- 引擎可從頁面完全拔除（刪資料夾＋移除 script＋拿掉 `data-*`），不影響其他頁。
- 分三階段交付，每階段可獨立合併或退回。

**Non-Goals:**
- 不改動案例頁、Nav、Footer、BaseLayout 的 reveal 機制。
- 不改內容色、底色、內容字型。
- 不處理無障礙播報與 SEO（規格既定；JS 失敗時內容完整可見的保底仍保留）。

## Decisions

1. **引擎結構照規格 §3**：`src/build-anim/`（index / config / measure / split / overlay / timeline / scroll-lock / rng / build-anim.css），由各頁的 `<script>` 在 `document.fonts.ready` 後呼叫 `buildSection()`。Astro 會自動打包，不需要額外設定。
   - 替代方案：寫成 Astro 元件包住區段。缺點是會改動頁面 DOM 結構，退路比較差，所以不採用。

2. **總開關**：`config.ts` 加 `ENABLED`、`SCRUB_ENABLED`。`ENABLED=false` 時不加 `html.js` 隱藏規則、也不載入 GSAP 邏輯，等於沒有這個功能。
   - 這是上線後的第三層退路（另外兩層是分支、分階段 commit）。

3. **`html.locked` 行內 script 只放在首頁與 About**：透過 BaseLayout 的 head slot（或頁面 prop）注入，不影響案例頁。script 同時判斷 sessionStorage 已播／帶 `#hash`／寬度 < 720px，三者任一成立就不加 `locked`，避免閃一下。

4. **Nav 不參與**：Hero 區塊改為 `slogan`（眉標、標題、headline、內文）、`buttons`、`visual`（插畫框）。原規格的 `nav`、`stats` 不使用。插畫雙層 overlay 圖（`is-active` 切換）整個框視為一個 `block`，內部兩張圖不單獨標記，避免與既有切換邏輯衝突。
   - 參考線的水平線改為：區段頂端、主標題頂端、最下方元件頂端。

5. **About 首屏 = `intro-grid`，`once` 模式**。sessionStorage key 依頁面分開（`ba:home`、`ba:about`）。

6. **Scrub 距離**：`buildDist 600`、`holdDist 200`。理由：動畫約 3 引擎秒，600px 約是滾輪 4～6 下；About 有 4 段，總額外捲動由約 6200px 降到約 3200px。數值放在 `config.ts`，試玩後再調。

7. **About sticky 改 GSAP pin**：移除 `.skills-band` 的 sticky 與 `.ai-band` 的 `100vh`／疊蓋 z-index，兩者變成一般區段，各自 scrub。規格 §7.7 不允許用 `100svh` 撐高，所以 `.ai-band` 的 `min-height: 100vh` 一併移除，版面由內容決定。若 skills 區在桌機高於畫面，改為逐區塊建構（跟手機規則一樣），不整段釘住。

8. **`.reveal` 移除範圍**：只移除 `index.astro`、`about.astro` 上的 `.reveal` class。BaseLayout 的 observer 不動（案例頁仍在使用）。

9. **視覺 token**（新增在 `tokens.css`，overlay 專用）：
   - `--color-build: #2F54EB`；guide 用 22% 透明度，member frame 用 45%
   - `--color-build-on-dark: #7B95FF`（深色區段）
   - `--color-skel: var(--color-block-bg)`（#f0efec）；`--color-skel-depth1: #e3e1db`；深色區段的骨架用 `#2c2c2c` / `#383838`
   - `--font-mono: "JetBrains Mono"`，用 `@fontsource/jetbrains-mono`，只載入 400／500
   - 深色區段透過 `[data-build-theme="dark"]` 切換變數
   - 底色維持 #fff，不採用原型的 #F6F5F2

10. **選擇器衝突檢查**：拆字會產生 `span.ch`。實作前先掃描兩頁的 CSS，把 `h1 span`、`p span` 這類寫法改成專屬 class。目前 `.hero-title .latin` 已符合。

## Risks / Trade-offs

- [招募方嫌捲動被卡住] → 首屏可點擊略過、同一分頁只播一次；scrub 距離已減半；`SCRUB_ENABLED=false` 可單獨關掉 scrub。
- [About 失去疊蓋轉場，版面變平] → 階段 3 時先在 preview 實際檢查，必要時調整區段間距或背景銜接。
- [插畫元件與既有 hover／切換邏輯衝突] → 整框當成一個 block，動畫完成後清掉 clip-path，才啟用原本的互動。
- [字型載入慢造成量測錯誤] → 等 `document.fonts.ready`，超過 3 秒直接顯示完成狀態。
- [Mac 觸控板慣性在解鎖瞬間往下衝] → 規格 §7.5：實測後若明顯，解鎖後 300ms 忽略 wheel。
- [新增約 70KB 的 GSAP] → 只在首頁與 About 載入；案例頁不受影響。

## Migration Plan

1. 開分支 `feat/build-animation`，main 不動。
2. 階段 1：引擎＋tokens＋首頁 Hero（once）→ commit → Cloudflare preview 實機驗證。
3. 階段 2：首頁精選專案、個人專案（scrub）→ commit → 驗證捲動阻力。
4. 階段 3：About（intro once＋其餘 scrub，移除 sticky）→ commit → 驗證。
5. 合併時可以只挑部分階段的 commit。

退路：
- 未合併：刪除分支。
- 已合併、想關掉：`config.ts` 設 `ENABLED=false`。
- 已合併、要完全移除：revert 對應階段的 commit。

## Open Questions

- scrub 距離 600／200 是否合適，等 preview 試玩後再調（只改 config 的數值）。
- 個人專案清單的區塊切分：每個項目一個區塊，或整個清單一個區塊。依實際項目數決定，原則上一個區段不超過 6 個區塊。
