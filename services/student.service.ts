import { prisma } from "@/lib/prisma";

export async function fetchStudentWithAssessments(studentId: string) {
  return prisma.student.findUnique({
    where: { id: studentId },
    select: {
      firstName: true,
      lastName: true,
      assessments: {
        include: {
          competency: {
            include: { domain: true },
          },
          subject: true,
        },
      },
    },
  });
}
