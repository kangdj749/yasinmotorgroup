export default function CarCardSkeleton() {
  return (
    <div
      className="
        bg-card
        border border-border
        rounded-xl
        overflow-hidden
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative
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
        <div className="h-3.5 w-4/5 rounded skeleton" />

        {/* SHOWROOM (mobile hint) */}
        <div className="h-2.5 w-1/2 rounded skeleton sm:hidden" />

        {/* PRICE */}
        <div className="pt-1 space-y-1">
          <div className="h-2.5 w-1/3 rounded skeleton" />
          <div className="h-4 w-2/3 rounded skeleton" />
          <div className="h-2.5 w-1/2 rounded skeleton" />
        </div>
      </div>
    </div>
  );
}