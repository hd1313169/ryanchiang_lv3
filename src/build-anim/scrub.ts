// 捲動驅動區段（規格 §7.6–7.8）。
// - 桌機且區段高度放得進畫面：區段頂端貼齊畫面頂端時釘住，捲動推進建構。
// - 其餘情況（手機，或區段比畫面高）：不釘住，每個區塊捲進畫面時各自隨捲動建構。
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOBILE_BP, SCRUB } from "./config";
import { clearOverlay } from "./overlay";
import { buildElements, buildTimeline } from "./timeline";

gsap.registerPlugin(ScrollTrigger);

const smooth = (tl: gsap.core.Timeline, p: number) =>
  gsap.to(tl, { progress: p, duration: SCRUB.smooth, ease: "power2.out", overwrite: true });

function groupsOf(section: HTMLElement): string[] {
  return Array.from(new Set(buildElements(section).map((el) => el.dataset.group || "misc")));
}

/** 整區釘住。 */
function pinWhole(section: HTMLElement, seed: number) {
  let tl: gsap.core.Timeline | null = null;
  const total = SCRUB.buildDist + SCRUB.holdDist;
  const rebuild = () => {
    const p = tl ? tl.progress() : 0;
    tl?.kill();
    tl = buildTimeline(section, { seed });
    tl.progress(p);
  };
  rebuild();
  const st = ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: `+=${total}`,
    pin: true,
    onUpdate: (self) => tl && smooth(tl, Math.min((self.progress * total) / SCRUB.buildDist, 1)),
    onRefresh: rebuild,
  });
  return () => {
    st.kill();
    tl?.kill();
  };
}

/** 逐區塊、不釘住。 */
function perGroup(section: HTMLElement, seed: number, cursors: boolean) {
  const tls = new Map<string, gsap.core.Timeline>();
  const triggers = groupsOf(section).map((g, i) => {
    const rebuild = () => {
      const old = tls.get(g);
      const p = old ? old.progress() : 0;
      old?.kill();
      const tl = buildTimeline(section, { seed: seed + i, group: g, guides: cursors, cursors });
      tl.progress(p);
      tls.set(g, tl);
    };
    rebuild();
    const members = section.querySelectorAll<HTMLElement>(`[data-build][data-group="${g}"]:not([data-depth="1"])`);
    const trigger = members[0] ?? section;
    return ScrollTrigger.create({
      trigger,
      start: SCRUB.groupStart,
      endTrigger: members[members.length - 1] ?? trigger,
      end: SCRUB.groupEnd,
      onUpdate: (self) => {
        const tl = tls.get(g);
        if (tl) smooth(tl, self.progress);
      },
      onRefresh: rebuild,
    });
  });
  return () => {
    triggers.forEach((t) => t.kill());
    tls.forEach((t) => t.kill());
  };
}

export function setupScrub(sections: HTMLElement[], baseSeed: number) {
  const mm = gsap.matchMedia();
  sections.forEach((section, si) => {
    const seed = baseSeed + (si + 1) * 100;
    mm.add(`(min-width: ${MOBILE_BP}px)`, () => {
      const fits = section.offsetHeight <= window.innerHeight * SCRUB.pinMaxHeight;
      const undo = fits ? pinWhole(section, seed) : perGroup(section, seed, true);
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
  // 延遲載入的圖片改變版面後，重新量測（onRefresh 會重建 timeline 並保留進度）
  window.addEventListener("load", () => ScrollTrigger.refresh());
}
