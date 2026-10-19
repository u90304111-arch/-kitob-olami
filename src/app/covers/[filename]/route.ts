import { NextResponse } from "next/server";
import { INITIAL_BOOKS } from "@/data/books";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const resolvedParams = await params;
  const filename = resolvedParams.filename.replace(".svg", "");
  
  const book = INITIAL_BOOKS.find(
    (b) =>
      b.title.toLowerCase().replace(/[^a-z0-9]/g, "") ===
        filename.toLowerCase().replace(/[^a-z0-9]/g, "") ||
      b.id.toString() === filename
  ) || INITIAL_BOOKS[0];

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${book.coverColor}" />
          <stop offset="50%" stop-color="${book.coverSecondaryColor}" />
          <stop offset="100%" stop-color="${book.coverColor}" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFE259" />
          <stop offset="100%" stop-color="#FFA751" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000" flood-opacity="0.3" />
        </filter>
      </defs>

      <!-- Background Cover -->
      <rect width="400" height="600" rx="16" fill="url(#bgGrad)" />

      <!-- Outer Gold Foil Frame -->
      <rect x="24" y="24" width="352" height="552" rx="10" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-dasharray="0" opacity="0.8" />
      <rect x="32" y="32" width="336" height="536" rx="6" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.2" />

      <!-- Spine Overlay Shadow -->
      <rect x="0" y="0" width="22" height="600" fill="#000000" opacity="0.25" />
      <rect x="22" y="0" width="4" height="600" fill="#FFFFFF" opacity="0.15" />

      <!-- Pattern Elements -->
      <g opacity="0.12" stroke="#FFFFFF" stroke-width="1.5" fill="none">
        <circle cx="200" cy="180" r="110" />
        <circle cx="200" cy="180" r="85" stroke-dasharray="4,4" />
        <polygon points="200,90 230,160 300,180 230,200 200,270 170,200 100,180 170,160" />
      </g>

      <!-- Genre Pill -->
      <rect x="130" y="55" width="140" height="28" rx="14" fill="#FFFFFF" opacity="0.2" />
      <text x="200" y="74" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">
        ${book.genre.toUpperCase()}
      </text>

      <!-- Book Title -->
      <g filter="url(#shadow)">
        <text x="200" y="290" font-family="'Georgia', serif" font-size="30" font-weight="bold" fill="#FFFFFF" text-anchor="middle">
          ${escapeSvgText(book.title)}
        </text>
      </g>

      <!-- Golden Divider -->
      <line x1="140" y1="325" x2="260" y2="325" stroke="url(#goldGrad)" stroke-width="2" />
      <circle cx="200" cy="325" r="4" fill="#FFE259" />

      <!-- Author Name -->
      <text x="200" y="365" font-family="system-ui, sans-serif" font-size="18" font-weight="500" fill="#F1F7FF" text-anchor="middle" opacity="0.95">
        ${escapeSvgText(book.author)}
      </text>

      <!-- Badge (if any) -->
      ${
        book.badge
          ? `
        <rect x="130" y="440" width="140" height="30" rx="15" fill="url(#goldGrad)" />
        <text x="200" y="460" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#102C5C" text-anchor="middle">
          ${escapeSvgText(book.badge)}
        </text>
      `
          : ""
      }

      <!-- Bottom Brand -->
      <text x="200" y="540" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#FFFFFF" opacity="0.7" text-anchor="middle" letter-spacing="2">
        KITOB TOP • NASHRIYOTI
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

function escapeSvgText(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
