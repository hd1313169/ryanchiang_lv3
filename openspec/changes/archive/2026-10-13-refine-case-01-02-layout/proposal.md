# Proposal

## Why

案例 01、02 的部分圖文排版不利閱讀：並排的文字欄太窄、截圖被縮小，02 的報告頁截圖把說明文字燒在圖內，手機上看不清楚。同時兩個案例缺少「專案背景」前的主視覺，也缺少 01 設計成果的實際畫面。

## What Changes

**work/01**
- 在 `## 專案背景` 標題上方新增主視覺圖 1-j。
- 「利用未完成效應，以 blur 漸層引導付費解鎖」改為上文下圖（取消左右並排）。
- 「設計成果」段落下方新增 1-r-1、1-r-2、1-r-3 三張手機截圖並排。

**work/02**
- 在 `## 專案背景` 標題上方新增主視覺圖 2-j。
- 2-c 拆成 2-c-1、2-c-2 兩張直式滿寬排列，原本圖內的說明文字改成圖片下方的圖說：「預設全局概覽，顯示區域範圍內指標總和」、「點擊圖標，查詢個別店家的詳細數據」。
- 熱力圖 Toggle 段落（2-d-1／2-d-2 切換動畫）改為上文下圖，保留切換動畫。

**共用版面**
- 新增三圖並排版型，手機上維持三欄。

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `case-study-catalog`：新增三圖並排版型，以及上文下圖區塊保留切換動畫的要求。

## Impact

- `src/content/case-studies/01.md`、`02.md`
- `src/pages/work/[slug].astro`（新增 `.image-trio`，補 stacked toggle-pair 樣式）
- `public/images/case-01/`、`public/images/case-02/`：新增圖檔，移除不再使用的 `2-c.jpg`
