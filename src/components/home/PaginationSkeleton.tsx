export default function PaginationSkeleton() {
  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="
            h-9 w-9
            rounded-md
            bg-muted
            animate-pulse
          "
        />
      ))}
    </div>
  );
}
