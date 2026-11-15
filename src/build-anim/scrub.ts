// 捲動觸發區段（規格 §7.6–7.8 的調整版）。
// 每個區塊捲進畫面時觸發，以時間播完整段建構；往回捲到區塊離開畫面下方時收回。
// 不使用「釘住 + 隨捲動拖動進度」：試看時發現區段靠近時會是一片只有淡格線的空白，
// 快速捲動也看不清。需要釘住效果的頁面（例如 About 的疊蓋）自行用 ScrollTrigger 處理。
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOBILE_BP, SCRUB, SPEED } from "./config";
import { clearOverlay } from "./overlay";
import { whenUnlocked } from "./scroll-lock";
import { buildElements, buildTimeline, markBuilt } from "./timeline";

gsap.registerPlugin(ScrollTrigger);

function groupsOf(section: HTMLElement): string[] {
  return Array.from(new Set(buildElements(section).map((el) => el.dataset.group || "misc")));
}

/** 逐區塊、不釘住：捲進畫面時觸發，以時間播完整段動畫；往回捲離開時倒轉。 */
function perGroup(section: HTMLElement, seed: number, cursors: boolean) {
  const tls = new Map<string, gsap.core.Timeline>();
  // 每個區塊目前想要的方向；重建 timeline 時依此恢復（不能靠 isActive，剛 play 的那一刻仍是 false）
  const dir = new Map<string, "play" | "reverse" | null>();
  const speed = cursors ? SPEED.base : SPEED.mobile;

  const apply = (g: string) => {
    const tl = tls.get(g);
    const d = dir.get(g);
    if (!tl || !d) return;
    if (d === "play" && tl.progress() < 1) tl.timeScale(speed).play();
    if (d === "reverse" && tl.progress() > 0) tl.timeScale(SPEED.fast).reverse();
  };

  const triggers = groupsOf(section).map((g, i) => {
    const els = buildElements(section, g);
    const rebuild = () => {
      const old = tls.get(g);
      const p = old ? old.progress() : 0;
      old?.kill();
      const tl = buildTimeline(section, { seed: seed + i, group: g, guides: cursors, cursors });
      tl.eventCallback("onComplete", () => markBuilt(els, true));
      tl.progress(p);
      markBuilt(els, p >= 1);
      tls.set(g, tl);
      apply(g);
    };
    rebuild();
    const trigger =
      section.querySelector<HTMLElement>(`[data-build][data-group="${g}"]:not([data-depth="1"])`) ?? section;
    // 啟用當下已經露出在畫面中的區塊，直接播放
    if (trigger.getBoundingClientRect().top < window.innerHeight) {
      dir.set(g, "play");
      apply(g);
    }
    return [
      ScrollTrigger.create({
        trigger,
        start: SCRUB.groupStart,
        onEnter: () => {
          dir.set(g, "play");
          apply(g);
        },
        onRefresh: rebuild,
      }),
      // 往回捲到區塊完全離開畫面下方時才收回
      ScrollTrigger.create({
        trigger,
        start: SCRUB.groupResetAt,
        onLeaveBack: () => {
          dir.set(g, "reverse");
          markBuilt(els, false);
          apply(g);
        },
      }),
    ];
  });
  return () => {
    triggers.flat().forEach((t) => t.kill());
    tls.forEach((t) => t.kill());
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
    mm.add(`(min-width: ${MOBILE_BP}px)`, () => {
      const undo = perGroup(section, seed, true);
      return () => {
        undo();
        clearOverlay(section);
      };
    });
    mm.add(`(max-width: ${MOBILE_BP - 1}px)`, () => {
      const undo = perGroup(section, seed, false);
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
