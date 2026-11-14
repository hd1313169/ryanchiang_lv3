# Proposal

## Why

`career_wrapped.html`（2026 職涯回顧，故事卡片形式）目前只是根目錄下一個未追蹤的檔案，無法以網址分享，作品網站也沒有入口。需要讓它成為一個可獨立分享的頁面，並從作品網站導流過去。

## What Changes

- 將 `career_wrapped.html` 搬移為 `public/career-wrapped.html`，以此份為唯一來源（根目錄不保留副本），內容與現有檔案成果一致。
- 清理 artifact 匯出殘留（外層包裝 style、`claude:` meta），把 `<title>`、字型載入移回 `<head>`。
- 版面：手機寬度滿版自適應；手機以上的裝置舞台維持最大寬度（430px / 880px 高）置中，其餘區域為黑色遮罩背景。
- 加入獨立的 SEO / 分享設定：title、description、canonical、Open Graph、Twitter card，以及依頁面配色製作的專屬 OG 封面圖。
- 頁面完全獨立：不含任何連回作品網站的連結、導覽或署名。
- 作品網站全站新增 FAB（✦ 星芒圖示＋「2026 回顧」文字），開新分頁前往此頁，位置疊在既有「返回頂部」按鈕上方。

## Capabilities

### New Capabilities
- `career-wrapped-page`: 可獨立分享的職涯回顧頁面——版面行為、獨立性與 SEO / 分享中繼資料。
- `career-wrapped-fab`: 作品網站全站的浮動入口按鈕，連到職涯回顧頁面。

### Modified Capabilities
（無。職涯回顧頁面不屬於作品網站頁面集合，`site-navigation` 的「每頁皆有導覽」不適用於它。）

## Impact

- 新增：`public/career-wrapped.html`、`public/og-career-wrapped.png`、`src/components/CareerWrappedFab.astro`
- 修改：`src/layouts/BaseLayout.astro`（掛載 FAB）、`src/components/BackToTop.astro`（若需調整堆疊間距）
- 移除：根目錄 `career_wrapped.html`
- 無新相依套件；外部資源僅沿用 Google Fonts。
