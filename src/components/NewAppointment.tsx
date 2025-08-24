"use client";
import { useEffect, useState } from "react";
export default function NewAppointment() {
 const [open, setOpen] = useState(false);
 const [patients, setPatients] = useState<any[]>([]);
 const [doctors, setDoctors] = useState<any[]>([]);
 const [form, setForm] = useState({ date: "", timeFrom: "", timeTo: "", reason: "", patientId: "", doctorId: "" });
 useEffect(() => {
  (async () => {
   const ps = await fetch("/api/patients").then(r=>r.json());
   const ds = await fetch("/api/users?role=DOCTOR").then(r=>r.json());
   setPatients(ps);
   setDoctors(ds);
  })();
 }, []);
 const submit = async () => {
  const res = await fetch("/api/appointments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
  if (res.ok) window.location.reload();
 };
 return (
  <div>
   <button onClick={()=>setOpen(true)} className="rounded-xl px-4 py-2 bg-indigo-600 text-white">+ حجز موعد</button>
   {open && (
    <div className="fixed inset-0 bg-black/20 grid place-items-center p-4">
     <div className="w-full max-w-lg bg-white rounded-2xl p-6 space-y-3">
      <h3 className="text-lg font-bold">موعد جديد</h3>
      <label className="block">
       <span className="text-sm">التاريخ</span>
       <input type="date" className="mt-1 w-full border rounded-xl p-3" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} />
      </label>
      <div className="grid grid-cols-2 gap-3">
       <label className="block">
        <span className="text-sm">من</span>
        <input type="time" className="mt-1 w-full border rounded-xl p-3" value={form.timeFrom} onChange={e=>setForm({...form, timeFrom:e.target.value})} />
       </label>
       <label className="block">
        <span className="text-sm">إلى</span>
        <input type="time" className="mt-1 w-full border rounded-xl p-3" value={form.timeTo} onChange={e=>setForm({...form, timeTo:e.target.value})} />
       </label>
      </div>
      <label className="block">
       <span className="text-sm">المريض</span>
       <select className="mt-1 w-full border rounded-xl p-3" value={form.patientId} onChange={e=>setForm({...form, patientId:e.target.value})}>
        <option value="">اختر...</option>
        {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
       </select>
      </label>
      <label className="block">
       <span className="text-sm">الطبيب</span>
       <select className="mt-1 w-full border rounded-xl p-3" value={form.doctorId} onChange={e=>setForm({...form, doctorId:e.target.value})}>
        <option value="">اختر...</option>
        {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
       </select>
      </label>
      <label className="block">
       <span className="text-sm">سبب الزيارة</span>
       <input className="mt-1 w-full border rounded-xl p-3" value={form.reason} onChange={e=>setForm({...form, reason:e.target.value})} />
      </label>
      <div className="flex gap-2 justify-end pt-2">
       <button onClick={()=>setOpen(false)} className="px-4 py-2 rounded-xl border">إلغاء</button>
       <button onClick={submit} className="px-4 py-2 rounded-xl bg-indigo-600 text-white">حفظ</button>
      </div>
     </div>
    </div>
   )}
  </div>
 );
}
