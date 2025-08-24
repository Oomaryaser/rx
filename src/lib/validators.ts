import { z } from "zod";
export const patientSchema = z.object({
 name: z.string().min(2),
 phone: z.string().optional(),
 gender: z.string().optional(),
 dob: z.string().optional(),
 allergies: z.string().optional(),
 notes: z.string().optional(),
});
export const appointmentSchema = z.object({
 date: z.string(), // YYYY-MM-DD
 timeFrom: z.string(),
 timeTo: z.string(),
 reason: z.string().optional(),
 patientId: z.coerce.number(),
 doctorId: z.coerce.number(),
});
export const prescriptionSchema = z.object({
 patientId: z.coerce.number(),
 doctorId: z.coerce.number(),
 diagnosis: z.string().min(2),
 notes: z.string().optional(),
 medications: z.array(
  z.object({
   name: z.string().min(1),
   dosage: z.string().min(1),
   frequency: z.string().min(1),
   duration: z.string().min(1),
   instructions: z.string().optional(),
  })
 ).min(1),
});
