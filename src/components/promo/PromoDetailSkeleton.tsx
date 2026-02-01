export default function PromoDetailSkeleton() {
  return (
    <section className="space-y-6 animate-pulse">
      {/* BADGE */}
      <div className="h-6 w-28 rounded-full bg-muted" />

      {/* TITLE */}
      <div className="space-y-2">
        <div className="h-7 w-3/4 rounded-lg bg-muted" />
        <div className="h-4 w-full max-w-xl rounded bg-muted" />
        <div className="h-4 w-5/6 max-w-lg rounded bg-muted" />
      </div>

      {/* DIVIDER */}
      <div className="h-px w-full bg-border" />

      {/* GRID MOBIL */}
      <div
        className="
          grid grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          gap-3
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
        rounded-2xl
        border
        bg-card
        overflow-hidden
        shadow-sm
      "
    >
      {/* IMAGE */}
      <div className="aspect-square bg-muted" />

      {/* CONTENT */}
      <div className="p-3 space-y-2">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-3 w-3/4 rounded bg-muted" />

        <div className="pt-2 space-y-1">
          <div className="h-3 w-16 rounded bg-muted" />
          <div className="h-5 w-24 rounded bg-muted" />
          <div className="h-3 w-32 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
