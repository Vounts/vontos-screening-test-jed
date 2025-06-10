import { createAppError } from "@/lib/error";
import { prisma } from "@/lib/prisma";
import { CreateAssessmentsSchema } from "@/model/assessment.schema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
/**
 * @route POST /api/assessments
 * @description Create or update multiple assessment scores for multiple students in a subject.
 *
 * @requestBody {
 *   subjectId: string,
 *   assessments: Array<{
 *     studentId: string,
 *     competencyId: string,
 *     score: number
 *   }>
 * }
 *
 * @returns {
 *   success: boolean,
 *   data?: Assessment[],
 *   error?: string
 * }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = CreateAssessmentsSchema.parse(body);

    const created = await prisma.$transaction(
      parsed.assessments.map((a) =>
        prisma.assessment.upsert({
          where: {
            studentId_competencyId_subjectId: {
              studentId: a.studentId,
              competencyId: a.competencyId,
              subjectId: parsed.subjectId,
            },
          },
          update: { score: a.score, assessedAt: new Date() },
          create: {
            studentId: a.studentId,
            competencyId: a.competencyId,
            subjectId: parsed.subjectId,
            score: a.score,
          },
        })
      )
    );

    return NextResponse.json({ success: true, data: created });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      const appError = createAppError("Validation failed", 400, error.errors);
      return NextResponse.json(appError, { status: 400 });
    }

    const appError = createAppError((error as Error).message);
    return NextResponse.json(appError, { status: appError.statusCode });
  }
}
