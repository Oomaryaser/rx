"use client";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import Link from "next/link";

type Role = "doctor" | "secretary";

export default function SignInPage() {
  const [countryCode, setCountryCode] = useState("+964");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<"ar" | "en">("ar");

  const t = {
    ar: {
      title: "تسجيل الدخول",
      phone: "رقم الهاتف",
      password: "كلمة المرور",
      doctorLogin: "تسجيل الدخول",
      secretaryLogin: "تسجيل الدخول لسكرتير",
      signup: "ليس لديك حساب؟ انشئ حساب",
    },
    en: {
      title: "Sign in",
      phone: "Phone number",
      password: "Password",
      doctorLogin: "Sign in",
      secretaryLogin: "Secretary sign in",
      signup: "No account? Sign up",
    },
  } as const;
  const text = t[lang];

  async function handleLogin(role: Role, e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", {
      phone: `${countryCode}${phone}`,
      password,
      role,
      redirect: true,
      callbackUrl: role === "doctor" ? "/dashboard" : "/dashboard",
    });
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-100 p-4">
      <form
        onSubmit={(e) => handleLogin("doctor", e)}
        className="w-full max-w-md bg-white rounded-2xl p-6 shadow"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold text-lg">RX</div>
          <div className="text-xs text-slate-500">
            {new Date().toLocaleString(lang === "ar" ? "ar-IQ" : "en-US")}
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-6">{text.title}</h1>
        <label className="block mb-3">
          <span className="text-sm">{text.phone}</span>
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
        <label className="block mb-4">
          <span className="text-sm">{text.password}</span>
          <input
            className="mt-1 w-full border rounded-xl p-3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          disabled={loading}
          className="w-full rounded-xl p-3 bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {text.doctorLogin}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={(e) => handleLogin("secretary", e as any)}
          className="w-full rounded-xl p-3 mt-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 disabled:opacity-60"
        >
          {text.secretaryLogin}
        </button>
        <Link
          href="/signup"
          className="block text-sm text-center text-indigo-600 hover:underline mt-4"
        >
          {text.signup}
        </Link>
        <div className="flex justify-center gap-4 mt-6 text-xs">
          <button
            type="button"
            onClick={() => setLang("ar")}
            className={lang === "ar" ? "font-bold" : ""}
          >
            العربية
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={lang === "en" ? "font-bold" : ""}
          >
            English
          </button>
        </div>
      </form>
    </div>
  );
}
