import CarCardSkeleton from "@/components/car/CarCardSkeleton";

export default function HomeCarSkeleton() {
  return (
    <section
      className="
        grid
        grid-cols-2
        gap-3
        sm:grid-cols-3
        lg:grid-cols-4
      "
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <CarCardSkeleton key={i} />
      ))}
    </section>
  );
}
