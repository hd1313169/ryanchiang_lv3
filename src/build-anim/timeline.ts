import { gsap } from "gsap";
import { EASE, GROUP_NAMES, LOOK, MOBILE_BP, T } from "./config";
import { measure, type Item } from "./measure";
import { createLayer } from "./overlay";
import { rng } from "./rng";
import { charsOf, split } from "./split";

const HIDDEN = "inset(0% 100% 0% 0%)";
const COLLAPSED = "inset(0% 100% 100% 0%)";
const OPEN = "inset(0% 0% 0% 0%)";
const px = (n: number) => `${n}px`;

export type TimelineOptions = {
  seed: number;
  /** 只建構某個區塊（手機版逐區塊）；省略則建構整個區段。 */
  group?: string;
  guides?: boolean;
  /** 是否建立游標；預設依視窗寬度。 */
  cursors?: boolean;
};

export function buildElements(section: HTMLElement, group?: string): HTMLElement[] {
  const sel = group ? `[data-build][data-group="${group}"]` : "[data-build]";
  return Array.from(section.querySelectorAll<HTMLElement>(sel));
}

/** 依序：拆字 → 設定初始隱藏 → 量測 → 建立 overlay → 組裝 timeline。 */
export function buildTimeline(section: HTMLElement, opts: TimelineOptions): gsap.core.Timeline {
  const els = buildElements(section, opts.group);
  const texts = els.filter((el) => el.dataset.build === "text");
  texts.forEach(split);

  gsap.set(els, { clipPath: HIDDEN });
  texts.forEach((el) => {
    gsap.set(el, { clipPath: "none" });
    gsap.set(charsOf(el), { opacity: 0 });
  });

  const origin = section.getBoundingClientRect();
  const W = origin.width;
  const H = origin.height;
  const rand = rng(opts.seed);
  const useCursor = opts.cursors ?? window.innerWidth >= MOBILE_BP;
  const items = els.map((el) => measure(el, origin)).sort((a, b) => a.y - b.y || a.x - b.x);
  const { div, cursor } = createLayer(section, opts.group ?? "all");
  const tl = gsap.timeline({ paused: true });
  if (!items.length) return tl;

  // 階段 1：參考線
  const guides: HTMLElement[] = [];
  if (opts.guides !== false) {
    const cs = getComputedStyle(section);
    const padL = parseFloat(cs.paddingLeft);
    const inner = W - padL - parseFloat(cs.paddingRight);
    for (let i = 0; i <= LOOK.guideCols; i++) {
      guides.push(div("ba-guide ba-guide--v", { left: px(padL + (inner * i) / LOOK.guideCols) }));
    }
    const title = items.find((i) => /^H[12]$/.test(i.el.tagName)) ?? items[0];
    const lastItem = items[items.length - 1];
    [items[0].y - LOOK.guideTopOffset, title.y, lastItem.y - LOOK.guideBottomOffset].forEach((y) =>
      guides.push(div("ba-guide ba-guide--h", { top: px(y) })),
    );
    tl.to(guides, { opacity: 1, duration: T.guideIn, stagger: T.guideStagger }, 0);
  }

  // 依區塊分組，一個區塊一個游標
  const byGroup = new Map<string, Item[]>();
  items.forEach((it) => {
    if (!byGroup.has(it.group)) byGroup.set(it.group, []);
    byGroup.get(it.group)!.push(it);
  });
  const P = LOOK.framePad;
  const groups = Array.from(byGroup, ([name, mem]) => {
    const x = Math.min(...mem.map((m) => m.x)) - P;
    const y = Math.min(...mem.map((m) => m.y)) - P;
    const w = Math.max(...mem.map((m) => m.x + m.w)) + P - x;
    const h = Math.max(...mem.map((m) => m.y + m.h)) + P - y;
    // 成員依文件順序編號
    mem.sort((a, b) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    return { name, mem, x, y, w, h };
  }).sort((a, b) => a.y - b.y || a.x - b.x);

  let last = 0;
  groups.forEach((g, gi) => {
    const { x, y, w, h } = g;
    const G0 = gi * T.groupStep + rand() * T.groupJitter;

    // 階段 3：區塊大框與標註
    const frame = div("ba-frame", { left: px(x), top: px(y), width: px(w), height: px(h) });
    const hTL = div("ba-handle");
    const hTR = div("ba-handle");
    const hBL = div("ba-handle");
    const hBR = div("ba-handle");
    gsap.set(hTL, { x, y });
    gsap.set(hTR, { x: x + w, y });
    gsap.set(hBL, { x, y: y + h });
    const size = div("ba-size", { left: px(x + w / 2), top: px(y + h + LOOK.sizeGap) }, `${Math.round(w)} × ${Math.round(h)}`);
    const tag = div("ba-tag", { left: px(x), top: px(y) }, g.mem[0].el.dataset.label ?? GROUP_NAMES[g.name] ?? g.name);

    // 階段 2：游標
    if (useCursor) {
      const c = cursor();
      const cx = x + w / 2;
      const cy = y + h / 2;
      const a = Math.atan2(cy - H / 2, cx - W / 2) + (rand() - 0.5) * LOOK.cursorAngleJitter;
      const dx = Math.cos(a);
      const dy = Math.sin(a);
      const dist = Math.max(W, H) * (LOOK.cursorDistMin + rand() * LOOK.cursorDistRange);
      tl.set(c, { x: cx + dx * dist, y: cy + dy * dist, opacity: 0, transformOrigin: LOOK.cursorOrigin }, 0);
      tl.to(c, { opacity: 1, duration: T.cursorFadeIn }, G0 + T.cursorIn);
      tl.to(c, { x, y, duration: T.cursorFly, ease: EASE.cursorFly }, G0 + T.cursorIn);
      tl.to(c, { scale: LOOK.pressScale, duration: T.pressDur }, G0 + T.press);
      tl.to(c, { x: x + w, y: y + h, duration: T.dragDur, ease: EASE.drag }, G0 + T.drag);
      tl.to(c, { scale: 1, duration: T.releaseDur }, G0 + T.release);
      tl.to(
        c,
        {
          x: `+=${dx * LOOK.cursorExit}`,
          y: `+=${dy * LOOK.cursorExit + LOOK.cursorExitDrop}`,
          opacity: 0,
          duration: T.cursorOutDur,
          ease: EASE.cursorOut,
        },
        G0 + T.cursorOut,
      );
    }

    tl.set([frame, hTL], { opacity: 1 }, G0 + T.drag);
    tl.fromTo(frame, { clipPath: COLLAPSED }, { clipPath: OPEN, duration: T.dragDur, ease: EASE.drag }, G0 + T.drag);
    tl.fromTo(
      hBR,
      { x, y, opacity: 1 },
      { x: x + w, y: y + h, duration: T.dragDur, ease: EASE.drag, immediateRender: false },
      G0 + T.drag,
    );
    tl.to([hTR, hBL, size, tag], { opacity: 1, duration: T.annotDur }, G0 + T.annotIn);

    let gEnd = G0;
    g.mem.forEach((it, j) => {
      const t0 = G0 + T.memberOffset + j * T.memberStep + it.depth * T.depthDelay;
      const radius = px(Math.min(it.radius, it.h / 2));
      const mf = div("ba-frame ba-frame--member", {
        left: px(it.x),
        top: px(it.y),
        width: px(it.w),
        height: px(it.h),
        borderRadius: radius,
      });
      const skelCls = it.depth ? "ba-skel ba-skel--depth1" : "ba-skel";
      const bars =
        it.type === "text" && it.lines.length
          ? it.lines.map((l) =>
              div(skelCls, {
                left: px(l.x),
                top: px(l.y + (l.h * (1 - LOOK.skelHeight)) / 2),
                width: px(l.w),
                height: px(l.h * LOOK.skelHeight),
              }),
            )
          : [div(skelCls, { left: px(it.x), top: px(it.y), width: px(it.w), height: px(it.h), borderRadius: radius })];

      // 3d 元件框、4 骨架
      tl.set(mf, { opacity: 1 }, t0 + T.memberFrame);
      tl.fromTo(mf, { clipPath: COLLAPSED }, { clipPath: OPEN, duration: T.memberFrameDur, ease: EASE.drag }, t0 + T.memberFrame);
      tl.to(bars, { scaleX: 1, duration: T.skelDur, stagger: T.skelStagger, ease: EASE.skel }, t0 + T.skelIn);

      // 5 內容
      let mEnd: number;
      if (it.type === "text") {
        const chars = charsOf(it.el);
        const dur = Math.min(T.typeBase + chars.length * T.typePerChar, T.typeMax);
        const step = dur / Math.max(chars.length, 1);
        const caret = div("ba-caret");
        const ts = t0 + T.typeStart;
        tl.to(bars, { opacity: 0, duration: T.typeSkelOut }, ts);
        tl.set(caret, { opacity: 1 }, ts);
        chars.forEach((ch, k) => {
          const r = ch.getBoundingClientRect();
          tl.set(ch, { opacity: 1 }, ts + k * step);
          tl.set(caret, { x: r.right - origin.left + LOOK.caretGap, y: r.top - origin.top, height: r.height }, ts + k * step);
        });
        mEnd = ts + dur;
        tl.to(caret, { opacity: 0, duration: T.caretBlink, repeat: T.caretBlinkRepeat, yoyo: true }, mEnd);
        tl.set(caret, { opacity: 0 }, mEnd + T.caretHide);
      } else {
        tl.to(it.el, { clipPath: OPEN, duration: T.wipeDur, ease: EASE.wipe }, t0 + T.wipeStart);
        tl.to(bars, { opacity: 0, duration: T.wipeSkelOutDur }, t0 + T.wipeSkelOut);
        mEnd = t0 + T.wipeEnd;
      }
      // 6 收尾
      tl.to(mf, { opacity: 0, duration: T.frameOutDur }, mEnd + T.memberOutDelay);
      gEnd = Math.max(gEnd, mEnd);
    });

    tl.to([frame, hTL, hTR, hBL, hBR, size, tag], { opacity: 0, duration: T.frameOutDur }, gEnd + T.groupOutDelay);
    last = Math.max(last, gEnd);
  });

  if (guides.length) tl.to(guides, { opacity: 0, duration: T.guideOut }, last + T.guideOutDelay);
  return tl;
}

/** 完成狀態：元件 clip-path 設為 none，清掉字元的行內 opacity。 */
export function settleElements(els: HTMLElement[]) {
  gsap.set(els, { clipPath: "none" });
  els.forEach((el) => {
    if (el.dataset.build === "text") gsap.set(charsOf(el), { clearProps: "opacity" });
  });
}
