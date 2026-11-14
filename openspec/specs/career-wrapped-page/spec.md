# career-wrapped-page Specification

## Purpose

提供一個可單獨以網址分享的 2026 職涯回顧頁面，在手機與桌機上都以手機形狀的故事舞台呈現，且不依賴、不連回作品網站。

## Requirements

### Requirement: Content fidelity
頁面 SHALL 呈現與原 `career_wrapped.html` 相同的卡片內容、順序、配色、字型與互動（點擊／滑動／方向鍵翻頁、進度條、重播）。

#### Scenario: Story plays as before
- **WHEN** 訪客開啟頁面並逐張翻頁
- **THEN** 每張卡片的文字、視覺與動畫與原檔案一致，最後可重播

### Requirement: Responsive stage
在寬度不超過 430px 的視窗，舞台 SHALL 填滿整個可視區（無圓角、高度貼合動態視窗高度、尊重安全區域）。在更寬的視窗，舞台 SHALL 以最大寬度 430px、最大高度 880px 置中，舞台外區域 SHALL 為黑色背景。

#### Scenario: Phone viewport
- **WHEN** 以 390×844 的手機視窗開啟
- **THEN** 舞台滿版、無圓角、無水平捲動，iOS 網址列伸縮時版面不跳動

#### Scenario: Desktop viewport
- **WHEN** 以 1440×900 的視窗開啟
- **THEN** 舞台寬 430px 置中，左右與上下空白區域為黑色

### Requirement: Standalone page
頁面 SHALL NOT 包含作品網站的導覽、頁尾、返回頂部按鈕，或任何連回作品網站的連結與署名。

#### Scenario: No outbound site links
- **WHEN** 檢查頁面所有連結與可點擊元素
- **THEN** 沒有任何指向作品網站其他頁面的連結

### Requirement: Shareable metadata
頁面 SHALL 擁有自己的 `<title>`、meta description、canonical（`https://ryan-chiang.com/career-wrapped.html`）、Open Graph（title、description、image、url、type）與 Twitter card（`summary_large_image`），OG 圖片 SHALL 為此頁專屬、1200×630、依頁面配色設計。頁面 SHALL 可被搜尋引擎收錄。

#### Scenario: Link preview
- **WHEN** 將頁面網址貼到支援 Open Graph 的社群平台
- **THEN** 預覽顯示此頁專屬的標題、描述與封面圖，而非作品網站的預設內容
