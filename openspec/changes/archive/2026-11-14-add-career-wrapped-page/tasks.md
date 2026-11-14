# Tasks

## 1. 職涯回顧頁面

- [x] 1.1 將根目錄 `career_wrapped.html` 移至 `public/career-wrapped.html`（根目錄不留副本）；驗證：`ls` 根目錄無原檔，dev server 開 `/career-wrapped.html` 可正常播放
- [x] 1.2 清理 artifact 外殼：移除 `claude:` meta 與外層包裝 style，把 `<title>`、fonts 移回 `<head>`，加 `lang="zh-Hant"`；驗證：HTML 結構合法、內容與互動與原檔一致
- [x] 1.3 響應式：≤430px 舞台滿版（100dvh、無圓角、safe-area）；更寬時黑色背景、舞台 430×≤880 置中；驗證：390×844 與 1440×900 截圖，無水平捲動
- [x] 1.4 確認頁面無任何連回作品網站的連結或署名；驗證：搜尋 `href` 與網站名稱無結果

## 2. SEO 與分享

- [x] 2.1 依頁面配色製作 1200×630 `public/og-career-wrapped.png`；驗證：檢視圖片尺寸與視覺
- [x] 2.2 加入 title、description、canonical、og:*、twitter:card（絕對 URL）與 favicon；驗證：檢視 `<head>` 欄位齊全，build 後 `dist/career-wrapped.html` 含上述 meta

## 3. 全站 FAB

- [x] 3.1 新增 `src/components/CareerWrappedFab.astro`：✦ 圖示＋「2026 回顧」、網站主色、`target="_blank" rel="noopener"`、aria-label、觸控區 ≥44px；驗證：點擊開新分頁到 `/career-wrapped.html`
- [x] 3.2 於 `BaseLayout.astro` 掛載，定位疊在返回頂部按鈕上方且位置固定；驗證：首頁、About、案例頁皆可見，捲動出現返回頂部時兩者不重疊、FAB 不跳動
- [x] 3.3 手機與桌機實測各頁 FAB 不遮擋主要互動元素；驗證：390px 與 1440px 截圖

## 4. 整體驗證

- [x] 4.1 `npm run build` 成功，且 `dist/` 中包含 `career-wrapped.html` 與 OG 圖
