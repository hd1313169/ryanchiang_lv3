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

4. **Nav 不參與**（已由決策 17 取代）：Hero 區塊改為 `slogan`（眉標、標題、headline、內文）、`buttons`、`visual`（插畫框）。原規格的 `nav`、`stats` 不使用。插畫雙層 overlay 圖（`is-active` 切換）整個框視為一個 `block`，內部兩張圖不單獨標記，避免與既有切換邏輯衝突。
   - 參考線的水平線改為：區段頂端、主標題頂端、最下方元件頂端。

5. **About 首屏 = `intro-grid`，`once` 模式**。sessionStorage key 依頁面分開（`ba:home`、`ba:about`）。

6. **Scrub 距離**（已由決策 21 取消）：`buildDist 600`、`holdDist 200`。理由：動畫約 3 引擎秒，600px 約是滾輪 4～6 下；About 有 4 段，總額外捲動由約 6200px 降到約 3200px。數值放在 `config.ts`，試玩後再調。

7. **About sticky 改 GSAP pin**（細節見決策 22）：移除 `.skills-band` 的 sticky 與 `.ai-band` 的 `100vh`／疊蓋 z-index，兩者變成一般區段，各自 scrub。規格 §7.7 不允許用 `100svh` 撐高，所以 `.ai-band` 的 `min-height: 100vh` 一併移除，版面由內容決定。比畫面高的區段一律改為逐區塊建構（見決策 11）。

8. **`.reveal` 移除範圍**：只移除 `index.astro`、`about.astro` 上的 `.reveal` class。BaseLayout 的 observer 不動（案例頁仍在使用）。

9. **視覺 token**（新增在 `tokens.css`，overlay 專用）：
   - `--color-build: #2F54EB`；guide 用 22% 透明度，member frame 用 45%
   - `--color-build-on-dark: #7B95FF`（深色區段）
   - `--color-skel: var(--color-block-bg)`（#f0efec）；`--color-skel-depth1: #e3e1db`；深色區段的骨架用 `#2c2c2c` / `#383838`
   - `--font-mono: "JetBrains Mono"`，用 `@fontsource/jetbrains-mono`，只載入 400／500
   - 深色區段透過 `[data-build-theme="dark"]` 切換變數
   - 底色維持 #fff，不採用原型的 #F6F5F2

10. **選擇器衝突檢查**：拆字會產生 `span.ch`。實作前先掃描兩頁的 CSS，把 `h1 span`、`p span` 這類寫法改成專屬 class。目前 `.hero-title .latin` 已符合。

11. **高區段不釘住**（實作階段 2 時確認）：首頁「精選專案」（約 2070px）與「個人專案」（約 2390px）在 1440×900 下都超過畫面兩倍高，整區釘住會讓下方卡片在畫面外建構。規則：區段高度 ≤ 畫面高 × `SCRUB.pinMaxHeight`（0.9）才整區釘住；否則每個區塊（每張卡片）各自隨捲動建構，桌機保留游標，參考線只畫在區塊範圍內（同一列的卡片共用欄線）。觸發範圍：區塊頂端進入畫面底部開始，區塊最後一個元件的底部到畫面 92% 時完成。實際效果是首頁沒有被釘住的段落，捲動阻力比原本預估的小。

12. **PLAY_EVERY_LOAD**（業主最終決定）：首屏與導覽列每次載入都播放，取代規格的「同一分頁只播一次」。sessionStorage 的邏輯保留，改為 false 即可回到規格行為。

13. **游標放慢、線條加粗**（試看回饋）：游標飛行 0.5→0.8、拖曳 0.5→0.75 引擎秒，後續階段順延 0.55；Hero 實際長度約 5 秒。框線 1.5px、參考線透明度 0.22→0.38、控制點 8px。

