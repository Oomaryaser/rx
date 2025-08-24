"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [countryCode, setCountryCode] = useState("+964");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // submit to API here
  };

  return (
    <div className="min-h-screen grid place-items-center bg-slate-100 p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white rounded-2xl p-6 shadow"
      >
        <h1 className="text-2xl font-bold mb-6">إنشاء حساب</h1>
        <label className="block mb-3">
          <span className="text-sm">الاسم</span>
          <input
            className="mt-1 w-full border rounded-xl p-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="block mb-3">
          <span className="text-sm">رقم الهاتف</span>
          <div className="flex gap-2 mt-1">
            <select
              className="border rounded-xl p-3"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              <option value="+964">+964 🇮🇶</option>
              <option value="+1">+1 🇺🇸</option>
            </select>
            <input
              className="flex-1 border rounded-xl p-3"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </label>
        <label className="block mb-3">
          <span className="text-sm">كلمة المرور</span>
          <input
            className="mt-1 w-full border rounded-xl p-3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-sm">تأكيد كلمة المرور</span>
          <input
            className="mt-1 w-full border rounded-xl p-3"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </label>
        <button
          disabled={loading}
          className="w-full rounded-xl p-3 bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          إنشاء حساب
        </button>
        <Link
          href="/signin"
          className="block text-sm text-center text-indigo-600 hover:underline mt-4"
        >
          الرجوع لتسجيل الدخول
        </Link>
      </form>
    </div>
  );
}
