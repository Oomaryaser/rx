"use client";
import { useState } from "react";
export default function NewPatient() {
 const [open, setOpen] = useState(false);
 const [form, setForm] = useState({ name: "", phone: "", allergies: "", notes: "" });
 const submit = async () => {
 const res = await fetch("/api/patients", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
 if (res.ok) window.location.reload();
 };
 return (
 <div>
 <button onClick={()=>setOpen(true)} className="rounded-xl px-4 py-2 bg-indigo-600 text-white">+ إضافة مريض</button>
 {open && (
 <div className="fixed inset-0 bg-black/20 grid place-items-center p-4">
 <div className="w-full max-w-md bg-white rounded-2xl p-6">
 <h3 className="text-lg font-bold mb-4">مريض جديد</h3>
 {(["name","phone","allergies","notes"] as const).map(key => (
 <label key={key} className="block mb-3">
 <span className="text-sm">{key === "name" ? "الاسم" : key === "phone" ? "الهاتف" : key === "allergies" ? "الحساسية" : "ملاحظات"}</span>
 <input value={(form as any)[key]} onChange={e=>setForm({...form,[key]:e.target.value})} className="mt-1 w-full border rounded-xl p-3" />
 </label>
 ))}
 <div className="flex gap-2 justify-end">
 <button onClick={()=>setOpen(false)} className="px-4 py-2 rounded-xl border">إلغاء</button>
 <button onClick={submit} className="px-4 py-2 rounded-xl bg-indigo-600 text-white">حفظ</button>
 </div>
 </div>
 </div>
 )}
 </div>
 );
}
