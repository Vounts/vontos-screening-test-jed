import { z } from "zod";

export const CompetencySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export const DomainSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  competencies: z.array(CompetencySchema),
});

export const DomainListSchema = z.array(DomainSchema);
