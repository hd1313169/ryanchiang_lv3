# Design

## Context

排序目前在 `src/pages/index.astro` 與 `src/pages/work/[slug].astro` 各寫一次 `Number(b.id) - Number(a.id)`。案例 id 即檔名（`01`–`05`），同時決定網址與 `/images/case-0X/` 路徑。

## Goals / Non-Goals

**Goals:**
- 調整順序只改一行。
- 清單與實際案例不同步時 build 失敗。

**Non-Goals:**
- 依不同 JD 切換多組順序（未來可在同檔擴充，現在不做）。
- 重新編號或更改網址。

## Decisions

- **集中陣列 `CASE_ORDER`（`src/content/case-order.ts`）**，而非 frontmatter `order` 欄位。理由：頻繁調整時只改一處、順序一目瞭然、不會出現數字重複或跳號。替代方案：frontmatter `order`（需改多檔）、改檔名（破壞網址與圖片路徑），皆捨棄。
- **共用排序 helper**：同檔匯出一個函式，接收 collection 項目、驗證後回傳排序結果；兩個頁面都呼叫它，避免排序邏輯重複兩份。
- **驗證規則**：清單長度與集合相同、無重複、每個 id 都存在於集合、每個集合 id 都在清單中；任一不符即 `throw`，訊息列出漏列／多列／重複的 id。Astro 在 build 時執行頁面 frontmatter，throw 會讓 build 失敗。
- 此變更刻意推翻既有規格「排序僅由編號推導」的限制；該限制原意是避免編號與顯示脫節，現在由 build 檢查取代。

## Risks / Trade-offs

- [新增案例忘了加入清單] → build 失敗並指出缺少的 id。
- [「Case numbers grow with newer case studies」仍成立，但首頁不再是新到舊] → 編號語意不變，僅顯示順序獨立；規格已同步更新。
