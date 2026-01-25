// src/components/car/car-grid-skeleton.tsx
import { CarCardSkeleton } from "./car-card-skeleton";

export default function CarGridSkeleton() {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <CarCardSkeleton key={i} />
      ))}
    </section>
  );
}
