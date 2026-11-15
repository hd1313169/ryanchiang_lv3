const cache = new WeakMap<HTMLElement, HTMLElement[]>();

/** 把非空白字元各包成 span.ch；空白保留為文字節點以維持換行。結果快取，重播不重拆。 */
export function split(el: HTMLElement): HTMLElement[] {
  const hit = cache.get(el);
  if (hit) return hit;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) {
    const frag = document.createDocumentFragment();
    for (const ch of Array.from(node.textContent ?? "")) {
      if (/\s/.test(ch)) {
        frag.appendChild(document.createTextNode(ch));
      } else {
        const span = document.createElement("span");
        span.className = "ch";
        span.textContent = ch;
        frag.appendChild(span);
      }
    }
    node.replaceWith(frag);
  }
  const chars = Array.from(el.querySelectorAll<HTMLElement>(".ch"));
  cache.set(el, chars);
  return chars;
}

export function charsOf(el: HTMLElement): HTMLElement[] {
  return cache.get(el) ?? [];
}
