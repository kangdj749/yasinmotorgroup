import CarDetailGallerySkeleton from "@/components/car/CarDetailGallerySkeleton";
import CarDetailInfoSkeleton from "@/components/car/CarDetailInfoSkeleton";
import RelatedCarsSkeleton from "@/components/car/RelatedCarsSkeleton";

export default function MobilDetailSkeleton() {
  return (
    <main
      className="
        max-w-[1020px] mx-auto
        px-3 sm:px-5
        py-6 sm:py-8
        space-y-8
      "
    >
      {/* MAIN GRID */}
      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        {/* GALLERY */}
        <CarDetailGallerySkeleton />

        {/* INFO */}
        <CarDetailInfoSkeleton />
      </div>

      {/* RELATED CARS */}
      <div className="pt-2">
        <RelatedCarsSkeleton />
      </div>
    </main>
  );
}