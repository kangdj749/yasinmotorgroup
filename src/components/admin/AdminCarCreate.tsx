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

  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);

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
     UPLOAD IMAGE
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
    if (!form.title || !image) {
      alert("Judul & thumbnail wajib diisi");
      return;
    }

    setLoading(true);

    const payload = {
      title: form.title,
      description: form.description,
      brand: form.brand,
      showroomId: form.showroomId,
      showroomName: form.showroomName,

      dp: Number(form.dp),
      installment: Number(form.installment),
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
      alert("Gagal simpan mobil");
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

      {/* INFO UTAMA */}
      <Card>
        <CardContent className="space-y-4 pt-5">
          <Label>Judul Mobil</Label>
          <Input
            placeholder="Toyota Avanza 2019 AT – DP 25 Juta"
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
            placeholder="Toyota"
            value={form.brand}
            onChange={(e) =>
              setForm({ ...form, brand: e.target.value })
            }
          />

          <Label>Showroom ID</Label>
          <Input
            placeholder="bandung-1"
            value={form.showroomId}
            onChange={(e) =>
              setForm({ ...form, showroomId: e.target.value })
            }
          />

          <Label>Nama Showroom</Label>
          <Input
            placeholder="Nara Mobilindo"
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
            placeholder="25000000"
            value={form.dp}
            onChange={(e) =>
              setForm({ ...form, dp: e.target.value })
            }
          />

          <Label>Cicilan / Bulan</Label>
          <Input
            type="number"
            placeholder="3500000"
            value={form.installment}
            onChange={(e) =>
              setForm({ ...form, installment: e.target.value })
            }
          />

          <Label>Tenor</Label>
          <Input
            placeholder="4 tahun / 48 bulan"
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
            onChange={async (e) => {
              if (e.target.files?.[0]) {
                setImage(await uploadImage(e.target.files[0]));
              }
            }}
          />

          <Label>Gallery Mobil</Label>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={async (e) => {
              if (!e.target.files) return;

              const urls: string[] = [];

              for (const f of Array.from(e.target.files)) {
                const url = await uploadImage(f);
                urls.push(url);
              }

              setGallery((prev) => [...prev, ...urls]);
            }}
          />
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
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Menyimpan..." : "Simpan Mobil"}
      </Button>
    </div>
  );
}
