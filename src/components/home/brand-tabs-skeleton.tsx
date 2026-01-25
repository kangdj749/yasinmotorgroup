// src/components/home/brand-tabs-skeleton.tsx
export default function BrandTabsSkeleton() {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-9 w-20 rounded-full bg-muted animate-pulse"
        />
      ))}
    </div>
  );
}
