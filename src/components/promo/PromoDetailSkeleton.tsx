export default function PromoDetailSkeleton() {
  return (
    <section
      className="
        space-y-4
      "
    >
      {/* BADGE */}
      <div className="h-5 w-24 rounded-full skeleton" />

      {/* TITLE */}
      <div className="space-y-1.5">
        <div className="h-5 w-3/4 rounded skeleton" />
        <div className="h-3 w-full max-w-xl rounded skeleton" />
        <div className="h-3 w-5/6 max-w-lg rounded skeleton" />
      </div>

      {/* DIVIDER */}
      <div className="h-px w-full bg-border" />

      {/* GRID MOBIL */}
      <div
        className="
          grid grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          gap-2
        "
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <PromoCarCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

/* ===== SUB KOMPONEN ===== */

function PromoCarCardSkeleton() {
  return (
    <div
      className="
        rounded-xl
        border border-border
        bg-card
        overflow-hidden
      "
    >
      {/* IMAGE */}
      <div
        className="
          aspect-[4/3]
          skeleton
        "
      />

      {/* CONTENT */}
      <div
        className="
          p-2.5
          space-y-1.5
        "
      >
        {/* TITLE */}
        <div className="h-3.5 w-full rounded skeleton" />
        <div className="h-2.5 w-3/4 rounded skeleton" />

        {/* PRICE */}
        <div className="pt-1 space-y-1">
          <div className="h-2.5 w-16 rounded skeleton" />
          <div className="h-4 w-24 rounded skeleton" />
          <div className="h-2.5 w-28 rounded skeleton" />
        </div>
      </div>
    </div>
  );
}