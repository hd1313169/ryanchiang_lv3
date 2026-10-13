# Tasks

## 1. 排序來源

- [x] 1.1 新增 `src/content/case-order.ts`，匯出 `CASE_ORDER = ["05", "02", "01", "04", "03"]` 與一個驗證並排序 case-study 集合的函式；暫時把清單少列一個 id 執行 `npm run build`，確認 build 失敗且錯誤訊息指出缺少的 id，再改回

## 2. 套用到頁面

- [x] 2.1 `src/pages/index.astro` 改用共用排序函式；`npm run build` 後檢查 `dist/index.html` 卡片連結順序為 05、02、01、04、03
- [x] 2.2 `src/pages/work/[slug].astro` 改用共用排序函式；檢查 `dist/work/02/index.html` 的「下一篇案例」指向 01，`dist/work/03/index.html` 指向 05

## 3. 整合確認

- [x] 3.1 `npm run build` 成功，且 `dist/work/01`–`05` 五個頁面都存在（網址不變）
