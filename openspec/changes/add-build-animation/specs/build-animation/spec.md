# Spec Delta

## Purpose

「從零建構」入場動畫：在首頁與 About 頁演出設計師在設計工具中從零建構介面的過程，用來呈現網站定位中的「設計思考過程」。

## ADDED Requirements

### Requirement: Pages covered by the build animation
建構動畫 SHALL 只套用在首頁與 About 頁。導覽列、Footer、案例頁 SHALL NOT 參與建構動畫。

#### Scenario: Visiting a case study page
- **WHEN** 訪客開啟任一案例頁
- **THEN** 頁面不出現參考線、游標、框線或打字效果，維持既有的入場行為

#### Scenario: Navigation during the hero build
- **WHEN** 首頁 Hero 正在建構
- **THEN** 導覽列從一開始就完整可見，且不會被框選

### Requirement: Build sequence
每個參與的區段 SHALL 依序呈現六個階段：參考線出現、游標飛入並拉出區塊大框、元件框展開、灰色骨架填入、內容出現（文字逐字打出並附插入點，圖片與按鈕由左往右擦出）、輔助線收起。同一區段的所有區塊 SHALL 同步推進，只允許微小錯開。

#### Scenario: Text appears by typing
- **WHEN** 一個文字元件到達內容階段
- **THEN** 文字逐字出現，旁邊有插入點游標，局部樣式（例如品牌英文字）在打字過程中與完成後都正確

#### Scenario: Image or button appears by wipe
- **WHEN** 一個圖片、卡片或按鈕元件到達內容階段
- **THEN** 它由左往右擦出，比例與圓角不變形

### Requirement: One cursor per group
每個區塊 SHALL 只有一個游標，負責拉出區塊大框。游標 SHALL NOT 帶名稱標籤，也 SHALL NOT 依區塊使用不同顏色。

#### Scenario: Multiple groups in a section
- **WHEN** 一個有三個區塊的區段開始建構
- **THEN** 畫面上同時出現三個外觀相同、無標籤的游標，每個區塊各一個

### Requirement: Group frame annotations
每個區塊大框 SHALL 顯示四個角的控制點、框下方置中的「寬 × 高」尺寸標籤，以及框左上方的區塊名稱標籤，展開過程中框線粗細 SHALL 保持不變。

#### Scenario: Frame expands
- **WHEN** 游標從大框左上角拖到右下角
- **THEN** 框由左上往右下展開，框線不變粗，放開後出現其餘控制點、尺寸與名稱標籤

### Requirement: Build visuals use the build accent
參考線、框線、控制點、尺寸標籤、插入點 SHALL 使用藍色建構色與 mono 字型。在深色背景的區段 SHALL 使用反白版本，保持可辨識。

#### Scenario: Build in a dark section
- **WHEN** About 的深色 AI 工作流程區段建構
- **THEN** 框線、骨架與標籤在深色背景上清楚可見

### Requirement: Opening sections play once per page per session
首頁 Hero 與 About 首屏 SHALL 以時間驅動播放（約 4.3 秒），同一個分頁工作階段中每頁各播一次。之後再進入同一頁 SHALL 直接顯示完成狀態。網址帶 `#hash` 進入時 SHALL NOT 播放。

#### Scenario: First visit to home then about
- **WHEN** 訪客在同一分頁先開首頁、再開 About
- **THEN** 兩頁的首屏各播放一次建構動畫

#### Scenario: Reloading the home page
- **WHEN** 訪客已看過首頁 Hero 後重新整理首頁
- **THEN** Hero 直接以完成狀態出現，不鎖定捲動

#### Scenario: Entering via anchor link
- **WHEN** 訪客以帶 `#hash` 的網址進入首頁或 About
- **THEN** 不播放、不鎖定，直接捲到錨點

#### Scenario: Scrolling back to the top
- **WHEN** 首屏建構完成後訪客捲回頂端
- **THEN** 首屏不倒播也不重播

