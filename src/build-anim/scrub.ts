// 捲動觸發區段（規格 §7.6–7.8 的調整版）。
// 每個區塊捲進畫面時觸發，以時間播完整段建構；播完即停在完成狀態，不因回捲而倒退，
// 只有重新載入頁面才會再播。
// 不使用「釘住 + 隨捲動拖動進度」：試看時發現區段靠近時會是一片只有淡格線的空白，
// 快速捲動也看不清。需要釘住效果的頁面（例如 About 的疊蓋）自行用 ScrollTrigger 處理。
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOBILE_BP, SCRUB, SPEED } from "./config";
import { clearOverlay } from "./overlay";
import { whenUnlocked } from "./scroll-lock";
import { buildElements, buildTimeline, settleElements } from "./timeline";

gsap.registerPlugin(ScrollTrigger);

function groupsOf(section: HTMLElement): string[] {
  return Array.from(new Set(buildElements(section).map((el) => el.dataset.group || "misc")));
}

/** 逐區塊：每個區塊捲進畫面時以時間播完一次，播完清掉輔助線並停在完成狀態，不會因回捲而倒退。 */
function perGroup(section: HTMLElement, seed: number, cursors: boolean) {
  const tls = new Map<string, gsap.core.Timeline>();
  const state = new Map<string, "idle" | "playing" | "done">();
  const speed = cursors ? SPEED.base : SPEED.mobile;
  const groups = groupsOf(section);

  const play = (g: string) => {
    if (state.get(g) !== "idle") return;
    state.set(g, "playing");
    tls.get(g)?.timeScale(speed).play();
  };

  const triggers = groups.map((g, i) => {
    const els = buildElements(section, g);
    state.set(g, "idle");
    const finish = () => {
      state.set(g, "done");
      section.querySelector(`:scope > .ba-overlay > [data-layer="${g}"]`)?.remove();
      settleElements(els);
      if (groups.every((x) => state.get(x) === "done")) section.classList.add("ba-done");
    };
    const rebuild = () => {
      if (state.get(g) === "done") return; // 已完成的區塊不再重建
      const old = tls.get(g);
      const p = old ? old.progress() : 0;
      old?.kill();
      const tl = buildTimeline(section, { seed: seed + i, group: g, guides: cursors, cursors });
      tl.eventCallback("onComplete", finish);
      tl.progress(p);
      tls.set(g, tl);
      if (state.get(g) === "playing") tl.timeScale(speed).play();
    };
    rebuild();
    const trigger =
      section.querySelector<HTMLElement>(`[data-build][data-group="${g}"]:not([data-depth="1"])`) ?? section;
    // 啟用當下已經露出在畫面中的區塊，直接播放
    if (trigger.getBoundingClientRect().top < window.innerHeight) play(g);
    return ScrollTrigger.create({
      trigger,
      start: SCRUB.groupStart,
      onEnter: () => play(g),
      onRefresh: rebuild,
    });
  });
  return () => {
    triggers.forEach((t) => t.kill());
    // 切換桌機／手機時：播放中的直接完成，未播放的丟棄（由另一套設定重建）
    groups.forEach((g) => {
      if (state.get(g) === "playing") tls.get(g)?.progress(1);
      else tls.get(g)?.kill();
    });
  };
}

/** 整區一起播一次、不收回（與首屏相同的播法，用於 Footer）。 */
function enterOnce(section: HTMLElement, seed: number, cursors: boolean) {
  let tl: gsap.core.Timeline | null = null;
  let started = false;
  const finish = () => {
    clearOverlay(section);
    settleElements(buildElements(section));
    section.classList.add("ba-done");
  };
  const rebuild = () => {
    if (started) return; // 開始播放後不再重建（播完即清空 overlay）
    tl?.kill();
    tl = buildTimeline(section, { seed, cursors });
    tl.eventCallback("onComplete", finish);
  };
  const play = () => {
    if (started || !tl) return;
    started = true;
    tl.timeScale(cursors ? SPEED.base : SPEED.mobile).play();
  };
  rebuild();
  if (section.getBoundingClientRect().top < window.innerHeight * 0.85) play();
  const st = ScrollTrigger.create({ trigger: section, start: SCRUB.groupStart, onEnter: play, onRefresh: rebuild });
  return () => {
    st.kill();
    if (started) tl?.progress(1);
    else tl?.kill();
  };
}

const INTENT_KEYS = new Set([" ", "ArrowDown", "PageDown", "End"]);

/**
 * 使用者第一次「嘗試捲動」後才啟用（頁面已不在頂端時立即啟用），避免載入時就開始播放。
 * Hero 鎖定期間的滾輪／觸控／按鍵也算，等解鎖後才啟用。
 */
export function setupScrub(sections: HTMLElement[], baseSeed: number) {
  let armed = false;
  const go = () => {
    if (armed) return;
    armed = true;
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("wheel", go);
    window.removeEventListener("touchmove", go);
    window.removeEventListener("keydown", onKey);
    whenUnlocked(() => arm(sections, baseSeed));
  };
  const onScroll = () => window.scrollY > 0 && go();
  const onKey = (e: KeyboardEvent) => INTENT_KEYS.has(e.key) && go();
  if (window.scrollY > 0) return go();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("wheel", go, { passive: true });
  window.addEventListener("touchmove", go, { passive: true });
  window.addEventListener("keydown", onKey);
}

function arm(sections: HTMLElement[], baseSeed: number) {
  const mm = gsap.matchMedia();
  sections.forEach((section, si) => {
    const seed = baseSeed + (si + 1) * 100;
    const run = section.dataset.buildSection === "enter" ? enterOnce : perGroup;
    mm.add(`(min-width: ${MOBILE_BP}px)`, () => {
      const undo = run(section, seed, true);
      return () => {
        undo();
        clearOverlay(section);
      };
    });
    mm.add(`(max-width: ${MOBILE_BP - 1}px)`, () => {
      const undo = run(section, seed, false);
      return () => {
        undo();
        clearOverlay(section);
      };
    });
  });
  // 延遲載入的圖片改變版面後，重新量測（onRefresh 會重建 timeline 並保留進度）。
  // 圖片可能在 window load 之後才開始載入，所以逐張監聽。
  let pending = 0;
  const refreshSoon = () => {
    cancelAnimationFrame(pending);
    pending = requestAnimationFrame(() => ScrollTrigger.refresh());
  };
  sections.forEach((section) =>
    section.querySelectorAll("img").forEach((img) => {
      if (!img.complete) img.addEventListener("load", refreshSoon, { once: true });
    }),
  );
  if (document.readyState !== "complete") window.addEventListener("load", refreshSoon, { once: true });
}
