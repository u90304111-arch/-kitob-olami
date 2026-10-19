import * as THREE from "three";
import { Book } from "@/data/books";

export function drawBookCoverToCanvas(
  canvas: HTMLCanvasElement,
  book: Book,
  type: "front" | "back" | "spine" | "page-inner-left" | "page-inner-right"
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;

  // Clear
  ctx.clearRect(0, 0, width, height);

  if (type === "front") {
    // Rich gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, book.coverColor);
    gradient.addColorStop(0.6, book.coverSecondaryColor);
    gradient.addColorStop(1, book.coverColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative noise / texture overlay
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    for (let i = 0; i < 200; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const rs = Math.random() * 3 + 1;
      ctx.fillRect(rx, ry, rs, rs);
    }

    // Outer border frame (Gold foil look)
    const margin = width * 0.06;
    ctx.strokeStyle = "rgba(255, 215, 0, 0.65)";
    ctx.lineWidth = width * 0.012;
    ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = width * 0.004;
    ctx.strokeRect(margin + 8, margin + 8, width - margin * 2 - 16, height - margin * 2 - 32);

    // Corner Ornaments
    drawCornerOrnament(ctx, margin + 14, margin + 14, 28);
    drawCornerOrnament(ctx, width - margin - 14, margin + 14, 28);
    drawCornerOrnament(ctx, margin + 14, height - margin - 14, 28);
    drawCornerOrnament(ctx, width - margin - 14, height - margin - 14, 28);

    // Header badge
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.beginPath();
    ctx.roundRect(width / 2 - 120, margin + 30, 240, 36, 18);
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.font = `600 ${Math.round(width * 0.032)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(book.genre.toUpperCase(), width / 2, margin + 48);

    // Pattern background graphic
    drawPattern(ctx, book.pattern, width, height);

    // Title area
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;

    ctx.fillStyle = "#FFFFFF";
    ctx.font = `bold ${Math.round(width * 0.082)}px 'Playfair Display', Georgia, serif`;
    ctx.textAlign = "center";
    
    // Multi-line title wrap
    const words = book.title.split(" ");
    let line = "";
    const lines: string[] = [];
    const maxW = width - margin * 3;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxW && n > 0) {
        lines.push(line);
        line = words[n] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const titleYStart = height * 0.42 - (lines.length * width * 0.09) / 2;
    lines.forEach((l, index) => {
      ctx.fillText(l.trim(), width / 2, titleYStart + index * (width * 0.095));
    });

    // Decorative divider line under title
    ctx.shadowColor = "transparent";
    const divY = titleYStart + lines.length * (width * 0.095) + 10;
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 80, divY);
    ctx.lineTo(width / 2 + 80, divY);
    ctx.stroke();

    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(width / 2, divY, 6, 0, Math.PI * 2);
    ctx.fill();

    // Author
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 8;
    ctx.fillStyle = "#F1F7FF";
    ctx.font = `500 ${Math.round(width * 0.048)}px sans-serif`;
    ctx.fillText(book.author, width / 2, divY + 45);

    // Bottom branding
    ctx.shadowColor = "transparent";
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.font = `bold ${Math.round(width * 0.03)}px sans-serif`;
    ctx.fillText("KITOB TOP • PREMIUM EDITION", width / 2, height - margin - 35);
  } else if (type === "spine") {
    // Spine
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, book.coverColor);
    gradient.addColorStop(0.5, book.coverSecondaryColor);
    gradient.addColorStop(1, book.coverColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Gold accent bands on spine
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(0, 30, width, 6);
    ctx.fillRect(0, 42, width, 2);
    ctx.fillRect(0, height - 42, width, 2);
    ctx.fillRect(0, height - 30, width, 6);

    // Rotated text for Title & Author
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-Math.PI / 2);

    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `bold ${Math.round(width * 0.35)}px sans-serif`;
    ctx.fillText(`${book.title} — ${book.author}`, 0, 0);
    ctx.restore();

    // Top logo
    ctx.fillStyle = "#FFFFFF";
    ctx.font = `bold ${Math.round(width * 0.3)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText("KT", width / 2, 75);
  } else if (type === "back") {
    // Back Cover
    ctx.fillStyle = book.coverColor;
    ctx.fillRect(0, 0, width, height);

    const margin = width * 0.08;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 2;
    ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = `bold ${Math.round(width * 0.05)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText("KITOB HAQIDA", width / 2, margin + 50);

    // Description paragraph
    ctx.font = `${Math.round(width * 0.036)}px sans-serif`;
    ctx.fillStyle = "#E2E8F0";
    ctx.textAlign = "left";
    
    wrapText(ctx, book.description, margin + 20, margin + 110, width - margin * 2 - 40, width * 0.05);

    // Barcode area
    const barY = height - margin - 100;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(width / 2 - 100, barY, 200, 60);

    ctx.fillStyle = "#000000";
    for (let i = 0; i < 30; i++) {
      const bw = Math.random() > 0.5 ? 4 : 2;
      const bx = width / 2 - 90 + i * 6;
      ctx.fillRect(bx, barY + 5, bw, 40);
    }
    ctx.font = "12px monospace";
    ctx.textAlign = "center";
    ctx.fillText(book.isbn, width / 2, barY + 55);
  } else if (type === "page-inner-left" || type === "page-inner-right") {
    // Book interior open page (creamy paper)
    ctx.fillStyle = "#FAF8F5";
    ctx.fillRect(0, 0, width, height);

    // Soft page shading near center spine edge
    const shadowGrad = ctx.createLinearGradient(
      type === "page-inner-left" ? width : 0,
      0,
      type === "page-inner-left" ? width - 80 : 80,
      0
    );
    shadowGrad.addColorStop(0, "rgba(0,0,0,0.18)");
    shadowGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = shadowGrad;
    ctx.fillRect(0, 0, width, height);

    const margin = 40;
    ctx.fillStyle = "#2D3748";
    ctx.font = "bold 22px 'Playfair Display', Georgia, serif";
    ctx.textAlign = "left";

    if (type === "page-inner-left") {
      ctx.fillText(book.title, margin, margin + 20);
      ctx.fillStyle = "#718096";
      ctx.font = "16px sans-serif";
      ctx.fillText(`Muallif: ${book.author}`, margin, margin + 50);
      ctx.fillText(`Janr: ${book.genre}`, margin, margin + 75);
      ctx.fillText(`Nashr yili: ${book.year}`, margin, margin + 100);

      ctx.strokeStyle = "#CBD5E0";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(margin, margin + 120);
      ctx.lineTo(width - margin, margin + 120);
      ctx.stroke();

      ctx.fillStyle = "#4A5568";
      ctx.font = "15px/1.6 sans-serif";
      wrapText(ctx, book.summary, margin, margin + 150, width - margin * 2, 26);
    } else {
      ctx.fillText("ASAR MAZMUNI VA SHARH", margin, margin + 20);
      ctx.fillStyle = "#4A5568";
      ctx.font = "15px/1.6 sans-serif";
      wrapText(
        ctx,
        `KITOB TOP platformasida siz ${book.title} asarini baholashingiz va o'zingizning sevimli ro'yxatingizga qo'shishingiz mumkin. Ushbu kitob ${book.pages} sahifadan iborat bo'lib, o'quvchilar tomonidan ${book.rating}/5.0 ball bilan baholangan. Narxi: ${book.formattedPrice}.`,
        margin,
        margin + 60,
        width - margin * 2,
        26
      );

      // Decorative Quote Box
      ctx.fillStyle = "#EDF2F7";
      ctx.roundRect(margin, height * 0.5, width - margin * 2, 140, 12);
      ctx.fill();

      ctx.fillStyle = "#0755D9";
      ctx.font = "italic 16px serif";
      wrapText(ctx, `“Yaxshi kitob — bu inson qalbining eng ishonchli do'sti va sirdoshidir.”`, margin + 20, height * 0.5 + 40, width - margin * 2 - 40, 24);

      ctx.fillStyle = "#A0AEC0";
      ctx.font = "13px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("Kitob Top Tavsiyasi", width - margin - 20, height * 0.5 + 120);
    }
  }
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
}

