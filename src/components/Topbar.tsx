"use client";
import { signOut } from "next-auth/react";
export default function Topbar({ user }: { user: any }) {
 return (
  <div className="bg-white border-b sticky top-0 z-10">
   <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
    <nav className="flex gap-4 text-sm">
     <a className="hover:underline" href="/dashboard">لوحة التحكم</a>
     <a className="hover:underline" href="/patients">المرضى</a>
     <a className="hover:underline" href="/appointments">المواعيد</a>
     <a className="hover:underline" href="/prescriptions">الوصفات</a>
    </nav>
    <div className="flex items-center gap-3 text-sm">
     <span className="text-slate-500">مرحبًا، {user?.name} ({(user as any)?.role === 'DOCTOR' ? 'طبيب' : 'سكرتير'})</span>
     <button onClick={()=>signOut()} className="px-3 py-1 rounded-lg border">خروج</button>
    </div>
   </div>
  </div>
 );
}
