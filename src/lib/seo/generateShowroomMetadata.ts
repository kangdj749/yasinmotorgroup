// src/lib/seo/generateShowroomMetadata.ts

export function generateShowroomMetadata(showroom: string) {
  const title = `Mobil Bekas ${showroom} | DP Ringan & Angsuran Fleksibel`;
  const description = `Jual mobil bekas di ${showroom}. DP ringan, angsuran fleksibel, unit lengkap dan siap proses.`;

  return {
    title,
    description,
  };
}
