import GradingClient from "@/components/GradingClient";
import { notFound } from "next/navigation";
import { SubjectParamsSchema } from "@/model/subject.schema";
import {
  fetchStudents,
  fetchDomainsWithCompetencies,
} from "@/services/grading.service";

export const dynamic = "force-dynamic";

export default async function GradingPage({
  params,
}: {
  params: Promise<{ lang: string; subjectId: string }>;
}) {
  const awaitedParams = await params;

  const parsed = SubjectParamsSchema.safeParse({
    subjectId: awaitedParams.subjectId,
  });
  if (!parsed.success) return notFound();

  const subjectId = parsed.data.subjectId;

  const [students, domains] = await Promise.all([
    fetchStudents(),
    fetchDomainsWithCompetencies(),
  ]);

  return (
    <GradingClient
      subjectId={subjectId}
      students={students}
      domains={domains}
    />
  );
}
