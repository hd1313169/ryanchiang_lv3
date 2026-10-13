# Tasks

## 1. 圖片資產

- [x] 1.1 將 `content/img/case/1-j.jpg` 縮至約 1600px 寬存為 `public/images/case-01/1-j.jpg`，複製 `1-r-1.png`、`1-r-2.png`、`1-r-3.png` 到 `public/images/case-01/`；確認檔案存在
- [x] 1.2 將 `2-j.jpg` 縮至約 1600px 寬存為 `public/images/case-02/2-j.jpg`，將 `2-c-1.png`、`2-c-2.png` 縮至約 1600px 寬並保留透明背景，存到 `public/images/case-02/`；確認檔案存在且 PNG 仍為 RGBA

## 2. 共用樣式

- [x] 2.1 在 `src/pages/work/[slug].astro` 新增 `.image-trio`（三欄等寬，`40em` 以下縮小間距、仍為三欄）；在 375px 預覽確認沒有水平捲動
- [x] 2.2 新增 `.split-media--stacked .toggle-pair { width: 100%; flex: none; }`；必要時為 `.image-single figcaption` 補樣式，與 `.image-pair figcaption` 一致

## 3. work/01 內容

- [x] 3.1 在 `01.md` 的 `## 專案背景` 上方加入 1-j 的 `image-single`
- [x] 3.2 「利用未完成效應…」區塊拿掉 `split-media`，改為段落加上 `image-single` 包 1-b；預覽確認文字在上、圖片滿版在下
- [x] 3.3 在「設計成果」第二段之後加入 `image-trio`，包含 1-r-1～3（各附 alt）；預覽確認桌機與 375px 都是三張並排

## 4. work/02 內容

- [x] 4.1 在 `02.md` 的 `## 專案背景` 上方加入 2-j 的 `image-single`
- [x] 4.2 將 2-c 替換為 2-c-1、2-c-2 兩個上下排列的 `<figure>`，並加上指定圖說；刪除 `public/images/case-02/2-c.jpg`，並用 grep 確認沒有其他地方引用它
- [x] 4.3 2-d 區塊改為 `split-media split-media--stacked`，段落在前、`toggle-pair` 在後；預覽確認圖片滿欄寬且熱力圖持續切換

## 5. 整合確認

- [x] 5.1 `npm run build` 成功，在 1280px 與 375px 檢查 `/work/01`、`/work/02`，確認所有新圖片都正常載入（無 404）
