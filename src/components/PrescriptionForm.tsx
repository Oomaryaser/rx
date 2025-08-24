"use client";
import { useState } from "react";
export default function PrescriptionForm({ patients, doctors }: { patients: any[]; doctors: any[]; }) {
 const [form, setForm] = useState({ patientId: "", doctorId: "", diagnosis: "", notes: "" });
 const [meds, setMeds] = useState([{ name: "", dosage: "", frequency: "", duration: "", instructions: "" }]);
 const addMed = () => setMeds([...meds, { name: "", dosage: "", frequency: "", duration: "", instructions: "" }]);
 const removeMed = (idx:number) => setMeds(meds.filter((_,i)=>i!==idx));
 const submit = async () => {
 const payload = {
  ...form,
  patientId: Number(form.patientId),
  doctorId: Number(form.doctorId),
  medications: meds.filter(m=>m.name && m.dosage && m.frequency && m.duration),
 };
 const res = await fetch("/api/prescriptions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
 if (res.ok) window.location.reload();
 };
 return (
 <div className="bg-white rounded-2xl p-4 shadow border">
  <div className="grid md:grid-cols-4 gap-4">
   <label className="block">
    <span className="text-sm">ضيرملا</span>
    <select className="mt-1 w-full border rounded-xl p-3"
     value={form.patientId} onChange={e=>setForm({...form, patientId:e.target.value})}>
     <option value="">رتخا...</option>
     {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
    </select>
   </label>
   <label className="block">
    <span className="text-sm">بيبطلا</span>
    <select className="mt-1 w-full border rounded-xl p-3" value={form.doctorId} onChange={e=>setForm({...form, doctorId:e.target.value})}>
     <option value="">رتخا...</option>
     {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
    </select>
   </label>
   <label className="block md:col-span-2">
    <span className="text-sm">صيخشتلا</span>
    <input className="mt-1 w-full border rounded-xl p-3" value={form.diagnosis} onChange={e=>setForm({...form, diagnosis:e.target.value})} />
   </label>
  </div>
  <label className="block mt-4">
   <span className="text-sm">تاظحلام</span>
   <textarea className="mt-1 w-full border rounded-xl p-3" rows={3} value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />
  </label>
  <div className="mt-6">
   <div className="flex items-center justify-between mb-2">
    <h3 className="font-bold">ةيودألا</h3>
    <button onClick={addMed} className="px-3 py-1 rounded-lg border">+ ةفاضإ</button>
   </div>
   <div className="space-y-3">
    {meds.map((m, idx) => (
     <div key={idx} className="grid md:grid-cols-5 gap-3">
      <input placeholder="ءاودلا مسا" className="border rounded-xl p-3" value={m.name} onChange={e=>setMeds(update(meds, idx, { ...m, name:e.target.value}))} />
      <input placeholder="ةعرجلا" className="border rounded-xl p-3" value={m.dosage} onChange={e=>setMeds(update(meds, idx, { ...m, dosage:e.target.value}))} />
      <input placeholder="راركتلا" className="border rounded-xl p-3" value={m.frequency} onChange={e=>setMeds(update(meds, idx, { ...m, frequency:e.target.value}))} />
      <input placeholder="ةدملا" className="border rounded-xl p-3" value={m.duration} onChange={e=>setMeds(update(meds, idx, { ...m, duration:e.target.value}))} />
      <div className="flex gap-2">
       <input placeholder="تاميلعت" className="border rounded-xl p-3 flex-1" value={m.instructions} onChange={e=>setMeds(update(meds, idx, { ...m, instructions:e.target.value}))} />
       <button onClick={()=>removeMed(idx)} className="px-3 py-1 rounded-xl border">فذح</button>
      </div>
     </div>
    ))}
   </div>
  </div>
  <div className="flex justify-end mt-6">
   <button onClick={submit} className="px-4 py-2 rounded-xl bg-indigo-600 text-white">ظفح ةفصولا</button>
  </div>
 </div>
 );
}
function update<T>(arr:T[], index:number, item:T) { const copy = arr.slice(); copy[index] = item; return copy; }
