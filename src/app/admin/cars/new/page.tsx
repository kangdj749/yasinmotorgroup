import AdminCarCreate from "@/components/admin/AdminCarCreate";
import { CarFormFooter } from "@/components/admin/CarFormFooter";


export default function NewCarPage() {
  return (
    <div className="max-w-xl mx-auto p-4 space-y-6 pb-32">
     <main className="container py-4">
     
     <AdminCarCreate/>
    

    </main>
    </div>
  );
}
