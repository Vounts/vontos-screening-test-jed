// zod/assessment.schema.ts
import { z } from "zod";

export const AssessmentItemSchema = z.object({
  studentId: z.string().uuid(),
  competencyId: z.string().uuid(),
  score: z.number().min(0).max(100),
});

export const CreateAssessmentsSchema = z.object({
  subjectId: z.string().uuid(),
  assessments: z.array(AssessmentItemSchema),
});

export const UpdateAssessmentSchema = z.object({
  score: z.number().min(0).max(100),
});
