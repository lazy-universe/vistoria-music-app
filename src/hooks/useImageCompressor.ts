import { useState } from "react";
import imageCompression from "browser-image-compression";

interface ImageCompressionOptions {
    maxSizeMB?: number;
    maxWidthOrHeight?: number;
    useWebWorker?: boolean;
}

export function useImageCompressor() {
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);

  async function compress( file: File, options: ImageCompressionOptions, timeout: number = 15000): Promise<File> {
    const compressionPromise = imageCompression(file, options);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Compression timed out")), timeout)
    );

    try {
      setOriginalSize(file.size);
      const compressedFile = await Promise.race([compressionPromise, timeoutPromise]);
      setCompressedSize((compressedFile as File).size);
      return compressedFile as File;
    } catch (err) {
      console.error("Error compressing image:", err);
      throw err;
    }
  }

  return { originalSize, compressedSize, compress };
}
