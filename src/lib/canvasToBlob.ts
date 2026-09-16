export async function canvasToBlob(
  canvas: HTMLCanvasElement,
  mime: string,
  quality?: number
): Promise<Blob> {
  if (mime === "image/x-icon" || mime === "image/vnd.microsoft.icon") {
    return canvasToIco(canvas);
  }

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Export failed"))),
      mime,
      quality
    );
  });
}

async function canvasToIco(canvas: HTMLCanvasElement): Promise<Blob> {
  const sizes = [16, 32, 48];
  const pngs: { size: number; data: Uint8Array }[] = [];

  for (const size of sizes) {
    const c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    const ctx = c.getContext("2d");
    if (!ctx) throw new Error("Failed to create canvas context");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(canvas, 0, 0, size, size);

    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      c.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("ICO export failed"))),
        "image/png"
      );
    });

    const buf = new Uint8Array(await pngBlob.arrayBuffer());
    pngs.push({ size, data: buf });
  }

  const totalDataSize = pngs.reduce((acc, p) => acc + p.data.length, 0);
  const headerSize = 6 + pngs.length * 16;
  const totalSize = headerSize + totalDataSize;

  const out = new Uint8Array(totalSize);
  const view = new DataView(out.buffer);

  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, pngs.length, true);

  let offset = headerSize;
  pngs.forEach((png, i) => {
    const entry = 6 + i * 16;
    view.setUint8(entry + 0, png.size >= 256 ? 0 : png.size);
    view.setUint8(entry + 1, png.size >= 256 ? 0 : png.size);
    view.setUint8(entry + 2, 0);
    view.setUint8(entry + 3, 0);
    view.setUint16(entry + 4, 1, true);
    view.setUint16(entry + 6, 32, true);
    view.setUint32(entry + 8, png.data.length, true);
    view.setUint32(entry + 12, offset, true);
    out.set(png.data, offset);
    offset += png.data.length;
  });

  return new Blob([out], { type: "image/x-icon" });
}