import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(req: NextRequest) {
 const { searchParams } = new URL(req.url);
 const role = searchParams.get("role");
 const data = await prisma.user.findMany({ where: role ? { role: role as any } : {}, orderBy: { name: "asc" } });
 return NextResponse.json(data.map(u=>({ id: u.id, name: u.name, role: u.role })));
}
