import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
async function main() {
 const password = await bcrypt.hash("Passw0rd!", 10);
 const [doctor, secretary] = await Promise.all([
  prisma.user.upsert({
   where: { email: "dr@clinic.com" },
   update: {},
   create: {
    name: "Dr. Ahmed",
    email: "dr@clinic.com",
    passwordHash: password,
    role: "DOCTOR",
   },
  }),
  prisma.user.upsert({
   where: { email: "sec@clinic.com" },
   update: {},
   create: {
    name: "Secretary Sara",
    email: "sec@clinic.com",
    passwordHash: password,
    role: "SECRETARY",
   },
  }),
 ]);
 const patient = await prisma.patient.create({
  data: {
   name: "Ali Hassan",
   phone: "0770-000-0000",
   gender: "M",
   notes: "—",
  },
 });
 await prisma.appointment.create({
  data: {
   date: new Date(),
   timeFrom: "10:00",
   timeTo: "10:30",
   reason: "Routine Check",
   patientId: patient.id,
   doctorId: doctor.id,
   createdById: secretary.id,
  },
 });
 console.log("Seed done ✅");
}
main().finally(() => prisma.$disconnect());
