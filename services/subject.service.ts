import { prisma } from "@/lib/prisma";
import { SubjectArraySchema } from "@/model/subject.schema";

/**
 * Fetch all subjects from the database and validate using Zod.
 */
export async function fetchAllSubjects() {
  const rawSubjects = await prisma.subject.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return SubjectArraySchema.parse(rawSubjects);
}
