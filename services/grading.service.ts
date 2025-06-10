import { prisma } from "@/lib/prisma";
import { StudentListSchema } from "@/model/student.schema";
import { DomainListSchema } from "@/model/domain.schema";

/**
 * Fetch all students, validate, and transform into display format.
 */
export async function fetchStudents() {
  const rawStudents = await prisma.student.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  return StudentListSchema.parse(rawStudents);
}

/**
 * Fetch all domains with nested competencies, validated.
 */
export async function fetchDomainsWithCompetencies() {
  const rawDomains = await prisma.domain.findMany({
    include: { competencies: true },
  });

  return DomainListSchema.parse(rawDomains);
}
