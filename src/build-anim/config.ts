// 建構動畫的所有可調參數。規格：design_style/design_style.md §5。
// 其他模組不可出現時間或尺寸的魔術數字，一律從這裡讀取。

/** 總開關：false 時首頁與 About 直接顯示完成內容，等同沒有這個功能。 */
export const ENABLED = true;
/** 捲動建構區段（scrub）的開關，可單獨關閉。 */
export const SCRUB_ENABLED = true;
/** 測試期間用：true 時首屏每次載入都播放（忽略「同一分頁只播一次」）。上線前改回 false。 */
export const REPLAY_EVERY_LOAD = true;

/** 桌機／手機切換點（px），CSS 斷點也用同一個值。 */
export const MOBILE_BP = 720;

export const SPEED = {
  base: 0.75, // 一般播放
  fast: 2.4, // 鎖定中嘗試捲動時加速
  slow: 0.3, // 僅 ?debug
  mobile: 1, // 手機 Hero
};

export const SEED = 11;

/** 捲動建構區段。 */
export const SCRUB = {
  buildDist: 600, // 釘住時，建構所需捲動距離（px）；規格原值 1200
  holdDist: 200, // 完成後保留距離（px）；規格原值 350
  smooth: 0.35, // 進度平滑（秒）
  pinMaxHeight: 0.9, // 區段高度 ≤ 畫面高 × 此值才整區釘住，否則逐區塊建構
  // 逐區塊：區塊頂端進入畫面底部（top 100%）開始，
  // 區塊最後一個元件的底部捲到畫面 92% 處（整個區塊都已出現）時完成
  groupStart: "top 100%",
  groupEnd: "bottom 92%",
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

  // 游標放慢（規格原值 fly 0.5 / drag 0.5），之後的階段整體順延 0.55
  cursorIn: 0.2,
  cursorFadeIn: 0.15,
  cursorFly: 0.8,
  press: 1.0,
  pressDur: 0.08,
  drag: 1.02,
  dragDur: 0.75,
  release: 1.77,
  releaseDur: 0.1,
  annotIn: 1.75,
  annotDur: 0.15,
  cursorOut: 1.85,
  cursorOutDur: 0.5,

  memberFrame: 1.35,
  memberFrameDur: 0.4,
  skelIn: 1.55,
  skelDur: 0.35,
  skelStagger: 0.05,

  typeStart: 1.85,
  typeSkelOut: 0.25,
  typeBase: 0.35,
  typePerChar: 0.018,
  typeMax: 1.0,
  caretBlink: 0.08,
  caretBlinkRepeat: 3,
  caretHide: 0.35,

  wipeStart: 2.0,
  wipeDur: 0.5,
  wipeSkelOut: 2.25,
  wipeSkelOutDur: 0.3,
  wipeEnd: 2.5,

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
};
