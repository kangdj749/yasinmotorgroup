const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

type Variant = "card" | "detail" | "thumb" | "hero";

const VARIANTS: Record<Variant, string> = {
  card: "w_360,h_360,c_fill",
  detail: "w_720,h_720,c_fill",
  thumb: "w_160,h_160,c_fill",
  hero: "w_1080,c_fill",
};

export function cloudinaryImage(
  src?: string,
  variant: Variant = "card"
) {
  if (!src) return "/placeholder-car.png";
  if (!src.includes("res.cloudinary.com")) return src;

  return src.replace(
    "/upload/",
    `/upload/f_auto,q_auto,dpr_auto/${VARIANTS[variant]}/`
  );
}