14. **逐區塊改為「觸發後以時間播完」**（第二輪回饋）：隨捲動拖動時，頁面載入後露在畫面底部的卡片會停在只有格線的狀態，看起來像錯誤；快速捲動也看不清。改成區塊頂端到畫面 85% 時觸發、以 `SPEED.base` 播完，往回捲離開時以 `SPEED.fast` 倒轉收回。整區釘住的模式仍為 scrub。

15. **開場空白**：實測主要是 Noto Sans TC 的數十個子集字型檔（本機約 1 秒），插畫只需 0.07 秒。量測必須等字型，所以改為等待期間先淡入垂直參考線；游標進場也從 0.2 提前到 0.05 引擎秒。

16. **標籤用 `button` 類型**：每個標籤 pill 是一個元件，以骨架＋擦出呈現，不用打字。

17. **Nav／Footer 獨立建構**（第三輪回饋）：`Nav`、`Footer` 接 `build` prop，由 BaseLayout 依頁面決定。Nav 是 `once` 區段、`data-build-lock="false"`（不鎖捲動，鎖定只由 Hero 持有，各區段只解除自己加的鎖）、`data-build-fixed`（保留 `position: fixed`）。手機版收合中的選單量不到尺寸，略過動畫，完成時一併顯示。Footer 是不釘住的捲動區段（`data-build-pin="false"`）、深色主題，取代原本的 `.reveal`。

18. **第一次捲動才啟用捲動區段**：載入時「精選專案」標題常常已在畫面底部，會立刻開始播。改為第一次嘗試捲動（scroll／wheel／touchmove／捲動鍵）後才啟用；Hero 鎖定期間的嘗試也算，等解鎖後啟用，並立即播放已露出的區塊。先前標題偶爾不出現有兩個原因：鎖定中的滾輪沒有產生捲動事件；以及 ScrollTrigger 建立時會立即重建 timeline，剛 `play()` 的 timeline 這時 `isActive()` 仍是 false，重建後就停在 0。改為自行記錄每個區塊的播放方向。往回捲時另用一個觸發點（區塊頂端離開畫面底部）收回。

19. **未建構的元件不接受滑鼠**：完成時加 `data-built`；CSS 對沒有 `data-built` 的元件（以及包著它們的連結）設 `pointer-events: none`，避免空白處出現 hover 螢光筆線。

20. **打字加快**：0.2 + 字數 × 0.008，上限 0.5 引擎秒（規格 0.35 / 0.018 / 1.0）；格線與拉框時間不變。

21. **取消「整區釘住 + 隨捲動拖動」**（階段 3）：About 的「我擅長的事」（657px）與社群區（566px）放得進畫面，原本會走釘住模式，但靠近時整區是只有淡格線的空白，與首頁第二輪回饋的問題相同。所有捲動區段統一為「逐區塊觸發、以時間播完」，`SCRUB.buildDist`／`holdDist`／`pinMaxHeight` 移除。

22. **About 疊蓋轉場改用 GSAP**：使用者要求「拿掉 sticky，改用 GSAP」。以 `ScrollTrigger` 釘住 `.skills-band`（`pinSpacing: false`，從自身頂端到 `.ai-band` 頂端），深色 AI 區塊往上蓋過；桌機（≥ 40em）且區段不高於畫面時才啟用。程式放在 `about.astro`，不進引擎。

23. **延遲載入的圖片**：About 社群卡片的圖片在 window load 之後才載入，量測時高度為 0，原本會被略過並永遠隱藏。改為：量不到尺寸的元件直接顯示；區段內每張圖片載入後觸發 `ScrollTrigger.refresh()`，重新量測並重建。

24. **Footer 改為 `enter` 模式**：整區（不分區塊）在捲到時以時間播一次，播完清空 overlay 並標記完成，之後不再收回或重播，與首屏相同。其他捲動區段仍是逐區塊、可收回。

25. **打字與擦出再加快**：打字 0.12 + 字數 × 0.005，上限 0.3；圖片／按鈕擦出 0.5 → 0.3 引擎秒。

26. **點擊略過涵蓋所有首屏區段**：點擊監聽改掛在 window，Hero 與導覽列一起完成。

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
