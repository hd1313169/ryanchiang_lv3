// Hero 開場的捲動鎖定（規格 §7.1）。
const KEYS = new Set([" ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"]);
const root = document.documentElement;

let locked = false;
const unlockWaiters: Array<() => void> = [];
let onAttempt: (() => void) | null = null;
let savedY = 0;

const isIOS = () =>
  /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

function block(e: Event) {
  if (!locked) return;
  e.preventDefault();
  onAttempt?.();
}

function blockKeys(e: KeyboardEvent) {
  if (locked && KEYS.has(e.key)) block(e);
}

let listening = false;
function listen() {
  if (listening) return;
  listening = true;
  window.addEventListener("wheel", block, { passive: false });
  window.addEventListener("touchmove", block, { passive: false });
  window.addEventListener("keydown", blockKeys);
}

/** 鎖定捲動；使用者嘗試捲動時呼叫 attempt。 */
export function lock(attempt: () => void) {
  onAttempt = attempt;
  locked = true;
  listen();
  window.scrollTo(0, 0);
  root.classList.add("locked");
  if (isIOS()) {
    savedY = window.scrollY;
    Object.assign(document.body.style, { position: "fixed", top: `${-savedY}px`, width: "100%" });
  }
}

export function unlock() {
  const wasFixed = document.body.style.position === "fixed";
  locked = false;
  onAttempt = null;
  root.classList.remove("locked");
  if (wasFixed) {
    Object.assign(document.body.style, { position: "", top: "", width: "" });
    window.scrollTo(0, savedY);
  }
  unlockWaiters.splice(0).forEach((cb) => cb());
}

export const isLocked = () => locked || document.documentElement.classList.contains("locked");

/** 未鎖定時立即執行；鎖定中則等解鎖後執行。 */
export function whenUnlocked(cb: () => void) {
  if (!isLocked()) cb();
  else unlockWaiters.push(cb);
}
