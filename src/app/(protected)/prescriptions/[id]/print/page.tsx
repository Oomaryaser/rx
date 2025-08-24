import { prisma } from "@/lib/prisma";
import "@/styles/globals.css";
export default async function PrintPage({ params }: { params: { id: string } }) {
 const id = Number(params.id);
 const p = await prisma.prescription.findUnique({
  where: { id },
  include: { patient: true, doctor: true, medications: true },
 });
 if (!p) return <div className="p-10">ةفصولا ريغ ةدوجوم</div>;
 return (
  <html lang="ar" dir="rtl">
   <body className="p-8">
    <div className="max-w-3xl mx-auto border p-6 rounded-xl print:shadow-none">
     <header className="flex items-center justify-between">
      <div>
       <h1 className="text-xl font-bold">ةدايع RxCare</h1>
       <div className="text-sm text-slate-500">فتاه: 07700000000</div>
      </div>
      <div className="text-right">
       <div className="font-bold">د.{p.doctor.name}</div>
       <div className="text-sm">خيرات: {new Date(p.createdAt).toLocaleDateString()}</div>
       <div className="text-sm">مقر ةفصولا: {p.id}</div>
      </div>
     </header>
     <hr className="my-4" />
     <section className="text-sm">
      <div><span className="font-bold">ضيرملا:</span> {p.patient.name}</div>
      <div><span className="font-bold">صيخشتلا:</span> {p.diagnosis}</div>
      {p.notes && <div><span className="font-bold">تاظحلام:</span> {p.notes}</div>}
     </section>
     <h2 className="font-bold mt-4 mb-2">ةيودألا:</h2>
     <table className="w-full text-sm border">
      <thead>
       <tr className="bg-slate-100">
        <th className="p-2 text-right">ءاودلا</th>
        <th className="p-2 text-right">ةعرجلا</th>
        <th className="p-2 text-right">راركتلا</th>
        <th className="p-2 text-right">ةدملا</th>
        <th className="p-2 text-right">تاميلعت</th>
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
     <footer className="mt-6 text-xs text-slate-500">* هذه ةفصولا ةحلاص مادختسلال ةرم ةدحاو.</footer>
    </div>
    <script dangerouslySetInnerHTML={{ __html: 'window.print()' }} />
   </body>
  </html>
 );
}
