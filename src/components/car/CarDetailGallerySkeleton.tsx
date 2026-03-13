export default function CarDetailGallerySkeleton() {
  return (
    <section
      className="
        space-y-2
      "
    >
      {/* MAIN IMAGE */}
      <div
        className="
          relative
          aspect-[4/3]
          rounded-xl
          skeleton
        "
      />

      {/* THUMBNAIL STRIP */}
      <div
        className="
          flex
          gap-1.5
          overflow-x-auto
          pb-1
        "
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="
              h-14 w-14
              flex-shrink-0
              rounded-lg
              skeleton
            "
          />
        ))}
      </div>
    </section>
  );
}