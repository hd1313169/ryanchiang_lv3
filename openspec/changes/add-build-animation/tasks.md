# Tasks

## 0. 準備

- [x] 0.1 從 main 開分支 `feat/build-animation`；驗證：`git branch --show-current` 顯示新分支
- [x] 0.2 安裝 `gsap@3.12.x` 與 `@fontsource/jetbrains-mono`；驗證：`npm run build` 成功

## 1. 階段 1：引擎、token、首頁 Hero（once）

- [x] 1.1 在 `tokens.css` 新增 overlay 專用 token（build 色、on-dark 色、骨架色階、mono 字），以及 `[data-build-theme="dark"]` 變數；驗證：案例頁畫面與修改前一致
- [x] 1.2 建立 `src/build-anim/config.ts`，包含規格 §5 的全部參數、`ENABLED`／`SCRUB_ENABLED`、scrub 600／200、`MOBILE_*`；驗證：其他模組沒有時間或尺寸的魔術數字
- [x] 1.3 實作 `rng.ts`、`split.ts`、`measure.ts`（拆字快取、文字行合併、元件量測）；驗證：在 Hero 呼叫後，`.ch` 數量與非空白字數相符
- [x] 1.4 實作 `overlay.ts` 與 `build-anim.css`（`html.js [data-build]` 初始隱藏，以及各 `.ba-*` 樣式）；驗證：在 `?debug` 暫停時可看到框線、控制點、標籤
- [x] 1.5 實作 `timeline.ts`（六個階段、once 模式）與 `index.ts` 的 `buildSection`、`skip`、`replay`、`destroy`；驗證：完成後 overlay 沒有子節點，元件 `clip-path` 為 `none`
- [ ] 1.6 實作 `scroll-lock.ts`（鎖定、iOS fixed、按鍵攔截、點擊略過、捲動加速、resize 直接完成），以及提示 UI；驗證：桌機 Chrome 與 iOS Safari 播放中無法捲動，點擊後立即解鎖
- [x] 1.7 在首頁與 About 注入 head 行內 script（`js`／`locked` class、sessionStorage、`#hash`、< 720px 判斷），案例頁不注入；驗證：案例頁的 `<html>` 沒有 `locked`
- [x] 1.8 首頁 Hero 加上 `data-build` 標記（slogan／buttons／visual），移除 `.reveal`，掃描並修正 `h1 span` 之類的選擇器；驗證：Hero 完整播放約 4.3 秒，品牌字「Ryan」的樣式正確
- [x] 1.9 確認插畫切換在建構完成後仍可正常運作；驗證：完成後 hover 或切換行為與修改前一致
- [x] 1.10 驗證邊界情況：重新整理不重播、帶 `#hash` 不播放、停用 JS 時內容完整、手機沒有游標也不鎖定、`ENABLED=false` 時畫面與修改前一致
- [ ] 1.11 Commit「Phase 1」，推送後在 Cloudflare preview 實機檢查

## 2. 階段 2：首頁 scrub 區段

- [x] 2.1 實作 scrub 模式（ScrollTrigger pin、onUpdate 推進、進度換算與平滑、onRefresh 重建並保留進度）；驗證：往回捲會倒播，resize 後框線位置正確
- [x] 2.2 實作手機版逐區塊 timeline（`gsap.matchMedia`、`data-layer`），以及錨點跳轉時經過的區段直接完成；驗證：寬度 < 720px 時不釘住，每張卡片各自建構
- [x] 2.3 精選專案、個人專案加上標記並移除 `.reveal`，決定個人專案的區塊切分（每個區段不超過 6 個區塊）；驗證：捲約 600px 後完成，再捲約 200px 才放行
- [ ] 2.4 4× CPU 降速錄製 Performance；驗證：量測以外沒有 Layout，也沒有超過 16ms 的幀
- [ ] 2.5 Commit「Phase 2」，在 preview 評估捲動阻力，必要時調整 config 的距離

## 3. 階段 3：About

- [x] 3.1 intro-grid 以 once 模式加上標記（sessionStorage key 與首頁分開）；驗證：同一分頁中首頁和 About 各播一次
- [x] 3.2 移除 skills／AI 區段的 CSS sticky、`100vh` 與疊蓋 z-index，必要時調整排版；驗證：兩個區段依序正常捲動，沒有重疊
- [x] 3.3 skills、AI（`data-build-theme="dark"`）、工作經歷、社群區段加上 scrub 標記，移除 `.reveal` 與錯開入場；驗證：深色區段的框線清楚可見，桌機上比畫面高的區段改為逐區塊建構
- [x] 3.4 確認流程圖 lightbox 在建構完成後仍可開啟和關閉；驗證：點擊、Esc、背景點擊都正常
- [ ] 3.5 依規格 §10.2 驗收清單完整跑一輪（桌機、手機、iOS Safari）
- [ ] 3.6 Commit「Phase 3」，在 preview 檢查

## 4. 收尾

- [ ] 4.0 上線前把 `config.ts` 的 `REPLAY_EVERY_LOAD` 改回 false；驗證：重新整理後首屏不重播

- [ ] 4.1 確認案例頁、Nav、Footer 沒有任何視覺或行為差異；驗證：比對修改前後的 preview 截圖
- [ ] 4.2 由業主決定要合併的階段，合併至 main（可以只合併部分階段）

## Workflow follow-up

- 合併後執行 `/opsx:archive add-build-animation`，把 delta spec 同步到主 spec
