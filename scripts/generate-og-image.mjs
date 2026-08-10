import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#ffffff" />
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="#b0b0b0" stroke-width="2" />
  <text x="90" y="300" font-family="Arial, sans-serif" font-size="88" font-weight="600" fill="#1a1a1a">Ryan Chiang</text>
  <text x="90" y="360" font-family="Arial, sans-serif" font-size="30" fill="#6b6b6b">產品設計師 · 把複雜的問題梳理清楚</text>
</svg>
`;

mkdirSync(new URL("../public/", import.meta.url), { recursive: true });

await sharp(Buffer.from(svg))
  .png()
  .toFile(fileURLToPath(new URL("../public/og-image.png", import.meta.url)));

console.log("Wrote public/og-image.png");
