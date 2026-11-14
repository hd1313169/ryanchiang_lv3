# Design

## Context

`career_wrapped.html` 是從 Claude artifact 匯出的獨立 HTML（約 21KB，inline CSS/JS，只依賴 Google Fonts），已有 `.stage{max-width:430px;height:min(100%,880px);border-radius:22px}` 的手機舞台；開頭帶有 artifact 外殼（白底 body、`claude:viewport-fit-sides` meta），`<title>` 與字型連結寫在 `<body>` 內。網站為 Astro，`BaseLayout.astro` 已掛載 `BackToTop`（右下固定、捲動後出現）。

## Goals / Non-Goals

**Goals:** 以最小改動讓原檔案成為可分享的靜態頁；全站加入入口 FAB。

**Non-Goals:** 改寫回顧內容或動畫；把頁面納入 Astro 元件／內容集合；分析追蹤。

## Decisions

- **放 `public/` 原樣輸出，而非 `src/pages/*.astro`。** Astro 會處理 inline script/style（scoping、bundling），容易讓既有互動走樣；`public/` 直接複製到輸出，保證與原檔一致，也天然不會帶入 BaseLayout。代價是 SEO meta 需手寫（本來就要獨立設定）。
- **搬移而非複製。** 之後只在 `public/career-wrapped.html` 調整，避免兩份分歧；git 中原檔為未追蹤，無歷史可保留。
- **檔名用連字號** `career-wrapped.html`，與網站 URL 慣例一致。
- **版面用 media query 切換**：`@media (max-width:430px)` 下 stage `width:100%;height:100dvh;border-radius:0`；其上 body `background:#000`、以 grid 置中。保留 safe-area padding。
- **OG 圖片**：以頁面配色（cobalt / butter / ink 等 token）製作 1200×630 PNG，存為 `public/og-career-wrapped.png`，使用絕對 URL。
- **FAB 為獨立元件** `CareerWrappedFab.astro`，在 BaseLayout 於 `BackToTop` 旁掛載。定位用 `bottom: calc(var(--space-3) + 3rem + var(--space-2))` 固定在返回頂部按鈕的位置之上（不論後者是否顯示），避免位置跳動。顏色取網站主色 token。

## Risks / Trade-offs

- [`public/` 檔案不經 Astro，字型／token 與網站不共用] → 頁面本來就自成一體，可接受。
- [手寫 canonical 與網域綁定] → 使用 `astro.config.mjs` 的 `site` 同一網域；網域變更時需一併更新。
- [FAB 常駐可能遮擋手機內容] → 尺寸精簡、加底部安全距離，於手機實測各頁。

## Migration Plan

純新增；回滾時刪除 FAB 掛載與 `public/career-wrapped.html` 即可。
