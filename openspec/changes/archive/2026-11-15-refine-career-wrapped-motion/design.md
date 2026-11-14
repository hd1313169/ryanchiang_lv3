# Design

## Context

`public/career-wrapped.html` 為自成一體的靜態頁：卡片以 `.card` 絕對定位疊放，`show(n)` 切換 `.on/.play` class，換頁為 opacity 淡入淡出；進場以 `.r` 的 `rise` 動畫與各元素的 `--d` 延遲錯開，數字以 JS timer 計數。

## Goals / Non-Goals

**Goals:** 統一放慢節奏；方向性翻頁；第 5／6／8 頁的文字與動態微調。

**Non-Goals:** 真實 3D 紙張捲曲；變更卡片數量、順序或配色。

## Decisions

- **速度倍率 `--speed: 1.2`**：在 `:root` 定義，所有 CSS 動畫時間與延遲改寫為 `calc(<原值> * var(--speed))`；JS 端的計數與打字機時間讀同一個值（`getComputedStyle`）。之後只改一個數字即可微調。替代方案「逐一手改數值」容易漏改且難回調，不採用。
- **翻頁採 clip-path 斜向揭開（非 3D 翻角）**：離開的卡片放在上層，以 `clip-path: polygon()` 從完整矩形收成左上角一點（下一頁）或右下角一點（上一頁），下層新卡片同時開始進場動畫；邊緣以 `drop-shadow` 製造紙張邊感。3D page curl 需處理背面、陰影與進行中動畫的同步，手機與 Safari 風險高，與平面拼貼風格也不符，因此不採用。
- **方向判斷**：`show(n)` 接收方向（n > i 為前進），在 stage 上設 `data-dir="next|prev"`，CSS 依此選用對應 keyframes。重播（回到第一張）視為前進。
- **轉場期間的互動**：轉場進行中忽略新的換頁輸入，避免多張卡片同時處於離場狀態。
- **打字機**：以 JS 逐字寫入標語文字節點；`NOW` 打字期間為一般墨色文字，打字結束後加上 `sweep` class，底色以 background-size 由左至右展開、文字轉白，模擬選取反白；句點接在標籤外。游標為獨立 span，打字中閃爍，完成後 1.5s 淡出。離開卡片時清除 timer、重設文字。
- **第 5 頁**：角色標籤字級 15px → 18px，內距與箭頭等比放大；「下一步」兩個 span 間加 4px 間距。需確認矮螢幕（`max-height:700px`）下不溢出。

## Risks / Trade-offs

- [clip-path 動畫在舊瀏覽器不支援] → 退回直接切換，內容不受影響。
- [放慢後第 5、8 頁最後元素出現較晚] → 1.2 倍幅度小；以實機確認等待感可接受。
- [打字機需在換頁時正確中止] → 統一由既有 `timers` 陣列管理並在 `show()` 時清除。
