// 「從零建構」入場動畫。規格：design_style/design_style.md
// 用法：區段加上 data-build-section="once"，元件加上 data-build / data-group，
// 再於頁面 <script> 呼叫 startBuildAnimations()。
import { gsap } from "gsap";
import { ENABLED, FONT_TIMEOUT_MS, MOBILE_BP, REPLAY_EVERY_LOAD, SCRUB_ENABLED, SEED, SPEED, STORAGE_PREFIX, LOOK } from "./config";
import { clearOverlay } from "./overlay";
import { lock, unlock, isLocked } from "./scroll-lock";
import { setupScrub } from "./scrub";
import { buildElements, buildTimeline, preShowGuides, settleElements } from "./timeline";

export type BuildOptions = {
  mode: "once";
  lockScroll?: boolean;
  timeScale?: number;
  seed?: number;
  onComplete?: () => void;
};

export type BuildHandle = { skip(): void; replay(): void; destroy(): void };

const root = document.documentElement;
const isMobile = () => window.innerWidth < MOBILE_BP;
const debug = new URLSearchParams(location.search).has("debug");

const storage = {
  get(key: string) {
    try {
      return sessionStorage.getItem(STORAGE_PREFIX + key) === "1";
    } catch {
      return false;
    }
  },
  set(key: string) {
    try {
      sessionStorage.setItem(STORAGE_PREFIX + key, "1");
    } catch {
      /* 無痕模式等情況：忽略 */
    }
  },
};

// ---------- 提示 UI（§7.3） ----------
let hint: HTMLElement | null = null;
function showHint(text: string) {
  if (!hint) {
    hint = document.createElement("div");
    hint.className = "ba-hint";
    document.body.appendChild(hint);
  }
  hint.textContent = text;
  hint.classList.remove("is-off");
}
const hideHint = () => hint?.classList.add("is-off");

function showScrollCue(section: HTMLElement) {
  const cue = document.createElement("div");
  cue.className = "ba-cue";
  const arrow = document.createElement("span");
  arrow.className = "ba-cue-arrow";
  arrow.textContent = "↓";
  cue.append(arrow, "往下捲動");
  section.appendChild(cue);
  requestAnimationFrame(() => cue.classList.add("is-on"));
  const onScroll = () => {
    if (window.scrollY < LOOK.scrollCueHideAt) return;
    cue.classList.remove("is-on");
    window.removeEventListener("scroll", onScroll);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}

/** 直接顯示完成狀態，不播放。 */
function showFinished(section: HTMLElement) {
  settleElements(buildElements(section));
  section.classList.add("ba-done");
}

export function buildSection(section: HTMLElement, opts: BuildOptions): BuildHandle {
  const els = buildElements(section);
  let tl: gsap.core.Timeline | null = null;
  let slow = false;

  const finish = () => {
    clearOverlay(section);
    settleElements(els);
    section.classList.remove("ba-running");
    section.classList.add("ba-done");
    if (isLocked()) {
      unlock();
      hideHint();
      showScrollCue(section);
    }
    opts.onComplete?.();
  };

  const speedUp = () => {
    if (tl && tl.timeScale() < SPEED.fast) {
      tl.timeScale(SPEED.fast);
      showHint("加速中…");
    }
  };

  const play = () => {
    tl?.kill();
    clearOverlay(section);
    section.classList.remove("ba-done");
    section.classList.add("ba-running");
    const mobile = isMobile();
    if (opts.lockScroll && !mobile) {
      lock(speedUp);
      showHint("點擊畫面略過・捲動可加速");
    } else {
      root.classList.remove("locked");
    }
    tl = buildTimeline(section, { seed: opts.seed ?? SEED, guidesShown: !!section.querySelector('[data-layer="pre"]') });
    tl.timeScale(slow ? SPEED.slow : mobile ? SPEED.mobile : (opts.timeScale ?? SPEED.base));
    tl.eventCallback("onComplete", finish);
    tl.play(0);
  };

  const skip = () => {
    if (tl && tl.progress() < 1) tl.progress(1);
  };
  const onClick = () => {
    if (tl?.isActive()) skip();
  };
  const onResize = () => {
    if (tl?.isActive()) skip();
  };
  section.addEventListener("click", onClick);
  window.addEventListener("resize", onResize);

  if (debug) mountDebug(() => {
    window.scrollTo(0, 0);
    play();
  }, (on) => {
    slow = on;
    if (tl?.isActive()) tl.timeScale(on ? SPEED.slow : SPEED.base);
  });

  play();

  return {
    skip,
    replay: play,
    destroy() {
      tl?.kill();
      section.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      clearOverlay(section);
      settleElements(els);
      if (isLocked()) unlock();
    },
  };
}

// ---------- 開發用控制列（?debug） ----------
function mountDebug(replay: () => void, setSlow: (on: boolean) => void) {
  const bar = document.createElement("div");
  bar.className = "ba-debug";
  const btn = (label: string, fn: (b: HTMLButtonElement) => void) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      fn(b);
    });
    bar.appendChild(b);
  };
  btn("重播", replay);
  btn("慢動作", (b) => {
    const on = b.getAttribute("aria-pressed") !== "true";
    b.setAttribute("aria-pressed", String(on));
    setSlow(on);
  });
  document.body.appendChild(bar);
}

/** 字型與區段內圖片都就緒後才能量測；超過時限回傳 false。 */
function layoutReady(sections: HTMLElement[]): Promise<boolean> {
  const imgs = sections.flatMap((s) => Array.from(s.querySelectorAll("img")));
  const images = Promise.all(
    imgs.map((img) => {
      img.loading = "eager";
      return img.decode().catch(() => undefined);
    }),
  );
  const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
  return Promise.race([
    Promise.all([fonts, images]).then(() => true),
    new Promise<boolean>((r) => setTimeout(() => r(false), FONT_TIMEOUT_MS)),
  ]);
}

/** 頁面進入點：啟動所有 data-build-section 區段。 */
export async function startBuildAnimations() {
  const all = (mode: string) => Array.from(document.querySelectorAll<HTMLElement>(`[data-build-section="${mode}"]`));
  const sections = all("once");
  const scrubSections = all("scrub");
  const key = root.dataset.baPage ?? location.pathname;

  if (!ENABLED) {
    [...sections, ...scrubSections].forEach(showFinished);
    return;
  }
  const scrubOn = SCRUB_ENABLED && !root.classList.contains("ba-noscrub");
  if (!scrubOn) scrubSections.forEach(showFinished);

  const skip = root.classList.contains("ba-skip") || (!debug && !REPLAY_EVERY_LOAD && storage.get(key));
  if (skip) {
    root.classList.remove("locked");
    sections.forEach(showFinished);
  }

  if (!skip) {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    // 等字型期間先畫出格線，避免開場一片空白
    sections.forEach(preShowGuides);
  }
  const ok = await layoutReady(sections);
  if (!ok) {
    root.classList.remove("locked");
    [...sections, ...scrubSections].forEach(showFinished);
    return;
  }

  requestAnimationFrame(() => {
    if (scrubOn && scrubSections.length) setupScrub(scrubSections, SEED);
    if (skip) return;
    sections.forEach((section) =>
      buildSection(section, {
        mode: "once",
        lockScroll: true,
        onComplete: () => storage.set(key),
      }),
    );
  });
}
