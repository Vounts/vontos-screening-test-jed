"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UpdateAssessmentSchema } from "@/model/assessment.schema";
import { useState } from "react";
import { updateAssessmentScore } from "@/services/assessment.service";
import Link from "next/link";
const FormSchema = UpdateAssessmentSchema.extend({
  id: z.string().uuid(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function UpdateAssessmentPage({
  assessmentId,
  initialScore,
}: {
  assessmentId: string;
  initialScore: number;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: assessmentId,
      score: initialScore,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setSubmitting(true);
      const res = await updateAssessmentScore({
        id: assessmentId,
        score: data.score,
      });

      alert("Assessment updated successfully!");
      router.refresh();
      router.push(`/en/students/${res?.data?.studentId}/assessments`);
    } catch (e) {
      alert("Error: " + (e as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Link href={`/en/grading`} className="text-blue-600 hover:underline">
        home
      </Link>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm mx-auto p-6 border rounded shadow"
      >
        <input type="hidden" {...register("id")} />
        <h1 className="text-xl font-semibold mb-4">Update Score</h1>
        <div className="mb-4">
          <label className="block mb-1">Score</label>
          <input
            type="number"
            {...register("score", { valueAsNumber: true })}
            className="w-full p-2 border rounded"
          />
          {errors.score && (
            <p className="text-red-500 text-sm mt-1">{errors.score.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "Saving..." : "Update Score"}
        </button>
      </form>
    </>
  );
}
