import { prisma } from "@/lib/prisma";
import PrescriptionForm from "@/components/PrescriptionForm";
export default async function PrescriptionsPage() {
 const [patients, doctors, list] = await Promise.all([
  prisma.patient.findMany({ orderBy: { name: "asc" } }),
  prisma.user.findMany({ where: { role: "DOCTOR" }, orderBy: { name: "asc" } }),
  prisma.prescription.findMany({ orderBy: { id: "desc" }, include: { patient: true, doctor: true } }),
 ]);
 return (
  <div className="space-y-6">
   <h1 className="text-2xl font-bold">تافصولا ةيبطلا</h1>
   <PrescriptionForm patients={patients} doctors={doctors} />
   <div className="bg-white rounded-2xl p-4 shadow border overflow-x-auto">
    <table className="w-full text-sm">
     <thead className="text-left text-slate-500">
      <tr>
       <th className="p-2">#</th>
       <th className="p-2">ضيرملا</th>
       <th className="p-2">بيبطلا</th>
       <th className="p-2">صيخشتلا</th>
       <th className="p-2">خيرات ءاشنإلا</th>
       <th className="p-2">ةعابط</th>
      </tr>
     </thead>
     <tbody>
      {list.map((r) => (
       <tr key={r.id} className="border-t">
        <td className="p-2">{r.id}</td>
        <td className="p-2">{r.patient.name}</td>
        <td className="p-2">{r.doctor.name}</td>
        <td className="p-2">{r.diagnosis}</td>
        <td className="p-2">{new Date(r.createdAt).toLocaleString()}</td>
        <td className="p-2">
         <a href={`/prescriptions/${r.id}/print`} className="text-indigo-600 hover:underline">ةعابط</a>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
}
