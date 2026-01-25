export default function MobilDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8 animate-pulse">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* IMAGE */}
        <div className="aspect-[4/3] bg-muted rounded-2xl" />

        {/* INFO */}
        <div className="space-y-4">
          <div className="h-6 w-3/4 bg-muted rounded" />
          <div className="h-4 w-1/2 bg-muted rounded" />

          <div className="h-24 bg-muted rounded-2xl" />

          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-4/6 bg-muted rounded" />
          </div>

          <div className="h-12 bg-muted rounded-xl" />
        </div>
      </div>
    </div>
  );
}
