import { z } from "zod";

export const StudentIdParamSchema = z.object({
  studentId: z.string().uuid(),
});

export const StudentSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email().nullable().optional(),
});

export const StudentListSchema = z.array(StudentSchema);
