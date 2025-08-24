import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { appointmentSchema } from "@/lib/validators";
export async function GET() {
 const data = await prisma.appointment.findMany({ include: { patient: true, doctor: true }, orderBy: { date: "desc" } });
 return NextResponse.json(data);
}
export async function POST(req: NextRequest) {
 const json = await req.json();
 const parsed = appointmentSchema.safeParse(json);
 if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
 const { date, timeFrom, timeTo, reason, patientId, doctorId } = parsed.data;
 const created = await prisma.appointment.create({
  data: {
   date: new Date(date + "T00:00:00"),
   timeFrom,
   timeTo,
   reason,
   patientId,
   doctorId,
   createdById: doctorId, // ا ًقحال ةسلجلا نم بلجا وأ
  },
 });
 return NextResponse.json(created);
}
