// 建構動畫的所有可調參數。規格：design_style/design_style.md §5。
// 其他模組不可出現時間或尺寸的魔術數字，一律從這裡讀取。

/** 總開關：false 時首頁與 About 直接顯示完成內容，等同沒有這個功能。 */
export const ENABLED = true;
/** 捲動建構區段（scrub）的開關，可單獨關閉。 */
export const SCRUB_ENABLED = true;
/** 首屏（Hero、導覽列）每次載入都播放（業主決定）。false 則回到規格的「同一分頁只播一次」。 */
export const PLAY_EVERY_LOAD = true;

/** 桌機／手機切換點（px），CSS 斷點也用同一個值。 */
export const MOBILE_BP = 720;

export const SPEED = {
  base: 0.75, // 一般播放
  fast: 2.4, // 鎖定中嘗試捲動時加速
  slow: 0.3, // 僅 ?debug
  mobile: 1, // 手機 Hero
};

export const SEED = 11;

/** 捲動觸發區段。 */
export const SCRUB = {
  // 逐區塊：區塊頂端捲到畫面 85% 處時觸發，之後以時間播完（不隨捲動拖動、不因回捲倒退）
  groupStart: "top 85%",
  groupGuidePad: 32, // 逐區塊參考線在區塊上下各延伸的距離（px）
};
export const FONT_TIMEOUT_MS = 3000;
export const STORAGE_PREFIX = "ba:played:";

/** 時間參數（引擎秒）。實際秒數 = 引擎秒 ÷ timeScale。 */
export const T = {
  guideIn: 0.35,
  guideStagger: 0.015,
  guideOutDelay: 0.3,
  guideOut: 0.4,

  groupStep: 0.07, // G0 = gi × groupStep + rand × groupJitter
  groupJitter: 0.06,
  memberOffset: 0.12, // t0 = G0 + memberOffset + j × memberStep + depth × depthDelay
  memberStep: 0.04,
  depthDelay: 0.15,

  // 游標飛入放慢（規格 0.5→0.8）、拉框 0.55（規格 0.5）；游標提早進場（規格 0.2）以縮短開場空白
  cursorIn: 0.05,
  cursorFadeIn: 0.15,
  cursorFly: 0.8,
  press: 0.85,
  pressDur: 0.08,
  drag: 0.87,
  dragDur: 0.55,
  release: 1.42,
  releaseDur: 0.1,
  annotIn: 1.4,
  annotDur: 0.15,
  cursorOut: 1.5,
  cursorOutDur: 0.5,

  memberFrame: 1.0,
  memberFrameDur: 0.4,
  skelIn: 1.2,
  skelDur: 0.35,
  skelStagger: 0.05,

  typeStart: 1.5,
  typeSkelOut: 0.25,
  // 打字加快（規格原值 0.35 + 字數 × 0.018，上限 1.0）
  typeBase: 0.12,
  typePerChar: 0.005,
  typeMax: 0.3,
  caretBlink: 0.08,
  caretBlinkRepeat: 2,
  caretHide: 0.2,

  // 圖片／按鈕擦出加快（規格 0.5）
  wipeStart: 1.65,
  wipeDur: 0.3,
  wipeSkelOut: 1.75,
  wipeSkelOutDur: 0.2,
  wipeEnd: 1.95,

  memberOutDelay: 0.15,
  frameOutDur: 0.3,
  groupOutDelay: 0.3,
};

export const EASE = {
  cursorFly: "power3.inOut",
  drag: "power2.inOut",
  cursorOut: "power2.in",
  skel: "power2.out",
  wipe: "power2.inOut",
};

export const LOOK = {
  framePad: 8, // 區塊大框外擴
  sizeGap: 6, // 尺寸標籤與框底距離
  pressScale: 0.82,
  cursorOrigin: "1px 1px", // 游標尖端
  cursorAngleJitter: 0.7, // 總幅度，即 ±0.35 rad
  cursorDistMin: 0.55,
  cursorDistRange: 0.2,
  cursorExit: 80,
  cursorExitDrop: 24,
  skelHeight: 0.6, // 文字骨架高 = 行高 × 0.6
  guideCols: 12,
  guideTopOffset: 14,
  guideBottomOffset: 22,
  caretGap: 1,
  defaultRadius: 4,
  lineOverlap: 0.5,
  minRect: 1,
  scrollCueHideAt: 40, // 捲動超過此距離後收起「往下捲動」提示
};

/** 區塊名稱標籤。 */
export const GROUP_NAMES: Record<string, string> = {
  slogan: "Slogan",
  intro: "Intro",
  buttons: "Buttons",
  visual: "Visual",
  heading: "Heading",
  brand: "Logo",
  menu: "Menu",
  "contact-heading": "Heading",
  contacts: "Contacts",
  facts: "Facts",
  photo: "Photo",
  summary: "Summary",
};
