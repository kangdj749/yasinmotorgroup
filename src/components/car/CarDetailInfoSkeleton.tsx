export default function CarDetailInfoSkeleton() {
  return (
    <section className="space-y-4">
      {/* TITLE */}
      <div className="space-y-2">
        <div className="h-6 w-3/4 rounded skeleton" />
        <div className="h-4 w-1/2 rounded skeleton" />
      </div>

      {/* BADGES */}
      <div className="flex gap-2">
        <div className="h-6 w-20 rounded-full skeleton" />
        <div className="h-6 w-24 rounded-full skeleton" />
      </div>

      {/* PRICE BOX */}
      <div
        className="
          bg-muted/40
          rounded-2xl
          p-4 space-y-2
        "
      >
        <div className="h-4 w-1/3 rounded skeleton" />
        <div className="h-7 w-2/3 rounded skeleton" />
        <div className="h-4 w-1/2 rounded skeleton" />
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-2">
        <div className="h-4 w-full rounded skeleton" />
        <div className="h-4 w-full rounded skeleton" />
        <div className="h-4 w-4/5 rounded skeleton" />
      </div>

      {/* CTA */}
      <div className="h-12 w-full rounded-xl skeleton" />
    </section>
  );
}
