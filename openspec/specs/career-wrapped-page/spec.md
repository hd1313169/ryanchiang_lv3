# career-wrapped-page Specification

## Purpose

提供一個可單獨以網址分享的 2026 職涯回顧頁面，在手機與桌機上都以手機形狀的故事舞台呈現，且不依賴、不連回作品網站。

## Requirements

### Requirement: Content fidelity
頁面 SHALL 以 `public/career-wrapped.html` 為唯一內容來源，呈現其卡片內容、順序、配色、字型與互動（點擊／滑動／方向鍵翻頁、進度條、重播）；後續內容調整直接在此檔案進行。

#### Scenario: Story plays as before
- **WHEN** 訪客開啟頁面並逐張翻頁
- **THEN** 每張卡片依序完整呈現其文字、視覺與動畫，最後可重播


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

### Requirement: Directional page turn
換頁時 SHALL 以斜向翻頁轉場呈現：前往下一張時，目前卡片沿對角線由右下往左上收走並露出下一張；返回上一張時，方向相反（由左上往右下）。點擊、滑動與方向鍵觸發的換頁 SHALL 使用相同的方向規則。系統啟用「減少動態效果」時 SHALL 直接切換，不播放轉場。

#### Scenario: Go forward
- **WHEN** 訪客點擊畫面右側、向左滑動或按右方向鍵
- **THEN** 目前卡片由右下往左上翻走，下一張卡片出現

#### Scenario: Go back
- **WHEN** 訪客點擊畫面左側、向右滑動或按左方向鍵
- **THEN** 轉場方向相反，上一張卡片由左上往右下翻回

#### Scenario: Reduced motion
- **WHEN** 訪客的系統啟用減少動態效果
- **THEN** 卡片直接切換，沒有翻頁轉場

### Requirement: Typewriter closing tagline
最後一張卡片的結尾標語「The Second Best Time Is NOW.」SHALL 以打字機效果逐字出場，打字期間顯示閃爍游標，打字結束時游標 SHALL 立即移除；打字期間 NOW SHALL 以一般文字呈現（無背景色），打字結束後 SHALL 以由左至右的選取反白效果加上標籤底色；句點 SHALL 位於 NOW 標籤之外。每次進入該卡片 SHALL 重新播放；系統啟用「減少動態效果」時 SHALL 直接顯示完整標語、不顯示游標。

#### Scenario: Reach last card
- **WHEN** 訪客翻到最後一張卡片
- **THEN** 任務卡出現後，標語逐字打出並顯示閃爍游標；打完後游標消失，NOW 隨即由左至右反白為藍底白字，結尾為「NOW」標籤加上外側句點

#### Scenario: Revisit last card
- **WHEN** 訪客返回上一張後再次進入最後一張
- **THEN** 標語重新以打字機效果出場
