import heic2any from "heic2any";

export type LoadedImage = {
  element: HTMLImageElement;
  width: number;
  height: number;
  blob: Blob;
};

const HEIC_EXTS = ["heic", "heif"];

function isHeic(file: File): boolean {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (HEIC_EXTS.includes(ext)) return true;
  if (file.type === "image/heic" || file.type === "image/heif") return true;
  return false;
}

async function normalizeFile(file: File): Promise<Blob> {
  if (!isHeic(file)) return file;

  const result = await heic2any({
    blob: file,
    toType: "image/png",
    quality: 0.95,
  });

  const blob = Array.isArray(result) ? result[0] : result;
  return blob as Blob;
}

function loadFromBlob(blob: Blob): Promise<LoadedImage> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      URL.revokeObjectURL(url);
      resolve({ element: img, width, height, blob });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}

export async function loadImage(file: File): Promise<LoadedImage> {
  const normalized = await normalizeFile(file);
  return loadFromBlob(normalized);
}