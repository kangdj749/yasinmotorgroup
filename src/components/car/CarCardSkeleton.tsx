export default function CarCardSkeleton() {
  return (
    <div
      className="
        bg-card border border-border
        rounded-2xl overflow-hidden
      "
    >
      {/* IMAGE */}
      <div className="relative aspect-square skeleton" />

      {/* CONTENT */}
      <div className="p-3 space-y-2">
        {/* TITLE */}
        <div className="h-4 w-full rounded skeleton" />
        <div className="h-4 w-3/4 rounded skeleton" />

        {/* SHOWROOM (mobile hint) */}
        <div className="h-3 w-1/2 rounded skeleton sm:hidden" />

        {/* PRICE */}
        <div className="pt-1 space-y-1">
          <div className="h-3 w-1/3 rounded skeleton" />
          <div className="h-5 w-2/3 rounded skeleton" />
          <div className="h-3 w-1/2 rounded skeleton" />
        </div>
      </div>
    </div>
  );
}
