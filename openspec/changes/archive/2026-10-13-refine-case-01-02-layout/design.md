# Design

## Context

案例圖片原檔放在 `content/img/case/`，頁面讀取的是 `public/images/case-0X/`。現有版型 class 定義於 `src/pages/work/[slug].astro`：`image-single`、`image-pair`（含 `figcaption`）、`split-media`、`split-media--stacked`、`toggle-pair`。`toggle-pair` 的切換動畫 CSS 全部寫在 `.split-media .toggle-pair` 選擇器下。

## Goals / Non-Goals

**Goals:**
- 用既有版型完成大部分調整，只新增必要的 CSS。

**Non-Goals:**
- 不調整其他案例或文案內容。

## Decisions

- **主視覺放在 `## 專案背景` 標題之前**，以 `<div class="image-single">` 包裝，與其他單圖一致。
- **01 的 1-b 區塊：直接拿掉 `split-media`**，改為一般段落加上 `image-single`，與下方 1-c 寫法一致。替代方案 `split-media--stacked` 會讓圖片只佔欄寬的一部分，對整頁文章截圖沒有好處。
- **02 的 2-d 區塊：改用 `split-media split-media--stacked` 並把段落移到前面**，不能直接拿掉外框，否則 `.split-media .toggle-pair` 的動畫選擇器會失效。stacked 版型使用 `align-items: center`，`toggle-pair` 的寬度會依內容收縮，所以要補 `.split-media--stacked .toggle-pair { width: 100%; flex: none; }`。
- **2-c 兩張圖用 `<figure>` + `<figcaption>`**，沿用 03 既有寫法；若 `figcaption` 在 `image-single` 下沒有樣式，就比照 `.image-pair figcaption` 補上。
- **新增 `.image-trio`**：`grid-template-columns: repeat(3, 1fr)`，間距比照 `.image-pair`，`40em` 以下縮小間距並維持三欄。
- **圖片壓縮**：1-j、2-j 縮到約 1600px 寬的 JPEG；2-c-1、2-c-2 縮到約 1600px 寬，保留 PNG 透明背景以保留陰影；1-r 尺寸已小（321×643），直接複製。

## Risks / Trade-offs

- [1-r 在手機上每張約 100px 寬，細節難辨識] → 使用者已接受，只呈現輪廓。
- [透明 PNG 檔案偏大] → 縮圖後確認單檔大小合理，必要時再量化。