function drawCornerOrnament(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.strokeStyle = "rgba(255, 215, 0, 0.8)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawPattern(ctx: CanvasRenderingContext2D, pattern: string, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1.5;

  if (pattern === "stars") {
    for (let i = 0; i < 15; i++) {
      const sx = (i % 5) * (width / 4) + 40;
      const sy = Math.floor(i / 5) * (height / 3) + 60;
      ctx.beginPath();
      ctx.arc(sx, sy, 8, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else if (pattern === "waves") {
    for (let y = 100; y < height - 100; y += 80) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.quadraticCurveTo(width / 2, y + 30, width, y);
      ctx.stroke();
    }
  } else if (pattern === "geometric" || pattern === "lines") {
    for (let x = -height; x < width + height; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height, height);
      ctx.stroke();
    }
  }
  ctx.restore();
}

export function createBookTextures(book: Book) {
  const frontCanvas = document.createElement("canvas");
  frontCanvas.width = 1024;
  frontCanvas.height = 1536;
  drawBookCoverToCanvas(frontCanvas, book, "front");

  const backCanvas = document.createElement("canvas");
  backCanvas.width = 1024;
  backCanvas.height = 1536;
  drawBookCoverToCanvas(backCanvas, book, "back");

  const spineCanvas = document.createElement("canvas");
  spineCanvas.width = 256;
  spineCanvas.height = 1536;
  drawBookCoverToCanvas(spineCanvas, book, "spine");

  const leftPageCanvas = document.createElement("canvas");
  leftPageCanvas.width = 1024;
  leftPageCanvas.height = 1536;
  drawBookCoverToCanvas(leftPageCanvas, book, "page-inner-left");

  const rightPageCanvas = document.createElement("canvas");
  rightPageCanvas.width = 1024;
  rightPageCanvas.height = 1536;
  drawBookCoverToCanvas(rightPageCanvas, book, "page-inner-right");

  return {
    front: new THREE.CanvasTexture(frontCanvas),
    back: new THREE.CanvasTexture(backCanvas),
    spine: new THREE.CanvasTexture(spineCanvas),
    leftPage: new THREE.CanvasTexture(leftPageCanvas),
    rightPage: new THREE.CanvasTexture(rightPageCanvas),
  };
}
