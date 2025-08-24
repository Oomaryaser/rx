import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
 await auth();
 const [patients, todayAppts, prescriptions] = await Promise.all([
  prisma.patient.count(),
  prisma.appointment.count({
   where: { date: { gte: new Date(new Date().setHours(0,0,0,0)), lt: new Date(new Date().setHours(23,59,59,999)) } },
  }),
  prisma.prescription.count(),
 ]);
 return (
  <div className="space-y-6">
   <h1 className="text-2xl font-bold">ةحول مكحتلا</h1>
   <div className="grid md:grid-cols-3 gap-4">
    <Card title="ىضرملا ددع" value={patients} />
    <Card title="مويلا ديعاوم" value={todayAppts} />
    <Card title="تافصولا" value={prescriptions} />
   </div>
  </div>
 );
}
function Card({ title, value }: { title: string; value: number }) {
 return (
  <div className="bg-white rounded-2xl p-6 shadow border">
   <div className="text-sm text-slate-500">{title}</div>
   <div className="text-3xl font-bold mt-1">{value}</div>
  </div>
 );
}
