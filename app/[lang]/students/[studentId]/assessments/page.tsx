import { StudentIdParamSchema } from "@/model/student.schema";
import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchStudentWithAssessments } from "@/services/student.service";

export const dynamic = "force-dynamic";

export default async function StudentAssessmentPage({
  params,
}: {
  params: Promise<typeof StudentIdParamSchema>;
}) {
  const awaitedParams = await params;
  const parsed = StudentIdParamSchema.safeParse(awaitedParams);
  if (!parsed.success) return notFound();

  const studentId = parsed.data.studentId;

  const student = await fetchStudentWithAssessments(studentId);

  if (!student) return notFound();

  const groupedBySubject: Record<string, typeof student.assessments> = {};
  for (const a of student.assessments) {
    if (!groupedBySubject[a.subject.name]) {
      groupedBySubject[a.subject.name] = [];
    }
    groupedBySubject[a.subject.name].push(a);
  }

  return (
    <div className="p-6">
      <Link href={`/en/grading`} className="text-blue-600 hover:underline">
        back
      </Link>
      <h1 className="text-2xl font-bold mb-4">
        Assessments for {student.firstName} {student.lastName}
      </h1>

      {Object.entries(groupedBySubject).map(([subjectName, assessments]) => (
        <div key={subjectName} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{subjectName}</h2>
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Domain</th>
                <th className="p-2 border">Competency</th>
                <th className="p-2 border">Score</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((a) => (
                <tr key={a.id}>
                  <td className="p-2 border">{a.competency.domain.name}</td>
                  <td className="p-2 border">{a.competency.name}</td>
                  <td className="p-2 border">{a.score}</td>
                  <td className="p-2 border">
                    <Link
                      href={`/en/assessments/${a.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
