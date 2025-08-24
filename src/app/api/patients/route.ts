import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { patientSchema } from "@/lib/validators";
export async function GET() {
 const data = await prisma.patient.findMany({ orderBy: { id: "desc" } });
 return NextResponse.json(data);
}
export async function POST(req: NextRequest) {
 const json = await req.json();
 const parsed = patientSchema.safeParse(json);
 if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
 const created = await prisma.patient.create({ data: parsed.data });
 return NextResponse.json(created);
}
