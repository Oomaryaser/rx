import { prisma } from "@/lib/prisma";
import "@/styles/globals.css";
export default async function PrintPage({ params }: { params: { id: string } }) {
 const id = Number(params.id);
 const p = await prisma.prescription.findUnique({
  where: { id },
  include: { patient: true, doctor: true, medications: true },
 });
 if (!p) return <div className="p-10">الوصفة غير موجودة</div>;
 return (
  <html lang="ar" dir="rtl">
   <body className="p-8">
    <div className="max-w-3xl mx-auto border p-6 rounded-xl print:shadow-none">
     <header className="flex items-center justify-between">
      <div>
       <h1 className="text-xl font-bold">عيادة RxCare</h1>
       <div className="text-sm text-slate-500">هاتف: 07700000000</div>
      </div>
      <div className="text-right">
       <div className="font-bold">د.{p.doctor.name}</div>
       <div className="text-sm">التاريخ: {new Date(p.createdAt).toLocaleDateString()}</div>
       <div className="text-sm">رقم الوصفة: {p.id}</div>
      </div>
     </header>
     <hr className="my-4" />
     <section className="text-sm">
      <div><span className="font-bold">المريض:</span> {p.patient.name}</div>
      <div><span className="font-bold">التشخيص:</span> {p.diagnosis}</div>
      {p.notes && <div><span className="font-bold">ملاحظات:</span> {p.notes}</div>}
     </section>
     <h2 className="font-bold mt-4 mb-2">الأدوية:</h2>
     <table className="w-full text-sm border">
      <thead>
        <tr className="bg-slate-100">
         <th className="p-2 text-right">الدواء</th>
         <th className="p-2 text-right">الجرعة</th>
         <th className="p-2 text-right">التكرار</th>
         <th className="p-2 text-right">المدة</th>
         <th className="p-2 text-right">تعليمات</th>
        </tr>
      </thead>
      <tbody>
       {p.medications.map(m => (
        <tr key={m.id} className="border-t">
         <td className="p-2">{m.name}</td>
         <td className="p-2">{m.dosage}</td>
         <td className="p-2">{m.frequency}</td>
         <td className="p-2">{m.duration}</td>
         <td className="p-2">{m.instructions}</td>
        </tr>
       ))}
      </tbody>
     </table>
     <footer className="mt-6 text-xs text-slate-500">* هذه الوصفة صالحة للاستخدام مرة واحدة.</footer>
    </div>
    <script dangerouslySetInnerHTML={{ __html: 'window.print()' }} />
   </body>
  </html>
 );
}
