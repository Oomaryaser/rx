import { prisma } from "@/lib/prisma";
import NewPatient from "@/components/NewPatient";
export default async function PatientsPage() {
 const patients = await prisma.patient.findMany({ orderBy: { id: "desc" } });
 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <h1 className="text-2xl font-bold">المرضى</h1>
    <NewPatient />
   </div>
   <div className="bg-white rounded-2xl p-4 shadow border overflow-x-auto">
    <table className="w-full text-sm">
     <thead className="text-left text-slate-500">
      <tr>
       <th className="p-2">الاسم</th>
       <th className="p-2">الهاتف</th>
       <th className="p-2">الحساسية</th>
       <th className="p-2">ملاحظات</th>
      </tr>
     </thead>
     <tbody>
      {patients.map(p => (
       <tr key={p.id} className="border-t">
        <td className="p-2">{p.name}</td>
        <td className="p-2">{p.phone}</td>
        <td className="p-2">{p.allergies}</td>
        <td className="p-2">{p.notes}</td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
}
