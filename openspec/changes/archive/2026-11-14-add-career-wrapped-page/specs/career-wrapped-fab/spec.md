# Spec Delta

## Purpose

在作品網站每一頁提供醒目的浮動入口，讓訪客前往獨立的職涯年度回顧頁面，且不打斷目前的瀏覽。

## ADDED Requirements

### Requirement: Site-wide FAB
作品網站的每一頁 SHALL 在右下角固定顯示一個浮動按鈕，內容為 ✦ 星芒圖示，圖示下方有文字「年度回顧」。按鈕 SHALL 沒有背景色；星芒 SHALL 以回顧頁配色的漸層填色，文字使用網站主文字色。按鈕 SHALL 始終可見（不依捲動位置隱藏）。

#### Scenario: FAB on every page
- **WHEN** 訪客開啟首頁、About 或任一案例頁
- **THEN** 右下角可見 ✦「年度回顧」按鈕

### Requirement: Entrance animation
每次頁面載入時，星芒 SHALL 旋轉一圈並淡入出現，接著文字 SHALL 淡入出現；之後按鈕靜止，不重複播放動畫。系統啟用「減少動態效果」時 SHALL 直接顯示，不播放動畫。

#### Scenario: Page load
- **WHEN** 訪客載入任一頁面
- **THEN** 星芒先旋轉一圈出現，隨後「年度回顧」文字出現，之後不再有動態

#### Scenario: Reduced motion
- **WHEN** 訪客的系統啟用減少動態效果
- **THEN** 星芒與文字直接顯示，沒有旋轉或淡入

### Requirement: Legible over dark surfaces
當「年度回顧」文字位於深色背景區塊（例如頁尾或深色內容區）上方時，文字 SHALL 變為白色；回到淺色背景時 SHALL 恢復主文字色。

#### Scenario: Scroll over footer
- **WHEN** 訪客捲動到頁尾，文字位於深色頁尾上方
- **THEN** 「年度回顧」顯示為白色

### Requirement: Opens in new tab
點擊 FAB SHALL 在新分頁開啟職涯回顧頁面，原分頁保持不變；連結 SHALL 帶 `rel="noopener"`，並有可讀的無障礙名稱。

#### Scenario: Click FAB
- **WHEN** 訪客點擊 FAB
- **THEN** 新分頁開啟 `/career-wrapped.html`，原作品網站分頁仍在原位置

### Requirement: Stacks above back-to-top
FAB SHALL 位於「返回頂部」按鈕正上方，兩者水平置中對齊並保留明顯間距、互不重疊；FAB 的位置 SHALL 不因返回頂部按鈕出現或消失而跳動。

#### Scenario: Both buttons visible
- **WHEN** 訪客捲動到返回頂部按鈕出現
- **THEN** FAB 在返回頂部按鈕上方，兩者中心線對齊且互不遮擋

#### Scenario: Mobile
- **WHEN** 以 390px 寬手機瀏覽
- **THEN** FAB 觸控區域至少 44×44px
