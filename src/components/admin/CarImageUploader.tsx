"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  onChange: (urls: string[]) => void;
};

export function CarImageUploader({ onChange }: Props) {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(file: File) {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", file.name);

      const res = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload gagal");
      }

      const data: { url: string } = await res.json();

      const next = [...images, data.url];
      setImages(next);
      onChange(next);
    } catch (err) {
      console.error(err);
      alert("Gagal upload gambar");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">
        Foto Mobil
      </label>

      <input
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
        className="block w-full text-sm"
      />

      {uploading && (
        <p className="text-xs text-muted-foreground">
          Mengupload gambar...
        </p>
      )}

      <div className="grid grid-cols-3 gap-2">
        {images.map((img) => (
          <Image
            key={img}
            src={img}
            alt="Foto mobil"
            width={300}
            height={200}
            className="rounded-lg object-cover aspect-[4/3]"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