### Requirement: Opening scroll lock with skip and speed-up
在寬度 ≥ 720px 時，首屏播放期間 SHALL 鎖定頁面捲動（滾輪、觸控、捲動鍵、捲軸皆無效），鎖定與解鎖時版面 SHALL NOT 左右跳動。點擊區段 SHALL 立即完成並解鎖；嘗試捲動 SHALL 讓播放加速。鎖定中 SHALL 顯示提示，完成後提示往下捲動。

#### Scenario: Clicking to skip
- **WHEN** 首屏播放中訪客點擊區段任一處
- **THEN** 建構立即完成，頁面恢復可捲動

#### Scenario: Trying to scroll
- **WHEN** 首屏播放中訪客轉動滾輪或觸控拖曳
- **THEN** 頁面不捲動，播放速度提高，提示改為「加速中…」

#### Scenario: Resizing during playback
- **WHEN** 首屏播放中視窗大小改變
- **THEN** 建構立即完成

### Requirement: Scroll-driven sections
首屏以外的參與區段在寬度 ≥ 720px 且區段高度不超過畫面高度 90% 時，SHALL 於區段頂端貼齊畫面頂端時釘住，捲動進度直接決定建構進度；建構距離 SHALL 約 600px，完成後 SHALL 再保留約 200px 才放行。比畫面高的區段 SHALL NOT 釘住，改為每個區塊捲進畫面時各自隨捲動建構（保留游標）。往回捲 SHALL 倒播。

#### Scenario: Scrolling into a short scrub section
- **WHEN** 訪客往下捲到一個高度放得進畫面的捲動建構區段頂端
- **THEN** 區段停住，繼續捲動約 600px 後建構完成，再捲約 200px 後恢復正常捲動

#### Scenario: Scrolling through a tall scrub section
- **WHEN** 訪客在桌機上捲過比畫面高的「精選專案」區段
- **THEN** 區段不停住，每張卡片從畫面下方 90% 捲到 35% 的過程中各自建構完成

#### Scenario: Scrolling back up
- **WHEN** 訪客在建構中途往回捲
- **THEN** 文字逐字刪除、框線縮回、游標飛出畫面

#### Scenario: Resizing a scrub section
- **WHEN** 視窗大小改變
- **THEN** 區段重新量測，維持原本的進度，框線位置正確

#### Scenario: Jumping via anchor
- **WHEN** 訪客透過錨點跳轉，經過尚未建構的釘住區段
- **THEN** 經過的區段直接視為完成，不會卡住

### Requirement: Mobile behavior
寬度 < 720px 時 SHALL NOT 建立游標、SHALL NOT 鎖定捲動、SHALL NOT 釘住區段。首屏 SHALL 仍播放一次。其他區段的每個區塊 SHALL 在捲進畫面時各自隨捲動建構，往回捲時各自倒播。

#### Scenario: Opening the home page on a phone
- **WHEN** 訪客以手機開啟首頁
- **THEN** Hero 建構播放，但沒有游標，訪客隨時可以捲動

#### Scenario: Scrolling a section on a phone
- **WHEN** 訪客在手機上捲到某張作品卡片
- **THEN** 該卡片隨捲動從骨架建構到完成，區段不停住

### Requirement: Content remains available without the animation
JavaScript 未執行、字型 3 秒內未載入，或建構動畫被總開關停用時，所有內容 SHALL 完整可見且可正常捲動。建構完成後頁面 SHALL NOT 殘留輔助視覺或隱藏樣式。

#### Scenario: JavaScript disabled
- **WHEN** 訪客停用 JavaScript 開啟首頁
- **THEN** 所有內容立即完整可見，頁面可捲動

#### Scenario: Animation turned off by config
- **WHEN** 維護者在設定中關閉建構動畫並重新部署
- **THEN** 首頁與 About 直接顯示完成內容，不鎖定、不釘住

#### Scenario: After the opening build finishes
- **WHEN** 首屏建構完成
- **THEN** 頁面上沒有殘留的參考線、框線、游標，內容沒有殘留的裁切或透明樣式

### Requirement: Smooth playback
建構動畫在中階裝置上 SHALL 維持流暢，不出現明顯掉幀。

#### Scenario: Throttled CPU playback
- **WHEN** 在 4× CPU 降速下播放首頁 Hero
- **THEN** 量測階段以外不出現版面重排，也沒有超過 16ms 的幀
