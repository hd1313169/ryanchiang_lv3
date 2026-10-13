# Proposal

## Why

求職時需要依不同職缺 JD 調整案例呈現順序（目前要讓 02、01 排在第二、第三），但現行排序固定由案例編號遞減推導，無法在不重新編號、不改網址的前提下調整。預期之後會頻繁調整順序，因此需要一個單點維護、可防呆的排序來源。

## What Changes

- 新增一份集中維護的案例顯示順序清單，作為首頁作品列表與「下一篇／上一篇」導覽的唯一排序來源。
- 初始順序設為 05 → 02 → 01 → 04 → 03。
- build 時檢查清單與實際案例完全一致（不可漏列、多列、重複），不一致即 build 失敗。
- 案例編號、網址（`/work/01` 等）、圖片路徑皆不變。
- **BREAKING（規格層級）**：取消「排序僅由案例編號推導、不得另外維護排序值」的既有規則。

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `case-study-catalog`：首頁排序與「下一篇案例」改依集中順序清單，不再由編號遞減推導。

## Impact

- `src/pages/index.astro`、`src/pages/work/[slug].astro` 的排序邏輯
- 新增 `src/content/case-order.ts`
- 不影響網址、內容檔與圖片資產
