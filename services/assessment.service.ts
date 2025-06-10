import { api } from "@/lib/api";
import { UpdateAssessmentSchema } from "@/model/assessment.schema";
import { prisma } from "@/lib/prisma";

type AssessmentPayload = {
  subjectId: string;
  assessments: {
    studentId: string;
    competencyId: string;
    score: number;
  }[];
};

/**
 * Save multiple assessment scores for a subject
 */
export async function saveAssessments(payload: AssessmentPayload) {
  return api("/api/assessments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateAssessmentScore(data: {
  id: string;
  score: number;
}) {
  const parsed = UpdateAssessmentSchema.safeParse({ score: data.score });
  if (!parsed.success) throw new Error("Invalid score input");

  const res = await fetch(`/api/assessments/${data.id}`, {
    method: "PATCH",
    body: JSON.stringify({ score: data.score }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error("Failed to update score: " + err.message);
  }

  return await res.json();
}

export async function getAssessmentScoreById(id: string) {
  const assessment = await prisma.assessment.findUnique({
    where: { id },
    select: { score: true },
  });

  if (!assessment) {
    throw new Error("Assessment not found");
  }

  return assessment.score;
}
