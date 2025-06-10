import { z } from "zod";

export const SubjectParamsSchema = z.object({
  subjectId: z.string().uuid(), // assuming subjectId is a UUID
});

export const SubjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export const SubjectArraySchema = z.array(SubjectSchema);
export type SubjectParams = z.infer<typeof SubjectParamsSchema>;
