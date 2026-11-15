# Spec Delta

## Purpose

「從零建構」入場動畫：在首頁與 About 頁演出設計師在設計工具中從零建構介面的過程，用來呈現網站定位中的「設計思考過程」。

## ADDED Requirements

### Requirement: Pages covered by the build animation
建構動畫 SHALL 只套用在首頁與 About 頁，包含這兩頁的導覽列與 Footer。案例頁（含其導覽列與 Footer）SHALL NOT 參與建構動畫。

#### Scenario: Visiting a case study page
- **WHEN** 訪客開啟任一案例頁
- **THEN** 頁面不出現參考線、游標、框線或打字效果，維持既有的入場行為

#### Scenario: Navigation builds independently
- **WHEN** 訪客開啟首頁
- **THEN** 導覽列作為獨立區段，與 Hero 同時開始建構，但不會鎖定或解除捲動

#### Scenario: Footer builds when reached
- **WHEN** 訪客捲到首頁底部的 Footer
- **THEN** Footer 的標題與聯絡按鈕以深色版的輔助線建構出現

### Requirement: Build sequence
每個參與的區段 SHALL 依序呈現六個階段：參考線出現、游標飛入並拉出區塊大框、元件框展開、灰色骨架填入、內容出現（文字逐字打出並附插入點，圖片與按鈕由左往右擦出）、輔助線收起。同一區段的所有區塊 SHALL 同步推進，只允許微小錯開。

#### Scenario: Tags build as components
- **WHEN** 案例卡片的標籤到達內容階段
- **THEN** 每個標籤以整個元件（底色＋文字）由左往右擦出，而不是只打出文字

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
在寬度 ≥ 720px 時，首屏播放期間 SHALL 鎖定頁面捲動（滾輪、觸控、捲動鍵、捲軸皆無效），鎖定與解鎖時版面 SHALL NOT 左右跳動。點擊區段 SHALL 立即完成並解鎖；嘗試捲動 SHALL 讓播放加速。鎖定中 SHALL 顯示提示；完成後 SHALL 在區段下方水平置中顯示「往下捲動」提示，箭頭持續上下跳動。等待字型載入期間 SHALL 先顯示垂直參考線，不留空白。

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
首屏以外的參與區段 SHALL NOT 為了建構而釘住。每個區塊 SHALL 在捲進畫面時觸發，並以時間播完整段建構（桌機保留游標，並在區塊範圍內顯示參考線）；觸發前 SHALL NOT 顯示任何輔助線；使用者第一次嘗試捲動之前 SHALL NOT 觸發任何區塊。尚未建構完成的元件 SHALL NOT 回應滑鼠。往回捲到區塊離開畫面下方時 SHALL 收回，再次捲入時重播。

#### Scenario: Scrolling through a scroll-built section
- **WHEN** 訪客在桌機上捲過「精選專案」區段
- **THEN** 區段不停住；每張卡片頂端捲到畫面約 85% 處時開始建構，之後不需繼續捲動也會播完（含格線、游標與框線）

#### Scenario: Scrolling attempt during the opening lock
- **WHEN** 訪客在首屏播放、捲動被鎖定時轉動滾輪
- **THEN** 首屏結束解鎖後，已露出在畫面中的區塊（例如「精選專案」標題）立即開始建構，不需要再捲一次

#### Scenario: Hovering an unbuilt card
- **WHEN** 卡片尚未建構完成，訪客把滑鼠移到卡片所在位置
- **THEN** 不會出現任何 hover 效果（例如標題螢光筆線）

#### Scenario: Page loaded but not yet scrolled
- **WHEN** 首頁載入完成，卡片頂端只露出在畫面底部
- **THEN** 卡片區沒有任何參考線或框線

#### Scenario: Scrolling back up
- **WHEN** 訪客往回捲到某張卡片完全離開畫面下方
- **THEN** 該卡片收回到未建構狀態，再次捲入時重新建構

#### Scenario: Resizing or late-loading images
- **WHEN** 視窗大小改變，或區段內延遲載入的圖片載入完成
- **THEN** 區段重新量測，維持原本的進度，框線位置正確，圖片不會停在隱藏狀態

#### Scenario: Jumping via anchor
- **WHEN** 訪客透過錨點跳轉到頁面中段
- **THEN** 落點畫面中的區塊立即開始建構，頁面不會卡住

### Requirement: Mobile behavior
寬度 < 720px 時 SHALL NOT 建立游標、SHALL NOT 鎖定捲動、SHALL NOT 釘住區段。首屏 SHALL 仍播放一次。其他區段的每個區塊 SHALL 在捲進畫面時各自播放建構，往回捲離開畫面時收回。

#### Scenario: Opening the home page on a phone
- **WHEN** 訪客以手機開啟首頁
- **THEN** Hero 建構播放，但沒有游標，訪客隨時可以捲動

#### Scenario: Scrolling a section on a phone
- **WHEN** 訪客在手機上捲到某張作品卡片
- **THEN** 該卡片從骨架建構到完成，區段不停住

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
