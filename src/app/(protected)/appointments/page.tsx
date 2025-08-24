import { prisma } from "@/lib/prisma";
import NewAppointment from "@/components/NewAppointment";
export default async function AppointmentsPage() {
 const appts = await prisma.appointment.findMany({
  orderBy: { date: "desc" },
  include: { patient: true, doctor: true },
 });
 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <h1 className="text-2xl font-bold">ديعاوملا</h1>
    <NewAppointment />
   </div>
   <div className="bg-white rounded-2xl p-4 shadow border overflow-x-auto">
    <table className="w-full text-sm">
     <thead className="text-left text-slate-500">
      <tr>
       <th className="p-2">خيراتلا</th>
       <th className="p-2">تقولا</th>
       <th className="p-2">ضيرملا</th>
       <th className="p-2">بيبطلا</th>
       <th className="p-2">ةلاحلا</th>
      </tr>
     </thead>
     <tbody>
      {appts.map(a => (
       <tr key={a.id} className="border-t">
        <td className="p-2">{new Date(a.date).toLocaleDateString()}</td>
        <td className="p-2">{a.timeFrom}–{a.timeTo}</td>
        <td className="p-2">{a.patient.name}</td>
        <td className="p-2">{a.doctor.name}</td>
        <td className="p-2">{a.status}</td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
}
