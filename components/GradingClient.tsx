"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAssessmentsSchema } from "@/model/assessment.schema";
import { StudentSchema } from "@/model/student.schema";
import { DomainListSchema } from "@/model/domain.schema";
import { z } from "zod";
import { saveAssessments } from "@/services/assessment.service";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FormSchema = CreateAssessmentsSchema;
type FormValues = z.infer<typeof FormSchema>;

export default function GradingClient({
  subjectId,
  students,
  domains,
}: {
  subjectId: string;
  students: z.infer<typeof StudentSchema>[];
  domains: z.infer<typeof DomainListSchema>;
}) {
  const methods = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      subjectId,
      assessments: [],
    },
  });

  const { watch, setValue, handleSubmit } = methods;
  const router = useRouter();

  const assessments = watch("assessments");

  const totalExpected =
    students.length *
    domains.reduce((sum, d) => sum + d.competencies.length, 0);
  const isFormComplete = assessments.length === totalExpected;

  const handleScoreChange = (
    studentId: string,
    competencyId: string,
    value: number
  ) => {
    const key = `${studentId}_${competencyId}`;
    const newAssessments = assessments.filter(
      (a) => `${a.studentId}_${a.competencyId}` !== key
    );
    newAssessments.push({ studentId, competencyId, score: value });
    setValue("assessments", newAssessments);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await saveAssessments(data);
      alert("Scores saved!");
    } catch (e) {
      alert(`Error: ${(e as Error).message}`);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <Link href={`/en/grading`} className="text-blue-600 hover:underline">
          back
        </Link>
        <h1 className="text-xl font-bold mb-4">
          Grading – Subject: {subjectId}
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Student</th>
                {domains.flatMap((domain) =>
                  domain.competencies.map((comp) => (
                    <th key={comp.id} className="p-2 border">
                      {domain.name} - {comp.name}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td
                    className="p-2 border font-medium cursor-pointer text-blue-600 hover:underline"
                    onClick={() =>
                      router.push(`/en/students/${student.id}/assessments`)
                    }
                  >
                    {student.firstName} {student.lastName}
                  </td>
                  {domains.flatMap((domain) =>
                    domain.competencies.map((comp) => {
                      const key = `${student.id}_${comp.id}`;
                      const current = assessments.find(
                        (a) =>
                          a.studentId === student.id &&
                          a.competencyId === comp.id
                      );
                      return (
                        <td key={key} className="p-2 border">
                          <input
                            type="number"
                            className="w-20 p-1 border rounded"
                            value={current?.score ?? ""}
                            onChange={(e) =>
                              handleScoreChange(
                                student.id,
                                comp.id,
                                Number(e.target.value)
                              )
                            }
                          />
                        </td>
                      );
                    })
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="submit"
          disabled={!isFormComplete}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Save Scores
        </button>
      </form>
    </FormProvider>
  );
}
