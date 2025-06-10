import { createAppError } from "@/lib/error";
import { prisma } from "@/lib/prisma";
import { UpdateAssessmentSchema } from "@/model/assessment.schema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { StudentIdParamSchema } from "@/model/student.schema";
import { revalidatePath } from "next/cache";

/**
 * @route PATCH /api/assessments/:id
 * @description Update the score of an existing assessment.
 *
 * @routeParam id string — The ID of the assessment to update.
 *
 * @requestBody {
 *   score: number
 * }
 *
 * @returns {
 *   success: boolean,
 *   data?: Assessment,
 *   error?: string
 * }
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ assessmentParam: string }> }
) {
  try {
    const body = await req.json();
    const parsed = UpdateAssessmentSchema.parse(body);
    const awaitedParam = await params;
    const updated = await prisma.assessment.update({
      where: { id: awaitedParam.assessmentParam },
      data: {
        score: parsed.score,
        assessedAt: new Date(),
      },
    });
    revalidatePath(`/en/students/${updated.studentId}/assessments`);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      const appError = createAppError("Validation failed", 400, error.errors);
      return NextResponse.json(appError, { status: 400 });
    }

    const appError = createAppError((error as Error).message);
    return NextResponse.json(appError, { status: appError.statusCode });
  }
}

/**
 * @route GET /api/assessments/:studentId
 * @description Get all assessment scores for a specific student, including competency, domain, and subject info.
 *
 * @routeParam studentId string — The ID of the student to retrieve assessments for.
 *
 * @returns {
 *   success: boolean,
 *   data?: Array<Assessment & {
 *     competency: { name, domain: { name } },
 *     subject: { name }
 *   }>,
 *   error?: string
 * }
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ assessmentParam: string }> }
) {
  try {
    const awaitedParam = await params;
    StudentIdParamSchema.parse(params);

    const data = await prisma.assessment.findMany({
      where: { studentId: awaitedParam.assessmentParam },
      include: {
        competency: {
          include: {
            domain: true,
          },
        },
        subject: true,
      },
    });

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const appError = createAppError((error as Error).message);
    return NextResponse.json(appError, { status: appError.statusCode });
  }
}
