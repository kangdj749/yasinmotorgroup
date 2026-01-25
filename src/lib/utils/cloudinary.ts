export function cloudinaryImage(
  src: string,
  width = 600,
  height = 400
) {
  if (!src.includes("cloudinary.com")) return src;

  return src.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width},h_${height},c_fill/`
  );
}
