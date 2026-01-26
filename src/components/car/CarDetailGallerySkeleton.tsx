export default function CarDetailGallerySkeleton() {
  return (
    <section className="space-y-3">
      {/* MAIN IMAGE */}
      <div className="relative aspect-square rounded-2xl skeleton" />

      {/* THUMB SLIDER */}
      <div className="flex gap-2 overflow-x-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="
              h-16 w-16
              flex-shrink-0
              rounded-xl skeleton
            "
          />
        ))}
      </div>
    </section>
  );
}
