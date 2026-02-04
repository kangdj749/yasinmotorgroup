"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type CarFormState = {
  title: string;
  description: string;
  brand: string;
  showroomId: string;
  showroomName: string;
  dp: string;
  installment: string;
  tenor: string;
  status: "available" | "sold" | "draft";
};

export default function AdminCarCreate() {
  const [loading, setLoading] = useState(false);

  // upload states (DIPISAH)
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState<CarFormState>({
    title: "",
    description: "",
    brand: "",
    showroomId: "",
    showroomName: "",
    dp: "",
    installment: "",
    tenor: "",
    status: "available",
  });

  /* =====================
     UPLOAD IMAGE (TIDAK DIUBAH)
  ===================== */
  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload/image", {
      method: "POST",
      body: fd,
    });

    if (!res.ok) throw new Error("Upload gagal");

    const data = await res.json();
    return data.url as string;
  };

  /* =====================
     SUBMIT
  ===================== */
  const handleSubmit = async () => {
    setError("");

    if (uploadingThumbnail || uploadingGallery) {
      setError("Tunggu sampai proses upload selesai");
      return;
    }

    if (!form.title.trim()) {
      setError("Judul mobil wajib diisi");
      return;
    }

    if (!image) {
      setError("Thumbnail belum diupload");
      return;
    }

    setLoading(true);

    const payload = {
      title: form.title.trim(),
      description: form.description,
      brand: form.brand,
      showroomId: form.showroomId,
      showroomName: form.showroomName,
      dp: Number(form.dp) || 0,
      installment: Number(form.installment) || 0,
      tenor: form.tenor,
      image,
      gallery,
      status: form.status,
    };

    const res = await fetch("/api/admin/cars/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setError("Gagal menyimpan data mobil");
    } else {
      alert("Mobil berhasil disimpan ✅");
    }

    setLoading(false);
  };

  /* =====================
     UI
  ===================== */
  return (
    <div className="max-w-xl mx-auto p-4 space-y-6 pb-32">
      <h1 className="text-xl font-semibold">Tambah Mobil Bekas</h1>
      <p className="text-sm text-muted-foreground">
        Data akan langsung masuk ke Google Sheet
      </p>

      {/* ERROR UX */}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* INFO UTAMA */}
      <Card>
        <CardContent className="space-y-4 pt-5">
          <Label>Judul Mobil</Label>
          <Input
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <Label>Deskripsi</Label>
          <Textarea
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <Label>Brand</Label>
          <Input
            value={form.brand}
            onChange={(e) =>
              setForm({ ...form, brand: e.target.value })
            }
          />

          <Label>Showroom ID</Label>
          <Input
            value={form.showroomId}
            onChange={(e) =>
              setForm({ ...form, showroomId: e.target.value })
            }
          />

          <Label>Nama Showroom</Label>
          <Input
            value={form.showroomName}
            onChange={(e) =>
              setForm({ ...form, showroomName: e.target.value })
            }
          />
        </CardContent>
      </Card>

      {/* HARGA */}
      <Card>
        <CardContent className="space-y-4 pt-5">
          <Label>DP</Label>
          <Input
            type="number"
            value={form.dp}
            onChange={(e) =>
              setForm({ ...form, dp: e.target.value })
            }
          />

          <Label>Cicilan / Bulan</Label>
          <Input
            type="number"
            value={form.installment}
            onChange={(e) =>
              setForm({ ...form, installment: e.target.value })
            }
          />

          <Label>Tenor</Label>
          <Input
            value={form.tenor}
            onChange={(e) =>
              setForm({ ...form, tenor: e.target.value })
            }
          />
        </CardContent>
      </Card>

      {/* IMAGE */}
      <Card>
        <CardContent className="space-y-4 pt-5">
          <Label>Thumbnail</Label>
          <Input
            type="file"
            accept="image/*"
            disabled={uploadingThumbnail}
            onChange={async (e) => {
              if (!e.target.files?.[0]) return;
              try {
                setUploadingThumbnail(true);
                const url = await uploadImage(e.target.files[0]);
                setImage(url);
              } catch {
                setError("Upload thumbnail gagal");
              } finally {
                setUploadingThumbnail(false);
              }
            }}
          />

          {uploadingThumbnail && (
            <p className="text-xs text-muted-foreground">
              ⏳ Mengupload thumbnail...
            </p>
          )}

          {image && !uploadingThumbnail && (
            <>
              <p className="text-xs text-green-600">
                ✅ Thumbnail berhasil diupload
              </p>

              <div className="relative w-40 aspect-square border rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded"
                >
                  Ganti
                </button>
              </div>
            </>
          )}

          <Label>Gallery Mobil</Label>
          <Input
            type="file"
            multiple
            accept="image/*"
            disabled={uploadingGallery}
            onChange={async (e) => {
              if (!e.target.files) return;
              try {
                setUploadingGallery(true);
                const uploads = Array.from(e.target.files).map(uploadImage);
                const urls = await Promise.all(uploads);
                setGallery((prev) => [...prev, ...urls]);
              } catch {
                setError("Upload gallery gagal");
              } finally {
                setUploadingGallery(false);
              }
            }}
          />

          {uploadingGallery && (
            <p className="text-xs text-muted-foreground">
              ⏳ Mengupload gallery...
            </p>
          )}

          {gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {gallery.map((url, i) => (
                <div
                  key={i}
                  className="relative aspect-square border rounded-lg overflow-hidden"
                >
                  <img
                    src={url}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setGallery((prev) =>
                        prev.filter((_, idx) => idx !== i)
                      )
                    }
                    className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* STATUS */}
      <Card>
        <CardContent className="space-y-4 pt-5">
          <Label>Status</Label>
          <select
            className="w-full border rounded-md p-2"
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as CarFormState["status"],
              })
            }
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="draft">Draft</option>
          </select>
        </CardContent>
      </Card>

      <Separator />

      <Button
        className="w-full fixed bottom-4 left-0 right-0 max-w-xl mx-auto"
        disabled={
          loading || uploadingThumbnail || uploadingGallery
        }
        onClick={handleSubmit}
      >
        {uploadingThumbnail || uploadingGallery
          ? "Upload gambar..."
          : loading
          ? "Menyimpan..."
          : "Simpan Mobil"}
      </Button>
    </div>
  );
}
