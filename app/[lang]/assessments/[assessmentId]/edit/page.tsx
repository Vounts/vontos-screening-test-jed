import UpdateAssessmentPage from "@/components/UpdateAssessment";
import { getAssessmentScoreById } from "@/services/assessment.service";
import { notFound } from "next/navigation";

export default async function EditAssessmentPage({
  params,
}: {
  params: Promise<{ assessmentId: string }>;
}) {
  const { assessmentId } = await params;

  const score = await getAssessmentScoreById(assessmentId);

  if (!score) return notFound();

  return (
    <UpdateAssessmentPage assessmentId={assessmentId} initialScore={score} />
  );
}
