export default function CarCardSkeleton() {
  return (
    <div
      className="
        bg-card border border-border
        rounded-2xl overflow-hidden
        animate-pulse
      "
    >
      <div className="aspect-square bg-muted" />

      <div className="p-3 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />

        <div className="flex gap-2 pt-1">
          <div className="h-4 bg-muted rounded w-20" />
          <div className="h-4 bg-muted rounded w-14" />
        </div>
      </div>
    </div>
  );
}
