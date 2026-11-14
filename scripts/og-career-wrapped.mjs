// Generates public/og-career-wrapped.png (1200x630) in the career-wrapped page palette.
import sharp from "sharp";
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#2b3be6"/>
  <circle cx="1040" cy="120" r="210" fill="#ffe45c"/>
  <circle cx="930" cy="560" r="150" fill="#ff9ec7"/>
  <rect x="760" y="300" width="180" height="180" rx="36" fill="#6fe3b4" transform="rotate(14 850 390)"/>
  <text x="80" y="150" font-family="Noto Sans TC, Microsoft JhengHei, sans-serif" font-weight="700" font-size="40" fill="#b3bcff" letter-spacing="4">CAREER WRAPPED</text>
  <text x="80" y="330" font-family="Arial Black, Inter Tight, sans-serif" font-weight="900" font-size="180" fill="#ffffff">2026</text>
  <text x="80" y="450" font-family="Noto Sans TC, Microsoft JhengHei, sans-serif" font-weight="900" font-size="96" fill="#ffffff">職涯回顧</text>
  <text x="80" y="550" font-family="Noto Sans TC, Microsoft JhengHei, sans-serif" font-weight="500" font-size="34" fill="#ece8f6">✦ 8 張卡片，看我這一年</text>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile("public/og-career-wrapped.png");
console.log("ok");
