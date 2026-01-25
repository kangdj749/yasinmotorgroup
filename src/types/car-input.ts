export type CarInput = {
  title: string;
  description: string;

  brand: string;
  showroomId: string;
  showroomName?: string;

  dp: number;
  installment: number;
  tenor: string;

  image: string;
  gallery: string[];

  status?: "available" | "sold" | "draft";
};
