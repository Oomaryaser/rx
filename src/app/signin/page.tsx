"use client";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
export default function SignInPage() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [loading, setLoading] = useState(false);
 const onSubmit = async (e: FormEvent) => {
 e.preventDefault(); setLoading(true);
 const res = await signIn("credentials", { email, password, redirect: true, callbackUrl: "/dashboard" });
 };
 return (
 <div className="min-h-screen grid place-items-center bg-slate-100 p-4">
 <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-2xl p-6 shadow">
 <h1 className="text-2xl font-bold mb-2">تسجيل الدخول</h1>
 <p className="text-sm text-slate-500 mb-6">أدخل البريد الإلكتروني وكلمة المرور.</p>
 <label className="block mb-3">
 <span className="text-sm">البريد الإلكتروني</span>
 <input className="mt-1 w-full border rounded-xl p-3" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
 </label>
 <label className="block mb-4">
 <span className="text-sm">كلمة المرور</span>
 <input className="mt-1 w-full border rounded-xl p-3" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
 </label>
 <button disabled={loading} className="w-full rounded-xl p-3 bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60">تسجيل الدخول</button>
 <div className="text-xs text-slate-500 mt-4">حسابات للتجربة: dr@clinic.com / sec@clinic.com — كلمة المرور: Passw0rd!</div>
 </form>
 </div>
 );
}
