import CarDetailGallerySkeleton from "@/components/car/CarDetailGallerySkeleton";
import CarDetailInfoSkeleton from "@/components/car/CarDetailInfoSkeleton";
import RelatedCarsSkeleton from "@/components/car/RelatedCarsSkeleton";

export default function MobilDetailSkeleton() {
  return (
    <main
      className="
        max-w-6xl mx-auto
        px-4 sm:px-6
        py-6 space-y-8
      "
    >
      {/* GALLERY */}
      <CarDetailGallerySkeleton />

      {/* INFO */}
      <CarDetailInfoSkeleton />

      {/* RELATED */}
      <RelatedCarsSkeleton />
    </main>
  );
}
