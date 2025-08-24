import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { prescriptionSchema } from "@/lib/validators";
export async function GET() {
 const data = await prisma.prescription.findMany({ include: { patient: true, doctor: true, medications: true }, orderBy: { id: "desc" } });
 return NextResponse.json(data);
}
export async function POST(req: NextRequest) {
 const json = await req.json();
 const parsed = prescriptionSchema.safeParse(json);
 if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
 const { patientId, doctorId, diagnosis, notes, medications } = parsed.data;
 const created = await prisma.prescription.create({
  data: {
   patientId,
   doctorId,
   diagnosis,
   notes,
   medications: { create: medications },
  },
 });
 return NextResponse.json(created);
}
