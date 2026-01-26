import CarCardSkeleton from "@/components/car/CarCardSkeleton";

export default function RelatedCarsSkeleton() {
  return (
    <section className="space-y-4">
      {/* TITLE */}
      <div className="h-5 w-1/3 rounded skeleton" />

      {/* GRID */}
      <div
        className="
          grid grid-cols-2
          gap-3
          sm:grid-cols-3
          lg:grid-cols-4
        "
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 pt-2">
        <div className="h-9 w-9 rounded-lg skeleton" />
        <div className="h-9 w-9 rounded-lg skeleton" />
        <div className="h-9 w-9 rounded-lg skeleton" />
      </div>
    </section>
  );
}
