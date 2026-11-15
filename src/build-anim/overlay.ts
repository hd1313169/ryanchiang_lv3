const SVG_NS = "http://www.w3.org/2000/svg";
// 游標圖形；顏色由 build-anim.css 決定。尖端對齊節點左上角。
const CURSOR_PATH = "M1 1 L1 16.5 L5 12.8 L8.2 19.6 L10.6 18.5 L7.5 11.8 L13 11.8 Z";

/** 取得（或建立）區段的 overlay。 */
export function getOverlay(section: HTMLElement): HTMLElement {
  let overlay = section.querySelector<HTMLElement>(":scope > .ba-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "ba-overlay";
    overlay.setAttribute("aria-hidden", "true");
    section.appendChild(overlay);
  }
  return overlay;
}

/** 建立一個圖層；同 key 的舊圖層先移除（手機版每個區塊各一層）。 */
export function createLayer(section: HTMLElement, key: string) {
  const overlay = getOverlay(section);
  overlay.querySelectorAll(`[data-layer="${key}"]`).forEach((n) => n.remove());
  const layer = document.createElement("div");
  layer.className = "ba-layer";
  layer.dataset.layer = key;
  overlay.appendChild(layer);

  const div = (cls: string, css: Partial<CSSStyleDeclaration> = {}, text?: string) => {
    const d = document.createElement("div");
    d.className = cls;
    Object.assign(d.style, css);
    if (text) d.textContent = text;
    layer.appendChild(d);
    return d;
  };

  const cursor = () => {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 15 21");
    svg.setAttribute("class", "ba-cursor");
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", CURSOR_PATH);
    svg.appendChild(path);
    layer.appendChild(svg);
    return svg;
  };

  return { layer, div, cursor };
}

export function clearOverlay(section: HTMLElement) {
  section.querySelector(":scope > .ba-overlay")?.replaceChildren();
}
