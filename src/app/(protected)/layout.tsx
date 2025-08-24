import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Topbar from "@/components/Topbar";
import Container from "@/components/Container";
import "@/styles/globals.css";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session) redirect("/signin");
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-slate-50 text-slate-900">
        <Topbar user={session.user as any} />
        <Container>{children}</Container>
      </body>
    </html>
  );
}
