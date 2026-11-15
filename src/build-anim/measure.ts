import { LOOK } from "./config";

export type BuildType = "text" | "block" | "button";
export type Rect = { x: number; y: number; w: number; h: number };
export type Item = Rect & {
  el: HTMLElement;
  type: BuildType;
  group: string;
  depth: number;
  lines: Rect[];
  radius: number;
};

type Edges = { l: number; r: number; t: number; b: number };

function textLines(el: HTMLElement): Edges[] {
  // 只量文字節點：若用整個元素的 Range，巢狀 <p> 等元素的外框也會被算進來
  const range = document.createRange();
  const rects: DOMRect[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    range.selectNodeContents(walker.currentNode);
    rects.push(...Array.from(range.getClientRects()));
  }
  const lines: Edges[] = [];
  for (const q of rects) {
    if (q.width <= LOOK.minRect || q.height <= LOOK.minRect) continue;
    const hit = lines.find(
      (l) => Math.min(l.b, q.bottom) - Math.max(l.t, q.top) > Math.min(l.b - l.t, q.height) * LOOK.lineOverlap,
    );
    if (hit) {
      hit.l = Math.min(hit.l, q.left);
      hit.r = Math.max(hit.r, q.right);
      hit.t = Math.min(hit.t, q.top);
      hit.b = Math.max(hit.b, q.bottom);
    } else {
      lines.push({ l: q.left, r: q.right, t: q.top, b: q.bottom });
    }
  }
  return lines;
}

/** 量測元件，座標相對於區段左上角。只在建立 timeline 前呼叫一次。 */
export function measure(el: HTMLElement, origin: DOMRect): Item {
  const type = (el.dataset.build as BuildType) || "block";
  const box = el.getBoundingClientRect();
  const lines = type === "text" ? textLines(el) : [];
  const e: Edges = lines.length
    ? {
        l: Math.min(...lines.map((l) => l.l)),
        r: Math.max(...lines.map((l) => l.r)),
        t: Math.min(...lines.map((l) => l.t)),
        b: Math.max(...lines.map((l) => l.b)),
      }
    : { l: box.left, r: box.right, t: box.top, b: box.bottom };
  return {
    el,
    type,
    group: el.dataset.group || "misc",
    depth: Number(el.dataset.depth || 0),
    x: e.l - origin.left,
    y: e.t - origin.top,
    w: e.r - e.l,
    h: e.b - e.t,
    lines: lines.map((l) => ({ x: l.l - origin.left, y: l.t - origin.top, w: l.r - l.l, h: l.b - l.t })),
    radius: parseFloat(getComputedStyle(el).borderTopLeftRadius) || LOOK.defaultRadius,
  };
}
