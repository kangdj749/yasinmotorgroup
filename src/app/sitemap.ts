import { MetadataRoute } from "next";
import { getAllCars } from "@/lib/data/cars";
import { getShowrooms } from "@/lib/data/showrooms";
import { getAllPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://yasinmotorgroup.com"; // ganti domain production
  const now = new Date();

  /* ================= STATIC ================= */
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/mobil`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/showroom`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  /* ================= MOBIL ================= */
  const cars = await getAllCars();

  const carUrls: MetadataRoute.Sitemap = cars
    .filter((car) => car.status === "available")
    .map((car) => ({
      url: `${baseUrl}/mobil/${car.slug}`,
      lastModified: car.createdAt
        ? new Date(car.createdAt)
        : now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  /* ================= SHOWROOM ================= */
  const showrooms = await getShowrooms();

  const showroomUrls: MetadataRoute.Sitemap = showrooms.map((s) => ({
    url: `${baseUrl}/showroom/${s.slug}`,
    lastModified: s.createdAt
      ? new Date(s.createdAt)
      : now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticUrls,
    ...carUrls,
    ...showroomUrls,
  ];

  /* ================= BLOG ================= */
  const posts = getAllPosts();

  const blogUrls = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticUrls,
    ...carUrls,
    ...showroomUrls,
    ...blogUrls,
  ];
  }

