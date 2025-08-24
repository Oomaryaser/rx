import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
export const authConfig = {
session: { strategy: "jwt" },
pages: { signIn: "/signin" },
providers: [
Credentials({
credentials: {
email: { label: "Email", type: "email" },
password: { label: "Password", type: "password" },
},
authorize: async (creds) => {
const email = String(creds?.email || "").toLowerCase();
const user = await prisma.user.findUnique({ where: { email } });
if (!user) return null;
const ok = await bcrypt.compare(String(creds?.password || ""),
user.passwordHash);
if (!ok) return null;
return { id: String(user.id), name: user.name, email: user.email, role:
user.role } as any;
},
}),
],
callbacks: {
async jwt({ token, user }) {
if (user) {
token.role = (user as any).role;
}
return token;
},
async session({ session, token }) {
(session.user as any).role = token.role;
return session;
},
},
} satisfies NextAuthConfig;