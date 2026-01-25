// src/components/car/car-description.tsx

type Props = {
  description: string;
};

export default function CarDescription({ description }: Props) {
  return (
    <div className="prose prose-sm max-w-none">
      <h2>Deskripsi</h2>
      <p>{description}</p>
    </div>
  );
}
