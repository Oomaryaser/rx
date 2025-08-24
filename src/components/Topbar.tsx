"use client";
import { signOut } from "next-auth/react";
export default function Topbar({ user }: { user: any }) {
 return (
  <div className="bg-white border-b sticky top-0 z-10">
   <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
    <nav className="flex gap-4 text-sm">
     <a className="hover:underline" href="/dashboard">ةحول مكحتلا</a>
     <a className="hover:underline" href="/patients">ىضرملا</a>
     <a className="hover:underline" href="/appointments">ديعاوملا</a>
     <a className="hover:underline" href="/prescriptions">تافصولا</a>
    </nav>
    <div className="flex items-center gap-3 text-sm">
     <span className="text-slate-500">ا ً بحرم، {user?.name} ({(user as any)?.role === 'DOCTOR' ? 'بيبط' : 'ريتركس'})</span>
     <button onClick={()=>signOut()} className="px-3 py-1 rounded-lg border">جورخ</button>
    </div>
   </div>
  </div>
 );
}
