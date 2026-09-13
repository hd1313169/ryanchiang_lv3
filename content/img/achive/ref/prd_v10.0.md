# 昊揚行銷管理系統｜Product Requirements Document
## P0 + P1 + P2 完整規格文件 v10.0

| 欄位 | 內容 |
|------|------|
| **文件版本** | v10.0 |
| **文件狀態** | P0 + P1 + P2 三階段統一版 |
| **建立日期** | 2026-05-11 |
| **最後更新** | 2026-08-03（v10.0）|
| **文件負責人** | SA 系統架構師 |
| **文件性質** | 本文件為系統唯一事實來源，不參考任何外部文件 |

> 📋 **維護規則**：任何針對需求的修改，必須透過 REQ-ID 變更流程更新本文件。禁止口頭修改未記錄。

> **閱讀說明**：文件中穿插三類標記：
> `❓ 待業主確認（B-xx）` — 業務規則尚未定案
> `❓ 待技術確認（T-xx）` — 技術實作方式待決
> `✅ confirmed / resolved` — 已決策或修正完畢
> `⚠️ 業務規則（BR-xxx-xx）` — 強制執行的系統業務規則
> `⏳ postponed` — 已確認延後討論，不納入當前開發規格

---

## 版本歷程

| 版本 | 日期 | 主要變更 |
|------|------|---------|
| v1.0 ~ v5.1 | 2026-05-11 ~ 2026-05-15 | 初稿產出、P1/P2 REQ 補齊、P0+P1+P2 統一整合、會議決策套用（ROLE_FINANCE 納入 P0、通知管道統一、工作流重構）、技術審查修正 |
| **v5.2** | **2026-05-25** | **REQ-0022 合約管理規格重構：ContractBlock 資料表（逐條區塊）取代 is_modified_version；新增 client_revision 狀態；Brand 補法定資料欄位（B-06/B-34 resolved）** |
| **v5.3** | **2026-06-03** | **2026-06-03 會議整合：User 新增 department_id / is_general_manager / Department 主檔；ROLE_MANAGER 拆分可見範圍；REQ-0002 新增 S-09 部門設定；REQ-0052 改寫三層獎金架構；B-29 resolved（ECPay 時機確認）** |
| **v5.4** | **2026-06-03** | **Layer 1 廣告執行獎金全面改寫（ExecBonusSheet/Line/Allocation 三表 + EXEC_BONUS_APPROVAL 工作流）；B-33/B-37/B-41/B-47 resolved；B-55/B-56 新增 open** |
| **v5.5** | **2026-06-03** | **REQ-0054 績效認列引擎新增（PerformanceRecord + PerformanceAdjustment）；REQ-0052 Layer 3 移除（B-48/B-49 resolved）；Layer 2 計算基礎改接 REQ-0054；B-57 新增 open** |
| **v5.6** | **2026-06-09** | **PRD 全文審查修正：REQ-0004 站內通知與收件匣（Foundation 層）新增；`department_id` 非 Admin 帳號必填（BR-001-02）；工作流審核者改為具名型（B-04 resolved）；`is_overdue` 旗標取代 ARRecord overdue 狀態值（BR-050-01 修正）；`customer_grade` 移至 Brand 層、Customer 主檔不顯示（B-33 updated）；REQ-0053 RBAC 補入 Finance 欄；REQ-0054 `ARRecord.status = collected` 更正為 `confirmed`；REQ-0053 §7.1 Layer 3 移除（改接 Layer 2）；B-27 resolved（Manager 查全公司日誌）；B-04 resolved（具名型審核）；商機建立通知（NOTIFY_OPPORTUNITY_CREATED）新增；REQ-0043 S-09 更正為 S-07** |
| **v5.7** | **2026-06-10** | **REQ-0050 v1.2 修正套用（已收錄於本文件）：B-30 resolved（AdSpendRecord 流程確認）；B-53 resolved（ECPay 手動開立）；B-54 resolved（目標金額系統自動計算）；B-57 resolved（Cron Job 每月 2 日自動建立 PerformanceRecord）；REQ-0052 整合行銷部達標 100% 獎金率更新為 3%（原 2%）；Cron Job 執行順序說明補充（REQ-0050 先、REQ-0054 後）** |
| **v5.8** | **2026-06-11** | **ARRecord 狀態機 `collected` 全域更正為 `confirmed`（REQ-0050 / REQ-0054 一致化）；Cron Job 觸發日期從 1 日修正為 2 日（全域對齊）** |
| **v5.9** | **2026-06-12** | **2026-06-12 業主需求釐清套用（應收應付 / 獎金）：① REQ-0050：B-30 confirmed（並行審核確認）；ARRecord 補充 `signed_invoice_attachment` 欄位（客戶回簽請款單）；個人代墊明確排除系統範圍；AP 廠商請款 Key 入流程補充（`attachment_url`）；B-56 更新；APRecord 補充代墊 `markup_rate` / `markup_amount` 欄位。② REQ-0052 Layer 1：貢獻度由主管填寫補強業務規則（BR-052-03）；部門限制 constraint 補充。③ REQ-0052 Layer 2 / REQ-0054：月份績效目標係數機制新增（S-08 擴充 `MonthlyPerformanceMultiplier`）；新人試用期排除規則（BR-052-02）；人員異動 / 離職處理規則（BR-054-02 ~ BR-054-04）；`OnboardingMember` 新增 `assigned_from` / `assigned_to` 欄位；B-52 resolved（解鎖角色定義：Finance 最高層或 Admin）；`User` 補充 `probation_end_date` 欄位** |
| **v5.10** | **2026-06-12** | **REQ-0006 組織架構管理模組新增（P1）：新增 `ROLE_EXECUTIVE`（執行長角色）、`Position` 職位主檔、`Appointment` 任命記錄三張資料表；`Department` 擴充（`dept_type` / `parent_id` / `manager_user_id` / `dept_description` / `suggested_role` / `sort_order`）；`User.department_id` 廢棄，改由 Appointment 管理；`User` 新增 `job_title` 欄位；RBAC 矩陣新增 Executive 欄；組織圖展示頁（PAGE-06-L1-01）及三個後台管理頁（部門/職位/任命）規格化；REQ-0052 目標計算更新為依 Appointment + dept_type 篩選；WorkflowConfig 審核者查找邏輯改為依 Appointment.position_level；OnboardingMember 快照來源改為 Appointment；B-60 / B-61 / T-14 新增為 open 項目** |
| **v5.11** | **2026-06-12** | **REQ-0044 服務項目管理新增（P0，F-04 專案執行層）：服務項目管理從 REQ-0002 S-02 獨立為專屬模組，在導覽列「專案區塊」中顯示；所有角色可新增／修改服務大類與服務項目，停用／刪除限 Admin；REQ-0002 S-02 標記為「已遷移至 REQ-0044」；RBAC 全域矩陣新增 REQ-0044 列；REQ-0002 S-02 詳細規格、UI 佈局、資料模型、API、依賴關係均更新以反映遷移；REQ-0021 服務項目選單來源更新為讀取 REQ-0044** |
| **v5.12** | **2026-06-15** | **REQ-0010 / REQ-0020 架構重構（商機與客戶資料整合）：商機漏斗不再是獨立入口，改為「新增客戶」同步建立 Opportunity；Opportunity.brand_id UNIQUE NOT NULL FK → Brand.id（1:1）取代 brand_name 自由輸入；Customer 僅公司名稱必填，其餘選填；Brand 僅品牌名稱必填，其餘選填；取消 Won 後才補填 customer_id 的機制（Brand 建立時即關聯 Customer）；商機漏斗定義為「洽談狀態非 won / lost 之品牌看板視圖」；移除 consultant_owner_id / ad_owner_id；新增服務線 checkbox、轉介者、報價金額、結案日期欄位；Customer.tax_id 改為選填（統編唯一性驗證改為有值才驗證）；BR-020-01 更新；API 全面改寫；UI 入口與流程更新** |
| **v6.0** | **2026-06-15** | **v5.12 審查修正：全域 RBAC 矩陣 REQ-0020 Sales 欄「建立」說明更正（商機由新增品牌觸發，非獨立建立）；REQ-0001 AC-003 商機描述更正為透過新增品牌建立；全域待確認事項 B-23 標記為 resolved（Won 後引導 Modal 已隨 v5.12 架構調整移除）；B-21 更新（客戶詳情頁已改為七 Tab 結構，待業主確認新結構是否符合業務習慣）** |
| **v6.1** | **2026-06-15** | **`User.monthly_salary` 改為非 Admin / Executive 帳號必填：① User 資料表欄位說明更新（DB 層 NOT NULL 限制，ROLE_ADMIN / ROLE_EXECUTIVE 帳號允許 NULL）；② 新增業務規則 BR-001-04（帳號建立時薪資必填驗證）；③ BR-052-01 更新（移除「Finance 結算前人工確認」說明，改為系統層保證）；④ REQ-0001 驗收標準新增 AC-010（薪資必填驗證）** |
| **v6.3** | **2026-06-15** | **試用期機制重構（REQ-0001 / REQ-0052）：① `User.probation_end_date` 改為「轉正日（actual_confirmed_date）」，新增 `probation_status` ENUM（probation / confirmed）與 `probation_start_date`；試用期改為「評估通過後手動轉正」模型，不依賴固定截止日；② REQ-0001 §9.2 使用者詳情頁新增「轉為正式員工」操作區塊；③ BR-052-02 試用期計算邏輯更新（依 probation_status + actual_confirmed_date 判斷）；④ 附錄 C 欄位彙整更新；⑤ 新增 AC-013（試用期轉正操作）** |
| **v6.4** | **2026-06-15** | **REQ-0010 客戶 UI 架構重構（以品牌為主視角）：① §9.1 客戶列表頁改為品牌列表，每個品牌各自一列，公司名稱為副資訊；新增品牌入口改為列表頁右上角「新增品牌」，可選擇歸屬現有公司或新建；② §9.3 改為「品牌詳情頁」，移除「品牌列表」Tab（品牌本身即為詳情頁主體），Tab 結構調整為六個（商機資訊 / 公司資訊 / 合約 / 報價單 / 財務 / 專案）；③ B-21 標記為 resolved；④ B-62 移除（公司名稱為 Customer 唯一必填，不存在暫不填寫邊界情況）；⑤ AC-003 更正（移除 company_name 暫空描述）；⑥ §9.2 移除 B-62 錯誤備註** |
| **v7.9** | **2026-06-29** | **取消發布補漏（審查修正）：AC-043-09 改寫；REQ-0043 §6.1 Finance 篩選補 unpublished、§6.2 詳情頁補操作按鈕與 badge、§6.3 補 unpublished 提示、BR-043-05 排除 unpublished、§3.3 補 published_by；REQ-0045 §3.3 補 published_by、§5.2 新增文章按鈕改全角色 / badge / 操作按鈕更新、§5.3 badge 補 unpublished、§7 API 更新** |
| **v10.0** | **2026-08-03** | **REQ-0021 報價單條款與匯款帳號優化（0727 會議）：① §2 功能描述更新（移除公版模板說明，改為主要收費方式連動）；② §4 頭部欄位新增「主要收費方式」（必填，下拉選單）與「匯款帳號」（必填，下拉選單，系統預設兩組帳戶，seed data 儲存，不開發管理模組）；移除「公版類型」欄位；③ §6 公版樣板規格簡化，移除條款連動描述（條款邏輯改由 §7 統一定義）；④ §7 條款及細則全面改寫：七條完整條文結構確立，顯示邏輯改由「主要收費方式」欄位決定，條款第 1 點有效期限日期、第 2 點付款方式段落數字（請款日、付款期限）採 inline 挖空可編輯欄位設計，第 3-6 點固定不可變動，第 7 點特別注意事項可自由填寫；⑤ §14.1 Quote 資料模型新增 `payment_method VARCHAR NOT NULL`、`bank_account_id UUID NOT NULL FK → SystemBankAccount.id`；⑥ §16.1 UI 規格更新匯款帳號為下拉選單；⑦ AC-006 改寫為主要收費方式連動驗收條件；⑧ 新增 open item B-70（主要收費方式完整選項值域待客戶確認）；⑨ 對照新版公版文件修正：移除分期收費功能（B-03 resolved）、移除「可開始執行時間」頭部欄位、移除「目前開案預計」PDF 文字、新增 BR-021-09（純廣告版主要收費方式鎖定儲值制）、§11.3 版面差異表依三份公版全面改寫（含客戶資訊區結構、報價明細欄位與順序、各版面版面差異）、§5.2 補充付款方式欄為公版 B 專屬；⑩ 跨模組修正：REQ-0002 S-04 移除 `quote_valid_days`（條款第 1 條有效期限已固定為 7 日，無需動態帶入）、附錄 C.3 `standalone` 移除「含分期」說明、REQ-0021 §14.3 / §14.5 移除 QuoteAdConfig 公版 C 專用限定（開放其他公版啟用）、REQ-0050 §3.1 補充 `payment_method` 與 `billing_type` 職責區分說明** |
| **v9.8** | **2026-07-29** | **REQ-0042 委外採購重構 + REQ-0011 詢價紀錄新增（0727 會議）：① REQ-0042 §1 背景更新（詢價功能移至 REQ-0011）；② §2 功能描述移除多廠商比價說明；③ §3 流程改為單一廠商，移除【比價】步驟；④ §4.1 VendorQuote 主表欄位調整：`estimated_amount` 改名為 `estimated_cost` 且改為必填，新增 `expected_completion_date`、`vendor_id`、`quote_amount`、`quote_file_url`、`service_scope`、`approval_note`，移除 `selected_vendor_quote_id`；⑤ §4.2 VendorQuoteItem 廢棄（v9.8）；⑥ §4.3 APRecord 填入規則更新（vendor_id 改從 VendorQuote 主表取）；⑦ §6.1 比價規則改為單一廠商規則；⑧ §6.2 核定金額改為必填；⑨ §6.5 B-38 resolved；⑩ §10.2 建立表單重寫；⑪ §10.3 審核操作區 UI mock 更新；⑫ §11 API 移除 items 端點；⑬ §12 AC-042-01~03 改寫；⑭ §14 B-38 resolved；⑮ REQ-0011 §12.2 廠商詳情頁新增「詢價紀錄」Tab；新增 §12.4 詢價紀錄 UI 說明；新增 §13 VendorInquiry 資料模型 + API + RBAC + AC-011-08~09；§16 關係圖更新；REQ-0030 VENDOR_COST 說明更新；全域 ERD VendorQuoteItem 廢棄標記** |
| **v9.7** | **2026-07-29** | **REQ-0040 開案流程重構 + REQ-0021 聯動更新（0727 會議）：① REQ-0040 §1 背景補充 v9.7 調整說明；② §3 資料流改為「選品牌→選報價單→確認資訊→部門+人員」4 步驟；③ §4.1 觸發條件改為專案列表頁全域入口，移除報價單頁面觸發，補充 Step 2 可選條件（品牌一致、已審核通過、已回簽、尚未掛入其他專案）；④ §4.3 步驟由 6 步驟重構為 4 步驟（Step 1 選品牌+基本資訊 / Step 2 選報價單複選 / Step 3 確認各報價單服務期間 / Step 4 部門+人員合併同頁）；⑤ §5.2 必填判斷改為所有選定報價單費用類型聯集；⑥ §9.1 Project 資料表移除 `service_start_date`、`service_end_date`、`primary_quote_id` 欄位；⑦ §11.1 API Request Body 改為 `quote_ids[]` 陣列；⑧ AC-040-001 改寫；⑨ REQ-0021 §2 功能描述、§4 生命週期、§14.1 首次報價單定義（支援多張 `is_primary = true`）、§14.3 廢棄唯一性約束、AC-007、關係圖同步更新** |
| **v9.6** | **2026-07-29** | **REQ-0022 合約公版對齊 v3.0：① §8.3 ContractBlock 初始化範例全面更新，依行銷顧問服務委任主合約公版 v3.0 補齊完整九條 + 立約人資料（共 10 個 Block），修正條號與條名（第三條更名為「服務範疇與須知」；第五條更名為「權利歸屬與授權」；補入第七條合約終止、第八條爭議處理、第九條其他）；② §4.3 第四條說明更正（固定條文含：付款條件聲明以報價委任單為準、四種收費方式說明表、逾期條款、兩組收款帳戶）；③ §5.2 乙方固定值新增儲值金收款帳戶（第一商業銀行內湖分行 105-10-015385），並補齊電話格式（02-25589697）** |
| **v9.5** | **2026-07-20** | **移除 REQ-0053（結案評核）模組：① 整個模組（CaseReview / CaseSelfReview / CaseManagerScore 三張資料表）移除；② REQ-0040 結案流程改為單步驟（申請人確認不可逆警告彈窗即直接 closed，移除 closing 中間狀態）；③ REQ-0030 WorkflowType ENUM 移除 CASE_REVIEW，相關 source_type / 實體關係 / Inbox 例外說明同步清除；④ REQ-0060 板塊 D 移除待結案評核數量指標；⑤ 附錄 A 移除 B-35，新增 B-58（closed 狀態回朔機制，open）；同步修正：REQ-0053 §16 對 REQ-0052 的錯誤連動描述（CaseManagerScore.coefficient 並不存在於獎金計算公式）** |
| **v9.4** | **2026-07-20** | **新增 REQ-0055 廣告花費管理獨立模組（§10b）**：將原 REQ-0050 §4.2 中的 `AdSpendRecord` 資料表、RBAC、API、UI 入口及廣告費月結確認流程抽離，獨立為 REQ-0055；REQ-0050 §4.2 改為跨模組引用說明；側邊欄「財務管理」分區新增「廣告花費管理」選單項目（REQ-0001 §9.3b）；REQ-ID 索引表新增 REQ-0055；REQ-0052 依賴關係補充 REQ-0055；全域 ERD 跨模組引用標注更新。 |
| **v9.3** | **2026-07-20** | **REQ-0054：BR-054-02 及 Cron Job 操作流程中殘留的 OnboardingMember 更正為 ProjectMember（v7.4 對齊）；REQ-0052 Layer 2：新增 §4.0 DeptBonusRecord Cron Job 觸發機制（季結 4/7/10/1 月、半年結 7/1 月，月初 01:00 自動建立）；Layer 2 RBAC 矩陣補入「Layer 2 財務主管確認」操作列** |
| **v9.2** | **2026-07-13** | **REQ-0001 §9 UI 規格補充：新增 §9.3b 全域 Sidebar 導覽列結構，定義七個分區（工作台 / 客戶管理 / 報價管理 / 委外管理 / 專案執行 / 財務管理 / 後台管理）及各分區項目；補充 Sidebar 視覺結構示意圖、版面規格（展開 240px / 收合 48px / RWD ≤900px 自動收合）、RBAC 控制原則；委外進度管理為新增預留佔位項目（disabled 狀態，對應功能模組待定）** |
| **v9.1** | **2026-07-13** | **REQ-0011 廠商名錄 Finance 權限全面開放：Finance 角色廠商名錄權限由「唯讀」升級為「完整」，開放新增廠商、編輯廠商基本資料、停用廠商、新增／編輯廠商合約四項操作；① REQ-0011 §8 RBAC 矩陣四個操作列 Finance 欄由 ❌ 改為 ✅；② REQ-0001 §1 全域 RBAC 矩陣「廠商名錄（REQ-0011，P1）」列 Finance 欄由「唯讀」更正為「完整」；③ REQ-0011 §12.1 廠商列表頁「新增廠商按鈕」可見範圍補入 Finance** |
| **v9.0** | **2026-07-13** | **REQ-0026 客戶分級系統重構（流程簡化 + 強制保底 + UI 視覺規格）：① 分級確認流程由兩步驟（Finance 確認 → Executive 發布）簡化為一步驟（Finance 直接發布），移除 `confirmed` 中間狀態，GradingDraft ENUM 改為 `('draft','published')`；② Published 後分級修正（GradingRevision）移除審核流程，Finance / Manager / Admin 直接修改生效，同步移除 `status` / `reviewed_by` / `reviewed_at` / `review_note` 欄位；③ BR-026-01 顧問案保底規則由「建議值」升級為「強制鎖定」，任何角色不可在任何階段將有顧問案品牌調低至 C / D 級，系統層阻擋並顯示 ⛔ 提示；④ 新增 §6.4 顧問案標籤視覺規格（客戶列表、分級列表、品牌詳情頁三處統一：字體加大加粗、顏色 #B91C1C 深紅、永遠排首位）；⑤ RBAC 矩陣全面重整；⑥ B-43 resolved 說明更新；⑦ AC-026-02 / AC-026-03 / AC-026-04 / AC-026-05 改寫；US-026-02 / US-026-05 改寫；API 草稿同步精簡 |
| **v8.8** | **2026-07-08** | **AP 模組決策寫入（B-40 / B-45 / B-46 / B-55 resolved；Q3 APRecord 退回機制新增）：① APRecord 狀態機新增 `rejected` 狀態，Finance 可退回（退回後 PM/PD 或 Finance 自行修改並重新送審）；② VENDOR_COST 確認為單層主管審核（B-45 resolved）；③ 代收代付 AP 端正式納入 MVP，建立者為 PM/PD 或 Finance（B-55 resolved）；④ 廠商名錄新增 `is_internal` BOOLEAN 欄位，昊揚內部虛擬廠商以此標記區分（B-46 resolved）；v5.4 客戶主檔方向正式捨棄；⑤ 廠商合約 PDF 及報價 PDF 確認直接上傳至系統（B-40 resolved）；⑥ B-39 resolved（維持手動建立 APRecord）；⑦ B-8 resolved（半年結依部門定錨，整合行銷部、創意素材部一律半年結）** |
| **v8.7** | **2026-07-07** | **需求訪談整合（AR 狀態機 / 帳務範圍）：① ARRecord `status` 加入 `draft` 初始態——Cron Job 自動生成與 Finance 手動建立均起於 `draft`，Finance 確認後送審才進入 `pending`；② 對齊 5 處：ARRecord ENUM 欄位、完整狀態機圖、Cron Job 生成流程、送審流程說明、非例行 AR API 回傳；③ BR-050-01 逾期旗標掃描條件新增排除 `draft`（草稿不對外不計逾期）；④ §3.2 新增「1105 其他應收款暫定排除系統範圍，由外部會計軟體處理」說明；⑤ BR-040-02 補充逾期服務中止機制設計決策（不做系統自動暫停，由負責人手動申請 `financial_default` 結案）** |
| **v8.6** | **2026-06-30** | **REQ-0011 廠商名錄 PM/PD 權限全面開放（業主需求調整：PM/PD 為最核心接觸廠商的角色）：① §11 RBAC 矩陣 PM/PD 欄由「唯讀 / 付款資訊不可見」全面升級為「完整」（新增、編輯、停用廠商、合約管理、付款資訊查看），不限負責品牌、全部廠商一視同仁；② §5.3 VendorPayment 資安規則更新，PM/PD 比照 Admin/Manager/Finance 顯示完整帳號，不再遮罩；③ §12.1 廠商列表頁「新增廠商」按鈕可見範圍補入 PM/PD；④ §12.2 廠商詳情頁付款資訊 Tab 與合約紀錄 Tab 操作說明同步更新；⑤ AC-011-04（付款資訊存取）、AC-011-07（廠商合約操作）改寫為開放性驗收標準；⑥ REQ-0001 §1 全域 RBAC 矩陣「廠商名錄（REQ-0011，P1）」列 PM/PD 欄同步由「唯讀」更正為「完整」** |
| **v8.5** | **2026-06-30** | **複查發現並修正 VENDOR_COST 工作流的階段性矛盾（與 v8.3/v8.4 的「不分階段」決定衝突）**：REQ-0042 §7 標題與內文改寫（移除「P0 宣告但不激活、P1 才正式激活」敘述，改為「開發起即完整設定並啟用」）；AC-042-08 改寫為送審通知驗證情境（移除「P0 審核者清單為空」的失效測試前提）；附錄 B「P1 REQ 清單」移除 REQ-0042 列（已有獨立完整文件 §14，不適用 P0 暫行方案分類）；全域工作流類型對照表 VENDOR_COST 列更新激活方式說明；附錄 P1-B 移除 VENDOR_COST 審核者設定列（刪除線保留歷史紀錄）。本次複查確認：REQ-0011/0040/0041/0042 四個同步開發模組現已不存在任何「P0 暫代、P1 才正式可用」的隱性矛盾描述；REQ-0025/0026/0052/0053/0060 等其餘模組的 P0/P1 階段性設計不在本次決定範圍內，維持原樣未變動。** |
| **v8.4** | **2026-06-30** | **擴大處理 vendor_name_temp 暫代欄位（風險評估後執行，範圍限定於 REQ-0011/0040/0041/0042，不影響其他模組的 P0/P1 排程框架）**：經全文掃描確認，PRD 中僅有單一組 `vendor_name_temp` 暫代欄位體系（分布於已廢止的 `ProjectVendor` 與現存的 `APRecord`），其餘 P0/P1 標籤均為文件層級優先級分類（21 個模組共通框架），與本次調整無關，故未變動。本次處理：① REQ-0050 §5.2 `APRecord` 正式資料模型移除 `vendor_name_temp`，`vendor_id` 改為直接正式 FK，新增 `vendor_quote_id` 欄位；② REQ-0042 §4.3 標題與內文改寫，移除「P0 狀態 / P1 更新」對照表，直接列出欄位填入規則；③ REQ-0011 背景動機、US-011-03 移除 `vendor_name_temp` 過渡語句；④ 附錄 P1-B 新增 `APRecord.vendor_name_temp` 列移除標記（刪除線保留歷史紀錄）；⑤ 附錄 C.3 `APRecord` 資料表欄位彙整簡化，移除 P0/P1 分階段敘述。本次調整確保 REQ-0011/0040/0041/0042 四個同步開發模組的欄位定義內部一致，不存在「P0 暫代、P1 才正式可用」的隱性開發排程矛盾。** |
| **v8.3** | **2026-06-30** | **廢止 ProjectVendor，統一改用 VendorQuote 處理委外廠商關聯**：① §9.7 ProjectVendor 資料表標記廢止（保留為歷史紀錄），§9.8 實體關係圖改為 `Project ──1:N──→ VendorQuote`；② 全系統 ERD（附錄 B 前的整體架構圖）同步更新；③ REQ-0011 與其他 REQ 關係圖修正欄位歸屬錯誤（廠商 FK 實際位於 `VendorQuoteItem.vendor_id`，非 `VendorQuote` 主表）；④ 附錄 P1-B「P0 暫行方案激活對照清單」移除 `ProjectVendor.vendor_name_temp` 列；⑤ **重大澄清**：REQ-0011 §14、REQ-0042 等模組原有的「P0 暫行欄位 / P1 正式上線資料遷移」設計，依目前開發排程不適用——REQ-0011 / REQ-0040 / REQ-0041 / REQ-0042 為同步開發，不分階段先後上線，故 `VendorQuoteItem.vendor_id` 自開發起即為必填 FK，無需暫代欄位或遷移計畫；REQ-0011 §14 章節內容已改寫為說明性歷史紀錄。⚠️ 注意：v8.2 changelog 中標註的「待確認」事項已於本版本處理完畢。** |
| **v8.2** | **2026-06-30** | **廠商採購雙入口設計（REQ-0041 / REQ-0042 連動修正）：採購申請發起點由「強制服務項目下」改為「專案層級為必要前提，服務項目為選填細分」；① REQ-0041 §10 新增 Tab 6「廠商採購」（原 Tab 6 知識庫順移為 Tab 7），與 REQ-0042 共用同一張 VendorQuote 資料表（單專案篩選視角）；② REQ-0042 §10.1 改寫為雙入口說明（入口 A：專案詳情頁 Tab；入口 B：REQ-0042 獨立全公司匯總入口），§10.2 表單欄位「關聯服務項目」改為選填；③ VendorQuote.project_id / service_id 欄位說明更新，明確兩入口的填寫邏輯差異；④ 新增 AC-041-004（雙入口資料一致性驗收標準）；⑤ §9（REQ-0040/41）與 §14（REQ-0042）依賴關係欄位、與其他 REQ 關係圖雙向同步補充；⑥ §1 背景動機、§2 功能描述、§3 流程圖、US-042-01 用詞同步修正。⚠️ 待確認：既有 `ProjectVendor` 資料表（§9.7，輕量委外廠商標記，非本次修改範圍）與新版 VendorQuote 採購流程功能重疊，且 P0 重構後的 Tab 結構未提供 ProjectVendor 對應操作介面，建議後續架構調整時一併釐清兩者關係或考慮整併。** |
| **v8.1** | **2026-06-30** | **REQ-0040 / REQ-0041 模組名稱變更（不合併 REQ-ID，僅更名以消除字面混淆）：REQ-0040「雙軌專案結構」更名為「專案建立」（聚焦開案動作與專案層級骨架：類型、結案、人員指派）；REQ-0041「服務管理」更名為「專案執行」（聚焦執行階段日常操作：服務項目、營銷計畫表、報價單、合約、委外廠商）；全文同步更新所有跨模組引用（REQ-0006、REQ-0010、REQ-0011、REQ-0020、REQ-0025、REQ-0030、REQ-0042、REQ-0050、REQ-0052、REQ-0053、REQ-0054、REQ-0060、REQ-0043、REQ-0045 共 14 個模組、60+ 處引用），REQ-ID 索引表、§9 章節主標題與表格標頭、ERD 資料流圖、RBAC 矩陣、API 註解、結尾標記均已同步；資料表結構（Project / Service）與 REQ-ID 編號保持不變，僅變更對外稱呼** |
| **v8.0** | **2026-06-30** | **待辦審核流程重新設計（業主反饋套用）：審核操作（核准 / 退回）由獨立的「審核詳情頁」改為直接嵌入各 WorkflowType 對應的來源單據功能頁面（報價單詳情頁 / 合約條文編輯頁 / AR 請款單詳情頁 / 廠商採購詳情頁 / 廣告執行獎金結算頁），待辦審核清單（Inbox）改為導覽入口 + 歷史記錄查詢（新增「待處理／已核准／已退回／已撤回」四個分頁）；REQ-0030 UC-030 主要流程、§8 UI 規格、AC-002/003 改寫，新增 AC-009/010；新增 §6.3 WorkflowApproval 資料表（補齊多人 / 多層審核個別記錄，原為文字引用但缺正式定義）、`WorkflowInstance` 新增 `cancelled_at` 欄位（供 Inbox「已撤回」分頁排序）、新增 §7.4 Inbox 列表查詢 API（依分頁 tab 查詢，含 source_link / summary 欄位）；REQ-0021 新增 §8.3（`estimated_cost` 納入 QuoteVersion 快照，審核者可見利潤率資訊）、§16.3 審核操作區，新增 AC-010/011；REQ-0022 新增 §10.6 審核操作區，新增 AC-019/020；REQ-0050 新增 §4.3b 審核操作區（INVOICE_APPROVAL 並行兩層審核進度顯示），新增 AC-050-008/009；REQ-0042 §10.3 改寫為審核操作區並補充非審核者視角，新增 AC-042-09；REQ-0052 新增 §3.6 審核操作區（EXEC_BONUS_APPROVAL 序列式兩層）；REQ-0053 §8 補充例外澄清（CASE_REVIEW 系統自動核准，不適用嵌入式審核操作區設計），同步修正 REQ-0030 UC-030 中原先對 CASE_REVIEW 的不準確描述。本次未同步更新 IA Sitemap。** |
| **v7.8** | **2026-06-29** | **取消發布功能新增（REQ-0043 / REQ-0045）：KnowledgeDoc 新增 `unpublished` 狀態、`unpublished_at` / `unpublished_by` / `published_by` 欄位；BR-043-07 取消/重新發布業務規則；§6.1 篩選條件補「已取消發布」；RBAC 矩陣補取消/重新發布列；API 新增 `/unpublish` / `/republish` 端點；AC-043-11 / AC-043-12 新增；REQ-0045 同步更新（BR-045-06 / BR-045-07、§3.4b 流程、RBAC 矩陣、API）** |
| **v7.7** | **2026-06-29** | **Finance 知識庫權限開放：REQ-0043 §7 RBAC 矩陣更新（Finance 可建立 / 編輯 / 封存自己建立的文件）；REQ-0045 §6 RBAC 矩陣更新（Finance 可建立、編輯、發布、刪除自己的 wiki，他人草稿不可見）；BR-045-01 草稿可見範圍更新；AC-045-005 改寫；全域 RBAC 矩陣同步更新；功能描述、UI 說明同步修正** |
| **v7.6** | **2026-06-29** | **REQ-0045 專案 Wiki 新增（§20，P2）：ProjectWiki 資料模型（單一來源型，發布後升格為 KnowledgeDoc）、BR-045-01 ～ 05 業務規則、RBAC 矩陣（Finance 可操作自建文章，他人草稿不可見）、5 條 AC、T-23 / T-24 技術確認事項；REQ-0041 §10 Tab 結構新增 Tab 6 知識庫；REQ-0043 P2 說明更新（由唯一 REQ 改為共兩支）；REQ-ID 索引表補入 REQ-0045** |
| **v7.5** | **2026-06-26** | **REQ-0026 客戶分級系統重構：§4 確認流程拆分為 4.1 季度標準流程 / 4.2 Published 後修正流程；新增 §5.4 GradingRevision 資料表；§5.3 GradingDraft status 說明補全（draft 限 Finance、confirmed 狀態機說明）；§9 RBAC 矩陣補 revision 操作列；draft 階段 Manager 改為唯讀；B-43 resolved。REQ-0010 §9.3 品牌詳情頁 Tab 順序重排（8 Tab）、Tab 1 品牌資訊補「上季參考」標注邏輯** |
| **v7.4** | **2026-06-24** | **專案管理重構：REQ-0025 廢除（開案交接合併入新增專案流程）；REQ-0040 全面重構（部門組合制、ProjectTeamDepartment / ProjectMember 新資料模型、結案原因欄位、close_reason ENUM）；REQ-0041 新增營銷計畫表 Tab、服務項目列表合併顯示、追加報價新部門補填流程；⚠️ REQ-0052 / REQ-0030 / QA 文件 / IA Sitemap 受影響，待同步更新標記** |
| **v7.3** | **2026-06-24** | **REQ-0022 合約管理更新：B-07 resolved（14天/部門主管/站內+Email）；補 Gap-01 合約終止流程；Gap-02 限縮 client_revision 入口；Gap-03 補作廢規則；Gap-04 標記 T-11 open** |
| **v7.2** | **2026-06-23** | **廠商名錄（REQ-0011）比對廠商合約資料修正：① VendorContract 新增 `submitted_by` 欄位（FK → User.id，申請人，下拉選單選擇帳號，預設當前建立者，可手動更改）；② APRecord 新增 `cost_category` ENUM 欄位（social / word_of_mouth / material / other，僅 ap_category = vendor_cost 時填寫，選填）；③ `entity_type = company` 說明補充「含工作室型態商號」，新增分類原則備註；④ `VendorContract.end_date` NULL 說明更新（明確允許 NULL，適用開放式合約）；⑤ `archived_at` 說明補充「系統自動記錄，為人工歸檔作業的 log」** |
| **v7.1** | **2026-06-17** | **ROLE_EXECUTIVE 權限全面升級至等同 Admin：① REQ-0001：Executive 角色定義更新（系統操作權限等同 Admin）；ROLE_EXECUTIVE vs. ROLE_ADMIN 邊界說明修訂（定位差異，非權限差異）；總 RBAC 矩陣 Executive 欄更新（使用者管理、系統設定、組織架構管理、稽核日誌均改為完整）；② REQ-0002：依賴關係、背景說明、API 說明、UI 佈局、AC-006 相關描述更新，新增 Executive 完整操作權；③ REQ-0003：功能描述及查詢權限表更新，Executive 稽核日誌從唯讀改為完整（含匯出）；④ REQ-0006：AC-006-005 驗收標準改寫，新增使用者管理與系統設定操作情境；⑤ REQ-0044：服務項目管理 RBAC 矩陣更新，Executive 取得停用 / 啟用 / 刪除操作權** |
| **v7.0** | **2026-06-16** | **RBAC 重大架構調整：移除 `ROLE_SALES`，所有角色繼承原 Sales 業務開發權限。① REQ-0001：系統角色從六個改為五個，`ROLE_SALES` 正式廢除；RBAC 矩陣全面更新（客戶主檔、商機漏斗、報價單、合約、開案交接均改為全角色可操作）；AC-003/005/010 範例更新；② REQ-0020：`sales_owner_id` 改名為 `opportunity_owner_id`（B-63 resolved，方案 A），語意從「業務負責人」改為「商機負責人」，任何角色均可被指派；B-25 open issue 更新；③ REQ-0021/0022：建立者角色從 Sales 改為全角色；④ REQ-0025：開案交接建立者從 Sales 改為全角色，US-025-01 更新；⑤ REQ-0030：QUOTE_APPROVAL / CONTRACT_MODIFY 送審角色從 `ROLE_SALES` 改為全角色（`ROLE_ANY`）；⑥ REQ-0043：知識庫 Sales 唯讀條款更新為全角色唯讀基礎；⑦ B-64 resolved（開案交接「業務來源 / 簽約成交」角色名稱維持不變）；⑧ B-65 resolved（Finance 全繼承 Sales 業務開發權限，不設限制）** |
| **v6.2** | **2026-06-15** | **REQ-0001 人員管理 UI 整合重構：① 新增使用者表單合併組織任命（同一表單完成帳號建立 + 初始 Appointment），移除「建立後跳頁提示」；② 使用者詳情頁組織任命區塊從唯讀連結升級為可直接新增 / 終止 Appointment（不再跳轉 PAGE-06-L2-03）；③ BR-001-02 更新反映表單合併邏輯；④ 新增 AC-011（新增人員表單含組織任命）、AC-012（詳情頁直接編輯 Appointment）** |

---

## 文件結構與 REQ-ID 索引

| REQ-ID | 功能名稱 | 層 | 優先級 | 本文位置 |
|--------|----------|----|--------|---------|
| REQ-0001 | 使用者管理與 RBAC | F-00 Foundation | P0 | §1 |
| REQ-0002 | 全域系統設定 | F-00 Foundation | P0 | §2 |
| REQ-0003 | 稽核日誌 | F-00 Foundation | P0 | §3 |
| REQ-0004 | 站內通知與收件匣 | F-00 Foundation | P0 | §3b |
| REQ-0010 | 客戶主檔 | F-01 實體資料層 | P0 | §4 |
| REQ-0020 | 商機漏斗 | F-02 商業流程層 | P0 | §5 |
| REQ-0021 | 報價單管理 | F-02 商業流程層 | P0 | §6 |
| REQ-0022 | 合約管理 | F-02 商業流程層 | P0 | §7 |
| REQ-0023 | 請款單 | F-02 商業流程層 | P0 | **→ 已合併至 REQ-0050（§10）** |
| REQ-0024 | 送審流程 | F-03 工作流引擎 | P0 | **→ 已合併至 REQ-0030（§8）** |
| REQ-0030 | 工作流引擎 | F-03 工作流引擎 | P0 | §8 |
| REQ-0040 | 專案建立 | F-04 專案執行層 | P0 | §9 |
| REQ-0041 | 專案執行 | F-04 專案執行層 | P0 | §9 |
| REQ-0044 | 服務項目管理 | F-04 專案執行層 | P0 | §9b |
| REQ-0050 | AR / AP 對帳 | F-05 財務計算層 | P0 | §10 |
| REQ-0051 | 全成本獲利試算 | F-05 財務計算層 | P0 | §10 |
| REQ-0055 | 廣告花費管理 | F-05 財務計算層 | P0 | §10b |
| REQ-0011 | 廠商名錄 | F-01 實體資料層 | P1 | §11 |
| REQ-0025 | 開案交接完整流程 | F-04 專案執行層 | — | §12（⚠️ v7.4 廢止，功能合併入 REQ-0040） |
| REQ-0026 | 客戶分級系統 | F-01 實體資料層 | P1 | §13 |
| REQ-0042 | 廠商採購成本管理 | F-04 專案執行層 | P1 | §14 |
| REQ-0054 | 績效認列引擎 | F-05 財務計算層 | P1 | §19 |
| REQ-0052 | 獎金分配引擎 | F-05 財務計算層 | P1 | §16 |
| REQ-0060 | 老闆戰情室 | F-06 報表儀表板層 | P1 | §17 |
| REQ-0043 | 全域知識庫 | F-04 專案執行層 | P2 | §18 |
| REQ-0045 | 專案 Wiki | F-04 專案執行層 | P2 | §20 |

### REQ-0023 / REQ-0024 合併說明

> **REQ-0023（請款單）→ 合併至 REQ-0050**：請款單是 ARRecord 加 PDF 輸出的呈現形式。觸發邏輯、審核流程（INVOICE_APPROVAL）、電子發票開立，已在 REQ-0050 §4 完整定義。

> **REQ-0024（送審流程）→ 合併至 REQ-0030**：送審流程即工作流引擎的使用者操作介面。所有送審、審核、退回、通知邏輯已在 REQ-0030 完整定義。

---

# §1｜REQ-0001 使用者管理與 RBAC


| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0001 |
| **Use Case ID** | UC-001 |
| **PRD 章節** | 5.1.1 |
| **所屬模組** | F-00 Foundation 層 |
| **優先級** | `P0` |
| **狀態** | `open` — 規格初稿 |
| **最後更新** | 2026-05-11 |
| **依賴關係** | 無上游依賴（本 REQ 是所有模組的前置依賴，開發排程應最優先） |

---

## 1. 背景與設計動機

現況：所有人共用 Google Sheets，無存取控制，資料隔離靠約定俗成，操作無從稽核。目的：建立五角色 RBAC 系統（Admin / Executive / Manager / PM/PD / Finance），確保各角色最小權限存取，關鍵操作全程記錄；業務開發（商機 / 報價 / 客戶）功能對全角色開放。

---

## 2. 功能描述

> 系統應提供使用者帳號管理（建立、編輯、停用）、角色指派（支援多角色兼任）、密碼政策、MFA 強制啟用，以及基於角色的資料存取控制（RBAC）；所有關鍵操作自動寫入稽核日誌。

---

## 3. 角色定義

系統預設**五個固定角色**，不可刪除、不可新增自訂角色（角色是系統固定設計，非業務可自訂）：

✅ **v5.0 決策（B-32 resolved）**：`ROLE_FINANCE` 正式納入 P0。
✅ **v5.10 新增（REQ-0006）**：`ROLE_EXECUTIVE` 正式新增，供執行長專屬使用。原「角色不可新增」約束僅限業務用戶自訂；系統設計層級的固定角色擴充不在此限。
✅ **v7.0 移除（B-63/B-64/B-65 resolved）**：`ROLE_SALES` 正式廢除。公司所有人員皆可從事業務開發，商機漏斗、報價單、客戶主檔、合約建立、開案交接等業務開發功能改為全角色開放，不再設立專屬業務角色。

| 角色 ID | 角色名稱 | 職責定位 | 典型人員 |
|---------|----------|----------|----------|
| `ROLE_ADMIN` | Admin | 系統管理員，完整存取所有功能，負責帳號管理、系統設定、稽核日誌；**不具業務審核流角色** | 指定的系統管理人員 |
| `ROLE_EXECUTIVE` | Executive | 執行長專屬。系統操作權限等同 Admin（含帳號管理、系統設定、稽核日誌完整存取）；業務審核流為第三層最終放行權；**不具 Admin 身份**（角色定位為業務最高決策者，而非系統管理員） | 執行長（白菜） |
| `ROLE_MANAGER` | Manager | 部門主管 / 總經理，可審核單據、查看財務數據、存取老闆戰情室；資料可見範圍依 `is_general_manager` 旗標區分（見 §3.2） | 各部門主管及總經理 |
| `ROLE_PM` | PM/PD | 專案執行負責人，完整管理自己**負責品牌**的案件，其他品牌唯讀；**v7.0**：同時繼承業務開發能力（商機建立、報價送審等） | 各部門 PM / PD |
| `ROLE_FINANCE` | Finance | 財務行政，AR/AP 完整操作、合約歸檔確認、財務歸檔；**v7.0**：同時繼承業務開發能力（商機建立、報價送審等）；不開放報價單審核或合約條文修改 | 財務行政部（如 Debby） |

> ⚠️ **ROLE_EXECUTIVE vs. ROLE_ADMIN 邊界**：執行長帳號賦予 `ROLE_EXECUTIVE`，**不賦予** `ROLE_ADMIN`。兩者系統操作權限相同（含帳號管理、系統設定、稽核日誌完整存取）；差異在於**角色定位**——Admin 是系統管理員身份，Executive 是業務最高決策者身份，兩者不合併為同一角色。

> ⚠️ **ROLE_EXECUTIVE vs. ROLE_MANAGER 邊界**：Executive 擁有 Admin 等級的完整系統操作權限；Manager 僅有業務模組存取權。審核流層級：Executive 為第三層最終放行，Manager（總經理）為第二層，Manager（部門主管）為第一層。

### 3.1 多角色兼任規則

- 一個使用者可同時持有多個角色（例：PM 兼任 Finance）
- 兼任時權限取**聯集**，以最高權限為準
- 兼任關係由 Admin 在系統後台設定，不限制兼任組合

### 3.2 ROLE_MANAGER 的部門主管 vs. 總經理分層

✅ **v5.3 確認**：`ROLE_MANAGER` 在獎金模組（REQ-0052）中區分「部門主管」與「總經理」，透過 `User.is_general_manager` 旗標實作。`ROLE_EXECUTIVE` 在獎金模組中視同 `is_general_manager = true`（全公司可見）。

| 旗標值 / 角色 | 身份 | 獎金模組資料可見範圍 | 審核層 |
|--------------|------|---------------------|--------|
| `ROLE_MANAGER` + `is_general_manager = false` | 部門主管 | 本部門獎金池與成員明細 | 第一層 |
| `ROLE_MANAGER` + `is_general_manager = true` | 總經理 | 全公司獎金總覽 | 第二層 |
| `ROLE_EXECUTIVE` | 執行長 | 全公司獎金總覽 | 第三層（最終） |

### 3.3 組織職務與部門歸屬規則

✅ **v5.10 重構（REQ-0006）**：部門歸屬改由 `Appointment`（任命記錄）管理，取代原 `User.department_id` 單值 FK。一個人可在多個部門同時持有職務，每筆 Appointment 獨立記錄，績效分開計算。

詳細規格見 **REQ-0006 §3**（組織職務與 Appointment）。

**本 REQ 業務規則更新：**

> ⚠️ **業務規則（BR-001-02 更新，v6.2）**：新增非 Admin / Executive 帳號時，「新增使用者表單」內建組織任命區塊（部門 + 職位 + 起始日），Admin 可於同一表單完成帳號建立與初始 Appointment 設定。組織任命區塊**非強制**——若暫時不填，系統允許先建立帳號，並於詳情頁補填；但帳號建立後系統顯示提醒 badge「尚未設定組織任命」直到補齊為止。帳號建立後亦可直接於「使用者詳情頁 → 組織任命」區塊新增 / 終止 Appointment，無需跳轉至組織架構管理頁面（PAGE-06-L2-03 仍保留，供從部門視角管理人員使用）。

> ⚠️ **業務規則（BR-001-03 新增）**：財務行政部的 `Department.suggested_role = ROLE_FINANCE`。Admin 將人員加入財務行政部 Appointment 時，系統 UI 自動預選「建議賦予 ROLE_FINANCE」，Admin 確認後才寫入 UserRole；不強制綁定，Admin 可手動取消。其他部門類似邏輯適用（總經理室 → ROLE_MANAGER，業務部門 → ROLE_PM）。

> ⚠️ **業務規則（BR-001-04 新增，v6.1）**：建立非 `ROLE_ADMIN` / `ROLE_EXECUTIVE` 帳號時，`monthly_salary`（月薪）為**必填欄位**；若未填寫，系統阻擋帳號建立並顯示「請填寫月薪，此欄位為績效目標計算必要資料」。`ROLE_ADMIN` 與 `ROLE_EXECUTIVE` 帳號不參與部門績效目標計算，允許 `monthly_salary = NULL`。

---

## 4. 帳號生命週期

```
Admin 建立帳號
    │  填入：姓名、Email、初始角色
    │  系統自動：產生臨時密碼 + 發送設定密碼通知信
    │
    ▼
使用者首次登入
    │  強制：修改密碼（不可繼續使用臨時密碼）
    │  強制：設定 MFA（待技術確認實作方式）
    │
    ▼
正常使用
    │
    ├─ 密碼定期更換提醒（週期由系統設定控制）
    │
    ├─ Admin 可修改：姓名、Email、角色指派
    │
    └─ Admin 停用帳號
            │  停用後：立即無法登入
            │          進行中的 Session 立即失效
            │          歷史操作記錄保留（不刪除）
            │          若有進行中的 WorkflowInstance 指定此人為 Approver
            │          → 觸發警告通知 Admin（見 REQ-0030 §3.3）
            ▼
        停用狀態（軟刪除，不可硬刪除）
```

✅ **v5.0 決策（B-01 resolved）**：帳號建立方式確認為 **Admin 直接手動建立**。Admin 填入姓名、Email、初始角色後，系統自動產生臨時密碼並寄出通知信。

---

## 5. 認證規格

### 5.1 密碼政策

| 規則 | 要求 |
|------|------|
| 最小長度 | 12 個字元 |
| 複雜度 | 必須包含大寫字母、小寫字母、數字、特殊符號各至少 1 個 |
| 禁止使用 | 帳號 Email 前綴、連續重複字元（如 aaa、111） |
| 歷史限制 | 不可重複使用最近 5 次的密碼 |
| 更換提醒 | 每 90 天提示更換（不強制，到期後仍可登入但每次顯示提示） |
| 臨時密碼 | 首次登入後強制修改，臨時密碼 24 小時後失效 |

### 5.2 多因素認證（MFA）

> ❓ **待技術確認（T-02）**：MFA 實作方式選擇如下，需技術端確認後定案：

| 方案 | 說明 | 優點 | 缺點 |
|------|------|------|------|
| **方案 A：TOTP（建議）** | Google Authenticator / Authy 等 App 產生的 6 位動態碼 | 無需手機號碼、免簡訊費用、離線可用 | 換手機需重新設定 |
| **方案 B：SMS OTP** | 簡訊發送 6 位驗證碼 | 使用者熟悉度高 | 需簡訊服務費、有延遲風險、SIM 卡劫持風險 |
| **方案 C：Email OTP** | 登入時寄驗證碼至信箱 | 實作成本最低 | 安全性低於 A/B，Email 被盜時雙重失效 |

> SA 建議方案 A（TOTP）。若業主有特殊考量可採方案 B。方案 C 不建議，安全性不足。

**MFA 啟用規則：**
- 所有角色強制啟用，無例外
- 首次登入修改密碼後，下一步強制設定 MFA
- MFA 未設定完成前，無法進入任何系統功能頁面
- 備用碼：設定 MFA 時產生 10 組一次性備用碼，供遺失裝置時使用

### 5.3 Session 管理

| 規則 | 設定 |
|------|------|
| Session 有效期 | 8 小時（與一個工作天對齊） |
| 閒置自動登出 | 連續 60 分鐘無操作自動登出 |
| 多裝置登入 | 允許（同一帳號可在多個瀏覽器 / 裝置同時登入） |
| 強制登出 | Admin 停用帳號時，所有裝置的 Session 立即失效 |

---

## 6. RBAC 權限矩陣

> ⚠️ 此矩陣為系統設計基準，需業主確認後定案。PM「負責客戶」的判斷依據（B-20）確認後，PM 欄位的細節可能調整。

### 6.1 模組層級權限

✅ **v5.0 更新（B-32 resolved）**：新增 Finance 欄。
✅ **v5.3 更新**：Manager 欄拆分為「部門主管」與「總經理」兩欄。
✅ **v5.10 更新（REQ-0006）**：新增 Executive 欄（ROLE_EXECUTIVE）；組織架構管理（REQ-0006）新增列。
✅ **v7.0 更新**：移除 Sales 欄（`ROLE_SALES` 廢除）；原 Sales 業務開發能力全面繼承至所有角色。
✅ **v8.6 更新**：廠商名錄（REQ-0011）PM/PD 欄由「唯讀」升級為「完整」；PM/PD 為最核心接觸廠商的角色，新增/編輯/停用廠商、合約管理、付款資訊查看全面開放，不限負責品牌。

| 功能模組 | Admin | Executive | Manager（部門主管） | Manager（總經理） | PM/PD | Finance |
|----------|-------|-----------|---------------------|-------------------|-------|---------|
| **客戶主檔（REQ-0010）** | 完整 | 完整 | 完整 | 完整 | 完整（負責品牌）/ 唯讀（其他） | 完整 |
| **商機漏斗（REQ-0020）** | 完整 | 完整 | 完整 | 完整 | 查看全部 / 建立 / 編輯自己的 / 更新狀態自己的 | 查看全部 / 建立 / 編輯自己的 / 更新狀態自己的 |
| **報價單（REQ-0021）** | 完整 | 審核 | 審核 | 審核 | 建立 / 編輯 / 送審 | 建立 / 編輯 / 送審 |
| **合約管理（REQ-0022）** | 完整 | 完整 | 完整 | 完整 | 建立公版 / 輸出 PDF / 唯讀（不可修改條文） | 建立公版 / 輸出 PDF / 歸檔確認 |
| **工作流引擎（REQ-0030）** | 完整 | 審核者（第三層） | 審核者（第一層） | 審核者（第二層） | 送審者（QUOTE_APPROVAL / CONTRACT_MODIFY） | 送審者（QUOTE_APPROVAL / CONTRACT_MODIFY / INVOICE_APPROVAL） |
| **建立專案 / 服務團隊指派（REQ-0040）** | 完整 | 完整 | 完整 | ❌（建立完成後可維護服務項目）| ❌ | ❌ |
| **專案建立（REQ-0040）** | 完整 | 完整 | 完整 | 完整 | 完整（負責品牌）/ 唯讀（其他） | 唯讀 |
| **服務項目管理（REQ-0044）** | 完整（含停用／刪除） | 完整（含停用／刪除） | 新增／修改 | 新增／修改 | 新增／修改 | 新增／修改 |
| **廠商名錄（REQ-0011，P1）** | 完整 | 完整 | 完整 | 完整 | 完整 | 完整 |
| **AR / AP（REQ-0050）** | 完整 | 完整 | 完整 | 完整 | 自身案件唯讀 | 完整 |
| **全成本試算（REQ-0051）** | 完整 | 完整 | 完整 | 完整 | 自身案件唯讀 | 唯讀 |
| **獎金引擎（REQ-0052，P1）** | 完整 | 全公司總覽（第三層放行） | 本部門獎金池與成員明細（第一層確認） | 全公司獎金總覽（第二層放行） | 自身數據唯讀 | 全公司獎金總表唯讀 |
| **績效認列引擎（REQ-0054，P1）** | 完整 | 全公司唯讀 | 本部門唯讀 | 全公司唯讀 | 自身數據唯讀 | 完整（月度認列確認 + 調整申請） |
| **老闆戰情室（REQ-0060，P1）** | 完整 | 完整 | 完整 | 完整 | — | — |
| **組織架構管理（REQ-0006，P1）** | 完整 | 完整 | 唯讀 | 唯讀 | 唯讀 | 唯讀 |
| **知識庫 REQ-0043（P2）** | 完整 | 完整 | 完整 | 完整 | 完整（自建）/ 唯讀（他人） | 完整（自建）/ 唯讀（他人）|
| **專案 Wiki REQ-0045（P2）** | 完整 | 完整 | 完整 | 完整 | 完整（自建）/ 唯讀（他人草稿不可見） | 完整（自建）/ 他人草稿不可見 |
| **系統設定（REQ-0002）** | 完整 | 完整 | 唯讀 | 唯讀 | — | — |
| **使用者管理（本 REQ）** | 完整 | 完整 | 試用期轉正（BR-001-05） | 試用期轉正（BR-001-05） | — | — |
| **稽核日誌（REQ-0003）** | 完整 | 完整 | ❌ | ❌ | — | — |
| **收件匣（REQ-0004）** | ● | ● | ● | ● | ● | ● |

> ⚠️ **v7.0 說明**：商機建立仍須透過「新增品牌」觸發（非獨立建立入口），所有角色操作邏輯一致。PM 現可建立開案交接（移除原限制）。Finance 繼承全部業務開發能力，實務上不設限。

### 6.2 操作層級權限定義

各模組的「完整」、「審核」、「唯讀」定義如下：

| 權限等級 | 允許的操作 |
|----------|-----------|
| **完整** | 建立、讀取、編輯、刪除（軟刪除）、匯出 |
| **審核** | 讀取、審核動作（approve / reject）；不可建立或編輯 |
| **建立 / 編輯 / 送審** | 建立、讀取、編輯（自己建立的）、送審；不可審核、不可刪除 |
| **唯讀** | 讀取；不可建立、編輯、刪除、審核 |
| **自評填寫** | 讀取（自身）、填寫自評欄位；不可填寫他人欄位 |
| **—** | 無存取權限，頁面不顯示、API 回傳 403 |

### 6.3 PM/PD「負責品牌」的判斷邏輯

✅ **v5.0 決策（B-20 resolved）**：採用**方案 A：以專案人員指派為準**。

> ⚠️ **業務規則（BR-001-01）**：PM/PD 在建立專案（REQ-0040）Step 4 中被指派為 MPM / SPM 後，系統自動授予該品牌的完整存取權限。對未被指派的品牌，PM/PD 僅有唯讀權限。

**實作規則：**
- `ProjectMember`（`user_id = PM/PD，assigned_to IS NULL`）記錄決定 PM/PD 的「負責品牌」清單（v7.4 取代原 OnboardingMember）
- 同一使用者可同時負責多個品牌（以各自的 ProjectMember 指派為準）
- PM/PD 換案時，由 Admin / Executive / Manager 在系統內執行「調整人員」操作（REQ-0040 §7）即可
- 開案前如有臨時查看需求，由 Manager 或 Admin 代為查閱或臨時調整

---

## 7. 資料模型

### 7.1 User 資料表

```
User {
  id                     UUID          PK
  name                   VARCHAR(100)  NOT NULL
  email                  VARCHAR(200)  NOT NULL, UNIQUE
  password_hash          VARCHAR(255)  NOT NULL
  is_active              BOOLEAN       DEFAULT true
  is_general_manager     BOOLEAN       DEFAULT false
                         -- true = 總經理 / 執行長（獎金模組全公司可見）
                         -- false = 部門主管（僅本部門）
                         -- ROLE_EXECUTIVE 帳號恆設為 true
  monthly_salary         DECIMAL(10,0) NOT NULL
                         -- 月薪（新台幣未稅整數）；REQ-0052 目標計算用
                         -- 僅 Admin / Finance 可查閱
                         -- ⚠️ v6.1：非 Admin / Executive 帳號建立時必填；
                         --          ROLE_ADMIN / ROLE_EXECUTIVE 帳號允許 NULL（不參與績效計算）
  probation_status       ENUM('probation','confirmed') DEFAULT 'confirmed'
                         -- 試用期狀態（v6.3 新增）
                         -- 'probation'  = 試用期中
                         -- 'confirmed'  = 已轉為正式員工（預設；Admin 手動轉正後設定）
                         -- 建立新帳號時若勾選「試用期」則設為 'probation'
  probation_start_date   DATE          NULL
                         -- 試用期起始日（v6.3 新增）；probation_status = 'probation' 時填入
  probation_end_date     DATE          NULL
                         -- 實際轉正日（v6.3 重新定義）
                         -- 原語意「試用期截止日（固定日期）」廢棄
                         -- 新語意：Admin 執行「轉為正式員工」操作時填入，即為轉正生效日
                         -- NULL = 試用期中尚未轉正；非 NULL = 已轉正，值為轉正日期
                         -- 計算折算薪資時以此欄位為當月正式計入的起算點
  can_unlock_performance BOOLEAN       DEFAULT false
                         -- Finance 帳號解鎖 PerformanceRecord 的權限旗標（v5.9）
  job_title              VARCHAR(50)   NULL
                         -- 職稱（v5.10 REQ-0006）；如 PD / MPM / PM / 執行
                         -- 顯示用，不影響 RBAC
  mfa_secret             VARCHAR(100)  -- TOTP 密鑰（加密儲存）
  mfa_enabled            BOOLEAN       DEFAULT false
  mfa_backup_codes       TEXT          -- 備用碼（加密儲存，JSON 陣列）
  last_login_at          TIMESTAMP
  password_changed_at    TIMESTAMP
  created_by             UUID          FK → User.id
  created_at             TIMESTAMP     DEFAULT now()
  updated_at             TIMESTAMP
}
```

> ⚠️ **v5.10 更新（REQ-0006）**：`User.department_id` 欄位**廢棄**。部門歸屬改由 `Appointment` 表管理（詳見 REQ-0006 §5）。績效計算所需的部門分組，改以 `Appointment.department_id`（`is_concurrent = false` 的那筆，即主職務）為準。既有 `OnboardingMember.department_id` 快照邏輯不受影響（快照時機改為「建立開案時，選定人員的主職務 Appointment.department_id」）。

> ⚠️ **v5.10 新增欄位說明（`job_title`）**：職稱由 Admin 或 Manager 在人員 Appointment 建立時填入，儲存於 `User.job_title`（最新值覆寫，歷史值見 Appointment 記錄）。用於組織圖展示與開案交接人員卡片顯示，不影響任何權限邏輯。

### 7.2 UserRole 資料表（多角色指派）

```
UserRole {
  id          UUID      PK
  user_id     UUID      NOT NULL, FK → User.id
  role        ENUM      ROLE_ADMIN | ROLE_EXECUTIVE | ROLE_MANAGER | ROLE_PM | ROLE_FINANCE
  assigned_by UUID      FK → User.id（指派者，需為 Admin）
  assigned_at TIMESTAMP DEFAULT now()
}

索引：UNIQUE(user_id, role)  -- 同一使用者同一角色只能有一筆
```

> ⚠️ **v5.10 新增 `ROLE_EXECUTIVE`**：僅限執行長帳號使用。系統建立時由 Admin 手動指派；正常情況下全系統只有一個帳號持有此角色。

### 7.3 Session 資料表

```
Session {
  id             UUID      PK
  user_id        UUID      NOT NULL, FK → User.id
  token_hash     VARCHAR(255) NOT NULL, UNIQUE
  device_info    TEXT
  ip_address     VARCHAR(45)
  created_at     TIMESTAMP DEFAULT now()
  last_active_at TIMESTAMP
  expires_at     TIMESTAMP
  is_revoked     BOOLEAN   DEFAULT false
}
```

### 7.4 Department 資料表

> ⚠️ **v5.10 重構（REQ-0006）**：`Department` 擴充為完整的組織架構主檔，含層級（`parent_id`）、分類（`dept_type`）、主管指派（`manager_user_id`）、部門職責說明與 Role 建議等欄位。完整規格見 **REQ-0006 §5.1**。S-09 後台設定改由 REQ-0006 頁面整合取代。

### 7.5 實體關係（v5.10 更新）

```
Department ──1:N──→ Appointment（department_id）  ← 取代原 Department → User 直連
Appointment ──N:1──→ User（user_id）
Appointment ──N:1──→ Position（position_id）
User       ──1:N──→ UserRole（多角色指派）
User       ──1:N──→ Session（多裝置登入）
User       ──1:N──→ AuditLog（操作者，REQ-0003）
UserRole 的 role ENUM 對應全系統的 RBAC 判斷
is_general_manager 旗標區分 ROLE_MANAGER / ROLE_EXECUTIVE 在獎金模組的資料可見範圍
```

---

## 8. API 介面設計（草稿）

### 8.1 建立使用者帳號（Admin only）

```
POST /api/v1/users

Request Body:
{
  "name": "白菜",
  "email": "baitcai@haoyang.com.tw",
  "roles": ["ROLE_PM", "ROLE_FINANCE"]   // 可同時指派多個角色
  // ⚠️ v5.10：department_id 欄位已廢棄，部門歸屬改由 POST /api/v1/appointments 管理
  // 建立帳號後，Admin 在組織架構管理中為其建立 Appointment（指定部門 + 職位）
}

Response 201:
{
  "user_id": "uuid",
  "name": "白菜",
  "email": "baitcai@haoyang.com.tw",
  "roles": ["ROLE_PM", "ROLE_FINANCE"],
  "is_active": true,
  "temporary_password_sent": true,     // 臨時密碼已寄出
  "created_at": "2026-05-11T10:00:00Z"
}

Response 422（Email 重複）:
{
  "error": "EMAIL_DUPLICATE",
  "message": "此 Email 已存在使用者帳號"
}
```

> 📋 **v6.2 建立帳號流程更新**：新增使用者表單已內建「組織任命」區塊，Admin 可於同一表單填入部門 + 職位 + 起始日，一步完成帳號建立與初始 Appointment。若組織任命區塊暫不填寫，系統正常建立帳號，並在該帳號的詳情頁顯示「尚未設定組織任命」提醒 badge。後續可直接於使用者詳情頁補填 Appointment，無需跳轉至其他頁面。

### 8.2 更新使用者角色（Admin only）

```
PUT /api/v1/users/{user_id}/roles

Request Body:
{
  "roles": ["ROLE_PM"]   // 覆蓋式更新，以此陣列為最終角色清單
}

Response 200:
{
  "user_id": "uuid",
  "roles": ["ROLE_PM"],
  "updated_at": "2026-05-11T11:00:00Z"
}
```

### 8.3 停用帳號（Admin only）

```
PATCH /api/v1/users/{user_id}/deactivate

Response 200:
{
  "user_id": "uuid",
  "is_active": false,
  "sessions_revoked": 3,              // 撤銷的 Session 數量
  "pending_workflows_warned": true    // 若有進行中的審核工作流，已觸發警告
}
```

### 8.4 登入

```
POST /api/v1/auth/login

Request Body:
{
  "email": "baitcai@haoyang.com.tw",
  "password": "P@ssw0rd123!"
}

Response 200（密碼正確，尚未完成 MFA）:
{
  "step": "mfa_required",
  "mfa_token": "short-lived-token",   // 短效 token，僅用於下一步 MFA 驗證
  "expires_in": 300                   // 5 分鐘內需完成 MFA
}

Response 401:
{
  "error": "INVALID_CREDENTIALS",
  "message": "Email 或密碼錯誤"
}

Response 403（帳號停用）:
{
  "error": "ACCOUNT_DISABLED",
  "message": "此帳號已停用，請聯繫系統管理員"
}
```

### 8.5 MFA 驗證

```
POST /api/v1/auth/mfa-verify

Request Body:
{
  "mfa_token": "short-lived-token",   // 來自 8.4 的 mfa_token
  "otp_code": "123456"                // 使用者輸入的 6 位 TOTP 碼
}

Response 200（驗證成功）:
{
  "access_token": "jwt-token",
  "expires_in": 28800,                // 8 小時
  "user": {
    "id": "uuid",
    "name": "白菜",
    "roles": ["ROLE_PM", "ROLE_FINANCE"]
  }
}

Response 401:
{
  "error": "INVALID_OTP",
  "message": "驗證碼錯誤或已過期"
}
```

### 8.6 取得目前登入使用者資訊

```
GET /api/v1/auth/me

Response 200:
{
  "user_id": "uuid",
  "name": "白菜",
  "email": "baitcai@haoyang.com.tw",
  "roles": ["ROLE_PM", "ROLE_FINANCE"],
  "effective_permissions": {          // 前端可用此列表判斷 UI 顯示
    "customer": "full",
    "opportunity": "full",
    "quote": "submit",
    "contract": "read",
    "project": "full_own",
    ...
  },
  "mfa_enabled": true,
  "last_login_at": "2026-05-11T09:00:00Z"
}
```

---

## 9. UI 規格

### 9.1 使用者管理頁（Admin 限定）

**列表欄位**：姓名、Email、角色 badge（可多個）、現職部門（來自有效 Appointment）、帳號狀態（啟用 / 停用）、最後登入時間、建立日期

> ⚠️ **v6.2 更新**：「現職部門」欄位顯示該人員有效 Appointment 中 `is_concurrent = false` 的主職務部門名稱；若尚未建立 Appointment，顯示「—（未設定）」並以 badge 標示。

**操作**：新增使用者、編輯（姓名 / Email / 角色 / 月薪）、停用 / 啟用、重設密碼

**篩選**：角色（多選）、部門（多選，來源為有效 Appointment）、帳號狀態

---

**新增使用者表單（v6.2 整合版）**

表單分為兩個區塊，依序填寫：

**區塊一：帳號基本資訊（必填）**

| 欄位 | 說明 | 必填 |
|------|------|------|
| 姓名 | `User.name` | ✅ |
| Email | `User.email`，不可重複 | ✅ |
| 系統角色 | `UserRole.role`，至少 1 個 | ✅ |
| 月薪 | `User.monthly_salary`；非 Admin / Executive 必填（BR-001-04） | ✅（業務角色）|
| is_general_manager | 僅 ROLE_MANAGER 帳號顯示此選項；勾選 = 總經理 | 條件顯示 |
| 試用期 | 勾選後設 `probation_status = probation`，並填入起始日（`probation_start_date`）；轉正操作於詳情頁執行 | 條件必填（勾選試用期後，起始日為必填）|

**區塊二：組織任命（選填，可事後補填）**

| 欄位 | 說明 | 必填 |
|------|------|------|
| 部門 | 從有效 Department 下拉選取 | — |
| 職位 | 從 Position 主檔下拉選取 | — |
| 主 / 兼任 | `is_concurrent`，預設「主職務」 | — |
| 起始日 | `Appointment.effective_from`，預設今日 | — |
| 備註 | `Appointment.note` | — |

> 📋 **區塊二填寫邏輯**：若選擇部門後，系統自動讀取 `Department.suggested_role` 並顯示提示「建議同時賦予 [ROLE_XXX]」；Admin 確認後系統於帳號建立時一併寫入 UserRole。若區塊二留空，帳號仍正常建立，系統於該帳號列表列與詳情頁顯示「尚未設定組織任命」badge，直到補填為止。

### 9.2 使用者詳情頁（v6.2 升級）

> ⚠️ **v6.2 重構**：「組織任命」區塊從唯讀連結升級為可直接操作（新增 / 終止 Appointment），使用者詳情頁成為人員完整資料的單一管理入口。PAGE-06-L2-03 仍保留，供從部門視角管理人員使用（兩者資料來源相同，操作互通）。

```
使用者詳情頁
├── 【區塊一】帳號基本資訊（可編輯）
│   ├── 姓名、Email、帳號狀態（啟用 / 停用）
│   ├── 職稱（job_title，顯示用，跟隨最新 Appointment 自動更新）
│   ├── 月薪（monthly_salary，僅 Admin / Finance 可見及編輯）
│   ├── 試用期狀態（probation_status）：試用期中 / 正式員工（badge 顯示）
│   ├── 試用期起始日（probation_start_date，probation_status = probation 時顯示）
│   ├── 轉正日（probation_end_date，已轉正時顯示；試用期中顯示「尚未轉正」）
│   └── is_general_manager 旗標（僅 ROLE_MANAGER 帳號顯示）
│
├── 【區塊二】系統角色（可編輯）
│   └── 目前角色 badge 清單（可新增 / 移除角色）
│
├── 【區塊三】組織任命（可直接操作，v6.2 升級）
│   ├── 現有 Appointment 清單
│   │   欄位：部門 | 職位 | 主 / 兼任 | 起始日 | 結束日 | 備註 | 操作
│   ├── [＋ 新增任命] 按鈕：展開 inline 表單（部門 / 職位 / 主兼任 / 起始日）
│   │   → 填寫後儲存，系統同步顯示 suggested_role 提示
│   └── [終止] 按鈕：填入結束日（effective_to），不刪除記錄
│
│   ⚠️ 業務規則同 REQ-0006 BR-006-01 ~ BR-006-04
│   （同一人員同一部門同時只能有一筆有效 Appointment）
│
├── 【區塊四】MFA 狀態
│   └── 已啟用 / 未啟用 + [強制重設 MFA]（Admin 用）
│
├── 【區塊五】登入記錄
│   └── 最後 10 筆登入時間 + IP（唯讀）
│
└── 【區塊六】操作記錄
    └── 連結至稽核日誌，以此使用者為 Filter（唯讀）
```

**尚未設定組織任命的狀態處理：**

若該帳號無任何有效 Appointment，區塊三顯示空狀態提示「此人員尚未設定組織任命，請點擊＋新增任命」，並在頁面頂部 header 顯示橙色 badge「組織任命未設定」。

---

**試用期轉正操作（v6.3 新增，僅 Admin / Manager 可操作）**

當 `probation_status = 'probation'` 時，區塊一底部顯示操作卡：

```
┌─────────────────────────────────────────────────────┐
│ 🟡 試用期中                                          │
│ 起始日：2026-07-01                                   │
│                                                     │
│ [轉為正式員工]  ← 點擊後跳出確認 Modal               │
└─────────────────────────────────────────────────────┘
```

**轉正確認 Modal：**

```
確認轉為正式員工

人員：蘋果
轉正生效日：[日期選擇器，預設今日]

系統將執行：
・probation_status → confirmed
・probation_end_date = 選定日期（轉正日）
・自該日起，月薪依比例計入當月部門績效目標

[取消]  [確認轉正]
```

**轉正後計算邏輯說明（顯示於 Modal）：**
轉正當月的有效薪資 = `monthly_salary × (轉正後工作天數 / 當月總工作天數)`

例：某人員 7 月 16 日轉正，7 月共 23 個工作天，轉正後剩餘 12 個工作天：
有效薪資 = 月薪 × (12 / 23) ≈ 52.2%

> ⚠️ **業務規則（BR-001-05，v6.3 新增）**：轉正操作由 Admin 或 Manager 執行，轉正日可選擇任意過去或當日日期（不允許未來日期）。操作記錄寫入稽核日誌（actor、target_user、confirmed_date）。轉正後 `probation_status` 不可由 UI 改回 `probation`；如確實需要更正轉正日，由 Admin 直接在使用者詳情頁修改 `probation_end_date`（欄位可編輯）；如需撤銷轉正（將狀態從 confirmed 改回 probation），需由 Admin 透過後台資料庫操作，並補記說明至稽核日誌，此屬例外流程不開放 UI 操作。

### 9.3 首次登入強制流程（使用者視角）

```
Step 1：輸入 Email + 臨時密碼登入
    ↓
Step 2：強制修改密碼（符合密碼政策）
    ↓
Step 3：設定 MFA
    ├── 顯示 QR Code 供掃描（TOTP）
    ├── 使用者輸入 App 產生的 6 位碼確認
    └── 顯示 10 組備用碼，要求使用者確認已儲存
    ↓
Step 4：進入系統主頁
```

### 9.3b 全域 Sidebar 導覽列結構

系統採用**左側固定 Sidebar** 作為全域導覽，分為七個分區，各分區項目依登入角色動態顯示或隱藏（`data-roles` RBAC 控制）。

#### 分區結構與項目

| 分區 | 選單項目 | 備註 |
|------|---------|------|
| **工作台** | 系統首頁、組織架構、待辦審核、老闆戰情室 | 待辦審核顯示未審數量 badge |
| **客戶管理** | 客戶資料庫、商機漏斗、客戶分級 | |
| **報價管理** | 報價單、合約、服務項目 | |
| **委外管理** | 廠商名錄、廠商採購（委外）、委外進度管理 | 委外進度管理為預留佔位，對應功能模組待定 |
| **專案執行** | 專案管理、全域知識庫 | |
| **財務管理** | AR 應收、AP 應付、廣告花費管理、獲利試算、結案評核、獎金試算 | |
| **後台管理** | 使用者管理、系統設定、稽核日誌 | |

#### Sidebar 視覺結構示意

```
┌─────────────────────────┐
│  [昊揚 Logo]  系統名稱  [‹]│  ← 頂部 Logo + Collapse 按鈕
├─────────────────────────┤
│  工作台                  │
│    系統首頁              │
│    組織架構              │
│    待辦審核        [3]   │  ← 未審件數 badge
│    老闆戰情室            │
│                         │
│  客戶管理                │
│    客戶資料庫  ●         │  ← active：左側紅色 border
│    商機漏斗              │
│    客戶分級              │
│                         │
│  報價管理                │
│    報價單                │
│    合約                  │
│    服務項目              │
│                         │
│  委外管理                │
│    廠商名錄              │
│    廠商採購（委外）       │
│    委外進度管理  ░░░     │  ← disabled（功能待建）
│                         │
│  專案執行                │
│    專案管理              │
│    全域知識庫            │
│                         │
│  財務管理                │
│    AR 應收               │
│    AP 應付               │
│    廣告花費管理          │
│    獲利試算              │
│    結案評核              │
│    獎金試算              │
│                         │
│  後台管理                │
│    使用者管理            │
│    系統設定              │
│    稽核日誌              │
├─────────────────────────┤
│  ● YW  Yvonne Wu        │  ← 底部登入者資訊
└─────────────────────────┘
```

#### Sidebar 互動與版面規格

| 項目 | 規格 |
|------|------|
| 展開寬度 | `min(240px, 20vw)` |
| 收合寬度 | `48px`（僅顯示圖示） |
| 收合觸發 | 頂部 `[‹]` 按鈕，點擊 toggle |
| RWD 自動收合 | `≤ 900px` 時自動切換為圖示模式 |
| 收合後隱藏內容 | 品牌名稱、分區標籤、文字、badge、使用者姓名 |
| Active 樣式 | 左側紅色 2px border + 文字紅色 + 粗體 |
| Disabled 樣式 | `opacity: 0.35`、`pointer-events: none`（用於功能待建項目） |
| 通知 badge | 數字 badge（未審件數超過 99 顯示「99+」，為 0 時隱藏） |
| 捲軸 | 預設透明，hover 顯示（4px 細捲軸） |

#### RBAC 控制原則

- 每個選單項目帶 `data-roles` 屬性，列舉可見角色
- 角色切換時，不在清單內的項目執行隱藏；若分區內所有項目均隱藏，整個分區標題一併隱藏
- 詳細各角色可見項目對照見 **IA Sitemap v4.3 §三：角色導覽視圖**

> ⚠️ **待更新（與 IA Sitemap 同步）**：IA Sitemap v4.3 的分區命名（CRM 區塊、業務流程區塊等）尚未對齊本節分區命名（客戶管理、報價管理、委外管理等），下次 IA Sitemap 更新時需同步。

---

### 9.4 導覽列角色標示

導覽列右上角顯示目前登入使用者的姓名與角色，多角色時顯示最高權限角色：

```
[昊揚 Logo]  客戶  商機  報價  專案  財務  ...   [白菜（PM / Finance）▼]
```

---

## 10. 驗收標準（Acceptance Criteria）

### AC-001：首次登入強制修改密碼

```gherkin
Given Admin 為「白菜」建立帳號，系統寄出臨時密碼
When 白菜使用臨時密碼登入
Then 系統強制導向「修改密碼」頁面
And 不允許進入任何其他頁面，直到密碼修改完成
And 臨時密碼修改成功後，導向 MFA 設定頁面
```

### AC-002：MFA 未設定前無法存取系統

```gherkin
Given 白菜已修改初始密碼，但尚未設定 MFA
When 白菜嘗試存取任何系統頁面（如客戶列表）
Then 系統自動重定向至 MFA 設定頁面
And 頁面顯示「請先設定多因素認證才能使用系統」
```

### AC-003：多角色兼任取聯集

```gherkin
Given 白菜同時持有 ROLE_PM 和 ROLE_FINANCE 兩個角色
When 白菜登入並存取商機漏斗
Then 白菜可以透過新增品牌建立商機（全角色共同擁有業務開發能力，商機由新增品牌觸發，無獨立建立商機入口）
And 白菜可以查看並操作自己負責的專案（PM 權限）
And 白菜可以完整操作 AR/AP（Finance 權限）
And GET /api/v1/auth/me 回傳的 roles 包含兩個角色
```

### AC-004：停用帳號立即失效

```gherkin
Given 白菜目前已登入（有效 Session），Admin 將其帳號停用
When 白菜在目前的瀏覽器繼續操作（如送出 API 請求）
Then 系統回傳 403 ACCOUNT_DISABLED
And 白菜被強制登出
And 白菜嘗試重新登入時，系統顯示「此帳號已停用」
```

### AC-005：RBAC 阻擋未授權存取

```gherkin
Given 白菜只有 ROLE_PM 角色（無 Manager 或 Admin 權限）
When 白菜嘗試存取老闆戰情室頁面
Then 導覽列不顯示「財務」/ 「戰情室」選項（UI 層隱藏）
And 若直接呼叫 GET /api/v1/dashboard/boss-view，API 回傳 403
```

### AC-006：PM/PD 只能完整操作負責案件

```gherkin
Given 白菜只有 ROLE_PM/PD 角色，被指派負責「老撈麻辣鍋」案件
When 白菜進入「老撈麻辣鍋」的專案頁面
Then 白菜可以編輯專案內容
When 白菜嘗試編輯「另一個品牌」的專案頁面
Then 系統顯示唯讀模式，所有編輯按鈕為停用狀態
And API 回傳 403
```

### AC-007：密碼複雜度驗證

```gherkin
Given 白菜嘗試將密碼改為「password123」（無大寫、無特殊符號）
When 白菜送出密碼修改請求
Then 系統顯示「密碼須包含大寫字母、小寫字母、數字、特殊符號各至少 1 個」
And 密碼不更新
```

### AC-008：臨時密碼 24 小時後失效

```gherkin
Given Admin 於 2026/05/10 10:00 為「小明」建立帳號並寄出臨時密碼
When 小明於 2026/05/11 11:00（超過 24 小時）嘗試使用臨時密碼登入
Then 系統回傳 401 並顯示「臨時密碼已過期，請聯繫系統管理員重新發送」
```

### AC-009：帳號停用觸發工作流警告

```gherkin
Given 審核者「Sam」目前有一個 pending_approval 狀態的 WorkflowInstance
When Admin 停用 Sam 的帳號
Then 系統在停用確認彈窗中顯示警告「Sam 目前有 1 個進行中的審核任務，停用後需重新指定審核者」
And Admin 確認後，WorkflowInstance 的 approver 欄位標記為需要重新指定
And 系統通知其他 Admin / Manager「Sam 的審核任務需要重新指派」
```

### AC-010：非 Admin / Executive 帳號建立時月薪必填（v6.1 新增）

```gherkin
Given Admin 建立一個角色為 ROLE_PM 的新帳號「白菜」，月薪欄位留空
When Admin 點擊「確認建立」
Then 系統顯示驗證錯誤「請填寫月薪，此欄位為績效目標計算必要資料」
And 帳號不建立

Given Admin 建立一個角色為 ROLE_ADMIN 的帳號，月薪欄位留空
When Admin 點擊「確認建立」
Then 系統正常建立帳號（ROLE_ADMIN 不參與績效計算，允許月薪為空）

Given Admin 建立一個角色為 ROLE_FINANCE 的新帳號「白菜」，月薪填入 50000
When Admin 點擊「確認建立」
Then 系統成功建立帳號
And User.monthly_salary = 50000
```

### AC-011：新增人員表單含組織任命一步完成（v6.2 新增）

```gherkin
Given Admin 開啟新增使用者表單
When Admin 填入姓名「蘋果」、Email、角色 ROLE_PM、月薪 60000
And Admin 在區塊二選擇「整合行銷部」、職位「PM」、起始日「2026-07-01」
And 系統顯示「建議賦予 ROLE_PM」提示，Admin 確認
When Admin 點擊「確認建立」
Then 系統一次建立 User 帳號、寫入 UserRole（ROLE_PM）、建立 Appointment
And 使用者列表中「蘋果」的現職部門顯示「整合行銷部」
And 使用者詳情頁組織任命區塊顯示該筆 Appointment

Given Admin 開啟新增使用者表單
When Admin 填入必填欄位，但區塊二（組織任命）留空
When Admin 點擊「確認建立」
Then 系統正常建立帳號
And 使用者列表「蘋果」的現職部門欄位顯示「—（未設定）」
And 使用者詳情頁頂部顯示橙色 badge「組織任命未設定」
```

### ### AC-012：使用者詳情頁直接新增 / 終止 Appointment（v6.2 新增）

```gherkin
Given 帳號「蘋果」目前無組織任命記錄
When Admin 進入蘋果的使用者詳情頁
Then 區塊三顯示空狀態「此人員尚未設定組織任命，請點擊＋新增任命」

When Admin 點擊「＋ 新增任命」，填入部門「數位廣告一部」、職位「PM」、起始日「2026-07-01」
And 系統顯示「建議賦予 ROLE_PM」，Admin 確認
Then 系統建立 Appointment 並寫入 ROLE_PM 至 UserRole
And 詳情頁組織任命清單立即顯示該筆記錄
And 頂部 badge「組織任命未設定」消失

Given 帳號「蘋果」有一筆有效 Appointment（整合行銷部 / PM）
When Admin 點擊該筆 Appointment 的「終止」，填入結束日「2026-09-30」
Then 系統將 Appointment.effective_to 設為 2026-09-30，記錄保留不刪除
And 系統顯示確認提示「是否同時移除對應的 ROLE_PM？」，Admin 決定
```

### AC-013：試用期轉正操作（v6.3 新增）

```gherkin
Given 帳號「蘋果」建立時勾選試用期，probation_status = 'probation'，起始日 2026-07-01
When Admin 進入蘋果的使用者詳情頁
Then 區塊一顯示試用期狀態 badge「🟡 試用期中」
And 顯示操作卡「試用期中 / 起始日：2026-07-01 / [轉為正式員工]」

When Admin 點擊「轉為正式員工」，填入轉正日 2026-07-16，點擊「確認轉正」
Then 系統將 probation_status → 'confirmed'
And probation_end_date = 2026-07-16
And 試用期狀態 badge 更新為「✅ 正式員工」
And 操作卡消失
And 稽核日誌記錄：操作者、目標人員、轉正日

Given 7 月共 23 個工作天，蘋果轉正後剩餘 12 個工作天
When 系統計算 7 月部門目標金額
Then 蘋果的有效薪資 = monthly_salary × (12 / 23)
And 8 月起蘋果全額計入 monthly_salary

Given 帳號「芭樂」probation_status = 'probation'（試用期中）
When 系統計算部門目標金額
Then 芭樂的薪資完全排除在外（不折算，直接 0）
```

---

## 11. 安全性規格

### 11.1 密碼儲存

- 密碼一律使用 **bcrypt**（cost factor ≥ 12）或 **Argon2id** 雜湊後儲存
- 絕對不儲存明文密碼，不以可逆加密儲存
- MFA 密鑰使用 AES-256 加密後儲存（加密金鑰存於環境變數，不入版本控制）

### 11.2 登入防護

| 機制 | 規格 |
|------|------|
| 連續失敗鎖定 | 同一帳號連續 5 次登入失敗，鎖定 15 分鐘 |
| 鎖定通知 | 帳號被鎖定時，寄送通知 Email 至該帳號 |
| Rate Limiting | 登入 API 每 IP 每分鐘最多 10 次請求 |
| 暴力破解防護 | 在 Rate Limiting 之上，考慮加入 CAPTCHA（待技術確認） |

### 11.3 傳輸安全

- 所有 API 通訊強制 HTTPS / TLS 1.2+
- HTTP 請求自動 301 重定向至 HTTPS
- HSTS（HTTP Strict Transport Security）啟用

### 11.4 Token 安全

- Access Token 採 JWT，不儲存敏感資料於 payload
- Token 使用 RS256（非對稱加密）簽名，私鑰存於環境變數
- Refresh Token（若實作）存於 HttpOnly Cookie，不可被 JavaScript 讀取
- Token 撤銷：帳號停用、密碼修改後，所有現有 Token 立即失效

---

## 11.1 虛擬廠商「昊揚」機制（v5.4 → v8.8 更新）

> ⚠️ **v8.8 設計變更**：v5.4 的「客戶主檔建立昊揚內部客戶記錄」方向已正式捨棄。改採 B-46 resolved 方案：在**廠商名錄**建立「昊揚顧問股份有限公司（內部）」Vendor 記錄，並標記 `is_internal = true`。

✅ **B-46 resolved（v8.8）**：跨部門內部交易（如廣告部委託設計部產圖）透過在廠商名錄新增 `is_internal = true` 的 Vendor 記錄實作。

- Admin 在廠商名錄建立「昊揚顧問股份有限公司（內部）」，標記 `is_internal = true`
- PM/PD 發起採購申請時選擇此廠商，採購申請流程與外部廠商相同（走 VENDOR_COST 工作流）
- 系統自動建立 APRecord，AP 的會計科目由 Finance 手動標註（內部轉帳科目與外部廠商不同）
- 內帳的一正一負績效調整邏輯：委託方績效扣除，支援方績效加回，不影響外部總營收（此邏輯維持不變）

---

## 12. 待確認事項

| 編號 | 類型 | 問題 | 負責人 | 狀態 |
|------|------|------|--------|------|
| T-02 | 技術確認 | MFA 實作方式：TOTP（建議）vs. SMS OTP vs. Email OTP？ | 後端工程師 | `open` |
| T-12 | 技術確認 | JWT 的 Refresh Token 是否實作？若實作，有效期設定多久？ | 後端工程師 | `open` |
| T-13 | 技術確認 | CAPTCHA 方案：是否在登入失敗次數達到門檻前加入 CAPTCHA（如 hCaptcha）？ | 後端工程師 | `open` |
| B-52 | 業務決策 | 帳務鎖定後解鎖的角色定義 | — | ✅ `resolved`（v5.9）：Finance 最高層（`can_unlock_performance = true`）或 Admin；解鎖操作記入稽核日誌 |
| B-53 | 業務決策 | ECPay 電子發票觸發方式 | 業主 | ✅ `resolved`（v5.6）：方案 B，客戶回簽上傳後 Finance 手動點擊開立；需記錄發票資訊供會計系統導入 |
| B-54 | 業務決策 | Layer 2 部門達標目標金額設定方式 | 業主 | ✅ `resolved`（v5.6）：部門所有成員 User.monthly_salary 加總 × 部門達標倍率（S-08）；系統自動計算 |

---

## 13. 與其他 REQ 的關係

```
REQ-0001（使用者管理 + RBAC）← 本文件
  │  所有模組的前置依賴，提供：
  ├─→ 使用者身份（User.id）供所有操作記錄「操作者」
  ├─→ 角色（roles）供所有 API 進行權限驗證
  ├─→ 停用帳號 → 觸發 REQ-0030（工作流引擎）警告機制
  ├─→ 帳號清單 → REQ-0002（系統設定）設定審核者時使用
  ├─→ 帳號清單 → REQ-0025（開案交接）指派人員時使用
  └─→ 所有操作 → REQ-0003（稽核日誌）記錄操作者

開發排程依賴：
  REQ-0001 必須是第一個完成的模組，
  其他所有 P0 模組（REQ-0010、REQ-0020、REQ-0021 等）
  都需要 REQ-0001 的 User 表與 RBAC 中介層先就位。
```

---

*— REQ-0001 規格文件結束 —*  
*Foundation 層 REQ-0001 完成。*  
*下一個建議：REQ-0002（系統設定）— Foundation 層第二支柱，或 REQ-0040（專案建立）— 業務主線的下一站*

---

# §1b｜REQ-0006 組織架構管理

| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0006 |
| **Use Case ID** | UC-006 |
| **所屬模組** | F-00 Foundation 層 |
| **優先級** | `P1` |
| **狀態** | `open` — v5.10 新增規格；v7.4 新增 `department_type` 欄位（REQ-0040 部門組合制依賴）|
| **最後更新** | 2026-06-24（v7.4 更新） |
| **依賴關係** | REQ-0001（User / UserRole）、REQ-0052（績效目標計算）、REQ-0054（PerformanceRecord）、REQ-0030（WorkflowConfig 審核者查找） |

---

## 1. 背景與設計動機

昊揚現有 PRD 的 `Department` 僅為扁平清單，`User.department_id` 為單值 FK，無法表達：

- 多層級組織結構（執行長 → 總經理 → 部門主管 → 成員）
- 一人同時擔任多個部門職務（如 Jayroz 同時為整合行銷部主管 + 創意視覺部代理主管）
- 部門職責說明、部門類型（計績效 vs. 不計績效）
- 組織圖視覺化展示

REQ-0006 的目的：建立完整的組織架構管理模組，以 `Appointment`（任命記錄）為核心，讓組織職務與系統角色（RBAC）解耦，並提供全員可查的組織圖展示頁。

---

## 2. 功能描述

> 系統應提供多層級部門管理、職位主檔維護、人員任命記錄（含兼任）、組織圖視覺化展示，以及與工作流引擎和績效模組的整合；Admin 與 Manager 可管理組織資料，全體員工可查看組織圖。

---

## 3. 核心設計原則

**RBAC（系統權限）與組織職務（Appointment）完全解耦：**

```
User（人）
  ├── UserRole → 系統操作權限（能做什麼功能）
  └── Appointment → 組織職務（在哪個部門、是什麼職位、算哪份績效）
```

- 調整組織職務不自動修改系統角色；調整系統角色不自動修改組織職務
- Admin 建立 Appointment 時，系統 UI 依 `Department.suggested_role` 提示「建議賦予角色」，Admin 確認後才寫入 UserRole

---

## 4. 功能規格

### 4.1 部門管理

Admin 可管理部門主檔，支援：

| 操作 | 規則 |
|------|------|
| 新增部門 | 填入名稱（必填）、類型、上層部門、職責說明、建議角色；名稱全域不可重複 |
| 編輯部門 | 名稱、職責說明、建議角色、排序可隨時修改；變更立即生效 |
| 調整層級 | 修改 `parent_id` 即可；子部門隨父部門一同顯示於組織圖 |
| 停用部門 | 標記 `is_active = false`；現有 Appointment 保留歷史值；下拉選單隱藏此部門 |
| 刪除部門 | **不支援硬刪除**，僅可停用，以保護歷史 Appointment 與績效快照完整性 |

**部門類型（`dept_type`）對績效計算的影響：**

| dept_type | 說明 | 計入績效目標 |
|-----------|------|------------|
| `business` | 業務執行部門（廣告/電商/整合/創意） | ✅ 是 |
| `support` | 輔助行政部門（財務行政部、總經理室） | ❌ 否 |
| `executive` | 執行長室（頂層） | ❌ 否 |

### 4.2 職位管理

Admin 可管理職位主檔（Position），系統預設職位如下，可新增：

| 職位名稱 | `position_level` | 說明 |
|---------|-----------------|------|
| 執行長 | `executive` | 取得 ROLE_EXECUTIVE 同等業務審核權 |
| 總經理 | `executive` | 取得 is_general_manager = true 全公司可見範圍 |
| 部門主管 | `head` | 業務部門審核（第一層）、獎金分配確認 |
| PD | `senior` | 高階執行，不具審核流特殊權 |
| MPM | `senior` | 同上 |
| PM | `member` | 一般執行 |
| 執行 | `member` | 一般執行 |

### 4.3 任命管理（Appointment）

Admin 或 Manager 可為人員新增任命記錄：

**新增任命流程：**
```
選擇人員 → 選擇部門 → 選擇職位 → 填入起始日
  → 系統顯示「建議賦予角色：[ROLE_XXX]」提示（來自 Department.suggested_role）
  → Admin 確認或取消建議角色
  → 儲存 Appointment + （若確認）寫入 UserRole
```

**終止任命：**
- 填入 `effective_to` 日期即視為任命終止；不刪除記錄（歷史稽核）
- 同時確認是否移除對應 UserRole（系統提示，Admin 決定）

**業務規則：**

> ⚠️ **BR-006-01**：同一人員在同一部門同一時間只能有一筆有效 Appointment（`UNIQUE(user_id, department_id)` WHERE `effective_to IS NULL`）。

> ⚠️ **BR-006-02**：管理職（`position_level IN (executive, head)`）跨部門兼任時，績效計算只取 `dept_type = business` 的 Appointment 所屬部門。`dept_type IN (support, executive)` 的 Appointment 不計入任何部門績效目標。

> ⚠️ **BR-006-03**：執行人員（`position_level IN (senior, member)`）同一時間只允許一筆有效 Appointment（系統層面驗證，不支援執行層跨部門）。

> ⚠️ **BR-006-04**：`is_concurrent` 欄位用於標記兼任關係（非主職務）。對管理職而言，主職務（`is_concurrent = false`）通常為其行政歸屬部門；業務部門兼任為副職（`is_concurrent = true`）。績效計算不區分主副，只區分 `dept_type`。

### 4.4 與工作流引擎的整合

WorkflowConfig 審核者查找邏輯更新（v5.10）：

```
原邏輯：找 ROLE_MANAGER 的使用者
新邏輯：找有效 Appointment 中 position_level IN (head, executive) 的使用者
        且 Appointment.department_id = 案件所屬部門（或全公司層級）

具體步驟：
1. 取得案件關聯部門（從 OnboardingMember.department_id 或 ARRecord 等）
2. 查詢 Appointment WHERE department_id = 案件部門
              AND position_level IN ('head', 'executive')
              AND effective_to IS NULL（仍在任）
3. 此人員列表即為該部門的有效審核者
4. 若為全公司審核流（如 EXEC_BONUS_APPROVAL）：查詢 position_level = 'executive' 者
```

### 4.5 組織圖展示頁

全員可查看，Admin / Manager 可編輯（點擊進入後台）。

**展示內容：**
- 樹狀組織圖（依 `Department.parent_id` + `sort_order` 渲染）
- 每個部門節點顯示：部門名稱、主管姓名、成員人數
- 點擊部門節點：展開成員清單（姓名 + 職稱 + 兼任標記）
- 部門職責說明 Tooltip（hover 顯示 `dept_description`）
- 兼任人員在副職部門顯示「兼任」標記

---

## 5. 資料模型

### 5.1 Department（v5.10 擴充 / v7.4 新增 department_type）

```sql
Department {
  id               UUID          PK
  name             VARCHAR(100)  NOT NULL, UNIQUE
  dept_type        ENUM('business','support','executive')  NOT NULL
                   -- business:  業務執行部門，計入績效目標
                   -- support:   輔助行政部門，不計績效（財務行政部、總經理室）
                   -- executive: 執行長室，不計績效
  department_type  ENUM('consulting','advertising','integrated','design','other')  NULL
                   -- ✅ v7.4 新增（REQ-0040 部門組合制）
                   -- consulting:  運營型部門（電商營運一部、二部等）→ 顧問服務費
                   -- advertising: 廣告型部門（數位廣告一、二、三部等）→ 廣告費
                   -- integrated:  整合行銷部門 → 整合行銷費
                   -- design:      設計型部門（創意視覺部等）→ 設計費
                   -- other:       其他（財務行政部、總經理室等）→ 不參與專案部門組合
                   -- NULL = 尚未設定（建議上線前由 Admin 完成所有部門的設定）
  parent_id        UUID NULL     FK → Department.id  -- 上層部門；NULL = 頂層
  manager_user_id  UUID NULL     FK → User.id        -- 部門正式主管（顯示用）
  dept_description TEXT NULL                         -- 部門職責說明
  suggested_role   ENUM NULL     -- 建議賦予角色（UI 提示用，不強制）
                   -- ROLE_FINANCE | ROLE_MANAGER | ROLE_PM | NULL
  sort_order       INT           DEFAULT 0           -- 同層級顯示排序
  is_active        BOOLEAN       DEFAULT true
  created_by       UUID          FK → User.id
  created_at       TIMESTAMP     DEFAULT now()
  updated_at       TIMESTAMP
}
```

> ✅ **v7.4 新增（department_type）**：供 REQ-0040 建立專案時，依報價單費用類型判斷哪些部門類型為必填，並在表單中為每個部門類型選擇對應的實際部門。Admin 應在系統上線前完成所有業務部門的 `department_type` 設定；`dept_type = support / executive` 的部門設為 `other`，不參與專案部門組合。

### 5.2 Position（職位主檔，v5.10 新增）

```sql
Position {
  id             UUID         PK
  name           VARCHAR(50)  NOT NULL, UNIQUE  -- 執行長 / 總經理 / 部門主管 / PD / MPM / PM / 執行
  position_level ENUM('executive','head','senior','member')  NOT NULL
                 -- executive: 執行長/總經理層，擁有全公司業務審核最終放行權
                 -- head:      部門主管層，擁有部門審核權（第一層）
                 -- senior:    資深執行，無特殊審核權
                 -- member:    一般執行，無特殊審核權
  is_active      BOOLEAN      DEFAULT true
  created_at     TIMESTAMP    DEFAULT now()
}
```

### 5.3 Appointment（任命記錄，v5.10 新增）

```sql
Appointment {
  id              UUID     PK
  user_id         UUID     NOT NULL  FK → User.id
  department_id   UUID     NOT NULL  FK → Department.id
  position_id     UUID     NOT NULL  FK → Position.id
  is_concurrent   BOOLEAN  DEFAULT false
                  -- false: 主職務（行政歸屬部門）
                  -- true:  兼任（副職，如管理職兼代業務部門主管）
  effective_from  DATE     NOT NULL
  effective_to    DATE NULL          -- NULL = 仍在任；填入日期 = 任命終止
  note            TEXT NULL          -- 備註（如「代理」原因等）
  created_by      UUID     FK → User.id
  created_at      TIMESTAMP
  revoked_by      UUID NULL FK → User.id
  revoked_at      TIMESTAMP NULL
}

唯一約束：UNIQUE(user_id, department_id) WHERE effective_to IS NULL
          -- 同一人在同一部門同一時間只能有一筆有效任命
```

### 5.4 實體關係

```
Department  ──parent_id──→  Department（自我參照，樹狀結構）
Department  ──1:N──→  Appointment（department_id）
Position    ──1:N──→  Appointment（position_id）
User        ──1:N──→  Appointment（user_id）
User        ──1:N──→  UserRole（系統角色，獨立管理）
```

---

## 6. 績效計算整合（與 REQ-0052 / REQ-0054 的銜接）

**部門目標金額計算（更新 BR-052-01）：**

```sql
-- 計算某部門（business 類型）的目標金額（含轉正當月折算，v6.3 更新）
SELECT SUM(
  CASE
    -- 轉正日落在計算月份內：折算薪資
    WHEN u.probation_end_date >= :calc_month_start
     AND u.probation_end_date <= :calc_month_end
    THEN u.monthly_salary
         * ((:calc_month_end - u.probation_end_date + 1)::float
            / :calc_month_workdays)
    -- 轉正日早於計算月份，或從未試用（probation_end_date IS NULL）：全額
    ELSE u.monthly_salary
  END
) AS effective_salary_sum
FROM User u
JOIN Appointment a ON a.user_id = u.id
  AND a.department_id = :target_dept_id
  AND a.effective_to IS NULL                    -- 仍在任
JOIN Department d ON d.id = a.department_id
  AND d.dept_type = 'business'                  -- 只計業務部門
WHERE u.monthly_salary IS NOT NULL
  AND u.is_active = true
  AND u.probation_status = 'confirmed'          -- 非試用期中（v6.3：status 判斷）
-- 參數說明：
-- :calc_month_start    = 計算月份第一天
-- :calc_month_end      = 計算月份最後一天
-- :calc_month_workdays = 當月總工作天數（Finance 在 S-08 設定或系統計算）
```

**管理職兼任業務部門的特殊規則（BR-ORG-01）：**

- 若 Sam（總經理）有 Appointment 指向廣告一部（`dept_type = business`），其 `monthly_salary` 計入廣告一部目標
- Sam 在總經理室（`dept_type = support`）的 Appointment **不計入**任何部門績效目標
- 不重複計算：同一人在多個 business 部門有 Appointment 時，月薪計入各部門（視為同時擔任兩份職務，各部門各自承擔目標）

**OnboardingMember 快照邏輯更新（v5.10）：**

建立開案交接時，選定人員的快照邏輯改為：

```
ProjectMember.department_id 快照來源（v7.4；原為 OnboardingMember）：
  → 該人員在案件服務品牌所屬部門的 Appointment.department_id
  → 若人員有多個有效 Appointment，開案時由操作者指定使用哪個部門身份（系統顯示下拉選單）
  → 快照後不跟隨後續 Appointment 變動
```

---

## 7. UI 規格

### 7.1 組織圖展示頁（PAGE-06-L1-01，全員可讀）

```
組織圖頁面
├── 頁面標題：昊揚組織架構
├── 切換視圖：[樹狀圖] [部門列表]
├── 樹狀視圖
│   ├── 頂層：執行長室（白菜）
│   │   └── 總經理室（Sam）
│   │       ├── 電商營運一部（Joe）[成員 4 人]
│   │       ├── 電商營運二部（依依）[成員 1 人]
│   │       ├── 數位廣告一部（Sam 代）[成員 2 人]  ← 兼任標示
│   │       ├── ... 其他部門
│   │       └── 財務行政部（Tora）[成員 3 人]
│   └── 點擊部門節點 → 展開成員卡片清單
│       成員卡片：頭像 + 姓名 + 職稱 + [兼任] badge（若有）
├── Hover 部門節點 → Tooltip 顯示部門職責說明
└── [管理組織架構] 按鈕（Admin / Manager 可見）→ 進入後台管理
```

### 7.2 部門管理後台（PAGE-06-L2-01，Admin only）

```
部門管理
├── 部門清單（樹狀展示，可展開 / 收合）
│   欄位：部門名稱 | 類型 | 主管 | 在職人數 | 狀態 | 操作
├── [新增部門] → 表單（名稱、類型、上層部門、職責說明、建議角色、排序）
├── [編輯] → 同上表單
├── [停用] → 確認 Dialog（顯示「此部門仍有 N 人在任」警告）
└── 拖曳調整 sort_order（同層級）
```

### 7.3 職位管理後台（PAGE-06-L2-02，Admin only）

```
職位管理
├── 職位清單（名稱 | 層級 | 狀態）
├── [新增職位] → 名稱 + 層級選擇
└── [停用] → 確認 Dialog
```

### 7.4 人員任命管理（PAGE-06-L2-03，Admin only）

```
人員任命管理
├── 搜尋人員（姓名 / 部門）
├── 人員任命清單
│   欄位：人員 | 部門 | 職位 | 類型（主職/兼任）| 起始日 | 結束日 | 備註
├── [新增任命] → 
│   選人員 → 選部門 → 選職位 → 填起始日 → 填備註（選填）
│   → 系統提示「建議賦予 [ROLE_XXX]」→ Admin 確認 / 取消
├── [終止任命] → 填入結束日 → 確認是否同步移除 UserRole（提示）
└── 任命歷史記錄（含已終止，不可修改）
```

---

## 8. 驗收標準（Acceptance Criteria）

### AC-006-001：多部門兼任正確顯示

```gherkin
Given Jayroz 有兩筆有效 Appointment
  │ Appointment 1: dept=整合行銷部, position=部門主管, is_concurrent=false
  │ Appointment 2: dept=創意視覺部, position=部門主管, is_concurrent=true, note='代理'
When 任意使用者查看組織圖
Then 整合行銷部節點顯示 Jayroz 為主管
And 創意視覺部節點顯示 Jayroz 並帶有「兼任」badge
And Jayroz 的成員卡片在兩個部門各出現一次
```

### AC-006-002：管理職兼任業務部門，績效只計業務部門

```gherkin
Given Sam 有兩筆有效 Appointment
  │ Appointment 1: dept=總經理室（support）, position=總經理
  │ Appointment 2: dept=數位廣告一部（business）, position=部門主管
And Sam.monthly_salary = 100000
When 系統計算數位廣告一部的月度目標金額
Then Sam 的 100000 計入廣告一部目標
And 系統計算總經理室目標金額時 Sam 的薪資不計入（dept_type = support）
```

### AC-006-003：工作流審核者正確路由至部門主管

```gherkin
Given 廣告一部有一筆 Appointment: user=Sam, position_level=head
And 產生一筆廣告一部的 INVOICE_APPROVAL WorkflowInstance
When 系統查找審核者
Then 系統透過 Appointment 找到 Sam 作為廣告一部審核者
And 通知發送至 Sam
```

### AC-006-004：建議角色提示不強制

```gherkin
Given 財務行政部 suggested_role = ROLE_FINANCE
When Admin 將「西瓜」加入財務行政部 Appointment
Then 系統顯示「建議賦予 ROLE_FINANCE 給西瓜」提示
When Admin 取消此建議
Then 西瓜的 UserRole 不新增 ROLE_FINANCE
And Appointment 正常儲存
```

### AC-006-005：執行長具備等同 Admin 的完整系統操作權限

```gherkin
Given 白菜持有 ROLE_EXECUTIVE
When 白菜進入稽核日誌頁面
Then 系統允許存取並顯示全公司操作紀錄，且白菜可匯出稽核日誌
When 白菜進入使用者管理後台
Then 系統允許存取，白菜可建立、編輯、停用帳號及指派角色
When 白菜進入系統設定後台
Then 系統允許存取，白菜可修改 S-01～S-10 所有設定群組
```

---

## 9. 待確認事項

| 編號 | 類型 | 問題 | 負責人 | 狀態 |
|------|------|------|--------|------|
| B-60 | 業務決策 | 組織圖展示是否需要成員照片 / 頭像？ | 業主 | `open` |
| B-61 | 業務決策 | 管理職兼任多個 business 部門時，月薪是否計入每個部門目標（目前設計為各自完整計入）？ | 業主 | `open` |
| T-14 | 技術確認 | 組織圖樹狀圖前端 Library（如 OrgChart.js / D3 / 自製）選型 | 前端工程師 | `open` |

---

## 10. 與其他 REQ 的關係

```
REQ-0006（組織架構管理）← 本文件
  │  提供：
  ├─→ Appointment → REQ-0052（績效目標計算：dept_type 篩選）
  ├─→ Appointment → REQ-0054（PerformanceRecord 部門分組）
  ├─→ Appointment → REQ-0030（WorkflowConfig 審核者查找）
  ├─→ Appointment → REQ-0040（ProjectMember 快照來源；v7.4 取代 REQ-0025 OnboardingMember）
  ├─→ Department.suggested_role → REQ-0001（UserRole 指派提示）
  └─→ Position.position_level → REQ-0001（RBAC 審核層判斷）

上游依賴：
  REQ-0001（User / UserRole 必須先就位）
```

---

*— REQ-0006 規格文件結束 —*

---


| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0002 |
| **Use Case ID** | UC-002 |
| **PRD 章節** | 5.1.2 |
| **所屬模組** | F-00 Foundation 層 |
| **優先級** | `P0` |
| **狀態** | `open` — 規格初稿，各設定項預設值待業主確認 |
| **最後更新** | 2026-05-11 |
| **依賴關係** | REQ-0001（RBAC，Admin 與 Executive 可完整操作本 REQ）；被所有模組讀取 |

---

## 1. 背景與設計動機

現況：商機狀態、服務目錄、分級門檻、利潤率、工作流設定等全域參數散落各章節，硬編碼導致每次業務規則調整都須重新部署。目的：建立統一系統設定後台（S-01～S-10），Admin 與 Executive 介面維護，變更立即生效。

---

## 2. 功能描述

> 系統應提供管理者後台，集中管理全系統的可設定全域參數；所有設定變更立即生效並記錄於稽核日誌；各模組從設定後台讀取對應參數，不硬編碼業務規則。

---

## 3. 設定項目總覽

系統設定後台分為十個設定群組，每個群組對應特定模組的業務規則：

| 設定群組 | 對應模組 | 說明 |
|----------|----------|------|
| S-01 商機狀態設定 | REQ-0020 商機漏斗 | 自訂漏斗狀態清單 |
| S-02 服務項目目錄 | REQ-0044 服務項目管理 | ⚠️ **v5.11 遷移**：服務項目管理已獨立為 REQ-0044，成為導覽列「專案區塊」獨立功能模組；S-02 設定群組保留索引，實際規格見 REQ-0044（§9b） |
| S-03 客戶分級門檻 | REQ-0026 客戶分級 | S/A/B/C/D 級金額設定 |
| S-04 報價規則設定 | REQ-0021 報價單 | 利潤率門檻、稅率 |
| S-05 工作流設定 | REQ-0030 工作流引擎 | 審核者角色設定（v5.0 決策：角色型，凡 ROLE_MANAGER 均可審核）、通知管道（站內 + Email） |
| S-06 通知設定 | 全模組 | 各類事件的通知管道（站內通知 + Email；v5.0 決策：移除 LINE 管道） |
| S-07 知識庫設定 | REQ-0043 全域知識庫（P2） | 附件大小上限、搜尋索引更新頻率（待 T-16 確認後填入） |
| S-08 獎金引擎設定 | REQ-0052 獎金分配引擎（P1） | 各部門薪資達標倍率（廣告 2.8×、電商 2.4×、整合/創意 2.0×）；Layer 3 已移除，bonus_pool_ratio 設定不再需要 |
| S-09 部門主檔管理 | REQ-0006 組織架構管理 | ⚠️ **v5.10 遷移**：S-09 部門管理功能整合至 REQ-0006，由 PAGE-06-L2-01 後台取代；S-09 設定群組保留索引，實際規格見 REQ-0006 §4.1 |
| S-10 廠商種類設定 | REQ-0011 廠商名錄（P1） | 廠商種類清單與專長標籤清單（供廠商建檔時選用）；✅ B-41 resolved |

---

## 4. 各設定群組詳細規格

### S-01｜商機狀態設定

對應 REQ-0020 §4.2 的自訂狀態機制。

**功能說明：** Admin 可新增、排序、停用商機漏斗中的自訂狀態。五個預設狀態（new / interviewing / quoting / won / lost）唯讀，不可修改名稱或刪除。

**設定欄位：**

| 欄位 | 說明 |
|------|------|
| 狀態顯示名稱 | 最長 20 字，必填 |
| 排序位置 | 拖曳排序，決定在看板中的欄位順序（在 new 與 won 之間） |
| 是否啟用 | 停用後新商機無法設為此狀態；已在此狀態的商機不受影響 |

**預設狀態清單（不可修改）：**

| 順序 | 狀態代碼 | 顯示名稱 | 是否可停用 |
|------|----------|----------|-----------|
| 1 | `new` | New | 否 |
| 2 | `interviewing` | 訪談安排中 | 否 |
| 3 | `quoting` | 提案報價中 | 否 |
| — | `won` | Won | 否（終態，固定在列表最右） |
| — | `lost` | Lost | 否（終態，不在看板欄位中） |

---

### S-02｜服務項目目錄

> ⚠️ **v5.11 遷移**：S-02 服務項目管理功能已從系統設定後台獨立，成為獨立功能模組 **REQ-0044 服務項目管理**，放置於導覽列「專案區塊」。S-02 設定群組索引保留以維持編號連續性，實際規格（資料結構、RBAC、API、UI）完整定義於 **REQ-0044（§9b）**。

---

### S-03｜客戶分級門檻

對應 REQ-0026 客戶分級的五級金額門檻。

**功能說明：** Admin（通常由財務行政提出、特助確認）可調整 S/A/B/C/D 五個分級的月收款金額門檻。每次修改後下次季度分級計算時生效，不溯及已定案的分級。

**設定欄位：**

| 分級 | 月收款金額門檻（廣告實收＋顧問實收）| 廣告月投放金額門檻 |
|------|-----------------------------------|--------------------|
| S 級 | ≥ `s_revenue_threshold` 萬/月 | 或 ≥ `s_ad_spend_threshold` 萬 |
| A 級 | `a_revenue_min` ～ `a_revenue_max` 萬/月 | 或 `a_ad_min` ～ `a_ad_max` 萬 |
| B 級 | `b_revenue_min` ～ `b_revenue_max` 萬/月 | 或 `b_ad_min` ～ `b_ad_max` 萬 |
| C 級 | `c_revenue_min` ～ `c_revenue_max` 萬/月 | 或 `c_ad_min` ～ `c_ad_max` 萬 |
| D 級 | < `d_revenue_threshold` 萬/月 | 或 < `d_ad_threshold` 萬 |

**預設值（來源：業務規則確認）：**

| 分級 | 月收款 | 廣告月投放 |
|------|--------|-----------|
| S | ≥ 20 萬 | ≥ 75 萬 |
| A | 12 ～ 20 萬 | 45 ～ 75 萬 |
| B | 5 ～ 12 萬 | 20 ～ 45 萬 |
| C | 2 ～ 5 萬 | 10 ～ 20 萬 |
| D | < 2 萬 | < 10 萬 |

**固定規則（不可修改）：**
- 凡有顧問案的客戶，無論金額，最低為 B 級
- 執案單位主管可手動微調等級（覆寫自動計算結果）

---

### S-04｜報價規則設定

對應 REQ-0021 的報價單計算與驗證規則。

**設定欄位：**

| 設定項目 | 說明 | 預設值 |
|----------|------|--------|
| `quote_profit_rate_threshold` | 報價利潤率警告門檻（低於此值顯示橘色警告，不阻擋送審） | 30% |
| `quote_tax_rate` | 稅率（目前固定 5%，不建議修改，僅作保留） | 5% |

> ⚠️ `quote_tax_rate` 為系統備用欄位，正常情況不應修改。若未來稅率有法規異動，Admin 可在此調整，不需重新部署。
>
> 📋 **v10.0 移除**：`quote_valid_days`（報價單有效期提示天數）已移除。對照新版報價委任單公版，條款第 1 條有效期限固定為「7 日」（寫死於條款文字中），截止日期由出單人員手動填寫（inline 挖空欄位），不依賴系統動態帶入天數，故此設定項目不再適用。

---

### S-05｜工作流設定

對應 REQ-0030 工作流引擎的 WorkflowConfig，管理各類審核工作流的審核者與多人審核規則。

✅ **審核者設定方式（B-04 更新為具名型）**：每種 Workflow Type 必須在系統設定後台指派**複數具名審核者**（至少 1 人），被指派的帳號均可執行審核動作。系統送審時發送通知給所有被指派的審核者，任一人完成審核即視為通過（`require_all = false`，可依需求切換為全體通過）。

**每種 Workflow Type 的設定欄位：**

| 欄位 | 說明 |
|------|------|
| Workflow Type | 唯讀（QUOTE_APPROVAL / CONTRACT_MODIFY / VENDOR_COST / INVOICE_APPROVAL / EXEC_BONUS_APPROVAL） |
| 審核者（複數） | 從使用者清單選擇，至少指定 1 人；被指派帳號均可執行審核動作 |
| 多人審核模式 | 任一人通過即視為通過 / 全部人通過才視為通過 |
| 通知管道 | 站內通知 / Email（可複選） |

**預設審核者（具名型，由 Admin 在系統設定後台指派）：**

| Workflow Type | 建議預設審核者 |
|---------------|---------------|
| QUOTE_APPROVAL | Sam、Tora（來源：SOP BDP-11） |
| CONTRACT_MODIFY | Sam、Tora |
| VENDOR_COST | 各部門主管（由 Admin 依部門指定）；`require_all = false`，單層審核（✅ B-45 resolved，v8.8）；Finance 不參與採購審核，僅在 AP 端確認付款 |
| INVOICE_APPROVAL | 各部門主管（`is_general_manager = false` 的 ROLE_MANAGER，✅ B-33 resolved，兩層需不同人） |
| EXEC_BONUS_APPROVAL | 第一層：Finance 主管；第二層：總經理（`is_general_manager = true`） |

---

### S-06｜通知設定

管理全系統各類事件通知的管道與行為。

**通知事件清單：**

| 事件代碼 | 事件名稱 | 預設通知對象 | 可設定管道 |
|----------|----------|-------------|-----------|
| `NOTIFY_OPPORTUNITY_CREATED` | 商機建立通知 | 總經理（`is_general_manager = true` 的 Manager）；可在 S-06 調整對象 | 站內 / Email |
| `NOTIFY_QUOTE_SUBMIT` | 報價單送審 | 指定審核者 | 站內 / Email |
| `NOTIFY_QUOTE_APPROVED` | 報價單審核通過 | 送審者 | 站內 / Email |
| `NOTIFY_QUOTE_REJECTED` | 報價單退回 | 送審者 | 站內 / Email |
| `NOTIFY_CONTRACT_EXPIRY` | 合約到期提醒 | `opportunity_owner`、Manager | 站內 / Email |
| `NOTIFY_CONTRACT_RENEWED` | 合約自動展延 | `opportunity_owner` | 站內 / Email |
| `NOTIFY_PROJECT_CREATED` | 專案建立完成（v7.4 取代 NOTIFY_ONBOARDING）| PD、各部門 MPM / SPM | 站內 / Email |
| `NOTIFY_APPROVER_DISABLED` | 審核者帳號停用警告 | Admin | 站內 / Email |
| `NOTIFY_WORKFLOW_PENDING` | 待審核提醒（定期） | 指定審核者 | 站內 / Email |

**每個事件的設定欄位：**

| 欄位 | 說明 |
|------|------|
| 啟用 / 停用 | 可完全關閉某類通知 |
| 通知管道（複選） | 站內通知 / Email |
| 合約到期提前提醒天數 | `NOTIFY_CONTRACT_EXPIRY` 專屬，建議設兩組（如 30 天、14 天） |
| 待審核提醒頻率 | `NOTIFY_WORKFLOW_PENDING` 專屬，例每日一次或每天下午固定時間 |

---

### S-09｜部門主檔管理（v5.3 新增 → v5.10 遷移至 REQ-0006）

> ⚠️ **v5.10 架構遷移**：S-09 部門主檔管理功能已整合至 REQ-0006 組織架構管理模組（PAGE-06-L2-01 部門管理後台），不再獨立維護於 REQ-0002 設定後台。以下為歷史說明，完整最新規格請見 **REQ-0006 §4.1**。

✅ **v5.3 新增**：因獎金制度需按部門分組計算績效，部門清單改為動態管理，不再 hardcode。

**v5.10 後的操作入口**：組織架構管理（PAGE-06-L2-01），Admin 可管理部門名稱、類型（`dept_type`）、層級（`parent_id`）、主管指派、職責說明、建議角色、排序。

**與其他資料的連動（v5.10 更新）：**
- `Appointment.department_id`：人員與部門的關聯改由 Appointment 管理，不再是 User 直連
- `ProjectMember.department_id`：建立專案時，系統依人員的 Appointment 快照部門（v7.4；原為 OnboardingMember）
- 停用部門後，系統在管理後台標示「⚠️ 仍有 N 筆有效 Appointment 指向此部門」

---

## 5. 設定變更規則

### 5.1 生效時機

| 設定群組 | 變更後生效時機 |
|----------|---------------|
| S-01 商機狀態 | 立即生效（下次載入看板即反映） |
| S-02 服務項目 | ⚠️ **v5.11 遷移至 REQ-0044**；生效規則見 REQ-0044 §5 |
| S-03 分級門檻 | 下次季度分級計算時生效（不溯及當季已定案的分級） |
| S-04 報價規則 | 立即生效（已建立的報價單不受影響，僅新操作採用新規則） |
| S-05 工作流設定 | 立即生效（已進行中的 WorkflowInstance 維持原審核者，新建的才使用新設定） |
| S-06 通知設定 | 立即生效 |
| S-09 部門主檔 | 立即生效（新增 / 改名即時反映於下拉選單；停用後下拉選單隱藏該部門） |
| S-10 廠商種類 | 立即生效（新增種類即時反映於廠商建檔的種類下拉選單） |

### 5.2 稽核記錄

所有系統設定的新增、修改、停用操作，自動寫入稽核日誌（REQ-0003），記錄：
- 操作者（Admin）
- 操作時間
- 設定群組與具體項目
- 修改前後的值

---

## 6. 資料模型

### 6.1 SystemConfig（通用 Key-Value 設定表）

適用於 S-04 報價規則、S-06 通知設定等簡單 Key-Value 型參數：

```
SystemConfig {
  id          UUID          PK
  config_key  VARCHAR(100)  NOT NULL, UNIQUE   -- 設定鍵名，例：quote_profit_rate_threshold
  config_value TEXT         NOT NULL           -- 設定值（JSON 字串，支援複雜結構）
  description VARCHAR(300)                     -- 說明（給 Admin 看的文字說明）
  updated_by  UUID          FK → User.id
  updated_at  TIMESTAMP
}
```

### 6.2 OpportunityStatus（商機狀態設定，S-01）

詳見 REQ-0020 §7.3，不在此重複。

### 6.3 ServiceCategory / ServiceItem（服務項目目錄，S-02）

> ⚠️ **v5.11 遷移至 REQ-0044**：`ServiceCategory` 與 `ServiceItem` 資料表規格已移至 REQ-0044（§9b）。

### 6.4 CustomerGradeConfig（客戶分級門檻，S-03）

```
CustomerGradeConfig {
  id                    UUID          PK
  grade                 CHAR(1)       NOT NULL  -- S|A|B|C|D
  revenue_min           DECIMAL                 -- 月收款最低值（萬，null = 無下限）
  revenue_max           DECIMAL                 -- 月收款最高值（萬，null = 無上限）
  ad_spend_min          DECIMAL                 -- 廣告月投放最低值（萬）
  ad_spend_max          DECIMAL                 -- 廣告月投放最高值（萬）
  updated_by            UUID          FK → User.id
  updated_at            TIMESTAMP
}
```

### 6.5 WorkflowConfig（工作流設定，S-05）

詳見 REQ-0030 §6.2，不在此重複。

---

## 7. API 介面設計（草稿）

### 7.1 取得所有系統設定（Admin / Executive）

```
GET /api/v1/system/config

Response 200:
{
  "opportunity_statuses": [...],
  "customer_grade_config": {...},
  "quote_rules": {
    "profit_rate_threshold": 0.30,
    "tax_rate": 0.05,
    "valid_days": 14
  },
  "workflow_configs": [...],
  "notification_settings": [...]
}
```

> 📋 **v5.11 更新**：`service_categories` 已從系統設定 API 移除。服務項目清單改由 `GET /api/v1/service-catalog` 提供（REQ-0044）。

```
```

### 7.2 更新報價規則設定

```
PATCH /api/v1/system/config/quote-rules

Request Body:
{
  "profit_rate_threshold": 0.25,   // 調整利潤率門檻為 25%
  "valid_days": 7
}

Response 200:
{
  "updated": ["profit_rate_threshold", "valid_days"],
  "effective_immediately": true,
  "updated_at": "2026-05-11T14:00:00Z"
}
```

### 7.3 服務項目 API（已遷移）

> ⚠️ **v5.11 遷移至 REQ-0044**：原 `POST /api/v1/system/service-items`（新增服務項目）與 `GET /api/v1/system/service-items`（取得服務項目清單）兩支端點已遷移至 REQ-0044，改由 `/api/v1/service-catalog/*` 系列提供，並開放所有角色呼叫（新增 / 修改）。REQ-0002 不再負責服務項目的 API 設計。

---

## 8. UI 規格

### 8.1 系統設定後台整體佈局（Admin / Executive 頁面）

```
系統設定
├── 左側導覽
│   ├── 商機狀態設定（S-01）
│   ├── 客戶分級門檻（S-03）
│   ├── 報價規則設定（S-04）
│   ├── 工作流設定（S-05）
│   └── 通知設定（S-06）
│
└── 右側內容區（依選擇的設定群組切換）
```

> 📋 **v5.11 更新**：S-02 服務項目目錄已從系統設定後台移除，改為導覽列「專案區塊」的獨立頁面（REQ-0044）。

### 8.2 S-05 工作流設定 UI

```
工作流設定

  報價單審核（QUOTE_APPROVAL）
  ┌─────────────────────────────────────────┐
  │ 審核者：[Sam ×] [Tora ×] [+ 新增審核者]  │
  │ 審核模式：● 任一通過  ○ 全部通過         │
  │ 通知管道：☑ 站內通知  ☑ Email            │
  └─────────────────────────────────────────┘

  合約修改審核（CONTRACT_MODIFY）
  ┌─────────────────────────────────────────┐
  │ 審核者：[Sam ×] [Tora ×] [+ 新增審核者]  │
  │ 審核模式：● 任一通過  ○ 全部通過         │
  │ 通知管道：☑ 站內通知  ☑ Email            │
  └─────────────────────────────────────────┘

  請款單審核（INVOICE_APPROVAL）
  ┌─────────────────────────────────────────┐
  │ 審核者：[主管A ×] [主管B ×] [+ 新增]     │
  │ 審核模式：○ 任一通過  ● 全部通過         │
  │ 通知管道：☑ 站內通知  ☑ Email            │
  └─────────────────────────────────────────┘

  廣告執行獎金審核（EXEC_BONUS_APPROVAL）
  ┌─────────────────────────────────────────┐
  │ 第一層審核者：[Finance 主管 ×] [+ 新增]  │
  │ 第二層審核者：[總經理 ×] [+ 新增]        │
  │ 通知管道：☑ 站內通知  ☑ Email            │
  └─────────────────────────────────────────┘
```

---

## 9. 驗收標準（Acceptance Criteria）

### AC-001：服務項目新增立即反映至報價單

> ⚠️ **v5.11 遷移至 REQ-0044**：此驗收標準已移至 REQ-0044 AC-044-01。服務項目新增由任何角色在「服務項目管理」頁面操作，不再屬於系統設定後台。

### AC-002：停用服務項目不影響舊報價單

> ⚠️ **v5.11 遷移至 REQ-0044**：此驗收標準已移至 REQ-0044 AC-044-03。停用操作限 Admin 執行，入口為「服務項目管理」頁面。

### AC-003：工作流審核者設定立即生效於新工作流

```gherkin
Given Admin 將 QUOTE_APPROVAL 的審核者從「Sam、Tora」改為「Sam、Joe」
And 此時有一個進行中的 WorkflowInstance（審核者為 Tora）
When Tora 查看自己的待審核列表
Then 進行中的 WorkflowInstance 仍顯示（舊設定不受影響）
When 業務人員建立新的報價單並送審
Then 新 WorkflowInstance 的審核者為「Sam、Joe」（新設定生效）
```

### AC-004：客戶分級門檻調整不溯及當季

```gherkin
Given 本季（Q2）客戶分級已定案，S 級門檻為 ≥ 20 萬
When Admin 將 S 級門檻調整為 ≥ 25 萬
Then Q2 已定案的客戶分級不變
And Q3 季度分級計算時採用新門檻（≥ 25 萬）
```

### AC-005：設定變更記錄稽核日誌

```gherkin
Given Admin「廖煥庭」將報價利潤率門檻從 30% 改為 25%
When 查看稽核日誌
Then 出現一筆記錄：
     操作者：廖煥庭
     操作時間：2026-05-11T14:00:00Z
     設定項目：quote_profit_rate_threshold
     修改前：0.30  修改後：0.25
```

### AC-006：非 Admin / Executive 無法存取系統設定

```gherkin
Given PM 用戶「白菜」登入
When 白菜嘗試存取系統設定頁面
Then 導覽列不顯示「系統設定」選項
And 直接呼叫 GET /api/v1/system/config 回傳 403
```


### AC-043-11：取消發布流程

```gherkin
Given 白菜（PM）發布了「META 廣告操作眉角」（KnowledgeDoc.status = published，published_by = 白菜.id）
When 白菜點擊「取消發布」並確認
Then KnowledgeDoc.status = unpublished
And KnowledgeDoc.unpublished_at = now()，unpublished_by = 白菜.id
And 全域知識庫列表不再顯示「META 廣告操作眉角」
And 引用此文件的服務頁顯示「⚠️ 此文件已暫停發布」提示
And 稽核日誌記錄 knowledge.unpublished 事件

Given 另一位 PM 小明嘗試取消發布「META 廣告操作眉角」（published_by = 白菜.id）
When 小明點擊「取消發布」
Then API 回傳 403（非發布者 / 非 Manager / 非 Admin）
```

### AC-043-12：重新發布流程

```gherkin
Given 「META 廣告操作眉角」已取消發布（KnowledgeDoc.status = unpublished）
When 白菜（原發布者）點擊「重新發布」
Then KnowledgeDoc.status = published
And KnowledgeDoc.published_at 更新為當前時間
And KnowledgeDoc.unpublished_at / unpublished_by 清空
And 全域知識庫列表重新顯示「META 廣告操作眉角」
And 稽核日誌記錄 knowledge.republished 事件
```

---

## 10. 待確認事項

| 編號 | 類型 | 問題 | 負責人 | 狀態 |
|------|------|------|--------|------|
| B-04 | 業務決策 | 工作流審核者設定方式 | — | ✅ `resolved`（v5.6）：具名型，Admin 在 S-05 為每種 WorkflowType 指派複數具名審核者，被指派帳號均可審核。QUOTE_APPROVAL / CONTRACT_MODIFY 預設 Sam、Tora；VENDOR_COST 請 Admin 依部門指定 |
| B-07 | 業務決策 | 合約到期提醒設定 | — | ✅ resolved（v7.3）：14 天前、專案負責部門主管、站內通知 + Email |
| T-14 | 技術確認 | S-04 的 `quote_tax_rate` 欄位：稅率若未來有變，已建立但未完成的報價單如何處理（以建立時的稅率為準 vs. 動態套用最新值）？ | 後端工程師 | `open` |

---

## 11. 與其他 REQ 的關係

```
REQ-0001（使用者管理）
  └─ RBAC：Admin 與 Executive 可完整操作系統設定

REQ-0002（系統設定）← 本文件
  │  提供設定給所有下游模組讀取：
  ├─→ REQ-0020（商機漏斗）：讀取 S-01 商機狀態清單
  ├─→ REQ-0021（報價單）：讀取 REQ-0044 服務項目、S-04 利潤率門檻
  ├─→ REQ-0026（客戶分級）：讀取 S-03 分級門檻
  ├─→ REQ-0030（工作流引擎）：讀取 S-05 審核者設定 / 通知管道
  ├─→ REQ-0004（站內通知）：讀取 S-06 通知事件的啟用狀態與管道設定
  └─→ 所有通知事件：讀取 S-06 通知管道設定

REQ-0003（稽核日誌）
  └─ 記錄所有系統設定的變更操作
```

---

*— REQ-0002 規格文件結束 —*

---

# §3｜REQ-0003 稽核日誌


| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0003 |
| **Use Case ID** | UC-003 |
| **PRD 章節** | 5.1.3 |
| **所屬模組** | F-00 Foundation 層 |
| **優先級** | `P0` |
| **狀態** | `open` — 規格初稿，保存期限（T-03 ✅）待技術與法務確認 |
| **最後更新** | 2026-05-11 |
| **依賴關係** | REQ-0001（使用者管理，提供 User 資料）；被所有模組寫入；由 REQ-0002（系統設定）的變更自動觸發 |

---

## 1. 背景與設計動機

現況：Google Sheets 無操作記錄，財務或合約異常無從追查責任人與變更時間點。目的：自動記錄所有關鍵操作（操作者 + 動作 + before/after），Admin/Manager 可查詢，任何人不可刪除。

---

## 2. 功能描述

> 系統應自動記錄所有關鍵操作的稽核日誌，包含操作者、時間、操作類型、影響資料與操作前後值；稽核日誌不可刪除或修改；Admin 與 **Executive（ROLE_EXECUTIVE）** 可完整查詢並匯出；Manager 可唯讀查詢；提供關鍵字搜尋、多維度篩選與匯出功能。

---

## 3. 記錄範圍

### 3.1 必記錄的操作類型

稽核日誌採**白名單制**：只記錄列舉的操作，不記錄一般讀取（GET）操作，避免日誌量爆炸。

| 事件類別 | 具體操作 | 觸發 REQ |
|----------|----------|----------|
| **帳號管理** | 帳號建立、帳號停用 / 啟用、角色指派變更、密碼重設、MFA 重設 | REQ-0001 |
| **登入安全** | 登入成功、登入失敗（含失敗次數）、帳號鎖定、強制登出 | REQ-0001 |
| **系統設定** | 任何系統設定的新增 / 修改 / 停用（S-01 ～ S-10） | REQ-0002 |
| **客戶主檔** | 客戶建立、客戶停用、客戶資料編輯（含哪些欄位被修改） | REQ-0010 |
| **單據操作** | 報價單建立 / 送審 / 審核通過 / 退回 / 作廢、版本快照建立 | REQ-0021 |
| **合約操作** | 合約建立 / 修改申請 / 審核通過 / 退回 / 歸檔確認 / 作廢 / 自動展延 | REQ-0022 |
| **工作流** | WorkflowInstance 建立、審核決定（通過 / 退回）、強制取消 | REQ-0030 |
| **商機操作** | 商機建立、狀態變更（含 Won 撤回）、Won、Lost | REQ-0020 |
| **財務操作** | AR/AP 對帳確認、全成本試算提交、獎金計算觸發、結案評核提交 | REQ-0050～0053 |
| **資料匯出** | 任何 CSV / PDF 匯出操作 | 全模組 |
| **權限異常** | API 回傳 403 的操作嘗試（未授權存取） | 全模組 |

### 3.2 不記錄的操作（以免日誌量過大）

- 一般讀取（GET）操作
- 報價單草稿的每次自動儲存（僅在送審時記錄版本快照）
- 系統設定後台的「查看」操作
- 無效的 Session Token 請求（由 WAF / Rate Limiter 處理）

---

## 4. 日誌欄位規格

### 4.1 AuditLog 資料表

```
AuditLog {
  id              UUID          PK
  
  -- 操作者資訊
  user_id         UUID          FK → User.id（可 null：系統自動操作，如自動展延）
  user_name       VARCHAR(100)  -- 記錄當時的姓名（避免使用者改名後日誌失準）
  user_roles      VARCHAR(200)  -- 記錄當時的角色（JSON 陣列字串）
  ip_address      VARCHAR(45)   -- 操作者 IP
  user_agent      TEXT          -- 瀏覽器 / 裝置資訊
  
  -- 操作資訊
  event_type      VARCHAR(100)  NOT NULL  -- 事件類型代碼（見 4.2）
  event_category  VARCHAR(50)   NOT NULL  -- 事件類別（account / security / config / crm / document / workflow / finance / export）
  source_module   VARCHAR(50)   NOT NULL  -- 觸發模組（REQ-XXXX 或模組名稱）
  
  -- 影響資料
  resource_type   VARCHAR(100)            -- 被操作的資源類型（User / Customer / Quote / Contract 等）
  resource_id     UUID                    -- 被操作的資源 ID
  resource_label  VARCHAR(200)            -- 被操作的資源可讀名稱（如：「老撈麻辣鍋 / QT-2026...」）
  
  -- 變更內容
  before_value    JSONB                   -- 操作前的欄位值（僅記錄被修改的欄位）
  after_value     JSONB                   -- 操作後的欄位值
  
  -- 結果
  result          ENUM          success | failure
  failure_reason  TEXT                    -- 失敗原因（result = failure 時填入）
  
  -- 時間
  occurred_at     TIMESTAMP     NOT NULL  DEFAULT now()  -- 精確到毫秒
}
```

> ⚠️ **不可刪除、不可修改**：`AuditLog` 資料表不提供 UPDATE 和 DELETE 操作，連 Admin 也無法執行。資料庫層需設定表級觸發器或 Row-Level Security 確保此限制。

### 4.2 事件類型代碼（event_type）

| 事件代碼 | 說明 |
|----------|------|
| `USER_CREATED` | 帳號建立 |
| `USER_DEACTIVATED` | 帳號停用 |
| `USER_ACTIVATED` | 帳號啟用 |
| `USER_ROLE_CHANGED` | 角色變更 |
| `USER_PASSWORD_RESET` | 密碼重設 |
| `USER_MFA_RESET` | MFA 重設 |
| `AUTH_LOGIN_SUCCESS` | 登入成功 |
| `AUTH_LOGIN_FAILED` | 登入失敗 |
| `AUTH_ACCOUNT_LOCKED` | 帳號鎖定 |
| `AUTH_SESSION_REVOKED` | Session 強制撤銷 |
| `CONFIG_UPDATED` | 系統設定修改 |
| `CUSTOMER_CREATED` | 客戶建立 |
| `CUSTOMER_UPDATED` | 客戶資料修改 |
| `CUSTOMER_DEACTIVATED` | 客戶停用 |
| `QUOTE_CREATED` | 報價單建立 |
| `QUOTE_SUBMITTED` | 報價單送審 |
| `QUOTE_APPROVED` | 報價單通過 |
| `QUOTE_REJECTED` | 報價單退回 |
| `QUOTE_CANCELLED` | 報價單作廢 |
| `CONTRACT_CREATED` | 合約建立 |
| `CONTRACT_FILED` | 合約歸檔確認 |
| `CONTRACT_RENEWED` | 合約展延 |
| `CONTRACT_ENDED` | 合約終止 |
| `WORKFLOW_DECIDED` | 審核決定（通過 / 退回） |
| `OPPORTUNITY_STATUS_CHANGED` | 商機狀態變更 |
| `EXPORT_EXECUTED` | 資料匯出 |
| `UNAUTHORIZED_ACCESS` | 未授權存取嘗試（403） |

---

## 5. 業務規則

### 5.1 寫入規則

- 所有被記錄的操作，**無論成功或失敗**，都寫入日誌（`result` 欄位區分）
- 日誌寫入採用**非同步寫入**（Async），確保日誌記錄不影響主業務操作的回應時間
- 若日誌寫入本身失敗（如 DB 暫時不可用），系統應記錄到備用日誌（本地 log file），不應讓主業務操作失敗

### 5.2 不可竄改保證

```
技術層保護（由後端工程師實作）：
  1. AuditLog 資料表：DB 層設定 DENY UPDATE / DELETE 觸發器
  2. API 層：不暴露任何 PATCH / DELETE /audit-logs 端點
  3. Admin UI：不提供刪除或編輯日誌的操作按鈕
  4. 定期備份至獨立儲存（與主 DB 分離），確保即使主 DB 被破壞，日誌仍可恢復
```

### 5.3 保存期限

> ❓ **待技術與法務確認（T-03 ✅）**：稽核日誌保存期限建議如下，請確認：

| 方案 | 保存期限 | 儲存成本考量 |
|------|----------|-------------|
| **方案 A（建議）** | 3 年（法律爭議追溯期） | 中等，需評估每年日誌量 |
| 方案 B | 5 年（會計資料保存期） | 較高 |
| 方案 C | 1 年（最低） | 最低，但爭議時可能不足 |

> SA 建議方案 A（3 年），理由：台灣民事訴訟一般時效 2 年，加上緩衝；且昊揚日誌量估計不大（使用者 ≤ 30 人），3 年儲存成本可接受。

**分層儲存策略（建議）：**
- 近 90 天：存於主 DB（快速查詢）
- 90 天 ～ 3 年：歸檔至低成本儲存（S3 / GCS Coldline），查詢時需幾秒載入
- 超過 3 年：自動刪除（或依法務決策保留）

---

## 6. 查詢介面規格

### 6.1 查詢入口與權限

| 角色 | 查詢範圍 | 可用功能 |
|------|----------|----------|
| Admin | 所有日誌 | 全部篩選條件 + 匯出 |
| Executive | 所有日誌（完整） | 全部篩選條件，支援匯出 |
| Manager | 所有日誌（唯讀，不限部門） | 全部篩選條件，無匯出 |
| PM / Finance | 無存取權限 | — |

### 6.2 篩選條件

| 篩選維度 | 說明 |
|----------|------|
| 時間範圍 | 開始日期 ～ 結束日期（精確到分鐘） |
| 操作者 | 從使用者清單選擇（多選） |
| 事件類別 | 帳號管理 / 登入安全 / 系統設定 / 客戶 / 單據 / 工作流 / 財務 / 匯出（多選） |
| 事件類型 | 從事件類型代碼清單選擇（多選） |
| 資源類型 | Quote / Contract / Customer / User 等（多選） |
| 操作結果 | 成功 / 失敗 / 全部 |
| 關鍵字搜尋 | 搜尋 `resource_label`（客戶名稱、合約編號等） |

### 6.3 日誌列表顯示欄位

| 欄位 | 說明 |
|------|------|
| 時間 | `occurred_at`，精確到秒 |
| 操作者 | `user_name` + 角色 badge |
| 事件類型 | 事件類型中文名稱 |
| 影響資料 | `resource_type` + `resource_label` |
| IP 位址 | `ip_address` |
| 結果 | 成功 / 失敗 badge |
| 操作 | [查看詳情] |

### 6.4 日誌詳情頁

點擊「查看詳情」展開：

```
日誌詳情
├── 基本資訊：時間、操作者、IP、User Agent
├── 事件資訊：事件類型、影響資源
└── 變更內容（before / after diff）：
    
    before:                  after:
    {                        {
      "status": "draft",       "status": "pending_approval",
      "version": 1             "version": 1,
    }                          "submitted_at": "2026-05-11T..."
                             }
```

### 6.5 匯出規格（Admin only）

- 格式：CSV
- 欄位：對應 6.3 列表欄位 + `before_value` + `after_value`
- 匯出本身也記錄一筆 `EXPORT_EXECUTED` 日誌（防止靜默匯出）
- 每次匯出限制 ≤ 10,000 筆（超過需縮小時間範圍）

---

## 7. API 介面設計（草稿）

### 7.1 查詢稽核日誌

```
GET /api/v1/audit-logs
  ?from=2026-05-01T00:00:00Z
  &to=2026-05-11T23:59:59Z
  &user_id={uuid}
  &event_category=document
  &event_type=QUOTE_SUBMITTED
  &result=success
  &keyword=老撈
  &page=1
  &per_page=50

Response 200:
{
  "total": 127,
  "page": 1,
  "per_page": 50,
  "logs": [
    {
      "id": "uuid",
      "occurred_at": "2026-05-11T10:32:15.123Z",
      "user_name": "白菜",
      "user_roles": ["ROLE_PM"],
      "event_type": "QUOTE_SUBMITTED",
      "event_category": "document",
      "resource_type": "Quote",
      "resource_id": "uuid",
      "resource_label": "老撈麻辣鍋 / QT-20260511-0042",
      "ip_address": "203.69.xx.xx",
      "result": "success"
    }
  ]
}
```

### 7.2 查看單筆日誌詳情

```
GET /api/v1/audit-logs/{log_id}

Response 200:
{
  "id": "uuid",
  "occurred_at": "2026-05-11T10:32:15.123Z",
  "user_id": "uuid",
  "user_name": "白菜",
  "user_roles": ["ROLE_PM"],
  "ip_address": "203.69.xx.xx",
  "user_agent": "Mozilla/5.0 ...",
  "event_type": "QUOTE_SUBMITTED",
  "event_category": "document",
  "source_module": "REQ-0021",
  "resource_type": "Quote",
  "resource_id": "uuid",
  "resource_label": "老撈麻辣鍋 / QT-20260511-0042",
  "before_value": { "status": "draft" },
  "after_value": { "status": "pending_approval", "submitted_at": "..." },
  "result": "success",
  "failure_reason": null
}
```

### 7.3 匯出日誌（Admin only）

```
POST /api/v1/audit-logs/export

Request Body:
{
  "from": "2026-05-01T00:00:00Z",
  "to": "2026-05-11T23:59:59Z",
  "event_category": ["document", "config"]
}

Response 200:
{
  "export_id": "uuid",
  "status": "processing",
  "estimated_rows": 342,
  "download_url": null   // 非同步，完成後推送通知
}

// 完成後的通知（站內通知）：
// 「稽核日誌匯出完成，共 342 筆，有效期 10 分鐘」
// download_url: "https://..."
```

---

## 8. 驗收標準（Acceptance Criteria）

### AC-001：關鍵操作自動記錄

```gherkin
Given 業務人員「白菜」將報價單 QT-20260511-0042 送審
When 送審操作執行成功
Then 系統自動建立一筆 AuditLog：
     event_type: QUOTE_SUBMITTED
     user_name: 白菜
     resource_label: 老撈麻辣鍋 / QT-20260511-0042
     before_value: {status: "draft"}
     after_value: {status: "pending_approval"}
     result: success
And 此日誌在業務人員送審後立即可查詢（延遲 ≤ 3 秒）
```

### AC-002：失敗操作也記錄

```gherkin
Given 人員「白菜」（ROLE_PM）嘗試存取老闆戰情室
When API 回傳 403 FORBIDDEN
Then 系統自動建立一筆 AuditLog：
     event_type: UNAUTHORIZED_ACCESS
     resource_type: Dashboard
     result: failure
     failure_reason: "FORBIDDEN: 角色 ROLE_PM 無權存取老闆戰情室"
```

### AC-003：日誌不可刪除

```gherkin
Given Admin 嘗試對 AuditLog 執行 DELETE 操作（直接呼叫 API 或 DB）
When 刪除操作被嘗試
Then DB 觸發器攔截並拒絕 DELETE
And 系統回傳錯誤（或 DB 層直接拋出例外）
And AuditLog 記錄完整保留
```

### AC-004：多維度篩選正常運作

```gherkin
Given Admin 進入稽核日誌查詢頁
When Admin 設定篩選條件：
     時間範圍：2026-05-01 ～ 2026-05-11
     操作者：白菜
     事件類別：單據
     結果：成功
Then 列表僅顯示符合上述所有條件的日誌
And 顯示 total 筆數
```

### AC-005：匯出本身也被記錄

```gherkin
Given Admin「廖煥庭」匯出 2026-05 的所有稽核日誌
When 匯出操作完成
Then 在稽核日誌中出現一筆：
     event_type: EXPORT_EXECUTED
     user_name: 廖煥庭
     resource_label: 匯出日誌（2026-05-01 ～ 2026-05-31，342 筆）
```

### AC-006：Manager 可查詢但無法匯出

```gherkin
Given Manager 用戶「Sam」登入
When Sam 進入稽核日誌頁面
Then Sam 可查看所有日誌記錄
And 頁面不顯示「匯出」按鈕
And 呼叫 POST /api/v1/audit-logs/export 回傳 403
```

---

## 9. 待確認事項

| 編號 | 類型 | 問題 | 負責人 | 狀態 |
|------|------|------|--------|------|
| T-03 ✅ | 技術 + 法務 | 稽核日誌保存期限：SA 建議 3 年，請法務確認是否足夠，技術確認分層儲存方案（S3 Coldline） | 法務 + 後端工程師 | `open` |
| T-15 | 技術確認 | 非同步寫入的備用日誌機制：若主 DB 寫入失敗，本地 log file 的位置與格式？後續如何補寫回主 DB？ | 後端工程師 | `open` |
| T-16 | 技術確認 | `before_value` / `after_value` 的 JSONB 大小限制：大型 JSON（如報價單完整快照）是否需要截斷或只存 diff？ | 後端工程師 | `open` |
| B-27 | 業務決策 | Manager 的稽核日誌查詢範圍 | — | ✅ `resolved`（v5.6）：Manager 可查全公司所有日誌（不限部門），但無匯出權限 |

---

## 10. 與其他 REQ 的關係

```
REQ-0001（使用者管理）
  └─ 提供 User 資料（user_id / user_name / roles）給日誌記錄

所有模組 → REQ-0003（稽核日誌）← 本文件
  每個關鍵操作都呼叫 AuditLog Service 寫入日誌

REQ-0003（稽核日誌）
  └─ Admin 查詢介面，獨立頁面
  └─ 供 REQ-0001 停用帳號時，查看歷史操作記錄

REQ-0004（站內通知）
  └─ AuditLog 事件觸發後，同步呼叫通知服務建立 Notification 紀錄
```

---

*— REQ-0003 規格文件結束 —*  
*Foundation 層（REQ-0001 / REQ-0002 / REQ-0003）全部完成。*  
*下一個建議：REQ-0040（專案建立）— P0，業務主線的下一站（開案後的執行階段）*

---

# §3b｜REQ-0004 站內通知與收件匣

✅ **v5.6 新增**：因應商機建立通知需求（NOTIFY_OPPORTUNITY_CREATED）與各模組通知整合，補齊站內通知的完整接收與管理規格。

| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0004 |
| **Use Case ID** | UC-004 |
| **PRD 章節** | 5.1.4 |
| **所屬模組** | F-00 Foundation 層 |
| **優先級** | `P0` |
| **狀態** | `open` — v5.6 新增；T-22 resolved（SSE） |
| **最後更新** | 2026-06-09（v5.6 新增） |
| **依賴關係** | REQ-0001（使用者管理，提供收件人 User 資料）、REQ-0002（系統設定，S-06 通知事件啟用狀態與管道設定）；被所有觸發通知事件的模組呼叫 |

---

## 1. 背景與設計動機

現行各模組的通知邏輯分散定義於 S-06 設定後台，但缺乏完整的「使用者端如何接收通知」規格：系統能發出通知，但沒有定義使用者在哪裡看到它、如何管理已讀/未讀。

REQ-0004 的目的：建立統一的站內通知收件匣，作為所有 S-06 通知事件的站內接收端；採用 WebSocket/SSE 即時推送，未讀數顯示在左側導覽列；以右側抽屜（Drawer）形式呈現通知列表，不建立獨立的收件匣頁面。

---

## 2. 功能描述

> 系統應提供站內通知收件匣功能，以左側導覽列 badge 顯示未讀數、點擊展開右側抽屜（Drawer）列表；支援已讀/未讀篩選、單則或全部標已讀、點擊跳轉至對應資源頁面；後端透過 WebSocket/SSE 即時推送新通知，所有角色均可使用；通知永久保留。

---

## 3. 通知架構

所有業務模組觸發的 S-06 事件，由後端通知服務統一建立 `Notification` 紀錄並寫入對應收件人，再透過 WebSocket/SSE 推送至前端。

```
業務事件觸發（如：報價單審核通過）
    │
    ▼
S-06 通知服務
    │  查詢 NotificationTemplate（依 event_code）
    │  查詢收件人清單（依事件規則）
    │
    ▼
建立 Notification 紀錄 + NotificationRecipient 收件人紀錄
    │
    ├─ WebSocket / SSE push → 前端收到即時更新 badge 未讀數
    │
    └─ Email 服務（若 S-06 設定管道含 Email）→ 非同步寄出
```

---

## 4. 通知事件與收件人對照表

| 事件代碼 | 通知標題範本 | 收件人 | 跳轉目標 |
|---|---|---|---|
| `NOTIFY_OPPORTUNITY_CREATED` | 「新商機建立：{brand_name}（{industry}）」 | 總經理（`is_general_manager = true`） | 商機詳情頁 |
| `NOTIFY_QUOTE_SUBMIT` | 「報價單待審核：{quote_number}」 | S-05 指定審核者 | 報價單詳情頁 |
| `NOTIFY_QUOTE_APPROVED` | 「報價單審核通過：{quote_number}」 | 送審者 | 報價單詳情頁 |
| `NOTIFY_QUOTE_REJECTED` | 「報價單退回：{quote_number}」 | 送審者 | 報價單詳情頁 |
| `NOTIFY_CONTRACT_EXPIRY` | 「合約即將到期：{contract_number}（剩 {days} 天）」 | `opportunity_owner`、Manager | 合約詳情頁 |
| `NOTIFY_CONTRACT_RENEWED` | 「合約已自動展延：{contract_number}」 | `opportunity_owner` | 合約詳情頁 |
| `NOTIFY_PROJECT_CREATED` | 「專案已建立：{brand_name}，您已被指派為 {role}」 | PD、各部門 MPM / SPM | 專案詳情頁 |
| `NOTIFY_APPROVER_DISABLED` | 「審核者帳號已停用：{user_name}，請重新指定審核者」 | Admin | 使用者管理頁 |
| `NOTIFY_WORKFLOW_PENDING` | 「您有 {count} 個待審核項目」 | 指定審核者 | 待辦審核頁 |

---

## 5. 資料模型

### 5.1 Notification 資料表（通知主表）

```
Notification {
  id              UUID          PK
  event_code      VARCHAR(100)  NOT NULL  -- 對應 S-06 事件代碼
  title           VARCHAR(200)  NOT NULL  -- 通知標題（由範本生成）
  body            TEXT          NOT NULL  -- 通知內文（含資源可讀名稱）

  -- 跳轉目標
  target_type     VARCHAR(50)             -- 跳轉目標資源類型（Quote / Contract / Opportunity 等）
  target_id       UUID                    -- 跳轉目標資源 ID
  target_url      VARCHAR(500)            -- 前端計算的完整路徑（如 /quotes/{id}）

  -- 觸發來源
  triggered_by    UUID          FK → User.id（系統自動觸發時為 null）
  source_module   VARCHAR(50)   NOT NULL  -- 觸發模組（REQ-XXXX）

  created_at      TIMESTAMP     DEFAULT now()
}
```

### 5.2 NotificationRecipient 資料表（收件人表）

同一則通知可有多位收件人（如 NOTIFY_QUOTE_SUBMIT 發給所有指定審核者），每人各一筆，各自維護已讀狀態。

```
NotificationRecipient {
  id              UUID          PK
  notification_id UUID          NOT NULL, FK → Notification.id
  user_id         UUID          NOT NULL, FK → User.id
  is_read         BOOLEAN       DEFAULT false
  read_at         TIMESTAMP

  UNIQUE(notification_id, user_id)  -- 同一則通知同一人只有一筆
}
```

> ⚠️ **永久保留**：`Notification` 與 `NotificationRecipient` 不設定自動清除排程，資料永久保留。

### 5.3 未讀數計算

```sql
-- 當前使用者未讀數
SELECT COUNT(*)
FROM NotificationRecipient
WHERE user_id = {current_user_id}
  AND is_read = false
```

未讀數超過 99 時，badge 顯示「99+」。

---

## 6. 即時推送機制

✅ **T-22 resolved（v5.6）**：即時推送技術選型確認採用 **SSE（Server-Sent Events）**。

**選型說明**：本系統通知為伺服器單向推送（伺服器 → 客戶端），SSE 實作簡單、基於 HTTP、瀏覽器原生支援，足夠本需求。WebSocket（全雙工）留作未來若有雙向即時協作需求時的升級路徑。

**Push 事件格式**：

```json
{
  "type": "notification",
  "unread_count": 5,
  "notification": {
    "id": "uuid",
    "title": "報價單審核通過：QT-20260609-001",
    "body": "老撈麻辣鍋 / QT-20260609-001 已通過審核，PDF 輸出已解鎖",
    "target_url": "/quotes/uuid",
    "created_at": "2026-06-09T10:32:00Z"
  }
}
```

前端收到 push 後：自動更新 badge 未讀數，若抽屜為展開狀態則即時插入新通知至列表頂部。

---

## 7. UI 規格

### 7.1 導覽列 badge

```
左側導覽列
├── 工作台
│   ├── 系統首頁
│   ├── 待辦審核   [3]    ← 現有（WorkflowInstance 待審數量）
│   └── 收件匣     [12]   ← 新增（NotificationRecipient 未讀數）
```

- Badge 樣式與「待辦審核」相同（數字 badge，顏色不另外區分）
- 未讀數為 0 時，badge 隱藏

### 7.2 收件匣抽屜（Drawer）

點擊「收件匣」，從右側滑出抽屜（不導航至新頁面）：

```
┌──────────────────────────────────────────┐
│  收件匣                        [全部標已讀] │
│ ──────────────────────────────────────── │
│  篩選：● 全部   ○ 未讀   ○ 已讀           │
│ ──────────────────────────────────────── │
│  ●  報價單審核通過                    2 分鐘前 │
│     老撈麻辣鍋 / QT-20260609-001          │
│                                          │
│  ●  新商機建立：鋐揚科技（科技）        1 小時前 │
│     業務：Yvonne Wu                       │
│                                          │
│  ○  合約即將到期：HY2026A001_001        昨天   │
│     老撈麻辣鍋，剩 28 天                   │
│ ──────────────────────────────────────── │
│  （無限滾動載入更多）                        │
└──────────────────────────────────────────┘
```

**互動規則：**
- ● 藍色圓點 = 未讀；○ 無圓點 = 已讀
- 點擊任一通知 → 標記為已讀（`is_read = true`，記錄 `read_at`）+ 關閉抽屜 + 跳轉至 `target_url`
- 點擊「全部標已讀」→ 批次 PATCH，當前使用者所有未讀變已讀，badge 清零
- 篩選切換（全部 / 未讀 / 已讀）→ 即時更新列表，不重新載入頁面
- 列表時間顯示規則：2 小時內顯示「N 分鐘前」；今天顯示「HH:MM」；昨天顯示「昨天」；更早顯示「MM/DD」
- 抽屜寬度建議 360px，固定在視窗右側，不遮擋主內容操作

---

## 8. API 介面設計

### 8.1 取得通知列表（收件人視角）

```
GET /api/v1/notifications?is_read=false&page=1&per_page=20

Response 200:
{
  "unread_count": 12,
  "total": 48,
  "page": 1,
  "per_page": 20,
  "notifications": [
    {
      "id": "uuid",
      "title": "報價單審核通過：QT-20260609-001",
      "body": "老撈麻辣鍋 / QT-20260609-001 已通過審核，PDF 輸出已解鎖",
      "target_type": "Quote",
      "target_url": "/quotes/uuid",
      "is_read": false,
      "created_at": "2026-06-09T10:32:00Z"
    }
  ]
}
```

### 8.2 標記單則已讀

```
PATCH /api/v1/notifications/{notification_id}/read

Response 200:
{
  "notification_id": "uuid",
  "is_read": true,
  "read_at": "2026-06-09T10:45:00Z",
  "unread_count": 11   // 更新後的未讀數
}
```

### 8.3 全部標已讀

```
PATCH /api/v1/notifications/read-all

Response 200:
{
  "marked_count": 12,   // 本次標已讀的筆數
  "unread_count": 0
}
```

### 8.4 取得未讀數（供初始載入）

```
GET /api/v1/notifications/unread-count

Response 200:
{
  "unread_count": 12
}
```

> 📋 即時推送（SSE/WebSocket）建立後，此端點主要供初始頁面載入時取得初始值；後續更新由 push 事件維護，不需輪詢。

---

## 9. 業務規則

> ⚠️ **業務規則（BR-004-01）**：通知是個人化的，每位收件人只能查看自己的通知（API 層自動以 `current_user_id` 過濾 `NotificationRecipient.user_id`，不可查詢他人通知）。

> ⚠️ **業務規則（BR-004-02）**：通知永久保留，不設自動清除。`Notification` 與 `NotificationRecipient` 不提供 DELETE 端點。

> ⚠️ **業務規則（BR-004-03）**：通知產生為非同步（Async）操作，不影響觸發事件的主業務回應時間。若通知寫入失敗（如 DB 暫時不可用），記錄錯誤 log，不阻斷主業務操作，不重試（避免重複通知）。

---

## 10. 驗收標準（Acceptance Criteria）

### AC-001：報價單審核通過即時收到通知

```gherkin
Given 業務人員「白菜」有一份 pending_approval 的報價單 QT-20260609-001
When Manager「Sam」審核通過
Then 系統建立一筆 Notification（event_code: NOTIFY_QUOTE_APPROVED）
And 建立一筆 NotificationRecipient（user_id: 白菜, is_read: false）
And 透過 SSE/WebSocket push 給白菜：badge 未讀數 +1
And 若白菜的抽屜為展開狀態，新通知即時插入列表頂部
```

### AC-002：點擊通知標已讀並跳轉

```gherkin
Given 白菜的收件匣抽屜展開，有一則未讀通知「報價單審核通過：QT-20260609-001」
When 白菜點擊此通知
Then NotificationRecipient.is_read 更新為 true，記錄 read_at 時間戳
And 抽屜關閉
And 頁面跳轉至報價單 QT-20260609-001 詳情頁
And badge 未讀數 -1
```

### AC-003：全部標已讀

```gherkin
Given 白菜有 5 則未讀通知，收件匣抽屜展開中
When 白菜點擊「全部標已讀」
Then 所有 NotificationRecipient（user_id: 白菜, is_read: false）批次更新為 is_read: true
And badge 未讀數歸零、隱藏
And 列表中所有通知圓點消失（已讀樣式）
```

### AC-004：篩選未讀

```gherkin
Given 白菜的收件匣有 12 則通知（5 未讀 / 7 已讀）
When 白菜切換篩選至「未讀」
Then 列表僅顯示 5 則未讀通知
And 已讀通知不顯示
And 切換回「全部」後顯示所有 12 則
```

### AC-005：商機建立即時通知總經理

```gherkin
Given 系統中「廖煥庭」為 is_general_manager = true 的 Manager
When 業務人員「白菜」建立商機「鋐揚科技」
Then 系統建立一筆 Notification（event_code: NOTIFY_OPPORTUNITY_CREATED，title: 「新商機建立：鋐揚科技（科技）」）
And 建立一筆 NotificationRecipient（user_id: 廖煥庭, is_read: false）
And 透過 SSE/WebSocket push 給廖煥庭
And 廖煥庭的 badge 未讀數 +1
```

### AC-006：通知不可跨人查看

```gherkin
Given 白菜與 Yvonne 各自有不同的通知
When 白菜呼叫 GET /api/v1/notifications
Then 回傳清單僅包含白菜自己的通知
And 不包含 Yvonne 的任何通知紀錄
```

---

## 11. 待確認事項

| 編號 | 類型 | 問題 | 負責人 | 狀態 |
|------|------|------|--------|------|
| T-22 | REQ-0004 | 即時推送技術選型 | ✅ resolved（v5.6）：SSE（Server-Sent Events）。WebSocket 留作未來雙向需求升級路徑 |

---

## 12. 與其他 REQ 的關係

```
REQ-0001（使用者管理）
  └─ 提供 User 資料（收件人清單）；User 停用後不再收到新通知

REQ-0002（系統設定 S-06）
  └─ 通知事件的啟用 / 停用設定；管道設定（站內 / Email）

REQ-0004（站內通知）← 本文件
  │  被所有業務模組呼叫以建立通知：
  ├─← REQ-0020（商機漏斗）：NOTIFY_OPPORTUNITY_CREATED
  ├─← REQ-0021（報價單）：NOTIFY_QUOTE_SUBMIT / APPROVED / REJECTED
  ├─← REQ-0022（合約管理）：NOTIFY_CONTRACT_EXPIRY / RENEWED
  ├─← REQ-0040（建立專案）：NOTIFY_PROJECT_CREATED（v7.4）
  ├─← REQ-0030（工作流引擎）：NOTIFY_APPROVER_DISABLED / WORKFLOW_PENDING
  └─← 未來各 P1 模組通知事件
```

---

*— REQ-0004 規格文件結束 —*  
*v5.6 新增：站內通知與收件匣（Foundation 層第四支柱）*

---




| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0010 |
| **Use Case ID** | UC-010 |
| **PRD 章節** | 5.2.1 |
| **所屬模組** | F-01 Core 1 實體資料層 |
| **優先級** | `P0` |
| **狀態** | `open` — 規格 v1.2（v5.12 架構重構） |
| **最後更新** | 2026-06-15 |
| **依賴關係** | REQ-0001（RBAC）；無其他上游依賴，本 REQ 是多數模組的資料來源 |

---

## 1. 背景與設計動機

現況：洽談中客戶在業務開發總表、已合作客戶在財務試算表，兩表靠人工同步。目的：建立單一客戶主檔，新增客戶即同步建立商機紀錄，資料共用，不需分兩個入口維護。

---

## 2. 功能描述

> 系統應提供客戶主檔管理，以「客戶公司（Customer）」為頂層實體，下掛品牌（Brand），品牌建立時同步建立商機（Opportunity）。Customer 僅公司名稱必填；Brand 僅品牌名稱必填；所有欄位可隨時補填，不區分洽談或成案階段。

---

## 3. 資料架構：三層實體

```
Customer（客戶公司）            ← 法人主體，一家公司
    └── Brand（品牌）           ← 對外公開品牌，一公司可有多個
            ├── Opportunity     ← 商機紀錄（1:1，建立 Brand 時同步建立）
            └── Project（專案） ← REQ-0040，本 REQ 不含
```

**為什麼要拆 Customer 和 Brand？**

現行合約資料就有品牌編號（A001、A002…）獨立於公司之外。一家公司可能旗下有多個品牌各自合作，例如：合約以品牌為單位簽，但請款、統編是公司層級。系統需同時支援「公司層查詢」（例：這家公司所有合約）和「品牌層查詢」（例：這個品牌今年的服務費）。

---

## 4. Customer（客戶公司）欄位規格

### 4.1 法人基本資料

| 欄位 | 必填 | 格式 | 說明 |
|------|------|------|------|
| `company_name` | **是** | 文字 | 公司全名 |
| `tax_id` | 否 | 8 位數字 | 集團統編；有填時驗證唯一性（重複則提示）；合約甲方統編使用 `Brand.tax_id` |
| `company_address` | 否 | 文字 | 公司登記地址 |
| `company_phone` | 否 | 文字 | 公司總機 |
| `legal_representative` | 否 | 文字 | 負責人姓名 |
| `industry` | 否 | 文字 | 產業別（自由輸入） |
| `notes` | 否 | 多行文字 | 自由備註 |

> ⚠️ `tax_id` 有填時系統驗證唯一性；若與現有客戶重複則顯示提示（不阻擋建立，由使用者判斷）。`tax_id` 建立後需 Admin 才能修改。

### 4.2 帳款資訊（請款 / 匯款用）

| 欄位 | 必填 | 說明 |
|------|------|------|
| `invoice_email` | 否 | 電子發票寄送信箱（可填多個，逗號分隔）；報價單、請款單自動帶入 |
| `bank_account_name` | 否 | 匯款帳戶戶名 |
| `bank_name` | 否 | 銀行名稱 |
| `bank_branch` | 否 | 分行名稱 |
| `bank_account_number` | 否 | 帳號 |
| `payment_notes` | 否 | 付款備註 |

### 4.3 系統計算欄位（唯讀）

| 欄位 | 來源 | 說明 |
|------|------|------|
| `active_contract_count` | REQ-0022 | 目前狀態為「履約中」的主合約數 |
| `total_monthly_revenue` | REQ-0050 | 本月應收金額合計（未稅） |
| `created_at` | 系統 | 建檔日期 |
| `created_by` | 系統 | 建檔者（FK → User） |

> 📋 **客戶分級（customer_grade）掛在 Brand 層**（`Brand.customer_grade`），Customer 主檔不顯示此欄位。

---

## 5. Brand（品牌）欄位規格

一個 Customer 下可有多個 Brand；建立 Brand 時系統同步建立對應的 Opportunity 紀錄（初始狀態 `new`）。

| 欄位 | 必填 | 說明 |
|------|------|------|
| `brand_id_code` | 自動 | 品牌流水編號，格式：A001、A002…（跨客戶全域唯一） |
| `brand_name` | **是** | 品牌名稱，例：老撈麻辣鍋、虎鐵健身 |
| `brand_status` | 自動 | 活躍 / 停止合作（依合約狀態連動） |
| `contact_persons` | 否 | 品牌聯絡人（可多筆，見 5.1） |
| `legal_name` | 否 | 合約甲方法定名稱（可能與 brand_name 不同） |
| `representative` | 否 | 負責人姓名 |
| `address` | 否 | 地址 |
| `tax_id` | 否 | 品牌層統編（可與母公司 Customer.tax_id 不同） |
| `phone` | 否 | 聯絡電話 |
| `notes` | 否 | 品牌備註 |

### 5.1 聯絡人子表（BrandContact）

| 欄位 | 必填 | 說明 |
|------|------|------|
| `name` | 是 | 聯絡人姓名 |
| `title` | 否 | 職稱 |
| `email` | 否 | Email |
| `phone` | 否 | 手機 / 市話 |
| `is_primary` | 是 | 是否為主要聯絡人 |
| `notes` | 否 | 備註 |

---

## 6. 業務規則

### 6.1 統編唯一性驗證

- `Customer.tax_id` 為選填；有填時，系統比對現有資料庫
- 若統編已存在：顯示提示「統一編號 XXXXXXXX 已存在（公司名稱），請確認是否為同一客戶」，但**不阻擋**建立，由使用者自行判斷
- `tax_id` 建立後需 Admin 才能修改（防止誤操作）

### 6.2 客戶 / 品牌建立流程

| 操作 | 系統行為 |
|------|----------|
| 建立 Customer + 第一個 Brand | 同步建立 Opportunity（status = `new`） |
| 在現有 Customer 下新增 Brand | 同步建立新的 Opportunity（status = `new`） |
| 直接在客戶主檔補填資料 | 允許，任何角色隨時可補填任何欄位 |

> ⚠️ **BR-020-01（v5.12 更新）**：商機（Opportunity）只能透過「新增 Brand」建立，不提供獨立的「新增商機」入口。一個 Brand 對應一筆 Opportunity（1:1）。

### 6.3 軟刪除規則

- Customer / Brand 主檔不可硬刪除
- 刪除操作改為「停用」（`is_active = false`），停用後不出現在選擇清單，歷史資料仍可查詢

### 6.4 履約中客戶清單

系統提供 `GET /api/v1/customers?status=active`，回傳至少有一份生效中合約（`is_active = true`）的客戶清單，供 REQ-0050（AR/AP）使用。

### 6.5 RBAC 資料存取規則

| 角色 | Customer 列表 | Customer 詳情 | 新增 / 編輯 | 停用 |
|------|---------------|---------------|------------|------|
| Admin | 全部 | 全部 | ✅ | ✅ |
| Executive | 全部 | 全部 | ✅ | ❌ |
| Manager | 全部 | 全部 | ✅ | ✅ |
| PM/PD | 全部 | 負責品牌完整；其他唯讀 | ✅ | ❌ |
| Finance | 全部 | 全部 | ✅ | ❌ |

---

## 7. 資料模型

### 7.1 Customer 資料表

```
Customer {
  id                    UUID          PK
  company_name          VARCHAR(200)  NOT NULL
  tax_id                CHAR(8)                   -- 選填；有值時全域唯一（UNIQUE，nullable）
  company_address       VARCHAR(300)
  company_phone         VARCHAR(50)
  legal_representative  VARCHAR(100)
  industry              VARCHAR(100)
  invoice_email         VARCHAR(500)              -- 逗號分隔多個信箱
  bank_account_name     VARCHAR(100)
  bank_name             VARCHAR(100)
  bank_branch           VARCHAR(100)
  bank_account_number   VARCHAR(100)
  payment_notes         TEXT
  notes                 TEXT
  is_active             BOOLEAN       DEFAULT true
  created_by            UUID          FK → User.id
  created_at            TIMESTAMP     DEFAULT now()
  updated_at            TIMESTAMP
}
```

### 7.2 Brand 資料表

```
Brand {
  id              UUID          PK
  customer_id     UUID          NOT NULL, FK → Customer.id
  brand_id_code   VARCHAR(10)   NOT NULL, UNIQUE  -- A001, A002...
  brand_name      VARCHAR(200)  NOT NULL
  brand_status    ENUM          active | inactive  DEFAULT active
  legal_name      VARCHAR(200)                    -- 合約甲方法定名稱
  representative  VARCHAR(100)                    -- 負責人姓名
  address         VARCHAR(300)
  tax_id          CHAR(8)                         -- 品牌層統編（選填）
  phone           VARCHAR(50)
  customer_grade  CHAR(1)                         -- S|A|B|C|D，由 REQ-0026 更新
  notes           TEXT
  is_active       BOOLEAN       DEFAULT true
  created_at      TIMESTAMP     DEFAULT now()
  updated_at      TIMESTAMP
}
```

### 7.3 BrandContact 資料表

```
BrandContact {
  id            UUID          PK
  brand_id      UUID          NOT NULL, FK → Brand.id
  name          VARCHAR(100)  NOT NULL
  title         VARCHAR(100)
  email         VARCHAR(200)
  phone         VARCHAR(50)
  is_primary    BOOLEAN       DEFAULT false
  notes         TEXT
  created_at    TIMESTAMP     DEFAULT now()
}
```

### 7.4 實體關係

```
Customer  ──1:N──→ Brand
Brand     ──1:1──→ Opportunity（REQ-0020）
Brand     ──1:N──→ BrandContact
Brand     ──1:N──→ Contract（REQ-0022）
Brand     ──1:N──→ Quote（REQ-0021）
Brand     ──1:N──→ Project（REQ-0040）
```

### 7.5 品牌編號（brand_id_code）生成規則

- 格式：`A` + 3 位流水號，全域遞增（不重置）
- 範例：A001、A002、…A094、A095
- 首次建立品牌時由系統自動指派，不可手動修改

---

## 8. API 介面設計（草稿）

### 8.1 建立客戶（含第一個品牌，同步建立 Opportunity）

```
POST /api/v1/customers

Request Body:
{
  "company_name": "老撈有限公司",          // 必填
  "tax_id": "50863699",                   // 選填
  "industry": "食品",                     // 選填
  "brand": {
    "brand_name": "老撈麻辣鍋",           // 必填
    "contacts": []                        // 選填
  },
  "opportunity": {
    "opportunity_owner_id": "uuid",             // 必填
    "source": "官網",                     // 選填
    "service_lines": ["ad", "social"]    // 選填
  }
}

Response 201:
{
  "customer_id": "uuid",
  "brand_id_code": "A095",
  "brand_id": "uuid",
  "opportunity_id": "uuid",
  "opportunity_status": "new",
  "created_at": "2026-06-15T10:00:00Z"
}
```

### 8.2 新增品牌至現有客戶（同步建立 Opportunity）

```
POST /api/v1/customers/{customer_id}/brands

Request Body:
{
  "brand_name": "老撈新品牌",             // 必填
  "opportunity": {
    "opportunity_owner_id": "uuid"             // 必填
  }
}

Response 201:
{
  "brand_id": "uuid",
  "brand_id_code": "A096",
  "opportunity_id": "uuid",
  "opportunity_status": "new"
}
```

### 8.3 取得履約中客戶清單

```
GET /api/v1/customers?status=active&page=1&per_page=50

Response 200:
{
  "total": 58,
  "customers": [
    {
      "customer_id": "uuid",
      "company_name": "老撈有限公司",
      "brands": [
        {
          "brand_id": "uuid",
          "brand_id_code": "A001",
          "brand_name": "老撈麻辣鍋",
          "brand_status": "active",
          "customer_grade": "C",
          "primary_contact": { "name": "劉昶志", "phone": "..." }
        }
      ],
      "active_contract_count": 1,
      "total_monthly_revenue": 40000
    }
  ]
}
```

---

## 9. UI 規格

### 9.1 品牌列表頁（客戶列表）

**入口**：導覽列「客戶」→ 顯示所有品牌，每個品牌各自一列

**頁面右上角**：「＋ 新增品牌」按鈕 → 彈出新增客戶表單（可選擇歸屬現有公司或新建公司）

**篩選條件**：狀態（洽談中 / 履約中 / 全部）、產業別、商機負責人、關鍵字搜尋（品牌名稱 / 公司名稱）

**列表欄位**：

| 欄位 | 說明 |
|------|------|
| 品牌名稱 | 點擊進入品牌詳情頁 |
| 公司名稱 | 副資訊，灰色字體 |
| 服務標籤 | 品牌的服務類型標籤；顧問案標籤視覺規格見 REQ-0026 §6.4，永遠排在標籤列最前位 |
| 產業別 | — |
| 商機負責人 | opportunity_owner_id 對應人員姓名 |
| 洽談狀態 / 合約狀態 | 洽談中品牌顯示洽談狀態；履約中品牌顯示「履約中」 |
| 本月應收 | 來自 REQ-0050，唯讀；洽談中品牌顯示「—」 |
| 建檔日期 | — |

> 📋 同一家公司旗下有多個品牌時，每個品牌各自獨立一列，不折疊合併。

### 9.2 新增品牌表單（含新增客戶）

**入口**：品牌列表頁右上角「＋ 新增品牌」

```
新增品牌
├── 區塊一：商機資訊（必填區）
│     品牌名稱*、商機負責人*
│     服務線（checkbox 多選）、轉介者、洽談狀態（預設 New）
│     報價金額、立案日（預設今日）、備註
│
├── 區塊二：客戶公司資料
│     歸屬公司（下拉選擇現有公司 或 「＋ 建立新公司」）
│     ↳ 選擇現有公司：帶入現有 Customer 資料，下方欄位唯讀
│     ↳ 建立新公司：展開以下欄位
│         公司名稱*（必填）、統一編號、產業別
│         地址、電話、負責人、電子發票信箱
│         銀行帳戶資訊、付款備註
│
└── 區塊三：品牌資料（選填）
      品牌法定名稱、品牌統編、聯絡人（可多筆）
```

### 9.3 品牌詳情頁（Tab 結構）

從品牌列表點擊品牌名稱進入。品牌本身即為詳情頁主體，不再有獨立的「品牌列表」Tab。

```
品牌詳情頁
  頁面頂部：品牌名稱、品牌編號（A001）、公司名稱（副標題）
            商機負責人、洽談狀態 badge
  ────────────────────────────────────────
  ├── Tab 1：品牌資訊（Brand 欄位）
  │     品牌法定名稱、品牌統編、聯絡人列表、備註
  │     服務類型標籤群組（顧問案標籤視覺規格見 REQ-0026 §6.4，有顧問案時標籤排首位）
  │     客戶分級 badge（customer_grade，來源 REQ-0026）
  │     ⚠️ 若本季 GradingDraft 尚未 published，badge 旁顯示灰色標注「上季參考」；
  │        published 後標注消失，顯示本季生效值
  │
  ├── Tab 2：合約（連結至 REQ-0022，唯讀）
  ├── Tab 3：報價單（連結至 REQ-0021，唯讀）
  ├── Tab 4：專案（連結至 REQ-0040，唯讀）
  ├── Tab 5：財務（連結至 REQ-0050，唯讀）
  │
  ├── Tab 6：商機資訊（Opportunity 欄位，可編輯）
  │     服務線、轉介者、報價金額、立案日、備註、洽談狀態
  │
  ├── Tab 7：公司資訊（Customer 欄位）
  │     法人資料（公司名稱、統編、地址、電話、負責人）
  │     帳款資訊（發票信箱、銀行帳號）
  │     同公司其他品牌列表（唯讀，點擊可跳轉至對應品牌詳情頁）
  │
  └── Tab 8：分級歷史（來源 REQ-0026 GradingRecord，唯讀）
        各季發布紀錄：計算分級 / 最終分級 / 月均收款 / 是否手動微調 / 微調原因
        GradingRevision（Published 後直接修正紀錄）縮排顯示在對應季度 GradingRecord 下方，
        標注修正者角色（Finance / Manager / Admin）及修正原因
        PM/PD 僅可查看自身負責品牌；Admin / Executive / Manager / Finance 可查看所有
```

---

## 10. 驗收標準（Acceptance Criteria）

### AC-001：新增客戶同步建立 Opportunity

```gherkin
Given 業務人員填入品牌名稱「長益蛋品」、選擇業務負責人，送出新增客戶表單
When 表單送出成功
Then 系統建立 Brand 紀錄（brand_id_code 自動指派）
And 同步建立 Opportunity 紀錄（status = 'new'）
And 商機漏斗看板「New」欄出現「長益蛋品」商機卡片
```

### AC-002：統編選填，有填才驗證唯一

```gherkin
Given 系統中已存在統編「50863699」的客戶「老撈有限公司」
When 業務人員建立新客戶時，統編欄位留空
Then 系統正常建立客戶，不顯示任何統編衝突提示
When 業務人員建立新客戶時，填入統編「50863699」
Then 系統顯示提示「統一編號 50863699 已存在（老撈有限公司），請確認是否為同一客戶」
And 仍允許送出建立（不阻擋）
```

### AC-003：Brand 僅品牌名稱必填，公司名稱為公司層必填

```gherkin
Given 業務人員填入品牌名稱「長益蛋品」、業務負責人，並選擇「建立新公司」填入公司名稱「長益蛋品有限公司」，其餘欄位全空
When 表單送出
Then 系統成功建立 Customer、Brand、Opportunity
And 所有選填欄位可事後隨時補填

Given 業務人員填入品牌名稱「長益蛋品」、業務負責人，並選擇「歸屬現有公司：老撈有限公司」
When 表單送出
Then 系統成功建立 Brand、Opportunity，並關聯至現有 Customer「老撈有限公司」
```

### AC-004：品牌編號自動遞增

```gherkin
Given 目前系統中最後一個品牌編號為 A094
When 任一客戶新增一個品牌
Then 新品牌自動取得編號 A095
```

### AC-005：軟刪除不影響歷史資料

```gherkin
Given Admin 將客戶「舊客戶A」設為停用
When 業務人員在報價單選擇客戶
Then「舊客戶A」不出現在選擇清單
When Admin 查詢歷史合約
Then「舊客戶A」的歷史資料仍可查詢
```

---

## 11. 待確認事項

| 編號 | 類型 | 問題 | 負責人 | 狀態 |
|------|------|------|--------|------|
| T-09 | 技術確認 | `invoice_email` 是否需要支援多個信箱改為子表（BrandInvoiceEmail）？ | 後端工程師 | `open` |
| B-21 | 業務決策 | ✅ resolved（v6.4）：客戶詳情頁已改為「品牌詳情頁」六 Tab 結構（商機資訊 / 公司資訊 / 合約 / 報價單 / 財務 / 專案），品牌列表 Tab 移除。Tab 結構符合以品牌為主的操作視角 | — |

---

## 12. 與其他 REQ 的關係

```
REQ-0010（客戶主檔）← 本文件
  │  提供客戶 / 品牌資訊給下游模組
  ├─→ REQ-0020（商機漏斗）：Brand 建立時同步建立 Opportunity（1:1）
  ├─→ REQ-0021（報價單）：客戶資訊自動帶入
  ├─→ REQ-0022（合約管理）：客戶資訊自動帶入
  ├─→ REQ-0040（專案建立）：開案關聯至品牌（v7.4 取代 REQ-0025）
  ├─→ REQ-0026（客戶分級）：寫回 Brand.customer_grade
  ├─→ REQ-0040（專案建立）：專案掛在品牌下
  └─→ REQ-0050（AR/AP）：履約中客戶清單
```

---

*— REQ-0010 規格文件結束（v1.3）—*
*v1.3 變更摘要：UI 改為以品牌為主視角；§9.1 改為品牌列表，每個品牌各自一列；§9.2 新增品牌表單新增「歸屬現有公司」選項；§9.3 改為品牌詳情頁六 Tab 結構，移除品牌列表 Tab；B-21 resolved；B-62 移除；AC-003 更正。*

---

# §5｜REQ-0020 商機漏斗



| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0020 |
| **Use Case ID** | UC-020 |
| **PRD 章節** | 5.3.1 |
| **所屬模組** | F-02 Core 2 商業流程層 |
| **優先級** | `P0` |
| **狀態** | `open` — 規格 v2.0（v5.12 架構重構） |
| **最後更新** | 2026-06-15 |
| **依賴關係** | REQ-0001（RBAC）、REQ-0002（系統設定 — 商機狀態清單）、REQ-0010（客戶主檔，Brand 建立時同步建立 Opportunity） |

---

## 1. 背景與設計動機

現況：商機靠 Google Sheets 手動列管，KPI 需人工填寫、Lost 原因無結構化。目的：商機與客戶資料整合為單一入口，新增客戶即建立商機紀錄，商機漏斗呈現所有洽談中品牌的看板視圖，KPI 自動計算。

---

## 2. 功能描述

> 系統應提供商機漏斗看板，顯示所有洽談狀態非 Won / Lost 之品牌，支援拖曳變更狀態；商機不可獨立新增，由「新增客戶 → 新增品牌」流程同步建立；Lost 時強制記錄類型與原因；並自動計算五項週 KPI 供業務績效追蹤。

---

## 3. 商機生命週期

```
新增客戶（Brand + Opportunity 同步建立）
    │  REQ-0010 入口：填入品牌名稱、業務負責人
    │  Opportunity 初始狀態：new
    │
    ▼
[各洽談狀態間自由流轉]
    │  業務人員在看板拖曳或下拉選擇狀態
    │  自訂狀態由 Admin 在 S-01 系統設定新增
    │
    ├──→ Won（確認合作）
    │       └── 商機移至「已成交」區（不在進行中看板顯示）
    │           won_at 時間戳永久保留
    │           Won 可撤回（won_at 不清除）
    │
    └──→ Lost（確認不合作）
            強制選擇流失類型 + 填入備註
            Lost 為唯一不可撤回的終態
```

---

## 4. 商機狀態設計

### 4.1 系統預設狀態

| 狀態代碼 | 顯示名稱 | 說明 | 是否為終態 |
|----------|----------|------|-----------|
| `new` | New | 品牌進案，初始狀態 | 否 |
| `interviewing` | 訪談安排中 | 已確認訪談時間 | 否 |
| `quoting` | 提案報價中 | 正在製作報價 | 否 |
| `won` | Won | 雙方確認合作 | 否（可撤回） |
| `lost` | Lost | 確定不合作 | 是（不可撤回） |

> 📋 **Won 非終態**：Won 允許撤回，但 `won_at` 時間戳一旦寫入就永久保留，不隨撤回清除。KPI 統計以時間戳為依據，歷史數字不受撤回影響。

### 4.2 自訂狀態規則

Admin 可在系統設定後台（REQ-0002 S-01）新增自訂狀態，插入在 `new` 與 `won`/`lost` 之間，顯示名稱最長 20 字，可停用不可刪除，預設五個狀態不可刪除、不可重命名。

---

## 5. 商機欄位規格

Opportunity 欄位由新增客戶時填入（商機資訊區塊），事後可隨時補充編輯。

| 欄位 | 必填 | 說明 |
|------|------|------|
| `brand_id` | 自動 | FK → Brand.id（建立品牌時自動關聯，UNIQUE） |
| `opportunity_owner_id` | **是** | 商機負責人（FK → User；任何角色均可被指派，v7.0 更名自 `sales_owner_id`） |
| `service_lines` | 否 | 服務線（多選）：行銷顧問、顧問企劃、蝦皮顧問、廣告、口碑、社群、素材、網站建置 |
| `source` | 否 | 開發來源 / 轉介者（文字） |
| `estimated_amount` | 否 | 報價金額（數字） |
| `started_at` | 自動 | 立案日（建立時自動填入，可手動覆寫） |
| `closed_date` | 否 | 結案日期 |
| `notes` | 否 | 備註（自由輸入） |
| `status` | 自動 | 洽談狀態（預設 `new`） |
| `status_updated_at` | 自動 | 最後一次狀態變更時間 |
| `won_at` | 自動 | Won 時間戳（Won 時寫入，撤回不清除） |
| `won_count` | 自動 | 累計 Won 次數 |
| `lost_type` | Lost 時必填 | `contract_terminated` / `not_started` |
| `lost_reason` | Lost 時必填 | 流失原因，不可空白 |
| `lost_at` | 自動 | Lost 時間戳 |

### 5.1 服務線清單（checkbox 多選）

| 代碼 | 顯示名稱 |
|------|----------|
| `marketing_consultant` | 行銷顧問 |
| `consultant_planning` | 顧問企劃 |
| `shopee_consultant` | 蝦皮顧問 |
| `ad` | 廣告 |
| `pr` | 口碑 |
| `social` | 社群 |
| `creative` | 素材 |
| `web` | 網站建置 |

### 5.2 流失類型定義

| 類型代碼 | 類型名稱 | 涵蓋情境 |
|----------|----------|----------|
| `contract_terminated` | 終止合約 | 已正式開案後終止 |
| `not_started` | 未開案 | 洽談中未達成合作 |

---

## 6. 業務規則

### 6.1 狀態流轉規則

```
✅ 任意進行中狀態 → 任意進行中狀態（前進或後退皆允許）
✅ 任意進行中狀態 → won
✅ 任意進行中狀態 → lost（強制填備註）
✅ won → 任意進行中狀態（撤回，won_at 保留）
❌ lost → 任何其他狀態（Lost 是唯一真正終態）
```

### 6.2 商機建立後的通知

```
Brand 建立（→ Opportunity 同步建立）
    └── 系統發送 NOTIFY_OPPORTUNITY_CREATED 通知
            通知對象：總經理（is_general_manager = true）
            通知內容：「[業務姓名] 新增商機：[品牌名稱]」
            通知管道：站內通知 + Email（依 S-06 設定）
```

### 6.3 Lost 強制備註

業務人員標記 Lost 時，必須選擇流失類型並填入流失原因（不可空白），備註為空則阻止送出。

### 6.4 週 KPI 計算邏輯

| KPI 指標 | 計算邏輯 |
|----------|----------|
| 新增商機數 | `COUNT(opportunities WHERE created_at IN 本週)` |
| 成交商機數 | `COUNT(opportunities WHERE won_at IN 本週)` |
| 流失商機數 | `COUNT(opportunities WHERE lost_at IN 本週)` |
| 列管中商機數 | `COUNT(opportunities WHERE status NOT IN ('won','lost'))` |
| 服務中總客戶數 | `COUNT(contracts WHERE status = 'active')`（來自 REQ-0022） |

### 6.5 RBAC 存取規則

| 角色 | 查看看板 | 新增商機 | 編輯 | 更新狀態 | 刪除 | 查看 KPI |
|------|----------|----------|------|----------|------|----------|
| Admin | ✅ | 透過新增客戶 | ✅ | ✅ | ✅ | ✅ |
| Executive | ✅ | 透過新增客戶 | ✅ | ✅ | ✅ | ✅ |
| Manager | ✅ | 透過新增客戶 | ✅ | ✅ | ✅ | ✅ |
| PM/PD | ✅（負責品牌完整）| 透過新增客戶 | 自己負責的 | 自己負責的 | ❌ | 自己的數據 |
| Finance | ✅ | 透過新增客戶 | 自己負責的 | 自己負責的 | ❌ | 自己的數據 |

---

## 7. 資料模型

### 7.1 Opportunity 資料表

```
Opportunity {
  id                UUID          PK
  brand_id          UUID          NOT NULL, UNIQUE, FK → Brand.id  -- 1:1 關係
  opportunity_owner_id    UUID          NOT NULL, FK → User.id
  service_lines     VARCHAR[]                                       -- 服務線多選陣列
  source            VARCHAR(200)                                    -- 開發來源 / 轉介者
  estimated_amount  DECIMAL(12,0)                                  -- 報價金額
  started_at        DATE          NOT NULL  DEFAULT CURRENT_DATE   -- 立案日
  closed_date       DATE                                           -- 結案日期

  -- 狀態
  status            VARCHAR(50)   NOT NULL  DEFAULT 'new'
  status_updated_at TIMESTAMP

  -- Won
  won_at            TIMESTAMP
  won_count         INT           DEFAULT 0

  -- Lost
  lost_type         ENUM          contract_terminated | not_started
  lost_reason       TEXT
  lost_at           TIMESTAMP

  notes             TEXT
  created_by        UUID          FK → User.id
  created_at        TIMESTAMP     DEFAULT now()
  updated_at        TIMESTAMP
}
```

### 7.2 OpportunityStatusLog 資料表

```
OpportunityStatusLog {
  id                UUID        PK
  opportunity_id    UUID        NOT NULL, FK → Opportunity.id
  from_status       VARCHAR(50)
  to_status         VARCHAR(50) NOT NULL
  changed_by        UUID        FK → User.id
  changed_at        TIMESTAMP   DEFAULT now()
  is_won_revoke     BOOLEAN     DEFAULT false
  notes             TEXT
}
```

### 7.3 OpportunityStatus（自訂狀態設定表，存於 REQ-0002 S-01）

```
OpportunityStatus {
  id            UUID        PK
  slug          VARCHAR(50) NOT NULL, UNIQUE
  display_name  VARCHAR(20) NOT NULL
  sort_order    INT         NOT NULL
  is_default    BOOLEAN     DEFAULT false
  is_active     BOOLEAN     DEFAULT true
  is_terminal   BOOLEAN     DEFAULT false   -- 只有 lost = true
}
```

---

## 8. API 介面設計（草稿）

### 8.1 更新商機資訊（欄位補填 / 修改）

```
PATCH /api/v1/opportunities/{opportunity_id}

Request Body（可部分更新）:
{
  "service_lines": ["ad", "social"],
  "source": "官網",
  "estimated_amount": 80000,
  "notes": "5/12 已電話會議"
}

Response 200:
{
  "opportunity_id": "uuid",
  "updated_at": "2026-06-15T10:00:00Z"
}
```

### 8.2 更新商機狀態

```
PATCH /api/v1/opportunities/{opportunity_id}/status

Request Body（一般狀態更新）:
{ "status": "quoting" }

Request Body（標記為 Won）:
{ "status": "won" }

Request Body（Won 撤回）:
{ "status": "quoting", "notes": "客戶臨時暫緩" }

Request Body（標記為 Lost）:
{
  "status": "lost",
  "lost_type": "not_started",
  "lost_reason": "客戶無回應超過兩週"
}

Response 422（Lost 備註空白）:
{ "error": "LOST_REASON_REQUIRED" }

Response 422（嘗試撤回 Lost）:
{ "error": "LOST_IS_TERMINAL" }
```

### 8.3 查詢商機列表（漏斗看板資料）

```
GET /api/v1/opportunities?status=quoting&opportunity_owner_id={uuid}

Response 200:
{
  "total": 8,
  "opportunities": [
    {
      "opportunity_id": "uuid",
      "brand_id": "uuid",
      "brand_name": "長益蛋品",
      "industry": "食品",
      "status": "quoting",
      "opportunity_owner": { "id": "uuid", "name": "Joe" },
      "service_lines": ["ad", "social"],
      "started_at": "2026-05-11",
      "estimated_amount": 80000,
      "days_in_current_status": 14
    }
  ]
}
```

### 8.4 取得週 KPI 數據

```
GET /api/v1/opportunities/kpi?week=2026-W25

Response 200:
{
  "week": "2026-W25",
  "kpi": {
    "new_count": 3,
    "won_count": 1,
    "lost_count": 2,
    "pipeline_count": 9,
    "active_client_count": 57
  }
}
```

---

## 9. UI 規格

### 9.1 商機看板（Kanban）視圖

```
┌──────────┬──────────────┬──────────────┬──────────┬──────────┐
│  New (3) │ 訪談安排中(2)│ 提案報價中(4)│  Won (2) │  Lost    │
├──────────┼──────────────┼──────────────┼──────────┼──────────┤
│ ┌──────┐ │ ┌──────────┐ │ ┌──────────┐ │┌────────┐│  （唯讀）│
│ │長益  │ │ │兆耀物理  │ │ │THURS     │ ││佳毅國際││          │
│ │蛋品  │ │ │治療所    │ │ │服飾      │ ││塑膠棧板││          │
│ │Joe   │ │ │York      │ │ │白菜      │ ││Tora    ││          │
│ │5天   │ │ │14天      │ │ │14天      │ ││Won 3天 ││          │
│ └──────┘ │ └──────────┘ │ └──────────┘ │└────────┘│          │
└──────────┴──────────────┴──────────────┴──────────┴──────────┘
```

- 卡片顯示：品牌名稱、產業別、商機負責人、在當前狀態天數
- Won 欄：可從 Won 拖回進行中欄位（撤回）
- Lost 欄：唯讀，不可拖回
- 拖曳至 Lost 欄：彈出 Lost Modal（強制填備註）
- 不提供「新增商機」按鈕；透過客戶主檔「新增品牌」入口建立

### 9.2 商機列表視圖

可切換，支援多欄排序與篩選。

**篩選條件**：狀態（多選）、商機負責人、服務線、產業別、建立日期區間

**表格欄位**：品牌名稱、產業別、服務線、商機負責人、洽談狀態、立案日、報價金額、在當前狀態天數

### 9.3 週 KPI 儀表板

位置：商機漏斗頁面頂部。

```
┌────────────────────────────────────────────────────────────┐
│  本週業務成效（2026-W25）                          [週選擇器] │
├──────────┬──────────┬──────────┬──────────┬───────────────┤
│ 新增商機  │ 本週成交  │ 本週流失  │  列管中  │  服務中總客戶  │
│    3      │    1      │    2      │   9      │      57       │
└──────────┴──────────┴──────────┴──────────┴───────────────┘
```

---

## 10. 驗收標準（Acceptance Criteria）

### AC-001：商機只能由新增品牌建立

```gherkin
Given 業務人員在商機漏斗頁面
When 業務人員尋找「新增商機」按鈕
Then 頁面不存在獨立的「新增商機」入口
And 商機建立必須透過客戶主檔「新增客戶」或「新增品牌」流程
```

### AC-002：新增品牌自動建立商機

```gherkin
Given 業務人員在 REQ-0010 新增品牌「長益蛋品」，填入業務負責人
When 表單送出成功
Then 系統建立 Opportunity（brand_id = 長益蛋品 Brand.id，status = 'new'）
And 商機看板「New」欄出現「長益蛋品」卡片
```

### AC-003：Lost 備註強制填寫

```gherkin
Given 業務人員嘗試將「長益蛋品」標記為 Lost
When 選擇流失類型但未填寫流失原因就送出
Then 系統顯示「流失原因為必填欄位」
And 商機狀態不更新
```

### AC-004：Won 可撤回，won_at 保留

```gherkin
Given 商機「長益蛋品」於 2026/06/10 更新為 Won（won_at = 2026-06-10）
When 業務人員將商機撤回至「提案報價中」
Then status = 'quoting'
And won_at 仍為 2026-06-10（不清除）
And W24 週的成交數 KPI 仍計入此商機
```

### AC-005：Lost 不可撤回

```gherkin
Given 一個狀態為 Lost 的商機
When 有人嘗試更新此商機狀態為「提案報價中」
Then API 回傳 422「Lost 為不可撤回的終態」
```

### AC-006：自訂狀態出現在看板

```gherkin
Given Admin 在系統設定後台新增狀態「合約審查中」，排序在「提案報價中」之後
When 業務人員進入商機看板
Then 漏斗出現「合約審查中」欄位
And 業務人員可將商機拖曳至此欄
```

---

## 11. 待確認事項

| 編號 | 類型 | 問題 | 負責人 | 狀態 |
|------|------|------|--------|------|
| T-11 | 技術確認 | 週起始日定義：週一還是週日？ | 待指定 | `open` |
| B-24 | 業務決策 | 週 KPI 是否需要匯出為 CSV / Excel？ | 待指定 | `open` |
| B-25 | 業務決策 | 商機漏斗 KPI 視圖範圍：各角色是否顯示全公司 KPI，或僅顯示以自己為 `opportunity_owner` 的商機？（v7.0 更新：原 Sales 限定，現全角色皆適用） | 待指定 | `open` |

---

## 12. 與其他 REQ 的關係

```
REQ-0002（系統設定）
  └─ S-01 維護 OpportunityStatus 自訂狀態清單

REQ-0010（客戶主檔）
  └─ Brand 建立時同步建立 Opportunity（本 REQ 的唯一建立入口）

REQ-0020（商機漏斗）← 本文件
  ├─ 商機建立 → NOTIFY_OPPORTUNITY_CREATED（通知總經理）
  ├─ Won → 提示建立 REQ-0022（合約）
  └─ 「服務中總客戶數」KPI 讀取 REQ-0022 active 合約數

REQ-0060（老闆戰情室）
  └─ 讀取商機漏斗數據顯示簽約率趨勢
```

---

*— REQ-0020 規格文件結束（v2.0）—*
*v2.0 變更摘要：商機與客戶資料整合，Opportunity 由 Brand 建立觸發（1:1）；移除獨立新增商機入口；移除 brand_name 自由輸入、consultant_owner_id、ad_owner_id、Won 後才補 customer_id 機制；新增 service_lines、source、estimated_amount、closed_date；商機漏斗定義為洽談中品牌看板視圖。*

---



# §6｜REQ-0021 報價單管理


| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0021 |
| **Use Case ID** | UC-021 |
| **PRD 章節** | 5.3.2 |
| **所屬模組** | F-02 Core 2 商業流程層 |
| **優先級** | `P0` |
| **狀態** | `open` — 規格初稿 |
| **最後更新** | 2026-06-30（v8.0：審核操作改嵌入報價單詳情頁；estimated_cost 納入快照） |
| **依賴關係** | REQ-0001（RBAC）、REQ-0002（系統設定 — 利潤率門檻）、REQ-0044（服務項目管理 — 服務選單來源）、REQ-0010（客戶主檔）、REQ-0030（工作流引擎 — QUOTE_APPROVAL） |

---

## 1. 背景與設計動機

現況：業務手動填 Excel 公版 → LINE 群組送審 → 無版本控管、審核無稽核記錄、PDF 可繞過審核輸出、開案觸發靠人工通知。目的：線上填寫 → 版本快照 → 審核 → PDF 解鎖 → 客戶回簽上傳 → 報價單進入開案可選清單，全流程數位閉環。

---

## 2. 功能描述

> 系統應提供報價單線上編輯器，支援巢狀報價明細結構、稅額自動計算、版本快照，並透過工作流引擎執行審核流程；審核通過後才可輸出 PDF；客戶回簽掃描上傳後，此報價單即符合建立專案時的可選條件（見 REQ-0040 §4.1）。條款及細則依出單人員選擇的「主要收費方式」自動預載對應段落，段落內可編輯欄位（日期、天數）採 inline 挖空設計，其餘條文固定不可變動。

---

## 3. 報價單完整生命週期

```
建立報價單
    │
    ▼
填寫內容（選主要收費方式、選匯款帳號、填服務項目、設金額）
    │
    ├─ 系統即時試算利潤率
    │   └─ 低於門檻 → 顯示警告（不卡關）
    │
    ▼
送審（呼叫 REQ-0030 QUOTE_APPROVAL 工作流）
    │
    ├─ 審核退回 → 修改 → 建立新版本 → 重新送審
    │
    ▼
審核通過
    │
    ▼
輸出 PDF（審核通過前此功能鎖定）
    │
    ▼
紙本交客戶簽名
    │
    ▼
客戶回簽後掃描上傳至系統
    │
    ▼
此報價單進入建立專案的可選清單（REQ-0040 §4.1 Step 2；由 Admin / Executive / Manager 至專案列表頁發起開案）
```

> ✅ **v5.0 說明（B-21 resolved）**：上述生命週期為**首次報價單（Primary Quote）**的標準流程。追加報價單（Additional Quote）的掛載規則請見第 14 節。

---

## 14. 報價單類型分類（v5.0 新增）

✅ **v5.0 決策（B-21 / B-28 resolved）**：依「是否作為開案門檻」，報價單分為兩類：

### 14.1 首次報價單（Primary Quote）

| 屬性 | 說明 |
|------|------|
| 定義 | 開案時選定的報價單；可為多張 |
| 識別方式 | `Quote.is_primary = true`；同一 Project 可有多張 |
| 可選條件 | 必須同時滿足：`status = approved`、`signed_file_url IS NOT NULL`、`project_id IS NULL`，才出現在建立專案的可選清單中（見 REQ-0040 §4.1） |
| 掛載時機 | 建立專案（REQ-0040 Step 2）時選定，建立完成後系統將 `Quote.project_id` 更新為新 Project.id，並將 `is_primary` 設為 `true` |

> ⚠️ **業務規則（BR-021-01）**：首次報價單的回簽上傳是報價單出現在開案選單的前提條件；未回簽的報價單不進入可選清單。開案入口本身（專案列表頁「＋ 建立專案」按鈕）不設鎖定。

### 14.2 追加報價單（Additional Quote）

| 屬性 | 說明 |
|------|------|
| 定義 | 專案執行中因新需求產生、開案後才掛入的報價單 |
| 識別方式 | `Quote.is_primary = false` |
| 掛載條件 | 不要求客戶回簽；只要 Project 存在且 `status = active`，即可掛載 |
| 掛載時機 | 開案後，由操作者在追加報價單頁面點擊「掛入專案」 |

> ⚠️ **業務規則（BR-021-02）**：追加報價單的掛載（PATCH /api/v1/quotes/{id}/project）不檢查 `signed_file_url`，只要 Project 存在且狀態為 `active`，即可掛載。

### 14.3 資料模型補充

```
Quote 欄位：
  is_primary  BOOLEAN  DEFAULT false
              -- true = 開案時選定的報價單（Primary，可多張）
              -- false = 開案後才追加掛入的報價單（Additional）

-- v9.7 更新：移除唯一性約束（原限制每 Project 最多一張 is_primary = true）
-- 改為：每個 Project 允許多張 is_primary = true 的報價單（開案時複選）
-- 原 UNIQUE INDEX uq_primary_quote_per_project 廢棄
```

---

## 4. 報價單頭部欄位規格

以下為每份報價單共用的頭部欄位：

| 欄位名稱 | 必填 | 資料來源 | 說明 |
|----------|------|----------|------|
| 客戶名稱 | 是 | 客戶主檔（REQ-0010）自動帶入 | 公司全名；系統固定，不可修改 |
| 統一編號 | 是 | 客戶主檔自動帶入 | 系統固定，不可修改 |
| 聯絡電話 | 是 | 客戶主檔自動帶入 | 系統固定，不可修改 |
| 電子發票寄送信箱 | 是 | 客戶主檔自動帶入；可手動覆寫 | 必填，用於電子發票開立 |
| 服務主項目 | 是 | 業務人員手動填寫 | 簡短描述，例：「口碑行銷—KOL 媒合」 |
| 服務階段 | 否 | 業務人員手動填寫 | 選填；填寫當次服務所屬階段，例：「第一階段 引流/轉換機制優化」 |
| 服務期間 | 是 | 業務人員手動填寫 | 起始日～截止日；AR 收款節奏計算依賴此欄位 |
| 主要收費方式 | 是 | 業務人員選擇 | 下拉選單；固定三種選項：月預收制 / 月結制 / 儲值制；決定條款第 2 點顯示的對應付款說明段落；例外情況統一填寫於第 7 條特別注意事項 |
| 匯款帳號 | 是 | 業務人員選擇 | 下拉選單；從系統預設帳戶清單選擇；目前共兩組帳戶（seed data 儲存，不開發動態管理模組）；選定後 PDF 匯款資訊區塊帶入對應帳戶資料 |
| 開單日期 | 否 | 預設系統今日日期；業務人員可在 `draft` 狀態下手動覆寫 | 允許覆寫以支援補簽等情境；PDF 輸出時顯示此欄值 |
| 昊揚地址 | 自動 | 系統固定值 | 103 台北市大同區延平北路一段 104 號 9 樓 |
| 昊揚統編 | 自動 | 系統固定值 | 83652409 |
| 昊揚電話 | 自動 | 系統固定值 | (02)2558-9697 |
> ⚠️ **業務規則（BR-021-03）**：`主要收費方式` 為必填欄位，送審前系統驗證此欄位不可為空；未選擇時阻擋送審並顯示錯誤提示。
>
> ⚠️ **業務規則（BR-021-04）**：`匯款帳號` 為必填欄位，送審前系統驗證此欄位已選擇；未選擇時阻擋送審並顯示錯誤提示。

---

## 5. 報價明細結構：巢狀設計

### 5.1 兩層巢狀規則

報價明細支援兩層結構，業務人員可自由混搭：

```
報價明細
├── 單獨項目（一層，直接顯示金額）
│   範例：Resize  ×5  $4,000
│
└── 組合包（父層，顯示組合總覽）
    ├── 子項目一（顯示子項金額）
    ├── 子項目二
    └── 子項目三
    
    範例：
    KOL 媒合（組合一）
    ├── 人選名單與媒合洽談  一式  $180,000
    ├── 合約擬定與溝通      一式  $0（含於服務費）
    └── 結案報告             一式  $10,000
```

### 5.2 服務項目列的欄位

每一行服務項目包含以下欄位：

| 欄位 | 說明 | 備註 |
|------|------|------|
| 服務類別 | 顧問服務 / 數位廣告 / 社群 / 口碑媒體 / 視覺設計 / 影音製作 / 商品攝影 / 其他 | 從 REQ-0002 系統設定的服務目錄選取，支援自由輸入新增 |
| 服務項目 | 具體服務名稱 | 從系統目錄選取或自由輸入 |
| 服務說明 | 條列式說明服務內容 | 多行文字，支援換行 |
| 單位 | 月 / 一式 / 張 / 支 / 位 / 次 / 其他 | 決定計費基礎 |
| 專案報價 | 金額（未稅） | 數字欄位，整數 |
| 是否為組合包父層 | 是 / 否 | 是時可在其下新增子項目 |
| 付款方式 | 填寫本行服務項目的付款類型 | **公版 B 專屬**；例：「服務前收費」、「月預收制」；可為空；公版 A / C 不顯示此欄 |

### 5.3 小計區塊（自動計算，不可手動修改）

```
小計（未稅）= Σ 所有最底層項目的專案報價
折扣        = 業務人員手動輸入（預設 $0）
稅率        = 5%（固定，不可修改）
稅計        = (小計 - 折扣) × 5%
總計（稅後）= (小計 - 折扣) + 稅計
```

---

## 6. 三種公版樣板規格

業務人員在建立報價單時選擇適用公版，公版決定報價明細的**欄位結構與版面配置**（見 §11.3）。條款及細則的顯示邏輯由「主要收費方式」欄位決定，不依公版類型（見 §7）。

### 6.1 公版 A｜複合性報價單

**適用情境**：固定金額服務 + 百分比抽成服務同時出現（最常見）

> 📋 **v10.0**：公版 A 不再決定條款顯示行為，條款第 2 條依「主要收費方式」欄位連動（見 §7.2）。

**範例使用情境**：顧問費（固定月費）+ META 廣告代操（投放金額 %）同時報價

| 特殊欄位 | 說明 |
|----------|------|
| 無特殊欄位 | 使用標準報價明細結構即可 |

> 📋 **設計說明**：公版 A 沒有額外特殊欄位，因為固定金額直接填在「專案報價」欄，百分比抽成填在「服務說明」欄用文字描述（例：「投放金額 × 20%」）。百分比抽成的實際金額每月結算，不在報價單固定，所以報價單只需呈現費率，不需計算欄位。

---

### 6.2 公版 B｜顧問服務專案報價單

**適用情境**：顧問服務案，有服務階段區分（如第一階段引流、第二階段轉換）

**頭部特殊結構**：客戶資訊區下方有獨立的「專案服務項目」子標題區塊，包含服務主項目、服務階段、服務期間三個欄位（見 §11.3）

**報價明細額外欄位**（公版 B 專屬）：

| 欄位 | 說明 |
|------|------|
| 付款方式 | 每行服務項目可填付款類型，例：「服務前收費」、「月預收制」；可為空 |

> ✅ **v10.0 決策（B-03 resolved）**：分期收費功能確認移除。對照新版公版文件，公版 B 無分期展開結構；每行服務項目的付款方式欄（文字填寫）即為收費方式說明的承載欄位。

---

### 6.3 公版 C｜純廣告服務專用

**適用情境**：僅有廣告投放抽成，無固定顧問費

> 📋 **v10.0**：公版 C 的主要收費方式鎖定為「儲值制」（BR-021-09），條款第 2 條固定顯示儲值制段落，不再依公版類型控制條款顯示（見 §7.2）。

**特殊欄位**：廣告計費參數區塊

公版 C 在報價明細下方新增一個獨立的「廣告計費參數」區塊：

| 計費參數欄位 | 必填 | 說明 |
|-------------|------|------|
| 廣告服務費費率 | 是 | 投放金額的 %，例：20% |
| 掛稿費費率 | 否 | 投放金額的 %，例：4%；不適用時留空 |
| 達標獎金類型 | 否 | 五種類型擇一（見 6.3.1） |
| 達標獎金參數 | 條件必填 | 依選擇的類型顯示對應參數欄位 |

> 📋 **設計說明**：公版 C 的報價金額欄位填 $0 或留空，實際服務費以每月結算時按投放金額計算。報價單的作用是確認費率，而非固定金額。

> 📋 **儲值金明細行說明**：廣告類別下可同時存在固定金額明細行（`QuoteItem.amount` 為正數），例如「META 儲值金 $100,000 /品×10張」屬於廣告代墊款，不受 `QuoteAdConfig` 費率計算限制，直接以固定金額入帳。系統不禁止廣告服務類別下同時出現費率行（$0）與固定金額行（正數）。

#### 6.3.1 達標獎金類型與對應參數

| 類型代碼 | 類型名稱 | 需填寫的參數 | 計算邏輯 |
|----------|----------|-------------|----------|
| `ROAS` | ROAS 型 | 目標 ROAS 倍數、超額抽成比例 % | 目標 = ROAS × 廣告投放金額；超過部分 × 抽成% |
| `FIXED` | 固定達標獎金型 | 目標營業額、達標後固定獎金金額 | 達到目標營業額後，給付固定獎金 |
| `TIERED` | 分層費率型 | 各區間上限金額 + 對應抽成 %（可新增多層） | 不同營業額區間對應不同抽成比例 |
| `DIRECT_PCT` | 官網直抽型 | 各門檻金額 + 對應抽成 %（可新增多層） | 官網總營業額按比例直抽 |
| `EXCESS` | 超額抽成型 | 基準金額、超額抽成比例 % | 超過基準金額的部分才抽成 |

**範例 — TIERED 分層費率型**：
```
區間一：月營業額 ≤ 800,000 → 服務費 20%
區間二：800,001 ～ 1,600,000 → 服務費 15%
區間三：> 1,600,000 → 服務費 12%
```

**範例 — EXCESS 超額抽成型**：
```
基準金額：$60,000（扣除團購後）
超額抽成：超過部分直抽 10%
```

---

## 7. 條款及細則規格（v10.0 全面改寫）

條款共七條，依下列規則顯示與編輯。條款文字具法律效力，除明確標注可編輯欄位外，其餘內容出單人員不可修改。

### 7.1 條款總覽與可編輯範圍

| 條款 | 條文摘要 | 可編輯範圍 | 觸發顯示條件 |
|------|---------|-----------|-------------|
| 第 1 條 | 有效期限聲明：本報價委任單有效期限為 7 日，請於西元＿年＿月＿日前完成確認；逾期後昊揚得重新報價 | **年、月、日** 三個日期欄位（inline 挖空，出單人員填寫） | 固定顯示 |
| 第 2 條 | 收費方式說明（依主要收費方式自動預載對應段落，見 7.2） | 段落內**請款日、付款期限**等數字欄位（inline 挖空） | 固定顯示；段落依主要收費方式連動 |
| 第 3 條 | 匯款手續費由客戶負擔 | 不可變動 | 固定顯示 |
| 第 4 條 | 雙北地區以外實體會議酌收車馬費（實報實銷），併入當期費用請款 | 不可變動 | 固定顯示 |
| 第 5 條 | 本報價委任單作為委任服務內容、執行期間、收費方式及合作條件之依據；經客戶代表人以簽名、電子簽名、電子郵件或電子通訊方式確認後即視為成立 | 不可變動 | 固定顯示 |
| 第 6 條 | 雙方原則上於正式開始服務前完成主合約簽署；如雙方同意先行執行者不在此限；其餘事項依主合約辦理 | 不可變動 | 固定顯示 |
| 第 7 條 | 特別注意事項（備註欄） | **整段可自由填寫**；若填寫則自動帶入「特別注意事項：」開頭文字；可為空白 | 固定顯示 |

> ⚠️ **業務規則（BR-021-05）**：第 3～6 條為固定條文，所有報價單均不得省略，確保法律完整性。
>
> ⚠️ **業務規則（BR-021-06）**：條款區塊的 inline 可編輯欄位（第 1 條日期、第 2 條數字）以視覺方式明確區分（例：底線框或淺藍底色），讓出單人員清楚識別哪些位置可填寫。

### 7.2 第 2 條收費方式段落連動規則

第 2 條依報價單頭部「主要收費方式」欄位自動預載對應段落，一次僅顯示一個段落，其餘不顯示：

| 主要收費方式 | 顯示段落 | 可編輯欄位 |
|-------------|---------|-----------|
| 月預收制 | 服務前收費，昊揚將於每月「**X**」日請款，並於請款單確認後開立發票，請於「**Y**」日前完成付款。（例：5 月之顧問服務費，於 5/**X** 請款，請於 5/**Y** 前完成付款。） | **X**（請款日）、**Y**（付款截止日），均為數字，inline 挖空 |
| 月結制 | 服務後收費，昊揚於每月初結算上個月份服務費與獎金，並於每月「**X**」日請款，並於請款單確認後開立發票，請於「**Y**」日前完成付款。（例：4 月之廣告投放服務費與營業額目標獎金，於 5 月初結算，並於 5/**X** 請款，請於 5/**Y** 前完成付款。） | **X**（請款日）、**Y**（付款截止日），均為數字，inline 挖空 |
| 儲值制 | 依當次行銷廣告量需求，預先對當次廣告投放預算款項與服務費請款，並於請款單確認後開立發票，請於請款後「**N**」日內完成付款。（例：於 5/5 請款，請於 5/**N** 前完成付款。） | **N**（付款期限天數），為數字，inline 挖空 |
> 📋 **B-70 resolved（v10.0）**：主要收費方式確定為三種固定選項（月預收制 / 月結制 / 儲值制），不設「其他」類別。例外收費情況統一填寫於第 7 條特別注意事項，第 2 條不開放自由輸入。

> ⚠️ **業務規則（BR-021-07）**：第 2 條對應段落由「主要收費方式」欄位決定，與報價明細行的服務類別無關。主要收費方式為必填欄位（BR-021-03），因此第 2 條不會出現空白段落的情況。
>
> ⚠️ **業務規則（BR-021-08）**：第 2 條 inline 可編輯欄位（請款日、付款截止日、付款期限）預設帶入系統預設值（X=5、Y=10、N=5），出單人員可手動覆寫為其他數字；欄位不可為空，若清空則送審驗證阻擋。
>
> ⚠️ **業務規則（BR-021-09）**：公版 C（`template_type = C`）建立報價單時，「主要收費方式」欄位自動鎖定為「儲值制」，不開放選擇其他收費方式；第 2 條固定顯示儲值制段落，inline 可編輯欄位為付款期限天數（N）。

---

## 8. 利潤率即時試算

### 8.1 計算公式

```
委外成本（預估）= 業務人員手動輸入（可選填），對應欄位 Quote.estimated_cost
利潤率 = (小計未稅 - 委外成本) ÷ 小計未稅 × 100%
```

### 8.2 顯示規則（送審者視角）

| 利潤率狀態 | 系統行為 |
|------------|----------|
| ≥ 30%（系統設定門檻） | 顯示綠色提示「利潤率 XX%，符合規範」 |
| < 30% | 顯示橘色警告「⚠️ 利潤率 XX%，低於建議門檻 30%，請確認後送審」 |
| 未填委外成本 | 不顯示利潤率（不強制填寫） |

> ⚠️ 利潤率警告**不阻擋送審**，業務人員確認後仍可繼續送審。此為刻意設計。  
> ⚠️ 利潤率門檻 30% 由 REQ-0002 系統設定後台控制，可調整。

### 8.3 快照納入與審核者視角顯示規則（v8.0 新增）

> ⚠️ **v8.0 修正**：v7.9 及之前版本的 `estimated_cost` 僅作為前端即時試算輔助欄位，未納入送審快照，審核者無法得知送審者填寫的委外成本與利潤率。業主反饋審核者需要這項資訊才能判斷是否核准，故 v8.0 起 `estimated_cost` 正式納入 `QuoteVersion` 快照欄位（見 9 節），並在審核操作區一併顯示。

**審核者視角顯示規則**：審核操作區（見 16.3）的報價明細下方，顯示「利潤率資訊」區塊，呈現送審當下版本快照中的 `estimated_cost` 與計算出的利潤率：

| 快照中的 estimated_cost 狀態 | 審核操作區顯示內容 |
|------|------|
| 已填寫，利潤率 ≥ 30% | 委外成本金額 + 綠色利潤率色塊「利潤率 XX%，符合規範」 |
| 已填寫，利潤率 < 30% | 委外成本金額 + 橘色利潤率色塊「⚠️ 利潤率 XX%，低於建議門檻 30%」 |
| 未填寫 | 灰色文字「—（送審者未填寫預估委外成本）」 |

> 📋 此區塊純供審核者參考，不影響審核流程；即使利潤率偏低或未填，審核者仍可自行決定核准或退回（不阻擋）。

---

## 9. 版本快照規則

| 規則 | 說明 |
|------|------|
| 觸發時機 | 每次點擊「送審」時建立快照（不是每次儲存） |
| 快照內容 | 送審當下報價單所有欄位的完整資料（JSON），包含所有 QuoteItem，**並包含 `estimated_cost`（v8.0 新增）** |
| 版本號格式 | v1、v2、v3…（每次送審遞增） |
| 保存規則 | 舊版快照永久保留，不可刪除 |
| 查看方式 | 報價單頁面提供版本歷史面板，可切換查看任一版本快照（唯讀） |
| 儲存位置 | `QuoteVersion` 資料表（報價單側管理，見 14.3） |

> 📋 **快照 owner 設計（v1.1 修正）**：快照由報價單模組的 `QuoteVersion` 表管理，工作流引擎的 `WorkflowInstance` 只持有 `source_version_id`（指向 QuoteVersion.id 的參照），不存完整 JSON。這確保快照生命週期與報價單綁定，且符合模組邊界原則（工作流引擎不需知道報價單的欄位結構）。
>
> 📋 **v8.0 補充**：`estimated_cost` 屬於 Quote 正式欄位（見 14.1 資料模型），自 v8.0 起與其他報價單欄位一併納入 `QuoteVersion` 快照，無需額外的資料表設計異動，僅需確保快照寫入邏輯涵蓋此欄位。

---

## 10. 審核流程

報價單的審核流程由 **REQ-0030 工作流引擎（QUOTE_APPROVAL）** 執行，本節僅說明報價單特有的行為：

| 節點 | 說明 |
|------|------|
| 送審前檢查 | 必填欄位完整（含電子發票信箱、主要收費方式、匯款帳號、第 1 條有效期限日期、第 2 條 inline 數字欄位）；系統自動驗證，不滿足則阻止送審 |
| 利潤率警告（送審者視角） | 低於門檻顯示警告，業務人員確認後仍可送審（不阻擋） |
| **審核操作位置（v8.0 變更）** | **審核者直接在報價單詳情頁完成審核，不再經過獨立審核頁（詳見 16.3）；審核操作區同時顯示利潤率資訊供審核參考（見 8.3）** |
| 審核通過後 | PDF 輸出功能解鎖 |
| 審核退回後 | PDF 輸出維持鎖定；業務人員修改後建立新版本重新送審 |
| 記錄內容 | 送審時間戳、審核者、審核時間戳、版本號（對應 SOP BDP-11 規範） |

---

## 11. PDF 輸出規格

### 11.1 觸發條件

- 報價單狀態為 `approved`（審核通過）才可輸出
- 未通過前，PDF 輸出按鈕為鎖定狀態（灰色，hover 顯示「請先完成審核」）

### 11.2 PDF 內容對應

| PDF 區塊 | 對應系統欄位 |
|----------|-------------|
| 昊揚 Logo + 公司資訊 | 系統固定值 |
| **文件標題** | 公版 A / C → 「報價委任單」；公版 B → 「顧問服務專案報價單」（依 `template_type` 條件渲染；與 §11.3 版面差異一致） |
| 客戶資訊區塊 | 報價單頭部欄位（REQ-0010 帶入）；服務階段欄位若出單人員有填寫則顯示，否則省略 |
| 報價內容表格 | 巢狀報價明細（含父層/子層縮排）；報價明細行若有填寫「付款方式」欄則顯示，否則省略 |
| 小計 / 折扣 / 稅率 / 總計 | 自動計算結果 |
| 條款及細則 | 依 §7 規則顯示：第 1 條（有效期限，含 inline 日期欄位）、第 2 條（依主要收費方式顯示對應段落，含 inline 數字欄位）、第 3～6 條（固定顯示）、第 7 條（特別注意事項，可為空） |
| 匯款資訊 | 依 `bank_account_id` 帶入對應 `SystemBankAccount` 的戶名、銀行、分行、帳號 |
| 客戶簽章欄 + 昊揚承辦人簽章欄 | 留白（紙本簽名用） |
| 開單日期 | `Quote.quote_date`；預設 PDF 輸出當天，業務人員可在 `draft` 狀態下手動覆寫 |

### 11.3 PDF 格式要求

- A4 直式
- 若報價明細超過一頁，自動分頁，匯款資訊與簽章欄固定在最後一頁
- 輸出格式：PDF/A（確保可長期保存，不依賴特定字體）

**各公版版面差異：**

| 面向 | 公版 A（泛用） | 公版 B（顧問服務） | 公版 C（純廣告） |
|------|--------------|-----------------|---------------|
| **文件標題** | 報價委任單 | 顧問服務專案報價單 | 報價委任單 |
| **客戶資訊區結構** | 「客戶資訊」子標題，包含：客戶名稱、統一編號、聯絡電話、電子發票寄送信箱、服務主項目、服務期間 | 「客戶資訊」子標題（客戶名稱、統一編號、聯絡電話、電子發票寄送信箱）＋獨立「專案服務項目」子標題（服務主項目、服務階段、服務期間） | 同公版 A |
| **報價明細欄位與順序** | 服務類別 → 服務項目 → 服務說明 → 單位 → 專案報價 | 服務類別 → 服務項目 → 服務內容 → 專案報價（未稅）→ 單位 → 付款方式 | 服務類別 → 服務項目 → 服務說明 → 單位 → 專案報價（金額可為 $0） |
| **報價明細下方** | 小計 / 折扣 / 稅率 / 總計（含稅） | 小計 / 折扣 / 稅率 / 總計（含稅）＋右側「本次請款金額」小計框並排 | 小計 / 折扣 / 稅率 / 總計（含稅） |
| **廣告計費參數區塊** | 無 | 無 | 報價明細下方顯示獨立「廣告計費參數」區塊（QuoteAdConfig） |
| **主要收費方式選項** | 月預收制 / 月結制 / 儲值制 | 月預收制 / 月結制 / 儲值制 | **鎖定為儲值制**（見 BR-021-09） |
| **匯款資訊位置** | 條款下方獨立區塊 | 條款下方，左側匯款資訊、右側本次請款金額框並排 | 條款下方獨立區塊 |

> ⚠️ **業務規則（BR-021-09）**：公版 C（純廣告服務）的「主要收費方式」欄位建立報價單時自動鎖定為「儲值制」，出單人員不可選擇其他收費方式；條款第 2 條固定顯示儲值制段落。

> 📋 報價明細欄位標題依 `template_type` 渲染：`service_desc` 欄位在公版 A/C 輸出標題為「服務說明」，在公版 B 輸出標題為「服務內容」；欄位順序亦依 `template_type` 條件切換。

---

## 12. 客戶回簽上傳

### 12.1 上傳規格

| 項目 | 規格 |
|------|------|
| 上傳格式 | PDF / JPG / PNG |
| 上傳方式 | 拖曳或點選上傳 |
| 檔案大小限制 | 建議 ≤ 10 MB（待技術確認） |
| 命名規則 | 系統自動命名：`{客戶名稱}_{報價單編號}_回簽_{日期}.pdf` |

### 12.2 上傳後系統行為

```
客戶回簽上傳完成
    │
    ├─ 報價單狀態更新為「已回簽」
    │
    ├─ 記錄回簽日期
    │
    └─ 此報價單進入 REQ-0040 建立專案 Step 2 的可選清單
```

> ⚠️ 客戶回簽上傳後，此報價單即符合「建立專案 Step 2」的可選條件（REQ-0040 §4.1）；系統不自動跳轉或解鎖任何按鈕，由操作者至專案列表頁主動發起開案。

---

## 13. 報價單狀態機

```
               建立
new ──────────────────→ draft
                           │
                    填寫完成，送審
                           │
                           ▼
                    pending_approval  ←─────────────┐
                           │                        │
                  ┌────────┴────────┐               │
               通過              退回               │
                  │                │           重新送審
                  ▼                ▼               │
              approved          rejected ──────────┘
                  │
           PDF 輸出 + 客戶簽名
                  │
                  ▼
              signed（客戶回簽上傳完成）
                  │
                  └─→ 解鎖開案交接（REQ-0025）

cancelled（任何狀態皆可由 Admin 作廢）
```

| 狀態 | 說明 |
|------|------|
| `draft` | 填寫中，可編輯，未送審 |
| `pending_approval` | 審核中，不可編輯，PDF 鎖定 |
| `approved` | 審核通過，PDF 可輸出，等待客戶回簽 |
| `rejected` | 審核退回，可編輯修改後重新送審 |
| `signed` | 客戶回簽上傳完成，此報價單進入建立專案可選清單（REQ-0040 §4.1） |
| `cancelled` | 已作廢，不可繼續操作 |

---

## 14. 資料模型

### 14.1 Quote（報價單主表）

```
Quote {
  id                UUID        PK
  quote_number      VARCHAR     報價單編號（格式待定，建議：QT-YYYYMMDD-XXXX）
  customer_id       UUID        FK → Customer.id
  brand_id          UUID        FK → Brand.id（可選）
  project_id        UUID        FK → Project.id（掛載至專案後填入；null = 尚未掛載）
  is_primary        BOOLEAN     DEFAULT false  -- true = 首次報價單（開案門檻）；false = 追加報價單
  template_type     ENUM        A | B | C  -- v10.0：保留欄位供 PDF 版面差異判斷，但條款顯示邏輯已改由 payment_method 決定
  payment_method    VARCHAR     NOT NULL    -- 主要收費方式；值域固定三種：月預收制 | 月結制 | 儲值制（B-70 resolved）；決定條款第 2 點顯示對應段落；例外情況填寫於第 7 條特別注意事項
  bank_account_id   UUID        NOT NULL    FK → SystemBankAccount.id  -- 出單人員選擇的匯款帳戶；PDF 匯款資訊區塊依此帶入帳戶資料
  service_period_start  DATE
  service_period_end    DATE
  service_summary   VARCHAR     服務主項目（簡短描述）
  service_stage     VARCHAR     服務階段（選填；例：「第一階段 引流/轉換機制優化」）
  quote_date        DATE        DEFAULT today()  -- 開單日期；draft 狀態下業務人員可覆寫（支援補簽情境）
  subtotal          DECIMAL     小計未稅
  discount          DECIMAL     折扣（預設 0）
  tax_amount        DECIMAL     稅計（= (subtotal - discount) × 0.05）
  total             DECIMAL     總計稅後
  profit_rate       DECIMAL     利潤率（若有填委外成本才計算）
  estimated_cost    DECIMAL     預估委外成本（可選；v8.0 起隨送審動作一併寫入 QuoteVersion 快照，供審核者於審核操作區查看，見 8.3 / 9 節）
  status            ENUM        draft | pending_approval | approved | rejected | signed | cancelled
  signed_file_url   VARCHAR     客戶回簽掃描檔連結
  signed_at         TIMESTAMP   回簽上傳日期
  created_by        UUID        FK → User.id（建立者）
  created_at        TIMESTAMP
  updated_at        TIMESTAMP
}

-- v9.7 更新：廢棄唯一性約束（原限制每 Project 最多一張 is_primary = true）
-- 開案時支援選定多張報價單，均設 is_primary = true
-- 原 UNIQUE INDEX uq_primary_quote_per_project 不建立
```

### 14.2 QuoteItem（報價明細）

```
QuoteItem {
  id                UUID        PK
  quote_id          UUID        FK → Quote.id
  parent_item_id    UUID        FK → QuoteItem.id（null = 頂層項目）
  sort_order        INT         同層排序
  service_category  VARCHAR     服務類別
  service_name      VARCHAR     服務項目名稱
  service_desc      TEXT        服務說明（多行）
  unit              VARCHAR     計費單位
  unit_price        DECIMAL     單價（廣告服務類別可為 0，表示以費率計費；其他服務類別通常為正數）
  quantity          DECIMAL     數量（預設 1）
  amount            DECIMAL     小計（= unit_price × quantity；null = 洽談報價，PDF 輸出顯示「專案報價」文字）
  payment_type      VARCHAR     付款方式（公版 B 專屬欄位；例：「服務前收費」/ 「月預收制」；公版 A / C 為 null）
  is_quoted_separately  BOOLEAN DEFAULT false  -- true 時 amount 為 null，表示金額另議
  is_bundle_parent  BOOLEAN     是否為組合包父層
  -- v10.0：移除分期收費欄位（is_installment / installment_name / installment_due）
  -- 對照新版公版文件確認分期收費功能不存在，B-03 resolved
}
```

### 14.3 QuoteAdConfig（廣告計費參數）

```
QuoteAdConfig {
  id                UUID        PK
  quote_id          UUID        FK → Quote.id（unique，一份報價單一筆）
  service_fee_rate  DECIMAL     廣告服務費費率 %
  listing_fee_rate  DECIMAL     掛稿費費率 %（可 null）
  bonus_type        ENUM        null | ROAS | FIXED | TIERED | DIRECT_PCT | EXCESS
  bonus_params      JSONB       依 bonus_type 儲存對應參數
}
```

**bonus_params 範例（TIERED）**：
```json
{
  "tiers": [
    { "max": 800000, "rate": 0.20 },
    { "max": 1600000, "rate": 0.15 },
    { "max": null, "rate": 0.12 }
  ]
}
```

### 14.4 QuoteVersion（版本快照表）

快照由報價單側管理，工作流引擎透過 `source_version_id` 參照，不持有完整 JSON：

```
QuoteVersion {
  id              UUID        PK
  quote_id        UUID        NOT NULL, FK → Quote.id
  version_number  INT         NOT NULL           -- 1, 2, 3...（每次送審遞增）
  snapshot        JSONB       NOT NULL           -- 送審當下 Quote + QuoteItems 的完整資料
  submitted_by    UUID        FK → User.id       -- 本次送審者
  created_at      TIMESTAMP   DEFAULT now()      -- 快照建立時間（等於送審時間）
}
```

> ⚠️ `QuoteVersion` 不提供 UPDATE / DELETE 操作，快照永久保留，與稽核日誌同等性質。

### 14.5 實體關係

```
Customer           ──1:N──→ Quote
Brand              ──1:N──→ Quote
SystemBankAccount  ──1:N──→ Quote（via bank_account_id）
Quote              ──1:N──→ QuoteItem（支援自關聯 parent_item_id）
Quote              ──1:1──→ QuoteAdConfig（廣告計費參數；template_type = C 預設啟用，其他公版可依需求啟用）
Quote              ──1:N──→ QuoteVersion（每次送審建立一筆快照）
QuoteVersion       ──1:N──→ WorkflowInstance（via WorkflowInstance.source_version_id）
Quote              ──1:N──→ WorkflowInstance（REQ-0030，via WorkflowInstance.source_id）
```

### 14.6 SystemBankAccount（系統預設收款帳戶）

```
SystemBankAccount {
  id            UUID        PK
  account_name  VARCHAR     戶名（例：昊揚顧問股份有限公司）
  bank_name     VARCHAR     銀行名稱（例：第一商業銀行）
  branch_name   VARCHAR     分行名稱（例：大稻埕分行）
  account_no    VARCHAR     帳號（例：111-10-311612）
  is_active     BOOLEAN     DEFAULT true
}
-- 此資料表以 seed data 初始化，不提供後台管理介面
-- 目前共兩筆預設帳戶：
--   帳戶 A：第一商業銀行 大稻埕分行 111-10-311612
--   帳戶 B：第一商業銀行 內湖分行 105-10-015385
```

---

## 15. API 介面設計（草稿）

### 15.1 建立報價單

```
POST /api/v1/quotes

Request Body:
{
  "customer_id": "uuid",
  "brand_id": "uuid",
  "template_type": "A",
  "payment_method": "月預收制",
  "bank_account_id": "uuid",
  "service_summary": "KOL 媒合專案",
  "service_period_start": "2026-06-01",
  "service_period_end": "2026-12-31"
}

Response 201:
{
  "quote_id": "uuid",
  "quote_number": "QT-20260511-0042",
  "status": "draft",
  "customer": { "name": "...", "tax_id": "..." },  // 自動帶入
  "created_at": "..."
}
```

### 15.2 新增 / 更新報價明細

```
PUT /api/v1/quotes/{quote_id}/items

Request Body:
{
  "items": [
    {
      "id": null,  // null = 新增，有值 = 更新
      "parent_item_id": null,
      "sort_order": 1,
      "service_category": "口碑媒體",
      "service_name": "KOL 媒合",
      "service_desc": "1. 提供人選名單\n2. 合作洽談\n3. 結案報告",
      "unit": "一式",
      "unit_price": 300000,
      "quantity": 1,
      "is_bundle_parent": false
    }
  ]
}

Response 200:
{
  "items": [...],
  "subtotal": 300000,
  "discount": 0,
  "tax_amount": 15000,
  "total": 315000,
  "profit_rate": null  // 未填委外成本
}
```

### 15.3 計算利潤率

```
POST /api/v1/quotes/{quote_id}/profit-estimate

Request Body:
{
  "estimated_cost": 200000
}

Response 200:
{
  "subtotal": 300000,
  "estimated_cost": 200000,
  "profit": 100000,
  "profit_rate": 0.333,    // 33.3%
  "threshold": 0.30,
  "is_below_threshold": false
}
```

### 15.4 輸出 PDF

```
POST /api/v1/quotes/{quote_id}/export-pdf

前置條件：status = approved

Response 200:
{
  "pdf_url": "https://...",
  "expires_at": "2026-05-18T10:00:00Z"  // 簽名 URL，7 天有效
}

Response 403（未審核通過）:
{
  "error": "PDF_LOCKED",
  "message": "報價單尚未通過審核，無法輸出 PDF"
}
```

### 15.5 上傳客戶回簽

```
POST /api/v1/quotes/{quote_id}/signed-upload
Content-Type: multipart/form-data

form-data:
  file: <binary>

Response 200:
{
  "signed_file_url": "https://...",
  "signed_at": "2026-05-15",
  "status": "signed",
  "available_for_project": true   // 此報價單已符合建立專案 Step 2 可選條件
}
```

---

## 16. UI 規格

### 16.1 報價單編輯器佈局

```
┌─────────────────────────────────────────────┐
│  主要收費方式：[下拉選單 ▼]（必填）             │
├─────────────────────────────────────────────┤
│  客戶資訊區塊（自動帶入，唯讀 + 可覆寫）        │
│  服務階段（選填）                               │
├─────────────────────────────────────────────┤
│  報價明細                              [＋新增項目] │
│  ┌──────────────────────────────────────┐   │
│  │ 服務類別 │ 服務項目 │ 說明 │ 單位 │ 金額 │[付款方式*]│
│  ├──────────────────────────────────────┤   │
│  │ 口碑媒體 │ KOL 媒合 │ ... │ 一式 │ 300,000│ — │
│  │   └─ [設為組合包] / [新增子項目]          │   │
│  └──────────────────────────────────────┘   │
│  *「付款方式」欄為選填，依報價需求填寫            │
├─────────────────────────────────────────────┤
│  小計：$300,000  折扣：$0  稅計：$15,000      │
│  總計（稅後）：$315,000                        │
│  ─────────────────────────────────────────   │
│  （委外成本已移至報價單管理頁面另行顯示）          │
├─────────────────────────────────────────────┤
│  [廣告計費參數區塊（依報價需求啟用）]              │
├─────────────────────────────────────────────┤
│  條款及細則（依主要收費方式自動連動顯示）           │
├─────────────────────────────────────────────┤
│  開單日期：[系統日期，可覆寫]                    │
├─────────────────────────────────────────────┤
│  匯款資訊                                       │
│  匯款帳號：[下拉選單 ▼]（必填）                   │
│  ↳ 選定後顯示：戶名 / 銀行 / 分行 / 帳號（唯讀）  │
├─────────────────────────────────────────────┤
│       [儲存草稿]  [送審]                        │
└─────────────────────────────────────────────┘
```

> 📋 匯款帳號由出單人員從下拉選單選擇（目前共兩組系統預設帳戶），選定後對應的戶名、銀行、分行、帳號以唯讀方式顯示於下方，並帶入 PDF 匯款資訊區塊。帳戶資料以 seed data 儲存，不開發動態管理模組。

### 16.2 報價單列表頁欄位

| 欄位 | 說明 |
|------|------|
| 報價單編號 | QT-YYYYMMDD-XXXX |
| 客戶名稱 | — |
| 服務主項目 | — |
| 總計（稅後） | — |
| 主要收費方式 | 月預收制 / 月結制 / 儲值制 |
| 狀態 badge | draft / 審核中 / 已通過 / 已退回 / 已回簽 / 已作廢 |
| 建立日期 | — |
| 操作 | 查看、編輯（draft/rejected）、送審、輸出 PDF（approved+）、上傳回簽（approved+） |

### 16.3 審核操作區（v8.0 新增，嵌入報價單詳情頁）

> ⚠️ **v8.0 設計變更**：審核操作不再透過獨立的審核詳情頁進行，而是直接嵌入報價單詳情頁。詳見 REQ-0030 §1 / §8.2 的整體設計說明。

**顯示條件**：報價單狀態為 `pending_approval` **且** 登入者為該筆 WorkflowInstance 的指定審核者（依 REQ-0030 §4.5 具名審核者設定）。

**區塊位置**：報價單詳情頁頂部或底部固定顯示（建議固定於底部，操作時內容滾動，操作區常駐可見）。

**區塊內容**：

```
┌─────────────────────────────────────────────┐
│  報價單詳情頁（送審當下版本快照，唯讀）            │
│  ── 客戶資訊 / 報價明細 / 小計折扣稅計 / 條款 ──   │
├─────────────────────────────────────────────┤
│  利潤率資訊（見 8.3）                          │
│  預估委外成本：$XX,XXX                          │
│  利潤率：XX%  [綠色/橘色色塊，或「—未填寫」]       │
├─────────────────────────────────────────────┤
│  版本歷史面板（可切換查看 v1、v2…）               │
├─────────────────────────────────────────────┤
│  審核操作區（僅指定審核者可見）                   │
│  備註（選填）：[________________]               │
│  [核准]                [退回（需填原因）]         │
└─────────────────────────────────────────────┘
```

**操作後行為**：

| 操作 | 系統行為 |
|------|----------|
| 點擊「核准」 | WorkflowInstance → `approved`；報價單 PDF 輸出解鎖；通知送審者；Inbox 該筆項目移至「已核准」分頁 |
| 點擊「退回」 | 彈出退回原因輸入框（必填，不可空白送出）；確認後 WorkflowInstance → `rejected`；報價單回到 `draft`；通知送審者含退回原因；Inbox 該筆項目移至「已退回」分頁 |

**非審核者檢視**：若登入者不是指定審核者（例如其他 Sales、PM/PD、Finance，或非被指派的 Manager），報價單詳情頁不顯示審核操作區，僅顯示「審核中」狀態 badge，內容維持唯讀。

---

## 17. 驗收標準（Acceptance Criteria）

### AC-001：自動帶入客戶資訊

```gherkin
Given 業務人員選擇客戶「老撈有限公司」並建立報價單
When 報價單編輯器開啟
Then 客戶名稱、統一編號、聯絡電話、電子發票信箱自動填入
And 昊揚地址、統編、電話自動填入
And 匯款帳號下拉選單顯示系統預設帳戶清單，需出單人員手動選擇
And 以上自動填入欄位初始為唯讀，電子發票信箱可手動覆寫
```

### AC-002：巢狀報價明細正確計算

```gherkin
Given 報價單含一個組合包（子項 A: $100,000 + 子項 B: $50,000）+ 一個單獨項目（$30,000）
When 系統計算小計
Then 小計未稅 = $180,000
And 稅計 = $9,000
And 總計稅後 = $189,000
And 父層組合包不重複計算（父層無獨立金額，只加總子層）
```

### AC-003：利潤率警告不阻擋送審

```gherkin
Given 報價單小計 $100,000，委外成本填入 $75,000（利潤率 25%，低於門檻 30%）
When 業務人員點擊「送審」
Then 系統顯示橘色警告「利潤率 25%，低於建議門檻 30%，確認送審？」
And 業務人員點擊確認後，WorkflowInstance 正常建立（status: pending_approval）
And 不阻擋送審流程
And 委外成本 $75,000 與利潤率 25% 一併寫入 QuoteVersion 快照
```

### AC-004：PDF 在審核通過前鎖定

```gherkin
Given 報價單狀態為 pending_approval（審核中）
When 業務人員嘗試點擊「輸出 PDF」
Then 按鈕為灰色停用狀態
And API 呼叫回傳 403 PDF_LOCKED
```

### AC-005：審核通過後 PDF 解鎖

```gherkin
Given 報價單狀態從 pending_approval 變為 approved
When 業務人員進入報價單頁面
Then「輸出 PDF」按鈕變為可點擊狀態
And 點擊後系統生成 PDF 並提供下載連結
```

### AC-006：主要收費方式連動條款段落顯示（v10.0 改寫）

```gherkin
Given 業務人員選擇主要收費方式為「月預收制」
When 報價單條款區塊渲染
Then 第 2 條顯示月預收制段落（含可編輯的請款日、付款截止日 inline 欄位）
And 月結制、儲值制段落不顯示
And 第 1、3、4、5、6、7 條正常顯示

Given 業務人員選擇主要收費方式為「月結制」
When 報價單條款區塊渲染
Then 第 2 條顯示月結制段落（含可編輯的請款日、付款截止日 inline 欄位）
And 月預收制、儲值制段落不顯示

Given 業務人員選擇主要收費方式為「儲值制」
When 報價單條款區塊渲染
Then 第 2 條顯示儲值制段落（含可編輯的付款期限天數 inline 欄位）
And 月預收制、月結制段落不顯示

Given 第 2 條 inline 欄位已帶入預設值（請款日=5、付款截止日=10、付款期限=5）
When 業務人員將請款日修改為「8」
Then 條款文字中的對應數字即時更新為「8」
And PDF 輸出時反映修改後的數字

Given 業務人員未選擇主要收費方式
When 業務人員點擊「送審」
Then 系統顯示錯誤「主要收費方式為必填欄位」
And WorkflowInstance 不建立
```

### AC-007：客戶回簽上傳後報價單進入建立專案可選清單

```gherkin
Given 報價單狀態為 approved，尚未上傳回簽
When 業務人員上傳客戶回簽掃描檔
Then 報價單狀態更新為 signed
And 記錄 signed_at 日期
And 此報價單符合「建立專案 Step 2」可選條件（REQ-0040 §4.1）
And 操作者至專案列表頁點擊「＋ 建立專案」，Step 2 選品牌後可看到此報價單出現在清單中
```

### AC-008：版本快照保留

```gherkin
Given 報價單已有 v1 版本快照（已退回），業務人員修改後重新送審產生 v2
When 業務人員查看版本歷史面板
Then 同時顯示 v1（rejected）與 v2（pending_approval）兩筆記錄
And 點擊 v1 可查看 v1 快照的完整欄位內容（唯讀）
```

### AC-009：必填欄位驗證阻擋送審

```gherkin
Given 業務人員的報價單未填「電子發票寄送信箱」
When 業務人員點擊「送審」
Then 系統顯示錯誤「電子發票寄送信箱為必填欄位」
And WorkflowInstance 不建立

Given 業務人員的報價單未選擇「主要收費方式」
When 業務人員點擊「送審」
Then 系統顯示錯誤「主要收費方式為必填欄位」
And WorkflowInstance 不建立

Given 業務人員的報價單未選擇「匯款帳號」
When 業務人員點擊「送審」
Then 系統顯示錯誤「匯款帳號為必填欄位」
And WorkflowInstance 不建立

Given 業務人員的報價單條款第 2 條 inline 數字欄位（請款日或付款截止日）被清空
When 業務人員點擊「送審」
Then 系統顯示錯誤「條款付款日期欄位不可為空」
And WorkflowInstance 不建立
```

### AC-012：匯款帳號選擇與 PDF 帶入（v10.0 新增）

```gherkin
Given 業務人員建立報價單，匯款帳號下拉選單顯示兩組系統預設帳戶
When 業務人員選擇「第一商業銀行 內湖分行 105-10-015385」
Then 下方唯讀區塊即時顯示：戶名 昊揚顧問股份有限公司、銀行 第一商業銀行、分行 內湖分行、帳號 105-10-015385

Given 報價單已選定匯款帳號並通過審核
When 業務人員輸出 PDF
Then PDF 匯款資訊區塊顯示選定帳戶的完整資料
And 非選定的其他帳戶資料不出現於 PDF

Given 業務人員未選擇匯款帳號
When 業務人員點擊「送審」
Then 系統顯示錯誤「匯款帳號為必填欄位」
And WorkflowInstance 不建立
```

### AC-010：審核者在報價單詳情頁可見利潤率資訊（v8.0 新增）

```gherkin
Given 報價單送審當下委外成本填入 $75,000，利潤率 25%（低於門檻 30%）
And WorkflowInstance 狀態為 pending_approval
When 指定審核者進入該報價單詳情頁
Then 審核操作區上方顯示利潤率資訊區塊
And 顯示委外成本金額 $75,000
And 顯示橘色利潤率色塊「利潤率 25%，低於建議門檻 30%」
And 此資訊不阻擋審核者執行核准或退回
```

### AC-011：審核操作嵌入報價單詳情頁，不經過獨立審核頁（v8.0 新增）

```gherkin
Given 報價單狀態為 pending_approval
And 登入者為該 WorkflowInstance 的指定審核者
When 登入者從 Inbox 點擊該筆待審項目，或直接從報價單列表頁進入該份報價單
Then 系統導向同一個報價單詳情頁
And 該頁面顯示審核操作區（核准 / 退回按鈕）
And 不存在任何獨立的「審核詳情頁」轉場
When 該登入者不是指定審核者
Then 同一頁面不顯示審核操作區，僅顯示「審核中」狀態 badge
```

---

## 18. 待確認事項

| 編號 | 類型 | 問題 | 負責人 | 狀態 |
|------|------|------|--------|------|
| B-03 | 業務決策 | 公版 B 分期數量：固定三期 vs. 業務人員自由新增？SA 建議自由新增 | — | ✅ `resolved`（v10.0）：分期收費功能確認移除，對照新版公版文件無分期結構，問題不再適用 |
| B-02 | 業務決策 | 版本快照儲存策略：完整 JSON vs. 只存 diff？（與 REQ-0030 共用） | 技術 + 業務確認 | `open` |
| T-07 | 技術確認 | PDF 生成方案：Server-side（Puppeteer / WeasyPrint）vs. 前端（html2pdf）？影響 PDF/A 合規性 | 後端工程師 | `open` |
| T-08 | 技術確認 | 回簽上傳的檔案儲存方案（S3 / GCS）與簽名 URL 有效期設定 | 後端工程師 | `open` |
| B-06 | 業務決策 | 主合約與報價單的系統關聯方式 | — | ✅ `resolved`（v5.2）：兩者各自獨立，共同以 `brand_id` 關聯至同一品牌；查詢時統一靠 `brand_id` 篩選 |
| T-19 | 技術確認 | `template_type` ENUM 值從 B/C/D 改為 A/B/C；若已存在測試資料，是否需要 migration script？建議開發期直接更名，無需 alias | 後端工程師 | `open` |
| B-70 | 業務決策 | 主要收費方式（`payment_method`）完整選項值域待客戶確認：已知月預收制、月結制、儲值制；「其他」類別是否存在、選擇「其他」時第 2 條條款的填寫方式是否為整段自由輸入 | — | ✅ `resolved`（v10.0）：選項確定為月預收制 / 月結制 / 儲值制三種，不設「其他」類別；例外情況統一填寫於第 7 條特別注意事項 |

---

## 19. 與其他 REQ 的關係

```
REQ-0001（使用者管理）
  └─ 提供 RBAC 權限：全角色可建立 / 送審（v7.0），Manager 可審核

REQ-0002（系統設定）
  └─ 利潤率門檻 → 警告觸發條件

REQ-0044（服務項目管理）
  └─ 服務項目目錄 → 報價明細選單

REQ-0010（客戶主檔）
  └─ 客戶資訊自動帶入報價單頭部

REQ-0030（工作流引擎）
  └─ QUOTE_APPROVAL 工作流 → 報價單送審 / 審核 / 通知

REQ-0021（報價單）← 本文件
  └─ 客戶回簽上傳 → 報價單進入 REQ-0040 建立專案 Step 2 可選清單
  └─ 報價明細 → 供 REQ-0040（建立專案）讀取費用類型、服務項目
  └─ 總計金額 → 供 REQ-0050（AR/AP）建立應收帳款紀錄
```

---

*— REQ-0021 規格文件結束 —*  
*下一個建議填充：REQ-0010（客戶主檔）— REQ-0021 依賴的資料來源，或 REQ-0022（合約管理）— 與報價單共享部分流程邏輯*

---

# §7｜REQ-0022 合約管理


| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0022 |
| **Use Case ID** | UC-022 |
| **PRD 章節** | 5.3.3 |
| **所屬模組** | F-02 Core 2 商業流程層 |
| **優先級** | `P0` |
| **狀態** | `open` — v7.3 合約規格補強（終止流程、作廢規則、client_revision 入口限縮）；T-11（通知對象查找邏輯）待專案建立功能確認 |
| **最後更新** | 2026-06-30（v8.0：審核操作改嵌入合約條文編輯頁） |
| **依賴關係** | REQ-0001（RBAC）、REQ-0010（客戶主檔）、REQ-0030（工作流引擎 — CONTRACT_MODIFY）、REQ-0021（報價單，合約與報價單並行） |

---

## 1. 背景與設計動機

現況：200+ 筆合約靠 Google Sheets 手管，無展延提醒、條文修改無版本控管、用印流程靠 LINE 協調。目的：合約全生命週期（建立→審核→用印→展延→終止）納入系統，公版預設鎖定，客戶要求修改時才開放 ContractBlock 編輯並觸發 CONTRACT_MODIFY 審核。

---

## 2. 功能描述

> 系統應管理昊揚行銷顧問服務委任主合約的完整生命週期，支援公版直接輸出 PDF、客戶修改條文時觸發審核工作流、掃描件歸檔、合約狀態追蹤、展延提醒，以及主合約與報價委任單的關聯管理。

---

## 3. 合約類型說明

本 REQ 管理的是**行銷顧問服務委任主合約**，即「主合約」。與報價委任單（REQ-0021）的關係如下：

| 文件類型 | 適用對象 | 簽署次數 | 系統角色 |
|----------|----------|----------|----------|
| 主合約 | 長期合作客戶（首次必簽） | 一次，後續自動展延 | 本 REQ（REQ-0022） |
| 報價委任單 | 每次服務（長期客戶追加時也簽） | 每次服務都簽 | REQ-0021 |
| （報價委任單單用） | 單次服務客戶 | 一次 | REQ-0021，無需主合約 |

> ✅ **B-06 resolved（v5.2）**：主合約與報價委任單採**方案 B**——兩者各自獨立，共同以 `brand_id` 關聯至同一品牌。單次服務客戶僅有報價委任單、無主合約，資料模型一致。查詢時統一靠 `brand_id` 篩選。

---

## 4. 合約完整生命週期

```
業務人員建立合約
（填入 4 個手動欄位，系統從 Brand 帶入甲方資料）
    │
    ▼
左側欄位編輯 + 右側即時合約預覽
    │
    ▼
確認後輸出公版 PDF（不需送審）
    │
    ▼
contract_status → pending_sign
（紙本交給客戶確認）
    │
    ├─ 客戶接受 → 雙方用印 → 上傳掃描件
    │                              │
    │                              ▼
    │                       pending_archive
    │                              │ 財務行政歸檔確認
    │                              ▼
    │                          active（履約中）
    │
    └─ 客戶要求修改條文
            │ 業務點擊「客戶要求修改」按鈕
            ▼
        contract_status → client_revision
        （解鎖全文逐條區塊編輯模式）
            │
            ▼
        業務逐條修改條文（ContractBlock 編輯）
            │
            ▼
        送審（呼叫 REQ-0030 CONTRACT_MODIFY）
            │
            ├─ 審核退回 → 維持 client_revision，業務繼續修改
            │
            ▼
        審核通過 → 解鎖修改版 PDF 輸出
        contract_status → pending_sign（等待客戶再次確認）

合約生效後（active）：
    ├─ 到期前 N 天：系統自動發出展延提醒
    │       ├─ 雙方未提出終止 → 系統自動展延，更新截止日
    │       └─ 提出終止 → 狀態：ended
    │
    └─ 任何時點：可手動標記為「作廢」（需 Admin / Manager）→ cancelled
```

---

## 5. 合約欄位規格

### 5.1 欄位來源分類

合約建立時的欄位分三類：**系統帶入（唯讀）**、**系統帶入（可覆寫）**、**手動填寫**。

#### 系統帶入（唯讀）

| 欄位編號 | 欄位名稱 | 來源 | 說明 |
|----------|----------|------|------|
| ② | 客戶品牌名稱 | `Brand.brand_name` | 第一條合約標的填入；建立後不可修改 |

#### 系統帶入（可覆寫）

甲方資料從 Brand 層級帶入，使用者可在建立頁面覆寫，**確認後凍結存入 Contract 自身欄位，不再參照 Brand**。

| 欄位編號 | 欄位名稱 | 帶入來源 | 說明 |
|----------|----------|---------|------|
| ① | 甲方法定名稱 | `Brand.legal_name` | 合約封面「以下簡稱甲方」欄位 |
| ④ | 負責人 | `Brand.representative` | 立約人區塊甲方負責人 |
| ④ | 地址 | `Brand.address` | 立約人區塊甲方地址 |
| ④ | 統一編號 | `Brand.tax_id` | 立約人區塊甲方統編 |
| ④ | 聯絡電話 | `Brand.phone` | 立約人區塊甲方電話 |

> ⚠️ **業務規則（BR-022-02）**：立約人資料區塊（④）須完整呈現於合約同一頁內，不可跨頁。系統 PDF 輸出時應自動處理分頁，確保此區塊不被截斷。

> ⚠️ **業務規則（BR-022-03）**：Brand 法定資料欄位（`legal_name`、`representative`、`address`、`tax_id`、`phone`）為選填，歷史品牌資料允許為 NULL（✅ B-34 resolved）。建立合約時若帶入欄位為空，系統提示業務人員手動填寫，不阻擋建立流程。

#### 手動填寫

| 欄位編號 | 欄位名稱 | 必填 | 說明 |
|----------|----------|------|------|
| ③ | 合約期限月數 | 是 | 整數，如「12」代表 12 個月 |
| ③ | 合約起始日 | 是 | 格式 YYYY-MM-DD；截止日由系統自動計算（見 7.3） |
| — | 自動展延月數 | 是 | 第二條挖空欄位；預設與「合約期限月數」相同，可手動修改 |
| ⑤ | 開立合約日期 | 是 | 中華民國年月日格式；預設今日 |

### 5.2 系統固定值（乙方昊揚資訊）

| 欄位 | 固定值 |
|------|--------|
| 乙方公司名稱 | 昊揚顧問股份有限公司 |
| 乙方負責人 | 廖煥庭 |
| 乙方地址 | 台北市大同區延平北路一段 104 號 9 樓 |
| 乙方統一編號 | 83652409 |
| 乙方聯絡電話 | 02-25589697 |
| 服務費收款帳戶 | 戶名：昊揚顧問股份有限公司 / 銀行：第一商業銀行（007）/ 分行：大稻埕分行（1118）/ 帳號：111-10-311612 |
| 儲值金收款帳戶 | 戶名：昊揚顧問股份有限公司 / 銀行：第一商業銀行（007）/ 分行：內湖分行（1509）/ 帳號：105-10-015385 |

### 5.3 系統管理欄位

| 欄位 | 說明 |
|------|------|
| `contract_number` | 合約編號，系統自動產生（見 5.4） |
| `contract_status` | 合約狀態（見第 6 節） |
| `pre_review_status` | 進入 `under_review` 前的狀態，供審核後還原用 |
| `signed_file_url` | 雙方用印後掃描件的儲存路徑 |
| `filed_at` | 歸檔日期 |
| `filed_by` | 歸檔人（FK → User） |
| `auto_renew_months` | 自動展延月數 |
| `renewal_reminder_sent_at` | 最後一次展延提醒發送時間 |

### 5.4 合約編號生成規則

格式：`HY[西元年][品牌號]_[流水號]`

| 片段 | 說明 | 範例 |
|------|------|------|
| `HY` | 固定前綴 | HY |
| `[西元年]` | 4 位西元年 | 2025 |
| `[品牌號]` | Brand 的 `brand_id_code`（REQ-0010） | A094 |
| `_[流水號]` | 3 位流水號，同品牌跨年度累計遞增 | _086 |

完整範例：`HY2025A094_086`

> ⚠️ 合約編號由系統自動產生，**不可手動修改**。產生後即使合約作廢，編號也不回收。

---

## 6. 合約狀態機

```
建立合約（填入欄位 + 即時預覽）
    │
    ▼
  draft
    │ 輸出公版 PDF（不需送審）
    ▼
pending_sign（等待客戶紙本確認）
    │  ⚠️ 「客戶要求修改」入口僅在此狀態開放（draft 不開放，客戶尚未看到 PDF）
    ├─ 雙方用印，上傳掃描件
    │       ▼
    │  pending_archive
    │       │ 財務行政歸檔確認
    │       ▼
    │    active（履約中）
    │       │
    │       ├─ 到期 → 自動展延（截止日遞延）→ 維持 active
    │       ├─ 主動終止 → ended
    │       └─ Admin/Manager 作廢 → cancelled
    │
    └─ 業務在 pending_sign 點擊「客戶要求修改」
            ▼
       client_revision（解鎖逐條區塊編輯）
            │ 送審（CONTRACT_MODIFY）
            ├─ 審核退回 → 維持 client_revision，業務繼續修改
            │
            ▼
       審核通過 → 解鎖修改版 PDF 輸出
       contract_status → pending_sign

任意狀態（Admin / 執行長 / Manager）→ cancelled（作廢，需填寫作廢原因，通知合約建立者）
（`pending_archive` 除外：系統阻擋並提示「請先退回 pending_sign 再執行作廢」）
（`under_review` 期間同樣不可作廢，審核中文件不得變動）
```

| 狀態 | 說明 | 可執行操作 | 進入條件 |
|------|------|-----------|---------|
| `draft` | 建立中，填寫欄位階段 | 輸出公版 PDF、作廢（❌ 不可點擊「客戶要求修改」） | 建立合約時自動進入 |
| `pending_sign` | 公版 PDF 已輸出，等待雙方紙本用印 | 上傳掃描件、點擊「客戶要求修改」、作廢 | 輸出公版 PDF 後；或 client_revision 審核通過後 |
| `client_revision` | 客戶要求修改，逐條區塊編輯解鎖中 | 逐條編輯條文、送審、作廢 | 業務在 `pending_sign` 點擊「客戶要求修改」 |
| `under_review` | CONTRACT_MODIFY 審核進行中 | 等待審核結果（唯讀） | 業務在 `client_revision` 送審 |
| `pending_archive` | 掃描件已上傳，等待財務行政歸檔確認 | 財務確認歸檔 | 上傳掃描件後 |
| `active` | 履約中（正式生效） | 查看、申請終止（active → ended）、Admin/執行長/Manager 作廢 | 財務歸檔確認後 |
| `ended` | 已結束（到期或主動終止） | 查看（唯讀） | 主動終止或展延週期用盡 |
| `cancelled` | 已作廢 | 查看（唯讀） | Admin / 執行長 / Manager 手動作廢（需填作廢原因；`pending_archive` 及 `under_review` 狀態下系統阻擋，不可直接作廢） |

> 📋 **`under_review` 審核結果的狀態還原規則**：  
> - CONTRACT_MODIFY 退回 → 合約回到 `client_revision`，業務可繼續修改後重新送審  
> - CONTRACT_MODIFY 通過 → 合約回到 `pending_sign`，修改版 PDF 解鎖可輸出  
> 系統以 `pre_review_status` 欄位記錄進入 `under_review` 前的狀態，供還原時使用（值域：`client_revision`）。

> 📋 **設計說明**：`pending_archive` 狀態期間不允許發起修改條文，因為掃描件已上傳，代表雙方已在紙本上確認版本。如確有需要，應先由 Manager 退回至 `pending_sign` 後再處理。

---

## 7. 業務規則

### 7.1 同品牌僅一份有效合約（應用層唯一性約束）

✅ **B-06 resolved（v5.2）**：採方案 A 應用層約束，資料表維持 1:N 以保留歷史紀錄。

```
建立合約前，系統自動檢查：
  IF 該品牌已有 status NOT IN ('cancelled', 'ended') 的主合約
  THEN 顯示警告「品牌「XXX」目前已有一份進行中的主合約（合約編號：HY...），
       確定要建立新合約嗎？建立後舊合約需手動終止。」
  AND 需使用者明確確認才繼續建立
```

> ⚠️ **業務規則（BR-022-01）**：`cancelled` 與 `ended` 狀態的合約不計入唯一性檢查，允許品牌在舊合約終止後重新建立新合約。

### 7.2 合約條文鎖定與解鎖規則

合約條文採**兩階段模式**：

**建立階段（`draft`）**：條文公版完全鎖定，僅開放填寫指定欄位（合約期限月數、起始日、自動展延月數、開立日期）及覆寫甲方帶入資料。PDF 輸出不需送審。

**客戶修改階段（`client_revision`）**：業務人員在 `pending_sign` 狀態點擊「客戶要求修改」後，系統將合約條文解鎖為逐條區塊編輯模式（見 §8.3 ContractBlock）。業務修改完成後**必須送審**（CONTRACT_MODIFY 工作流），審核通過後才能輸出修改版 PDF。`draft` 狀態不開放此操作，因客戶尚未看到公版 PDF，無從要求修改。

> ⚠️ **業務規則（BR-022-04）**：`client_revision` 狀態下，修改版 PDF 輸出按鈕為灰色停用，直到 CONTRACT_MODIFY 審核通過後才解鎖。

> ⚠️ **業務規則（BR-022-05）**：修改版 PDF 輸出後，PDF 頁首自動標注「客製版」字樣，與公版 PDF 視覺上可區分。

### 7.3 截止日計算規則

截止日固定抓**足月（當月最後一天）**：

| 範例 | 說明 |
|------|------|
| 起始日 2026/03/01，合約 2 個月 | 截止日 = 2026/04/30 |
| 起始日 2025/07/20，合約 3 個月 | 截止日 = 2025/10/31 |

系統在業務人員填入「起始日 + 月份數」後，自動計算截止日，不可手動輸入截止日（防止計算錯誤）。

### 7.4 自動展延規則（來源：主合約第二條）

```
合約條款：「合約期滿，甲乙雙方如未於本合約期限屆滿前提出終止合約，
           即視同本合約自動展延__個月，其後亦同。」
```

系統行為：

```
每日排程任務（Cron Job）執行：
  FOR EACH active 合約：
    IF 今天 = 截止日 - 14 天：
      發送展延提醒通知 → 專案負責部門主管（站內通知 + Email）
    IF 今天 = 截止日 + 1 天 AND 未收到終止申請：
      自動展延：截止日 += auto_renew_months 個月
      記錄「自動展延」異動日誌（ContractRenewalLog）
      發送「合約已自動展延至 XXXX/XX/XX」通知 → 專案負責部門主管（站內通知 + Email）
```

> ✅ **B-07 resolved（v7.3）**：  
> 1. 提醒提前天數：**14 天前發送一次**  
> 2. 通知對象：**專案負責部門主管**（Brand 對應部門之 ROLE_MANAGER，`is_general_manager = false`）  
> 3. 通知管道：**站內通知 + Email 雙管道**  
> 查找邏輯待專案建立功能完成後補充（T-11 open）。

### 7.5 用印流程說明

合約簽訂流程（依現行 SOP BDP-11）：

```
1. 業務人員在系統輸出公版（或修改版）PDF 並列印
2. 業務人員向財務行政部（Debby）申請用印
3. 昊揚用印完成
4. 回傳給客戶用印（客戶留存一份）
5. 客戶回傳昊揚一份
6. 財務行政部掃描並歸檔
```

系統在此流程中的角色：
- 步驟 1：輸出 PDF 後，contract_status 自動更新為 `pending_sign`
- 步驟 6：財務行政部在系統上傳掃描件 → `pending_archive`；確認歸檔 → `active`

### 7.6 合約終止規則（Gap-01 resolved，v7.3）

> ✅ **Gap-01 resolved（v7.3）**：合約終止（`active → ended`）流程正式規格化。

**可申請終止者**：Admin、執行長（ROLE_EXECUTIVE）、專案負責部門主管（ROLE_MANAGER）

**流程**：直接執行，不需額外審核流程

```
申請者點擊「申請終止」→ 填寫終止原因（必填）→ 確認送出
  → contract_status = ended
  → 記錄 ended_at、ended_by、ended_reason
  → 發送終止通知 → Admin、執行長、所有 ROLE_MANAGER
```

> ⚠️ **BR-022-06**：`ended` 為終態，不可復原。合約終止後，若需重新合作，須由業務建立新合約。

> ⚠️ **BR-022-07**：合約終止後，`ended_at` 以申請者送出確認的時間戳記錄，不以截止日為準。

### 7.7 合約作廢規則（Gap-03 resolved，v7.3）

> ✅ **Gap-03 resolved（v7.3）**：合約作廢（`→ cancelled`）流程補充完整規格。

**可執行作廢者**：Admin、執行長（ROLE_EXECUTIVE）、Manager（ROLE_MANAGER）

**流程**：
```
作廢者點擊「作廢」→ 填寫作廢原因（必填）→ 確認送出
  → contract_status = cancelled
  → 記錄 cancelled_at、cancelled_by、cancelled_reason
  → 發送作廢通知 → 合約建立者（created_by）
```

**限制**：
- `pending_archive` 狀態：系統阻擋作廢，顯示「請先由 Manager 退回至 pending_sign 後再執行作廢」
- `under_review` 狀態：系統阻擋作廢，顯示「審核進行中，不可作廢，請先撤回審核或等待審核完成」

> ⚠️ **BR-022-08**：`cancelled` 為終態，不可復原。

---

## 8. 資料模型

### 8.1 Brand 資料表（新增法定資料欄位）

> 📋 **v5.2 新增**：Brand 層級新增合約甲方法定資料欄位，供合約建立時帶入。欄位允許 NULL（✅ B-34 resolved），歷史品牌資料由業務人員逐步回填。

```
Brand {
  -- 現有欄位不變 --
  id              UUID          PK
  customer_id     UUID          NOT NULL, FK → Customer.id
  brand_id_code   VARCHAR(10)   NOT NULL, UNIQUE
  brand_name      VARCHAR(200)  NOT NULL
  brand_status    ENUM          active | inactive
  notes           TEXT
  created_at      TIMESTAMP
  updated_at      TIMESTAMP

  -- v5.2 新增：合約甲方法定資料（選填，允許 NULL）--
  legal_name      VARCHAR(200)   -- 合約甲方法定名稱（可能與 brand_name 不同）
  representative  VARCHAR(100)   -- 負責人姓名
  address         VARCHAR(300)   -- 地址
  tax_id          CHAR(8)        -- 統一編號（品牌層級，可與母公司 Customer.tax_id 不同）
  phone           VARCHAR(50)    -- 聯絡電話
}
```

### 8.2 Contract 資料表

```
Contract {
  id                    UUID          PK
  contract_number       VARCHAR(30)   NOT NULL, UNIQUE  -- HY2025A094_086
  brand_id              UUID          NOT NULL, FK → Brand.id
  customer_id           UUID          NOT NULL, FK → Customer.id（冗余欄位，加速查詢）

  -- 手動填寫欄位
  period_months         INT           NOT NULL           -- 合約期限月數
  start_date            DATE          NOT NULL
  end_date              DATE          NOT NULL           -- 系統計算，不可手動輸入
  contract_date         DATE          NOT NULL           -- 開立日期
  auto_renew_months     INT           NOT NULL           -- 自動展延月數

  -- v5.2 新增：甲方資料快照（建立時凍結，不再參照 Brand）
  client_legal_name     VARCHAR(200)                    -- 甲方法定名稱
  client_representative VARCHAR(100)                    -- 甲方負責人
  client_address        VARCHAR(300)                    -- 甲方地址
  client_tax_id         CHAR(8)                         -- 甲方統一編號
  client_phone          VARCHAR(50)                     -- 甲方聯絡電話

  -- 版本控管
  has_modified_blocks   BOOLEAN       DEFAULT false      -- 是否存在被修改的 ContractBlock（取代 is_modified_version）

  -- 狀態
  contract_status       ENUM          draft | pending_sign | client_revision |
                                      under_review | pending_archive |
                                      active | ended | cancelled
  pre_review_status     VARCHAR(30)   -- 進入 under_review 前的狀態（供審核後還原）
                                      -- 值域：client_revision

  -- 歸檔
  signed_file_url       VARCHAR(500)  -- 雙方用印掃描件
  filed_at              TIMESTAMP
  filed_by              UUID          FK → User.id

  -- 展延記錄
  renewal_count         INT           DEFAULT 0
  last_renewed_at       TIMESTAMP
  renewal_reminder_sent_at TIMESTAMP

  -- 終止資訊（Gap-01 resolved, v7.3）
  ended_reason          TEXT                           -- 終止原因（必填）
  ended_at              TIMESTAMP                      -- 終止確認時間戳
  ended_by              UUID          FK → User.id     -- 執行終止者

  -- 作廢資訊（Gap-03 resolved, v7.3）
  cancelled_at          TIMESTAMP                      -- 作廢時間戳
  cancelled_by          UUID          FK → User.id     -- 執行作廢者
  cancelled_reason      TEXT                           -- 作廢原因（必填）

  -- 稽核
  created_by            UUID          FK → User.id
  created_at            TIMESTAMP     DEFAULT now()
  updated_at            TIMESTAMP
}
```

> 📋 **v5.2 欄位異動說明**：
> - `is_modified_version`（BOOLEAN）→ 改為 `has_modified_blocks`，語意更精確
> - `modified_content`（TEXT）→ 移除，條文內容改由 `ContractBlock` 管理
> - `pre_review_status` 值域從 `draft | pending_sign | active` 縮減為 `client_revision`（合約修改入口統一為此狀態）

### 8.3 ContractBlock 資料表（v5.2 新增）

> 📋 **設計說明**：合約全文由若干 Block 組成，每個 Block 對應一個條文段落。建立合約時，系統從公版模板初始化所有 Block。進入 `client_revision` 後，每個 Block 的 `content` 解鎖為可編輯。

```
ContractBlock {
  id                UUID          PK
  contract_id       UUID          NOT NULL, FK → Contract.id
  block_order       INT           NOT NULL               -- 顯示順序（1, 2, 3...）
  block_label       VARCHAR(100)  NOT NULL               -- 如「第一條 合約標的」
  content           TEXT          NOT NULL               -- 當前條文內容
  original_content  TEXT          NOT NULL               -- 公版原始內容（唯讀，供 diff 比對）
  is_modified       BOOLEAN       DEFAULT false          -- 是否被修改過
  created_at        TIMESTAMP     DEFAULT now()
  updated_at        TIMESTAMP
}
```

Block 初始化範例（來源：行銷顧問服務委任主合約公版 v3.0）：

| block_order | block_label | 說明 |
|-------------|-------------|------|
| 1 | 第一條 合約標的 | 含品牌名稱動態欄位；第 2 款服務範疇為固定條文 |
| 2 | 第二條 合約期限 | 含期限月數、起始日、截止日、展延月數動態欄位 |
| 3 | 第三條 服務範疇與須知 | 含服務類別表格（固定條文）；第 2～7 款為固定條文（含廣告投放服務須知） |
| 4 | 第四條 付款方式 | 固定條文：第 1 款聲明付款條件以「報價委任單」為準；第 2 款四種收費方式說明表（月預收制 / 月結制 / 儲值制 / 專案報價）；第 3 款逾期條款；第 4 款兩組收款帳戶（服務費帳戶 + 儲值金帳戶） |
| 5 | 第五條 權利歸屬與授權 | 固定條文 |
| 6 | 第六條 保密義務 | 固定條文 |
| 7 | 第七條 合約終止 | 固定條文（含 20 日書面通知規定） |
| 8 | 第八條 爭議處理 | 固定條文（台灣台北地方法院管轄） |
| 9 | 第九條 其他 | 固定條文 |
| 10 | 立約人資料 | 甲方 client_* 欄位 + 乙方固定值 + 簽署日期（中華民國年月日） |

> ❓ **T-10 補充**：公版模板的 Block 清單及各 Block 原始條文，需由業務或法務部門提供完整合約原文後，由工程師初始化資料庫 Seed Data。後續若法規修改需更新公版，屬模板版本管理範疇（T-10 open）。

### 8.4 ContractRenewalLog 資料表

```
ContractRenewalLog {
  id              UUID      PK
  contract_id     UUID      FK → Contract.id
  renewed_at      TIMESTAMP
  old_end_date    DATE
  new_end_date    DATE
  trigger_type    ENUM      auto | manual
  triggered_by    UUID      FK → User.id（manual 時）
  notes           TEXT
}
```

### 8.5 實體關係

```
Customer  ──1:N──→ Brand（Customer.tax_id 為集團統編，Brand.tax_id 為品牌層統編）
Brand     ──1:N──→ Contract（via brand_id，主要關聯）
Customer  ──1:N──→ Contract（via customer_id，冗余查詢用）
Contract  ──1:N──→ ContractBlock（條文逐條區塊）
Contract  ──1:N──→ ContractRenewalLog（展延記錄）
Contract  ──1:N──→ WorkflowInstance（REQ-0030，CONTRACT_MODIFY 審核用）

Brand     ──1:N──→ Quote（REQ-0021，兩者共同掛在 brand_id 下，不互為父子）
```

---

## 9. API 介面設計（草稿）

### 9.1 建立合約

```
POST /api/v1/contracts

Request Body:
{
  "brand_id": "uuid",
  "period_months": 12,
  "start_date": "2026-06-01",
  "contract_date": "2026-05-25",
  "auto_renew_months": 12,
  // 甲方資料（系統從 Brand 帶入預填，前端允許覆寫後送出）
  "client_legal_name": "老撈有限公司",
  "client_representative": "陳大明",
  "client_address": "台北市信義區...",
  "client_tax_id": "12345678",
  "client_phone": "02-1234-5678"
}

Response 201:
{
  "contract_id": "uuid",
  "contract_number": "HY2026A094_087",
  "end_date": "2027-05-31",        // 系統計算足月
  "contract_status": "draft",
  "brand": { "name": "老撈麻辣鍋", ... },
  "blocks_initialized": true       // ContractBlock 已從公版初始化
}

Response 200（警告，同品牌已有進行中合約）:
{
  "warning": "ACTIVE_CONTRACT_EXISTS",
  "existing_contract_number": "HY2025A094_086",
  "existing_status": "active",
  "message": "品牌「老撈麻辣鍋」已有一份進行中的主合約，確認繼續建立新合約？",
  "require_confirmation": true
}
```

### 9.2 輸出公版 PDF

```
POST /api/v1/contracts/{contract_id}/export-pdf

前置條件：contract_status = draft 且 has_modified_blocks = false

Response 200:
{
  "pdf_url": "https://...",
  "contract_number": "HY2026A094_087",
  "is_modified": false,
  "expires_at": "2026-06-01T10:00:00Z",
  "contract_status": "pending_sign"   // 輸出後狀態自動更新
}
```

### 9.3 觸發客戶要求修改（解鎖 client_revision）

```
POST /api/v1/contracts/{contract_id}/request-client-revision

前置條件：contract_status = pending_sign

Response 200:
{
  "contract_status": "client_revision",
  "message": "條文逐條編輯模式已解鎖，修改完成後請送審",
  "blocks": [
    {
      "block_id": "uuid",
      "block_order": 1,
      "block_label": "第一條 合約標的",
      "content": "...",
      "original_content": "...",
      "is_modified": false
    },
    ...
  ]
}
```

### 9.4 更新單一條文區塊

```
PATCH /api/v1/contracts/{contract_id}/blocks/{block_id}

前置條件：contract_status = client_revision

Request Body:
{
  "content": "修改後的條文內容..."
}

Response 200:
{
  "block_id": "uuid",
  "content": "修改後的條文內容...",
  "is_modified": true,
  "diff_summary": "第一條第 1 款：「老撈麻辣鍋」→「老撈火鍋品牌」"
}
```

### 9.5 送審修改版（CONTRACT_MODIFY 工作流）

```
POST /api/v1/contracts/{contract_id}/submit-for-review

前置條件：contract_status = client_revision

Response 200:
{
  "contract_status": "under_review",
  "workflow_instance_id": "uuid",
  "modified_blocks_count": 2
}
```

### 9.6 上傳用印掃描件

```
POST /api/v1/contracts/{contract_id}/upload-signed
Content-Type: multipart/form-data

前置條件：contract_status = pending_sign

Response 200:
{
  "signed_file_url": "https://...",
  "contract_status": "pending_archive",
  "message": "掃描件上傳成功，等待財務行政部確認歸檔"
}
```

### 9.7 確認歸檔（Finance / Manager / Admin 操作）

> ⚠️ **業務規則（BR-022-06）**：`confirm-archive` 端點僅 `ROLE_FINANCE`、`ROLE_MANAGER`、`ROLE_ADMIN` 可呼叫；其他角色回傳 403 Forbidden。

```
POST /api/v1/contracts/{contract_id}/confirm-archive

前置條件：contract_status = pending_archive

Response 200:
{
  "contract_status": "active",
  "filed_at": "2026-05-25T14:30:00Z",
  "filed_by": { "name": "Debby" }
}
```

### 9.8 查詢合約列表

```
GET /api/v1/contracts?brand_id={uuid}&status=active&page=1

Response 200:
{
  "total": 1,
  "contracts": [
    {
      "contract_id": "uuid",
      "contract_number": "HY2026A094_087",
      "brand_name": "老撈麻辣鍋",
      "customer_name": "老撈有限公司",
      "start_date": "2026-06-01",
      "end_date": "2027-05-31",
      "contract_status": "active",
      "auto_renew_months": 12,
      "renewal_count": 0,
      "has_modified_blocks": false
    }
  ]
}
```

---

## 10. UI 規格

### 10.1 合約列表頁篩選條件

- 合約狀態（多選）：草稿 / 待用印 / 客戶修改中 / 審核中 / 待歸檔 / 履約中 / 已結束 / 已作廢
- 客戶 / 品牌（搜尋）
- 截止日範圍
- 是否為修改版（`has_modified_blocks = true`）

### 10.2 合約建立頁面（左右分割佈局）

```
┌──────────────────────────────────────────────────────────────┐
│  新增合約：老撈麻辣鍋                                          │
├────────────────────────┬─────────────────────────────────────┤
│  左側：欄位編輯區（40%）│  右側：合約即時預覽（60%）            │
│                        │                                     │
│  【系統帶入 — 唯讀】    │  昊揚顧問股份有限公司                 │
│  品牌名稱：老撈麻辣鍋  │  行銷顧問服務委任主合約               │
│                        │                                     │
│  【甲方資料 — 可覆寫】  │  ___________（以下簡稱甲方）          │
│  甲方法定名稱：_______ │  立約日人：昊揚顧問股份有限公司        │
│  負責人：_____________ │                                     │
│  地址：_______________ │  第一條 合約標的                     │
│  統一編號：___________ │  甲方委託乙方以【老撈麻辣鍋】...      │
│  聯絡電話：___________ │                                     │
│                        │  第二條 合約期限                     │
│  【手動填寫】           │  合約有效期為【12】個月，            │
│  合約期限月數：__月    │  自中華民國【2026】年【06】月【01】日 │
│  起始日：__________   │  起至【2027】年【05】月【31】日止...  │
│  截止日：（系統計算）  │                                     │
│  自動展延月數：__月    │  ...（以下各條固定條文）              │
│  開立日期：__________  │                                     │
│                        │  立約人：                           │
│  ⚠️ 統編為空，請填寫   │  甲方：【老撈有限公司】              │
│                        │  負責人：【陳大明】                  │
│  [輸出公版 PDF]        │  ...                                │
│                        │  中華民國【115】年【05】月【25】日   │
└────────────────────────┴─────────────────────────────────────┘
```

**互動規則：**
- 左側欄位輸入後，右側預覽即時同步更新（動態欄位以粗體或底線標示）
- 固定條文在預覽區以淺灰色顯示，不可點擊
- 甲方資料帶入值為空時，左側顯示警告提示，但不阻擋輸出
- 點擊「輸出公版 PDF」後，contract_status 更新為 `pending_sign`，頁面跳轉至合約詳情頁

### 10.3 合約詳情頁佈局（pending_sign 及後續狀態）

```
合約詳情頁
├── 頁首：合約編號、狀態 badge、操作按鈕區
│         操作按鈕（依當前狀態顯示）：
│         [下載 PDF] [客戶要求修改] [上傳掃描件] [確認歸檔] [終止合約] [作廢]
│
├── 區塊一：合約基本資訊（唯讀摘要）
│   ├── 品牌名稱
│   ├── 甲方法定名稱 / 負責人 / 地址 / 統編 / 電話
│   ├── 合約期限：X 個月（起始日 ～ 截止日）
│   ├── 自動展延月數
│   └── 開立日期
│
├── 區塊二：合約狀態時間線
│   └── 建立 → 輸出 PDF → [客戶修改 → 送審 → 通過] → 用印上傳 → 歸檔確認 → 生效 → 展延 → 結束
│
├── 區塊三：掃描件
│   └── 上傳的用印掃描件（可下載）
│
├── 區塊四：展延記錄
│   └── 每次展延的舊截止日 → 新截止日 + 觸發類型
│
└── 區塊五：關聯報價委任單列表（REQ-0021，同品牌的所有報價單）
```

### 10.4 client_revision 編輯頁面（左右分割佈局）

```
┌──────────────────────────────────────────────────────────────┐
│  修改合約條文：HY2026A094_087  ⚠️ 修改版需送審才能輸出 PDF    │
├────────────────────────┬─────────────────────────────────────┤
│  左側：逐條區塊編輯（40%）│  右側：修改後合約預覽（60%）         │
│                        │                                     │
│  第一條 合約標的   ✏️  │  第一條 合約標的                     │
│  ┌──────────────────┐  │  甲方委託乙方以老撈麻辣鍋...         │
│  │ （可編輯 textarea）│  │                                     │
│  └──────────────────┘  │  第二條 合約期限           🔴已修改  │
│                        │  合約有效期為 6 個月（原：12 個月）  │
│  第二條 合約期限  ✏️🔴 │  ...                                │
│  ┌──────────────────┐  │                                     │
│  │ （已修改，顯示    │  │  第三條 服務範疇與須知               │
│  │   diff 標記）    │  │  ...（未修改，淺灰色顯示）           │
│  └──────────────────┘  │                                     │
│                        │                                     │
│  第三條 服務範疇與須知 🔒│                                    │
│  （未修改，折疊顯示） │                                     │
│                        │                                     │
│  [送審] [取消修改]     │                                     │
└────────────────────────┴─────────────────────────────────────┘
```

**互動規則：**
- 左側每個 Block 預設折疊，點擊展開為可編輯 textarea
- 已修改的 Block 以 🔴 標示，右側預覽對應段落以橙色底色標示 diff
- 未修改的 Block 右側預覽以淺灰色顯示
- 點擊「送審」觸發 CONTRACT_MODIFY 工作流，按鈕灰化等待審核
- 點擊「取消修改」還原所有 Block 至 `original_content`，contract_status 回到 `pending_sign`

### 10.5 展延提醒 Banner

當使用者進入一份 `active` 合約且距截止日 ≤ **14 天**時，頁面頂部顯示橘色 Banner：

```
⚠️ 此合約將於 2027/05/31 到期（剩 12 天）。
   如需終止，請在到期前提出。否則將於到期後自動展延 12 個月。
   [申請終止] [我知道了]
```

> ✅ **B-07 resolved（v7.3）**：Banner 觸發條件為距截止日 ≤ 14 天，僅顯示給具備合約查看權限的使用者，系統同時以站內通知 + Email 通知專案負責部門主管。

### 10.6 審核操作區（v8.0 新增，嵌入合約條文編輯頁）

> ⚠️ **v8.0 設計變更**：CONTRACT_MODIFY 審核不再透過獨立的審核詳情頁進行，而是直接嵌入合約條文編輯頁（即 10.4 client_revision 編輯頁面）。詳見 REQ-0030 §1 / §8.2 的整體設計說明。

**顯示條件**：合約狀態為 `under_review` **且** 登入者為該筆 WorkflowInstance 的指定審核者（依 REQ-0030 §4.5 具名審核者設定）。

**頁面行為差異**：合約狀態為 `under_review` 時，10.4 頁面的左側編輯區改為**唯讀模式**（業務人員修改已送審凍結，等待審核結果），呈現送審當下的 ContractBlock 修改內容（含 🔴 已修改標記與右側 diff 預覽）；審核操作區固定顯示於頁面底部：

```
┌──────────────────────────────────────────────────────────────┐
│  審核中：HY2026A094_087  （審核者：Sam）                      │
├────────────────────────┬─────────────────────────────────────┤
│  左側：逐條區塊（唯讀） │  右側：修改後合約預覽（60%）          │
│  第一條 合約標的   🔒  │  （同 10.4，內容唯讀不可編輯）         │
│  第二條 合約期限  🔴  │                                     │
│  （唯讀，顯示已修改內容與 diff）│                              │
├────────────────────────┴─────────────────────────────────────┤
│  審核操作區（僅指定審核者可見）                                │
│  備註（選填）：[________________]                             │
│  [核准]                  [退回（需填原因）]                    │
└──────────────────────────────────────────────────────────────┘
```

**操作後行為**：

| 操作 | 系統行為 |
|------|----------|
| 點擊「核准」 | WorkflowInstance → `approved`；contract_status 回到 `pending_sign`；修改版 PDF 輸出解鎖；通知送審業務；Inbox 該筆項目移至「已核准」分頁 |
| 點擊「退回」 | 彈出退回原因輸入框（必填）；確認後 WorkflowInstance → `rejected`；contract_status 回到 `client_revision`（業務可繼續修改）；通知送審業務含退回原因；Inbox 該筆項目移至「已退回」分頁 |

**非審核者檢視**：若登入者不是指定審核者（例如其他業務、PM/PD、Finance），合約條文編輯頁不顯示審核操作區，僅呈現唯讀的 ContractBlock 內容與「審核中」狀態 badge。

---

## 11. 驗收標準（Acceptance Criteria）

### AC-001：甲方資料從 Brand 帶入（可覆寫）

```gherkin
Given 業務人員選擇品牌「老撈麻辣鍋」建立合約
And Brand 已設定 legal_name = "老撈有限公司"，representative = "陳大明"
When 合約建立頁面載入
Then 甲方法定名稱「老撈有限公司」自動填入（可覆寫）
And 負責人「陳大明」、地址、統編、電話自動填入（可覆寫）
And 品牌名稱「老撈麻辣鍋」自動填入（唯讀，不可修改）
And 業務人員只需手動填寫合約期限月數、起始日、開立日期
```

### AC-002：截止日自動計算足月

```gherkin
Given 業務人員填入起始日「2026-03-01」，合約期限「2 個月」
When 系統計算截止日
Then 截止日自動顯示「2026-04-30」（4 月最後一天）
And 截止日欄位為唯讀，不可手動修改
```

### AC-003：同品牌進行中合約警告

```gherkin
Given 品牌「老撈麻辣鍋」已有一份 pending_sign 狀態的主合約 HY2025A094_086
When 業務人員嘗試為同品牌建立新合約
Then 系統顯示警告「老撈麻辣鍋 已有一份進行中的主合約 HY2025A094_086」
And 需要業務人員明確點擊「確認繼續」才能建立
```

### AC-004：公版直接輸出，不需送審

```gherkin
Given 合約為 draft 狀態，且 has_modified_blocks = false
When 業務人員點擊「輸出公版 PDF」
Then 系統直接生成 PDF 並提供下載連結
And 不觸發任何審核工作流
And 合約狀態更新為 pending_sign
```

### AC-005：修改版合約必須送審才能輸出 PDF

```gherkin
Given 合約狀態為 client_revision，業務人員已修改部分條文區塊
When 業務人員嘗試直接輸出 PDF（若按鈕存在）
Then 系統提示「修改版合約需先送審，通過後才能輸出 PDF」
And PDF 輸出按鈕為灰色停用狀態
And 業務人員點擊「送審」後觸發 CONTRACT_MODIFY 工作流
```

### AC-006：審核通過後修改版 PDF 標注

```gherkin
Given 修改版合約 CONTRACT_MODIFY 工作流審核通過
When 業務人員輸出 PDF
Then PDF 內容包含修改後的條文
And PDF 頁首或頁尾顯示「客製版」標注
And Contract.has_modified_blocks = true
```

### AC-007：自動展延日誌

```gherkin
Given active 合約的截止日為 2027/05/31，auto_renew_months = 12
And 今天為 2027/06/01，且期間未收到終止申請
When 每日排程任務執行
Then 合約截止日自動更新為 2028/05/31
And 建立一筆 ContractRenewalLog，記錄 old_end_date = 2027-05-31，new_end_date = 2028-05-31，trigger_type = auto
And 發送通知：「合約 HY2026A094_087 已自動展延至 2028/05/31」
```

### AC-008：上傳掃描件後進入待歸檔狀態

```gherkin
Given 合約狀態為 pending_sign
When 財務行政人員上傳雙方用印掃描件
Then 合約狀態更新為 pending_archive
And 掃描件 URL 儲存至 signed_file_url
And 系統通知財務行政部「請確認歸檔」
```

### AC-009：歸檔確認後合約生效

✅ **v5.0 更新（B-32 resolved）**：Finance 角色正式納入後，歸檔確認操作由 Finance / Admin / Manager 均可執行。

```gherkin
Given 合約狀態為 pending_archive，掃描件已上傳
When 財務行政人員（Finance、Manager 或 Admin 角色）點擊「確認歸檔」
Then 合約狀態更新為 active
And 記錄 filed_at 時間戳與 filed_by 使用者
And 客戶主檔（REQ-0010）的 active_contract_count 遞增
```

### AC-010：client_revision 解鎖逐條編輯

```gherkin
Given 合約狀態為 pending_sign
When 業務人員點擊「客戶要求修改」按鈕
Then 合約狀態更新為 client_revision
And 頁面切換至左右分割編輯佈局
And 左側顯示所有 ContractBlock，每條可展開編輯
And 右側即時預覽反映修改內容
```

### AC-011：ContractBlock diff 標示

```gherkin
Given 合約處於 client_revision 狀態
When 業務人員修改「第二條 合約期限」的內容
Then 該 Block 的 is_modified 更新為 true
And 左側該條目旁出現 🔴 修改標記
And 右側預覽該條文區段以橙色底色標示，呈現新舊內容差異
And Contract.has_modified_blocks 更新為 true
```

### AC-014：展延提醒通知（B-07 resolved，v7.3）

```gherkin
Given 合約狀態為 active，截止日為 2027/06/30
And 今天為 2027/06/16（距截止日 14 天）
When 系統每日 Cron Job 執行
Then 系統發送站內通知給專案負責部門主管
And 同時發送 Email 通知給專案負責部門主管
And 通知內容包含合約編號、截止日、自動展延月數
```

### AC-015：合約終止（Gap-01 resolved，v7.3）

```gherkin
Given 合約狀態為 active
And 操作者角色為 Admin、執行長或 Manager
When 操作者點擊「申請終止」並填寫終止原因後確認
Then 合約狀態更新為 ended
And 記錄 ended_at、ended_by、ended_reason
And 系統發送終止通知給 Admin、執行長、所有 ROLE_MANAGER
```

### AC-016：作廢阻擋（Gap-03 resolved，v7.3）

```gherkin
Given 合約狀態為 pending_archive
When Admin 點擊「作廢」
Then 系統顯示錯誤提示「請先由 Manager 退回至 pending_sign 後再執行作廢」
And 合約狀態維持 pending_archive，不發生變化
```

```gherkin
Given 合約狀態為 under_review
When Admin 點擊「作廢」
Then 系統顯示錯誤提示「審核進行中，不可作廢，請先撤回審核或等待審核完成」
And 合約狀態維持 under_review，不發生變化
```

### AC-017：作廢需填寫原因（Gap-03 resolved，v7.3）

```gherkin
Given 合約狀態為 pending_sign
And 操作者角色為 Admin、執行長或 Manager
When 操作者點擊「作廢」並填寫作廢原因後確認
Then 合約狀態更新為 cancelled
And 記錄 cancelled_at、cancelled_by、cancelled_reason
And 系統發送通知給合約建立者（created_by）
```

### AC-018：draft 狀態不可點擊「客戶要求修改」（Gap-02 resolved，v7.3）

```gherkin
Given 合約狀態為 draft
When 使用者嘗試點擊「客戶要求修改」按鈕
Then 按鈕呈灰色停用狀態，無法點擊
And 或 API 回傳 422「合約尚未輸出公版 PDF，不可進入修改流程」
```

### AC-012：取消修改還原 Block 內容

```gherkin
Given 合約處於 client_revision 狀態，業務人員已修改 2 個 Block
When 業務人員點擊「取消修改」
Then 所有 ContractBlock.content 還原為 original_content
And 所有 ContractBlock.is_modified 重設為 false
And 合約狀態回到 pending_sign
And Contract.has_modified_blocks 重設為 false
```

### AC-013：Brand 法定資料為空時的警告提示

```gherkin
Given Brand「老撈麻辣鍋」尚未設定 legal_name（為 NULL）
When 業務人員建立合約，頁面載入
Then 左側甲方法定名稱欄位顯示空白並標示橘色警告「此欄位未設定，請手動填寫」
And 業務人員填入後即可正常輸出 PDF
And 不阻擋建立或輸出流程
```

### AC-019：審核操作嵌入合約條文編輯頁，不經過獨立審核頁（v8.0 新增）

```gherkin
Given 合約狀態為 under_review
And 登入者為該 WorkflowInstance 的指定審核者
When 登入者從 Inbox 點擊該筆待審項目，或直接從合約列表頁進入該份合約
Then 系統導向同一個合約條文編輯頁（10.4 / 10.6）
And 左側 ContractBlock 內容呈現唯讀模式（送審當下版本）
And 頁面底部顯示審核操作區（核准 / 退回按鈕）
And 不存在任何獨立的「審核詳情頁」轉場
When 該登入者不是指定審核者
Then 同一頁面不顯示審核操作區，僅顯示唯讀內容與「審核中」狀態 badge
```

### AC-020：審核退回後合約狀態還原至 client_revision（v8.0 補充）

```gherkin
Given 合約狀態為 under_review，審核者於合約條文編輯頁的審核操作區
When 審核者填寫退回原因並點擊「退回」
Then WorkflowInstance 狀態 → rejected
And contract_status 還原為 client_revision
And 左側 ContractBlock 編輯區解除唯讀，業務人員可繼續修改
And 通知業務人員，內容包含退回原因
And Inbox 該筆項目移至「已退回」分頁
```

---

## 12. 待確認事項

| 編號 | 類型 | 問題 | 負責人 | 狀態 |
|------|------|------|--------|------|
| B-07 | 業務決策 | 展延提醒設定 | — | ✅ resolved（v7.3）：14 天前、專案負責部門主管、站內通知 + Email |
| T-10 | 技術確認 | PDF 公版模板管理：ContractBlock 公版內容若需更新（如法規修改），系統如何維護模板版本？舊合約的 original_content 是否影響？ | 後端工程師 | `open` |
| T-11 | 技術確認 | 展延提醒通知對象「專案負責部門主管」的查找邏輯：如何從 Contract 關聯至負責部門的 ROLE_MANAGER？待專案建立功能（組織架構 + 部門指派）完成後補充 | 後端工程師 | `open` |
| L-01 | 法律確認 | 電子簽名法律效力：客戶端是否接受以電子簽名取代紙本用印？（目前設計仍以紙本用印為主） | 法務 / 外部律師 | `open` |

---

## 13. 與其他 REQ 的關係

```
REQ-0010（客戶主檔）
  └─ 提供客戶 / 品牌 / 聯絡人資訊給合約自動帶入

REQ-0030（工作流引擎）
  └─ CONTRACT_MODIFY 工作流：修改版合約的送審 / 審核 / 通知

REQ-0022（合約管理）← 本文件
  ├─ 合約 active 狀態 → 連動 REQ-0010 客戶履約中狀態
  ├─ 同品牌查詢報價委任單 → REQ-0021（via brand_id）
  └─ 合約 active → REQ-0050（AR/AP）例行收款列表的判斷依據

REQ-0021（報價單）
  └─ 與合約共同掛在 Brand 下，開案時一起關聯至 REQ-0040（建立專案）
```

---

*— REQ-0022 規格文件結束 —*  
*下一個建議填充：REQ-0020（商機漏斗）— 業務流程的起點，或 REQ-0001（使用者管理）— Foundation 層基礎*

---

# §8｜REQ-0030 工作流引擎（含 REQ-0024 送審流程）


| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0030 |
| **Use Case ID** | UC-030 |
| **PRD 章節** | 5.4.1 |
| **所屬模組** | F-03 Core 3 工作流引擎 |
| **優先級** | `P0` |
| **狀態** | `open` — 規格初稿 |
| **最後更新** | 2026-06-30（v8.0：審核操作改嵌入來源單據頁面） |
| **依賴關係** | REQ-0001（使用者管理 / RBAC）、REQ-0002（系統設定） |

---

## 1. 背景與設計動機

現況：QUOTE_APPROVAL / CONTRACT_MODIFY / VENDOR_COST / INVOICE_APPROVAL 四套審核流程若各自實作，邏輯重複、規則改動需多處修改。目的：建立統一工作流引擎，各模組以 WorkflowType 呼叫，審核者設定與通知管道集中於 S-05 後台維護。

> ⚠️ **v8.0 重大調整（審核操作位置變更）**：v7.9 及之前版本將審核操作（核准 / 退回）集中於獨立的「審核詳情頁」，審核者需離開原單據情境進入另一個頁面操作。業主反饋此設計不符合實際使用情境——審核者習慣在原單據（報價單、合約等）的功能頁面直接完成審核，且需要完整單據內容輔助判斷，而非另一個唯讀快照頁。
>
> **v8.0 起的設計**：審核操作（核准 / 退回 + 填寫退回原因）直接嵌入各 WorkflowType 對應的來源單據功能頁面，由各模組（REQ-0021 / REQ-0022 / REQ-0050 / REQ-0042 / REQ-0053 / REQ-0052）自行承載 UI。**待辦審核清單（Inbox）的角色從「審核操作入口」改為「導覽入口 + 歷史記錄查詢」**，每筆待辦項目點擊後直接跳轉至對應單據的功能頁面，由系統判斷登入者是否為該筆 WorkflowInstance 的指定審核者，決定是否顯示審核操作區。
>
> 工作流引擎本身（狀態機、版本快照、通知機制、RBAC 驗證）**不受影響**，僅 UI 操作層的承載位置改變。

---

## 2. 功能描述

> 系統應提供可設定的工作流引擎，讓各模組透過統一介面發起送審請求，引擎依照對應的工作流規則執行審核流程、狀態流轉與通知發送。審核操作（核准 / 退回）由各來源模組在其單據功能頁面承載，工作流引擎提供狀態判斷與權限驗證邏輯供各模組頁面呼叫；待辦清單作為跨模組的統一導覽入口與歷史記錄查詢頁。

---

## 3. Use Case：UC-030 發起與完成一個審核流程

### 3.1 主要流程（Happy Path）

```
Actor: Submitter（送審者）、Approver（審核者）

1. Submitter 在對應模組頁面點擊「送審」
2. 系統檢查前置條件（見 4.1 業務規則）
3. 系統建立 WorkflowInstance，狀態設為 pending_approval
4. 建立版本快照（snapshot），記錄送審當下的資料狀態
5. 系統依 Workflow Type 查找對應 Approver
6. 發送審核通知給 Approver（管道依系統設定），通知內容含單據連結（直達來源單據的功能頁面）
7. Approver 透過以下任一入口進入來源單據的功能頁面（v8.0 起，不再經過獨立審核頁）：
   - 點擊通知訊息中的單據連結
   - 從待辦審核清單（Inbox）點擊該筆項目，系統導向對應單據頁面
   - 直接從單據列表頁進入該筆單據
8. 系統判斷登入者是否為該 WorkflowInstance 的指定審核者（依 4.5 審核者設定規則）：
   - 是 → 單據頁面顯示「審核操作區」（核准 / 退回按鈕，退回需填原因）
   - 否 → 單據頁面維持唯讀（依該單據狀態與一般 RBAC 規則呈現）
9. Approver 在單據頁面查看完整單據內容（送審當下版本快照），選擇「核准」或「退回」
   - 核准 → 系統將 WorkflowInstance 狀態更新為 approved，來源單據執行對應通過後行為
   - 退回 → 填寫退回原因（必填），系統將 WorkflowInstance 狀態更新為 rejected，發送退回通知給 Submitter
10. 系統記錄審核結果、審核者、完成時間戳；該筆項目在 Inbox 從「待處理」分頁移至對應的歷史分頁（已核准 / 已退回）
```


### 3.2 替代流程：退回後重新送審

```
1. Submitter 收到退回通知，查看退回原因
2. Submitter 修改內容
3. 系統建立新版本快照（版本號遞增：v1 → v2）
4. 重新送審，回到主要流程步驟 3
   ※ 每次送審都建立獨立的 WorkflowInstance，舊版本永久保留
```

### 3.3 例外流程

| 例外情境 | 系統行為 |
|----------|----------|
| Submitter 未滿足前置條件就點送審 | 顯示缺少條件的錯誤提示，不建立 WorkflowInstance |
| Approver 帳號被停用（審核進行中） | 發送警告通知給 Admin，需重新指定審核者 |
| 單據被作廢（審核進行中） | WorkflowInstance 自動關閉，狀態設為 cancelled |

---

## 4. 業務規則

### 4.1 前置條件檢查

送審前系統自動驗證，不滿足則阻止送審並提示原因：

| 規則 | 說明 |
|------|------|
| 必填欄位完整 | 來源單據的必填欄位均已填寫 |
| 無進行中的審核 | 同一份單據不可同時存在兩個 `pending_approval` 的 WorkflowInstance |
| Submitter 有送審權限 | 依 RBAC 確認角色有 `submit` 權限（REQ-0001）；各 WorkflowType 的送審角色如下：`QUOTE_APPROVAL` → 全角色（`ROLE_ANY`，v7.0 更新）；`CONTRACT_MODIFY` → 全角色（`ROLE_ANY`，v7.0 更新）；`INVOICE_APPROVAL` → `ROLE_FINANCE`；`VENDOR_COST` → `ROLE_PM`；`EXEC_BONUS_APPROVAL` → `ROLE_PM`（廣告組別負責人）或 `ROLE_MANAGER` |

> ⚠️ **利潤率門檻為提示，不阻擋送審**：報價單利潤率低於門檻時，系統顯示警告提示，但不阻止 Submitter 送審。此為刻意設計，讓業務人員判斷是否仍要送審。

### 4.2 狀態機定義

所有 WorkflowInstance 遵循以下狀態機：

```
              送審
draft ──────────────→ pending_approval
  ↑                        │
  │          退回           │ 通過
  └──────── rejected ←─────┤
                           │
                        approved
                           
cancelled（任何狀態皆可由 Admin 強制取消）
```

| 狀態 | 說明 | 可執行的動作 |
|------|------|-------------|
| `draft` | 初始狀態 / 被退回後回到此狀態 | submit（送審） |
| `pending_approval` | 等待審核者處理 | approve（通過）、reject（退回） |
| `approved` | 審核通過 | 無（終態） |
| `rejected` | 審核退回，Submitter 可修改後重送 | submit（重新送審） |
| `cancelled` | 單據作廢或 Admin 手動取消 | 無（終態） |

> 📋 **時間戳記錄規則**：`pending_approval → approved` 或 `pending_approval → rejected` 時記錄於 `decided_at`；轉為 `cancelled`（送審者撤回或 Admin 強制取消）時記錄於 `cancelled_at`（v8.0 新增欄位，見 6.1 資料模型）。Inbox 各歷史分頁依各自對應的時間戳欄位排序。

### 4.3 版本快照規則

- 每次執行 `submit` 動作，系統建立一筆版本快照，版本號格式：`v1`、`v2`、`v3`…
- 快照內容：送審當下來源單據的完整欄位值
- 舊版快照**永久保留**，不可刪除
- Approver 在審核頁面可切換查看所有歷史版本

> ❓ **待業主確認（B-02）**：快照儲存策略——快照是儲存完整 JSON 資料，還是僅儲存與上一版本的 diff？這影響儲存空間設計，建議技術端評估後決定。

### 4.4 通知規則

通知管道由 **REQ-0002 系統設定**統一控制，工作流引擎本身不寫死通知邏輯。

✅ **v5.0 決策（B-26 resolved）**：**通知管道統一為站內通知（in_app）+ Email（SMTP）**，不整合 LINE 通知。

| 事件 | 通知對象 | 通知管道 | 通知內容（最低要求） |
|------|----------|---------|----------------------|
| 送審成功 | S-05 指定的具名審核者 | 站內通知 + Email | 單據類型、送審者姓名、單據連結 |
| 審核通過 | Submitter | 站內通知 + Email | 單據類型、審核者姓名、通過時間 |
| 審核退回 | Submitter | 站內通知 + Email | 單據類型、審核者姓名、退回原因 |
| Approver 帳號失效 | Admin | Email | 需重新指定審核者的警告 |

### 4.5 審核者設定規則

✅ **v5.6 更新（B-04 具名型）**：採用**具名型（方案 B）**，取代原角色型設計。

> ⚠️ **業務規則（BR-030-01）**：每種 Workflow Type 必須在 S-05 系統設定後台指派**至少一位具名審核者**；僅被指派的帳號可對該 WorkflowType 的 `pending_approval` 工作流執行審核動作（通過 / 退回）。未被指派者即使具備 `ROLE_MANAGER` 也無法審核。

**實作規則：**
- 系統設定後台（S-05 工作流設定）**為每種 WorkflowType 指定複數具名審核者**（至少 1 人）
- 送審通知僅發送給**被指派的具名審核者**
- 預設審核模式為任一人通過即視為通過（`require_all = false`），Admin 可切換為全體通過
- Admin 仍可強制取消任何工作流（`cancelled` 狀態）
- 審核者帳號被停用時，觸發警告通知 Admin 需重新指定

---

## 5. Workflow Type 定義

系統預設五種工作流類型，對應不同的來源模組與審核規則：

| Workflow Type | 中文名稱 | 來源模組 | 來源單據 | 通過後行為 | 退回後行為 |
|---------------|----------|----------|----------|------------|------------|
| `QUOTE_APPROVAL` | 報價單審核 | Core 2（REQ-0021） | Quote | 解鎖 PDF 輸出功能 | 通知業務，PDF 維持鎖定 |
| `CONTRACT_MODIFY` | 合約修改審核 | Core 2（REQ-0022） | Contract | 允許儲存修改版合約 | 通知業務，修改內容不儲存 |
| `INVOICE_APPROVAL` | 請款單審核 | Core 5（REQ-0050） | ARRecord | ARRecord 狀態 → `approved_internal` | 通知財務修改，重新送審 |
| `VENDOR_COST` | 廠商採購成本核定 | Core 4（REQ-0042） | VendorQuote | 採購成本標記為「已核定」 | 通知採購人員，退回原因說明 |
| `EXEC_BONUS_APPROVAL` | 廣告執行獎金審核 | Core 5（REQ-0052 Layer 1） | ExecBonusSheet | ExecBonusSheet.status → `finance_approved` → `gm_approved` | 通知廣告組別負責人退回修改 |

> 📋 `INVOICE_APPROVAL` 為 v1.2 新增（來源：財務文件分析，遺漏 4）。請款單製作後需兩層內部審核，通過後才能提供客戶確認。

> ✅ **INVOICE_APPROVAL 審核設計（B-33 resolved，v5.4）**：結合 v5.3 引入的 `User.is_general_manager` 旗標，INVOICE_APPROVAL 兩層審核均限定 `is_general_manager = false` 的 `ROLE_MANAGER`（即各部門主管，不含總經理），`require_all = true`，系統驗證兩次 `approver_id` 不同。與 SOP 311「財務經理審核 + 各部門主管審核」一致，兩層均為部門層級主管，不需總經理介入。

> 📋 **擴充性設計**：未來若有新的審核需求，在系統設定後台新增 Workflow Type 即可，不需修改程式碼。

---

## 6. 資料模型

### 6.1 WorkflowInstance 資料表

```
WorkflowInstance {
  id                UUID        PK
  workflow_type     ENUM        QUOTE_APPROVAL | CONTRACT_MODIFY | INVOICE_APPROVAL | VENDOR_COST | EXEC_BONUS_APPROVAL
  source_type       VARCHAR     來源單據類型（Quote / Contract / ARRecord / VendorQuote）
  source_id         UUID        來源單據的 ID（FK，依 source_type 對應不同資料表）
  version           INT         版本號（從 1 開始，每次重新送審遞增）
  status            ENUM        draft | pending_approval | approved | rejected | cancelled
  submitter_id      UUID        FK → User.id
  approver_id       UUID        FK → User.id（依 Workflow Type 設定決定）
  submitted_at      TIMESTAMP   送審時間
  decided_at        TIMESTAMP   審核完成時間（approved 或 rejected）
  cancelled_at      TIMESTAMP   撤回 / 強制取消時間（v8.0 新增；status = cancelled 時填入，供 Inbox「已撤回」分頁排序使用）
  reject_reason     TEXT        退回原因（rejected 時必填）
  source_version_id UUID        FK → 來源單據側的版本快照 ID（不存完整 JSON，見設計說明）
  created_at        TIMESTAMP
  updated_at        TIMESTAMP
}
```

> 📋 **快照設計說明（v1.1 修正）**：`WorkflowInstance` 不直接儲存來源單據的完整 JSON 快照。快照由**來源單據側**負責管理：
> - 報價單送審 → 快照存於 `QuoteVersion` 表，`source_version_id` 指向對應的 `QuoteVersion.id`
> - 合約修改送審 → 快照存於 `ContractVersion` 表（結構相同）
>
> **設計理由**：工作流引擎是通用模組，不應持有各業務單據的 JSON 結構知識。快照由各自的業務模組管理，工作流引擎只持有參照 ID。這符合 Modular Monolith 的模組邊界原則，且快照生命週期與來源單據綁定，不會因工作流引擎的清理操作而遺失。

### 6.2 WorkflowConfig 資料表（系統設定後台管理）

```
WorkflowConfig {
  id              UUID        PK
  workflow_type   ENUM        對應 Workflow Type
  approver_ids    UUID[]      指定的審核者 User ID 清單（方案 B）
  notify_channels VARCHAR[]   通知管道清單（email | in_app）
  require_all     BOOLEAN     true = 所有審核者都需通過；false = 任一通過即可
  created_at      TIMESTAMP
  updated_at      TIMESTAMP
}
```

### 6.3 WorkflowApproval 資料表（v8.0 補齊：多人 / 多層審核的個別審核記錄）

> 📋 **補齊說明**：`require_all = true` 或多層審核（如 INVOICE_APPROVAL 兩層、EXEC_BONUS_APPROVAL 兩層）需要追蹤「每一位審核者各自的審核狀態」，單一 `WorkflowInstance.approver_id` 欄位（單一 FK）無法表達多人審核的個別進度。本表在 v7.9 之前的版本已被 §4.3（INVOICE_APPROVAL 並行審核說明）與 §3.5（EXEC_BONUS_APPROVAL 序列審核）文字引用，但未正式定義；v8.0 因新增的審核操作區規格（§8.2 / 8.3）需要明確呈現「審核進度」UI，於此補齊正式資料模型。

```
WorkflowApproval {
  id                UUID        PK
  workflow_instance_id  UUID    FK → WorkflowInstance.id
  approver_id       UUID        FK → User.id
  layer             INT         審核層級（1 = 第一層，2 = 第二層；單層審核固定為 1）
  status            ENUM        pending | approved | rejected
  decided_at        TIMESTAMP   此筆審核記錄完成時間
  reject_reason     TEXT        退回原因（status = rejected 時必填）
  created_at        TIMESTAMP
}

約束：
- 同一 workflow_instance_id 下，每位 approver_id 僅有一筆記錄
- require_all = false（任一人通過即可）：任一筆 status = approved 時，WorkflowInstance 即整體 approved
- require_all = true 且為並行審核（如 INVOICE_APPROVAL）：所有 layer 相同的記錄皆需 approved，才整體 approved；任一筆 rejected 則整體 rejected
- require_all = true 且為序列審核（如 EXEC_BONUS_APPROVAL）：layer 2 的記錄在 layer 1 對應記錄 approved 前，狀態維持 pending 且不可操作
```

> 📋 **與 WorkflowInstance.approver_id 的關係**：單層單人審核（QUOTE_APPROVAL、CONTRACT_MODIFY、VENDOR_COST）情境下，`WorkflowInstance.approver_id` 記錄實際完成審核的那一位（多位候選審核者中先完成的一人，若 `require_all = false`）；`WorkflowApproval` 表則完整記錄所有被指派審核者各自的狀態，供審核進度 UI（如 §4.3b 兩層審核進度區）查詢使用。
>
> 📋 **與各模組自有審核欄位的關係**：部分來源模組在自己的主表上也保留審核結果欄位（例如 `ARRecord` 的兩層審核狀態反映於 `status` 列舉值；`ExecBonusSheet.finance_approved_by` / `gm_approved_by`）。這些欄位是各模組為避免查詢時跨表 join `WorkflowApproval` 而保留的**業務層快取**，由系統在 `WorkflowApproval` 寫入時同步更新，不是重複定義或衝突；`WorkflowApproval` 是唯一的權威資料來源（source of truth），各模組欄位僅供讀取效能優化。

### 6.4 實體關係

```
WorkflowInstance ─── N:1 ──→ User（submitter）
WorkflowInstance ─── N:1 ──→ User（approver）
WorkflowInstance ─── N:1 ──→ WorkflowConfig（依 workflow_type）
WorkflowInstance ─── N:1 ──→ Quote | Contract | VendorQuote（依 source_type）
WorkflowInstance ─── N:1 ──→ QuoteVersion | ContractVersion | ...（依 source_version_id，快照參照）
WorkflowInstance ─── 1:N ──→ WorkflowApproval（v8.0 補齊：多人 / 多層審核個別記錄）
WorkflowApproval  ─── N:1 ──→ User（approver）
```

---

## 7. API 介面設計（草稿）

> 📋 以下為 SA 建議的 API 設計，供後端工程師參考，實際 endpoint 命名與 payload 結構由後端確認後定案。

### 7.1 發起送審

```
POST /api/v1/workflows/submit

Request Body:
{
  "workflow_type": "QUOTE_APPROVAL",
  "source_type": "Quote",
  "source_id": "uuid-of-the-quote"
}

Response 200:
{
  "workflow_instance_id": "uuid",
  "version": 1,
  "status": "pending_approval",
  "approvers": [
    { "id": "uuid", "name": "Sam" },
    { "id": "uuid", "name": "Tora" }
  ],
  "submitted_at": "2026-05-11T10:00:00Z"
}

Response 422（前置條件不滿足）:
{
  "error": "PRECONDITION_FAILED",
  "details": ["required_fields_missing: ['client_email']"]
}
```

### 7.2 審核動作（通過 / 退回）

```
POST /api/v1/workflows/{workflow_instance_id}/decide

Request Body:
{
  "decision": "approved" | "rejected",
  "reject_reason": "請補充付款條款說明"  // rejected 時必填
}

Response 200:
{
  "workflow_instance_id": "uuid",
  "status": "approved" | "rejected",
  "decided_at": "2026-05-11T11:30:00Z"
}

Response 403（非指定審核者）:
{
  "error": "FORBIDDEN",
  "message": "您不是此工作流的指定審核者"
}
```

### 7.3 查詢工作流狀態（單一單據）

```
GET /api/v1/workflows?source_type=Quote&source_id={uuid}

Response 200:
{
  "instances": [
    {
      "workflow_instance_id": "uuid",
      "version": 2,
      "status": "approved",
      "submitter": { "id": "uuid", "name": "業務A" },
      "decided_by": { "id": "uuid", "name": "Sam" },
      "approvers": [
        { "id": "uuid", "name": "Sam" },
        { "id": "uuid", "name": "Tora" }
      ],
      "submitted_at": "...",
      "decided_at": "..."
    },
    {
      "workflow_instance_id": "uuid",
      "version": 1,
      "status": "rejected",
      "reject_reason": "請補充付款條款說明",
      ...
    }
  ]
}
```

### 7.4 查詢 Inbox 列表（v8.0 新增，供待辦審核清單分頁使用）

```
GET /api/v1/workflows/inbox?tab=pending|approved|rejected|cancelled&workflow_type={optional}&page={n}

說明：
- tab=pending  → 回傳登入者為指定審核者、status=pending_approval 的所有 WorkflowInstance
- tab=approved → 回傳登入者為審核者之一、status=approved 的歷史記錄
- tab=rejected → 回傳登入者為審核者之一、status=rejected 的歷史記錄
- tab=cancelled→ 回傳登入者為審核者之一、status=cancelled 的歷史記錄
- workflow_type 可選，篩選特定 WorkflowType（多選以逗號分隔）
- pending 分頁依 submitted_at 升序；approved/rejected 分頁依 decided_at 降序；cancelled 分頁依 cancelled_at 降序（見 6.1 資料模型）

Response 200:
{
  "tab": "pending",
  "total": 12,
  "items": [
    {
      "workflow_instance_id": "uuid",
      "workflow_type": "QUOTE_APPROVAL",
      "source_type": "Quote",
      "source_id": "uuid",
      "source_link": "/quotes/{uuid}",          // 前端導向用，對應 8.3 對照表
      "summary": "老撈麻辣鍋｜$315,000",           // 各模組自訂摘要文字
      "submitter": { "id": "uuid", "name": "業務A" },
      "submitted_at": "2026-06-25T10:00:00Z",
      "waiting_days": 5                            // 僅 pending 分頁回傳，用於橘色警示判斷
    }
  ]
}
```

> 📋 **`source_link` 欄位說明**：由後端依 `workflow_type` 對照 8.3 表自動組裝，前端點擊項目時直接導向該連結，不需要前端自行維護對照邏輯。`summary` 欄位內容由各來源模組決定（報價單回傳客戶與金額，合約回傳合約編號，請款單回傳客戶與帳款月份等）。

---

## 8. UI 規格

### 8.1 送審者視角

**送審按鈕狀態**

| 條件 | 按鈕狀態 | 說明 |
|------|----------|------|
| 單據狀態 `draft`，必填欄位完整 | 可點擊，顯示「送審」 | — |
| 單據狀態 `draft`，必填欄位不完整 | 停用（灰色） | hover 顯示缺少哪些欄位 |
| 單據狀態 `pending_approval` | 隱藏送審鈕，顯示「審核中」badge | — |
| 單據狀態 `approved` | 隱藏送審鈕，顯示「已通過」badge | — |
| 單據狀態 `rejected` | 顯示「退回原因」區塊 + 「修改後重送」按鈕 | — |

**版本歷史面板**

- 位置：單據頁面右側或底部收合區塊
- 顯示：所有版本的送審時間、審核者、結果、退回原因
- 操作：可點擊查看任一版本的快照內容（唯讀）

### 8.2 審核者視角

**待辦審核清單（Inbox）— 導覽入口 + 歷史記錄查詢**

> ⚠️ **v8.0 起，Inbox 不再是審核操作頁面**，僅作為跨模組的統一導覽入口與歷史記錄查詢頁。點擊任一筆項目，系統直接導向該筆 WorkflowInstance 對應的來源單據功能頁面（依 8.3 對照表），由單據頁面承載實際的審核操作。

- 入口：頂部導覽列通知圖示 + 獨立「待辦審核」頁面
- **分頁設計**：清單依狀態分為四個分頁

| 分頁 | 顯示內容 | 排序 |
|------|----------|------|
| 待處理 | 所有 `pending_approval` 狀態的 WorkflowInstance（預設開啟分頁） | 依送審時間升序（最早送審排最前） |
| 已核准 | 該登入者為審核者、狀態為 `approved` 的歷史記錄 | 依完成時間降序（最新處理排最前） |
| 已退回 | 該登入者為審核者、狀態為 `rejected` 的歷史記錄 | 依完成時間降序 |
| 已撤回 | 該登入者為審核者、狀態為 `cancelled` 的歷史記錄 | 依完成時間降序 |


- 列表欄位：WorkflowType 標籤、來源單據摘要（金額 / 客戶名稱 / 合約編號等）、送審者、送審時間、（待處理分頁額外顯示）等待中天數，超過 N 天顯示橘色警示
- 篩選：WorkflowType（多選）
- 點擊任一筆項目 → 導向對應單據功能頁面（見 8.3），並自動定位至該頁面的審核操作區（若登入者為指定審核者）或單據內容主體（若非審核者，僅供查看脈絡）

**審核操作區（嵌入各單據功能頁面）**

實際的核准 / 退回操作不在 Inbox 內完成，而是在各 WorkflowType 對應的單據功能頁面中（規格詳見各自的 REQ 文件）。共同規則如下：

| 項目 | 規則 |
|------|------|
| 顯示條件 | 單據狀態為 `pending_approval` **且** 登入者為該 WorkflowInstance 的指定審核者（依 4.5 審核者設定規則） |
| 區塊內容 | 送審當下版本快照（完整單據內容，唯讀）、版本歷史面板（可切換查看舊版本）、核准按鈕 + 備註欄（選填）、退回按鈕 + 退回原因欄（必填） |
| 非審核者檢視 | 單據維持唯讀，不顯示審核操作區，但可看到「審核中」狀態 badge |
| 操作後行為 | 依 9 節驗收標準執行狀態流轉與通知；Inbox 對應項目自動移至歷史分頁 |

### 8.3 WorkflowType ↔ 承載頁面對照表

各 WorkflowType 的審核操作區，由以下各自的來源模組功能頁面承載：

| Workflow Type | 來源單據 | 承載審核操作的功能頁面 | 對應 REQ |
|---------------|----------|----------------------|----------|
| `QUOTE_APPROVAL` | Quote | 報價單詳情頁 | REQ-0021 |
| `CONTRACT_MODIFY` | Contract | 合約條文編輯頁（ContractBlock 模式） | REQ-0022 |
| `INVOICE_APPROVAL` | ARRecord | AR 請款單詳情頁 | REQ-0050 |
| `VENDOR_COST` | VendorQuote | 廠商採購詳情 / 送審頁 | REQ-0042 |
| `EXEC_BONUS_APPROVAL` | ExecBonusSheet | 廣告執行獎金結算頁（兩層：Finance 主管 → 總經理） | REQ-0052 |

---

## 9. 驗收標準（Acceptance Criteria）

### AC-001：正常送審流程

```gherkin
Given 業務人員（任意角色）已填寫完整的報價單
When 業務人員點擊「送審」
Then 系統建立 WorkflowInstance，狀態為 pending_approval
And 建立版本快照 v1
And 發送審核通知給指定的 Approver
And 報價單的「送審」按鈕替換為「審核中」badge
And PDF 輸出功能維持鎖定
```

### AC-002：審核通過

```gherkin
Given 一個狀態為 pending_approval 的 WorkflowInstance（QUOTE_APPROVAL）
And Approver 在報價單詳情頁查看送審版本快照
When Approver 在報價單詳情頁的審核操作區點擊「通過」
Then WorkflowInstance 狀態更新為 approved
And 記錄 decided_at 時間戳與 approver_id
And 報價單 PDF 輸出功能解鎖
And 發送通過通知給 Submitter
And 該筆項目在 Approver 的 Inbox 從「待處理」分頁移至「已核准」分頁
```

### AC-003：審核退回

```gherkin
Given 一個狀態為 pending_approval 的 WorkflowInstance
And Approver 在來源單據功能頁面查看送審版本快照
When Approver 在審核操作區填寫退回原因並點擊「退回」
Then WorkflowInstance 狀態更新為 rejected
And 記錄 reject_reason
And 發送退回通知給 Submitter，通知內容包含退回原因
And 來源單據狀態回到 draft（可繼續編輯）
And 該筆項目在 Approver 的 Inbox 從「待處理」分頁移至「已退回」分頁
```

### AC-004：退回後重新送審產生新版本

```gherkin
Given 一個狀態為 rejected 的 WorkflowInstance，版本為 v1
When Submitter 修改內容後重新點擊「送審」
Then 系統建立新的 WorkflowInstance，版本為 v2
And v1 的版本快照仍然保留，可查詢
And 新的 WorkflowInstance 狀態為 pending_approval
```

### AC-005：前置條件不滿足時阻止送審

```gherkin
Given 業務人員的報價單缺少「電子發票信箱」必填欄位
When 業務人員嘗試點擊「送審」
Then 系統顯示錯誤提示「電子發票信箱為必填欄位，請補充後再送審」
And 不建立 WorkflowInstance
```

### AC-006：利潤率警告不阻擋送審

```gherkin
Given 業務人員的報價單利潤率低於系統設定的門檻
When 業務人員點擊「送審」
Then 系統顯示警告提示「此報價單利潤率低於 XX%，請確認後再送審」
And 業務人員確認後仍可送審（不阻擋）
And WorkflowInstance 正常建立
```

### AC-007：非審核者無法執行審核動作

```gherkin
Given 一個 pending_approval 的 WorkflowInstance（QUOTE_APPROVAL）
And S-05 設定的具名審核者為 Sam 與 Tora
When 其他使用者（非 Sam、非 Tora）嘗試呼叫審核 API
Then 系統回傳 403 錯誤「您不是此工作流的指定審核者」
And WorkflowInstance 狀態不變
```

### AC-008：同一單據不可同時有兩個進行中的審核

```gherkin
Given 報價單 A 已有一個 pending_approval 的 WorkflowInstance
When 有人嘗試對報價單 A 再次發起送審
Then 系統回傳錯誤「此單據已有進行中的審核，請等待審核完成」
And 不建立新的 WorkflowInstance
```

### AC-009：審核操作區僅對指定審核者顯示（v8.0 新增）

```gherkin
Given 一個狀態為 pending_approval 的 WorkflowInstance（QUOTE_APPROVAL）
And S-05 設定的具名審核者為 Sam 與 Tora
When Sam 進入該報價單詳情頁
Then 頁面顯示審核操作區（核准 / 退回按鈕）
When 非審核者（如 Sales 本人或其他 Manager）進入同一份報價單詳情頁
Then 頁面不顯示審核操作區，僅呈現「審核中」狀態 badge 與唯讀內容
```

### AC-010：Inbox 點擊待辦項目直接導向來源單據頁面（v8.0 新增）

```gherkin
Given Manager 的 Inbox「待處理」分頁中有一筆 QUOTE_APPROVAL 待審項目
When Manager 點擊該筆項目
Then 系統導向對應的報價單詳情頁
And 該頁面自動顯示審核操作區（因 Manager 為指定審核者）
And 不經過任何獨立的審核詳情頁
```

---

## 10. 待確認事項

| 編號 | 類型 | 問題 | 負責人 | 狀態 |
|------|------|------|--------|------|
| B-02 | 業務決策 | 版本快照儲存策略：完整 JSON 快照 vs. 只存 diff？ | 技術 + 業務確認 | `open` |
| T-05 | 技術確認 | 多人審核時（require_all = true）的部分通過狀態如何在 UI 呈現？ | 後端工程師 | `open` |
| T-06 | 技術確認 | 通知發送失敗時的 retry 機制與 dead letter 處理方式 | 後端工程師 | `open` |

---

## 11. 與其他 REQ 的關係

```
REQ-0001（使用者管理）
  └─ 提供 User 資料、角色權限驗證給工作流引擎使用

REQ-0002（系統設定）
  └─ 提供 WorkflowConfig 設定（審核者、通知管道）

REQ-0030（工作流引擎）← 本文件
  ├─ 被 REQ-0021（報價單）呼叫：QUOTE_APPROVAL
  ├─ 被 REQ-0022（合約）呼叫：CONTRACT_MODIFY
  ├─ 被 REQ-0050（AR/AP）呼叫：INVOICE_APPROVAL
  ├─ 被 REQ-0042（廠商採購）呼叫：VENDOR_COST
  └─ 被 REQ-0052（獎金引擎）呼叫：EXEC_BONUS_APPROVAL
```

---

*— REQ-0030 規格文件結束 —*  
*下一個建議填充：REQ-0021（報價單）— 依賴本文件的 QUOTE_APPROVAL 工作流*

---

# §9｜REQ-0040 / REQ-0041 專案建立與專案執行

> 📋 **v7.4 重構說明**：本章節已全面重構。原 REQ-0025（開案交接）功能合併入「建立專案」流程，REQ-0025 章節改為廢止說明（見 §12）。服務團隊指派改為「部門組合制」，以 `ProjectTeamDepartment` + `ProjectMember` 取代原 `Onboarding` + `OnboardingMember`。

| 欄位 | REQ-0040（專案建立） | REQ-0041（專案執行） |
|------|----------|----------|
| **REQ-ID** | REQ-0040 | REQ-0041 |
| **Use Case ID** | UC-040 | UC-041 |
| **所屬模組** | F-04 Core 4 專案執行層 | F-04 Core 4 專案執行層 |
| **優先級** | `P0` | `P0` |
| **狀態** | `open` — v7.4 全面重構 | `open` — v7.4 新增營銷計畫表 Tab |
| **最後更新** | 2026-06-24 | 2026-06-30（新增廠商採購 Tab，與 REQ-0042 共用 VendorQuote） |
| **依賴關係** | REQ-0001、REQ-0006（組織架構，Department.department_type）、REQ-0010（客戶主檔）、REQ-0021（報價單） | REQ-0040（前置依賴）、REQ-0011（廠商名錄，P1）、REQ-0042（廠商採購成本管理，P1；Tab 6 直接呈現 VendorQuote 資料，單專案篩選視角） |

---

## 1. 背景與設計動機

現況：專案資料散落各人 Google 雲端，分工靠手動「客戶案件負責總表」、交接靠口頭、廠商關聯靠 Email。  
v7.4 目的：
1. 將原開案交接（REQ-0025）合併入「建立專案」單一操作，由 Admin / Executive / Manager 在報價單回簽後直接建立專案並完成人員指派。
2. 引入部門組合制：依報價單費用類型決定必填的部門類型，每個部門類型對應一個實際部門，確保跨部門協作有系統化記錄。
3. 新增營銷計畫表分頁，集中管理外部連結與上傳文件。

v9.7 調整：
1. 開案入口前移至「專案列表頁」全域「＋ 建立專案」按鈕，不再從報價單詳情頁觸發。
2. 建立專案改為「先選品牌 → 再選報價單 → 確認資訊 → 部門＋人員」4 步驟流程；支援開案時一次選定多張已回簽報價單（均標記 `is_primary = true`）。
3. 部門必填判斷改為依所有選定報價單費用類型聯集決定。
4. 部門指派與人員指派合併為同一步驟。

---

## 2. 功能描述

**REQ-0040：** 系統應支援年約案與單次案兩種專案類型；提供以報價單費用類型驅動的部門組合制人員指派；完整的結案流程（含結案原因記錄）；以及人員異動調整功能。

**REQ-0041：** 系統應提供專案下的服務項目合併列表（含篩選）、營銷計畫表（外部連結 + 文件上傳）、報價單列表、合約列表、廠商採購（與 REQ-0042 共用同一張 `VendorQuote` 資料表，本頁為單專案篩選視角）；不提供工時記錄（本期範疇外）。

---

## 3. 四層巢狀結構

```
Customer（客戶公司）      ← REQ-0010
    └── Brand（品牌）     ← REQ-0010
            └── Project（專案）          ← REQ-0040
                    ├── Service（服務項目）← REQ-0041
                    ├── ProjectTeamDepartment（部門組合）← REQ-0040
                    └── ProjectMember（服務團隊成員）← REQ-0040
```

**資料流向（v9.7 新流程）：**
```
Admin / Executive / Manager 在專案列表頁點擊「＋ 建立專案」
    │
    ▼
Step 1：選擇品牌 + 填寫專案名稱 + 選擇專案類型
    │
    ▼
Step 2：選擇該品牌下已回簽的報價單（可複選多張，均標記 is_primary = true）
    │
    ▼
Step 3：確認帶入資訊（唯讀）
  ├── 各張報價單分別顯示：服務期間、費用類型
  └── 費用類型聯集 → 決定下一步必填部門類型
    │
    ▼
Step 4：部門組合 + 人員指派（同頁面完成）
  ├── 依費用類型聯集顯示必填部門
  ├── 各部門指派 MPM / SPM
  └── 指派 PD（共同，不限部門）
    │
    ▼
Project 建立完成
通知 PD、各部門 MPM / SPM（站內通知 + Email）
    │
    ▼
PM 加入後持續維護：
  ├── 服務項目列表
  ├── 營銷計畫表（連結 / 文件）
  ├── 報價單列表
  ├── 合約列表
  └── 委外廠商
```

---

## 4. 建立專案流程（整合原開案交接）

### 4.1 觸發條件

**入口**：專案列表頁右上角「＋ 建立專案」按鈕，Admin / Executive / Manager 皆可點擊，無需進入報價單詳情頁。

**Step 2 報價單可選條件**：下拉選單僅列出符合以下全部條件的報價單：

| 條件 | 說明 | 資料來源 |
|------|------|---------|
| ✅ 屬於所選品牌 | `Quote.brand_id = 選定品牌` | REQ-0021 |
| ✅ 報價單已審核通過 | `Quote.status = approved` | REQ-0021 |
| ✅ 客戶回簽已上傳 | `Quote.signed_file_url IS NOT NULL` | REQ-0021 |
| ✅ 尚未掛入其他專案 | `Quote.project_id IS NULL` | REQ-0021 |

> ⚠️ **BR-040-00**：合約簽訂不作為建立專案的前置條件，實務上報價 → 開案 → 主合約簽訂常同步進行。
>
> ⚠️ **BR-040-00b（預收款暫行）**：具備預收款標籤（`Customer.requires_prepayment = true`）的客戶，Step 4 送出確認時若財務尚未確認入帳，系統顯示橘色警示（不強制攔截）。

### 4.2 可操作角色

| 操作 | Admin | Executive | Manager | PM/PD | Finance |
|------|-------|-----------|---------|-------|---------|
| 建立專案（含部門指派）| ✅ | ✅ | ✅ | ❌ | ❌ |
| 調整服務團隊人員 | ✅ | ✅ | ✅ | ❌ | ❌ |
| 查看專案詳情（負責案件）| ✅ | ✅ | ✅ | ✅ | ✅ |
| 維護服務項目 / 連結 / 廠商 | ✅ | ✅ | ✅ | ✅（負責品牌）| ❌ |
| 申請結案 | ✅ | ✅ | ✅ | ❌ | ❌ |
| 確認結案 | ✅ | ✅ | ✅ | ❌ | ❌ |

> 📋 **PM 通知流程**：PM 完成報價回簽上傳後，可通知有權建立專案的角色（Manager / Admin / Executive）進行開案；PM 在開案完成後被加入並取得負責品牌的完整存取權。詳見 §4.3 Step 4 確認送出。

### 4.3 建立專案步驟

```
Step 1：選品牌 + 基本資訊（操作者填寫）
  ├── 選擇品牌（必填，從客戶主檔選，下拉含客戶公司名稱）
  ├── 專案名稱（必填，例：老撈麻辣鍋 2026 顧問服務）
  └── 專案類型（必填，年約案 / 單次案）

Step 2：選擇報價單（操作者選擇）
  ├── 下拉列出該品牌下所有可選報價單
  │   （條件：status = approved AND signed_file_url IS NOT NULL
  │           AND project_id IS NULL）
  ├── 支援複選，至少選一張
  └── 所有選定報價單均標記 is_primary = true，掛入此 Project

Step 3：確認帶入資訊（唯讀）
  ├── 各張選定報價單分別列出：
  │   ├── 報價單編號
  │   ├── 服務期間（start_date ～ end_date）
  │   └── 費用類型（QuoteItem.service_category 聯集顯示）
  └── 費用類型聯集 → 決定 Step 4 必填部門類型（系統提示）

Step 4：部門組合 + 人員指派（同頁面完成）
  【部門組合】
  系統依所有選定報價單費用類型聯集顯示必填部門類型：
  ├── 聯集含顧問服務費 → 「運營型部門」必填
  ├── 聯集含廣告費     → 「廣告型部門」必填
  ├── 聯集含整合行銷費 → 「整合行銷型部門」必填
  └── 聯集含設計費     → 「設計型部門」必填
  操作者為每個必填部門類型選擇對應的實際部門
  （每個部門類型只能對應一個實際部門）

  【人員指派】
  ├── PD（共同）：從全公司帳號單選，不限已選部門
  └── 各部門 MPM / SPM：
      ├── 只能從該部門成員中選（Appointment 有效）
      ├── 同職位可複數人
      ├── 同人可複數職位（同部門內）
      └── 每個職位至少一人在任

  【確認送出】
  → 建立 Project + ProjectTeamDepartment + ProjectMember
  → 所有選定報價單 Quote.project_id 更新為此 Project.id
  → 通知 PD、各部門 MPM / SPM（站內通知 + Email）
  → PM 取得負責品牌完整存取權
```

> 📋 **PM 通知流程**：PM 完成報價回簽上傳後，可通知有權建立專案的角色（Manager / Admin / Executive）進行開案；PM 在開案完成後被加入並取得負責品牌的完整存取權。

---

## 5. 部門類型制度

### 5.1 Department.department_type

`Department` 主檔新增 `department_type` 欄位（由 Admin 在組織架構管理後台設定）：

| department_type | 說明 | 對應費用類型 |
|-----------------|------|------------|
| `consulting` | 運營型部門（電商營運一部、二部等）| 顧問服務費 |
| `advertising` | 廣告型部門（數位廣告一、二、三部等）| 廣告費 |
| `integrated` | 整合行銷部門 | 整合行銷費 |
| `design` | 設計型部門（創意視覺部等）| 設計費 |
| `other` | 其他（財務行政部、總經理室）| — |

> ⚠️ **BR-040-01（依賴 REQ-0006）**：`Department.department_type` 由 Admin 在組織架構管理（REQ-0006）後台設定。此欄位為建立專案的必要前提，Admin 應在系統上線前完成各部門的 `department_type` 設定。

### 5.2 必填判斷邏輯

```
系統掃描所有選定報價單的 QuoteItem（費用類型取聯集）：
  IF 任一選定報價單的任一 QuoteItem.service_category 屬於「顧問服務類」：
    → consulting 部門必填
  IF 任一選定報價單的任一 QuoteItem.service_category 屬於「廣告投放類」：
    → advertising 部門必填
  IF 任一選定報價單的任一 QuoteItem.service_category 屬於「整合行銷類」：
    → integrated 部門必填
  IF 任一選定報價單的任一 QuoteItem.service_category 屬於「視覺設計類」：
    → design 部門必填（設計部門通常屬加入性質，非主導）
```

> 📋 **多張報價單聯集說明**：開案時選定多張報價單，必填部門類型取所有報價單費用類型的聯集。例如：報價單 A 含顧問服務費、報價單 B 含廣告費，則 consulting 和 advertising 部門均必填。

> 📋 **service_category 與 department_type 的對應**由系統設定（REQ-0002 S-02）維護，Admin 可在服務項目管理後台設定每個服務大類對應的 department_type。

---

## 6. 專案狀態機

```
報價單回簽 + 主管建立專案
    │
    ▼
active（進行中）
    │
    ├─ 追加報價掛入（維持 active）
    │   ├── 同類型：自動歸屬既有部門，無需額外操作
    │   └── 新增類型：掛入時同步補填新部門 + MPM/SPM 後才完成掛入
    │
    └─ Admin / Executive / Manager 申請結案
            ↓ 填寫結案原因（必填）＋不可逆警告確認彈窗
        closed（已結案）
```

### 6.1 結案原因（close_reason）

| 代碼 | 說明 |
|------|------|
| `contract_expired` | 合約到期未續約（正常結案） |
| `financial_default` | 財務違約強制終止（依主合約第四條） |
| `client_termination` | 客戶主動終止合作（雙方合意） |
| `other` | 其他（需附文字說明） |

> ⚠️ **BR-040-02（財務違約）**：`close_reason = financial_default` 時，結案後相關未收款 ARRecord 狀態維持不變，Finance 繼續透過 AR 模組追收，結案不影響昊揚對既有應付款項的法律請求權。
>
> 📋 **逾期服務中止機制（來源：2026 訪談確認）**：客戶發生逾期未付款時，昊揚業務上有權依主合約暫停或終止後續服務。系統層面不建立自動暫停機制，由負責人判斷後透過「申請結案（`close_reason = financial_default`）」手動中止專案；系統不自動鎖定或暫停服務項目。

> ⚠️ **BR-040-03（Service.status）**：專案結案（`closed`）後，所有 `active` 的 Service 自動標為 `completed`，記錄 `completed_at = closed_at`。`service_end_date` 不影響 AR 生成，完全由人工判斷時機結案（方案 B，2026-06-24 確認）。

### 6.2 結案流程詳細

```
Admin / Executive / Manager 點擊「申請結案」
  → 選擇結案原因（必填）
  → 若 close_reason = other，必須填寫說明文字
  → 系統顯示不可逆警告彈窗：
      「結案後專案進入唯讀狀態，所有服務項目將標記為完成，此操作無法撤回。確定要結案嗎？」
  → 申請人確認
  → Project.status → closed
  → 記錄 closed_at / closed_by / close_reason
  → 所有 active Service → completed
  → 系統通知：
      (1) 各參與部門的有效主管（ProjectTeamDepartment → department_id → 查詢 head Appointment）
      (2) 所有 ROLE_FINANCE 帳號（同步財務）
```

---

## 7. 人員異動調整

> ⚠️ **BR-040-04（至少一人在任）**：每個職位（PD / MPM / SPM）在任何時間點至少有一人 `assigned_to IS NULL`（仍在任），系統阻擋造成職位空缺的異動操作。

操作步驟（Admin / Executive / Manager 執行）：

```
進入專案詳情頁 → 「調整人員」按鈕
  → 選擇要異動的職位（如：廣告部 MPM）
  → 填入：異動日、繼任者、備注（必填）
  → 系統執行：
      舊 ProjectMember.assigned_to = 異動日
      新建 ProjectMember（繼任者）assigned_from = 異動日 + 1
      department_id 快照自繼任者有效 Appointment
  → 通知繼任者：已被指派為 [品牌名] [部門] [職位]
  → 通知前任者：已從 [品牌名] [部門] [職位] 卸任
  → 歷史紀錄保留（前任貢獻天數仍計入績效）
```

---

## 8. Service（服務項目）規格（REQ-0041）

### 8.1 Service 欄位

| 欄位 | 必填 | 來源 | 說明 |
|------|------|------|------|
| `service_name` | 是 | 報價單帶入 | 例：META 廣告代操、電商陪跑顧問 |
| `service_category` | 否 | 報價單帶入 | 對應 REQ-0044 服務大類 |
| `department_type` | 否 | 自動推導 | 依 service_category 推導（consulting / advertising / integrated / design） |
| `billing_type` | 是 | 報價單帶入 | monthly_prepaid / monthly_billing / ad_billing / storage / standalone |
| `amount` | 否 | 報價單帶入 | 未稅金額（廣告抽成型可留空） |
| `quote_id` | 是 | 報價單 FK | 來源報價單（首次 or 追加）|
| `exec_bonus_ratio` | 否 | 系統設定 | 廣告執行獎金綁定比例（ad_billing 適用，預設 7%） |
| `status` | 是 | 系統管理 | active / completed |
| `notes` | 否 | PM 填寫 | 服務執行備註 |

> 📋 **Service 狀態說明**：`paused` 狀態移除（v7.4）。服務不存在執行中途暫停的情境，僅有 active（進行中）和 completed（已完成）。

### 8.2 服務項目列表（合併顯示）

相同服務項目名稱（`service_name` 相同）來自首次報價或多次追加時，合併顯示為一列：

| 欄位 | 說明 |
|------|------|
| 服務名稱 | 合併後的服務名稱 |
| 服務類別 | 對應大類 |
| 累計金額 | 所有來源報價單的金額加總 |
| 來源報價單數 | 幾筆報價單包含此服務 |
| 狀態 | active / completed |

**篩選器**：

- 依服務類別（consulting / advertising / integrated / design）
- 依來源報價單（全部 / 首次 / 追加 QT-xxx）
- 依狀態（active / completed）

**展開明細**：點開一列可查看各報價單的個別金額、服務期間、報價單編號。

### 8.3 追加報價掛入流程

**觸發條件**：追加報價單審核通過 + 客戶回簽上傳

**同類型追加**（報價單費用類型與現有部門組合完全一致）：
```
追加報價單詳情頁 → 點擊「掛入專案」→ 選擇同品牌既有專案
  → 系統自動新增 Service
  → 無需重新指派部門或人員
```

**新增類型追加**（報價單含有現有專案未涵蓋的費用類型）：
```
追加報價單詳情頁 → 點擊「掛入專案」→ 選擇同品牌既有專案
  → 系統偵測到新費用類型（如：整合行銷費，但專案目前無 integrated 部門）
  → 強制要求補填：選擇整合行銷部門 + 指派 MPM / SPM
  → 補填完成後才能完成掛入
  → 系統新增 ProjectTeamDepartment + ProjectMember + Service
```

---

## 9. 資料模型

### 9.1 Project 資料表

```
Project {
  id                    UUID          PK
  brand_id              UUID          NOT NULL, FK → Brand.id
  customer_id           UUID          NOT NULL, FK → Customer.id（冗余查詢）
  project_name          VARCHAR(200)  NOT NULL
  project_type          ENUM          annual | one_time
  -- service_start_date 移除（v9.7）：各報價單各自保留服務期間，不合併至 Project 層
  -- primary_quote_id 移除（v9.7）：改由 Quote.project_id + Quote.is_primary 查詢開案時選定的報價單群組
  pd_user_id            UUID          NOT NULL, FK → User.id（PD，單人）
  status                ENUM          active | closed
  close_reason          ENUM          NULL | contract_expired | financial_default |
                                      client_termination | other
  close_reason_notes    TEXT                    -- close_reason = other 時必填
  closed_at             TIMESTAMP
  closed_by             UUID          FK → User.id
  notes                 TEXT
  created_by            UUID          NOT NULL, FK → User.id
  created_at            TIMESTAMP     DEFAULT now()
  updated_at            TIMESTAMP
}
```

> 📋 **v9.7 欄位移除說明**：
> - `service_start_date` / `service_end_date`：服務期間改由各關聯報價單（`Quote`）各自記錄，Project 層不再合併儲存。查詢專案整體服務期間時，取關聯報價單的最早 `start_date` 與最晚 `end_date`。
> - `primary_quote_id`：開案時選定的報價單（可多張）統一以 `Quote.project_id = Project.id AND Quote.is_primary = true` 查詢，不再於 Project 層單獨儲存。

### 9.2 ProjectTeamDepartment 資料表（新增，v7.4）

每個專案參與部門各一筆記錄：

```
ProjectTeamDepartment {
  id                UUID          PK
  project_id        UUID          NOT NULL, FK → Project.id
  department_id     UUID          NOT NULL, FK → Department.id
  department_type   ENUM          consulting | advertising | integrated | design
  is_required       BOOLEAN       NOT NULL  -- true = 由報價單費用類型決定必填
  added_at          TIMESTAMP     DEFAULT now()
  added_by          UUID          FK → User.id
}
```

### 9.3 ProjectMember 資料表（新增，取代 OnboardingMember，v7.4）

每個被指派人員各一筆記錄：

```
ProjectMember {
  id                  UUID          PK
  project_id          UUID          NOT NULL, FK → Project.id
  department_id       UUID          NOT NULL, FK → Department.id（快照，不跟隨異動）
  department_type     ENUM          consulting | advertising | integrated | design
  role                ENUM          MPM | SPM
  user_id             UUID          NOT NULL, FK → User.id
  contribution_weight DECIMAL(5,4)  NOT NULL  -- 小數儲存，如 0.1000 = 10%
  assigned_from       DATE          NOT NULL  -- 負責起始日（預設 = 開案日；service_start_date 欄位已於 v9.7 從 Project 移除，改由各報價單各自記錄服務期間）
  assigned_to         DATE                    -- 負責結束日（NULL = 仍在任）
  notified_at         TIMESTAMP               -- 開案通知發送時間戳
  created_at          TIMESTAMP     DEFAULT now()
}
```

> 📋 **貢獻權重說明**：`contribution_weight` 使用 DECIMAL(5,4) 小數儲存。預設值：MPM → 0.1000（10%）、SPM → 0.5000（50%）。多人同職位時平均分攤（例：兩位 SPM 各得 0.2500）。PD 的貢獻權重（0.2500）儲存於 `Project.pd_contribution_weight`（固定值，不另建 ProjectMember 記錄）。

> 📋 **department_id 快照**：建立 ProjectMember 時，系統依人員的有效 Appointment 自動填入 department_id，快照後不跟隨後續部門異動，確保歷史績效計算以記錄當下部門歸屬為準。

### 9.4 Service 資料表

```
Service {
  id                UUID          PK
  project_id        UUID          NOT NULL, FK → Project.id
  quote_id          UUID          NOT NULL, FK → Quote.id
  service_name      VARCHAR(200)  NOT NULL
  service_category  VARCHAR(100)
  department_type   ENUM          consulting | advertising | integrated | design | NULL
  billing_type      ENUM          monthly_prepaid | monthly_billing | ad_billing |
                                  storage | standalone
  amount            DECIMAL                 -- 未稅金額（可 NULL）
  exec_bonus_ratio  DECIMAL(5,4)  NULL      -- 廣告執行獎金比例
  status            ENUM          active | completed  DEFAULT active
  completed_at      TIMESTAMP               -- 結案時自動填入
  notes             TEXT
  created_at        TIMESTAMP     DEFAULT now()
  updated_at        TIMESTAMP
}
```

### 9.5 ProjectMarketingDoc 資料表（新增，v7.4 營銷計畫表）

```
ProjectMarketingDoc {
  id            UUID          PK
  project_id    UUID          NOT NULL, FK → Project.id
  doc_name      VARCHAR(200)  NOT NULL      -- 文件名稱
  doc_type      ENUM          link | upload -- 外部連結 or 上傳文件
  link_url      VARCHAR(2000)               -- doc_type = link 時填入
  file_url      VARCHAR(2000)               -- doc_type = upload 時填入（存 S3 路徑）
  file_size_kb  INT                         -- 上傳文件大小（KB）
  notes         TEXT                        -- 備注（選填）
  added_by      UUID          FK → User.id
  added_at      TIMESTAMP     DEFAULT now()
}
```

### 9.6 ProjectExternalLink 資料表（保留，外部連結）

```
ProjectExternalLink {
  id          UUID          PK
  project_id  UUID          NOT NULL, FK → Project.id
  link_name   VARCHAR(200)  NOT NULL
  link_url    VARCHAR(2000) NOT NULL
  link_type   ENUM          google_docs | google_sheets | google_drive | other
  added_by    UUID          FK → User.id
  added_at    TIMESTAMP     DEFAULT now()
}
```

### 9.7 ProjectVendor 資料表（v8.3 廢止）

> ⚠️ **v8.3 廢止說明**：`ProjectVendor` 原為輕量委外廠商標記設計（僅 `project_id` + `vendor_id` + 合作範圍說明，無金額與審核流程），但缺乏對應的 UI 操作入口。REQ-0042「廠商採購」（`VendorQuote`）已完整覆蓋專案與廠商的關聯需求（含 `project_id`、`service_id`、廠商選取、報價金額、審核流程），故正式廢止 `ProjectVendor`，專案與廠商的關聯統一改由 `VendorQuote` 表達。`service_scope`（合作範圍說明）的資訊需求併入 `VendorQuote.purchase_title` 或備註欄位填寫。本節保留為歷史紀錄，不再作為開發規格。

```
ProjectVendor {  -- ⚠️ 已廢止（v8.3），不建立此資料表
  id               UUID          PK
  project_id       UUID          NOT NULL, FK → Project.id
  vendor_id        UUID                    FK → Vendor.id（P1）
  vendor_name_temp VARCHAR(200)            -- MVP 暫存文字（P1 後廢棄）
  service_scope    TEXT
  associated_at    TIMESTAMP     DEFAULT now()
  associated_by    UUID          FK → User.id
}
```

### 9.8 實體關係

```
Brand    ──1:N──→ Project
Project  ──1:N──→ ProjectTeamDepartment（參與部門）
Project  ──1:N──→ ProjectMember（服務團隊成員）
Project  ──1:N──→ Service（服務項目）
Project  ──1:N──→ ProjectMarketingDoc（營銷計畫表）
Project  ──1:N──→ ProjectExternalLink（外部連結）
Project  ──1:N──→ VendorQuote（廠商採購，見 REQ-0042；v8.3 取代 ProjectVendor）
Project  ──1:N──→ Quote（via Quote.project_id）
Quote    ──1:N──→ Service（via Service.quote_id）
```

---

## 10. 專案詳情頁（Tab 結構）

```
專案詳情頁
├── 頁首：專案名稱、類型 badge、狀態 badge
│         操作按鈕：[調整人員] [申請結案]（依角色與狀態顯示）
│
├── Tab 1：專案資訊
│   ├── 基本資訊：品牌、客戶、類型、服務期間
│   ├── PD：姓名、部門
│   └── 服務團隊：
│       各部門（operating / advertising / integrated / design）
│       └── MPM：姓名、在任期間
│           SPM：姓名（可複數）、在任期間
│
├── Tab 2：服務項目
│   ├── 篩選器（服務類別 / 來源報價單 / 狀態）
│   ├── 合併服務清單（每列可展開看各報價單明細）
│   └── 累計金額小計
│
├── Tab 3：營銷計畫表
│   ├── 文件 / 連結清單（名稱、類型、新增者、日期）
│   ├── [新增連結]（貼入 URL）
│   └── [上傳文件]（PDF / 圖片，≤ 10MB）
│
├── Tab 4：報價單列表
│   └── 所有關聯本專案的報價單（首次 + 追加）
│       欄位：報價單編號、日期、金額、狀態
│
├── Tab 5：合約列表
│   └── 同品牌且明確關聯本專案的合約
│       欄位：合約編號、起始日、截止日、狀態
│
├── Tab 6：廠商採購（REQ-0042）
│   ├── 篩選器（狀態 / 服務項目 / 廠商）
│   ├── 本專案所有採購申請清單
│   │   欄位：採購標題、廠商、核定金額、狀態、建立日期
│   └── [+ 新增採購申請]（PM / Manager / Admin）
│       發起時可選擇歸屬服務項目（選填，跨服務採購可留空）
│
└── Tab 7：知識庫（P2，REQ-0045）
    ├── 專案 wiki 文章列表（草稿 / 已發布 / 已取消發布）
    └── [+ 新增文章]（所有角色均顯示）
```

---

## 11. API 介面設計（草稿）

### 11.1 建立專案

```
POST /api/v1/projects

Request Body:
{
  "brand_id": "uuid",
  "project_name": "老撈麻辣鍋 2026 顧問服務",
  "project_type": "annual",
  "quote_ids": ["uuid-1", "uuid-2"],  // 開案時選定的報價單（至少一張，均設 is_primary = true）
  "pd_user_id": "uuid",
  "team_departments": [
    {
      "department_id": "uuid",  // 電商營運一部
      "department_type": "consulting"
    },
    {
      "department_id": "uuid",  // 數位廣告一部
      "department_type": "advertising"
    }
  ],
  "team_members": [
    { "user_id": "uuid", "department_id": "uuid", "role": "MPM" },
    { "user_id": "uuid", "department_id": "uuid", "role": "SPM" },
    { "user_id": "uuid", "department_id": "uuid", "role": "MPM" }
  ]
}

Response 201:
{
  "project_id": "uuid",
  "project_name": "老撈麻辣鍋 2026 顧問服務",
  "status": "active",
  "quotes_linked": 2,        // 成功掛入的報價單數量
  "notified_members": 3
}
```

> 📋 **驗證規則**：`quote_ids` 中每張報價單須通過 §4.1 Step 2 可選條件（品牌一致、已審核通過、已回簽、尚未掛入其他專案）；任一不符則整筆建立請求回傳 422。

### 11.2 掛入追加報價單（含新類型補填）

```
POST /api/v1/projects/{project_id}/attach-quote

Request Body（同類型追加）:
{ "quote_id": "uuid" }

Request Body（新類型追加，需補填部門）:
{
  "quote_id": "uuid",
  "new_department": {
    "department_id": "uuid",
    "department_type": "integrated",
    "members": [
      { "user_id": "uuid", "role": "MPM" },
      { "user_id": "uuid", "role": "SPM" }
    ]
  }
}

Response 200:
{
  "services_added": 2,
  "new_department_added": true
}
```

### 11.3 申請結案

```
POST /api/v1/projects/{project_id}/close

Request Body:
{
  "close_reason": "contract_expired",
  "close_reason_notes": null
}

Response 200:
{ "status": "closed" }
```

### 11.4 調整人員

```
POST /api/v1/projects/{project_id}/adjust-member

Request Body:
{
  "outgoing_member_id": "uuid",  // 舊 ProjectMember.id
  "handover_date": "2026-07-01",
  "incoming_user_id": "uuid",
  "notes": "MPM 職務異動"
}
```

### 11.5 新增營銷計畫表文件

```
POST /api/v1/projects/{project_id}/marketing-docs

Request Body（連結）:
{
  "doc_name": "2026 Q3 整合行銷計畫",
  "doc_type": "link",
  "link_url": "https://docs.google.com/..."
}

Request Body（上傳）:
{
  "doc_name": "提案簡報 v2",
  "doc_type": "upload",
  "file_url": "https://s3.../proposal_v2.pdf",
  "file_size_kb": 2048
}
```

---

## 12. 驗收標準

### REQ-0040

**AC-040-001：建立專案入口與報價單可選條件**
```gherkin
Given Manager 進入專案列表頁
When 點擊右上角「＋ 建立專案」
Then 系統開啟建立專案表單，Step 1 顯示品牌選擇、專案名稱、專案類型欄位

Given Step 1 選定品牌「老撈麻辣鍋」，進入 Step 2
When 系統載入可選報價單清單
Then 清單僅顯示：brand_id 符合、status = approved、signed_file_url IS NOT NULL、project_id IS NULL 的報價單
And 不符合上述任一條件的報價單不出現在清單中

Given Step 2 選定報價單 QT-001（顧問服務費）和 QT-002（廣告費）
When 進入 Step 3
Then 系統顯示各報價單的服務期間與費用類型（分開列示，不合併）
And 頁面提示「Step 4 必填部門：運營型部門、廣告型部門」（費用類型聯集）

Given Step 2 選定多張報價單後建立專案成功
Then 所有選定報價單的 Quote.project_id 更新為新建 Project.id
And 所有選定報價單的 Quote.is_primary 設為 true
```

**AC-040-002：部門類型必填判斷**
```gherkin
Given 報價單明細包含「電商陪跑顧問（顧問服務類）」和「META 廣告代操（廣告投放類）」
When 建立專案表單載入
Then 系統顯示「運營型部門」必填、「廣告型部門」必填
And 操作者需分別為兩個部門類型選擇對應的實際部門才可送出
```

**AC-040-003：MPM/SPM 跨部門限制**
```gherkin
Given 廣告型部門已選「數位廣告一部」
When 操作者在廣告 MPM 欄位搜尋人員
Then 搜尋結果只顯示數位廣告一部的有效成員（Appointment 有效）
And 不顯示其他部門的人員
```

**AC-040-004：人員異動至少一人在任**
```gherkin
Given 廣告部 MPM 目前只有 A 一人，assigned_to = NULL
When Manager 嘗試將 A 的 assigned_to 設為今日（讓職位空缺）
Then 系統阻擋：「廣告部 MPM 職位至少需有一人在任，請先指派繼任者再卸任前任」
```

**AC-040-005：結案流程**
```gherkin
Given Project.status = active
When Admin / Executive / Manager 點擊「申請結案」，選擇結案原因「合約到期未續約」，通過不可逆警告彈窗確認
Then Project.status → closed
And 所有 active Service.status → completed（Service.completed_at = closed_at）
And 記錄 closed_at / closed_by / close_reason = contract_expired
And 系統通知各部門主管與 ROLE_FINANCE
```

**AC-040-006：財務違約結案不影響 AR 追收**
```gherkin
Given 結案原因 = financial_default
And 存在 3 筆 ARRecord.is_overdue = true（逾期旗標，非獨立狀態值）
When 結案完成（Project.status = closed）
Then 3 筆 ARRecord 的 is_overdue 旗標維持 true，不因結案而清零
And ARRecord.status 維持原有進行中狀態（不自動變更）
And Finance 仍可在 AR 模組看到並操作這 3 筆逾期應收帳款
```

### REQ-0041

**AC-041-001：服務項目合併顯示**
```gherkin
Given 首次報價 QT-001 含「電商陪跑顧問 $50,000」
And 追加報價 QT-002 含「電商陪跑顧問 $30,000」（服務名稱相同）
When PM 查看服務項目 Tab
Then 顯示一列「電商陪跑顧問｜累計 $80,000｜2 張報價單」
And 點擊展開可看到 QT-001 $50,000 和 QT-002 $30,000 的明細
```

**AC-041-002：追加報價新增類型補填**
```gherkin
Given 專案目前只有 consulting 部門（電商營運一部）
And 追加報價 QT-003 含有整合行銷費（新增 integrated 類型）
When 點擊「掛入專案」
Then 系統偵測到 integrated 部門類型尚未指派
And 系統強制要求選擇整合行銷部門 + 指派 MPM/SPM 後才可完成掛入
```

**AC-041-003：營銷計畫表新增連結**
```gherkin
Given PM 在 Tab 3 營銷計畫表點擊「新增連結」
When 填入名稱「2026 Q3 計畫書」和 Google Docs URL 並確認
Then 連結出現在計畫表清單，顯示名稱、類型（連結）、新增者、日期
And 點擊連結在新分頁開啟對應 URL
```

**AC-041-004：廠商採購 Tab 雙入口資料一致性（v8.1 新增）**
```gherkin
Given PM 在專案 A 詳情頁「廠商採購」Tab 點擊「新增採購申請」
When 填寫採購說明、選擇廠商、上傳報價 PDF 並送審
Then 系統建立一筆 VendorQuote（project_id = 專案 A.id）
And 此筆採購申請同時出現在 REQ-0042 廠商採購成本管理的全公司列表中

Given Manager 在 REQ-0042 獨立入口建立採購申請，手動選擇歸屬專案為專案 B
When 送審並核准
Then 此筆採購申請出現在專案 B 詳情頁「廠商採購」Tab 中
And 不出現在其他專案的「廠商採購」Tab
```

---

## 13. 待確認事項

| 編號 | 類型 | 問題 | 負責人 | 狀態 |
|------|------|------|--------|------|
| T-11 | 技術確認 | 合約到期提醒通知對象「專案負責部門主管」的查找邏輯：從 `ProjectTeamDepartment` 查詢各部門的 head Appointment，v7.4 已有資料結構支撐 | 後端工程師 | ✅ resolved（v7.4）：查詢 `ProjectTeamDepartment → department_id → Appointment WHERE position_level = head AND effective_to IS NULL` |
| B-36 | 業務決策 | 多人同職位時貢獻權重：平均分攤 vs. 手動指定 | — | `open`（延續，SA 建議平均分攤） |
| T-12 | 技術確認 | 營銷計畫表「上傳文件」的儲存方案（S3 / GCS）與單檔大小上限（建議 ≤ 10MB） | 後端工程師 | `open` |

---

## 14. 與其他 REQ 的關係

```
REQ-0006（組織架構）
  └─ Department.department_type 由此模組設定，為本 REQ 必要前提

REQ-0010（客戶主檔）
  └─ 提供 Brand / Customer 資料

REQ-0021（報價單）
  └─ 觸發建立專案；掛載至 Project；提供 Service 初始資料

REQ-0030（工作流引擎）
  └─ ⚠️ 受 v7.4 影響：結案通知對象查找邏輯從 OnboardingMember 改為
     ProjectTeamDepartment → department_id → head Appointment；待同步更新

REQ-0040 / REQ-0041（本文件）
  ├─→ REQ-0011（廠商名錄，P1）：VendorQuote 選定廠商來源於此（vendor_id FK）
  ├─→ REQ-0042（廠商採購成本管理，P1）：⚠️ v8.1 新增：REQ-0041 Tab 6「廠商採購」
  │   與 REQ-0042 共用同一張 VendorQuote 資料表（project_id 必填、service_id 選填）；
  │   可由專案詳情頁或 REQ-0042 獨立入口雙向發起與查看
  ├─→ REQ-0050（AR/AP）：Service.billing_type 決定收款節奏
  ├─→ REQ-0051（全成本）：Service.amount 作為收款基礎
  ├─→ REQ-0052（獎金分配引擎）：⚠️ 受 v7.4 影響：貢獻權重來源從
  │   OnboardingMember 改為 ProjectMember，欄位結構一致；待同步更新
```

---

## 待決策事項（Open Issues）

| 編號 | 類型 | 問題 | 影響範圍 | 狀態 |
|------|------|------|---------|------|
| B-58 | 業務決策 | 已結案專案（`closed`）的回朔機制：觸發條件（誰可申請？需要主管審核？）、回朔後狀態（回到 `active` 或新增 `reopened` 狀態？）、回朔後 Service 狀態如何處理？ | `Project.status`、結案流程、Service.status | `open` |

---

*— REQ-0040（專案建立）/ REQ-0041（專案執行）規格文件結束（v7.4）—*

---


# §9b｜REQ-0044 服務項目管理

| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0044 |
| **功能名稱** | 服務項目管理 |
| **所屬模組** | F-04 專案執行層 |
| **優先級** | `P0` |
| **狀態** | `open` — v5.11 新增 |
| **最後更新** | 2026-06-12 |
| **依賴關係** | REQ-0001（RBAC）、REQ-0003（稽核日誌）；被 REQ-0021（報價單）讀取服務選單 |

---

## 1. 背景與設計動機

原服務項目目錄（S-02）隸屬於 REQ-0002 系統設定後台，僅 Admin 可操作，且入口藏於系統設定頁面。（v7.1 更新：ROLE_EXECUTIVE 已取得等同 Admin 的操作權限）

業務需求調整：服務項目目錄是日常業務工作的高頻操作（新增服務品項、調整報價說明），應作為一個對所有角色開放的獨立功能模組，在導覽列「專案區塊」直接存取。破壞性操作（停用、刪除）仍保留 Admin 專屬。

---

## 2. 功能描述

> 系統應提供獨立的服務項目管理頁面，讓所有角色均可新增或修改服務大類與服務項目；服務項目變更立即反映在報價單編輯器的服務選單中；停用與刪除操作限 Admin 執行；所有異動自動寫入稽核日誌。

---

## 3. 資料結構

**兩層架構：**

```
服務大類（ServiceCategory）
  └── 服務項目（ServiceItem）
```

### 3.1 服務大類欄位

| 欄位 | 必填 | 說明 |
|------|------|------|
| 大類名稱 | 是 | 例：顧問服務、數位廣告、社群、口碑媒體、視覺設計、影音製作、商品攝影 |
| 排序 | 是 | 在報價單選單與管理頁面中的顯示順序（拖曳排序） |
| 是否啟用 | 是 | 停用後該大類下所有項目不顯示於報價單選單；僅 Admin 可停用 |

### 3.2 服務項目欄位

| 欄位 | 必填 | 說明 |
|------|------|------|
| 所屬大類 | 是 | 從大類清單選擇 |
| 項目名稱 | 是 | 例：META 廣告代操、社群圖文代操（10 篇） |
| 預設計費單位 | 否 | 月 / 一式 / 張 / 支 / 位 / 次（報價單可覆寫） |
| 參考報價區間 | 否 | 僅供業務人員參考，文字欄位（例：「15%～20% + 掛稿 4%」） |
| 說明範本 | 否 | 選擇此項目時自動填入報價單「服務說明」欄位的預設文字（可在報價單修改） |
| 是否啟用 | 是 | 停用後不顯示於報價單選單；已在舊報價單中的項目不受影響；僅 Admin 可停用 |

---

## 4. RBAC 權限矩陣

| 操作 | Admin | Executive | Manager | PM/PD | Finance |
|------|-------|-----------|---------|-------|---------|
| 查看服務大類與項目列表 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 新增服務大類 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 修改服務大類名稱 / 排序 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 停用 / 啟用服務大類 | ✅ | ✅ | ❌ | ❌ | ❌ |
| 新增服務項目 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 修改服務項目欄位 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 停用 / 啟用服務項目 | ✅ | ✅ | ❌ | ❌ | ❌ |
| 刪除服務大類 / 項目（軟刪除） | ✅ | ✅ | ❌ | ❌ | ❌ |

> ⚠️ **業務規則（BR-044-01）**：停用服務項目不影響已建立的報價單；停用的項目僅在新報價單的選單中隱藏，不可被選取。
>
> ⚠️ **業務規則（BR-044-02）**：停用服務大類後，該大類下所有項目一律在報價單選單中隱藏，無論個別項目的啟用狀態。

---

## 5. 生效規則

| 操作類型 | 生效時機 |
|----------|---------|
| 新增服務大類 / 項目 | 立即生效（下次開啟報價單編輯器即反映） |
| 修改名稱 / 說明範本 / 計費單位 | 立即生效 |
| 停用大類或項目 | 立即生效（現有已儲存的報價單不受影響） |

---

## 6. 資料模型

```
ServiceCategory {
  id            UUID          PK
  name          VARCHAR(100)  NOT NULL
  sort_order    INT           NOT NULL
  is_active     BOOLEAN       DEFAULT true
  created_by    UUID          NOT NULL, FK → User.id
  created_at    TIMESTAMP     DEFAULT now()
  updated_at    TIMESTAMP
}

ServiceItem {
  id                    UUID          PK
  category_id           UUID          NOT NULL, FK → ServiceCategory.id
  name                  VARCHAR(200)  NOT NULL
  default_unit          VARCHAR(20)             -- 預設計費單位
  reference_price       VARCHAR(200)            -- 參考報價（文字，不做計算）
  description_template  TEXT                    -- 服務說明預設文字
  sort_order            INT           NOT NULL
  is_active             BOOLEAN       DEFAULT true
  created_by            UUID          NOT NULL, FK → User.id
  created_at            TIMESTAMP     DEFAULT now()
  updated_at            TIMESTAMP
}
```

**預設資料（來源：2026 服務報價準則，系統上線時預載）：**

已在 PRD 附錄 A 完整列出，系統上線時批次匯入。

---

## 7. API 介面設計（草稿）

### 7.1 取得服務大類與項目清單（所有角色可呼叫）

```
GET /api/v1/service-catalog?active_only=true

Response 200:
{
  "categories": [
    {
      "id": "uuid",
      "name": "數位廣告",
      "sort_order": 1,
      "is_active": true,
      "items": [
        {
          "id": "uuid",
          "name": "META 廣告代操",
          "default_unit": "月",
          "reference_price": "15%～20% + 掛稿 4%",
          "description_template": "...",
          "is_active": true
        }
      ]
    }
  ]
}
```

### 7.2 新增服務大類（所有角色）

```
POST /api/v1/service-catalog/categories

Request Body:
{
  "name": "直播服務",
  "sort_order": 8
}

Response 201:
{
  "id": "uuid",
  "name": "直播服務",
  "is_active": true
}
```

### 7.3 新增服務項目（所有角色）

```
POST /api/v1/service-catalog/items

Request Body:
{
  "category_id": "uuid",
  "name": "TikTok 廣告代操",
  "default_unit": "月",
  "reference_price": "投放金額 15%～20%",
  "description_template": "1. 廣告帳號設定\n2. 廣告素材建議\n3. 每月成效報告",
  "sort_order": 4
}

Response 201:
{
  "item_id": "uuid",
  "name": "TikTok 廣告代操",
  "is_active": true
}
```

### 7.4 停用服務項目（Admin only）

```
PATCH /api/v1/service-catalog/items/{id}/deactivate

Response 200:
{
  "id": "uuid",
  "is_active": false
}
```

> ⚠️ 非 Admin 呼叫此端點回傳 `403 Forbidden`。

---

## 8. UI 規格

### 8.1 頁面入口

- 導覽列位置：**專案區塊 → 服務項目管理**
- 所有角色登入後均可在導覽列見到此項目

### 8.2 頁面佈局

```
服務項目管理
  [+ 新增大類]                        ← 所有角色可操作

  ▾ 數位廣告   [編輯]  [停用]         ← [停用] 僅 Admin 可見
    META 廣告代操   月  15%～20%+掛稿4%  [編輯] [停用]
    Google 廣告代操 月  15%～20%+掛稿4%  [編輯] [停用]
    TikTok 廣告代操 月  15%～20%         [編輯] [停用]
    [+ 新增項目]                      ← 所有角色可操作

  ▾ 顧問服務   [編輯]  [停用]
    電商網站建置顧問 一式  8～20萬/次    [編輯] [停用]
    電商陪跑顧問     月    2～8萬+超額%  [編輯] [停用]
    [+ 新增項目]
```

> 📋 **權限呈現規則**：[停用] 按鈕對非 Admin 角色不顯示（非灰階，而是完全隱藏），避免產生困惑。

---

## 9. 驗收標準

### AC-044-01：所有角色可新增服務項目

```gherkin
Given PM 用戶「王小明」已登入
When 王小明在「服務項目管理」頁點擊「+ 新增項目」並填入必要欄位
Then 系統成功儲存新服務項目
And 下次開啟報價單編輯器時，新項目出現在對應大類的選單中
And 稽核日誌記錄「王小明新增服務項目：xxx」
```

### AC-044-02：非 Admin 無法停用服務項目

```gherkin
Given PM 用戶「白菜」已登入
When 白菜嘗試停用服務項目
Then 頁面不顯示「停用」按鈕
And 直接呼叫 PATCH /api/v1/service-catalog/items/{id}/deactivate 回傳 403
```

### AC-044-03：Admin 停用大類後，該大類項目從報價單選單消失

```gherkin
Given Admin 將「口碑媒體」大類停用
When 白菜開啟報價單編輯器的服務選單
Then「口碑媒體」大類及其下所有項目均不顯示
And 已使用口碑媒體項目的既有報價單內容不受影響
```

### AC-044-04：所有角色可在導覽列存取服務項目管理

```gherkin
Given Finance 用戶「陳美玲」已登入
When 陳美玲查看導覽列「專案區塊」
Then 顯示「服務項目管理」選項
And 點擊後可進入服務項目管理頁面
```

---

## 10. 與其他 REQ 的關係

```
REQ-0001（使用者管理）
  └─ RBAC：停用 / 刪除操作限 Admin

REQ-0002（系統設定）
  └─ S-02 已遷移至本 REQ；REQ-0002 S-02 索引保留

REQ-0003（稽核日誌）
  └─ 所有新增 / 修改 / 停用操作自動寫入

REQ-0044（服務項目管理）← 本文件
  └─→ REQ-0021（報價單）：報價單服務選單讀取本 REQ 的 ServiceItem 清單
```

---

*— REQ-0044 規格文件結束 —*

---



> 📋 **合併說明**：REQ-0050（對帳）與 REQ-0051（全成本試算）共用相同的財務資料，合併為同一份文件。

| 欄位 | REQ-0050 | REQ-0051 |
|------|----------|----------|
| **REQ-ID** | REQ-0050 | REQ-0051 |
| **Use Case ID** | UC-050 | UC-051 |
| **PRD 章節** | 5.6.1 | 5.6.2 |
| **所屬模組** | F-05 Core 5 財務計算層 | F-05 Core 5 財務計算層 |
| **優先級** | `P0` | `P0` |
| **狀態** | `open` — v1.2，依財務文件大幅修訂 | `open` — v1.2 |
| **最後更新** | 2026-06-30（v8.0：審核操作改嵌入 AR 請款單詳情頁，INVOICE_APPROVAL 並行兩層審核進度顯示） | 2026-05-11 |
| **依賴關係** | REQ-0001、REQ-0010、REQ-0021、REQ-0022、REQ-0030（新增 INVOICE_APPROVAL 工作流） | REQ-0050、REQ-0040、REQ-0042（P1） |

---

## 1. 背景與設計動機

現況：AR 請款單靠 Google Sheets 人工製作（每月 2 日啟動）、AP 廠商匯款各 PM 自行追蹤、毛利率靠 Excel 手算；代收代付與服務費混雜導致毛利計算失真，請款需多層審核（財務經理 + 部門主管）但現行無流程支撐。目的：REQ-0050 依 billing_type 自動生成月度 AR/AP 清單，請款走 INVOICE_APPROVAL 工作流，ECPay 電子發票於 client_confirmed 後自動觸發；REQ-0051 以純服務費計算全成本毛利率，低於門檻時警示。

---

## 2. 功能描述

**REQ-0050：** 系統應依付款方式自動生成每月應收（AR）對帳列表，區分**服務費收入（應收帳款）**與**廣告代收代付（代收款項）**兩種交易類型；請款單需經多層審核；客戶確認後觸發電子發票開立；確認收款後完成對帳閉環。

**REQ-0051：** 系統應依**服務費收入**（排除代收代付）計算每個專案的全成本毛利率，並在低於門檻時自動警示。

> ⏳ **B-09 postponed**：員工費率計算基準延後決策；P0 內部成本欄位由財務人工填入（`ProjectCostRecord`）。

---

## 3. 收費方式與交易類型定義

### 3.1 四種收費方式（來源：主合約第四條）

| 收費方式 | 適用服務 | 請款日 | 匯款截止日 | AR 生成邏輯 |
|----------|----------|--------|-----------|------------|
| **月預收制** | 行銷顧問服務、社群內容行銷 | 每月 5 日 | **當月 10 日** | 每月 2 日 Cron Job 自動生成 |
| **月結制** | 廣告投放服務費、達標獎金 | 每月 5 日（結算上月） | **當月 20 日** | 每月 2 日 Cron Job 自動生成（金額需廣告結算確認） |
| **儲值制** | 廣告投放（預儲） | 儲值金不足時主動請款 | 匯款後開始投放 | 手動建立，不自動生成 |
| **單獨報價** | 口碑行銷、素材製作、整合行銷 | 依報價委任單約定 | 依報價單約定 | 手動建立，不自動生成 |

> ⚠️ **截止日修正（v1.2）**：月結制廣告費截止日為當月 **20 日**，非 10 日。月預收制為當月 **10 日**。系統需依 `billing_type` 動態計算 `due_date`，不可使用固定值。
>
> 📋 **v10.0 補充：`payment_method` 與 `billing_type` 的職責區分**：兩者均描述收費方式但層次不同。`Quote.payment_method`（REQ-0021）為報價單頭部欄位，決定條款第 2 點顯示的付款說明段落，屬於**合約文件層**，值域為月預收制 / 月結制 / 儲值制 / 其他。`Service.billing_type`（REQ-0040）為專案服務項目層欄位，決定 AR 自動生成節奏與帳務邏輯，屬於**帳務執行層**，值域為 monthly_prepaid / monthly_billing / ad_billing / storage / standalone。兩者獨立設定，不互相覆蓋。

> 📋 **`billing_type` 語意說明（v5.1 補充）**：`monthly_billing`（廣告代操服務費）與 `ad_billing`（廣告儲值代收）為不同計費邏輯，不可混用。`monthly_billing` 生成 `transaction_type = revenue` 的 ARRecord（金額每月結算後填入）；`ad_billing` 生成 `transaction_type = passthrough` 的 ARRecord（代收儲值金，不計入服務費毛利）。Cron Job 自動生成時僅處理 `monthly_prepaid` 與 `monthly_billing` 兩種，`ad_billing` / `storage` / `standalone` 均為手動建立。

### 3.2 兩種交易類型（v1.2 核心新增）

每筆 ARRecord 必須標記交易類型，這是毛利計算正確性的關鍵：

| 交易類型 | 會計科目 | 定義 | 計入毛利 | 範例 |
|---------|---------|------|---------|------|
| **`revenue`（應收帳款）** | 4111 顧問服務收入<br>4112 數位廣告收入<br>4113 整合行銷收入 | 昊揚的服務費收入，計入財報損益 | ✅ 是 | 顧問服務費、META 代操服務費、口碑行銷服務費、掛稿服務費（昊揚） |
| **`passthrough`（代收代付）** | 2012 廣告預算代收款<br>2013 整合行銷代收款 | 代客戶墊付廣告預算再收回，非昊揚收入 | ❌ 否 | META 廣告儲值金、Google 廣告儲值金、掛稿服務費（浩騰，代收） |

> ⚠️ 代收代付款項雖也在 AR 列表顯示（財務需追蹤是否有對應 AP），但計算毛利時必須排除。兩種類型通常伴隨同一筆客戶匯款出現（同一天可能有廣告預算 + 代操服務費），系統需支援同一客戶同日存在兩種類型的 ARRecord。

> 📋 **1105 其他應收款（暫定排除系統範圍）**：非營業產生的應收項目（如應收退稅款、員工借支等）暫定不納入本系統管理，由外部會計軟體處理。如未來需要納入，屆時新增獨立 ARRecord 類型或獨立模組處理。

---

## 4. AR（應收帳款）規格

### 4.1 例行 AR 自動生成流程（v1.2 修正）

```
每月 2 日  系統 Cron Job 執行：
    │
    ├── 讀取所有 Project.status = active
    │   且 Service.billing_type IN ('monthly_prepaid', 'monthly_billing') 的服務清單
    │   （觸發來源改為 Service，不以合約狀態為判斷依據，問題 1 修正）
    │
    ├── 對每筆 Service 建立 ARRecord：
    │       transaction_type = revenue
    │       service_month：
    │         monthly_prepaid → 當月（服務費預收）
    │         monthly_billing → 上月（結算上月廣告費）
    │       invoice_month = 當前月份（發票歸屬月）
    │       due_date：
    │         monthly_prepaid → 本月 10 日
    │         monthly_billing → 本月 20 日（廣告月結截止日！）
    │       amount_pretax：
    │         monthly_prepaid → Service.amount（固定月費，直接帶入）
    │         monthly_billing → null（等廣告費結算確認後填入，見 §10b REQ-0055）
    │       status = draft（初始態；Finance 確認資料無誤後點擊「送審」才進入 pending）
    │
    └── 發送通知給財務行政：
        「本月例行請款單已生成，顧問費 N 筆已帶入金額，廣告費 M 筆待填入結算數據」
```

### 4.2 廣告費月結金額確認流程

> 📋 **v9.4 重構說明**：`AdSpendRecord` 廣告花費填寫、確認流程及相關資料表、RBAC、API、UI 規格已獨立至 **REQ-0055 廣告花費管理（§10b）**。本節僅保留與 ARRecord 的接口說明。

**接口說明：** 每月 2 日 Cron Job 自動產生 `billing_type = monthly_billing` 的 ARRecord（`amount_pretax = null`）。PM/PD 透過「廣告花費管理」模組（REQ-0055）填寫並由 Finance 確認後，系統自動回寫 `ARRecord.amount_pretax`，ARRecord 狀態維持 `draft`，Finance 確認資料無誤後方可點擊「送審」進入請款審核流程（見 4.3）。

> 詳細流程、`AdSpendRecord` 資料表、RBAC 矩陣、API 規格、UI 規格請參見 **§10b REQ-0055**。

請款單生成後，需經多層內部審核才能提供客戶確認。此流程接入 REQ-0030 工作流引擎，使用 Workflow Type：`INVOICE_APPROVAL`。

```
ARRecord status = draft（Cron Job 自動生成 / Finance 手動建立的初始態）
    │
    ▼  Finance 確認資料無誤（月結廣告費需廣告結算完成後金額方可填入，見 §10b REQ-0055）
    │  點擊「送審」→ status = pending，觸發 INVOICE_APPROVAL 工作流
    │
    ▼
under_review（兩層審核進行中）
    ├── 第一層：任一 ROLE_MANAGER 審核通過
    └── 第一層通過後，第二層：另一位不同的 ROLE_MANAGER 審核通過
    │   （系統驗證兩次 approver_id 必須不同）
    │
    ├── 任一層退回 → pending（財務修改後重送）
    │
    ▼  兩層均審核通過
approved_internal
    │
    ▼  各部門客戶負責人將請款單提供給客戶確認
    │
    ├── 客戶要求修改 → pending（財務修改，重走審核）
    │
    ▼  客戶確認
client_confirmed → 觸發電子發票開立（見 4.5）
    │
    ▼  財務確認收款
confirmed
```

**INVOICE_APPROVAL 工作流定義：**

| Workflow Type | 中文名稱 | 來源 | 審核層數 | 通過後行為 |
|---------------|----------|------|---------|-----------|
| `INVOICE_APPROVAL` | 請款單審核 | REQ-0050 ARRecord | 兩層（均為 `is_general_manager = false` 的 ROLE_MANAGER，需不同人；✅ B-33 resolved） | status → `approved_internal` |

> ✅ **B-33 resolved（v5.4）**：WorkflowConfig 設定：`require_all = true`，審核通知發送給所有 `is_general_manager = false` 的 ROLE_MANAGER；第二層審核時系統驗證 `approver_id` 與第一層不同。

> ✅ **B-33 resolved（v5.4）**：兩層均為 `is_general_manager = false` 的 ROLE_MANAGER（部門主管），需不同人審核，總經理不介入。

> ✅ **v5.9 確認（ITEM-02）**：財務主管審核與執行部門主管審核**允許並行進行**，不強制序列等待。兩位審核者均完成確認後，請款單方可繼續流向 `client_confirmed` 狀態。系統實作：同一 WorkflowInstance 內兩個 WorkflowApproval 記錄同時建立並發送通知，任一審核者先完成不阻擋另一人；全部通過後系統自動推進狀態。

### 4.3b 審核操作區（v8.0 新增，嵌入 AR 請款單詳情頁）

> ⚠️ **v8.0 設計變更**：INVOICE_APPROVAL 審核不再透過獨立的審核詳情頁進行，而是直接嵌入 AR 請款單詳情頁。詳見 REQ-0030 §1 / §8.2 的整體設計說明。

**顯示條件**：ARRecord 狀態為 `under_review` **且** 登入者為該筆 WorkflowInstance 兩層審核者之一（依 S-05 設定的 `is_general_manager = false` ROLE_MANAGER 名單）。

**兩層並行審核的顯示規則**：INVOICE_APPROVAL 為兩層審核（`require_all = true`），與 QUOTE_APPROVAL / CONTRACT_MODIFY 的單層審核不同，審核操作區需明確呈現雙方進度：

```
┌──────────────────────────────────────────────────────┐
│  AR 請款單詳情頁（送審當下內容，唯讀）                   │
│  ── 客戶資訊 / 服務月份 / 金額明細 ──                   │
├──────────────────────────────────────────────────────┤
│  審核進度（兩層並行）                                  │
│  第一層（財務主管）：✅ 王經理 已核准（06/20 14:30）     │
│  第二層（部門主管）：⏳ 待審核                          │
├──────────────────────────────────────────────────────┤
│  審核操作區（僅尚未審核的指定審核者可見）                 │
│  備註（選填）：[________________]                       │
│  [核准]                  [退回（需填原因）]              │
└──────────────────────────────────────────────────────┘
```

**操作後行為**：

| 操作 | 系統行為 |
|------|----------|
| 任一層點擊「核准」 | 該層 WorkflowApproval 記錄為 approved；若另一層尚未審核，ARRecord 狀態維持 `under_review`，審核進度區更新已核准方資訊 |
| 兩層皆核准 | WorkflowInstance → `approved`；ARRecord 狀態 → `approved_internal`；通知財務可提供客戶確認；Inbox 雙方審核者的該筆項目移至「已核准」分頁 |
| 任一層點擊「退回」 | 彈出退回原因輸入框（必填）；ARRecord 狀態 → `pending`（無論另一層是否已核准，退回即整筆退回）；通知財務修改含退回原因；Inbox 該筆項目移至「已退回」分頁 |

> ⚠️ **業務規則**：兩層審核中若一層已核准、另一層退回，系統採**退回優先**：整筆 WorkflowInstance 視為 `rejected`，已核准方的審核記錄保留供稽核查閱，但不影響最終結果為退回。財務修改後重新送審，兩層審核需重新進行（不沿用前次已核准的那一層）。

**非審核者檢視**：若登入者不是該筆兩層審核者之一（例如 PM/PD、Sales），AR 請款單詳情頁不顯示審核操作區，僅顯示「審核中」狀態 badge 與兩層審核進度（唯讀）。

### 4.4 AR 記錄欄位規格（v1.2 全面修訂）

```
ARRecord {
  id                UUID          PK
  customer_id       UUID          NOT NULL, FK → Customer.id
  brand_id          UUID          FK → Brand.id
  project_id        UUID          FK → Project.id（例行必填，非例行選填）
  service_id        UUID          FK → Service.id（例行必填）
  quote_id          UUID          FK → Quote.id（非例行必填）

  -- 交易類型（v1.2 核心新增）
  transaction_type  ENUM          revenue | passthrough
                                  -- revenue：服務費收入，計入毛利
                                  -- passthrough：代收代付，不計入毛利

  -- 雙月份欄位（v1.2 新增，遺漏 7 修正）
  service_month     VARCHAR(7)    -- 服務歸屬月份（YYYY-MM）
                                  -- 此筆款項對應的服務期間，用於財報對應
  invoice_month     VARCHAR(7)    -- 發票月份（YYYY-MM）
                                  -- 電子發票開立的帳務月份，兩者可能不同

  ar_type           ENUM          routine | non_routine
  billing_type      ENUM          monthly_prepaid | monthly_billing | ad_billing | storage | standalone

  -- 金額
  amount_pretax     DECIMAL       -- 未稅金額（月結廣告費初始可為 null）
  tax_amount        DECIMAL       -- 稅額（= amount_pretax × 0.05）
  total_amount      DECIMAL       -- 含稅總計
  discount_amount   DECIMAL       DEFAULT 0
  discount_tax      DECIMAL       DEFAULT 0

  -- 截止日（依 billing_type 動態計算）
  due_date          DATE          -- monthly_prepaid → 當月 10 日
                                  -- monthly_billing → 當月 20 日
                                  -- 其他 → 手動填入

  invoice_note      TEXT          -- 請款備註（供客戶閱讀）

  -- 狀態（v1.2 擴充；v5.6 修正：overdue 改為旗標，不作為獨立狀態；v8.6 新增：draft 初始態）
  status            ENUM          draft | pending | under_review | approved_internal |
                                  client_confirmed | confirmed
                                  -- draft：初始態（Cron Job 自動生成 / Finance 手動建立）
                                  -- pending：Finance 送審後，INVOICE_APPROVAL 工作流啟動前

  -- 逾期旗標（v5.6 新增：取代原 overdue 狀態值）
  is_overdue        BOOLEAN       DEFAULT false
  overdue_at        TIMESTAMP     -- 第一次被標記為逾期的時間戳（歷史保留，不清除）
```

**ARRecord 完整狀態機（v5.6 修正；v8.6 更新：加入 draft 初始態）：**

```
draft（初始態）
  │  Cron Job 自動生成 → draft（Finance 確認資料無誤後送審）
  │  Finance 手動建立 → draft（填寫必填欄位後送審）
  │
  │  Finance 點擊「送審」（INVOICE_APPROVAL 工作流啟動）
  ▼
pending（待審核）
  │  Finance 送審，系統通知兩層審核者
  ▼
under_review（兩層並行審核進行中）
  │  任一層退回 → 回到 pending
  │  兩層均通過
  ▼
approved_internal
  │  客戶要求修改 → 回到 pending（重走審核）
  │  客戶確認
  ▼
client_confirmed ──→ 回簽上傳後 Finance 手動開立電子發票（✅ B-53 resolved：方案 B）
  │  Finance 確認收款
  ▼
confirmed（終態）

── draft / pending / under_review / approved_internal / client_confirmed 任一狀態，
   若 due_date < 今日 → is_overdue = true（旗標，不改 status）
── draft 狀態不在逾期掃描範圍內（請款單尚未正式對外，不應計為逾期）
```

> ⚠️ **業務規則（BR-050-01）— 逾期旗標觸發規則（v5.6 修正；v8.6 更新：排除 draft）**：每日 Cron Job 掃描所有 `status NOT IN ('draft', 'confirmed')` 且 `due_date < CURRENT_DATE` 且 `is_overdue = false` 的 ARRecord，將 `is_overdue` 更新為 `true`、記錄 `overdue_at` 時間戳，並發送逾期通知給 `ROLE_FINANCE` 和所有 `ROLE_MANAGER`。
>
> `is_overdue = true` **不影響 status 的流轉**——ARRecord 仍可繼續走完整審核流程直到 `confirmed`；`is_overdue` 歷史保留（不因後續收款而清除），供逾期率分析使用。
>
> **觸發範圍說明**：`status = draft`（草稿，請款單尚未正式對外）及 `status = confirmed`（已收款終態）不掃描；其餘所有進行中狀態（`pending | under_review | approved_internal | client_confirmed`）均在掃描範圍內——`client_confirmed` 階段（已開發票、等待客戶匯款）超過截止日未收款，同樣應標記逾期。

```

  -- 各階段時間戳
  submitted_at      TIMESTAMP
  approved_at       TIMESTAMP     -- 內部審核通過時間
  client_confirmed_at TIMESTAMP   -- 客戶確認時間（電子發票在此後開立）
  paid_at           TIMESTAMP
  paid_amount       DECIMAL       -- 實際收款金額
  payment_note      TEXT          -- 收款備註（如手續費差額說明）

  -- 客戶回簽（v5.9 新增）
  signed_invoice_attachment  TEXT NULL   -- 客戶回簽請款單掃描件檔案路徑（URL）
                                         -- 客戶確認後由負責人上傳；Finance 確認上傳完成後才可觸發電子發票開立
                                         -- 對應 ARRecord.status = client_confirmed 前置動作

  created_by        UUID          FK → User.id
  created_at        TIMESTAMP
  updated_at        TIMESTAMP
}
```

### 4.5 電子發票觸發時機（衝突 3 修正）

✅ **B-53 resolved（v5.6）**：電子發票觸發方式確認為**方案 B（Finance 手動開立）**。

**客戶確認流程（v5.9 補充）**：

```
客戶確認請款金額無誤
  → 負責人上傳客戶回簽請款單（ARRecord.signed_invoice_attachment）
  → Finance 確認回簽件已上傳（頁面顯示附件預覽）
  → Finance 點擊「開立電子發票」按鈕（signed_invoice_attachment IS NOT NULL 才解鎖）
  → 系統呼叫 ECPay API 開立電子發票
  → 系統建立 ARInvoice 記錄（留存發票號碼 / 日期 / 金額供會計系統導入）
  → ARRecord.status → client_confirmed
  → Finance 後續確認客戶匯款後 → status → confirmed
```

**觸發時機**：ARRecord 的**客戶回簽掃描件上傳完成後**（`signed_invoice_attachment IS NOT NULL`），Finance 請款單頁面解鎖「開立電子發票」按鈕；Finance 點擊後系統呼叫 ECPay API 開立發票，並要求填寫發票資訊以利後續會計系統導入。

```
ARRecord 進入 client_confirmed（客戶確認請款單）
    │
    └── Finance 在請款單頁面點擊「開立電子發票」
         ├── 系統呼叫 ECPay API 開立電子發票
         ├── 自動傳送電子發票至客戶 invoice_email
         └── 建立 ARInvoice 子表記錄（見 §4.6）
              ├── 發票號碼（ECPay 回傳）
              ├── 發票類型（三聯式 / 二聯式）
              ├── 買受人統編（Customer.tax_id 或 Brand.tax_id）
              ├── 發票金額（未稅、稅額、含稅）
              ├── 開立時間戳
              └── 操作者（Finance user_id）
```

> ⚠️ **業務規則（BR-050-04）**：客戶回簽請款單尚未上傳（`signed_invoice_attachment IS NULL`）時，「開立電子發票」按鈕維持鎖定；回簽上傳後，且 ARRecord 狀態為 `client_confirmed` 時按鈕才解鎖。已開立發票後，按鈕改為「查看發票紀錄」。

> ⚠️ **衝突 3 設計說明（v1.2 修正 / v5.6 定案）**：電子發票開立時機從「確認收款後（confirmed）」改為「**客戶確認請款單後（client_confirmed）+ 回簽上傳後，由 Finance 手動觸發**」。依現行 SOP（311 例行請款流程）：客戶確認 → 財務開立發票 → 發票傳送給客戶 → 客戶收到發票後匯款。發票在收款前開立，以方案 B 手動觸發確保財務人員確認無誤後才開立。

### 4.6 ARInvoice 子表（差異 8 修正）

一筆 ARRecord 可對應多張電子發票：

```
ARInvoice {
  id                UUID          PK
  ar_record_id      UUID          NOT NULL, FK → ARRecord.id
  ecpay_invoice_no  VARCHAR(20)   NOT NULL  -- 綠界回傳發票號碼
  invoice_date      DATE          NOT NULL
  invoice_month     VARCHAR(7)    -- 發票年月（YYYY-MM）
  invoice_amount    DECIMAL       NOT NULL  -- 此張發票含稅金額
  invoice_type      VARCHAR(100)  -- 發票品項說明
  is_voided         BOOLEAN       DEFAULT false
  voided_at         TIMESTAMP
  voided_reason     TEXT
  created_at        TIMESTAMP     DEFAULT now()
}
```

> 📋 ARRecord 不再直接存 `ecpay_invoice_no` 欄位（舊設計已移除），全部由 ARInvoice 子表管理。

### 4.7 非例行 AR 手動建立規則（v5.1 補充）

儲值制（`storage`）與單獨報價（`standalone`）不由 Cron Job 自動生成，需由 Finance 或 Admin 手動建立。

**操作角色：** `ROLE_FINANCE`（主要）、`ROLE_ADMIN`。

**必填欄位：**

| 欄位 | 說明 |
|------|------|
| `customer_id` | 關聯客戶 |
| `brand_id` | 關聯品牌 |
| `transaction_type` | `revenue` 或 `passthrough` |
| `ar_type` | 固定為 `non_routine` |
| `billing_type` | `storage` 或 `standalone` |
| `amount_pretax` | 未稅金額（手動填入） |
| `due_date` | 到期日（手動填入，無自動計算） |
| `invoice_note` | 請款說明（供客戶閱讀） |
| `quote_id` | `standalone` 類型必填，關聯來源報價單 |

**UI 入口：** AR 對帳列表頁右上角「手動新增 AR」按鈕，`ROLE_FINANCE` / `ROLE_ADMIN` 可見，`ROLE_MANAGER` 唯讀不可建立。

**API（草稿）：**

```
POST /api/v1/finance/ar
Request Body: { customer_id, brand_id, transaction_type, billing_type, amount_pretax, due_date, invoice_note, quote_id? }
Response 201: { ar_id, status: "draft", ... }
```

---

### 5.1 AP 費用類型範疇定義（遺漏 6）

依實際付款明細，明確定義 MVP 範疇：

| 費用大類 | 會計科目 | MVP 範疇 | 說明 |
|---------|---------|---------|------|
| **廠商服務費** | 5111/5112/5113 營業成本 | ✅ 納入 | KOL 費用、媒體採購、廠商服務費，對應 APRecord |
| **代收代付支出** | 2012/2013 代收款 | ✅ 納入 | 代付廣告儲值金給 META/Google，需與 AR 端配對追蹤 |
| **人事費用** | 6101 薪資、6102 勞健保、6103 退休金 | ❌ 範疇外 | 由會計師事務所處理 |
| **稅款** | 2107 扣繳稅額、2109 應付營業稅 | ❌ 範疇外 | 定期報稅，由會計師處理 |
| **行政費用** | 6201 租金、6302 交際費等 | ❌ 範疇外 | 公司運營費用 |
| **負債還款** | 2601 長期借款 | ❌ 範疇外 | 銀行貸款還款 |
| **個人代墊雜支** | — | ❌ **範疇外（v5.9 確認）** | 停車費、交通費等非專案直接成本，**維持紙本手寫與實體簽核，不納入本系統管理**。員工個人代墊款由公司內部另行協議處理，系統不追蹤 |

> ❓ **待業主確認（B-55）**：「代收代付支出」納入 MVP 是否符合預期？SA 建議納入，否則代收代付配對追蹤不完整（收了客戶廣告預算，但無法確認是否如實代付給廣告平台）。

### 5.2 AP 記錄欄位規格（v1.2 新增 ap_category）

```
APRecord {
  id                UUID          PK
  project_id        UUID          FK → Project.id（可 null）
  vendor_id         UUID          FK → Vendor.id
  vendor_quote_id   UUID          FK → VendorQuote.id（採購申請來源，可 null——passthrough_payment 無對應採購申請）

  -- 付款類型（v1.2 新增）
  ap_category       ENUM          vendor_cost | passthrough_payment
                                  -- vendor_cost：廠商服務費，計入外部成本
                                  -- passthrough_payment：代收代付支出，不計入成本

  vendor_type       ENUM          company | individual  -- vendor_cost 時填寫

  accounting_month  VARCHAR(7)    -- 帳務月份（YYYY-MM）
  ap_type           ENUM          routine | non_routine
  service_desc      TEXT          -- 付款說明（含客戶品牌、期數、服務內容）
  amount_pretax     DECIMAL
  tax_amount        DECIMAL
  total_amount      DECIMAL
  handling_fee      DECIMAL       DEFAULT 0  -- 匯款手續費（通常 NT$10）
  actual_paid       DECIMAL       -- 實際付款（= total + handling_fee）

  payment_due_date  DATE
  payment_method    VARCHAR(50)
  payment_bank      VARCHAR(100)  -- 例：一銀-大稻埕

  -- 個人廠商欄位
  labor_report_received BOOLEAN   DEFAULT false
  labor_report_note     TEXT

  -- 發票資訊（公司廠商）
  invoice_no        VARCHAR(20)
  invoice_date      DATE

  -- 代收代付配對（passthrough_payment 時填入）
  related_brand_id  UUID          FK → Brand.id
  related_ar_id     UUID          FK → ARRecord.id（對應的代收 AR 記錄）

  -- 代墊款 markup（v5.9 新增）
  is_advance_payment  BOOLEAN     DEFAULT false  -- 是否為代客戶墊付（場地費、派報費等）
  markup_rate         DECIMAL(5,4) NULL           -- 代墊加價率（如 0.0500 = 5% markup）；NULL = 無加價
  markup_amount       DECIMAL(12,2) NULL          -- 系統計算：amount_pretax × markup_rate；供全成本試算核查代墊毛利

  -- 廠商請款單附件（v5.9 新增）
  attachment_url    TEXT          NULL            -- 紙本請款單掃描件 / 廠商發票檔案路徑（PM/PD key 入時上傳）
                                                  -- Finance 比對系統資料與實體單據後確認付款

  -- 費用科目分類（v7.2 新增）
  cost_category     ENUM          social | word_of_mouth | material | other | NULL
                                  -- 僅 ap_category = 'vendor_cost' 時填寫（選填）
                                  -- social：社群內容行銷（社群代操、內容製作）
                                  -- word_of_mouth：口碑行銷（論壇口碑、KOL/KOC、部落客）
                                  -- material：素材製作（影音製作、平面素材、剪輯）
                                  -- other：其他費用（不屬於以上三類）
                                  -- NULL：passthrough_payment 或未分類時保留空值

  status            ENUM          pending | approved | rejected | paid
  paid_at           TIMESTAMP
  approved_by       UUID          FK → User.id
  rejected_by       UUID          FK → User.id（退回者）
  rejected_at       TIMESTAMP
  reject_reason     TEXT          退回原因（status = rejected 時必填）

  created_by        UUID          FK → User.id
  created_at        TIMESTAMP
  updated_at        TIMESTAMP
}
```

> ⚠️ **業務規則（BR-050-02）— 廠商 AP Key 入流程（v5.9 新增；v8.8 補充退回機制）**：所有廠商請款、委外發包均須納入系統管理。操作流程：
> 1. PM/PD（或 Finance）在 AP 付款詳情頁手動建立 APRecord，填寫請款事由、金額、廠商、科目，可上傳紙本請款單掃描附件（`attachment_url`）
> 2. 實體簽核維持原有人工流程（昊揚紙本請款單蓋章）
> 3. Finance 進入 AP 列表比對系統資料與實體單據：
>    - 確認一致 → `status → approved`
>    - 資料有誤 → `status → rejected`（填寫退回原因）；原建立者（PM/PD）或 Finance 自行修改後，重置為 `pending` 重送
> 4. Finance 執行匯款後標記 `status → paid`，填入 `paid_at`

### 5.3 AP 狀態機

```
pending ──→ approved ──→ paid
   ↑              │
   └── rejected ←─┘
```

| 狀態 | 說明 | 允許的下一狀態 |
|------|------|-------------|
| `pending` | 建立初始態（PM/PD 或 Finance 手動建立） | `approved`、`rejected` |
| `approved` | Finance 比對實體單據確認 | `paid`、`rejected` |
| `rejected` | Finance 退回，待修改 | `pending`（修改後重新送審） |
| `paid` | 終態，Finance 確認匯款完成 | — |

> ⚠️ **退回規則（BR-050-03，v8.8 新增）**：Finance 可在 `pending` 或 `approved` 狀態退回 APRecord（`status → rejected`），必須填寫退回原因（`reject_reason`）。退回後，原建立者（PM/PD）或 Finance 自行修改欄位後，將狀態重置為 `pending` 重新送審。

> ⚠️ 個人廠商（`vendor_type = individual`）：`labor_report_received = true` 才允許更新為 `paid`。

### 5.4 代收代付配對追蹤

```
ARRecord（transaction_type = passthrough）  ←─配對─→  APRecord（ap_category = passthrough_payment）
  科目 2012/2013 代收款                                  科目 2012/2013 付款給廣告平台
  related_ar_id ─────────────────────────────────────→ APRecord.id
```

> 📋 **代收代付 AP 納入 MVP（B-55 resolved，v8.8）**：`ap_category = passthrough_payment` 的 APRecord 正式納入 MVP 範疇。建立者為 **PM/PD 或 Finance**，流程與一般廠商 AP 相同（手動建立 → Finance 確認 → 匯款後標記 paid）。此類 APRecord 不計入外部成本（不影響毛利計算），僅用於代收代付配對追蹤。

財務在 AR 對帳列表可確認：每筆代收是否有對應的 AP 記錄（是否已代付給廣告平台）。

---

## 6. AR / AP 對帳列表 UI 規格

### 6.1 AR 對帳列表

**篩選條件**：月份（預設當月）、客戶 / 品牌、交易類型（服務費 / 代收代付）、收費方式、狀態（多選）

**列表欄位**：

| 欄位 | 說明 |
|------|------|
| 客戶名稱 / 品牌 | — |
| 交易類型 badge | 服務費 / 代收代付（不同顏色）|
| 服務項目 / 說明 | invoice_note |
| 服務月份 | service_month |
| 發票月份 | invoice_month（若與服務月不同，顯示標注） |
| 未稅金額 | — |
| 含稅總計 | — |
| 到期日 | due_date（月預收 10 日 / 廣告月結 20 日） |
| 狀態 badge | 草稿 / 待審核 / 審核中 / 內審通過 / 客戶確認 / 已收款（對應 draft / pending / under_review / approved_internal / client_confirmed / confirmed） |
| 逾期標記 | `is_overdue = true` 時，列表列顯示橘色「逾期」警示標籤（不替換狀態 badge，兩者並存） |
| 發票 | 開立張數（點擊展開 ARInvoice 列表） |
| 操作 | [送審]（draft 狀態） / [標記客戶確認]（approved_internal） / [確認收款]（client_confirmed） / [查看]（all） |

**月度摘要列：**

```
2026 年 6 月 AR 摘要
  服務費應收（revenue）：NT$1,850,000（38 筆）← 計入毛利
  代收代付（passthrough）：NT$3,200,000（12 筆）← 不計入毛利
  ─────────────────────────────────────────────
  服務費：已收款 NT$1,120,000 ｜ 待收 NT$730,000 ｜ 逾期（is_overdue）NT$0
```

### 6.2 AP 對帳列表

**篩選條件**：月份、廠商 / 付款分類（廠商成本 / 代收代付）、專案、狀態

**列表欄位**：廠商名稱、付款分類 badge、服務說明、金額、手續費、實付總額、帳務月份、發票號碼、狀態、操作

---

## 7. 全成本獲利試算規格（REQ-0051）

### 7.1 核心計算公式

```
收款金額（AR）= Σ ARRecord.amount_pretax
                WHERE transaction_type = 'revenue'     ← 只計服務費，排除代收代付
                AND status = 'confirmed'
                AND project_id = 此專案

外部成本（AP）= Σ APRecord.amount_pretax
                WHERE ap_category = 'vendor_cost'      ← 只計廠商服務費
                AND status = 'paid'
                AND project_id = 此專案

內部成本 = ProjectCostRecord.amount（手動輸入，MVP 階段）

全成本 = 外部成本 + 內部成本

專案毛利 = 收款金額 − 全成本

毛利率 = 專案毛利 ÷ 收款金額 × 100%
```

### 7.2 MVP 階段的工時記錄設計

> ⏳ **B-09 postponed**：員工費率計算（月薪換算 vs. 標準費率表）延後決策，P0 不實作費率自動計算。SA 建議採標準費率表（初級 NT$300/h～主管 NT$1,000/h），待業主確認後啟用。



本期（P0）不實作工時記錄系統，內部成本由財務行政部估算後手動填入 ProjectCostRecord。

**操作角色（v5.1 補充）：** `ROLE_FINANCE`（主要操作者）、`ROLE_ADMIN`、`ROLE_MANAGER` 均可新增 / 編輯。`ROLE_PM` 對自身負責案件的 ProjectCostRecord 唯讀（可查看成本數字，不可修改）。

**UI 入口（v5.1 補充）：** REQ-0051 §7.5 專案毛利試算頁的「內部成本（工時估算）」區塊右側「編輯」按鈕，Finance / Admin / Manager 可見。點擊後展開月份 + 金額 + 說明的填寫表單，每月可新增多筆。

**API（v5.1 補充，草稿）：**

```
POST  /api/v1/finance/projects/{project_id}/cost
      Body: { record_month, cost_type, amount, description }
PATCH /api/v1/finance/projects/{project_id}/cost/{cost_id}
      Body: { amount?, description? }
```

### 7.3 ProjectCostRecord 與毛利計算的資料流

`ProjectCostRecord` 是 MVP 階段的內部成本手動記錄機制（P0 不實作工時系統），其資料如何進入毛利計算：

```
Finance / Admin / Manager
    │  在專案毛利試算頁「內部成本」區塊點擊「編輯」
    │  填入：record_month、cost_type、amount、description
    │
    ▼
ProjectCostRecord 建立（project_id FK 關聯）
    │
    ▼
REQ-0051 毛利計算引擎讀取
    │
    内部成本（AP）= Σ ProjectCostRecord.amount WHERE project_id = 此專案
    │
    ▼
全成本 = 外部成本（APRecord.vendor_cost）+ 內部成本（ProjectCostRecord）
```

> 📋 `ProjectCostRecord.cost_type` 目前值域為 `internal_labor | other`，P1 若啟用費率自動計算（B-09 confirmed 後），可新增 `auto_labor` 類型，由系統依費率表計算後寫入，不影響現有手動記錄邏輯。

### 7.4 毛利警示規則

| 情況 | 系統行為 |
|------|----------|
| 毛利率 < 0%（虧損） | 紅色警示，通知 Manager |
| 0% ≤ 毛利率 < 30% | 橘色警示（門檻來自 REQ-0002 S-04） |
| 毛利率 ≥ 30% | 綠色，正常 |

### 7.5 專案毛利試算頁 UI

```
老撈麻辣鍋 2026 顧問服務｜財務試算

┌─────────────────────────────────────────────────────┐
│  收款摘要（服務費 AR，排除代收代付）                      │
│  本月已收：NT$50,000（稅前）                            │
│  累計已收：NT$200,000                                  │
│  待收款：NT$50,000                                     │
│  ─────────────────────────────────                   │
│  代收代付（供參考）：NT$800,000 代收  NT$800,000 代付   │
├─────────────────────────────────────────────────────┤
│  成本摘要                                              │
│  外部成本（廠商服務費）：NT$80,000                       │
│  內部成本（工時估算）：NT$30,000  [編輯]                 │
│  全成本合計：NT$110,000                                 │
├─────────────────────────────────────────────────────┤
│  獲利試算                                              │
│  累計服務費收款：NT$200,000                             │
│  全成本：NT$110,000                                    │
│  毛利：NT$90,000                                       │
│  毛利率：45.0%  ✅ 符合門檻（30%）                      │
└─────────────────────────────────────────────────────┘
```

---

## 8. 資料模型補充

### 8.1 ProjectCostRecord（內部成本手動記錄，MVP）

```
ProjectCostRecord {
  id            UUID        PK
  project_id    UUID        NOT NULL, FK → Project.id
  record_month  VARCHAR(7)  -- YYYY-MM
  cost_type     ENUM        internal_labor | other
  amount        DECIMAL     NOT NULL
  description   TEXT
  created_by    UUID        FK → User.id
  created_at    TIMESTAMP
}
```

### 8.2 實體關係總覽（v1.2）

```
ARRecord  ──1:N──→ ARInvoice（多張電子發票，差異 8 修正）
ARRecord  ──N:1──→ AdSpendRecord（廣告月結金額來源；v9.4：AdSpendRecord 已移至 REQ-0055 §10b）
ARRecord  ──N:1──→ Project / Brand / Service
APRecord  ──N:1──→ Project / Brand
APRecord（passthrough_payment）──N:1──→ ARRecord（passthrough）（代收代付配對）
```

---

## 9. API 介面設計（草稿）

### 9.1 查詢本月 AR 列表

```
GET /api/v1/finance/ar?month=2026-06&transaction_type=revenue

Response 200:
{
  "month": "2026-06",
  "summary": {
    "revenue_total": 1850000,
    "passthrough_total": 3200000,
    "revenue_confirmed": 1120000,
    "revenue_pending": 730000,
    "overdue": 0
  },
  "records": [
    {
      "ar_id": "uuid",
      "customer_name": "老撈有限公司",
      "brand_name": "老撈麻辣鍋",
      "transaction_type": "revenue",
      "billing_type": "monthly_prepaid",
      "service_month": "2026-06",
      "invoice_month": "2026-06",
      "amount_pretax": 50000,
      "total_amount": 52500,
      "due_date": "2026-06-10",
      "status": "pending"
    }
  ]
}
```

### 9.2 請款單送審

```
POST /api/v1/finance/ar/{ar_id}/submit-for-approval

Response 200:
{
  "ar_id": "uuid",
  "status": "under_review",
  "workflow_instance_id": "uuid"
}
```

### 9.3 標記客戶已確認（觸發電子發票）

```
POST /api/v1/finance/ar/{ar_id}/client-confirm

前置條件：status = approved_internal

Response 200:
{
  "ar_id": "uuid",
  "status": "client_confirmed",
  "invoices": [
    { "invoice_no": "XG95239506", "invoice_date": "2026-06-03", "invoice_amount": 52500 }
  ]
}
```

### 9.4 確認收款

```
POST /api/v1/finance/ar/{ar_id}/confirm-payment

Request Body:
{
  "paid_amount": 52485,
  "paid_at": "2026-06-08T14:00:00Z",
  "payment_note": "手續費 15 元由對方負擔"
}

Response 200:
{
  "ar_id": "uuid",
  "status": "confirmed",
  "paid_amount": 52485
}
```

### 9.5 廣告花費結算 API

> 📋 **v9.4 重構說明**：廣告花費相關 API（`POST /api/v1/finance/ad-spend`、`PATCH /api/v1/finance/ad-spend/{id}/confirm`、`GET /api/v1/finance/ad-spend`）已移至 **REQ-0055 §7（§10b）**，請參照該章節。

### 9.6 查詢專案全成本試算

```
GET /api/v1/finance/projects/{project_id}/profit

Response 200:
{
  "project_id": "uuid",
  "ar_revenue_confirmed": 200000,
  "ar_passthrough_total": 800000,
  "ap_vendor_cost_paid": 80000,
  "ap_internal_manual": 30000,
  "full_cost": 110000,
  "gross_profit": 90000,
  "profit_rate": 0.450,
  "alert_level": "green"
}
```

---

## 10. 驗收標準

### REQ-0050 驗收標準

#### AC-050-001：月預收 AR 生成，截止日為 10 日

```gherkin
Given 老撈麻辣鍋有一筆 billing_type = monthly_prepaid 的 Service（顧問費 $50,000）
When 系統在 2026-06-01 執行 Cron Job
Then 系統生成 ARRecord：
     transaction_type = revenue
     service_month = 2026-06
     invoice_month = 2026-06
     due_date = 2026-06-10
     amount_pretax = 50000
     status = draft
```

#### AC-050-002：月結廣告費 AR 生成，截止日為 20 日

```gherkin
Given 老撈麻辣鍋有一筆 billing_type = monthly_billing 的 Service（META 代操）
When 系統在 2026-06-01 執行 Cron Job
Then 系統生成 ARRecord：
     transaction_type = revenue
     service_month = 2026-05（結算上月）
     invoice_month = 2026-06
     due_date = 2026-06-20（月結廣告費截止日 20 日）
     amount_pretax = null（等廣告費結算後填入）
     status = draft
```

#### AC-050-003：代收代付 ARRecord 不計入毛利

```gherkin
Given 里琪的 ARRecord 有兩筆（同日收款）：
     ① transaction_type = revenue，amount_pretax = 71,428（META 代操服務費）
     ② transaction_type = passthrough，amount_pretax = 396,825（META 廣告儲值金）
When 系統計算里琪專案毛利
Then 收款金額只使用 ① = 71,428
And ② 的 396,825 不計入收款金額
And AR 摘要區分顯示兩種類型金額
```

#### AC-050-004：電子發票在客戶確認且回簽上傳後，由 Finance 手動開立

```gherkin
Given ARRecord 狀態為 client_confirmed
And 客戶回簽請款單已上傳（signed_invoice_attachment IS NOT NULL）
When Finance 點擊「開立電子發票」按鈕
Then 系統呼叫 ECPay API 開立電子發票
And 建立 ARInvoice 記錄，存入回傳的發票號碼、發票類型、統編、金額、開立時間戳
And 自動傳送電子發票至客戶 invoice_email
And 按鈕變更為「查看發票紀錄」（不可重複開立）

Given ARRecord 狀態為 client_confirmed，但回簽請款單尚未上傳（signed_invoice_attachment IS NULL）
When Finance 進入請款單頁面
Then「開立電子發票」按鈕維持鎖定（灰色 + Tooltip「尚未上傳客戶回簽請款單」）
```

#### AC-050-005：一筆 AR 可對應多張發票

```gherkin
Given 客戶要求顧問費和廣告費分開開立發票
When 系統開立電子發票
Then ARInvoice 建立兩筆記錄：
     ① invoice_no = XG95239506，invoice_amount = 73,500（顧問費）
     ② invoice_no = XG95239507，invoice_amount = 98,886（廣告費）
And ARRecord 本身不含任何 invoice_no 欄位
```

#### AC-050-006：請款單需通過內部審核

```gherkin
Given ARRecord 狀態為 pending
When 客戶負責人嘗試直接標記「客戶已確認」（跳過內部審核）
Then 系統顯示錯誤「請款單尚未通過內部審核，請先送審」
And 狀態不允許跳至 approved_internal 或 client_confirmed
```

#### AC-050-007：逾期標記不影響流程繼續進行

```gherkin
Given ARRecord due_date = 2026-06-20，status = client_confirmed，is_overdue = false
When 系統在 2026-06-21 執行 Cron Job，仍未收款
Then ARRecord.is_overdue 更新為 true，記錄 overdue_at 時間戳
And ARRecord.status 維持 client_confirmed，不改變
And 發送逾期通知給 ROLE_FINANCE 和所有 ROLE_MANAGER
When Finance 在 2026-06-25 確認收款
Then ARRecord.status 更新為 confirmed（終態）
And ARRecord.is_overdue 維持 true（歷史保留，不清除）
```

#### AC-050-008：審核操作嵌入 AR 請款單詳情頁，呈現兩層並行進度（v8.0 新增）

```gherkin
Given ARRecord 狀態為 under_review
And 第一層審核者（財務主管）已核准，第二層審核者（部門主管）尚未審核
When 第二層審核者進入該 AR 請款單詳情頁
Then 頁面顯示審核進度區：第一層「已核准」+ 核准者姓名與時間；第二層「待審核」
And 頁面底部顯示審核操作區（核准 / 退回按鈕），因該登入者為尚未審核的第二層
When 第二層審核者點擊「核准」
Then WorkflowInstance 狀態 → approved
And ARRecord 狀態 → approved_internal
And Inbox 雙方審核者的該筆項目移至「已核准」分頁
```

#### AC-050-009：兩層審核中任一層退回，整筆視為退回（v8.0 新增）

```gherkin
Given ARRecord 狀態為 under_review
And 第一層審核者已核准
When 第二層審核者於審核操作區填寫退回原因並點擊「退回」
Then WorkflowInstance 狀態 → rejected（不因第一層已核准而例外）
And ARRecord 狀態回到 pending
And 第一層的審核記錄保留供稽核查閱，但不影響最終結果
And 通知財務修改，內容包含退回原因
And 財務重新送審後，兩層審核需重新進行
```

### REQ-0051 驗收標準

#### AC-051-001：全成本計算排除代收代付

```gherkin
Given 里琪專案：
     AR revenue confirmed = $71,428（代操服務費）
     AR passthrough = $396,825（廣告儲值金，不計入）
     AP vendor_cost paid = $20,000（KOL 費用）
     AP passthrough_payment = $380,952（代付 META 廣告，不計入）
When 系統計算毛利
Then 收款金額 = $71,428
And 外部成本 = $20,000
And 毛利 = $51,428，毛利率 = 72.0%
```

#### AC-051-002：毛利率低於門檻警示

```gherkin
Given 某專案服務費確認收款 $100,000，全成本 $80,000，毛利率 20%
When 系統計算毛利
Then 顯示橘色警示「毛利率 20%，低於門檻 30%」
And 通知 Manager
```

---

## 11. 待確認事項

| 編號 | 類型 | 問題 | 負責人 | 狀態 |
|------|------|------|--------|------|
| B-09 | 業務決策 | 員工工時費率計算基準：SA 建議標準費率表（方案 B）作為 MVP | 待指定 | `open` |
| B-30 | 業務決策 | 廣告費結算：廣告負責人在系統填寫 AdSpendRecord → 財務確認，此流程是否符合預期？ | — | ✅ `resolved`（v5.9）：業主確認流程符合預期。PM/PD 填寫廣告花費金額 + 服務費比例 → 系統自動計算服務費金額 → 財務製作請款單；並行審核（財務主管 + 部門主管可同步進行）已確認 |
| B-31 | 業務決策 | AR 逾期通知頻率：逾期後每天通知 or 只通知一次？通知對象是否包含業務負責人？ | 待指定 | `open` |
| B-56 | 業務決策 | 文中會計系統拋轉方式 | 待文中確認格式 | ⏳ **部分釐清（v5.9）**：業主確認方向為「先以匯出 CSV/Excel 實作，待文中提供欄位 mapping 格式後再評估 API 升級」；Cron Job 自動推送方案暫不推進。剩餘 open 項：文中所需匯出欄位規格待對方提供 |
| B-55 | 業務決策 | 代收代付 AP 端（廣告儲值金付給廣告平台）是否納入 MVP？SA 建議納入，否則代收代付配對追蹤不完整 | 待指定 | ✅ `resolved`（v8.8）：納入 MVP，建立者為 PM/PD 或 Finance，流程與一般廠商 AP 相同。見 §5.4 |
| T-18 | 技術確認 | 綠界電子發票 API 串接：現有串接基礎的版本與測試環境確認 | 後端工程師 | `open` |

---

## 12. 與其他 REQ 的關係

```
REQ-0010（客戶主檔）+ REQ-0022（合約）
  └─ 合約 active + Project active → AR 例行生成的觸發範圍

REQ-0021（報價單）+ REQ-0041（專案執行）
  └─ Service.billing_type / amount → AR 計費依據

REQ-0030（工作流引擎）
  └─ INVOICE_APPROVAL（v1.2 新增）：請款單多層審核

REQ-0002（系統設定）
  └─ S-05 更新：新增 INVOICE_APPROVAL Workflow Type 設定

REQ-0050 / REQ-0051（本文件）
  ├─→ REQ-0026（客戶分級）：revenue AR 確認收款 → 月收款金額 → 季度分級試算
  ├─→ REQ-0052（獎金引擎，P1）：服務費收款金額為獎金計算基礎
  └─→ REQ-0060（老闆戰情室，P1）：毛利數據匯入儀表板
```

---

*— REQ-0050 / REQ-0051 規格文件結束（v1.2）—*

**v1.2 變更摘要：**
- 衝突 1：新增 `transaction_type`（revenue / passthrough）區分，毛利計算排除代收代付
- 衝突 2：月結廣告費截止日修正為 20 日，`due_date` 依 `billing_type` 動態計算
- 衝突 3：電子發票開立改為 `client_confirmed` 狀態觸發，新增狀態至狀態機
- 遺漏 4：補充 `INVOICE_APPROVAL` 工作流，AR 請款單多層審核流程（接入 REQ-0030）
- 遺漏 5：補充 `AdSpendRecord` 資料表與廣告費月結金額確認流程
- 遺漏 6：定義 AP 費用類型範疇（MVP：廠商費用 + 代收代付支出；人事、稅款等排除）
- 遺漏 7：ARRecord 拆分 `invoice_month` / `service_month` 雙月份欄位
- 差異 8：移除 `ARRecord.ecpay_invoice_no`，改為獨立 `ARInvoice` 子表（一對多）

---

# §10b｜REQ-0055 廣告花費管理

| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0055 |
| **Use Case ID** | UC-055 |
| **PRD 章節** | §10b |
| **所屬模組** | F-05 Core 5 財務計算層 |
| **優先級** | `P0` |
| **狀態** | `open` — v1.0（v9.4 新增） |
| **最後更新** | 2026-07-20（v9.4：從 REQ-0050 §4.2 抽離，獨立為本模組） |
| **依賴關係** | REQ-0001（RBAC）、REQ-0010（Brand）、REQ-0040（Project / ProjectMember）、REQ-0044（Service.fee_rate）、REQ-0050（ARRecord：接收確認後的 amount_pretax 回寫） |
| **被依賴** | REQ-0050（ARRecord 月結金額來源）、REQ-0052（獎金引擎：廣告投放金額與服務費數據） |

---

## 1. 背景與設計動機

現況：每月廣告代操服務費結算靠 Google Sheets 手工填寫、Finance 與 PM/PD 透過 LINE 群組對帳，無版本記錄、無稽核軌跡，且操作入口原藏於 AR 對帳模組內，與 PM/PD 日常工作情境不符。

目的：將廣告花費填寫、確認流程從 REQ-0050（AR/AP 對帳）中獨立出來，提供 PM/PD 與 Finance 專屬的廣告花費管理入口，支援跨品牌歷史查詢，並作為 ARRecord 月結金額與 REQ-0052 獎金計算的上游數據來源。

---

## 2. 功能描述

系統應提供獨立的廣告花費管理模組，支援：
1. PM/PD 每月填寫各客戶、各平台廣告投放數據（`AdSpendRecord`）
2. 系統自動計算 ROAS 與服務費
3. Finance 確認金額後自動回寫對應 `ARRecord.amount_pretax`
4. 跨品牌廣告花費歷史列表查詢（可篩選月份、品牌、平台）
5. 提供稽核日誌與截圖存證（SOP 要求）

---

## 3. 流程說明

### 3.1 每月廣告費結算主流程

```
每月 2 日  REQ-0050 Cron Job 自動產生 billing_type=monthly_billing 的 ARRecord（amount_pretax=null）
    │
    ▼  Finance 發出填表通知
    │
    ▼  PM/PD 進入「廣告花費管理」頁面
廣告負責人填寫各客戶當月廣告數據（AdSpendRecord）：
    ├── 廣告平台（META / Google / TikTok / 其他）
    ├── 總投放金額（未稅）
    ├── 廣告後台營業額（選填）
    └── 廣告後台截圖連結（SOP 必留）
    系統自動計算：
    ├── ROAS = 廣告後台營業額 / 總投放金額
    └── 服務費 = 總投放金額 × Service.fee_rate
    │
    ▼  PM/PD 確認後送出
    │
    ▼  Finance 在廣告花費列表核對各品牌數據
Finance 確認金額 → 系統自動回寫對應 ARRecord.amount_pretax
    │
    ▼
ARRecord 維持 draft 狀態，Finance 確認無誤後送審（→ REQ-0050 §4.3 INVOICE_APPROVAL 流程）
    │
    └── 寫入稽核日誌（ad_spend.confirmed）
```

---

## 4. 資料模型

### AdSpendRecord 資料表

```
AdSpendRecord {
  id                UUID          PK
  project_id        UUID          NOT NULL, FK → Project.id
  brand_id          UUID          NOT NULL, FK → Brand.id
  ar_record_id      UUID          FK → ARRecord.id（Finance 確認後關聯）
  record_month      VARCHAR(7)    -- YYYY-MM（結算服務月份，對應上月廣告花費）
  ad_platform       ENUM          meta | google | tiktok | other
  total_ad_spend    DECIMAL(12,2) -- 總投放金額（未稅）
  backend_revenue   DECIMAL(12,2) -- 廣告後台營業額（選填）
  backend_roas      DECIMAL(8,4)  -- ROAS（自動計算：backend_revenue / total_ad_spend）
  service_fee_rate  DECIMAL(5,4)  -- 服務費費率（來自 Service.fee_rate）
  service_fee_calc  DECIMAL(12,2) -- 系統計算服務費（= total_ad_spend × service_fee_rate）
  service_fee_final DECIMAL(12,2) -- 財務確認後最終服務費金額（可微調）
  confirmed_by      UUID          FK → User.id
  confirmed_at      TIMESTAMP
  screenshot_url    VARCHAR(500)  -- 廣告後台截圖連結（Google Drive URL）
  created_by        UUID          FK → User.id
  created_at        TIMESTAMP
  updated_at        TIMESTAMP
}
```

**業務規則：**
- 同一 `brand_id` + `record_month` + `ad_platform` 組合允許多筆（同品牌同月可有多個廣告帳戶）
- `backend_revenue` 為選填；若未填，`backend_roas` 為 `null`
- `service_fee_final` 預設帶入 `service_fee_calc`，Finance 可在確認前微調
- `confirmed_at` 填入後，對應 `ARRecord.amount_pretax` 自動彙總更新（同月同品牌所有平台服務費加總）

---

## 5. RBAC 矩陣

| 操作 | Admin | ROLE_MANAGER | PM/PD | Finance |
|------|-------|--------------|-------|---------|
| 填寫 / 建立 AdSpendRecord | ✅ | ✅ | ✅（負責專案之品牌） | — |
| 查看廣告花費列表（跨品牌） | ✅ | ✅ | ✅ | ✅ |
| 確認金額（confirmed_by） | ✅ | ✅ | — | ✅ |
| 微調 service_fee_final | ✅ | ✅ | — | ✅ |
| 匯出列表 | ✅ | ✅ | — | ✅ |

> 📋 **查看範圍說明（v9.4）**：PM/PD 可查看所有品牌的廣告花費列表（跨品牌可見），但僅能填寫自身負責專案所屬品牌的數據。

---

## 6. UI 規格

### 6.1 頁面入口

- 側邊欄位置：**財務管理 → 廣告花費管理**
- 對應頁面：`PAGE-05-L2-AD` 廣告花費管理列表頁

### 6.2 廣告花費列表頁

```
廣告花費管理
  篩選列：[月份 ▼] [品牌 ▼] [平台 ▼] [狀態 ▼]         [匯出]

  品牌         月份      平台    投放金額    ROAS   服務費      狀態     操作
  ─────────────────────────────────────────────────────────────────────
  Projext&Co.  2026-05  META    716,828    2.35   114,692    已確認   [查看]
  Projext&Co.  2026-05  Google   58,677    6.23     9,388    已確認   [查看]
  大衛鼻子咖啡  2026-05  META    282,356    1.84    56,471    待確認   [確認] [編輯]
  法夏          2026-05  META     60,001    —       12,000    未填寫   [填寫]
  ─────────────────────────────────────────────────────────────────────
  合計                          1,117,862         192,551
```

**狀態說明：**

| 狀態 | 說明 |
|------|------|
| 未填寫 | Cron Job 已產生 ARRecord，但尚未建立 AdSpendRecord |
| 待確認 | PM/PD 已填寫，等待 Finance 確認 |
| 已確認 | Finance 已確認，ARRecord.amount_pretax 已回寫 |

### 6.3 廣告花費填寫 / 詳情頁

```
廣告花費填寫
  品牌：Projext&Co.          月份：2026-05（結算上月花費）
  專案：Projext Co. 數位行銷

  廣告平台      [META ▼]
  總投放金額    [716,828]
  廣告後台營業額 [1,685,138]（選填）
  廣告後台截圖  [貼上 Google Drive 連結]

  ── 系統自動計算 ──────────────────────
  ROAS                  2.35
  服務費費率             16%（來自服務項目設定）
  系統計算服務費         $114,692

  [+ 新增平台]          [取消] [送出]
```

**Finance 確認區（已填寫後顯示）：**

```
  Finance 最終確認服務費：[$114,692]（可微調）
                           [確認金額]
```

---

## 7. API 規格

```
# 查詢廣告花費列表（跨品牌，支援篩選）
GET   /api/v1/finance/ad-spend
      ?month=YYYY-MM&brand_id={uuid}&platform=meta&status=pending

# 填寫廣告數據（PM/PD）
POST  /api/v1/finance/ad-spend
Request Body:
{
  "project_id": "uuid",
  "brand_id": "uuid",
  "record_month": "2026-05",
  "ad_platform": "meta",
  "total_ad_spend": 716828,
  "backend_revenue": 1685138,
  "screenshot_url": "https://drive.google.com/..."
}
Response 201:
{
  "ad_spend_id": "uuid",
  "service_fee_calc": 114692,
  "backend_roas": 2.35
}

# Finance 確認金額（自動回寫 ARRecord.amount_pretax）
PATCH /api/v1/finance/ad-spend/{id}/confirm
Request Body:
{
  "service_fee_final": 114692
}
Response 200:
{
  "ad_spend_id": "uuid",
  "confirmed_by": "uuid",
  "confirmed_at": "2026-06-02T10:30:00Z",
  "ar_record_id": "uuid",
  "ar_amount_pretax_updated": 114692
}
```

---

## 8. 稽核日誌事件

| 事件 | 觸發時機 |
|------|---------|
| `ad_spend.created` | PM/PD 填寫並送出 AdSpendRecord |
| `ad_spend.confirmed` | Finance 確認金額，ARRecord 回寫完成 |
| `ad_spend.updated` | Finance 確認前微調 service_fee_final |

---

## 9. 驗收標準

### AC-055-001：PM/PD 可填寫廣告花費並觸發自動計算

```gherkin
Given PM 用戶「地瓜」負責品牌「Projext&Co.」
When 地瓜在廣告花費管理頁點擊「填寫」，填入 META 投放金額 716,828 元、營業額 1,685,138 元
Then 系統自動計算：ROAS = 2.35、服務費 = 114,692 元（費率 16%）
And AdSpendRecord 建立成功，狀態為「待確認」
And 寫入稽核日誌 ad_spend.created
```

### AC-055-002：Finance 確認後自動回寫 ARRecord 金額

```gherkin
Given Finance 用戶「Debby」在廣告花費管理頁看到「Projext&Co.」2026-05 META 待確認記錄
When Debby 確認服務費 114,692 元並點擊「確認金額」
Then 對應 ARRecord.amount_pretax 自動更新為 114,692（同月品牌所有平台加總）
And AdSpendRecord 狀態更新為「已確認」
And 寫入稽核日誌 ad_spend.confirmed
```

### AC-055-003：所有角色可查看跨品牌列表

```gherkin
Given PM 用戶「Ariel」負責品牌「Jerscy」
When Ariel 進入廣告花費管理列表頁，不套用品牌篩選
Then 頁面顯示所有品牌的廣告花費記錄（包含非自身負責品牌）
And Ariel 僅能對自身負責品牌的記錄點擊「填寫」，其他品牌的「填寫」按鈕不顯示
```

### AC-055-004：PM/PD 無法填寫非負責品牌

```gherkin
Given PM 用戶「地瓜」負責品牌「Projext&Co.」，未負責「法夏」
When 地瓜嘗試直接呼叫 POST /api/v1/finance/ad-spend 填寫「法夏」的廣告數據
Then API 回傳 403 Forbidden
And 稽核日誌記錄未授權存取嘗試
```

### AC-055-005：每月 2 日通知觸發

```gherkin
Given 系統在 2026-06-02 執行 Cron Job，產生當月 monthly_billing ARRecord
When Cron Job 完成
Then 系統發送站內通知給所有 PM/PD：「2026-05 廣告花費結算待填寫，請於 2026-06-20 前完成」
And Finance 收到通知：「廣告費 M 筆待確認，截止日 2026-06-20」
```

---

## 10. 與其他 REQ 的關係

```
REQ-0001（使用者管理）
  └─ RBAC：PM/PD 填寫限自身負責品牌；Finance 可確認所有品牌

REQ-0010（客戶主檔）
  └─ Brand 資料作為廣告花費記錄的品牌維度

REQ-0040（專案建立）
  └─ ProjectMember 判斷 PM/PD 的品牌負責範圍

REQ-0044（服務項目管理）
  └─ Service.fee_rate 作為服務費費率來源

REQ-0050（AR / AP 對帳）←→ REQ-0055（本文件）
  ├─ REQ-0050 Cron Job 每月 2 日產生 ARRecord（amount_pretax=null）
  └─ REQ-0055 Finance 確認後，自動回寫 ARRecord.amount_pretax

REQ-0052（獎金分配引擎）
  └─ AdSpendRecord.total_ad_spend / service_fee_final 作為廣告組別獎金計算數據來源
```

---

*— REQ-0055 規格文件 v1.0 —*

---



---

# §19｜REQ-0054 績效認列引擎

✅ **v5.5 新增（2026-06-03 績效認列資料流確認）**：全新 REQ，補足 Layer 2 達標計算所需的核心資料基礎，對應現行《2026Q2目標與獎金結算總表》的「實績分頁」手工作業。

| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0054 |
| **Use Case ID** | UC-054 |
| **PRD 章節** | 5.6.5 |
| **所屬模組** | F-05 Core 5 財務計算層 |
| **優先級** | `P1` |
| **狀態** | `open` — v5.5 新增規格；B-57 ✅ resolved（v5.6：Cron Job 每月 2 日自動建立）；B-52 ✅ resolved（v5.9：解鎖角色定義確認）；v5.9 補充人員異動 / 離職業務規則 |
| **最後更新** | 2026-06-24（v7.4：ProjectMember 取代 OnboardingMember）|
| **依賴關係** | REQ-0001（RBAC）、REQ-0040（`ProjectMember`：角色、貢獻權重、department_id 快照；v7.4 取代原 REQ-0025 OnboardingMember）、REQ-0050（ARRecord / APRecord：提供 base_amount 計算來源）、REQ-0055（AdSpendRecord：廣告投放金額與服務費數據來源） |
| **被依賴** | REQ-0052（獎金分配引擎 Layer 2：`PerformanceRecord.final_performance` 為計算基礎）、REQ-0060（老闆戰情室） |

---

## 1. 背景與設計動機

現況：月度認列績效由 Finance 以試算表手工計算（每月 20 日前），與各部門主管對帳後定案，無系統追溯。目的：將此流程系統化，產生可稽核的 `PerformanceRecord`（一人一案一筆），作為 REQ-0052 Layer 2 部門達標獎金的計算數據來源。

---

## 2. 認列原則

### 2.1 財務底線：實際收付完畢才認列

績效不在案件開案或執行當下產生，嚴格遵守以下條件：

| 服務類型 | 認列條件 | 會計邏輯 |
|---------|---------|---------|
| **廣告 / 純顧問服務** | 客戶款項已到帳（`ARRecord.status = confirmed`） | 純人力服務，無外部成本 |
| **整合行銷 / 創意設計** | AR 全數收清 **且** AP（5113 / 5113-01）全數付清 | 有委外成本，需確認實際利潤才認列 |

### 2.2 月度定案時程

Finance 於**每月 20 日前**，將上個月符合認列條件的案件全部結算完畢，與各部門主管對帳確認後，執行鎖定（`status → locked`）。

---

## 3. 計算公式

```
個人認列績效（final_performance）= base_amount × contribution_weight ± adjustment_amount
```

### 步驟一：決定基礎金額（base_amount）

| 服務類型 | 計算方式 | 系統資料來源 |
|---------|---------|------------|
| **廣告 / 顧問服務** | 總服務費（未稅） | `Σ ARRecord.amount`（該案件已 `confirmed`） |
| **整合行銷 / 創意設計** | 實際利潤 = 服務費 - 外部成本 | `Σ ARRecord.amount - Σ APRecord.amount`（AP 限科目 5113 / 5113-01） |

> 📋 **系統自動計算，Finance 可手動覆寫**：`base_amount` 由系統從 ARRecord / APRecord 自動帶入計算；Finance 若發現數字有誤（如某筆 AP 漏記），可手動覆寫單筆 `PerformanceRecord.base_amount`，並填寫覆寫原因。覆寫操作記錄於稽核日誌。

> ⚠️ **AP 排除範圍（不計入 base_amount 扣減）**：
> - 代收代付款項（科目 2011 / 2012，如廣告平台儲值金）
> - 公司內部營運費用（科目 6000 系列：人事、行政管理、行銷系統費用等）

### 步驟二：乘以貢獻權重

```
performance_amount = base_amount × contribution_weight

contribution_weight 來源：ProjectMember.contribution_weight（建立專案時快照；v7.4 取代原 OnboardingMember）
```

| 角色 | 預設貢獻權重 |
|------|------------|
| 業務來源 | 5% |
| 簽約成交 | 10% |
| 專案 PD | 25% |
| 專案 MPM / PM | 10% |
| 運營 / 廣告 SPM | 50% |

> 📋 兼任多角色者，貢獻權重合計（例：業務來源 + 簽約成交 = 15%）。

### 步驟三：內帳調整（跨部門績效移轉）

若專案執行過程有跨部門支援（如整合行銷部委託創意素材部產圖），透過 `PerformanceAdjustment` 進行一正一負的績效移轉：

```
委託方 final_performance = performance_amount - adjustment_amount（負）
支援方 final_performance = performance_amount + adjustment_amount（正）
不影響公司外部總認列績效數字
```

---

## 4. 操作流程

> 📋 **Cron Job 執行順序說明**：REQ-0054 的每月 2 日掃描依賴 `ARRecord.status = confirmed` 的資料存在，而 REQ-0050 的每月 2 日 Cron Job 負責**自動產生當月 ARRecord**。因此兩個 Job 同在每月 2 日觸發，執行順序須確保：**REQ-0050 Cron Job 先執行（產生 ARRecord）→ REQ-0054 Cron Job 後執行（掃描認列資格）**。建議以固定時序排程（如 REQ-0050 於 00:00、REQ-0054 於 01:00）或 Job 鏈（REQ-0050 完成後觸發 REQ-0054）來保證順序。

```
每月 2 日 系統 Cron Job 掃描：
  符合認列條件的 ProjectMember 清單
  （廣告/顧問：ARRecord.status = confirmed）
  （整合/創意：AR 全清 AND AP(5113) 全清）
      ↓
系統自動建立 PerformanceRecord（status = pending）
  base_amount  = 系統計算
  performance_amount = base_amount × contribution_weight
  adjustment_amount  = 0（預設）
  final_performance  = performance_amount
      ↓
Finance 審閱試算結果
  ├── 數字正確 → 維持系統計算值
  └── 數字有誤 → 手動覆寫 base_amount（附覆寫原因）
      ↓
部門主管發起內帳調整申請（若有跨部門支援）
Finance 審核確認 PerformanceAdjustment
  → 系統更新相關 PerformanceRecord.adjustment_amount
  → final_performance 自動重新計算
      ↓
Finance 與各部門主管對帳確認（每月 20 日前）
      ↓
Finance 執行月度鎖定：
  PerformanceRecord.status → locked
  locked_at = now()
  locked_by = Finance user_id
（✅ B-52 resolved，v5.9：鎖定後解鎖權限限 Finance 最高層或 Admin
  實作方式：解鎖操作限 ROLE_FINANCE 且具備 `can_unlock_performance = true` 旗標，或由 ROLE_ADMIN 執行）
      ↓
REQ-0052 Layer 2 讀取已 locked 的 PerformanceRecord
依 department_id 與 period 加總 final_performance
進行達標計算
```

---

> ⚠️ **業務規則（BR-054-02）— 人員中途異動績效拆分（v5.9 新增）**：專案執行過程中若負責人更換，績效依實際執行天數比例拆分。計算依據為 `ProjectMember.assigned_from` / `assigned_to` 欄位。異動當天之認列歸屬原負責人，接手者從次日起算。系統建立 `PerformanceRecord` 時，依人員在結算月份內的有效工作天數折算：
> ```
> 有效貢獻天數 = MIN(assigned_to, 月末) - MAX(assigned_from, 月初) + 1
> 折算績效     = base_amount × contribution_weight × (有效貢獻天數 / 當月總工作天數)
> ```
> 專案詳情頁（PAGE-04-L2-01）需顯示各版本負責人的起訖日（`assigned_from` / `assigned_to`），供財務對帳確認各自比例。

> ⚠️ **業務規則（BR-054-03）— 人員離職後獎金歸公司（v5.9 新增）**：若人員在獎金核定前已離職（`User.is_active = false`），其 `PerformanceRecord` 仍依正常流程計算。主管在 Layer 2 分配階段若將貢獻度分配給離職人員，系統自動將該筆 `DeptBonusAllocation` 標記 `is_resigned_forfeit = true`，**金額歸公司所有，不實際發放**。Finance 匯出發放清單時此類金額自動排除。

> ⚠️ **業務規則（BR-054-04）— 後繼者認列規則（v5.9 新增 / v7.4 更新）**：承接職缺的後繼者，以新的 `ProjectMember` 記錄（`assigned_from = 實際接手日`）加入專案（v7.4 取代原 OnboardingMember 記錄）；後續認列由後繼者的紀錄起算，不承接前任已結算部分。Admin/Manager 執行「調整人員」操作，建立後繼者 ProjectMember 並填入 `assigned_from`，同步將前任 `assigned_to` 填入異動日（當天仍算前任）。

## 5. 資料模型

```sql
PerformanceRecord {
  id                    UUID          PK
  user_id               UUID          FK → User.id
  project_member_id     UUID          FK → ProjectMember.id     -- 取得角色與貢獻權重（v7.4 取代 OnboardingMember）
  project_id            UUID          FK → Project.id
  department_id         UUID          FK → Department.id        -- 快照自 ProjectMember.department_id（v7.4）
  period                VARCHAR(7)    NOT NULL                   -- 認列月份 'YYYY-MM'
  service_type          ENUM(consulting_ad|integrated_creative) -- 決定 base_amount 計算方式
  base_amount           DECIMAL(12,2)                           -- 系統計算；Finance 可覆寫
  base_amount_source    ENUM(system|manual_override)  DEFAULT system
  base_amount_override_reason TEXT    NULL                       -- 覆寫原因（manual_override 必填）
  contribution_weight   DECIMAL(5,4)  NOT NULL                  -- 快照自 ProjectMember（v7.4）
  performance_amount    DECIMAL(12,2)                           -- base_amount × contribution_weight
  adjustment_amount     DECIMAL(12,2) DEFAULT 0                 -- 內帳調整淨額（正 = 加，負 = 扣）
  final_performance     DECIMAL(12,2)                           -- performance_amount ± adjustment_amount
  status                ENUM(pending|recognized|locked)
  recognized_at         TIMESTAMP                               -- Finance 確認認列時間
  recognized_by         UUID          FK → User.id
  locked_at             TIMESTAMP                               -- 月度鎖定時間（每月 20 日前）
  locked_by             UUID          FK → User.id
  created_at            TIMESTAMP     DEFAULT now()
}
```

### 5.2 PerformanceAdjustment（內帳調整申請）

```sql
PerformanceAdjustment {
  id                    UUID          PK
  from_record_id        UUID          FK → PerformanceRecord.id  -- 委託方（被扣減）
  to_record_id          UUID          FK → PerformanceRecord.id  -- 支援方（被加回）
  amount                DECIMAL(12,2) NOT NULL                   -- 調整金額（正值）
  description           TEXT          NOT NULL                   -- 調整說明
  requested_by          UUID          FK → User.id               -- 發起申請的部門主管
  requested_at          TIMESTAMP     DEFAULT now()
  finance_confirmed_by  UUID          NULL, FK → User.id
  finance_confirmed_at  TIMESTAMP     NULL
  status                ENUM(pending_finance|confirmed|rejected)
  reject_reason         TEXT          NULL
}
```

---

## 6. RBAC 權限矩陣

| 操作 | Admin | Manager（部門主管） | Manager（總經理） | PM/PD | Finance |
|------|-------|---------------------|-------------------|-------|---------|
| 查閱本部門成員 PerformanceRecord | ✅ | ✅ | ✅ | ❌ | ✅ |
| 查閱自身 PerformanceRecord | ✅ | ✅ | ✅ | ✅ | ✅ |
| 手動覆寫 base_amount | ❌ | ❌ | ❌ | ❌ | ✅ |
| 發起內帳調整申請 | ✅ | ✅（本部門） | ✅ | ❌ | ❌ |
| 審核確認 PerformanceAdjustment | ❌ | ❌ | ❌ | ❌ | ✅ |
| 執行月度鎖定 | ❌ | ❌ | ❌ | ❌ | ✅ |
| 解鎖 PerformanceRecord | ✅ | ❌ | ❌ | ❌ | ✅（需 `can_unlock_performance = true`） |

> ⚠️ **業務規則（BR-054-01）— 帳務鎖定鐵則（v5.9 補充）**：所有調帳、比例修改與帳務重結動作，**絕對必須在 Finance 執行月度鎖定前完成**。一旦 Finance 點擊確認鎖定（`status → locked`），當期所有 PerformanceRecord 隨即關閉修改權限；前端人員與主管均不可再竄改。解鎖僅限 Finance 最高層（`can_unlock_performance = true`）或 Admin，解鎖操作記入稽核日誌並附填解鎖原因。

---

## 7. 待決策事項

| 編號 | 類型 | 問題 | 影響範圍 | 狀態 |
|------|------|------|---------|------|
| B-52 | 業務決策 | 鎖定後解鎖的角色定義（財務最高層對應哪個 Role） | RBAC 解鎖權限 | ✅ `resolved`（v5.9）：解鎖限 Finance 最高層（`ROLE_FINANCE` + `can_unlock_performance = true` 旗標）或 Admin；解鎖操作記入稽核日誌並附填原因 |
| B-57 | 業務決策 | PerformanceRecord 建立觸發方式 | PerformanceRecord 建立時機 | ✅ `resolved`（v5.6）：方案 A，每月 2 日 Cron Job 自動掃描建立 pending 紀錄，Finance 審閱確認。⚠️ 追加 open 備注：獎金手動分配方式（DeptBonusAllocation）可能調整，待訪談確認後更新 REQ-0052 §4.5 |

---

## 8. 與其他 REQ 的關係

```
REQ-0025（開案交接）
  └─→ 本文件（ProjectMember：contribution_weight / department_id / 角色快照；v7.4 取代 OnboardingMember）

REQ-0050（AR/AP 對帳）
  └─→ 本文件（ARRecord.amount / APRecord.amount(5113) = base_amount 計算來源）

REQ-0054（績效認列引擎）← 本文件
  └─→ REQ-0052（獎金分配引擎）：PerformanceRecord.final_performance = Layer 2 母數
  └─→ REQ-0060（老闆戰情室）：個人與部門績效趨勢圖
```

---

*— REQ-0054 規格文件 v5.5 —*

---

# 附錄 A｜全域待決策事項彙整

以下彙整所有 REQ 文件中的 open 事項，依類型排列。需在對應 Sprint 開始前完成決策。

## A.1 業務決策類（B-xx）— open 項目

| 編號 | REQ | 問題 | SA 建議 |
|------|-----|------|---------|
| B-02 | REQ-0021 | 版本快照：完整 JSON vs. 只存 diff？ | — |
| B-03 | REQ-0021 | 公版 B 分期數量：固定三期 vs. 自由設定？ | — |
| B-07 | REQ-0022 | 合約展延提醒設定 | ✅ resolved（v7.3）：14 天前、專案負責部門主管、站內通知 + Email |
| B-09 | REQ-0051 | 員工工時費率：月薪換算 vs. 標準費率表？ | 標準費率表 |
| B-21 | REQ-0010 | 客戶詳情頁新七 Tab 結構（商機資訊 / 公司資訊 / 品牌列表 / 合約 / 報價單 / 財務 / 專案）是否符合業務使用習慣？Tab 順序是否需要調整？ | 待業主確認 |
| B-23 | REQ-0020 | ✅ resolved（v6.0）：Won 後稍後處理引導 Modal 已隨 v5.12 架構調整移除，商機與客戶資料整合為同一份記錄，無需另行引導補填，此 open item 不再適用 | — |
| B-24 | REQ-0020 | 週 KPI 是否需匯出 CSV/Excel 供週報使用？ | — |
| B-25 | REQ-0020 | 商機漏斗 KPI 視圖範圍：各角色是否顯示全公司 KPI，或僅顯示以自己為 `opportunity_owner` 的商機？（v7.0 更新：原 Sales 限定，現全角色皆適用） | — |
| B-27 | REQ-0003 | Manager 稽核日誌查詢範圍 | ✅ resolved（v5.6）：可查全公司，不限部門 |
| B-30 | REQ-0050 | 廣告費結算：廣告負責人在系統填寫 AdSpendRecord 是否符合預期？ | ✅ resolved（v5.9）：符合預期，並行審核已確認 |
| B-31 | REQ-0050 | AR 逾期通知頻率與通知對象？ | — |
| B-55 | REQ-0050 | 代收代付 AP 端（廣告儲值金支出）是否納入 MVP？ | SA 建議納入 |

## A.2 技術確認類（T-xx）— open 項目

| 編號 | REQ | 問題 | SA 建議 |
|------|-----|------|---------|
| T-02 | REQ-0001 | MFA 實作方式：TOTP vs. SMS OTP vs. Email OTP | TOTP |
| T-07 | REQ-0021 | PDF 生成方案：Server-side（Puppeteer）vs. 前端（html2pdf） | Server-side |
| T-08 | REQ-0021 | 回簽上傳的檔案儲存方案（S3/GCS）與簽名 URL 有效期 | — |
| T-09 | REQ-0010 | invoice_email 是否需子表（BrandInvoiceEmail）？ | — |
| T-10 | REQ-0022 | PDF 公版模板管理：條文修改後如何維護模板版本？ | — |
| T-11 | REQ-0020 | 週起始定義：週一 vs. 週日？ | 週一 |
| T-12 | REQ-0001 | JWT Refresh Token 是否實作？有效期？ | — |
| T-13 | REQ-0001 | CAPTCHA 方案（如 hCaptcha）？ | — |
| T-14 | REQ-0002 | quote_tax_rate 異動後，已建立中的報價單採舊值還是新值？ | — |
| T-15 | REQ-0003 | 稽核日誌非同步寫入失敗的 retry 機制？ | — |
| T-16 | REQ-0003 | before/after JSONB 大小限制策略（截斷 vs. diff）？ | — |
| T-17 | REQ-0040 | case_category 欄位：單一 ENUM vs. VARCHAR[]（陣列）？ | VARCHAR[]（SA 傾向） |
| T-18 | REQ-0050 | 綠界電子發票 API 版本與測試環境確認 | — |

## A.3 法律確認類（L-xx）

| 編號 | REQ | 問題 | 狀態 |
|------|-----|------|------|
| L-01 | REQ-0022 | 電子簽名的法律效力（是否具備與紙本相同的法律效力） | open |

---


# 附錄 B｜P1 REQ 清單（開發第二階段）

以下 REQ 為 P1，目前無獨立文件，P0 階段以暫行方案處理：

| REQ-ID | 功能名稱 | P0 暫行方案 | 規格參考來源 |
|--------|---------|------------|------------|
| REQ-0011 | 廠商名錄 | ⚠️ v8.4：本列已失效。REQ-0011 已有獨立完整文件（§11），與 REQ-0040/0041/0042 同步開發，不適用 P0 暫行方案 | — |
| REQ-0025 | 開案交接完整流程（⚠️ v7.4 廢止）| Project.notes 自由文字記錄人員分工 | — |
| REQ-0026 | 客戶分級系統 | Brand.customer_grade 欄位存在但顯示「—（每季更新）」；Customer 主檔頁面不顯示分級（v5.6 決策） | — |
| ~~REQ-0042~~ | ~~廠商採購成本管理~~ | ⚠️ v8.4：本列已失效。REQ-0042 已有獨立完整文件（§14），與 REQ-0011/0040/0041 同步開發，VENDOR_COST 工作流自開發起即完整設定並啟用，不適用 P0 暫行方案 | — |
| REQ-0052 | 獎金分配引擎 | 全成本試算輸出至毛利率，獎金欄位顯示「—（P1）」 | — |
| REQ-0060 | 老闆戰情室 | F-06 架構層預留，無任何規格 | — |

---

# 附錄 C｜資料模型快速參照

## C.1 核心實體關係圖（文字版）

```
Customer（客戶公司）
    ├── Brand（品牌）──1:N──→ BrandContact（聯絡人）
    │       ├── Contract（主合約）
    │       │       ├── ContractRenewalLog
    │       │       └── WorkflowInstance（CONTRACT_MODIFY）
    │       ├── Quote（報價委任單）
    │       │       ├── QuoteItem（巢狀報價明細）
    │       │       ├── QuoteAdConfig（廣告計費參數，依 template_type 或模板設定啟用）
    │       │       ├── QuoteVersion（版本快照）
    │       │       └── WorkflowInstance（QUOTE_APPROVAL）
    │       ├── Project（專案）
    │       │       ├── Service（服務項目）
    │       │       │       └── AdSpendRecord（廣告花費月結）
    │       │       ├── ProjectExternalLink（外部連結）
    │       │       ├── VendorQuote（廠商採購，見 REQ-0042；v8.3 取代 ProjectVendor）
    │       │       └── ProjectCostRecord（內部成本估算）
    │       └── ARRecord（應收帳款）
    │               ├── ARInvoice（電子發票，一對多）
    │               └── WorkflowInstance（INVOICE_APPROVAL）
    └── APRecord（應付帳款）
            └── AdSpendRecord（廣告費確認關聯；v9.4：規格見 REQ-0055 §10b）

User（使用者）
    ├── UserRole（多角色指派）
    ├── Session（登入 Session）
    └── AuditLog（稽核日誌）

WorkflowInstance（統一工作流）
    └── WorkflowConfig（審核設定，依 workflow_type）

OpportunityStatus（商機狀態設定）
ServiceCategory → ServiceItem（服務項目管理，REQ-0044）
CustomerGradeConfig（客戶分級門檻）
SystemConfig（通用 Key-Value 設定）
```

## C.2 合約編號規範

| 類型 | 格式 | 範例 |
|------|------|------|
| 客戶主合約 | `HY[西元年][品牌號]_[流水號]` | `HY2025A094_086` |
| 廠商合約 | `HY[民國年][流水號]` | `HY113001` |
| 報價單 | `QT-YYYYMMDD-XXXX` | `QT-20260511-0042` |

## C.3 billing_type ENUM 對照（Service 與 ARRecord 統一）

| 值 | 說明 | AR 生成方式 | 毛利計算 |
|----|------|------------|---------|
| `monthly_prepaid` | 月預收（顧問費、社群代操） | 例行 Cron Job，截止 10 日 | ✅ 計入 |
| `monthly_billing` | 月結（廣告代操服務費） | 例行 Cron Job，截止 20 日 | ✅ 計入 |
| `ad_billing` | 廣告投放抽成（依月結算） | 月結手動確認 | ✅ 計入 |
| `storage` | 儲值制（廣告預儲） | 手動建立 | ✅ 計入 |
| `standalone` | 單獨報價 | 手動建立 | ✅ 計入 |
| *(passthrough)* | 代收代付（科目 2012/2013） | 手動建立 | ❌ 排除 |

---

*— 昊揚行銷管理系統 PRD v1.2 P0 完整版 結束 —*  
*文件範疇：P0 MVP 全部功能規格（Foundation 層 + Core 1-5）*  
*P1 規格：各 REQ 骨架已在本文附錄 B 列出，開發第二階段補充*

---

# 第二階段（P1）｜功能規格

> P1 為昊揚行銷管理系統的第二交付階段，在 P0 MVP 穩定上線後啟動。
> P1 核心目標：廠商管理閉環、開案交接系統化、客戶分級、結案評核 + 獎金試算、老闆戰情室。

## P1 REQ 建議開發順序

```
REQ-0011（廠商名錄）→ REQ-0026（客戶分級）→ REQ-0025（開案交接）
→ REQ-0042（廠商採購成本）→ REQ-0052（獎金引擎）→ REQ-0060（老闆戰情室）
```

## P1 工作流新增類型

| WorkflowType | 來源 REQ | 激活方式 |
|-------------|---------|---------|
| `VENDOR_COST` | REQ-0042 | 開發起即由 Admin 在 S-05 設定審核者並啟用，不分階段（v8.4） |

---

# §11｜REQ-0011 廠商名錄


| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0011 |
| **Use Case ID** | UC-011 |
| **PRD 章節** | 5.2.2 |
| **所屬模組** | F-01 Core 1 實體資料層 |
| **優先級** | `P1` |
| **狀態** | `open` — 規格初稿，待業主確認標記之 B-xx 項目 |
| **最後更新** | 2026-05-12 |
| **依賴關係** | REQ-0001（RBAC）、REQ-0010（客戶主檔，了解實體層設計慣例） |
| **被依賴** | REQ-0041（專案執行，委外廠商選單來源）、REQ-0042（廠商採購成本管理） |

---

## 1. 背景與設計動機

現況：廠商資料散於財務試算表，PM 查聯絡資訊須轉問財務、無專長標籤、個人廠商勞報單未追蹤。目的：建立結構化廠商主檔（含法人分類、勞報單追蹤、專長標籤），作為 REQ-0041/0042 的唯一廠商資料來源。

---

## 2. 功能描述

> 系統應提供廠商主檔管理，以「廠商」為主體，記錄法人資訊、聯絡人、付款條件、合約狀態與專長標籤；僅收錄與昊揚有實際金流往來的合作廠商；廠商建檔後可於專案執行（REQ-0041）與採購成本（REQ-0042）模組中選用。

---

## 3. 廠商收錄原則（業務規則 BR-011-01）

| 情境 | 是否建立廠商紀錄 | 說明 |
|------|----------------|------|
| 昊揚向廠商採購服務（有付款） | **是** | 需建立廠商資料、簽合約、歸檔 |
| 廠商透過昊揚轉包（昊揚有收款） | **是** | 需建立廠商資料記錄費用結構 |
| 引薦 / 介紹（無直接金流） | **否** | 不在系統中建立廠商紀錄 |

> ⚠️ **業務規則**：系統在新增廠商時，應於介面提示「僅收錄有實際金流往來的合作廠商」，供操作者自我確認，但系統不做自動攔截（由人工判斷）。

---

## 4. 廠商分類維度

廠商同時具備兩個獨立分類維度，兩者**相互獨立、可交叉組合**：

### 4.1 法人類型（`entity_type`）— 決定文件要求

| 值 | 說明 | 合約要求 | 額外文件 | 帳款處理 |
|----|------|---------|---------|---------|
| `company` | 公司行號（含工作室型態商號） | 須簽合約後建檔 | 無 | 匯款至廠商提供帳戶 |
| `individual` | 個人（自然人） | 須簽合約後建檔 | **勞報單**（每次付款前需取得，政府申報用） | 匯款前須確認勞報單到位 |

> 📋 **分類原則**：工作室（如影像工作室、娛樂工作室）無論名稱形式，一律歸類為 `company`。`individual` 僅限以自然人身份合作、使用個人勞報單請款的 KOL / 創作者 / 外部個人接案者。

### 4.2 合作頻率類型（`usage_type`）— 決定合約模式

| 值 | 說明 | 合約模式 | 系統掛勾方式 |
|----|------|---------|------------|
| `recurring` | 常態性廠商：固定合作、定期付款 | 簽框架合約後定期依採購量請款 | 廠商合約掛在廠商主檔；每次使用手動掛在對應專案 |
| `one_time` | 一次性廠商：單次採購、不定期合作 | 每次合作前簽一份報價委任單 | 建立廠商紀錄 → 廠商可選用於專案 |

> ❓ **待業主確認（B-39）**：常態性廠商的定期付款是否需要在系統中建立「定期 AP 排程」（類似 AR 的 Cron Job 自動產生），或維持手動建立應付紀錄？此決策影響 REQ-0042 的 AP 自動化設計。

---

## 5. Vendor（廠商）欄位規格

### 5.1 基本資料

| 欄位 | 型別 | NOT NULL | 說明 |
|------|------|----------|------|
| `id` | UUID | ✅ | 主鍵 |
| `vendor_name` | VARCHAR(100) | ✅ | 廠商名稱（公司全名 or 個人姓名） |
| `entity_type` | ENUM('company','individual') | ✅ | 法人類型，見 §4.1 |
| `usage_type` | ENUM('recurring','one_time') | ✅ | 合作頻率類型，見 §4.2 |
| `tax_id` | VARCHAR(20) | ❌ | 統一編號（公司）或身份證字號末4碼（個人，隱碼處理） |
| `contact_address` | TEXT | ❌ | 聯絡地址 |
| `specialty_tags` | VARCHAR[] | ❌ | 專長標籤（多選，來自系統設定 S-10；見 §5.3）。PostgreSQL 原生陣列型別，已確認 DB 選型為 PostgreSQL（T-21 resolved）。 |
| `vendor_category` | VARCHAR(50) | ❌ | 廠商種類（口碑論壇 / 媒體採購 / 影音製作 / 廣告儲值 / Podcast / 派報印刷 / 線下活動 / 其他） |
| `notes` | TEXT | ❌ | 自由備註 |
| `is_internal` | BOOLEAN | ✅ | 是否為昊揚內部虛擬廠商（預設 false）；v8.8 新增，用於標記如「昊揚顧問股份有限公司（內部）」的跨部門轉包廠商記錄，採購申請流程與外部廠商相同，AP 會計科目由 Finance 手動標註 |
| `status` | ENUM('active','inactive') | ✅ | 合作狀態；`inactive` = 停止合作（軟刪除） |
| `created_by` | UUID | ✅ | FK → User.id，建檔者 |
| `created_at` | TIMESTAMP | ✅ | 建檔時間 |
| `updated_at` | TIMESTAMP | ✅ | 最後更新時間 |

### 5.2 聯絡人（VendorContact）

一個廠商可登記多位聯絡人：

| 欄位 | 型別 | NOT NULL | 說明 |
|------|------|----------|------|
| `id` | UUID | ✅ | 主鍵 |
| `vendor_id` | UUID | ✅ | FK → Vendor.id |
| `name` | VARCHAR(50) | ✅ | 聯絡人姓名 |
| `title` | VARCHAR(50) | ❌ | 職稱 |
| `email` | VARCHAR(100) | ❌ | Email |
| `phone` | VARCHAR(30) | ❌ | 手機 / 市話 |
| `is_primary` | BOOLEAN | ✅ | 是否為主要聯絡人（每個廠商至少一位 PRIMARY） |
| `notes` | TEXT | ❌ | 備註 |

### 5.3 付款資訊（VendorPayment）

| 欄位 | 型別 | NOT NULL | 說明 |
|------|------|----------|------|
| `id` | UUID | ✅ | 主鍵 |
| `vendor_id` | UUID | ✅ | FK → Vendor.id |
| `account_name` | VARCHAR(100) | ✅ | 戶名 |
| `bank_name` | VARCHAR(50) | ✅ | 銀行名稱 |
| `bank_branch` | VARCHAR(50) | ❌ | 分行名稱 |
| `account_number` | VARCHAR(30) | ✅ | 帳號（儲存時加密） |
| `payment_notes` | TEXT | ❌ | 付款備註，例：「每月25日付款」、「手續費15元自扣」 |

> ⚠️ **資安規則**：`account_number` 欄位加密儲存；Admin / Manager / PM/PD / ROLE_FINANCE 均可看完整帳號（v8.6 決策：PM/PD 為最核心接觸廠商的角色，付款資訊全面開放，不再遮罩）。

### 5.4 個人廠商（自然人）補充欄位

僅 `entity_type = 'individual'` 時顯示此欄位群組：

| 欄位 | 型別 | NOT NULL | 說明 |
|------|------|----------|------|
| `id_last4` | CHAR(4) | ❌ | 身份證末4碼（隱碼，政府申報輔助） |
| `labor_report_status` | ENUM('pending','received','filed') | ✅ | 勞報單狀態：pending=待收取、received=已收取、filed=已申報 |
| `labor_report_notes` | TEXT | ❌ | 勞報單備註（如收取日期、申報期別） |

> ⚠️ **業務規則（BR-011-02）**：個人廠商在進行付款作業（REQ-0042 AP 確認付款）時，系統應檢查 `labor_report_status`；若為 `pending`，顯示警示「尚未收取勞報單，請確認後再進行匯款」，但不強制攔截（由操作者確認）。

---

## 6. 廠商合約（VendorContract）

廠商合約由財務行政部統一管理，系統以「合約登錄 + PDF 歸檔」方式管理，**不做合約條文線上編輯**。

| 欄位 | 型別 | NOT NULL | 說明 |
|------|------|----------|------|
| `id` | UUID | ✅ | 主鍵 |
| `vendor_id` | UUID | ✅ | FK → Vendor.id |
| `contract_number` | VARCHAR(20) | ✅ | 廠商合約編號，格式：`HY[民國年][流水號]`，例 `HY113001`（系統自動產生，不可手動修改） |
| `contract_name` | VARCHAR(100) | ❌ | 合約名稱說明 |
| `applicable_brand` | TEXT | ❌ | 合作品牌 / 產品說明 |
| `service_scope` | TEXT | ❌ | 合作項目說明 |
| `contract_amount` | DECIMAL(12,0) | ❌ | 合約金額（未稅）；可為空（框架合約無固定金額） |
| `start_date` | DATE | ✅ | 合約起始日期 |
| `end_date` | DATE | ❌ | 合約終止日期；允許 NULL，代表開放式合約或未設定終止日（框架合約、長期廣告合約皆適用） |
| `signed_date` | DATE | ❌ | 實際簽約日期 |
| `contract_status` | ENUM('active','terminated','expired') | ✅ | 合約狀態 |
| `applying_dept` | VARCHAR(50) | ❌ | 申請部門（例：07 創意部） |
| `submitted_by` | UUID | ❌ | FK → User.id，申請人；下拉選單選擇帳號，預設為當前建立者，可手動更改 |
| `contract_type` | VARCHAR(20) | ❌ | 合約類別（例：A 制式合約） |
| `file_url` | TEXT | ❌ | 合約 PDF 雲端連結 |
| `is_archived` | BOOLEAN | ✅ | 是否已完成歸檔，預設 FALSE |
| `archived_by` | UUID | ❌ | FK → User.id，歸檔確認者 |
| `archived_at` | TIMESTAMP | ❌ | 歸檔時間（系統自動記錄，為人工歸檔作業的 log） |
| `notes` | TEXT | ❌ | 備註 |
| `created_by` | UUID | ✅ | FK → User.id，系統建立者（不一定等於申請人） |
| `created_at` | TIMESTAMP | ✅ | |

### 6.1 合約編號自動產生規則（BR-011-03）

```
格式：HY + [民國年2碼] + [流水號3碼（零填補）]
範例：HY113001（民國113年第1份廠商合約）

規則：
- 每年流水號重置從 001 開始
- 同年份流水號全公司統一累計（不依廠商分別計算）
- 系統鎖定：合約編號產生後不可手動修改
- 若人工已有舊編號，建立時允許手動輸入歷史編號，但系統標記為 manual_override
```

> ❓ **待業主確認（B-40）**：廠商合約 PDF 是直接上傳至系統（需要儲存空間規劃），還是僅存放 Google Drive 外部連結？目前欄位設計為外部連結，若需上傳請告知。

---

## 7. 廠商種類目錄（`vendor_category` 預設值）

以下為系統預設廠商種類，對應現行合約資料中的廠商分類：

| 種類 | 代表廠商範例 | 主要服務範圍 |
|------|------------|------------|
| 口碑論壇 | 奧藝廣告、古豪數位、凱因斯國際 | 論壇口碑（PTT/Dcard）、KOC/KOL 媒合 |
| 媒體採購 | 比石硬數位行銷、金奇廣告 | 看板/公車/捷運廣告版位採購 |
| 影音製作 | 那北影像製作、辣一個娛樂 | 廣告影片拍攝、KOL 拍攝、剪輯後製 |
| 廣告儲值 | 貓跳舞移動（TikTok）、塔圖科技（小紅書） | 代理廣告帳戶開立與費用儲值 |
| Podcast | 月城南廣告 | Podcast 製作、DAI 音訊廣告、口播業配 |
| 派報印刷 | 小蕥廣告、勤美派報 | DM 設計印刷、捷運站及商圈派報 |
| 線下活動 | 犇亞商務、芮可企管 | 徵才說明會、展場活動、場地租借 |
| 其他 | — | 不屬於以上分類的廠商 |

> 📋 廠商種類清單在系統設定（REQ-0002 S-10 廠商種類設定群組）中由 Admin 維護，不寫死在程式碼中。（S-07 已由知識庫設定佔用，廠商種類改為 S-10）

> ✅ **B-41 resolved（v5.4）**：廠商種類清單納入系統設定管理，設定群組編號為 **S-10**（S-07 已由知識庫設定佔用）。REQ-0002 已補充 S-10 廠商種類設定群組定義。

---

## 8. RBAC 權限矩陣

✅ **v5.1 更新（B-32 resolved，C-01 修正）**：補入 Finance 欄，與主 RBAC 矩陣同步。
✅ **v8.6 更新**：PM/PD 為最核心接觸廠商的角色，廠商名錄操作權限全面升級至等同 Admin/Manager（含付款資訊查看、新增、編輯、停用、合約管理），不限負責品牌，全部廠商一視同仁開放。

| 操作 | Admin | Manager | PM/PD | Finance |
|------|-------|---------|-------|---------|
| 查看廠商列表 | ✅ | ✅ | ✅ | ✅（唯讀） |
| 查看廠商詳情（含付款資訊） | ✅ | ✅ | ✅（付款資訊可見） | ✅（付款資訊可見） |
| 新增廠商 | ✅ | ✅ | ✅ | ✅ |
| 編輯廠商基本資料 | ✅ | ✅ | ✅ | ✅ |
| 停用廠商 | ✅ | ✅ | ✅ | ✅ |
| 新增 / 編輯廠商合約 | ✅ | ✅ | ✅ | ✅ |
| 查看廠商合約 | ✅ | ✅ | ✅ | ✅（唯讀） |
| 更新勞報單狀態（個人廠商） | ✅ | ✅ | ✅ | ✅ |

---

## 9. 狀態機：廠商合作狀態

```
[新建] → active（合作中）
              ↓
         inactive（停止合作）— 軟刪除，歷史採購紀錄保留
              ↑
         active（重新啟用，Admin / Manager 可操作）
```

**廠商合約狀態：**
```
[登錄] → active（履約中）
              ↓
         expired（合約到期）← 依 end_date 自動標記，或手動更新
              ↓
         terminated（提前終止）← 手動更新
```

---

## 10. User Story

**US-011-01**：As Admin/Manager，我想建立廠商主檔，so that 採購時可從系統中選廠商，而不靠人工記憶或問財務。

**US-011-02**：As Admin/Manager，我想區分個人廠商的勞報單狀態，so that 財務在付款前能確認勞報單已到位，避免漏報。

**US-011-03**：As PM，我想在專案執行中從廠商名錄選取委外廠商，so that 專案與廠商關聯有正式紀錄。

**US-011-04**：As Manager，我想查看廠商歷史合約清單，so that 了解合作紀錄與合約到期時程。

---

## 11. API 草稿（供後端參考，非最終規格）

```
# 廠商主檔 CRUD
GET    /api/v1/vendors                    # 廠商列表（分頁、關鍵字、種類篩選）
POST   /api/v1/vendors                    # 新增廠商
GET    /api/v1/vendors/:id               # 廠商詳情
PUT    /api/v1/vendors/:id               # 更新廠商資料
PATCH  /api/v1/vendors/:id/status        # 更新合作狀態（active/inactive）

# 廠商聯絡人
GET    /api/v1/vendors/:id/contacts      # 聯絡人列表
POST   /api/v1/vendors/:id/contacts      # 新增聯絡人
PUT    /api/v1/vendors/:id/contacts/:cid # 更新聯絡人
DELETE /api/v1/vendors/:id/contacts/:cid # 刪除聯絡人（非主要聯絡人才可刪）

# 廠商合約
GET    /api/v1/vendors/:id/contracts     # 合約列表
POST   /api/v1/vendors/:id/contracts     # 新增合約（自動產生合約編號）
PUT    /api/v1/vendors/:id/contracts/:cid # 更新合約資訊
PATCH  /api/v1/vendors/:id/contracts/:cid/archive # 歸檔確認

# 個人廠商勞報單狀態
PATCH  /api/v1/vendors/:id/labor-report  # 更新勞報單狀態（entity_type=individual 才可呼叫）

# 選單用
GET    /api/v1/vendors/options           # 廠商選單（供 REQ-0041 專案執行、REQ-0042 採購成本使用）
                                          # 回傳：id, vendor_name, vendor_category, status=active
```

---

## 12. UI 規格

### 12.1 廠商列表頁

- 欄位顯示：廠商名稱 / 種類 / 法人類型 / 合作類型 / 主要聯絡人 / 現行合約數 / 合作狀態
- 篩選器：廠商種類（多選）、法人類型、合作狀態、合作頻率類型
- 關鍵字搜尋：廠商名稱、聯絡人姓名
- 新增廠商按鈕：Admin / Manager / PM/PD / Finance 可見

### 12.2 廠商詳情頁（Tab 結構）

```
[基本資料] [聯絡人] [付款資訊] [合約紀錄] [採購紀錄（連結 REQ-0042）] [詢價紀錄（v9.8 新增）]
```

- **個人廠商**額外顯示「勞報單狀態」區塊，含更新按鈕
- 付款資訊 Tab：Admin / Manager / PM/PD / Finance 均可見，顯示完整帳號（v8.6 起 PM/PD 不再遮罩）
- 合約紀錄 Tab：顯示歷史合約列表，含狀態與歸檔標記；Admin / Manager / PM/PD 可新增 / 編輯合約

### 12.3 新增/編輯廠商表單

- `entity_type` 選擇後動態顯示/隱藏個人廠商專屬欄位（勞報單相關）
- `vendor_category` 為下拉選單（來自系統設定 S-10）
- `specialty_tags` 為多選 Tag 選單（來自系統設定 S-10）

### 12.4 詢價紀錄 Tab（v9.8 新增）

**定位**：採買發生前的非正式溝通記錄，與採購申請（VendorQuote）完全獨立，不走審核流程，不可轉換為採購申請。

**UI 結構**：
```
廠商詳情頁 → [詢價紀錄] Tab

列表欄位：詢價標題 / 詢價日期 / 關聯專案 / 報價區間 / 結果備註 / 建立者
操作按鈕：[+ 新增詢價紀錄]（Admin / Manager / PM/PD 可建立）

新增/編輯表單：
  詢價標題 *：[文字輸入，例：2026 Q3 KOL 媒合詢價]
  詢價日期 *：[日期選擇]
  關聯專案：[下拉，選填]
  詢問內容說明：[多行文字，選填]
  報價區間：[文字輸入，選填，例：NT$50,000～80,000]
  結果備註：[多行文字，選填，例：未成交 / 價格偏高 / 已轉採購 VQ-2026-001]
  其他備註：[多行文字，選填]
```

---

## 13. 詢價紀錄資料模型（VendorInquiry，v9.8 新增）

| 欄位 | 型別 | NOT NULL | 說明 |
|------|------|----------|------|
| `id` | UUID | ✅ | 主鍵 |
| `vendor_id` | UUID | ✅ | FK → Vendor.id（所屬廠商） |
| `project_id` | UUID | ❌ | FK → Project.id（關聯專案，選填） |
| `inquiry_date` | DATE | ✅ | 詢價日期 |
| `inquiry_title` | VARCHAR(200) | ✅ | 詢價標題 |
| `inquiry_content` | TEXT | ❌ | 詢問內容說明 |
| `quoted_range` | VARCHAR(100) | ❌ | 廠商報價區間（文字格式，例：NT$50,000～80,000） |
| `result_notes` | TEXT | ❌ | 結果備註（例：未成交 / 價格偏高 / 已轉採購 VQ-2026-001） |
| `notes` | TEXT | ❌ | 其他備註 |
| `created_by` | UUID | ✅ | FK → User.id |
| `created_at` | TIMESTAMP | ✅ | |
| `updated_at` | TIMESTAMP | ✅ | |

**API 草稿**：
```
GET    /api/v1/vendors/:id/inquiries          # 廠商詢價紀錄列表
POST   /api/v1/vendors/:id/inquiries          # 新增詢價紀錄
PUT    /api/v1/vendors/:id/inquiries/:iid     # 更新詢價紀錄
DELETE /api/v1/vendors/:id/inquiries/:iid     # 刪除詢價紀錄（建立者或 Admin）
```

**RBAC**：

| 操作 | Admin | Executive | Manager | PM/PD | Finance |
|------|-------|-----------|---------|-------|---------|
| 查看詢價紀錄 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 新增詢價紀錄 | ✅ | ✅ | ✅ | ✅ | ❌ |
| 編輯詢價紀錄 | ✅ | ✅ | ✅ | ✅（自己建立的） | ❌ |
| 刪除詢價紀錄 | ✅ | ✅ | ✅ | ✅（自己建立的） | ❌ |

**驗收標準**：

```gherkin
AC-011-08：新增詢價紀錄
Given PM 在廠商詳情頁「詢價紀錄」Tab 點擊「+ 新增詢價紀錄」
When 填寫詢價標題「2026 Q3 KOL 媒合詢價」、詢價日期、報價區間「NT$50,000～80,000」後儲存
Then 詢價紀錄出現在列表中，顯示標題、日期、建立者
And 此紀錄不產生任何採購申請或 APRecord

AC-011-09：詢價紀錄與採購獨立
Given 廠商 A 有 3 筆詢價紀錄、1 筆採購申請
When 查看廠商詳情頁
Then 「詢價紀錄」Tab 顯示 3 筆，「採購紀錄」Tab 顯示 1 筆
And 兩者資料互不影響
```

---

## 14. 驗收標準（Given / When / Then）

**AC-011-01：廠商建立基本流程**
- Given Admin 登入，When 填寫廠商名稱、法人類型（公司）、合作頻率類型（常態），點擊「建立」，Then 廠商以 `status = active` 建立成功，出現在廠商列表中。

**AC-011-02：個人廠商勞報單警示**
- Given 廠商 `entity_type = individual`、`labor_report_status = pending`，When 在 REQ-0042 進行 AP 確認付款操作，Then 系統顯示警示訊息「尚未收取勞報單，請確認後再進行匯款」，操作者可選擇確認繼續或取消。

**AC-011-03：合約編號自動產生**
- Given Admin 為廠商新增合約，When 儲存合約，Then 系統自動產生合約編號（格式 `HY[民國年][流水號]`），欄位唯讀不可修改。

**AC-011-04：付款資訊全面開放（v8.6 改寫）**
- Given PM/PD 登入查看廠商詳情，When 點擊「付款資訊」Tab，Then 系統正常顯示完整付款資訊（戶名、銀行、分行、完整帳號），不顯示遮罩、不阻擋存取。

**AC-011-05：停用廠商**
- Given Manager 將廠商標記為 `inactive`，When 在 REQ-0041 專案執行新增委外廠商，Then 已停用廠商不出現在選單中；但既有關聯（歷史紀錄）保留不刪除。

**AC-011-06：廠商搜尋**
- Given 廠商列表，When 輸入廠商名稱關鍵字，Then 系統即時過濾顯示符合的廠商，回應時間 ≤ 1 秒。

**AC-011-07：PM/PD 完整操作廠商合約（v8.6 改寫）**
- Given PM/PD 登入，When 查看廠商詳情「合約紀錄」Tab，Then 可看到合約列表，並可點擊「新增合約」或「編輯」按鈕，比照 Admin / Manager 完整操作。

---

## 14. 階段化開發說明（v8.3 更新：不適用）

> ⚠️ **v8.3 說明**：本節原規劃 P0 暫行欄位（`vendor_name_temp` 文字暫代）與 P1 正式上線後的資料遷移計畫。依目前開發排程，REQ-0011（廠商名錄）、REQ-0040/0041（專案建立／執行）、REQ-0042（廠商採購成本管理）為同步開發，不分階段先後上線，故不需要任何暫代欄位或遷移計畫。`VendorQuoteItem.vendor_id` 自開發起即為必填 FK，直接指向正式建立的 `Vendor` 主檔記錄。本節保留為歷史紀錄，不再作為開發規格。

---

## 15. 待決策事項（Open Issues）

| 編號 | 類型 | 問題 | 影響範圍 | 狀態 |
|------|------|------|---------|------|
| B-39 | 業務決策 | 常態性廠商的定期付款是否需建立「定期 AP 排程」，或維持手動建立應付紀錄？ | REQ-0042 AP 自動化設計 | ✅ `resolved`（v8.8）：維持手動建立 APRecord，不建立定期排程 |
| B-40 | 業務決策 | 廠商合約 PDF 是直接上傳至系統，還是僅存放 Google Drive 外部連結？ | 儲存空間規劃 | ✅ `resolved`（v8.8）：直接上傳至系統。與 T-16（附件儲存方案）統一決策 |
| B-32 | 業務決策 | ROLE_FINANCE 財務角色確認後，付款資訊查看與勞報單更新的權限歸屬 | RBAC 矩陣 | ✅ `resolved`（v5.0）：ROLE_FINANCE 正式納入，付款資訊查看與勞報單狀態更新均已補入 §8 RBAC 矩陣 |

---

## 16. 與其他 REQ 的關係

```
REQ-0001（RBAC）
  └─→ 本文件（所有廠商操作需角色驗證）

REQ-0002（系統設定）
  └─→ 本文件（S-10 廠商種類 / 專長標籤設定群組，✅ B-41 resolved）

REQ-0011（廠商名錄）← 本文件
  │
  └─→ REQ-0042（廠商採購成本管理）：
          VendorQuote.vendor_id FK 目標（v9.8：VendorQuoteItem 廢棄，廠商直接關聯至 VendorQuote 主表）
          採購申請廠商主體、AP 應付款記錄來源
          個人廠商勞報單狀態在 AP 付款前觸發警示
          ⚠️ 廠商選單同時供 REQ-0041 專案執行 Tab 6「廠商採購」使用
          （兩者共用同一張 VendorQuote，見 REQ-0042 §10.1 雙入口說明）

  └─→ VendorInquiry（詢價紀錄，v9.8 新增）：
          掛在廠商詳情頁「詢價紀錄」Tab；與 VendorQuote 完全獨立
```

---


---

# §12｜REQ-0025 開案交接完整流程（v7.4 廢止）

> ⚠️ **v7.4 廢止說明**：REQ-0025（開案交接）功能已於 v7.4 合併入 REQ-0040（專案建立）的「建立專案」流程。本章節保留為歷史紀錄與移轉說明，不再作為開發規格。

| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0025 |
| **狀態** | ⚠️ **廢止（v7.4）** — 功能合併入 REQ-0040 建立專案流程 |
| **最後更新** | 2026-06-24 |
| **取代文件** | REQ-0040 §4（建立專案流程）、§9.3（ProjectMember 資料表） |

---

## 廢止原因

原 REQ-0025 設計為獨立的「開案交接」步驟（在報價單頁面由全角色操作，填寫五大分工區塊後自動建立 Project），經業務討論後決定：

1. 建立專案（含部門指派與人員分工）屬於管理層決策，應限定 Admin / Executive / Manager 執行，不應對全角色開放
2. 「開案交接」與「建立專案」是同一個業務動作，分成兩個步驟造成流程冗長
3. 新的部門組合制（`ProjectTeamDepartment` + `ProjectMember`）比原五大區塊制更能反映組織架構的實際情況

---

## 原設計的對應關係（供移轉參考）

| 原 REQ-0025 概念 | v7.4 對應設計 |
|-----------------|--------------|
| Onboarding 主表 | Project 本身（建立即開案） |
| OnboardingMember | ProjectMember |
| 五大區塊（①必填、②運營、③廣告、④整合、⑤設計）| 部門組合制（ProjectTeamDepartment，依費用類型決定） |
| 案件分類（七類）| 由報價單費用類型自動推導，不需手動選擇 |
| 業務來源 / 簽約成交 欄位 | 移至 Project.notes 或未來商機模組（REQ-0020）記錄 |
| PD 欄位 | Project.pd_user_id |
| 開案更正（Onboarding amend）| 人員異動調整（ProjectMember assigned_to / 新建記錄）|
| B-36（多人貢獻權重）| 延續至 REQ-0040，仍為 open |

---

## 資料移轉說明

P0 期間（REQ-0025 尚未上線）的現有進行中專案，應在 v7.4 上線後由 Admin 補建 `ProjectTeamDepartment` 與 `ProjectMember` 記錄：

1. Admin 進入各進行中專案，點擊「設定服務團隊」
2. 依現行「客戶案件負責總表」的分工資料，為每個部門類型選擇部門並指派 MPM / SPM
3. 歷史紀錄中若有 `Project.notes` 記錄的人員分工文字，保留作為備考，不刪除

> ⚠️ **遷移工作量評估**：目前進行中主要專案約 24 個，補建部門與人員資料估計需 Admin 花費 3～5 小時，建議在 v7.4 上線的「資料移轉 Sprint」統一處理。

---

*— REQ-0025 廢止說明結束（v7.4）—*

---


# §13｜REQ-0026 客戶分級系統


| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0026 |
| **Use Case ID** | UC-026 |
| **PRD 章節** | 5.3.7 |
| **所屬模組** | F-01 Core 1 實體資料層 |
| **優先級** | `P1` |
| **狀態** | `open` — 分級門檻預設值已從財務客戶分級表確認；B-33 確認後更新設定介面預設值 |
| **最後更新** | 2026-05-12 |
| **依賴關係** | REQ-0001（RBAC）、REQ-0010（客戶主檔，Brand 層掛載 `customer_grade` 欄位）、REQ-0002（系統設定 S-03，分級門檻設定值來源）、REQ-0050（AR/AP 對帳，月收款金額來源） |
| **被依賴** | REQ-0060（老闆戰情室，客戶分級分佈 KPI） |

---

## 1. 背景與設計動機

現況：客戶分級每季由財務手動查多張表格計算、更新通知散落 LINE，PM 難追蹤自己負責客戶的分級變化。目的：依 AR 收款數據自動計算品牌分級建議值（S/A/B/C/D），Finance 審閱確認後直接發布回寫 `Brand.customer_grade`；Published 後如有業務調整需求，Finance / Manager（限負責品牌）/ Admin 可直接修正分級，無需申請審核；並通知相關人員。

---

## 2. 功能描述

> 系統應依客戶每季的月均收款金額（廣告實收 + 顧問實收）與廣告月投放金額，自動計算 S/A/B/C/D 五級客戶分級建議值；由 Finance 在系統內審閱確認後直接發布；Published 後 Finance / Manager（限負責品牌）/ Admin 可直接修正單筆分級，無需申請審核，修改記錄至稽核日誌；分級歷史永久保留；發布後自動通知相關人員。

---

## 3. 分級計算規則

### 3.1 分級標準（來源：財務客戶分級表）

分級以**當季月均服務費（廣告實收 + 顧問實收）** 或 **廣告月投放金額** 擇一達標即可晉級。

| 分級 | 月收款（廣告實收 + 顧問實收） | 廣告月投放金額 |
|------|------------------------------|----------------|
| **S** | ≥ 20 萬/月 | 或 ≥ 75 萬/月 |
| **A** | 12 萬 ～ 20 萬/月 | 或 45 萬 ～ 75 萬/月 |
| **B** | 5 萬 ～ 12 萬/月 | 或 20 萬 ～ 45 萬/月 |
| **C** | 2 萬 ～ 5 萬/月 | 或 10 萬 ～ 20 萬/月 |
| **D** | < 2 萬/月 | 或 < 10 萬/月 |

> 📋 以上門檻值為**系統預設值**，由 REQ-0002 S-03 系統設定後台維護，Admin 可每季調整，不需重新部署。

### 3.2 固定規則（不可由設定後台修改，寫入業務邏輯）

**BR-026-01（顧問案保底規則）**：凡有**顧問案**的客戶品牌，無論月收款金額多少，分級最低為 **B 級**，此規則為**強制鎖定**。

- 判斷依據：該 Brand 下有任何 `service_category = '顧問服務'` 的 Service，且狀態為 `active`
- 此規則優先於金額計算結果且不可被任何角色覆蓋：若金額計算結果為 C 或 D，系統自動將分級鎖定為 B；若金額達標可晉升至 A 或 S，依正常金額規則計算
- 系統層阻擋：任何角色嘗試將有顧問案的品牌分級調低至 C 或 D 時，UI 顯示 ⛔ 錯誤提示「此品牌有顧問案，分級不可低於 B 級」，操作不生效

> ⛔ **強制鎖定（v9.0）**：顧問案保底為系統硬規則，寫入業務邏輯層，不可透過任何操作（draft 階段微調 / Published 後直接修正）繞過。前端下拉選單中 C、D 選項顯示為不可選（disabled），後端 API 同樣驗證並拒絕。

**BR-026-02（計算基準：品牌層）**：分級以**品牌（Brand）**為計算主體，非客戶公司（Customer）整體。同一客戶公司旗下多個品牌各自獨立計算分級。

> ✅ **已確認（B-33）**：分級計算主體以**品牌（Brand）**為單位。`customer_grade` 欄位掛在 Brand 層；**Customer 主檔頁面不顯示客戶分級**，分級由各品牌詳情頁個別呈現（v5.6 決策）。GradingRecord.brand_id 為計算主鍵。

### 3.3 計算數據來源

| 數據項目 | 來源 | 說明 |
|----------|------|------|
| 廣告實收 + 顧問實收 | REQ-0050 AR 收款紀錄 | 從 `ARRecord.confirmed_at` 屬於當季範圍的 `billing_amount`（未稅）加總，除以月數取月均值 |
| 廣告月投放金額 | REQ-0050 Service 服務欄位 | 每月廣告投放金額；P1 階段需確認此欄位的資料維護方式（見 B-42） |
| 有無顧問案 | REQ-0041 Service | 品牌下是否有 `service_category = '顧問服務'` 且 `status = active` 的服務 |

> ❓ **待業主確認（B-42）**：廣告月投放金額目前在哪個地方維護？是否已在 Service 欄位中記錄每月廣告代操金額？若尚未，P1 需補充 Service 的廣告投放金額欄位。

### 3.4 計算週期

| 項目 | 規格 |
|------|------|
| 自動計算觸發 | 每季結帳月份（3/6/9/12 月）次月 1 日 Cron Job 自動執行 |
| 計算區間 | 前季三個月的 AR 收款數據（已 `confirmed` 狀態） |
| 產出 | 所有 Brand 的「建議分級」草稿，狀態為 `draft`，等待財務確認 |
| 手動觸發 | Admin / Manager 可在任意時間手動觸發重新計算（用於臨時確認分級） |

---

## 4. 分級確認流程

> ✅ **B-43 resolved**（v9.0 更新）：季度分級確認簡化為單步驟——Finance 直接審閱並發布，無需 Executive 整批核准。Published 後分級修正同樣無需申請審核：Finance / Manager（限負責品牌）/ Admin 可直接修改生效，操作自動記錄至 REQ-0003 稽核日誌。

### 4.1 季度標準流程

```
[Cron Job 自動計算]
    每季結帳月份次月 1 日自動執行
    產生 GradingDraft（status: draft）+ 所有 Brand 的 GradingRecord
         ↓
[draft 階段：Finance 審閱與微調]
    Finance（及 Admin）可操作此階段
    Finance 逐筆查看各品牌建議分級（系統依 AR 數據計算）
    Finance 可手動微調 final_grade（需填調整原因）
    ⛔ 有顧問案的品牌，C / D 選項為 disabled，不可選擇
    → 寫入 GradingRecord.overridden_by（Finance user_id）
         ↓
[Finance 直接發布（draft → published）]
    Finance 完成全部品牌審閱後，點擊「發布分級結果」
    GradingDraft.status → published
    GradingDraft.published_at / published_by 填入
    所有 Brand.customer_grade 更新為 final_grade
    GradingRecord.approved_at 填入時間戳
    操作記錄至 REQ-0003 稽核日誌
         ↓
[通知]
    PM 收到自身負責品牌中「有分級異動」的通知（站內通知）
    Manager / Admin / Finance 收到整季發布摘要（站內通知 + Email）
```

### 4.2 Published 後修正流程（GradingRevision）

```
[Finance / Manager / Admin 發現需要修正]
    Finance：可針對任何品牌直接修正
    Manager：只能針對自身負責品牌直接修正
    Admin：可針對任何品牌直接修正
    填寫：新分級（revised_grade）+ 修正原因（revision_reason，必填）
    ⛔ 有顧問案的品牌，C / D 選項為 disabled，系統阻擋並顯示錯誤提示
         ↓
[直接生效，無需申請審核]
    Brand.customer_grade 立即更新為 revised_grade
    建立 GradingRevision 紀錄（永久保留，原 GradingRecord 不動）
    操作自動記錄至 REQ-0003 稽核日誌
    通知：相關 PM（負責該品牌）收到分級變更通知（站內通知）
```

---

## 5. 資料模型

### 5.1 Brand（品牌）更新欄位

P0 階段 `Brand.customer_grade` 暫顯示「—」，P1 起激活以下欄位：

| 欄位 | 型別 | 說明 |
|------|------|------|
| `customer_grade` | ENUM('S','A','B','C','D') | 目前生效的分級，由最新 `GradingRecord.final_grade` 連動 |
| `grade_updated_at` | TIMESTAMP | 最後一次分級更新時間 |
| `grade_override_reason` | TEXT | 若本次分級為手動微調，記錄原因 |

> 📋 設計說明：`customer_grade` 掛在 Brand 層，Customer 主檔頁面顯示時取旗下各品牌的最高分級作為公司代表分級（唯讀計算值，不單獨儲存）。

### 5.2 GradingRecord（分級歷史紀錄）

每次分級發布建立一筆紀錄，永久保留：

| 欄位 | 型別 | NOT NULL | 說明 |
|------|------|----------|------|
| `id` | UUID | ✅ | 主鍵 |
| `grading_draft_id` | UUID | ✅ | FK → GradingDraft.id，所屬的季度草稿批次；確保重新計算時（多版 GradingDraft）每筆 GradingRecord 只屬於唯一的一份草稿 |
| `brand_id` | UUID | ✅ | FK → Brand.id |
| `grading_period` | VARCHAR(7) | ✅ | 計算基準季度，格式 `YYYY-QN`，例 `2026-Q1`（與所屬 GradingDraft.grading_period 一致，保留作查詢索引與可讀性用） |
| `calculated_grade` | ENUM('S','A','B','C','D') | ✅ | 系統自動計算的建議分級 |
| `final_grade` | ENUM('S','A','B','C','D') | ✅ | 發布後的最終分級（含手動微調結果） |
| `is_overridden` | BOOLEAN | ✅ | 是否有手動微調（calculated ≠ final） |
| `overridden_by` | UUID | ❌ | FK → User.id，最終生效的微調操作者（Finance confirmed 前的最後一次修改人；完整修改軌跡見 REQ-0003 稽核日誌） |
| `override_reason` | TEXT | ❌ | 手動微調原因（`is_overridden = true` 時必填） |
| `avg_monthly_revenue` | DECIMAL(12,0) | ✅ | 本季月均收款金額（廣告實收 + 顧問實收，未稅） |
| `avg_monthly_ad_spend` | DECIMAL(12,0) | ❌ | 本季月均廣告投放金額（若無廣告服務則為 null） |
| `has_consulting` | BOOLEAN | ✅ | 是否有顧問案（影響保底規則） |
| `applied_rule` | VARCHAR(50) | ❌ | 觸發的特殊規則說明（例：`consulting_floor_B`） |
| `confirmed_by` | UUID | ❌ | FK → User.id，財務確認者 |
| `confirmed_at` | TIMESTAMP | ❌ | 財務確認時間 |
| `approved_by` | UUID | ❌ | FK → User.id，主管核准者 |
| `approved_at` | TIMESTAMP | ❌ | 核准發布時間 |
| `created_at` | TIMESTAMP | ✅ | 系統建立時間（Cron Job 執行時） |

### 5.3 GradingDraft（季度分級草稿，發布前暫存）

| 欄位 | 型別 | NOT NULL | 說明 |
|------|------|----------|------|
| `id` | UUID | ✅ | 主鍵 |
| `grading_period` | VARCHAR(7) | ✅ | 季度，格式 `YYYY-QN` |
| `status` | ENUM('draft','published') | ✅ | 草稿狀態（說明見下方） |
| `generated_at` | TIMESTAMP | ✅ | Cron Job 產生時間 |
| `published_at` | TIMESTAMP | ❌ | Finance 發布時間（`status → published` 時填入） |
| `published_by` | UUID | ❌ | FK → User.id，執行發布的 Finance / Admin |
| `total_brands` | INT | ✅ | 本次計算的品牌總數 |
| `grade_changed_count` | INT | ✅ | 分級與上一季相比有變化的品牌數 |

**status 狀態說明：**

| 狀態 | 業務意義 | 可操作角色 | 下一步 |
|------|---------|-----------|-------|
| `draft` | Cron Job 產生後的初始狀態；Finance / Admin 審閱並微調各品牌分級；有顧問案品牌的 C / D 選項系統層 disabled | Finance、Admin | Finance 審閱完畢後直接點擊「發布分級結果」|
| `published` | Finance 發布完成；`Brand.customer_grade` 已批次更新；所有欄位鎖為唯讀，不可再修改；後續修正走 GradingRevision 流程（§5.4） | —（唯讀） | — |

> 📋 GradingDraft 為「本季整批草稿」的封面記錄；各品牌的個別建議值存於 `GradingRecord`（`approved_at = null` 為未發布狀態），Finance 發布後統一寫入 `GradingRecord.approved_at`。Finance 微調後 `GradingRecord.overridden_by` 更新為該 Finance 的 user_id。

---

### 5.4 GradingRevision（Published 後分級修正紀錄）

Published 後若需修正單一品牌分級，建立 GradingRevision 子紀錄，直接生效，無需審核。原 GradingRecord 永久保留不動：

| 欄位 | 型別 | NOT NULL | 說明 |
|------|------|----------|------|
| `id` | UUID | ✅ | 主鍵 |
| `grading_record_id` | UUID | ✅ | FK → GradingRecord.id，所屬的原季度發布紀錄 |
| `brand_id` | UUID | ✅ | FK → Brand.id（冗餘儲存，方便查詢） |
| `grading_period` | VARCHAR(7) | ✅ | 與所屬 GradingRecord.grading_period 一致 |
| `original_grade` | ENUM('S','A','B','C','D') | ✅ | 修正前的生效分級（來自 GradingRecord.final_grade 或上一筆 GradingRevision.revised_grade） |
| `revised_grade` | ENUM('S','A','B','C','D') | ✅ | 修正後的目標分級（有顧問案時不可為 C 或 D，後端 API 層驗證拒絕） |
| `revision_reason` | TEXT | ✅ | 修正原因（必填） |
| `modified_by` | UUID | ✅ | FK → User.id，執行修正的 Finance / Manager / Admin |
| `modified_at` | TIMESTAMP | ✅ | 修正生效時間 |

> 📋 `Brand.customer_grade` 取值優先順序：該品牌最新一筆 GradingRevision.revised_grade → 若無則取 GradingRecord.final_grade。分級歷史 Tab 呈現時，GradingRevision 縮排顯示在對應季度 GradingRecord 下方，並標注修正者角色（Finance / Manager / Admin）。

---

## 6. 分級確認介面規格（UI）

### 6.1 分級管理頁（季度選擇器 + 列表）

操作者為 Finance、Manager（限負責品牌）、Admin、Executive。

**頁面頂部**：季度選擇器下拉（`YYYY-QN` 格式，列出所有已產生的 GradingDraft）。預設顯示最新一季。切換至歷史季度時，所有欄位鎖為唯讀，操作按鈕隱藏。

**篩選列**（列表上方）：分級（多選：S/A/B/C/D）、異動狀態（升級 / 降級 / 不變）、是否有顧問案（是 / 否）、負責 PM（下拉）。

**頁面右上角操作按鈕**：
- 「發布分級結果」：僅 Finance / Admin 可見，草稿狀態為 `draft` 時啟用；點擊後彈出確認 Modal（顯示本次發布品牌總數、有異動品牌數、顧問案保底品牌數），確認後執行 `draft → published`

### 6.2 品牌分級列表

逐筆顯示所有品牌的建議分級：

| 欄位 | 說明 |
|------|------|
| 客戶品牌名稱 | `Customer.company_name` + `Brand.brand_name` |
| 服務項目 | 服務類型標籤（廣告 / 顧問 / 社群 / 抽成）；顧問案標籤視覺規格見 §6.4，永遠排在標籤列最前位 |
| 本季月均服務費 | `avg_monthly_revenue` 格式化顯示 |
| 上季分級 | 上一筆 `GradingRecord.final_grade` |
| 系統建議分級 | `calculated_grade`，若有顧問案保底規則觸發顯示標記 |
| 最終分級 | 下拉選單（S/A/B/C/D），預設帶入建議分級，可手動修改；有顧問案的品牌，C、D 選項顯示為 disabled（不可選），下拉旁顯示 ⛔ 鎖定標記與 tooltip 說明 |
| 調整原因 | 若手動修改則顯示必填文字輸入框 |
| 分級異動標記 | 相較上季：升級 🟢 / 降級 🔴 / 不變 — |

### 6.3 篩選器

- 分級（多選：S/A/B/C/D）
- 異動狀態（升級 / 降級 / 不變）
- 是否有顧問案（是 / 否）
- 負責 PM（下拉，顯示該 PM/PD 負責的品牌）

---

## 6.4 顧問案標籤視覺規格

> ✅ **v9.0 新增**：顧問案為分級系統的強制保底條件（BR-026-01），在所有出現服務類型標籤的介面中，「顧問案」標籤必須以最顯眼方式呈現，確保人員立即識別。

**適用範圍：** 以下三處介面均須套用本規格。

| 介面位置 | 說明 |
|---------|------|
| 客戶分級管理頁（§6.2 品牌分級列表）| 品牌列表的「服務項目」欄 |
| 客戶列表頁（REQ-0010 §9.1）| 品牌列表的服務標籤欄 |
| 品牌詳情頁（REQ-0010 §9.3 Tab 1 品牌資訊）| 服務類型標籤群組 |

**顧問案標籤視覺規格：**

| 屬性 | 一般服務標籤 | 顧問案標籤 |
|------|------------|-----------|
| 字體粗細 | Regular（400） | **Bold（700）** |
| 字體大小 | 基準尺寸（12px） | **加大（14px）** |
| 文字顏色 | 系統預設（灰色系） | **#B91C1C（深紅色）** |
| 背景色 | 系統預設（淺灰） | **#FEE2E2（淺紅背景）** |
| 顯示位置 | 標籤列中依服務類型順序排列 | **永遠排在標籤列最前位（index 0）** |
| 圖示 | 無 | 標籤左側加 `●` 圓點標記 |

**實作說明：**
- 判斷依據：品牌下有任何 `service_category = '顧問服務'` 且 `status = active` 的服務項目時，即套用顧問案標籤視覺規格
- 顧問案標籤文字顯示為「顧問案」（不顯示具體服務項目名稱，以保持標籤列簡潔）
- 同一品牌若有多個顧問服務，仍只顯示一個「顧問案」標籤
- 其餘服務類型標籤（廣告 / 社群 / 抽成 / 其他）維持原有視覺規格，排列在顧問案標籤之後

---

## 7. 各分級對應的服務頻率建議（唯讀參考資訊）

系統在客戶主檔顯示分級時，附帶對應的建議服務頻率說明（唯讀，供 PM 參考）：

| 分級 | 顧客會議頻率建議 | 成效回報頻率 |
|------|----------------|-------------|
| S | 周會議 | 每日回報前天數據 |
| A | 周會議 / 雙周會議 | 每周一成效報告 |
| B | 周報表 / 雙周會議 | 每日回報前天數據（廣告）/ 每周一成效報告 |
| C | 月會議 | 每週一回報投放金額 / 每月月初整月成效狀況 |
| D | 月報表 | 每週一回報投放金額 / 每月月初整月成效狀況 |

> 📋 此表為「執案單位可視狀況微調」的參考，非強制規範。系統僅顯示，不做流程管控。

---

## 8. 通知規格

### 8.1 通知觸發時機

| 事件 | 通知對象 | 通知管道 | 內容摘要 |
|------|---------|---------|---------|
| 季度分級草稿產生 | Admin / Manager（財務角色） | 站內通知 + Email | 「2026-Q2 客戶分級草稿已產生，共 N 個品牌，請至系統確認」 |
| 分級發布完成 | 所有 PM（各自負責客戶） | 站內通知 | 「您負責的 [品牌名稱] 分級已更新：A → B，請參閱新服務頻率建議」（僅發送有異動的） |
| 分級發布完成 | Manager / Admin / Finance | 站內通知 + Email | 整季分級發布摘要 |

> ✅ **B-34 resolved（v5.0）**：全系統通知統一為站內 + Email，不使用 LINE；分級更新通知同樣適用此規則。

---

## 9. RBAC 權限矩陣

| 操作 | Admin | Executive | Manager | PM/PD | Finance |
|------|-------|-----------|---------|-------|---------|
| 查看客戶分級（品牌資訊 Tab） | ✅ | ✅ | ✅ | ✅（負責品牌） | ✅ |
| 查看本季分級草稿總覽 | ✅ | ✅（唯讀） | ✅（唯讀） | ❌ | ✅ |
| draft 階段微調建議分級 | ✅ | ❌ | ❌ | ❌ | ✅ |
| 直接發布分級結果（draft → published） | ✅ | ❌ | ❌ | ❌ | ✅ |
| 手動觸發重新計算 | ✅ | ✅ | ❌ | ❌ | ❌ |
| Published 後直接修正分級（GradingRevision） | ✅ | ❌ | ✅（限負責品牌） | ❌ | ✅ |
| 查看分級歷史紀錄（含 GradingRevision） | ✅ | ✅ | ✅ | ✅（自身負責品牌） | ✅ |

> 📋 **v9.0 更新**：Manager 在 draft 階段為唯讀，不可微調；Published 後可針對自身負責品牌直接修正分級，無需申請審核，修改立即生效並記錄至稽核日誌。有顧問案品牌的 C / D 分級選項在所有操作情境下均為系統層 disabled，任何角色皆不可繞過。

---

## 10. User Story

**US-026-01**：As Finance，我想在季末看到系統自動產生的分級建議草稿，so that 不需手動查找多張 Sheets 計算，節省每季對帳時間。

**US-026-02**：As Manager，我想在分級 Published 後針對自身負責品牌直接修正分級，so that 可反映金額數字以外的業務實際狀況（如客戶戰略重要性），修改立即生效不需等待審核。

**US-026-03**：As PM，我想在分級發布後立即收到通知（只收自己負責的品牌），so that 能及時調整服務頻率與會議安排。

**US-026-04**：As Manager，我想查看歷史分級紀錄（含 GradingRevision 修正軌跡），so that 可追蹤客戶價值變化趨勢，作為策略評估依據。

**US-026-05**：As Finance，我想查看本季所有 GradingRevision 直接修正紀錄（含修正者、修正前後分級、修正原因），so that 可追蹤 Published 後的所有分級異動軌跡，確保財務數據準確。

---

## 11. API 草稿（供後端參考，非最終規格）

```
# 分級草稿管理
GET    /api/v1/grading/drafts                              # 草稿列表（含歷史季度）
GET    /api/v1/grading/drafts/:period                      # 特定季度草稿詳情（品牌列表）
POST   /api/v1/grading/drafts/:period/generate             # 手動觸發重新計算（Admin / Executive）
PATCH  /api/v1/grading/drafts/:period/brands/:bid          # Finance / Admin 調整單一品牌最終分級（draft 階段；有顧問案品牌 revised_grade = C/D 時 API 層拒絕並回傳 422）
POST   /api/v1/grading/drafts/:period/publish              # Finance / Admin 直接發布（draft → published）

# 分級歷史
GET    /api/v1/brands/:id/grading-history                  # 品牌分級歷史列表（含 GradingRevision）
GET    /api/v1/customers/:id/grading-summary               # 客戶公司分級摘要（旗下各品牌）

# 給客戶主檔使用
GET    /api/v1/brands/:id/current-grade                    # 品牌當前分級（優先取最新 GradingRevision.revised_grade，次取 GradingRecord.final_grade）

# Published 後直接修正（GradingRevision，無審核流程）
POST   /api/v1/grading/records/:record_id/revisions        # Finance / Manager / Admin 直接建立修正紀錄並立即生效（有顧問案品牌 revised_grade = C/D 時回傳 422）
GET    /api/v1/grading/revisions                           # 查看所有 GradingRevision 修正紀錄（Finance / Admin 可查全部；Manager 僅限負責品牌）
```

---

## 12. 驗收標準（Given / When / Then）

**AC-026-01：自動計算觸發**
- Given 系統時間到達當季結帳月份次月 1 日 00:00，When Cron Job 執行，Then 系統自動計算所有 `status = active` 品牌的季度月均收款金額，產生 `GradingDraft`（`status = draft`）與對應的 `GradingRecord`（`approved_at = null`）。

**AC-026-02：顧問案保底規則（強制鎖定）**
- Given 品牌 A 本季月均收款金額為 3 萬（依金額應為 C 級），且有 `service_category = '顧問服務'` 的 active 服務，When 系統計算建議分級，Then `calculated_grade = B`（保底規則觸發），`applied_rule = 'consulting_floor_B'`，分級欄位中 C / D 選項顯示為 disabled。

**AC-026-02b：顧問案強制鎖定阻擋**
- Given Finance 在 draft 階段嘗試將有顧問案的品牌 B 分級手動調低至 C 級，When 前端下拉選擇 C，Then UI 層 C 選項為 disabled 不可選；若直接呼叫 API，後端回傳 HTTP 422 錯誤並帶有錯誤訊息「此品牌有顧問案，分級不可低於 B 級」，操作不生效。

**AC-026-02c：顧問案達標可升級**
- Given 品牌 C 有顧問案（保底 B），且本季月均收款金額為 15 萬（應為 A 級），When 系統計算建議分級，Then `calculated_grade = A`（金額達標升級，顧問案保底規則不阻擋向上升級），`applied_rule = 'consulting_floor_B'` 仍記錄但不影響最終結果。

**AC-026-03：手動微調與原因必填**
- Given Finance 將品牌的最終分級從系統建議的 A 調整為 S，When 點擊儲存，Then 系統要求填寫「調整原因」，若未填寫則顯示錯誤訊息，不允許儲存。

**AC-026-04：直接發布與歷史記錄**
- Given Finance 完成審閱確認所有品牌分級無誤，When Finance 點擊「發布分級結果」並在確認 Modal 中確認，Then 所有 `GradingRecord.approved_at` 填入當前時間戳、`Brand.customer_grade` 更新為 `final_grade`、`GradingDraft.status = published`、`GradingDraft.published_by = Finance.user_id`；操作記錄至 REQ-0003 稽核日誌。

**AC-026-04b：Published 後直接修正**
- Given Finance 在 Published 狀態下將品牌 D 分級從 B 直接修正為 A（填寫修正原因），When 點擊確認，Then `Brand.customer_grade` 立即更新為 A、新建 GradingRevision 紀錄（`modified_by = Finance.user_id`）、操作記錄至稽核日誌、相關 PM 收到站內通知「品牌 D 分級已更新：B → A」。

**AC-026-05：PM 分級通知（僅有異動的）**
- Given Finance 完成發布，When PM/PD A 負責的品牌 X 分級從 A 升為 S、品牌 Y 分級不變，Then PM A 收到品牌 X 的分級變化通知，不收到品牌 Y 的通知。

**AC-026-06：P0 暫行值激活**
- Given 執行 P1 上線部署，When 管理員執行初次分級計算（手動觸發），Then 所有 Brand 的 `customer_grade` 從「—」更新為實際分級值，客戶主檔分級欄位正式啟用。

---

## 13. P0 暫行方案激活說明

P0 階段 `Brand.customer_grade`（欄位已設置，值為 NULL）顯示「—」（NULL 或空值）。

P1 REQ-0026 上線後，初始化步驟：

1. 管理員手動觸發「歷史分級匯入」：依現行財務客戶分級表匯入最近一季的分級結果
2. 或等待下一個季度 Cron Job 自動觸發計算
3. 首次發布後 `customer_grade` 正式啟用，客戶主檔、老闆戰情室（REQ-0060）同步顯示

> ⚠️ **資料前置條件**：REQ-0026 計算依賴 REQ-0050 的 AR 收款紀錄（`ARRecord.confirmed_at` 有確認收款紀錄）。若 P0 阶段 AR 資料填入不完整，初次計算結果可能有誤，需人工核對。

---

## 14. 待決策事項（Open Issues）

| 編號 | 類型 | 問題 | 影響範圍 | 狀態 |
|------|------|------|---------|------|
| B-33 | ~~業務決策~~ | ~~分級計算主體：品牌（Brand）層 or 客戶公司（Customer）層？~~ | ~~GradingRecord 資料架構、Customer 主檔顯示邏輯~~ | ✅ `confirmed`：品牌（Brand）層；Customer 主檔頁面不顯示分級，由各品牌詳情頁各自呈現（v5.6）|
| B-42 | 業務決策 | 廣告月投放金額目前在哪個欄位維護？P1 是否需要在 Service 補充廣告投放金額欄位供分級計算使用 | REQ-0041 Service 資料模型、分級計算數據來源 | `open` |
| B-43 | ~~業務決策~~ | ~~分級確認流程：「財務確認 → Manager 核准發布」兩步驟，或財務直接發布（單步驟）？~~ | ~~GradingDraft 狀態機、介面設計~~ | ✅ `resolved`（v9.0 更新）：單步驟確認。Finance 審閱並直接發布，移除 `confirmed` 中間態與 Executive 整批核准節點。Published 後修正同樣無需審核，Finance / Manager（限負責品牌）/ Admin 直接修改生效。 |

---

## 15. 與其他 REQ 的關係

```
REQ-0001（RBAC）
  └─→ 本文件（Finance 審閱確認並直接發布 / Finance / Manager / Admin 直接修正分級）

REQ-0002（系統設定 S-03）
  └─→ 本文件（S/A/B/C/D 分級門檻數值由設定後台控制，可每季調整）

REQ-0010（客戶主檔）
  └─→ 本文件（Brand.customer_grade 欄位由本 REQ 負責更新）

REQ-0050（AR / AP 對帳）
  └─→ 本文件（ARRecord 已確認收款數據為分級計算的數據來源）

REQ-0026（客戶分級系統）← 本文件
  │
  ├─→ REQ-0060（老闆戰情室）：
  │       客戶分級分佈 KPI（各等級客戶數量趨勢）
  │
  └─→ 客戶主檔頁面（REQ-0010 Customer / Brand 詳情）：
          customer_grade 欄位激活顯示，含分級歷史 Tab
```

---


---

# §14｜REQ-0042 廠商採購成本管理


| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0042 |
| **Use Case ID** | UC-042 |
| **PRD 章節** | 5.5.3 |
| **所屬模組** | F-04 Core 4 專案執行層 |
| **優先級** | `P1` |
| **狀態** | `open` — 規格初稿；B-38（成本核算觸發時機）、B-45（多層審批）待業主確認 |
| **最後更新** | 2026-06-30（v8.0：審核操作區補充顯示條件與非審核者視角說明） |
| **依賴關係** | REQ-0001（RBAC）、REQ-0011（廠商名錄，廠商主檔）、REQ-0030（工作流引擎，VENDOR_COST 工作流激活）、REQ-0040（專案建立，`project_id` FK）、REQ-0041（專案執行，`service_id` FK 選填；專案詳情頁「廠商採購」Tab 為本模組的單專案篩選視角，兩者共用同一張 VendorQuote 資料表） |
| **被依賴** | REQ-0051（全成本試算，`APRecord.ap_category = vendor_cost` 計入外部成本）、REQ-0011（個人廠商勞報單警示在 AP 付款時觸發） |

---

## 1. 背景與設計動機

現況：詢價結果靠 Email/LINE 傳遞、無事前成本核算、廠商報價 PDF 散落各雲端、AP 應付以暫行文字欄記錄。目的：PM/PD 在專案下建立採購申請，選定單一廠商並上傳報價 PDF（可選擇進一步歸屬至特定服務項目），填寫預估成本供毛利試算，觸發 VENDOR_COST 工作流審核；核定後自動建立 APRecord 計入外部成本，供 REQ-0051 全成本試算。詢價行為（採購前的非正式溝通）改由廠商名錄詳情頁「詢價紀錄」Tab 獨立記錄（見 REQ-0011 §擴充），不在本 REQ 範疇內。

---

## 2. 功能描述

> 系統應提供廠商採購成本管理功能，支援於專案下建立採購申請（可選擇進一步歸屬至特定服務項目，或留空掛於專案層級供跨服務採購使用）、選定單一廠商並上傳報價 PDF、填寫預估成本、透過 VENDOR_COST 工作流進行主管審核；核定通過後自動建立 APRecord 計入專案外部成本；個人廠商付款前觸發勞報單狀態檢查警示。採購申請可於兩處發起與查看：① 專案詳情頁「廠商採購」Tab（REQ-0041 §10 Tab 6，單專案篩選視角）；② 廠商採購成本管理獨立入口（REQ-0042 本模組，全公司匯總視角）。兩者共用同一張 `VendorQuote` 資料表，僅呈現視角不同。

---

## 3. 採購申請流程

```
【發起】PM / 操作者於「專案」下建立採購申請（兩處入口共用同一流程）
         - 入口 A：專案詳情頁「廠商採購」Tab（自動帶入 project_id）
         - 入口 B：廠商採購成本管理獨立入口（需手動選擇歸屬專案）
         - 填寫採購說明標題、採購類型、預估成本（必填）、預計完成日（選填）
         - 選擇歸屬服務項目（選填；跨服務採購可留空，掛於專案層級）
         - 選擇廠商（單一廠商，從 REQ-0011 廠商名錄選取）
         - 上傳廠商報價 PDF / 貼入連結（選填但建議填寫）
         - 填寫服務範圍說明（選填）
              ↓
【送審】操作者送出申請 → 觸發 VENDOR_COST 工作流
         - WorkflowInstance 建立，狀態 = pending_approval
         - 通知審核者（部門主管）
              ↓
【審核】部門主管在系統內審閱採購資訊與廠商報價
         ├── 核准 → 填寫核定金額（必填）、核定說明（選填）
         │           → 系統自動建立 APRecord（ap_category = vendor_cost）
         │           → 更新申請狀態 = approved
         │           → 通知操作者與財務行政
         └── 退回 → 填寫退回原因（必填）
                   → 通知操作者修改後重新送審
              ↓
【付款】財務行政在 AP 對帳列表確認付款（REQ-0050）
         - 個人廠商：檢查勞報單狀態（來自 REQ-0011）
         - 確認匯款 → APRecord.status = paid
```

---

## 4. 資料模型

### 4.1 VendorQuote（廠商採購申請）

> 📋 **v9.8 調整**：廢棄多廠商比價機制，改為單一廠商。原 `VendorQuoteItem` 子表廢棄，廠商選擇、報價金額、報價 PDF、服務範圍說明欄位直接移入 `VendorQuote` 主表。`estimated_amount` 改名為 `estimated_cost` 且改為必填。新增 `expected_completion_date`（預計完成日）。移除 `selected_vendor_quote_id`。

| 欄位 | 型別 | NOT NULL | 說明 |
|------|------|----------|------|
| `id` | UUID | ✅ | 主鍵；WorkflowInstance.source_id 指向此欄 |
| `project_id` | UUID | ✅ | FK → Project.id（採購歸屬專案；自專案詳情頁發起時自動帶入，自 REQ-0042 獨立入口發起時須手動選擇） |
| `service_id` | UUID | ❌ | FK → Service.id（採購歸屬服務項目，選填；留空代表掛於專案層級） |
| `purchase_title` | VARCHAR(100) | ✅ | 採購說明標題，例：「老撈 Q2 KOL 媒合」 |
| `purchase_type` | VARCHAR(50) | ✅ | 採購類型（口碑論壇 / 媒體採購 / 影音製作 / 廣告儲值 / 其他；來自 REQ-0011 廠商種類） |
| `estimated_cost` | DECIMAL(12,0) | ✅ | 預估成本（未稅，必填；原 `estimated_amount` 改名且改為必填） |
| `expected_completion_date` | DATE | ❌ | 預計完成日（選填） |
| `vendor_id` | UUID | ❌ | FK → Vendor.id（選定廠商，送審前必填） |
| `quote_amount` | DECIMAL(12,0) | ❌ | 廠商報價金額（未稅，選填） |
| `quote_file_url` | TEXT | ❌ | 廠商報價 PDF 連結（選填但建議填寫；見 §5 檔案處理說明） |
| `service_scope` | TEXT | ❌ | 廠商報價涵蓋的服務範圍說明（選填） |
| `status` | ENUM | ✅ | `draft` / `pending_approval` / `approved` / `rejected` / `cancelled` |
| `rejection_reason` | TEXT | ❌ | 退回原因（status = rejected 時必填，由審核者填寫） |
| `approved_amount` | DECIMAL(12,0) | ❌ | 主管核定的最終採購金額（未稅），核准時必填 |
| `approval_note` | TEXT | ❌ | 核定說明（選填，核准時填寫） |
| `ap_record_id` | UUID | ❌ | FK → APRecord.id（核准後自動建立的 AP 紀錄） |
| `notes` | TEXT | ❌ | 採購備註、特殊說明 |
| `created_by` | UUID | ✅ | FK → User.id，採購申請建立者 |
| `created_at` | TIMESTAMP | ✅ | |
| `updated_at` | TIMESTAMP | ✅ | |

### 4.2 VendorQuoteItem（v9.8 廢棄）

> ⚠️ **v9.8 廢棄說明**：原 `VendorQuoteItem` 子表設計用於支援多廠商比價（每筆對應一個廠商報價）。依 0727 會議決議，採購改為單一廠商，多廠商比價機制移除，`VendorQuoteItem` 資料表不建立。廠商、報價金額、報價 PDF、服務範圍說明欄位已移入 `VendorQuote` 主表（§4.1）。本節保留為歷史紀錄，不再作為開發規格。

### 4.3 APRecord（廠商欄位填入規則）

採購申請（`VendorQuote`）核准後，系統自動建立 `APRecord` 並完成以下欄位填入：

| 欄位 | 說明 |
|------|------|
| `vendor_id` | 從 `VendorQuote.vendor_id` 直接填入（v9.8：原從 VendorQuoteItem 取，現直接從主表取） |
| `vendor_quote_id` | FK → VendorQuote.id（採購申請來源） |
| `ap_category` | `vendor_cost`；REQ-0042 建立的 AP 皆為 `vendor_cost` |

> 📋 核准後由系統自動建立 APRecord 的欄位填入規則：
> ```
> APRecord.vendor_id       = VendorQuote.vendor_id（選定廠商）
> APRecord.ap_category     = 'vendor_cost'
> APRecord.project_id      = VendorQuote.project_id
> APRecord.amount_pretax   = VendorQuote.approved_amount（主管核定金額）
> APRecord.vendor_quote_id = VendorQuote.id
> APRecord.status          = 'pending'（等待財務確認付款）
> APRecord.accounting_month = 核准當月（YYYY-MM）
> ```

---

## 5. 廠商報價 PDF 檔案處理

> ❓ **待業主確認（B-40，延續 REQ-0011）**：廠商報價 PDF 是直接上傳至系統儲存，還是僅存放 Google Drive 外部連結？

**方案 A（系統上傳）**：`quote_file_url` 指向系統內部儲存路徑，需規劃檔案儲存空間（S3 或同等方案）。

**方案 B（外部連結）**：`quote_file_url` 為 Google Drive 分享連結，操作者先上傳至 Drive 再貼連結。維護成本低，但依賴 Drive 的可用性。

SA 建議在 P1 採方案 B（外部連結），降低首版複雜度；P2 視需求升級為系統上傳。

> ❓ **待業主確認（B-45）**：採購審核流程是否需要**兩層審批**（部門主管 → 財務主管），還是**單層**（部門主管核准即可，財務在 AP 端確認付款）？
>
> 現行流程為「詢價結果交部門主管審核確認，再送財務行政部進行合約管理與匯款」，SA 解讀為兩個分離的動作：主管決定採購（系統內審核）、財務處理付款（AP 對帳列表操作）。若業主希望財務也需在系統內「核准採購申請」才可建立 AP，則需在 VENDOR_COST 工作流設定中增加第二層審核者（`require_all = true`）。

---

## 6. 業務規則

### 6.1 單一廠商規則（BR-042-01）

> 📋 **v9.8 更新**：原多廠商比價規則（BR-042-01）廢棄，改為單一廠商制。

- 一個採購申請**只能選擇一個廠商**（`VendorQuote.vendor_id`）
- 送審前 `vendor_id` 為必填（廠商未選擇時系統阻擋送審）
- `estimated_cost`（預估成本）為必填，`quote_amount`（廠商報價金額）與 `quote_file_url` 為選填但建議填寫

### 6.2 核定金額規則（BR-042-02）

- 主管核准時，核定金額（`approved_amount`）為**必填**
- 核定金額預設帶入廠商報價金額（`quote_amount`）；若 `quote_amount` 為空則留白由主管手動填入
- `APRecord.amount_pretax` 以主管核定金額（`approved_amount`）為準，非廠商原始報價金額

### 6.3 個人廠商勞報單警示（BR-042-03）

採購申請所選廠商若 `entity_type = 'individual'`（來自 REQ-0011），且 `labor_report_status = 'pending'`：

- 在採購申請詳情頁（審核操作區上方）顯示警示：「此廠商為個人，勞報單尚未收取，請確認後再核准」
- 主管可選擇確認繼續（接受警示）或退回申請
- 財務在 AP 付款時同樣觸發 REQ-0011 的勞報單警示

### 6.4 利潤率影響（BR-042-04）

採購申請核准並建立 APRecord 後：

- `APRecord（vendor_cost）` 計入 REQ-0051 外部成本
- 若專案毛利率因此跌破 30% 門檻 → 系統在 REQ-0051 全成本試算頁面顯示橘色警示
- **不阻擋採購流程**，僅作資訊提示

> ⚠️ **業務規則提醒**（來源：業務開發流程 SOP）：委外執行案件的報價利潤率應控制在 30% 以上；系統在**報價單階段**（REQ-0021）對客戶端利潤率進行提示，REQ-0042 則在**成本核定後**對實際毛利率進行提示——前者為事前控制，後者為事後監控。

### 6.5 成本核算觸發時機（BR-042-05）

> ✅ **B-38 resolved（v9.8）**：`estimated_cost`（預估成本）改為必填（原 `estimated_amount` 選填），採購建立時即須填入，系統可於提案前即時計算預估毛利率（REQ-0051 試算介面）。廠商正式報價確定後，核定金額（`approved_amount`）於審核通過時填入，成為 APRecord 的正式金額依據。

### 6.6 採購申請取消規則（BR-042-06）

`VendorQuote.status = cancelled` 的觸發條件與後續處理：

| 情境 | 誰可操作 | 前提條件 | 後續 AP 處理 |
|------|---------|---------|------------|
| 建立者自行取消 | 採購申請建立者（PM / Manager / Admin） | `status = draft`（尚未送審） | 無 APRecord，無需處理 |
| 送審中強制取消 | Admin 僅限 | `status = pending_approval` | 無 APRecord，WorkflowInstance 自動設為 `cancelled` |
| 核准後取消 | **不允許**（改走核定金額修正） | — | 若需修正已核准金額，由 Admin 發起「開新採購申請」，舊申請維持 `approved` 作歷史紀錄 |

> ⚠️ **業務規則**：`status = approved` 的採購申請**不可取消**。若核定金額有誤，操作方式為：重新建立一筆採購申請並走完整審核流程，系統在同一服務項目下允許多筆 `approved` 的採購申請並存（各自對應獨立 APRecord）。原有 APRecord 的 `status` 改由財務行政在 AP 對帳頁面手動處理（標記作廢或調整金額）。

---

## 7. VENDOR_COST 工作流設定

`VENDOR_COST` 工作流類型已在 REQ-0030 宣告，與 REQ-0042 同步開發，開發起即完整設定並啟用：

| 設定項目 | 值 |
|---------|---|
| `workflow_type` | `VENDOR_COST` |
| `source_entity_type` | `VendorQuote` |
| 審核者 | 部門主管（由 REQ-0002 S-05 設定，VENDOR_COST 的 `approver_ids`） |
| 多人審核模式 | 依 B-45 確認；預設 `any_one`（任一主管核准即可） |
| 核准後行為 | 系統自動建立 APRecord（`ap_category = vendor_cost`） |
| 退回後行為 | 通知採購申請建立者，附退回原因；VendorQuote.status = rejected |

> ⚠️ **WorkflowConfig 設定前提**：Admin 須在系統設定後台（REQ-0002 S-05）為 VENDOR_COST 工作流設定各部門審核者，此為 REQ-0042 採購送審流程的前置依賴，建議於開發初期、Sprint 0 階段完成設定。

---

## 8. RBAC 權限矩陣

| 操作 | Admin | Manager | PM/PD | Finance |
|------|-------|---------|-------|---------|
| 查看採購申請列表（所有專案） | ✅ | ✅ | ❌ | ✅ |
| 查看採購申請（自身負責專案） | ✅ | ✅ | ✅ | ✅ |
| 建立採購申請 | ✅ | ✅ | ✅ | ❌ |
| 上傳廠商報價 PDF / 連結 | ✅ | ✅ | ✅ | ❌ |
| 送審（觸發 VENDOR_COST） | ✅ | ✅ | ✅ | ❌ |
| 審核採購申請（核准 / 退回） | ✅ | ✅ | ❌ | ❌ |
| 調整核定金額 | ✅ | ✅ | ❌ | ❌ |
| 查看 APRecord（採購付款） | ✅ | ✅ | ✅（自身案件，唯讀） | ✅ |
| 確認付款（AP.status → paid） | ✅ | ✅（財務角色，B-32 確認後更新） | ❌ | ✅ |

---

## 9. User Story

**US-042-01**：As PM，我想在專案下建立採購申請並上傳廠商報價單（可選擇進一步歸屬至特定服務項目），so that 主管可以在系統內審核，不再需要透過 LINE 群組傳遞報價資訊。

**US-042-02**：As PM，我想在採購申請中選定廠商並附上報價資訊，so that 主管審核時能在系統內看到完整的採購內容並做出有依據的決策。

**US-042-03**：As Manager，我想在審核時看到廠商報價 PDF 並調整核定金額，so that 最終計入成本的金額符合實際談定的價格，而非廠商原始開價。

**US-042-04**：As 財務行政（Admin/ROLE_FINANCE），我想在 AP 對帳列表看到已核定採購的付款紀錄，so that 不需再另行查找採購資訊，直接在系統確認匯款即可。

**US-042-05**：As Manager，我想在採購核定後即時看到專案毛利率的變化，so that 能在成本超支時及時介入調整服務範疇或客戶端報價。

---

## 10. UI 規格

### 10.1 採購申請入口

**入口 A：專案詳情頁（REQ-0041 §10 Tab 6「廠商採購」）**
- 位置：專案詳情頁 → 「廠商採購」Tab
- 顯示此專案所有採購申請列表（含已歸戶服務項目與未歸戶的專案層採購）
- `project_id` 自動帶入當前專案，不可修改
- 「新增採購申請」按鈕（PM / Manager / Admin 可見）

**入口 B：廠商採購成本管理（REQ-0042 獨立入口）**
- 位置：左側導覽列「廠商採購」
- 顯示全公司所有專案的採購申請列表，可依專案 / 廠商 / 狀態篩選
- `project_id` 須於建立表單中手動選擇
- 「新增採購申請」按鈕（PM / Manager / Admin 可見）

> 📋 **資料一致性**：兩入口寫入同一張 `VendorQuote` 資料表，僅呈現視角不同（入口 A 為單專案篩選、入口 B 為全公司匯總）。任一入口建立、核准、付款的採購申請，會同步反映在另一入口的對應視圖中。

**列表欄位**（兩入口共用）：採購說明 / 狀態 badge / 廠商 / 預估成本 / 核定金額 / 送審時間 / 操作；入口 B（全公司視角）額外顯示「所屬專案」欄位。

### 10.2 採購申請建立表單

**採購資訊區塊**：
```
採購說明標題：[文字輸入，必填]
採購類型：[下拉，來自廠商種類設定，必填]
關聯專案：[入口 A 自動帶入且鎖定；入口 B 須手動搜尋選擇，必選]
關聯服務項目：[下拉，選填；留空代表掛於專案層級]
預估成本（未稅）：[數字輸入，必填]
預計完成日：[日期，選填]
採購備註：[多行文字，選填]
```

**廠商資訊區塊（單一廠商）**：
```
廠商：[搜尋廠商名錄，送審前必填]
廠商報價金額（未稅）：[數字輸入，選填]
報價 PDF / 連結：[URL 輸入或上傳，選填但建議填寫]
服務範圍說明：[多行文字，選填]
```

**送審前驗證**：
- `vendor_id` 未選 → 系統阻擋送審「請選擇廠商後再送審」
- `estimated_cost` 未填 → 系統阻擋送審「請填寫預估成本後再送審」

### 10.3 審核操作區（嵌入採購申請詳情頁）

> 📋 **v8.0 對齊說明**：廠商採購的審核設計原本即採用「審核操作嵌入採購申請詳情頁」的模式（PM/PD 送審後，Manager 在同一份採購申請詳情頁查看採購資訊並核准 / 退回），與 v8.0 起其他模組（報價單、合約、請款單）統一採用的設計原則一致，故本節僅補充顯示條件與非審核者視角說明，UI 結構維持不變。

**顯示條件**：VendorQuote 狀態為 `pending_approval` **且** 登入者為該筆 WorkflowInstance 的指定審核者（依 REQ-0030 §4.5 具名審核者設定，VENDOR_COST 的 `approver_ids`）。

```
採購申請詳情（送審當下版本，唯讀）
─────────────────────────────────
採購說明：老撈 Q2 KOL 媒合
所屬專案：老撈麻辣鍋 2026 顧問服務
服務項目：口碑行銷—KOL 媒合
採購類型：口碑論壇
預估成本：NT$310,000
預計完成日：2026/07/31

廠商資訊
廠商：奧藝廣告股份有限公司
廠商報價金額：NT$300,000
服務範圍說明：KOL 媒合 8 組、PTT/Dcard 口碑文 20 篇
報價 PDF：[奧藝廣告_報價單.pdf]

⚠️ 個人廠商勞報單警示（如適用）

── 審核操作區（僅指定審核者可見）──────────────
核定金額（未稅）：[___300,000___]（預設帶入廠商報價金額）
核定說明：[______]（選填）

[核准] [退回（需填原因）]
```

**操作後行為**：

| 操作 | 系統行為 |
|------|----------|
| 點擊「核准」 | WorkflowInstance → `approved`；VendorQuote 核定金額寫入；系統自動建立 APRecord（`ap_category = vendor_cost`）；通知 PM/PD；Inbox 該筆項目移至「已核准」分頁 |
| 點擊「退回」 | 彈出退回原因輸入框（必填）；VendorQuote.status → `rejected`；通知採購申請建立者含退回原因；Inbox 該筆項目移至「已退回」分頁 |

**非審核者檢視**：若登入者不是指定審核者（例如其他 PM/PD、Finance），採購申請詳情頁不顯示審核操作區（核定金額欄位、核准/退回按鈕），僅呈現唯讀的採購資訊與「審核中」狀態 badge。

---

## 11. API 草稿（供後端參考，非最終規格）

```
# 採購申請 CRUD
GET    /api/v1/projects/:pid/vendor-quotes          # 專案採購申請列表
GET    /api/v1/services/:sid/vendor-quotes          # 服務項目採購申請列表
POST   /api/v1/vendor-quotes                        # 建立採購申請
GET    /api/v1/vendor-quotes/:id                    # 採購申請詳情
PUT    /api/v1/vendor-quotes/:id                    # 更新（draft 狀態才可修改）
DELETE /api/v1/vendor-quotes/:id                    # 刪除（draft 狀態才可刪）

# 工作流操作
POST   /api/v1/vendor-quotes/:id/submit             # 送審（觸發 VENDOR_COST 工作流）
POST   /api/v1/vendor-quotes/:id/approve            # 核准（需 approved_amount；Manager / Admin）
POST   /api/v1/vendor-quotes/:id/reject             # 退回（附退回原因；必填）

# 查詢（APRecord 整合）
GET    /api/v1/vendor-quotes/:id/ap-record          # 取得對應的 APRecord（核准後存在）
```

> 📋 **v9.8 移除**：廠商報價項目（items）相關端點（POST/PUT/DELETE/PATCH items）已隨 VendorQuoteItem 廢棄一併移除。廠商資訊改為直接於 VendorQuote 主表 PUT 更新。

---

## 12. 驗收標準（Given / When / Then）

**AC-042-01：採購申請基本建立**
- Given PM/PD 在服務項目頁面點擊「新增採購申請」，When 填寫採購說明、預估成本 $310,000、選擇廠商（奧藝廣告）、填寫廠商報價金額 $300,000，點擊儲存，Then VendorQuote 以 `status = draft` 建立，廠商資訊儲存於主表欄位（`vendor_id`、`quote_amount`）。

**AC-042-02：送審前必填驗證**
- Given 採購申請 `vendor_id` 未選擇，When 點擊「送審」，Then 系統顯示錯誤「請選擇廠商後再送審」，阻止送出。
- Given 採購申請 `estimated_cost` 為空，When 點擊「送審」，Then 系統顯示錯誤「請填寫預估成本後再送審」，阻止送出。

**AC-042-03：核定金額必填驗證**
- Given Manager 在審核操作區點擊「核准」但未填寫核定金額，Then 系統顯示錯誤「請填寫核定金額後再核准」，阻止核准。

**AC-042-04：個人廠商勞報單警示**
- Given 選定廠商 `entity_type = individual` 且 `labor_report_status = pending`，When Manager 在採購申請詳情頁的審核操作區進行審核，Then 頁面顯示橘色警示「此廠商為個人，勞報單尚未收取，請確認後再核准」，Manager 可選擇繼續核准或退回。

**AC-042-09：審核操作僅對指定審核者顯示（v8.0 新增）**
- Given 採購申請 `status = pending_approval`，S-05 設定的 VENDOR_COST 審核者為部門主管 A，When 部門主管 A 進入該採購申請詳情頁，Then 頁面顯示審核操作區（核定金額欄位 + 核准/退回按鈕）；When 非審核者（如其他 PM/PD 或 Finance）進入同一份採購申請詳情頁，Then 頁面不顯示審核操作區，僅呈現唯讀的採購資訊與「審核中」狀態 badge。

**AC-042-05：核准後自動建立 APRecord**
- Given 採購申請 `status = pending_approval`，Manager 填入核定金額 $300,000 後點擊核准，Then 系統自動建立 APRecord（`ap_category = vendor_cost`、`amount_pretax = 300,000`、`status = pending`、`vendor_id` 指向核定廠商、`vendor_quote_id` 指向此申請），VendorQuote.status 更新為 `approved`，通知操作者與財務。

**AC-042-06：毛利率警示**
- Given 採購核定後 APRecord 建入，When 系統計算 REQ-0051 專案毛利率低於 30%，Then REQ-0051 全成本試算頁面顯示橘色警示「毛利率 XX%，低於建議門檻 30%」；採購申請本身不回滾。

**AC-042-07：退回後重新送審**
- Given Manager 退回採購申請並填寫退回原因，When 操作者修改報價（重新上傳廠商 PDF、更新金額）後再次點擊送審，Then 新的 WorkflowInstance 建立（version + 1），舊的退回記錄保留，通知審核者再次審閱。

**AC-042-08：VENDOR_COST 工作流送審通知驗證**
- Given Admin 已在系統設定後台 S-05 為 VENDOR_COST 工作流設定部門主管為審核者，When PM 建立採購申請並點擊送審，Then 系統建立 WorkflowInstance（status = pending_approval），並通知該部門所有被指派的審核者；若 S-05 尚未設定任何審核者，送審按鈕應呈現警示提示，避免送出後無人可審核。

---

## 13. 階段化開發說明（v8.3 更新：不適用）

> ⚠️ **v8.3 說明**：本節原規劃「VENDOR_COST 工作流未激活、APRecord 以文字欄暫代廠商資訊、人工 Email/LINE 確認採購成本」的 P0 過渡方案，以及 P1 上線後的資料遷移步驟。依目前開發排程，REQ-0042（廠商採購成本管理）與 REQ-0011（廠商名錄）、REQ-0040/0041（專案建立／執行）為同步開發，不分階段先後上線，故不需要任何暫代欄位、人工流程過渡或事後資料遷移。`VENDOR_COST` 工作流自開發起即完整設定審核者並啟用；採購成本一律透過 `VendorQuote` 流程建立，不存在「財務手動建立 APRecord」的過渡情境。本節保留為歷史紀錄，不再作為開發規格。

---

## 14. 待決策事項（Open Issues）

| 編號 | 類型 | 問題 | 影響範圍 | 狀態 |
|------|------|------|---------|------|
| B-38 | 業務決策 | 成本核算觸發時機：廠商報價後確認（方案 A）vs. 提案前預估 + 廠商報價後調整（方案 B）？ | VendorQuote.estimated_cost 是否納入 REQ-0051 預估毛利試算 | ✅ `resolved`（v9.8）：`estimated_cost` 改為必填，建立採購申請時即須填入，系統可即時計算預估毛利率。廠商正式報價確定後以核定金額（`approved_amount`）計入 APRecord。 |
| B-45 | 業務決策 | 採購審核是否需要兩層審批（部門主管 → 財務主管）？或單層主管核准、財務在 AP 端確認付款即可？ | VENDOR_COST WorkflowConfig 的 `require_all` 設定、審核者清單 | ✅ `resolved`（v8.8）：單層主管核准；VENDOR_COST WorkflowConfig `require_all = false`，Finance 僅在 AP 端確認付款，不參與採購審核層 |
| B-40 | 業務決策 | 廠商報價 PDF：系統直接上傳（方案 A）vs. Google Drive 外部連結（方案 B）？（延續 REQ-0011） | VendorQuoteItem.quote_file_url 的儲存方案、系統儲存空間規劃 | ✅ `resolved`（v8.8）：方案 A，直接上傳至系統。`quote_file_url` 儲存系統內部附件路徑，並與 T-16（附件儲存方案）統一決策 |
| B-46 | 業務決策 | 昊揚本身作為廠商角色（向其他客戶轉包）時，費用與合約如何在系統中與外部廠商區分？SA 建議在廠商名錄中建立「昊揚顧問」的 Vendor 記錄，標記為 `is_internal = true`，採購申請流程相同，僅 AP 的會計科目與外部廠商不同。 | REQ-0011 廠商名錄欄位、APRecord 會計科目 | ✅ `resolved`（v8.8）：採用 SA 建議方案。廠商名錄新增 `is_internal = true` 欄位；v5.4 客戶主檔方向正式捨棄。見 REQ-0011 §5.1 |

---

## 15. 與其他 REQ 的關係

```
REQ-0011（廠商名錄）
  └─→ 本文件（VendorQuote.vendor_id FK 來源；個人廠商勞報單狀態查詢）

REQ-0030（工作流引擎）
  └─→ 本文件（VENDOR_COST 工作流正式激活；WorkflowInstance.source_type = VendorQuote）

REQ-0040（專案建立）
  └─→ 本文件（VendorQuote.project_id FK；採購申請歸屬專案）

REQ-0041（專案執行）
  └─→ 本文件（VendorQuote.service_id FK；採購申請可歸屬服務項目）

REQ-0042（廠商採購成本管理）
  └─→ REQ-0041（專案執行）：⚠️ v8.1 新增：本模組的 VendorQuote 資料
      同時呈現於 REQ-0041 §10 Tab 6「廠商採購」（單專案篩選視角）；
      兩處共用同一資料表，互為雙向發起與顯示入口

REQ-0042（廠商採購成本管理）← 本文件
  │
  ├─→ REQ-0050（AR / AP 對帳）：
  │       核准後自動建立 APRecord（ap_category = vendor_cost）
  │       財務在 AP 對帳列表確認付款
  │
  └─→ REQ-0051（全成本試算）：
          APRecord.amount_pretax（vendor_cost）計入外部成本
          毛利率低於門檻時觸發橘色警示
```

---


---

# §16｜REQ-0052 獎金分配引擎

✅ **v5.5 改寫（績效認列資料流確認）**：移除 Layer 3（個案績效獎金）——此機制不存在，績效認列由新增的 REQ-0054 統一處理，Layer 2 達標計算直接讀取 REQ-0054 的 `PerformanceRecord`。

| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0052 |
| **Use Case ID** | UC-052 |
| **PRD 章節** | 5.6.3 |
| **所屬模組** | F-05 Core 5 財務計算層 |
| **優先級** | `P1` |
| **狀態** | `open` — v5.5 改寫；B-36（多人同角色拆分）待業主確認；B-54 ✅ resolved（v5.6：月薪加總 × 倍率自動計算）；v5.9 補充月份係數、試用期規則、離職處理 |
| **最後更新** | 2026-06-30（v8.0：新增 §3.6 審核操作區，EXEC_BONUS_APPROVAL 序列式兩層審核） |
| **依賴關係** | REQ-0001（RBAC、`User.is_general_manager`）、REQ-0006（`Appointment`：部門歸屬與 `dept_type` 篩選；`Position.position_level`）、REQ-0002（S-08 / S-09 設定）、REQ-0054（績效認列引擎，`PerformanceRecord` 為 Layer 2 計算基礎） |
| **被依賴** | REQ-0060（老闆戰情室） |

---

## 1. 背景與設計動機

現況：公司並行兩套獎金機制（Layer 1 廣告部執行獎金 / Layer 2 部門達標獎金），均依賴主管口頭決定，無計算依據與書面紀錄；Layer 3 個案毛利提撥已確認不存在（v5.5 移除）。目的：建立可計算、可追溯的統一獎金引擎，系統產出試算建議值，Manager 確認 → 總經理核准後核定發放（薪資處理 Out of Scope）。

---

## 2. 兩層獎金機制總覽

| 層級 | 名稱 | 觸發對象 | 計算基礎 | 結算週期 | 發放時間 |
|------|------|---------|---------|---------|---------|
| **Layer 1** | 廣告部執行獎金 | 數位廣告部專屬（其餘部門不適用） | 各客戶廣告服務費 × 坑位比例，依貢獻百分比分配 | 月結 | 每月 10 號隨薪資 |
| **Layer 2** | 部門達標獎金 | 全公司各部門 | 該部門成員 `PerformanceRecord.final_performance` 加總（REQ-0054） | 季結（廣告 / 電商）或半年結（整合 / 創意） | 結算月 30 日 |

> ⚠️ **系統定位**：兩層機制均為**試算引擎**，產出建議值；實際發放金額由 Manager 確認後核定，不自動轉入薪資系統。

---

## 3. Layer 1：廣告部執行獎金

✅ **v5.4 改寫（2026-06-03 試算表確認）**：根據《廣告花費統計結算表》實際操作邏輯全面重整。

### 3.1 適用範圍

僅限數位廣告部（`User.department_id` 對應「數位廣告部」的成員）。跨部門人員不得領取。**Layer 1 為廣告部專屬，其餘部門不適用。**

### 3.2 結算單位與操作流程

**結算單位：廣告組別（如「地瓜組」）**——每個廣告組別每月填寫一份結算表，涵蓋該組負責的所有客戶與廣告平台。

```
廣告組別負責人 填寫月結算表
  ├── 系統自動帶入：品牌、廣告平台、服務費%（來自 Service.exec_bonus_ratio 或 S-08 預設）
  ├── 手動填入：總投放金額、廣告後台營業額（記錄用）、各角色坑位人員、個人貢獻百分比
  └── 系統自動計算：總服務費、各坑位金額、績效獎金池、各人實拿金額
      ↓
財務主管審核（工作流：EXEC_BONUS_APPROVAL 第一層）
      ↓
總經理放行（工作流：EXEC_BONUS_APPROVAL 第二層）
      ↓
Finance 發放（每月 10 號隨薪資）
```

### 3.3 計算邏輯

**第一步：逐客戶逐平台計算各坑位金額**

```
總服務費 = 總投放金額 × 服務費%（來自 Service.exec_bonus_ratio，NULL 時用 S-08 預設 7%）

PD  金額 = 總服務費 × 1%（有指派才計算；空白 = 0）
MPM 金額 = 總服務費 × 1%（有指派才計算；空白 = 0）
PM  金額 = 總服務費 × 5%（有指派才計算；空白 = 0）
```

> ⚠️ 三個坑位均為**選填**，沒有「強制必須有 PD/MPM/PM」的限制。

**第二步：計算本組當月績效獎金池**

```
績效獎金池 = Σ（所有客戶所有平台的 PD金額 + MPM金額 + PM金額）
```

**第三步：按貢獻百分比分配**

```
各人實拿 = 績效獎金池 × 個人貢獻百分比

所有人員百分比加總必須 = 100%（送審時系統驗證）
人員數量無上限
```

### 3.4 角色坑位說明

| 坑位 | 服務費佔比 | 說明 |
|------|-----------|------|
| PD | 1% | 選填，有擔任才填 |
| MPM | 1% | 選填，有擔任才填 |
| PM | 5% | 選填，有擔任才填 |

> 📋 坑位欄位決定**各客戶的坑位金額**；「個人貢獻百分比」決定**整個績效獎金池如何分配到個別人員**，兩者是獨立步驟。

### 3.5 發放條件

- **無達標門檻**：填完結算表、審核通過即發
- **審核流**：廣告組別負責人送審 → 財務主管（`is_general_manager = false` ROLE_MANAGER）→ 總經理（`is_general_manager = true`）放行
- **發放時間**：每月 10 號隨薪資

> ⚠️ **業務規則（BR-052-03）— 貢獻度填寫規則（v5.9 新增）**：`ExecBonusAllocation` 的 `contribution_pct`（個人貢獻百分比）由廣告部**組別負責人（主管）**手動填寫，系統不強制對半拆分預設值；組別負責人可依實際貢獻度自由分配，所有人員百分比加總須 = 100%（送審時系統驗證）才可送審。

> ⚠️ **業務規則（BR-052-04 v5.10 更新）— 部門成員限制**：`ExecBonusAllocation.user_id` 所指向的使用者，必須在「數位廣告部」有有效的 `Appointment`（`department_id` 對應數位廣告部 Department.id，且 `effective_to IS NULL`），**跨部門人員不得列入 Layer 1 分配名單**。系統送審時自動驗證，違反時顯示「[姓名] 非廣告部成員（無有效 Appointment），不可加入分配清單」並阻止送審。

### 3.6 審核操作區（v8.0 新增，嵌入廣告執行獎金結算頁）

> ⚠️ **v8.0 設計變更**：EXEC_BONUS_APPROVAL 審核不再透過獨立的審核詳情頁進行，而是直接嵌入廣告執行獎金結算頁（ExecBonusSheet 詳情頁）。詳見 REQ-0030 §1 / §8.2 的整體設計說明。

**與 INVOICE_APPROVAL 的差異**：EXEC_BONUS_APPROVAL 為**序列式兩層**（第一層財務主管通過後才進入第二層總經理），與 INVOICE_APPROVAL 的並行兩層不同；`ExecBonusSheet.status` 依序為 `submitted` → `finance_approved` → `gm_approved`，第二層審核者在第一層尚未通過前不會看到審核操作區。

**顯示條件**：

| 登入者角色 | 顯示條件 | 顯示內容 |
|------|------|------|
| 財務主管（第一層審核者） | `ExecBonusSheet.status = submitted` | 審核操作區（核准 / 退回） |
| 總經理（第二層審核者） | `ExecBonusSheet.status = finance_approved` | 審核操作區（核准 / 退回） |
| 總經理 | `ExecBonusSheet.status = submitted`（第一層尚未通過） | 不顯示審核操作區，僅顯示「待財務主管審核」狀態 |
| 廣告組別負責人 / 其他非審核者 | 任何狀態 | 不顯示審核操作區，僅顯示目前審核進度 badge |

```
┌──────────────────────────────────────────────────────┐
│  廣告執行獎金結算頁（地瓜組 / 2026-06）                  │
│  ── 客戶 × 平台明細 / 各坑位金額 / 績效獎金池 / 人員分配 ──│
├──────────────────────────────────────────────────────┤
│  審核進度（序列式兩層）                                  │
│  第一層（財務主管）：✅ 已核准（06/05 09:00）             │
│  第二層（總經理）：⏳ 待審核                              │
├──────────────────────────────────────────────────────┤
│  審核操作區（僅當前應審核的那一層可見）                    │
│  備註（選填）：[________________]                       │
│  [核准]                  [退回（需填原因）]              │
└──────────────────────────────────────────────────────┘
```

**操作後行為**：

| 操作 | 系統行為 |
|------|----------|
| 財務主管點擊「核准」 | `ExecBonusSheet.status → finance_approved`；通知總經理進行第二層審核；Inbox 財務主管的該筆項目移至「已核准」分頁 |
| 總經理點擊「核准」 | `ExecBonusSheet.status → gm_approved`；通知廣告組別負責人；進入發放排程（每月 10 號隨薪資）；Inbox 雙方審核者的該筆項目移至「已核准」分頁 |
| 任一層點擊「退回」 | 彈出退回原因輸入框（必填）；`ExecBonusSheet.status → draft`（無論退回方為第一層或第二層）；通知廣告組別負責人修改含退回原因；Inbox 該筆項目移至「已退回」分頁 |

---

## 4. Layer 2：部門達標獎金

### 4.0 DeptBonusRecord 觸發機制

系統於**各部門結算月的月初（1 日）**自動執行 Cron Job，建立當期 `DeptBonusRecord`：

```
季結部門（數位廣告 / 電商營運）：
  觸發月份：4 月 / 7 月 / 10 月 / 1 月（月初 01:00）
  period_type = quarterly
  period_label = 如 '2026-Q2'（涵蓋前三個月 PerformanceRecord）

半年結部門（整合行銷 / 創意素材）：
  觸發月份：7 月 / 1 月（月初 01:00）
  period_type = biannual
  period_label = 如 '2026-H1'（涵蓋前六個月 PerformanceRecord）

執行條件：
  讀取對應期間內 status = 'locked' 的 PerformanceRecord
  加總 final_performance → dept_performance
  計算 target_amount、achievement_rate、bonus_rate、bonus_pool_amount
  建立 DeptBonusRecord（status = calculated）
  通知部門主管進行獎金池分配
```

> ⚠️ Cron Job 依賴 REQ-0054 月度鎖定（每月 20 日前完成），結算月 1 日執行時前期 PerformanceRecord 應已全數 locked；若有未鎖定紀錄，系統記錄警告並通知 Finance，待手動確認後重新觸發計算。

---

### 4.1 計算基礎

✅ **v5.3 / v5.5 / v5.6 確認**：計算基數為**該部門所有成員在結算週期內的 `PerformanceRecord.final_performance` 加總**（`status = 'locked'`，依 `ProjectMember.department_id` 快照分組；v7.4）。詳見 REQ-0054。

```
部門當期認列績效 = Σ PerformanceRecord.final_performance
                 WHERE department_id = 該部門
                   AND period IN 當期結算範圍
                   AND status = 'locked'
```

**部門目標金額計算（✅ B-54 resolved，v5.6 / v5.9 擴充）：**

```
部門目標金額 = Σ 有效薪資（同部門所有啟用帳號）× 部門達標倍率（S-08）× 月份績效係數（S-08）

有效薪資計算規則：
  a. User.monthly_salary IS NULL → 排除（不計入，僅 Admin / Executive 帳號例外）
  b. probation_status = 'probation'（試用期中，尚未轉正）→ 排除（不計入）
  c. probation_status = 'confirmed' 且 probation_end_date（轉正日）落於計算月份內
     → 按轉正後工作天數比例折算（v6.3 更新：由固定日期改為事件驅動）
     折算薪資 = monthly_salary × (轉正後工作天數 / 當月總工作天數)
     轉正後工作天數 = 月末 - probation_end_date + 1
  d. probation_status = 'confirmed' 且 probation_end_date 早於計算月份（或 NULL 從未試用）
     → 全額計入 monthly_salary

月份績效係數（S-08 MonthlyPerformanceMultiplier，v5.9 新增）：
  預設 = 1.0；2 月淡季範例 = 0.9；11 月旺季範例 = 1.1
  Admin 可在 S-08 後台對各月份獨立設定係數

達標率 = 部門當期認列績效 ÷ 部門目標金額
```

> ⚠️ **業務規則（BR-052-01，v6.1 更新）**：`User.monthly_salary` 對非 Admin / Executive 帳號為必填（BR-001-04），系統層保證非空。計算部門目標金額時，`monthly_salary IS NULL` 的情況僅適用於 `ROLE_ADMIN` / `ROLE_EXECUTIVE` 帳號（本即排除在績效計算外）。`DeptBonusRecord.target_amount` 由系統在結算時自動計算，不需 Admin 手動輸入。

> ⚠️ **業務規則（BR-052-02）— 試用期排除規則（v6.3 更新）**：試用期判斷依 `User.probation_status` 欄位為準，非固定截止日。`probation_status = 'probation'`（未轉正）的人員，其薪資完全排除在部門目標金額計算之外。Admin / Manager 執行「轉為正式員工」操作並填入轉正日（`probation_end_date`）後，`probation_status` 自動切換為 `confirmed`；轉正當月依「轉正日至月末的工作天數 / 當月總工作天數」比例折算薪資貢獻。試用期中人員的個人績效（`PerformanceRecord`）仍正常建立，僅部門目標金額計算中排除其薪資貢獻；轉正後立即（下次 Cron Job 結算時）納入計算，不需額外人工操作。

### 4.2 各部門達標規則（✅ B-54 resolved，v5.6）

| 部門 | 達標 90% | 達標 100% | 超額加發 | 結算週期 | 發放時間 |
|------|---------|---------|---------|---------|---------|
| **數位廣告部** | — | 直抽部門認列績效 2% | 每多 10% 加發 1% | 季結 | 結算月 30 日 |
| **電商營運部** | 直抽部門認列績效 2% | 直抽部門認列績效 5% | 每多 10% 加發 1% | 季結 | 結算月 30 日 |
| **整合行銷部** | 直抽部門認列績效 1% | 直抽部門認列績效 3% | 每多 10% 加發 1% | 半年結 | 7 月結上半年、1 月結下半年 |
| **創意素材部** | 直抽部門認列績效 1% | 直抽部門認列績效 2% | 每多 10% 加發 1% | 半年結 | 同上 |

> ⚠️ 各部門獎金率與達標倍率儲存於 S-08 設定後台，Admin 可調整；新增部門時需同步在 S-08 新增對應規則。

### 4.3 超額加發計算範例

電商部 Q2 達標率 127%：基礎 5%（達 100%）+ 加發 2%（超額 20%，每 10% 加 1%）= 共 **7%**

### 4.4 達標率計算維度

達標率以**該部門（同一 department_id）所有成員的認列績效加總**與**部門整體目標**比較計算，不以個人個別達標率判斷。

### 4.5 獎金池分配規則

1. 系統計算出各部門獎金池後，交由**部門主管**依成員貢獻度手動分配
2. **防偏心鐵則**：主管自留上限 **70%**，至少 **30%** 必須分配給團隊成員
3. **審核流**：部門主管確認分配 → 財務主管確認 → 總經理審核放行
4. 總經理（`is_general_manager = true`）看全公司；部門主管只看本部門

---

## 5. B-09 達標倍率

✅ **v5.3 部分 resolved**：各部門薪資達標倍率已確認：

| 部門 | 薪資倍率 |
|------|---------|
| 數位廣告部 | 2.8× |
| 電商營運部 | 2.4× |
| 整合行銷部 | 2.0× |
| 創意素材部 | 2.0× |

> ⚠️ B-09 原問題（月薪換算工時費率）仍為 `open`，與達標倍率為不同問題。

---

## 6. RBAC 權限矩陣

| 操作 | Admin | Manager（部門主管） | Manager（總經理） | PM/PD | Finance |
|------|-------|---------------------|-------------------|-------|---------|
| 查閱全公司獎金計算總覽 | ✅ | ❌ | ✅ | ❌ | ✅（唯讀） |
| 查閱本部門獎金池與成員分配 | ✅ | ✅ | ✅ | ❌ | ✅（唯讀） |
| 查閱個人 Layer 1 結算明細（自身） | ✅ | ✅ | ✅ | ✅ | ❌ |
| Layer 1 廣告執行獎金送審 | ✅ | ✅（廣告部） | ✅ | ❌ | ❌ |
| Layer 1 財務主管審核 | ✅ | ✅ | ✅ | ❌ | ❌ |
| Layer 1 總經理放行 | ✅ | ❌ | ✅ | ❌ | ❌ |
| Layer 2 部門主管確認分配 | ✅ | ✅（本部門） | ✅ | ❌ | ❌ |
| Layer 2 財務主管確認 | ✅ | ❌ | ✅ | ❌ | ✅ |
| Layer 2 總經理放行 | ✅ | ❌ | ✅ | ❌ | ❌ |
| 查閱他人獎金金額 | ✅ | ✅（本部門） | ✅（全公司） | ❌ | ✅（總表） |

---

## 7. 資料模型

### 7.1 DeptBonusRecord（Layer 2 部門達標獎金批次）

```sql
DeptBonusRecord {
  id                UUID          PK
  department_id     UUID          FK → Department.id
  period_type       ENUM(quarterly|biannual)
  period_label      VARCHAR(20)                  -- 如 '2026-Q2'、'2026-H1'
  dept_performance  DECIMAL(12,2)                -- 部門認列績效加總（來自 REQ-0054 PerformanceRecord）
  target_amount     DECIMAL(12,2)                -- 達標門檻金額（系統自動計算：Σ User.monthly_salary × 部門達標倍率，✅ B-54 resolved）
  achievement_rate  DECIMAL(5,4)                 -- 達標率 = dept_performance / target_amount
  bonus_rate        DECIMAL(5,4)                 -- 適用獎金比例（依達標率階梯計算）
  bonus_pool_amount DECIMAL(12,2)                -- 獎金池 = dept_performance × bonus_rate
  status            ENUM(calculated|confirmed|locked)
  confirmed_by      UUID          FK → User.id   -- 部門主管確認
  finance_confirmed_by UUID       FK → User.id   -- 財務主管確認
  gm_approved_by    UUID          FK → User.id   -- 總經理放行
  gm_approved_at    TIMESTAMP
  locked_at         TIMESTAMP
}
```

### 7.2 DeptBonusAllocation（Layer 2 人員分配）

```sql
DeptBonusAllocation {
  id                UUID          PK
  dept_bonus_id     UUID          FK → DeptBonusRecord.id
  user_id           UUID          FK → User.id
  allocated_amount  DECIMAL(12,2)                -- 主管手動分配金額
  allocation_note   TEXT                         -- 分配理由（選填）
  is_manager_share  BOOLEAN       DEFAULT false  -- 是否為主管自留份額
  is_resigned_forfeit BOOLEAN     DEFAULT false  -- v5.9 新增：被分配人員於核定前已離職，金額歸公司（不實際發放）
}

約束：同一 dept_bonus_id 的所有 allocated_amount 加總 = DeptBonusRecord.bonus_pool_amount
      主管自留（is_manager_share = true）的加總 ≤ bonus_pool_amount × 70%
      is_resigned_forfeit = true 的款項不列入實際薪資發放清單（Finance 匯出時自動排除）
```

### 7.3 Layer 1 資料模型（三表結構）

**ExecBonusSheet（結算表主表，廣告組別為單位）**

```sql
ExecBonusSheet {
  id              UUID          PK
  department_id   UUID          FK → Department.id
  ad_group_name   VARCHAR(100)  NOT NULL
  month           VARCHAR(7)    NOT NULL             -- 'YYYY-MM'
  bonus_pool      DECIMAL(12,2)                      -- 系統計算 = Σ line_bonus
  status          ENUM(draft|submitted|finance_approved|gm_approved|paid)
  submitted_by    UUID          FK → User.id
  submitted_at    TIMESTAMP
  finance_approved_by   UUID    FK → User.id
  finance_approved_at   TIMESTAMP
  gm_approved_by        UUID    FK → User.id
  gm_approved_at        TIMESTAMP
  paid_at         TIMESTAMP
  UNIQUE(department_id, ad_group_name, month)
}
```

**ExecBonusLine（客戶 × 平台明細行）**

```sql
ExecBonusLine {
  id              UUID          PK
  sheet_id        UUID          FK → ExecBonusSheet.id
  brand_id        UUID          FK → Brand.id
  ad_platform     VARCHAR(50)
  ad_spend        DECIMAL(12,2)                      -- 總投放金額（手填）
  backend_revenue DECIMAL(12,2) NULL                 -- 廣告後台營業額（手填，記錄用）
  backend_roas    DECIMAL(8,4)  NULL                 -- 系統計算，記錄用
  service_fee_pct DECIMAL(5,4)  NOT NULL             -- 來自 Service.exec_bonus_ratio
  service_fee     DECIMAL(12,2)                      -- 系統計算 = ad_spend × service_fee_pct
  pd_user_id      UUID          NULL, FK → User.id
  mpm_user_id     UUID          NULL, FK → User.id
  pm_user_id      UUID          NULL, FK → User.id
  pd_amount       DECIMAL(12,2)                      -- service_fee × 1%（NULL user = 0）
  mpm_amount      DECIMAL(12,2)                      -- service_fee × 1%
  pm_amount       DECIMAL(12,2)                      -- service_fee × 5%
  line_bonus      DECIMAL(12,2)                      -- pd_amount + mpm_amount + pm_amount
}
```

**ExecBonusAllocation（人員分配）**

```sql
ExecBonusAllocation {
  id                UUID          PK
  sheet_id          UUID          FK → ExecBonusSheet.id
  user_id           UUID          FK → User.id
  contribution_pct  DECIMAL(5,4)  NOT NULL
  allocated_amount  DECIMAL(12,2)                    -- bonus_pool × contribution_pct
}
約束：同一 sheet_id 的 contribution_pct 加總 = 1.0000
```

---

## 8. 待決策事項

| 編號 | 類型 | 問題 | 影響範圍 | 狀態 |
|------|------|------|---------|------|
| B-09 | 業務決策（部分） | 員工費率計算基準（月薪換算工時費率） | REQ-0051 人力成本欄位 | `open` |
| B-36 | 業務決策 | 多人同角色時貢獻權重拆分：平均分攤（方案 A）vs. 手動指定（方案 B） | ProjectMember.contribution_weight（v7.4）| `open` |
| B-54 | 業務決策 | Layer 2 部門達標目標金額設定方式 | DeptBonusRecord.target_amount 來源 | ✅ `resolved`（v5.6）：Σ User.monthly_salary × 部門達標倍率（S-08）× 月份績效係數（S-08，v5.9 新增），系統自動計算 |
| B-52 | 業務決策 | 帳務鎖定後解鎖的角色定義 | RBAC | ✅ `resolved`（v5.9）：Finance 最高層（`can_unlock_performance = true`）或 Admin |

---

## 9. 與其他 REQ 的關係

```
REQ-0001（RBAC）
  └─→ 本文件（User.department_id 部門分組；User.is_general_manager 總經理旗標）

REQ-0002（S-08 / S-09 設定）
  └─→ 本文件（部門達標比例、獎金設定、部門主檔來源）

REQ-0041（專案執行）
  └─→ 本文件（Service.exec_bonus_ratio → Layer 1 ExecBonusLine.service_fee_pct）

REQ-0054（績效認列引擎）← 核心上游
  └─→ 本文件（PerformanceRecord.final_performance = Layer 2 計算基礎）

REQ-0052（獎金分配引擎）← 本文件
  └─→ REQ-0060（老闆戰情室）：獎金彙整 KPI
```

---

*— REQ-0052 規格文件 v5.5 —*

---

# §17｜REQ-0060 老闆戰情室


| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0060 |
| **Use Case ID** | UC-060 |
| **PRD 章節** | 5.7.1 |
| **所屬模組** | F-06 Core 6 報表與儀表板層 |
| **優先級** | `P1` |
| **狀態** | `open` — 規格初稿；B-50（客戶續約率定義）、B-51（KPI 匯出需求）待業主確認 |
| **最後更新** | 2026-05-12 |
| **依賴關係** | REQ-0020（商機漏斗）、REQ-0022（合約管理）、REQ-0026（客戶分級）、REQ-0030（工作流引擎）、REQ-0040（專案建立）、REQ-0041（專案執行，板塊 C 服務類型分佈統計來源）、REQ-0050（AR/AP 對帳）、REQ-0051（全成本試算）、REQ-0052（獎金分配） |
| **被依賴** | 無（終端消費層，不被其他 REQ 依賴） |

---

## 1. 背景與設計動機

現況：業務 KPI 靠週報手填、財務數據靠月報整理、毛利異常發現延遲一個月，管理層無即時全局視角。目的：建立 Admin/Manager 專屬 KPI 儀表板（T+0 即時），彙整業務、財務、專案、客戶分級四大面向指標，毛利率低於門檻時自動警示（KPI K-05）。

---

## 2. 功能描述

> 系統應提供管理層專屬的即時 KPI 儀表板（T+0），彙整業務開發、財務對帳、專案執行與客戶分級四大面向的關鍵指標；毛利率低於門檻時自動標紅警示；所有指標支援週期切換（本週 / 本月 / 本季 / 自訂）；存取權限限 Admin / Manager。

---

## 3. 儀表板結構（四大板塊）

```
┌──────────────────────────────────────────────────────────────────────┐
│  昊揚行銷管理系統 — 老闆戰情室            [週期：本月 ▾]  [匯出]        │
├──────────────────────────────────────────────────────────────────────┤
│  板塊 A：業務開發 KPI          │  板塊 B：財務概況                     │
│  ─ 商機簽約率趨勢              │  ─ 總服務費營收 / 成本趨勢            │
│  ─ 新增 / 成交 / 流失          │  ─ 本月應收 / 已收 / 逾期             │
│  ─ 列管中 / 服務中客戶數       │  ─ 毛利異常警示                      │
├──────────────────────────────────────────────────────────────────────┤
│  板塊 C：客戶組合              │  板塊 D：各模組 KPI 彙整              │
│  ─ 客戶分級分佈（S/A/B/C/D）   │  ─ 待審核單據數                      │
│  ─ 客戶續約率                  │  ─ 待確認收款 / 逾期未收              │
│  ─ 服務類型分佈                │  ─ 待結案評核 / 待核定獎金            │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 4. 板塊 A：業務開發 KPI

**數據來源**：REQ-0020 商機漏斗

### 4.1 商機簽約率

**定義**：選定週期內，Won 商機數 ÷（Won + Lost）商機數 × 100%

```
簽約率（本月）= 本月 Won 數 / (本月 Won 數 + 本月 Lost 數) × 100%
```

> ⚠️ 僅計算同期內有結案（Won 或 Lost）的商機，不含仍在漏斗進行中的商機，避免分母失真。

**展示方式**：
- 本期簽約率大數字（如：73%）
- 折線圖：近 12 週或近 12 個月的簽約率趨勢
- 上期對比箭頭（↑ / ↓ / →）

### 4.2 商機漏斗數量 KPI

| 指標 | 定義 | 數據來源 |
|------|------|---------|
| 本期新增商機 | 選定週期內新建立的商機數 | Opportunity 建立時間 |
| 本期成交（Won） | 選定週期內 `won_at` 落在範圍內的商機數 | Opportunity.won_at |
| 本期流失（Lost） | 選定週期內更新為 Lost 的商機數 | OpportunityStatusLog |
| 列管中客戶數 | 當前漏斗中尚未 Won / Lost 的商機總數 | `status NOT IN ('won','lost')` |
| 服務中總客戶數 | 當前合約狀態為 active 的品牌數 | Contract.status = active |

### 4.3 流失原因分佈

- 圓餅圖：`contract_terminated`（終止合約）vs. `not_started`（未開案）比例
- 點擊可下鑽查看流失品牌明細

---

## 5. 板塊 B：財務概況

**數據來源**：REQ-0050（AR/AP）、REQ-0051（全成本試算）

### 5.1 總服務費營收趨勢

> ⚠️ **排除代收代付**：趨勢圖僅計算 `ARRecord.transaction_type = 'revenue'`（服務費），排除 `passthrough`（代收代付），確保數字反映昊揚的實際服務費收入而非客戶廣告預算規模。

| 指標 | 定義 |
|------|------|
| 本期應收（服務費） | 選定週期內產生的服務費 ARRecord 未稅金額合計 |
| 本期已收 | 選定週期內 `status = confirmed` 的 ARRecord 合計 |
| 本期逾期 | 選定週期內 `is_overdue = true` 的 ARRecord 合計（排除 status = confirmed） |
| 收款率 | 已收 ÷ 應收 × 100% |

**展示方式**：長條圖（近 12 個月「應收 vs. 已收 vs. 逾期（is_overdue）」堆疊）+ 本月摘要大數字

### 5.2 成本趨勢

| 指標 | 定義 |
|------|------|
| 本期外部成本 | `APRecord.ap_category = 'vendor_cost'` 且 `status = paid` 的金額合計 |
| 本期內部成本 | `ProjectCostRecord.amount` 合計（工時成本） |
| 全成本合計 | 外部成本 + 內部成本 |

**展示方式**：折線圖（近 12 個月），與營收趨勢並列，直觀顯示毛利空間變化。

### 5.3 毛利率分佈與異常警示

**毛利異常標準**（門檻來自 REQ-0002 S-04，可設定）：

| 狀態 | 條件 | 顯示方式 |
|------|------|---------|
| 🔴 虧損警示 | 專案毛利率 < 0% | 紅色標記 + 主動通知 |
| 🟡 低毛利警示 | 0% ≤ 毛利率 < 30% | 橘色標記 |
| 🟢 正常 | 毛利率 ≥ 30% | 綠色 |

**異常警示列表**（Dashboard 固定顯示）：

```
⚠️ 毛利異常警示（3 個案件需關注）
───────────────────────────────────────────────────
🔴 老撈麻辣鍋 2026 整合案   毛利率：-5.2%   [查看詳情]
🟡 JERSCY 廣告代操           毛利率：18.6%   [查看詳情]
🟡 Holly 廣告代操            毛利率：22.1%   [查看詳情]
───────────────────────────────────────────────────
```

> 📋 **主動通知**：毛利率首次觸發紅色警示（< 0%）時，系統發送站內通知給 Manager / Admin（同一案件不重複通知，直到毛利率恢復正常後再次觸發才重新通知）。

---

## 6. 板塊 C：客戶組合

**數據來源**：REQ-0026（客戶分級）、REQ-0022（合約管理）、REQ-0040（專案建立）

### 6.1 客戶分級分佈

- 圓餅圖或長條圖：S / A / B / C / D 各級品牌數量
- 本季 vs. 上季對比（數量增減）
- 點擊分級可下鑽查看該等級品牌列表

```
客戶分級分佈（2026-Q2）
S: 3    A: 6    B: 15   C: 8    D: 5
              ↑+2    ↑+1            （vs Q1）
```

### 6.2 客戶續約率

> ❓ **待業主確認（B-50）**：客戶續約率的計算定義——
>
> **方案 A（合約展延率）**：主合約自動展延的品牌數 ÷ 同期到期主合約品牌數 × 100%
>
> **方案 B（年度品牌留存率）**：去年服務中的品牌，今年仍在服務中的比例
>
> SA 建議方案 A，與主合約自動展延邏輯（REQ-0022）直接連動，數據來源最清晰。

**展示方式**（以方案 A 為例）：
- 本季到期合約數 / 已續約數 / 續約率
- 近 4 季趨勢折線圖

### 6.3 服務類型分佈

依案件分類統計當前服務中的品牌數量：

```
服務類型分佈（服務中 58 個品牌）
廣告代操：32 (55%)   顧問服務：18 (31%)
整合行銷：6  (10%)   社群代操：2  (4%)
```

---

## 7. 板塊 D：各模組 KPI 彙整

提供各模組的待辦或異常狀態摘要，讓管理層快速掌握需關注的事項。

### 7.1 業務模組

| 指標 | 定義 | 數據來源 |
|------|------|---------|
| 待審核報價單 | QUOTE_APPROVAL WorkflowInstance.status = pending_approval | REQ-0030 |
| 待審核合約修改 | CONTRACT_MODIFY WorkflowInstance.status = pending_approval | REQ-0030 |
| 超過 30 天未推進的商機 | 在同一狀態超過 30 天的商機數（天數可設定） | REQ-0020 |

### 7.2 財務模組

| 指標 | 定義 | 數據來源 |
|------|------|---------|
| 本月待收款（服務費） | ARRecord.status = invoiced 的服務費金額合計 | REQ-0050 |
| 本月逾期未收 | ARRecord.is_overdue = true 且 status ≠ confirmed 的服務費金額合計 | REQ-0050 |
| 逾期品牌數 | 有 is_overdue = true 且 status ≠ confirmed 的 ARRecord 之不重複品牌數量 | REQ-0050 |
| 待確認付款（AP） | APRecord.status = approved（已核准未付款）的廠商費用合計 | REQ-0050 |

### 7.3 專案 / 績效模組

| 指標 | 定義 | 數據來源 |
|------|------|---------|
| 服務中專案數 | Project.status = active 的總數 | REQ-0040 |
| 待核定獎金 | BonusCalculation.status = calculated 的數量 | REQ-0052 |

---

## 8. 週期切換與數據刷新

### 8.1 支援週期

| 選項 | 說明 |
|------|------|
| 本週 | 當前自然週（**週一 00:00 ～ 當下**） |
| 本月 | 當前自然月 1 日 ～ 當下 |
| 本季 | 當前季度 Q1/Q2/Q3/Q4（Q1=1～3 月，Q2=4～6 月，Q3=7～9 月，Q4=10～12 月） |
| 上月 | 上個自然月完整區間（1 日 00:00 ～ 月末 23:59） |
| 自訂 | 指定起迄日期（日期選擇器，精度到日） |

預設：進入儀表板時顯示「本月」。

> 📋 **V-011 週定義對齊說明**：本表「本週 = 週一起算」與 REQ-0020 商機漏斗的週 KPI 定義（T-11 確認事項）保持一致。T-11 確認後，若週起算點有所調整（如改為週日），需同步更新 REQ-0020 與本文件，確保兩模組的「本週」數字相同。後端計算週區間時應統一使用共用的 `DateRange.currentWeek()` 工具函數，不得各模組自行計算。

### 8.2 數據刷新機制

| 類型 | 刷新方式 | 說明 |
|------|---------|------|
| 即時指標（T+0） | 每次頁面載入重新查詢 | 板塊 D 各模組待辦數量、毛利率 |
| 趨勢圖表 | 每日 00:00 Cron Job 預計算後快取 | 月度趨勢圖，不需每次即時查詢 |
| 客戶分級 | 每季更新（依 REQ-0026 發布時間） | 分級分佈圖 |

---

## 9. RBAC 權限矩陣

| 操作 | Admin | Manager | PM/PD | Finance |
|------|-------|---------|-------|---------|
| 查看老闆戰情室（全功能） | ✅ | ✅ | ❌ | ❌ |
| 點擊 KPI 數字下鑽查看明細 | ✅ | ✅ | ❌ | ❌ |
| 匯出儀表板數據（CSV） | ✅ | ✅ | ❌ | ❌ |

> ⚠️ PM / Finance 不可存取老闆戰情室任何頁面，URL 直連也回傳 403。

---

## 10. User Story

**US-060-01**：As Manager，我想在進入系統時第一眼看到公司本月營收與毛利率狀況，so that 不需要問財務行政「這個月收了多少錢」。

**US-060-02**：As Manager，我想在毛利率異常的案件上立即收到警示，so that 能在月底前及早介入調整，而非月底才知道。

**US-060-03**：As Admin，我想看到近 12 個月的簽約率趨勢，so that 能判斷業務開發是否有結構性問題，而非只看當月數字。

**US-060-04**：As Manager，我想查看各模組的待辦彙整（待審核單據、逾期收款、待核定獎金），so that 不需逐一進入各模組才能發現積壓的問題。

---

## 11. API 草稿（供後端參考，非最終規格）

```
# 儀表板各板塊數據
GET  /api/v1/dashboard/business-kpi          # 板塊 A：業務 KPI（?period=month&date=2026-05）
GET  /api/v1/dashboard/financial-summary     # 板塊 B：財務概況（?period=month）
GET  /api/v1/dashboard/customer-portfolio    # 板塊 C：客戶組合
GET  /api/v1/dashboard/module-alerts         # 板塊 D：各模組 KPI 彙整（即時）
GET  /api/v1/dashboard/profit-anomalies      # 毛利異常警示清單（即時）

# 趨勢圖數據（預計算快取）
GET  /api/v1/dashboard/trends/revenue        # 月度營收趨勢（近 12 個月）
GET  /api/v1/dashboard/trends/profit-margin  # 毛利率趨勢
GET  /api/v1/dashboard/trends/win-rate       # 商機簽約率趨勢（近 12 週 / 月）

# 匯出
GET  /api/v1/dashboard/export                # 匯出當前篩選條件的儀表板數據（CSV）
```

---

## 12. 驗收標準（Given / When / Then）

**AC-060-01：存取控制**
- Given PM/PD 甲登入系統，When 嘗試訪問老闆戰情室 URL，Then 系統回傳 403，頁面顯示「您無權限存取此頁面」。

**AC-060-02：T+0 即時數據**
- Given 財務剛確認一筆 NT$50,000 的收款（ARRecord.status = confirmed），When Manager 重新整理老闆戰情室，Then 板塊 B「本月已收」數字在 3 秒內更新反映最新金額。

**AC-060-03：毛利異常警示自動標紅**
- Given 老撈麻辣鍋案件毛利率因採購成本超支變為 -5.2%，When Manager 查看老闆戰情室，Then 板塊 B 毛利異常警示列表出現老撈案件（🔴 紅色標記），Manager 同時收到站內通知。

**AC-060-04：週期切換即時生效**
- Given Manager 正在查看「本月」數據，When 切換週期為「本季」，Then 所有板塊數據在 5 秒內更新為本季範圍的統計值。

**AC-060-05：簽約率計算正確**
- Given 本月有 8 筆 Won（won_at 在本月內）、3 筆 Lost（本月更新為 Lost），When Manager 查看板塊 A 簽約率，Then 顯示 8 ÷ (8+3) × 100% ≈ 72.7%。

**AC-060-06：下鑽功能**
- Given Manager 點擊板塊 D「逾期品牌數：5」，When 系統執行，Then 跳轉至 AR 對帳列表並套用「is_overdue = true」篩選，顯示 5 個逾期品牌明細。

**AC-060-07：排除代收代付**
- Given 本月服務費 AR NT$1,000,000、代收代付 AR NT$800,000，When Manager 查看板塊 B 本月應收，Then 主要數字顯示 NT$1,000,000（服務費），代收代付以獨立標注方式顯示（供參考，不計入主指標）。

---

## 13. 待決策事項（Open Issues）

| 編號 | 類型 | 問題 | 影響範圍 | 狀態 |
|------|------|------|---------|------|
| B-50 | 業務決策 | 客戶續約率定義：合約展延率（方案 A）vs. 年度品牌留存率（方案 B）？ | 板塊 C 計算公式、數據來源 | `open` |
| B-51 | 業務決策 | 儀表板數據是否需要匯出 CSV 功能？若需要，匯出範圍為何？ | 匯出 API 設計、UI 按鈕 | `open` |

---

## 14. 與其他 REQ 的關係

```
所有 P0 / P1 REQ 均為本文件的數據來源：

REQ-0020（商機漏斗）      → 板塊 A：簽約率、商機數量 KPI
REQ-0022（合約管理）      → 板塊 C：服務中客戶數、客戶續約率
REQ-0026（客戶分級）      → 板塊 C：分級分佈圖
REQ-0030（工作流引擎）    → 板塊 D：待審核單據數量
REQ-0040（專案建立）      → 板塊 D：服務中專案數
REQ-0041（專案執行）      → 板塊 C：服務類型分佈統計（Service.case_category）
REQ-0050（AR / AP 對帳）  → 板塊 B：營收 / 成本趨勢、逾期收款警示
REQ-0051（全成本試算）    → 板塊 B：毛利率分佈與異常警示
REQ-0052（獎金分配引擎）  → 板塊 D：待核定獎金數量

REQ-0060（老闆戰情室）← 本文件
  └─→ 無下游依賴（F-06 終端消費層）
```

---


---


| REQ | 功能 | 狀態 |
|-----|------|------|
| REQ-0011 | 廠商名錄 | ✅ 完成 |
| REQ-0025 | 開案交接完整流程 | ✅ 完成 |
| REQ-0026 | 客戶分級系統 | ✅ 完成 |
| REQ-0042 | 廠商採購成本管理 | ✅ 完成 |
| REQ-0052 | 獎金分配引擎 | ✅ 完成 |
| REQ-0060 | 老闆戰情室 | ✅ 完成 |

`昊揚行銷管理系統_PRD_v2.0_P1完整版.md`

---


---

# 第三階段（P2）｜功能規格

> P2 為昊揚行銷管理系統的第三交付階段，在 P0 + P1 全部穩定上線並驗收完成後啟動。
>
> 🔴 **P2 啟動阻斷事項**：B-13（Google 雲端遷移策略）與 B-14（104 平台整合決策）必須在進入 Sprint 規劃前完成決策。

## P2 REQ 一覽

| REQ-ID | 功能名稱 | 所屬模組 | 啟動前提 |
|--------|---------|---------|---------|
| REQ-0043 | 全域知識庫 | F-04 專案執行層 | P0+P1 驗收完成；B-13/B-14 決策完成 |
| REQ-0045 | 專案 Wiki | F-04 專案執行層 | REQ-0043 上線完成（KnowledgeDoc 基礎設施就緒） |

---

# §18｜REQ-0043 全域知識庫

## 文件頭

| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0043 |
| **Use Case ID** | UC-043 |
| **PRD 章節** | 5.5.4（P2 擴充版） |
| **所屬模組** | F-04 Core 4 專案執行層 |
| **優先級** | `P2` |
| **狀態** | `open` — 規格 v4.0，遷移策略（B-13）與 104 整合（B-14）待業主確認 |
| **最後更新** | 2026-05-13（v4.0） |
| **依賴關係** | REQ-0001（RBAC）、**REQ-0002（系統設定 S-07）**、**REQ-0003（稽核日誌）**、REQ-0040（專案建立）、REQ-0041（專案執行）|

> ✅ **v4.0 修正（C-02）**：依賴關係補入 REQ-0003。所有知識文件操作（建立、修改、封存）均應自動寫入稽核日誌，由 REQ-0003 Foundation 層統一負責。

---

## 1. 背景與設計動機

現況：知識文件分散於各顧問個人 Google Drive（交接時文件歸屬不清）與 104 企業學習平台（與專案系統完全脫鉤），兩個系統互不連通，新 PM 上手靠翻資料夾，跨專案知識無法重用。

> ⚠️ **P2 阻斷**：B-13（Google Drive 遷移策略）與 B-14（104 整合方式）尚未業主決策，REQ-0043 規格暫為骨架版。

**設計目標**

| 目標 | 成功標準 |
|------|---------|
| 統一文件入口 | 所有知識文件（含教材）在同一介面管理與查詢 |
| 關鍵字搜尋 | 輸入關鍵字 3 秒內返回結果（P95 基準，含標題、內文、標籤、附件檔名複合索引查詢）|
| 知識與專案雙向引用 | PM 可在服務頁看到相關文件；文件頁可看到關聯專案 |
| 教材閱覽記錄 | 員工閱覽後系統自動記錄，Admin/Manager 可查詢 |
| 遷移友善 | 支援批次匯入 Google Drive 既有文件（B-13 決策後實作） |
| 操作可稽核 | 所有文件操作寫入稽核日誌 |

---

## 2. 功能描述

> 系統應提供獨立的全域知識庫模組，支援文件的建立、版本管理、標籤分類、關鍵字全文搜尋，以及與昊揚專案的雙向引用；教育訓練教材應支援員工閱覽記錄追蹤；所有文件操作受 RBAC 控管並自動寫入稽核日誌；所有角色均可建立、編輯自己建立的文件；管理標籤庫、DocType 設定、批次匯入僅限 Admin。

---

## 3. User Story

| 角色 | 行為 | 目的 |
|------|------|------|
| PM/PD | 在服務頁直接查看與該專案相關的知識文件 | 快速取得上下文，不需另開 Google Drive |
| PM/PD | 將一份產業研究報告引用至多個同類型客戶的專案 | 知識重用，減少重複整理 |
| Admin | 上傳、標籤化、版本控制教育訓練教材 | 統一管理，取代 104 平台手動維護 |
| 任意角色 | 輸入關鍵字搜尋知識庫 | 快速定位相關文件，3 秒內拿到結果 |
| Manager | 查看員工的教材閱覽記錄 | 掌握團隊知識吸收狀況 |
| Finance | 搜尋與瀏覽已發布的知識文件 | 查閱相關 SOP 與範本，但不建立或修改文件 |

---

## 4. 資料模型

### 4.1 KnowledgeDoc（知識文件主表）

| 欄位 | 型別 | 說明 | 約束 |
|------|------|------|------|
| `id` | UUID | 主鍵 | PK |
| `title` | VARCHAR(200) | 文件標題 | NOT NULL |
| `doc_type` | ENUM | 文件類型，見 §4.4 | NOT NULL |
| `content_body` | TEXT | 富文本內容（Markdown / HTML）| NULLABLE（允許附件型文件僅有附件） |
| `status` | ENUM | `draft` / `published` / `unpublished` / `archived` | NOT NULL, DEFAULT `draft` |
| `visibility` | ENUM | `public`（全員）/ `role_based`（依角色）/ `private`（僅作者）| NOT NULL, DEFAULT `public` |
| `author_id` | UUID | 建立者，FK → User.id | NOT NULL |
| `created_at` | TIMESTAMP | 建立時間 | NOT NULL |
| `updated_at` | TIMESTAMP | 最後更新時間 | NOT NULL |
| `published_at` | TIMESTAMP | 發布時間（最近一次發布）| NULLABLE |
| `published_by` | UUID | 發布操作者，FK → User.id（取消/重新發布權限判斷依據）| NULLABLE |
| `unpublished_at` | TIMESTAMP | 取消發布時間（BR-043-07）| NULLABLE |
| `unpublished_by` | UUID | 取消發布操作者，FK → User.id（BR-043-07）| NULLABLE |
| `archived_at` | TIMESTAMP | 封存時間（BR-043-06）| NULLABLE |
| `archived_by` | UUID | 封存操作者，FK → User.id（BR-043-06）| NULLABLE |
| `archive_reason` | VARCHAR(300) | 封存原因（選填，BR-043-06）| NULLABLE |
| `source_url` | VARCHAR(500) | Google Drive / 外部來源連結 | NULLABLE |
| `is_migrated` | BOOLEAN | 是否為 Google 雲端遷移匯入 | DEFAULT `false` |

> ✅ **v4.0 修正（G-05）**：新增 `archived_by`、`archive_reason` 欄位，配合 BR-043-06 封存稽核日誌需求。
> ✅ **v7.8 新增**：新增 `unpublished_at`、`unpublished_by` 欄位；`status` 新增 `unpublished` 值（已發布後暫停公開，可重新發布）；新增 `published_by` 欄位（取消/重新發布權限判斷依據）。

### 4.2 KnowledgeDocVersion（文件版本快照）

| 欄位 | 型別 | 說明 | 約束 |
|------|------|------|------|
| `id` | UUID | 主鍵 | PK |
| `doc_id` | UUID | FK → KnowledgeDoc.id | NOT NULL |
| `version_no` | INTEGER | 版本號，從 1 起 | NOT NULL |
| `content_snapshot` | TEXT | 該版本的完整內容快照（全量儲存）| NOT NULL |
| `changed_by` | UUID | FK → User.id | NOT NULL |
| `changed_at` | TIMESTAMP | 版本建立時間 | NOT NULL |
| `change_note` | VARCHAR(300) | 版本說明（可選） | NULLABLE |

### 4.3 KnowledgeDocAttachment（附件）

| 欄位 | 型別 | 說明 | 約束 |
|------|------|------|------|
| `id` | UUID | 主鍵 | PK |
| `doc_id` | UUID | FK → KnowledgeDoc.id | NOT NULL |
| `file_name` | VARCHAR(255) | 原始檔名 | NOT NULL |
| `file_url` | VARCHAR(500) | 儲存位置（物件儲存 URL）| NOT NULL |
| `file_size_kb` | INTEGER | 檔案大小（KB）| NOT NULL |
| `mime_type` | VARCHAR(100) | 檔案類型 | NOT NULL |
| `uploaded_by` | UUID | FK → User.id | NOT NULL |
| `uploaded_at` | TIMESTAMP | 上傳時間 | NOT NULL |

### 4.4 DocType 清單（系統設定 S-07 管理）

| DocType 代碼 | 顯示名稱 | 說明 |
|------------|---------|------|
| `sop` | SOP 流程文件 | 業務標準作業程序 |
| `template` | 範本文件 | 報告、簡報、表格範本 |
| `case_study` | 案例分析 | 歷史客戶成果紀錄 |
| `research` | 研究報告 | 產業分析、競品研究 |
| `training` | 教育訓練教材 | 可追蹤學習記錄 |
| `guide` | 操作指南 | 系統或工具使用指南 |
| `other` | 其他 | 不屬於上述類型的文件 |

> ⚠️ **BR-043-01**：`DocType` 清單由 Admin 在系統設定 S-07 維護，預設值為上表，可新增但不可刪除有文件關聯的類型。

### 4.5 Tag / KnowledgeDocTag（標籤多對多）

| 資料表 | 欄位 | 說明 |
|--------|------|------|
| `Tag` | `id`, `name`（最長 30 字）, `color`（HEX）, `created_by` | 標籤主表，Admin 管理 |
| `KnowledgeDocTag` | `doc_id`, `tag_id` | 多對多關聯表 |

### 4.6 ProjectKnowledgeRef（專案引用關聯）

| 欄位 | 型別 | 說明 | 約束 |
|------|------|------|------|
| `doc_id` | UUID | FK → KnowledgeDoc.id | NOT NULL |
| `project_id` | UUID | FK → Project.id（REQ-0040）| NOT NULL |
| `linked_by` | UUID | FK → User.id | NOT NULL |
| `linked_at` | TIMESTAMP | 引用時間 | NOT NULL |
| PRIMARY KEY | `(doc_id, project_id)` | 複合主鍵，防止重複引用 | |

> 📋 **引用粒度說明（S-02）**：引用以 Project 為最小單位。品牌層級的橫向引用（如「老撈品牌 SOP」跨多個專案共用）透過讓每個 Project 各自建立引用記錄來實現，不直接建立 Brand → KnowledgeDoc 的關聯。

### 4.7 LearningRecord（教材閱覽記錄）

> 僅對 `doc_type = 'training'` 的文件有效。

| 欄位 | 型別 | 說明 | 約束 |
|------|------|------|------|
| `id` | UUID | 主鍵 | PK |
| `doc_id` | UUID | FK → KnowledgeDoc.id | NOT NULL |
| `user_id` | UUID | FK → User.id | NOT NULL |
| `first_viewed_at` | TIMESTAMP | 首次閱覽時間 | NOT NULL |
| `last_viewed_at` | TIMESTAMP | 最近閱覽時間 | NOT NULL |
| `view_count` | INTEGER | 閱覽次數 | NOT NULL, DEFAULT 1 |
| `is_completed` | BOOLEAN | 是否標記為「完成」 | DEFAULT `false` |
| `completed_at` | TIMESTAMP | 標記完成時間 | NULLABLE |

---

## 5. 功能規格詳細說明

### 5.1 知識文件管理（CRUD）

**⚠️ BR-043-02**：只有 `published` 狀態的文件才能被搜尋、被引用至專案，`draft` 僅建立者可見。

**⚠️ BR-043-03**：文件封存（`archived`）後，已存在的專案引用仍保留，但不出現在新搜尋結果中；封存操作的執行權限依 §7 RBAC 矩陣：Admin 與 Manager 可封存任何文件，PM 僅可封存自己建立的文件，Finance 無封存權限。

**⚠️ BR-043-04**：每次儲存更新自動建立版本快照（KnowledgeDocVersion），版本號自動遞增，歷史版本永久保留，可供比對或還原。

**⚠️ BR-043-06（v4.0 新增，G-05）**：封存操作為高敏感操作，必須同步執行以下兩項動作：
1. 更新 `KnowledgeDoc.archived_at = now()`、`archived_by = current_user.id`、`archive_reason`（選填）
2. 寫入稽核日誌（REQ-0003 AuditLog），事件類型 = `knowledge.archived`，記錄 `doc_id`、`archived_by`、`archived_at`、`archive_reason`

**操作權限對照（v4.0 修正，C-03）：**

✅ **v4.0 修正（C-03）**：Finance / 非 Admin-Manager-PM 角色改為「唯讀」。✅ **v7.0 更新**：`ROLE_SALES` 廢除。✅ **v7.7 更新**：Finance 開放完整編輯權限（可建立、編輯、封存自己建立的文件）。

| 操作 | Admin | Manager | PM/PD | Finance |
|------|-------|---------|-------|---------|
| 建立文件 | ✅ | ✅ | ✅ | ❌ |
| 編輯自己建立的文件 | ✅ | ✅ | ✅ | ❌ |
| 編輯他人文件 | ✅ | ✅ | ❌ | ❌ |
| 發布文件（首次）| ✅ | ✅ | ✅ | ✅ |
| 取消發布 | ✅（任何人）| ✅（任何人）| 自己發布的 | 自己發布的 |
| 重新發布 | ✅（任何人）| ✅（任何人）| 自己發布的 | 自己發布的 |
| 封存文件 | ✅ | ✅ | 僅自己建立的 | ❌ |
| 查看所有已發布文件 | ✅ | ✅ | ✅ | ✅（唯讀）|
| 搜尋已發布文件 | ✅ | ✅ | ✅ | ✅（唯讀）|
| 管理標籤庫 | ✅ | ❌ | ❌ | ❌ |
| 查看學習記錄（全員） | ✅ | ✅ | ❌（僅自身） | ❌（僅自身）|
| 批次匯入（遷移工具）| ✅ | ❌ | ❌ | ❌ |

---

### 5.2 全文搜尋

**⚠️ BR-043-07（v7.8 新增）**：取消發布（`published → unpublished`）與重新發布（`unpublished → published`）為可逆操作，規則如下：
1. 取消發布後 `KnowledgeDoc.status = unpublished`，文件從全域搜尋與列表消失；已存在的 `ProjectKnowledgeRef` 引用保留，引用處顯示「⚠️ 此文件已暫停發布」提示
2. `unpublished` 文件僅作者、Admin、Manager 可在列表（篩選「已取消發布」）中查看
3. 重新發布後 `KnowledgeDoc.status = published`，文件重新出現於全域搜尋；`published_at` 更新，`unpublished_at` / `unpublished_by` 清空
4. 操作權限：Admin / Manager 可對任何人的文件取消/重新發布；PM/PD / Finance 僅可操作自己發布的文件（`published_by = current_user.id`）
5. 兩項操作均須寫入稽核日誌（`knowledge.unpublished` / `knowledge.republished`）

**⚠️ BR-043-05**：搜尋範圍僅包含 `status = 'published'`（`unpublished` 不納入搜尋結果）且 `visibility` 符合當前使用者角色的文件。Finance 等非 Admin/Manager/PM 角色只能搜尋 `visibility = 'public'` 的已發布文件。

**搜尋欄位：**
- 標題（title）
- 正文內容（content_body）
- 標籤名稱（Tag.name）
- 文件類型（doc_type 顯示名）
- 附件檔名（KnowledgeDocAttachment.file_name）

**搜尋結果排序：**
1. 標題完全匹配優先
2. 標題包含關鍵字次之
3. 內文包含關鍵字最後
4. 同分時依 `published_at` 降序（最新優先）

**❓ 待技術確認（T-15）**：全文搜尋技術方案：PostgreSQL full-text search（適合現有技術棧，零額外依賴）vs. Elasticsearch / OpenSearch（效能更強，但需維護獨立服務）？SA 建議 MVP 用 PostgreSQL FTS，之後有效能需求再遷移。

---

### 5.3 專案雙向引用

**操作流程 A（從知識庫 → 專案）：**
1. 使用者在知識文件詳情頁點擊「引用至專案」
2. 彈出專案選擇器，列出使用者有權存取的專案（PM 僅列自己負責的）
3. 選擇後建立 `ProjectKnowledgeRef` 記錄（doc_id, project_id）

**操作流程 B（從專案 → 知識庫）：**
1. 在 REQ-0041 專案執行頁新增「相關知識文件」區塊
2. 點擊「新增文件引用」開啟知識庫搜尋器
3. 搜尋並選擇文件後建立引用

**⚠️ BR-043-07**：雙向引用刪除時，僅移除 `ProjectKnowledgeRef` 記錄，文件與專案本身均不受影響。

---

### 5.4 教育訓練教材與學習記錄

**⚠️ BR-043-08**：`doc_type = 'training'` 的文件，使用者首次點開即自動建立 `LearningRecord`（`first_viewed_at` 記錄）；每次重新打開更新 `last_viewed_at` 並遞增 `view_count`。

**⚠️ BR-043-09**：「完成」狀態由員工自行點擊確認（非自動計算），系統記錄 `completed_at`；允許撤銷（`is_completed = false, completed_at = null`）。

**❓ 待業主確認（B-14）**：104 企業學習平台整合決策：
- **方案 A（取代）**：教材全部遷移進系統，停用 104 平台。優：資料統一、免年費。缺：需開發更完整的測驗 / 進度管理功能。
- **方案 B（並行，SA 建議）**：系統知識庫存放業務知識，104 平台保留課程測驗功能，兩者各司其職。風險低，但員工需切換兩個平台。
- **方案 C（連結整合）**：系統知識庫保存教材，點擊後開啟 104 平台對應課程 URL。利用 104 平台的測驗功能，但依賴外部平台。

---

### 5.5 資料遷移（Google 雲端 → 系統）

**❓ 待業主確認（B-13）**：Google 雲端資料遷移策略，三個方案：

| 方案 | 說明 | 優點 | 缺點 |
|------|------|------|------|
| A（全量遷移）| 所有 Drive 文件批次匯入，Google Docs 轉 Markdown | 搜尋完整，Drive 依賴降低 | 時間成本高，需一次性整理分類 |
| B（漸進遷移，SA 建議）| 新文件建立於系統，舊文件分批整理 | 風險低，分批推進 | 雙軌並行期搜尋不完整 |
| C（只建連結）| 系統只存標題 / 摘要 / 標籤，`source_url` 指向 Drive | 開發成本最低 | 全文搜尋大幅受限 |

> SA 建議採**方案 B（漸進遷移）**，搭配 `is_migrated` 欄位追蹤遷移狀態，建議 P2 上線後 3 個月內完成核心文件遷移。

---

## 6. UI 規格

### 6.1 知識庫列表頁

**篩選條件**：文件類型（DocType 多選）、標籤（Tag 多選）、發布狀態（全部 / 已發布 / 草稿 / 已取消發布 / 封存）、關鍵字搜尋（全文）、發布日期範圍

**列表欄位**：

| 欄位 | 說明 |
|------|------|
| 文件標題 | 點擊進入詳情，超過 60 字截斷顯示 |
| 文件類型 badge | 顏色對應 DocType |
| 標籤（最多顯示 3 個） | 超過顯示 +N |
| 最後更新時間 | 相對時間（如：3 天前） |
| 作者 | 顯示名稱 |
| 關聯專案數 | 顯示數量，hover 列出專案名稱 |

> 📋 **Finance 角色 UI**：可查看草稿 / 已取消發布 / 封存篩選條件（僅限自己建立的文件），「建立文件」按鈕顯示，功能與 PM/PD 一致。

### 6.2 知識文件詳情頁

```
知識文件詳情頁
├── 頁首區塊
│     ├── 文件標題（大字）
│     ├── 文件類型 badge、標籤列表
│     ├── 狀態 badge（草稿 / 已發布 / 已取消發布 / 封存）
│     ├── 作者、發布時間、最後更新時間
│     ├── 版本號（v1.2 等）、版本歷史按鈕
│     └── 操作按鈕（依狀態與 published_by 判斷）
│           ├── [編輯]（自己建立的 / Manager / Admin）
│           ├── [取消發布]（status=published；published_by / Manager / Admin）
│           ├── [重新發布]（status=unpublished；published_by / Manager / Admin）
│           └── [封存]（自己建立的 / Manager / Admin）
├── 主要內容區（富文本 / Markdown 渲染）
├── 附件列表（可下載）
├── 側欄
│     ├── 引用此文件的專案列表
│     └── 相關文件推薦（同標籤）
└── 底部
      ├── 版本歷史對照（可展開）
      └── 教材模式（若 doc_type = training）：
            閱覽進度、「標記為完成」按鈕
```

### 6.3 服務頁整合（REQ-0041 延伸）

在現有服務詳情頁新增「相關知識文件」Tab：
- 顯示已引用的文件列表（標題、類型 badge、連結）
- 提供「新增文件引用」按鈕（全角色均顯示）
- 封存文件顯示「⚠️ 此文件已封存」提示，引用關聯仍保留
- 取消發布文件顯示「⚠️ 此文件已暫停發布」提示，引用關聯仍保留

---

## 7. RBAC 權限矩陣（REQ-0043）

✅ **v4.0 修正（C-03）**：Finance 對知識庫限「唯讀」。✅ **v7.0 更新**：`ROLE_SALES` 廢除。✅ **v7.7 更新**：Finance 開放完整編輯權限（與其他角色一致，公開知識庫任何人均可編輯）。本節為 REQ-0043 權限的唯一事實來源。

| 功能 | Admin | Manager | PM/PD | Finance |
|------|-------|---------|-------|---------|
| 知識庫模組存取 | 完整 | 完整 | 完整（自己建立）/ 唯讀（他人）| 完整（自己建立）/ 唯讀（他人）|
| 建立 / 編輯 / 發布文件 | ✅ | ✅ | ✅（自己的）| ✅（自己的）|
| 封存文件 | ✅ | ✅（含他人）| ✅（僅自己的）| ✅（僅自己的）|
| 取消發布 / 重新發布 | ✅（任何人）| ✅（任何人）| ✅（自己發布的）| ✅（自己發布的）|
| 搜尋 / 瀏覽已發布文件 | ✅ | ✅ | ✅ | ✅ |
| 管理標籤庫（S-09）| ✅ | ❌ | ❌ | ❌ |
| 設定 DocType（S-07）| ✅ | ❌ | ❌ | ❌ |
| 查看全員學習記錄 | ✅ | ✅ | 僅自身 | 僅自身 |
| 批次匯入（遷移工具）| ✅ | ❌ | ❌ | ❌ |

> 📋 **v7.0 更新**：`ROLE_SALES` 廢除。**v7.7 更新**：Finance 開放編輯能力，可建立 / 編輯 / 封存自己建立的文件；他人草稿不可見（僅 published 文件可搜尋瀏覽）。

---

## 8. API 草稿（供後端工程師參考，非最終規格）

```
# 知識文件 CRUD
GET    /api/v1/knowledge                      # 列表（含搜尋、篩選；Finance 等非 Admin/Manager/PM 角色僅能取得 published）
POST   /api/v1/knowledge                      # 建立文件
GET    /api/v1/knowledge/:id                  # 詳情
PUT    /api/v1/knowledge/:id                  # 更新（自動建版本）
DELETE /api/v1/knowledge/:id                  # 軟封存（改為 archived）

# 封存（明確語意端點）
POST   /api/v1/knowledge/:id/archive          # 封存文件 { archive_reason? }
POST   /api/v1/knowledge/:id/unpublish        # 取消發布（published → unpublished；權限：published_by / Manager / Admin）
POST   /api/v1/knowledge/:id/republish        # 重新發布（unpublished → published；權限：published_by / Manager / Admin）
                                              # → 更新 archived_at / archived_by + 寫稽核日誌

# 版本歷史
GET    /api/v1/knowledge/:id/versions         # 版本列表
GET    /api/v1/knowledge/:id/versions/:vno    # 特定版本快照

# 附件
POST   /api/v1/knowledge/:id/attachments      # 上傳附件（multipart；Finance 403）
DELETE /api/v1/knowledge/:id/attachments/:attachment_id  # 刪除附件（Finance 403）

# 標籤
GET    /api/v1/knowledge/tags                 # 標籤庫（供搜尋選擇）
POST   /api/v1/knowledge/tags                 # 建立標籤（Admin only）

# 專案引用
GET    /api/v1/knowledge/:id/projects         # 查看文件被哪些專案引用
POST   /api/v1/knowledge/:id/projects         # 建立引用 { project_id }（Finance 403）
DELETE /api/v1/knowledge/:id/projects/:pid    # 移除引用（Finance 403）

# 從專案端查詢
GET    /api/v1/projects/:id/knowledge         # 查看專案引用的知識文件

# 學習記錄（教材類型）
GET    /api/v1/knowledge/:id/learning         # 查看此教材的學習記錄（Admin / Manager）
POST   /api/v1/knowledge/:id/learning/view    # 記錄閱覽（自動觸發，任意角色）
POST   /api/v1/knowledge/:id/learning/complete # 標記完成（任意角色，針對自身）

# 批次匯入（遷移用，Admin only）
POST   /api/v1/knowledge/import               # 批次匯入 JSON { docs: [...] }
```

---

## 9. 驗收標準（Acceptance Criteria）

### AC-043-01：文件建立與發布（PM/PD 角色）

```gherkin
Given PM/PD 登入系統，進入知識庫
When 點擊「建立文件」，填寫標題「META 廣告操作 SOP」、選擇 DocType「SOP 流程文件」、輸入內容、點擊「發布」
Then 文件狀態變為 published
And 文件出現在知識庫列表中
And 建立版本快照 v1，記錄 changed_by = PM.id、changed_at = 當前時間
And 稽核日誌記錄事件 knowledge.created（doc_id、author_id、created_at）
And 稽核日誌記錄事件 knowledge.published（doc_id、author_id、published_at）
```

### AC-043-02：草稿不被搜尋到

```gherkin
Given PM/PD 建立了一份 status = draft 的文件「未發布測試文件」
When 其他使用者在知識庫搜尋「未發布測試」
Then 搜尋結果不包含該文件
When PM/PD 本人進入知識庫列表（篩選「草稿」）
Then 可以看到自己的草稿文件
```

### AC-043-03：全文搜尋返回正確結果

```gherkin
Given 知識庫中有一份 published 文件，標題為「KOL 媒合作業指南」，內文包含「創作者篩選標準」
When 使用者搜尋「創作者篩選」
Then 3 秒內返回結果，包含該文件
And 搜尋結果依相關度排序（標題匹配 > 內文匹配）
```

### AC-043-04：自動版本快照

```gherkin
Given 知識文件「META 廣告操作 SOP」目前為 v1
When PM/PD 更新文件內容並儲存
Then 系統自動建立版本 v2 的快照（全量 content_snapshot）
And v1 版本快照仍完整保留，可在版本歷史查看
And 文件列表顯示「最後更新：剛剛」
```

### AC-043-05：專案雙向引用

```gherkin
Given 知識文件「電商陪跑 SOP」已發布，專案「老撈 2025 顧問服務」存在
When PM/PD 在文件詳情頁點擊「引用至專案」，選擇「老撈 2025 顧問服務」並確認
Then ProjectKnowledgeRef 建立（doc_id, project_id）
And 在文件詳情頁側欄顯示「已引用至：老撈 2025 顧問服務」
And 在服務頁「相關知識文件」Tab 出現「電商陪跑 SOP」
```

### AC-043-06：教材閱覽記錄

```gherkin
Given 員工「小明」首次點開 doc_type = training 的「新進 PM 教育訓練」教材
When 文件詳情頁載入完成
Then 系統建立 LearningRecord（user_id = 小明.id, first_viewed_at = now, view_count = 1）
When 小明再次打開同一份教材
Then view_count 更新為 2，last_viewed_at 更新
When Manager 查看全員學習記錄
Then 可看到小明的閱覽記錄（view_count = 2, is_completed = false）
```

### AC-043-07：完成標記

```gherkin
Given 小明閱覽教材中，is_completed = false
When 小明點擊「標記為完成」按鈕
Then LearningRecord.is_completed = true, completed_at = now
And 文件詳情頁顯示「已完成」badge
When 小明再次點擊「取消完成」
Then is_completed = false, completed_at = null（允許撤銷）
```

### AC-043-08：封存文件後搜尋不顯示且寫入稽核日誌（v4.0 更新）

```gherkin
Given 文件「舊版 META SOP」status = published
When Admin 呼叫 POST /api/v1/knowledge/:id/archive，帶入 archive_reason = "已被新版 SOP 取代"
Then KnowledgeDoc.status = archived
And archived_at = now()，archived_by = Admin.id，archive_reason = "已被新版 SOP 取代"
And 稽核日誌記錄事件 knowledge.archived（doc_id、archived_by、archived_at、archive_reason）
And 文件不出現在搜尋結果中
And 已存在的 ProjectKnowledgeRef 引用關係仍保留（不自動刪除）
And 引用此文件的服務頁顯示「⚠️ 此文件已封存」提示
```

### AC-043-09：RBAC — Finance 可操作自己建立的文件（v7.7 更新）

```gherkin
Given Finance 角色使用者「阿明」登入
When 阿明進入知識庫列表頁
Then 「建立文件」按鈕顯示
And 阿明可建立文件並發布

Given 阿明發布了「請款 SOP」（published_by = 阿明.id）
When 阿明點擊「取消發布」
Then 操作成功，KnowledgeDoc.status = unpublished

Given 另一位 PM 小明建立了「廣告操作指南」
When 阿明嘗試封存小明的文件
Then API 回傳 403（非文件建立者 / 非 Manager / 非 Admin）
```

### AC-043-10：批次匯入（遷移工具，Admin only）

```gherkin
Given Admin 準備一份格式正確的匯入 JSON（含 title, content_body, doc_type, tags）
When 呼叫 POST /api/v1/knowledge/import
Then 系統批次建立 KnowledgeDoc 記錄，is_migrated = true
And 每份文件自動建立 v1 版本快照
And 稽核日誌批次記錄 knowledge.imported 事件
And 回傳結果報告（成功 N 筆 / 失敗 M 筆 + 失敗原因）
```

---

## 10. 待確認事項

| 編號 | 類型 | 問題 | SA 建議方向 | 影響範圍 | 狀態 |
|------|------|------|------------|---------|------|
| **B-13** | 業務決策 | Google 雲端資料遷移策略：全量遷移（A）/ 漸進遷移（B）/ 只建連結（C）？ | 方案 B（漸進遷移） | 遷移工具開發、搜尋完整度、骨架 §3.3 整合清單更新 | 🔴 **[OPEN — 啟動阻斷]** |
| **B-14** | 業務決策 | 104 企業學習平台整合決策：取代（A）/ 並行（B）/ 連結整合（C）？ | 方案 B（並行） | 學習記錄功能範疇、DocType 設計、LearningRecord 欄位 | 🔴 **[OPEN — 啟動阻斷]** |
| T-15 | 技術確認 | 全文搜尋技術：PostgreSQL FTS vs. Elasticsearch？ | PostgreSQL FTS（MVP） | 搜尋效能、基礎建設複雜度 | `open` |
| T-16 | 技術確認 | 附件儲存方案：AWS S3 / GCP Cloud Storage / 自建 MinIO？單檔大小上限？ | 依現有基礎建設決定 | 附件 API 設計、單檔大小上限填入（暫定 50 MB）、CDN 策略 | `open` |
| T-17 | 技術確認 | 富文本編輯器選型：Quill / TipTap / 純 Markdown？ | TipTap（MIT License）| UI 開發工作量 | `open` |
| T-18 | 技術確認 | Google Drive API 整合：批次遷移工具是否需支援直接讀取 / 轉換 Docs 格式？ | 依 B-13 決策後確認 | 遷移工具複雜度 | `open`（等 B-13）|
| T-19 | 技術確認 | 版本快照儲存：全量 content 快照 vs. diff patch？ | 全量快照（簡單可靠）| DB 儲存空間 | `open` |
| T-20 | 技術確認 | 搜尋索引更新時機：同步 vs. 非同步（背景 job）？最大延遲？ | 非同步，最大延遲 ≤60 秒 | 搜尋結果即時性 | `open` |
| B-15 | 業務決策 | `visibility = role_based` 的具體角色規則：哪些 DocType 需角色可見限制？ | SOP / 訓練教材建議設 role_based | RBAC 實作範疇 | `open` |
| B-16 | 業務決策 | 文件收藏功能：前端個人偏好（localStorage）vs. 入庫持久化？ | localStorage（MVP 足夠）| 後端工作量 | `open` |

---

## 11. 與其他 REQ 的關係

```
REQ-0043（全域知識庫）← 本文件
  │
  ├── 依賴（上游）
  │     ├── REQ-0001（使用者管理）：RBAC 身份驗證、User.id 供 author_id / linked_by / archived_by
  │     ├── REQ-0002（系統設定）：S-07 DocType 管理、Tag 設定、附件大小上限
  │     ├── REQ-0003（稽核日誌）：knowledge.created / published / archived / imported 事件寫入  ← v4.0 新增
  │     ├── REQ-0040（專案建立）：Project.id 供 ProjectKnowledgeRef（引用粒度：Project 層）
  │     └── REQ-0041（專案執行）：服務詳情頁整合「相關知識文件」Tab
  │
  └── 影響（下游）
        └── 無強制下游依賴（F-04 知識層為終端消費層，不被其他 REQ 依賴）
```

---

*— REQ-0043 規格文件結束 —*
*P2 階段 REQ（共 REQ-0043 / REQ-0045 兩支），待 B-13 / B-14 決策完成後同批進入 Sprint 規劃。*

---

# §20｜REQ-0045 專案 Wiki

| 欄位 | 內容 |
|------|------|
| **REQ-ID** | REQ-0045 |
| **Use Case ID** | UC-045 |
| **PRD 章節** | 5.5.5（P2 擴充版） |
| **所屬模組** | F-04 Core 4 專案執行層 |
| **優先級** | `P2` |
| **狀態** | `open` — 規格 v1.0；與 REQ-0043 同批啟動（B-13 / B-14 決策完成後進入 Sprint 規劃） |
| **最後更新** | 2026-06-29（v1.0 新增） |
| **依賴關係** | REQ-0001（RBAC）、REQ-0003（稽核日誌）、REQ-0040（Project 主表）、**REQ-0043（全域知識庫，`KnowledgeDoc` / `ProjectKnowledgeRef` / `KnowledgeDocVersion` 基礎設施，發布功能之前置依賴）** |

---

## 1. 背景與設計動機

### 1.1 現行痛點

昊揚各專案的執行知識（客戶偏好、操作眉角、歷史決策脈絡）完全依賴個人記憶或分散在 Google Drive 各自的資料夾中。PM 交接時，接手者必須重新向前任詢問，或翻找無結構化的 Google Docs；結案後的知識更是直接消散，下一個類似客戶無從參考。

REQ-0041 的「營銷計畫表」（Tab 3）解決的是外部連結和文件上傳，但不支援在系統內撰寫結構化文字知識。

### 1.2 設計目標

| 目標 | 成功標準 |
|------|---------|
| 在專案內撰寫知識 | PM 可直接在系統內建立、編輯 wiki 文章，不需切換到 Google Docs |
| 知識可沉澱至全域 | 有價值的文章可一鍵發布至全域知識庫（REQ-0043），供跨專案搜尋引用 |
| 發布後可追溯 | 所有 wiki 操作（建立、編輯、發布、刪除）寫入稽核日誌 |
| 版本可追蹤 | 與 REQ-0043 `KnowledgeDocVersion` 一致，編輯後自動建立版本快照 |

---

## 2. 功能描述

> 系統應在專案詳情頁新增「知識庫」Tab，允許專案服務團隊成員在專案範疇內建立、編輯、刪除 wiki 文章（富文本格式）；草稿狀態的文章僅限該專案服務團隊可見；PM 可將文章一鍵發布至全域知識庫（`KnowledgeDoc`），發布後文章自動套用 `doc_type = project_wiki` 並透過 `ProjectKnowledgeRef` 關聯回本專案；刪除已發布文章時，對應的 `KnowledgeDoc` 記錄同步軟刪除；所有操作受 RBAC 控管並寫入稽核日誌。

---

## 3. 資料模型

### 3.1 設計原則（方案 B：單一來源型）

`ProjectWiki` 文章在發布前為獨立草稿；發布後，系統在 `KnowledgeDoc` 建立一筆對應記錄，`ProjectWiki.knowledge_doc_id` 指向它，`ProjectKnowledgeRef` 建立專案關聯。後續的內容編輯雙向同步（`ProjectWiki.content_body` = `KnowledgeDoc.content_body`），版本快照統一由 `KnowledgeDocVersion` 記錄。

此設計確保：
- 草稿期無全域 footprint
- 發布後 REQ-0043 的全文搜尋、版本歷史、稽核日誌全部適用
- 刪除語意清晰：刪除 wiki = 軟刪除 `KnowledgeDoc`

### 3.2 ProjectWiki 資料表（新增）

```
ProjectWiki {
  id                UUID          PK
  project_id        UUID          NOT NULL, FK → Project.id
  title             VARCHAR(200)  NOT NULL                    -- 文章標題
  content_body      TEXT                                      -- 富文本內容（HTML，Quill / TipTap 產生）
  status            ENUM          draft | published | unpublished  -- 草稿 / 已發布 / 已取消發布
  knowledge_doc_id  UUID                    FK → KnowledgeDoc.id  -- 發布後填入，草稿為 NULL
  created_by        UUID          NOT NULL, FK → User.id
  created_at        TIMESTAMP     DEFAULT now()
  updated_by        UUID                    FK → User.id
  updated_at        TIMESTAMP
  deleted_at        TIMESTAMP                                 -- 軟刪除時間戳，NULL = 未刪除
  deleted_by        UUID                    FK → User.id
}
```

**欄位說明：**

| 欄位 | 說明 |
|------|------|
| `status` | `draft`：草稿，僅專案服務團隊可見。`published`：已發布至全域，全域知識庫可搜尋。`unpublished`：已取消發布，全域不顯示，僅作者、Admin、Manager 可見。 |
| `knowledge_doc_id` | 發布時建立 `KnowledgeDoc` 記錄後填入此 FK；未發布時為 NULL。 |
| `deleted_at` | 軟刪除。若 `knowledge_doc_id` 非 NULL，同步將 `KnowledgeDoc.status` 設為 `archived`。 |

### 3.3 發布時的關聯建立流程

```
PM 點擊「發布至全域知識庫」
    │
    ▼
系統建立 KnowledgeDoc {
  title         = ProjectWiki.title
  content_body  = ProjectWiki.content_body
  doc_type      = 'project_wiki'   ← 自動套用，不需使用者選擇
  status        = 'published'
  author_id     = 操作者 User.id
  published_at  = now()
  published_by  = 操作者 User.id   ← 取消/重新發布權限判斷依據
}
    │
    ├── 建立 KnowledgeDocVersion（初始版本快照）
    ├── 建立 ProjectKnowledgeRef { doc_id, project_id, linked_by }
    └── 更新 ProjectWiki.knowledge_doc_id = KnowledgeDoc.id
        更新 ProjectWiki.status = 'published'
        更新 KnowledgeDoc.published_by = 操作者 User.id
    │
    ▼
寫入稽核日誌：wiki.published（knowledge_doc_id, project_id, user_id）
```

### 3.4 刪除已發布文章的流程

```
PM 點擊「刪除」（已發布文章）
    │
    ▼
系統執行：
  ProjectWiki.deleted_at = now()
  ProjectWiki.deleted_by = 操作者 User.id
  KnowledgeDoc.status    = 'archived'        ← 軟刪除，全域不再顯示
  ProjectKnowledgeRef 記錄保留（歷史稽核）
    │
    ▼
寫入稽核日誌：wiki.deleted（knowledge_doc_id, project_id, user_id）
```

### 3.4b 取消發布與重新發布流程

```
PM / Manager / Admin 點擊「取消發布」（已發布文章）
    │
    ├── 權限檢查：published_by = current_user OR ROLE_MANAGER OR ROLE_ADMIN
    │   └── 不符合 → 403
    │
    ▼
系統執行：
  ProjectWiki.status           = 'unpublished'
  KnowledgeDoc.status          = 'unpublished'
  KnowledgeDoc.unpublished_at  = now()
  KnowledgeDoc.unpublished_by  = current_user.id
  ProjectKnowledgeRef 保留（引用處顯示「⚠️ 此文件已暫停發布」）
    │
    ▼
寫入稽核日誌：wiki.unpublished

重新發布：
  ProjectWiki.status           = 'published'
  KnowledgeDoc.status          = 'published'
  KnowledgeDoc.published_at    = now()
  KnowledgeDoc.unpublished_at / unpublished_by 清空
寫入稽核日誌：wiki.republished
```

### 3.5 版本歷史

每次儲存（`PUT /api/v1/projects/:id/wiki/:wiki_id`）：
- 若 `status = draft`：僅更新 `ProjectWiki.content_body`，不產生版本快照
- 若 `status = published`：同步更新 `KnowledgeDoc.content_body`，並自動建立 `KnowledgeDocVersion` 快照（與 REQ-0043 §4.3 版本管理機制一致）

### 3.6 實體關係

```
Project（REQ-0040）
  └── 1:N → ProjectWiki（project_id）

ProjectWiki
  └── 0:1 → KnowledgeDoc（knowledge_doc_id，發布後才有值）
             ├── 1:N → KnowledgeDocVersion（版本快照）
             └── N:N → Project（透過 ProjectKnowledgeRef）

AuditLog（REQ-0003）
  └── wiki.created / wiki.published / wiki.updated / wiki.deleted
```

---

## 4. 業務規則

**⚠️ BR-045-01：草稿可見範圍**
`status = draft` 的文章，API 對 `ProjectMember`（該專案服務團隊成員）及 Admin / Executive / Manager 完整回傳（含他人草稿）；Finance 僅可取得自己建立的草稿（`created_by = current_user`），他人草稿不可見。

**⚠️ BR-045-02：發布前置條件**
`ProjectWiki.knowledge_doc_id` 為 NULL 時（草稿），點擊發布才觸發 `KnowledgeDoc` 建立流程；若已有 `knowledge_doc_id`（已發布），再次點擊「發布」僅同步最新內容並建立新版本，不重複建立 `KnowledgeDoc`。

**⚠️ BR-045-03：一篇 wiki 對應一筆 KnowledgeDoc**
不允許同一篇 `ProjectWiki` 發布至多筆 `KnowledgeDoc`。`knowledge_doc_id` 一旦設定不可更改。

**⚠️ BR-045-04：刪除後無法恢復（P2 MVP 範疇）**
軟刪除後，`KnowledgeDoc.status = archived`，全域知識庫不顯示；若需復原，需 Admin 手動操作（P2 MVP 不提供 UI 復原入口）。

**⚠️ BR-045-05：doc_type 自動鎖定**
發布時自動套用 `doc_type = 'project_wiki'`，不允許使用者手動修改 DocType（需 REQ-0002 S-07 設定中將 `project_wiki` 列為系統保留類型）。

**⚠️ BR-045-06（v7.8 新增）**：取消發布後，`ProjectWiki.status = unpublished`，`KnowledgeDoc.status = unpublished`，文件從全域知識庫消失；`ProjectKnowledgeRef` 保留，引用處顯示「⚠️ 此文件已暫停發布」。

**⚠️ BR-045-07（v7.8 新增）**：重新發布不重建 `KnowledgeDoc`（`knowledge_doc_id` 不變），僅更新 `status = published` 與 `published_at`；同步建立新的 `KnowledgeDocVersion` 快照（記錄重新發布時間點的內容狀態）。

---

## 5. UI 規格

### 5.1 Tab 6 位置

專案詳情頁（REQ-0041 §10）新增 Tab 6：

```
專案詳情頁
├── Tab 1：專案資訊
├── Tab 2：服務項目
├── Tab 3：營銷計畫表
├── Tab 4：報價單列表
├── Tab 5：合約列表
└── Tab 6：知識庫        ← 新增（REQ-0045）
```

### 5.2 知識庫 Tab 佈局

```
知識庫 Tab
├── 頁首操作列
│   └── [+ 新增文章]（所有角色均顯示）
│
├── 文章列表（卡片式）
│   每張卡片顯示：
│   ├── 文章標題
│   ├── 狀態 badge（草稿 / 已發布 / 已取消發布）
│   ├── 最後編輯者 + 時間（相對時間，如「3 天前」）
│   └── 操作按鈕（依狀態與權限顯示）
│       ├── [編輯]（自己建立的 / Manager / Admin）
│       ├── [發布至全域]（draft / unpublished；自己建立的 / Manager / Admin）
│       ├── [取消發布]（published；published_by / Manager / Admin）
│       ├── [重新發布]（unpublished；published_by / Manager / Admin）
│       └── [刪除]（自己建立的 / Manager / Admin）
│
└── 空狀態：「尚無知識文章，點擊新增開始建立」
```

### 5.3 文章詳情 / 編輯頁

```
文章詳情頁
├── 頁首
│   ├── 文章標題（可編輯，inline editing）
│   ├── 狀態 badge（草稿 / 已發布 / 已取消發布）
│   └── 操作按鈕：[儲存] [發布至全域知識庫] [取消發布]（已發布才顯示）[重新發布]（已取消發布才顯示）[刪除]
│
├── 富文本編輯器（Quill / TipTap，選型待前端確認）
│   支援：標題層級、粗體/斜體、清單、程式碼區塊、超連結、圖片插入
│
└── 側欄（已發布文章才顯示）
    ├── 版本歷史（最近 5 版，點擊展開全文對照）
    └── 全域知識庫連結（「在全域知識庫中查看」）
```

> 📋 **Finance 角色 UI**：Tab 6 完整顯示，可建立文章、編輯 / 發布 / 刪除**自己建立**的文章；他人草稿不顯示（僅 published 可見）。

---

## 6. RBAC 權限矩陣（REQ-0045）

| 功能 | Admin | Executive | Manager | PM/PD | Finance |
|------|-------|-----------|---------|-------|---------|
| 查看 Tab 6 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 查看草稿文章 | ✅ | ✅ | ✅ | ✅（同專案）| ❌ |
| 建立文章 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 編輯文章 | ✅ | ✅ | ✅ | ✅（自己的）| ✅（自己的）|
| 刪除文章 | ✅ | ✅ | ✅（含他人）| ✅（自己的）| ✅（自己的）|
| 發布至全域（首次）| ✅ | ✅ | ✅ | ✅（自己的）| ✅（自己的）|
| 取消發布 / 重新發布 | ✅（任何人）| ✅（任何人）| ✅（任何人）| ✅（自己發布的）| ✅（自己發布的）|

> 📋 **可見範圍說明**：PM/PD 對「同專案」的定義為 `ProjectMember` 中存在有效任期記錄（`assigned_to IS NULL`）；Finance 同理，需為 `ProjectMember` 才能進入 Tab 6。Finance 可查看**自己建立**的草稿文章；他人草稿不可見。跨專案的 wiki 草稿對 PM/PD 及 Finance 均不可見。

---

## 7. API 草稿（供後端工程師參考，非最終規格）

```
# 專案 Wiki CRUD
GET    /api/v1/projects/:id/wiki              # 列表（Finance 取 published + unpublished(自己的) + draft(自己的)；其他角色取全部）
POST   /api/v1/projects/:id/wiki              # 建立文章（全角色）
GET    /api/v1/projects/:id/wiki/:wiki_id     # 詳情
PUT    /api/v1/projects/:id/wiki/:wiki_id     # 更新內容（自己建立的 / Manager / Admin；published 文章同步更新 KnowledgeDoc 並建版本）
DELETE /api/v1/projects/:id/wiki/:wiki_id     # 軟刪除（自己建立的 / Manager / Admin；published 文章同步 archived KnowledgeDoc）

# 發布操作
POST   /api/v1/projects/:id/wiki/:wiki_id/publish
# 草稿 → published：建立 KnowledgeDoc + ProjectKnowledgeRef + KnowledgeDocVersion
# 已發布 → 同步最新內容至 KnowledgeDoc + 建新 KnowledgeDocVersion
# Response 200: { wiki_id, knowledge_doc_id, version_number }

POST   /api/v1/projects/:id/wiki/:wiki_id/unpublish
# published → unpublished；權限：published_by / Manager / Admin
# 同步 KnowledgeDoc.status = unpublished

POST   /api/v1/projects/:id/wiki/:wiki_id/republish
# unpublished → published；權限：published_by / Manager / Admin
# 同步 KnowledgeDoc.status = published，建新 KnowledgeDocVersion
```

---

## 8. 驗收標準

**AC-045-001：草稿僅限專案成員可見**
```gherkin
Given 白菜（PM）在「老撈麻辣鍋」專案建立一篇草稿文章「客戶偏好筆記」
When Finance 用戶進入同一專案的知識庫 Tab
Then 文章列表不顯示「客戶偏好筆記」

When 另一個非此專案成員的 PM 進入知識庫 Tab
Then 文章列表不顯示「客戶偏好筆記」
```

**AC-045-002：發布流程建立全域記錄**
```gherkin
Given 白菜（PM）在草稿文章「META 廣告操作眉角」點擊「發布至全域知識庫」
When 發布完成
Then ProjectWiki.status = 'published'
And KnowledgeDoc 建立一筆新記錄，doc_type = 'project_wiki'，status = 'published'
And ProjectKnowledgeRef 建立關聯（doc_id, project_id）
And 全域知識庫列表可搜尋到「META 廣告操作眉角」
And 稽核日誌記錄 wiki.published 事件
```

**AC-045-003：刪除已發布文章同步封存全域記錄**
```gherkin
Given 「META 廣告操作眉角」已發布，KnowledgeDoc.status = 'published'
When 白菜點擊「刪除」並確認
Then ProjectWiki.deleted_at 填入當前時間
And KnowledgeDoc.status = 'archived'
And 全域知識庫列表不再顯示「META 廣告操作眉角」
And 稽核日誌記錄 wiki.deleted 事件
```

**AC-045-004：編輯已發布文章同步更新版本**
```gherkin
Given 「META 廣告操作眉角」已發布（KnowledgeDocVersion v1 存在）
When 白菜修改內容並儲存
Then KnowledgeDoc.content_body 同步更新
And KnowledgeDocVersion 新增 v2 版本快照
And 文章詳情頁側欄顯示版本歷史 v1 / v2
```

**AC-045-005：Finance 可操作自己建立的 wiki，他人草稿不可見**
```gherkin
Given Finance 用戶（Debby）進入專案知識庫 Tab
Then 頁面顯示「+ 新增文章」按鈕
And Debby 可建立新文章並儲存
And Debby 自己建立的草稿文章顯示 [編輯] [發布至全域] [刪除] 按鈕

Given 同一專案中白菜（PM）建立了一篇草稿文章
When Debby 查看知識庫 Tab 文章列表
Then 白菜的草稿文章不顯示
And 白菜的 published 文章顯示（但不顯示 [編輯] [刪除] 按鈕）
```

---

## 9. 待確認事項

| 編號 | 類型 | 問題 | 負責人 | 狀態 |
|------|------|------|--------|------|
| T-23 | 技術確認 | 富文本編輯器選型：Quill vs. TipTap（考量 SSR 相容性、授權條款、套件大小） | 前端工程師 | `open` |
| T-24 | 技術確認 | 富文本圖片插入的儲存方案（Base64 inline vs. 上傳至 S3/GCS）；建議與 T-16（REQ-0043 附件儲存）統一決策 | 後端工程師 | `open` |

---

## 10. 與其他 REQ 的關係

```
REQ-0001（使用者管理）
  └─ RBAC：角色權限控管（Finance 可操作自己建立的文章；他人草稿不可見）

REQ-0003（稽核日誌）
  └─ 所有 wiki 操作自動寫入（wiki.created / wiki.published / wiki.updated / wiki.deleted）

REQ-0040（專案建立）
  └─ Project 主表（project_id FK）；ProjectMember 作為草稿可見範圍判斷依據

REQ-0043（全域知識庫）← 本文件的關鍵上游依賴
  ├─ KnowledgeDoc：發布後的全域記錄主體
  ├─ KnowledgeDocVersion：版本快照機制
  ├─ ProjectKnowledgeRef：專案與全域文件的關聯
  └─ doc_type = 'project_wiki'（需在 REQ-0002 S-07 DocType 設定中新增此保留類型）

REQ-0045（專案 Wiki）← 本文件
  └─→ REQ-0043：發布操作直接擴充全域知識庫的文件集
```

---

*— REQ-0045 規格文件結束 —*
*P2 階段第二 REQ；與 REQ-0043 同批啟動。*

---

# 附錄 P2-A｜P2 全域待確認事項彙整

## P2-A.1 啟動阻斷（必須在 Sprint 0 前決策）

| 編號 | 影響 REQ | 問題 | SA 建議方向 |
|------|---------|------|-----------|
| **B-13** | REQ-0043 | Google 雲端資料遷移策略：全量 / 漸進 / 只建連結？ | 方案 B（漸進遷移） |
| **B-14** | REQ-0043 | 104 企業學習平台整合：取代 / 並行 / 連結整合？ | 方案 B（並行） |

## P2-A.2 技術確認（Sprint 1 前確認）

| 編號 | 問題 | 建議 | 影響 NFR |
|------|------|------|---------|
| T-15 | 搜尋技術選型 | PostgreSQL FTS（MVP）| 搜尋回應 ≤3s（P95 基準）|
| T-16 | 附件儲存方案與單檔上限 | 依現有基礎建設 | 附件單檔大小上限（暫定 50 MB，T-16 決策後更新）|
| T-17 | 富文本編輯器選型 | TipTap | — |
| T-18 | Google Drive API 整合（批次遷移工具格式）| 依 B-13 決策後確認 | 遷移工具複雜度 |
| T-19 | 版本快照策略 | 全量快照 | — |
| T-20 | 索引更新時機與最大延遲 | 非同步，≤60 秒 | 索引更新最大延遲 ≤60 秒 |

| T-23 | 專案 Wiki 編輯器選型：Quill vs. TipTap（SSR 相容性、授權條款、套件大小）| TipTap（建議與 T-17 統一決策）| — |
| T-24 | 富文本圖片插入儲存方案（Base64 inline vs. S3/GCS）| 建議與 T-16 統一決策 | — |

## P2-A.3 業務決策（不影響啟動，Sprint 2 前確認）

| 編號 | 問題 | 建議 |
|------|------|------|
| B-15 | role_based 可見性規則（哪些 DocType）| SOP / 教材建議 role_based |
| B-16 | 文件收藏持久化需求 | localStorage（MVP）|

---

# 附錄 P2-B｜資料遷移策略草案（待業主決策 B-13）

## P2-B.1 遷移對象盤點（待各 PM / 部門提供）

| 資料來源 | 文件類型 | 預估份數 | 重要性 | 建議遷移時程 |
|---------|---------|---------|-------|------------|
| Google Drive - 整合行銷部 | 企劃書、SOP | 待盤點 | 高 | 上線後 1 個月 |
| Google Drive - 數位廣告部 | 操作指南、結報 | 待盤點 | 高 | 上線後 1 個月 |
| Google Drive - 電商部 | 策略文件 | 待盤點 | 中 | 上線後 2 個月 |
| 104 企業學習平台 | 教育訓練教材 | 待盤點 | 依 B-14 決策 | 依 B-14 決策 |

## P2-B.2 批次匯入格式草案（方案 A / B 適用）

```json
{
  "docs": [
    {
      "title": "META 廣告代操 SOP v2.0",
      "doc_type": "sop",
      "content_body": "# 操作步驟\n...",
      "tags": ["META", "廣告", "SOP"],
      "source_url": "https://drive.google.com/...",
      "published_at": "2025-01-15T00:00:00Z"
    }
  ]
}
```

---

# 附錄 P2-C｜P2 資料模型新增彙整（含 ERD 關係）

✅ **v4.0 新增（G-01）**：補充 P2 新增資料表的 ERD 關係說明，供後端工程師繪製正式 ERD 時參考。

## P2-C.1 新增資料表清單

| 資料表 | 類型 | 說明 | 影響模組 |
|--------|------|------|---------|
| `KnowledgeDoc` | 主表 | 知識文件主檔（含封存稽核欄位 archived_by / archive_reason）| F-04 |
| `KnowledgeDocVersion` | 子表 | 文件版本快照（全量 content_snapshot）| F-04 |
| `KnowledgeDocAttachment` | 子表 | 附件管理 | F-04 |
| `Tag` | 主表 | 標籤庫 | F-04 |
| `KnowledgeDocTag` | 關聯表 | 文件 × 標籤 多對多 | F-04 |
| `ProjectKnowledgeRef` | 關聯表 | 文件 × 專案 多對多（引用粒度：Project 層）| F-04 |
| `LearningRecord` | 子表 | 教材閱覽記錄（僅 doc_type = training）| F-04 |

## P2-C.2 ERD 關係說明（文字版）

```
User（REQ-0001）
  ├── 1:N → KnowledgeDoc（author_id）         作者
  ├── 1:N → KnowledgeDoc（archived_by）        封存操作者
  ├── 1:N → KnowledgeDocVersion（changed_by）  版本操作者
  ├── 1:N → KnowledgeDocAttachment（uploaded_by）附件上傳者
  ├── 1:N → ProjectKnowledgeRef（linked_by）   引用操作者
  └── 1:N → LearningRecord（user_id）          學習記錄

KnowledgeDoc
  ├── 1:N → KnowledgeDocVersion（doc_id）      版本快照
  ├── 1:N → KnowledgeDocAttachment（doc_id）   附件
  ├── N:N → Tag（透過 KnowledgeDocTag）        標籤
  ├── N:N → Project（透過 ProjectKnowledgeRef）專案引用（Project 層）
  └── 1:N → LearningRecord（doc_id）           教材學習記錄

Project（REQ-0040）
  └── N:N → KnowledgeDoc（透過 ProjectKnowledgeRef）
            ↳ Brand 層的橫向引用透過多 Project 各自引用同一 doc 實現
              不直接建立 Brand → KnowledgeDoc 關聯

AuditLog（REQ-0003）
  └── 1:N（事件來源）← KnowledgeDoc 操作
      事件類型：knowledge.created / knowledge.published /
               knowledge.archived / knowledge.imported
```

---

# 附錄 P2-D｜系統設定新增群組（S-07）

**S-07 知識庫設定**（新增至 REQ-0002 全域系統設定）

| 設定群組 | 設定項目 | 說明 | 影響模組 |
|---------|---------|------|---------|
| S-07 | DocType 清單管理 | 新增 / 停用文件類型（預設 7 種不可刪除有關聯的類型）| REQ-0043 |
| S-07 | 標籤庫管理 | 新增 / 編輯 / 停用標籤（顏色、名稱）| REQ-0043 |
| S-07 | 附件大小上限 | 單檔最大 MB 數（待 T-16 決策後填入實際預設值）| REQ-0043 |
| S-07 | 搜尋結果顯示筆數 | 每頁預設顯示數量（建議 20 筆）| REQ-0043 |

---

*文件結束*
*昊揚行銷管理系統 PRD v5.6 完整版*
*SA 系統架構師出品 | 2026-06-09*

# 附錄 P1-A｜P1 全域待確認事項

以下彙整 P1 階段所有仍為 `open` 的待業主確認事項。建議在 **P1 Sprint 0 規劃會議**中逐一決策。

## 最高優先（影響核心計算邏輯，Sprint 0 前確認）

| 編號 | 影響 REQ | 問題 | SA 建議方向 |
|------|---------|------|-----------|
| **B-36** | REQ-0025 / REQ-0052 | 多人同角色時的貢獻權重拆分規則：平均分攤（A）vs. 手動指定比例（B）？ | 方案 A（平均分攤） |

## 待規格（未來 Sprint）

| 編號 | 影響 REQ | 問題 | SA 建議方向 |
|------|---------|------|-----------| 
| B-58 | REQ-0040 | 已結案專案回朔機制：觸發條件、權限設計（誰可申請？需主管審核？）、回朔後狀態（`active` vs. 新增 `reopened`）、Service 狀態如何處理 | 待業主確認後規格化 |

## 高優先（Sprint 1 前確認）

| 編號 | 影響 REQ | 問題 | SA 建議方向 |
|------|---------|------|-----------|
| ~~B-43~~ | ~~REQ-0026~~ | ~~分級確認流程：財務確認→Manager 核准（兩步驟）vs. 財務直接發布（單步驟）？~~ | ✅ resolved（v9.0）：單步驟，Finance 直接發布 |
| B-44 | REQ-0025 | 有預收款案件時，開案按鈕是否強制攔截？ | 不強制攔截，顯示提示 |
| B-45 | REQ-0042 | 廠商採購審核層數：主管單層 vs. 主管+財務兩層？ | ✅ resolved（v8.8）：主管單層 |

## 中優先（Sprint 2 前確認）

| 編號 | 影響 REQ | 問題 | SA 建議方向 |
|------|---------|------|-----------|
| B-34 | REQ-0025 / REQ-0026 | 開案通知、分級通知管道 | ✅ resolved：站內通知 + Email |
| B-38 | REQ-0042 | 採購成本核算觸發時機：廠商報價後確認（A）vs. 提案前預估+廠商報價後調整（B）？ | 方案 B |
| B-39 | REQ-0011 | 常態性廠商的定期付款是否需建立「定期 AP 排程」？ | ✅ resolved（v8.8）：維持手動建立，不建立排程 |
| B-40 | REQ-0011 / REQ-0042 | 廠商合約 PDF 及採購報價 PDF：系統上傳（A）vs. Google Drive 外部連結（B）？ | ✅ resolved（v8.8）：方案 A，直接上傳至系統 |
| B-42 | REQ-0026 | 廣告月投放金額目前在哪個欄位維護？ | 需確認後決定是否補欄位 |

## 低優先（Sprint 3 或後期確認）

| 編號 | 影響 REQ | 問題 | SA 建議方向 |
|------|---------|------|-----------|
| B-46 | REQ-0042 | 昊揚本身作為廠商角色時如何在系統中區分？ | ✅ resolved（v8.8）：廠商名錄新增 `is_internal = true` 欄位 |
| B-50 | REQ-0060 | 客戶續約率定義：合約展延率（A）vs. 年度品牌留存率（B）？ | 方案 A |
| B-51 | REQ-0060 | 儀表板數據是否需要匯出 CSV 功能？ | 建議支援 |
| B-52 | REQ-0050 / REQ-0054 | 帳務鎖定後解鎖的角色定義 | ✅ resolved（v5.9） |
| B-53 | REQ-0050 | ECPay 電子發票觸發方式 | ✅ resolved（v5.6）：方案 B 手動，回簽後 Finance 開立 |
| B-54 | REQ-0052 | Layer 2 部門達標目標金額設定方式 | ✅ resolved（v5.6）：月薪加總 × 倍率，系統自動計算 |
| B-55 | REQ-0050 | 代收代付 AP 端（廣告儲值金支出）是否納入 MVP？ | ✅ resolved（v8.8）：納入 MVP，建立者 PM/PD 或 Finance |
| B-56 | REQ-0050 | 文中拋轉機制 | open |
| B-57 | REQ-0054 | PerformanceRecord 認列計算觸發方式 | ✅ resolved（v5.6）：方案 A 自動建立；獎金手動分配方式待訪談 |

---

# 附錄 P1-B｜P0 暫行方案激活對照清單

| P0 暫行欄位 / 設定 | 對應 P1 REQ | 激活後狀態 | 遷移負責人 |
|-----------------|-----------|----------|----------|
| ~~`ProjectVendor.vendor_name_temp`~~ | ~~REQ-0011~~ | ⚠️ **v8.3 列移除**：`ProjectVendor` 整表廢止，專案與廠商關聯改由 REQ-0042 `VendorQuote` 體系表達；`VendorQuoteItem.vendor_id` 為必填 FK，無暫代文字欄設計（REQ-0040/0041/0042 同步開發，不分階段） | — |
| ~~`APRecord.vendor_name_temp`~~ | ~~REQ-0042~~ | ⚠️ **v8.3 列移除**：REQ-0042 與 REQ-0011/0040/0041 同步開發，不分階段；`APRecord.vendor_id` 自開發起即為正式 FK，無暫代文字欄設計 | — |
| `Brand.customer_grade = NULL` | REQ-0026 | 首次 Cron Job 或手動觸發後填入分級值 | 系統自動（首次計算） |
| `Project.onboarding_id = NULL` | REQ-0025 | 為現有 24 個進行中專案補建 Onboarding 紀錄 | Admin |
| ~~`VENDOR_COST` 工作流無審核者~~ | ~~REQ-0042~~ | ⚠️ **v8.4 列移除**：REQ-0042 與 REQ-0011/0040/0041 同步開發，不分階段；`VENDOR_COST` 工作流審核者須於開發起即在 S-05 設定完成並啟用，無「宣告但不激活」的過渡狀態 | — |

---

# 附錄 P1-C｜P1 資料模型新增欄位彙整

以下為 P1 相較 P0 在現有資料表中新增或激活的欄位，供後端工程師 Migration 參考：

## C.1 Brand 資料表

| 欄位 | 型別 | 變更說明 | 來源 REQ |
|------|------|---------|---------|
| `customer_grade` | ENUM('S','A','B','C','D') | P0 已建欄，P1 由 REQ-0026 正式填值（NULL → 實際分級） | REQ-0026 |
| `grade_updated_at` | TIMESTAMP | P1 新增，記錄最後一次分級更新時間 | REQ-0026 |

## C.2 Project 資料表

| 欄位 | 型別 | 變更說明 | 來源 REQ |
|------|------|---------|---------|
| `onboarding_id` | UUID | P0 已建欄（FK → Onboarding.id），P1 正式填值（NULL → 實際 ID） | REQ-0025 |
| `primary_quote_id` | UUID | ~~P1 新增（FK → Quote.id），觸發開案的主要報價單~~（⚠️ v9.7 廢止：Project 層移除此欄位，改由 `Quote.is_primary = true` 標記開案時選定的報價單群組） | REQ-0025 |

## C.3 APRecord 資料表

| 欄位 | 型別 | 變更說明 | 來源 REQ |
|------|------|---------|---------|
| `vendor_id` | UUID | FK → Vendor.id，正式欄位（v8.3：與 REQ-0042 同步開發，無暫代欄位設計） | REQ-0042 |
| `vendor_quote_id` | UUID | FK → VendorQuote.id，記錄採購申請來源 | REQ-0042 |

## C.4 P1 全新資料表

| 資料表 | 說明 | 來源 REQ |
|--------|------|---------|
| `Vendor` | 廠商主檔 | REQ-0011 |
| `VendorContact` | 廠商聯絡人（一對多） | REQ-0011 |
| `VendorPayment` | 廠商付款資訊（加密） | REQ-0011 |
| `VendorContract` | 廠商合約（含自動編號） | REQ-0011 |
| `Onboarding` | 開案交接主表 | REQ-0025 |
| `OnboardingMember` | 開案人員分工明細 | REQ-0025 |
| `GradingDraft` | 季度分級草稿封面 | REQ-0026 |
| `GradingRecord` | 各品牌分級計算紀錄（含 `grading_draft_id` FK） | REQ-0026 |
| `VendorQuote` | 廠商採購申請 | REQ-0042 |
| `VendorQuoteItem` | ~~廠商報價比較項目（支援多廠商比價）~~（⚠️ v9.8 廢棄：廠商欄位已移入 VendorQuote 主表） | REQ-0042 |
| `PerformanceRecord` | 個人月度認列績效明細 | REQ-0054 |
| `PerformanceAdjustment` | 跨部門內帳調整申請 | REQ-0054 |
| `DeptBonusRecord` | 部門達標獎金批次 | REQ-0052 |
| `DeptBonusAllocation` | 部門獎金人員分配 | REQ-0052 |
| `BonusRecord` | 各成員個人獎金明細 | REQ-0052 |

## C.5 v5.9 新增欄位彙整

| 資料表 | 欄位 | 型別 | 說明 | 來源 REQ |
|--------|------|------|------|---------|
| `User` | `can_unlock_performance` | BOOLEAN DEFAULT false | Finance 帳號解鎖 PerformanceRecord 權限旗標 | REQ-0054 |
| `ARRecord` | `signed_invoice_attachment` | TEXT NULL | 客戶回簽請款單掃描件路徑，發票開立前置條件 | REQ-0050 |
| `APRecord` | `is_advance_payment` | BOOLEAN DEFAULT false | 是否為代客戶墊付款項 | REQ-0050 |
| `APRecord` | `markup_rate` | DECIMAL(5,4) NULL | 代墊加價率（如 0.0500 = 5%） | REQ-0050 |
| `APRecord` | `markup_amount` | DECIMAL(12,2) NULL | 代墊 markup 金額（系統計算） | REQ-0050 |
| `APRecord` | `attachment_url` | TEXT NULL | 紙本請款單掃描件路徑 | REQ-0050 |
| `OnboardingMember` | `assigned_from` | DATE NOT NULL | 人員負責起始日 | REQ-0025 / REQ-0054 |
| `OnboardingMember` | `assigned_to` | DATE NULL | 人員負責結束日（NULL = 仍在任） | REQ-0025 / REQ-0054 |
| `DeptBonusAllocation` | `is_resigned_forfeit` | BOOLEAN DEFAULT false | 被分配者已離職，金額歸公司不發放 | REQ-0052 |

## C.6 v5.10 新增資料表與欄位彙整

### C.6.1 P1 全新資料表（REQ-0006）

| 資料表 | 說明 | 來源 REQ |
|--------|------|---------|
| `Position` | 職位主檔（執行長 / 總經理 / 部門主管 / PD / MPM / PM / 執行） | REQ-0006 |
| `Appointment` | 人員任命記錄（含多部門兼任、起訖日、兼任標記） | REQ-0006 |

### C.6.2 現有資料表擴充欄位（REQ-0006）

| 資料表 | 欄位 | 型別 | 說明 | 來源 REQ |
|--------|------|------|------|---------|
| `Department` | `dept_type` | ENUM('business','support','executive') | 部門類型，控制是否計入績效目標 | REQ-0006 |
| `Department` | `parent_id` | UUID NULL FK → Department.id | 上層部門（樹狀結構） | REQ-0006 |
| `Department` | `manager_user_id` | UUID NULL FK → User.id | 部門正式主管（顯示用） | REQ-0006 |
| `Department` | `dept_description` | TEXT NULL | 部門職責說明 | REQ-0006 |
| `Department` | `suggested_role` | ENUM NULL | 建議賦予角色（UI 提示，不強制） | REQ-0006 |
| `Department` | `sort_order` | INT DEFAULT 0 | 同層級顯示排序 | REQ-0006 |
| `User` | `job_title` | VARCHAR(50) NULL | 職稱（顯示用，不影響 RBAC） | REQ-0006 |
| `UserRole` | `role` ENUM 新增值 | `ROLE_EXECUTIVE` | 執行長專屬角色 | REQ-0006 / REQ-0001 |

### C.6.3 廢棄欄位

| 資料表 | 欄位 | 廢棄版本 | 替代方案 |
|--------|------|---------|---------|
| `User` | `department_id` | v5.10 | `Appointment.department_id`（人員任命記錄）|


## C.7 v6.3 新增 / 重新定義欄位彙整

| 資料表 | 欄位 | 型別 | 說明 | 來源 REQ |
|--------|------|------|------|----------|
| `User` | `probation_status` | ENUM('probation','confirmed') DEFAULT 'confirmed' | 試用期狀態；'probation' = 試用期中，'confirmed' = 正式員工 | REQ-0001 / REQ-0052 |
| `User` | `probation_start_date` | DATE NULL | 試用期起始日，probation_status = 'probation' 時填入 | REQ-0001 |
| `User` | `probation_end_date` | DATE NULL | **v6.3 重新定義**：實際轉正日（原 v5.9 定義為固定截止日廢棄）；Admin 執行轉正操作時填入；NULL = 尚未轉正 | REQ-0001 / REQ-0052 |

---

# 附錄 P1-D｜系統設定新增群組（S-07 / S-08）

以下為 P1 需在 REQ-0002 系統設定後台新增的設定群組，待對應 B-xx 業主決策後正式補充至 REQ-0002 規格：

## D.1 S-10｜廠商種類與專長標籤（✅ B-41 resolved，原稿為 S-07，已改編號）

| 項目 | 說明 |
|------|------|
| 狀態 | ✅ B-41 resolved（v5.4）：採用 S-10，見 REQ-0002 S-10 定義 |
| 管理者 | Admin |
| 設定內容（預設值） | 廠商種類：口碑論壇 / 媒體採購 / 影音製作 / 廣告儲值 / Podcast / 派報印刷 / 線下活動 / 其他 |
| 影響範圍 | REQ-0011 廠商名錄（`vendor_category` 下拉選單、`specialty_tags` 多選標籤） |

## D.2 S-08｜獎金提撥設定

| 項目 | 說明 |
|------|------|
| 狀態 | ✅ B-48 resolved（v5.5）：Layer 3 已移除；✅ B-54 resolved（v5.6）：目標金額改由系統自動計算（部門月薪加總 × 倍率） |
| 管理者 | Admin |
| 設定內容 | 各部門達標倍率（廣告 2.8×、電商 2.4×、整合 2.0×、創意 2.0×）；各部門 90% / 100% 門檻獎金率；超額加發規則（每 10% 加幾 %）；結算週期（季結 / 半年結） |
| 影響範圍 | REQ-0052 Layer 2：DeptBonusRecord.target_amount 自動計算、bonus_rate 計算 |

**✅ v5.9 新增｜月份績效目標係數（MonthlyPerformanceMultiplier）**

| 欄位 | 說明 |
|------|------|
| 說明 | 考量淡旺季差異，允許 Admin 對各月份設定績效目標調整係數，避免淡季過度懲罰、旺季標準過低 |
| 設定單位 | 按月份（1 ～ 12 月各自獨立設定） |
| 預設值 | 1.0（不調整） |
| 範例 | 2 月淡季設為 0.9（目標降低 10%）；11 月旺季設為 1.1（目標提高 10%） |
| 計算套用 | `DeptBonusRecord.target_amount = Σ 有效薪資 × 部門達標倍率 × 當月係數` |
| 管理者 | Admin 可在 S-08 後台對各月份分別設定，未設定月份使用預設 1.0 |
| 影響範圍 | REQ-0052 §4.1 部門目標金額計算；REQ-0054 績效認列目標計算基準 |

---

*文件結束*
*昊揚行銷管理系統 PRD v9.3*
*SA 系統架構師出品 | 2026-06-29*
