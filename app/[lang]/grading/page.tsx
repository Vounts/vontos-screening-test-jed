import Link from "next/link";
import { fetchAllSubjects } from "@/services/subject.service";
import { createAppError } from "@/lib/error";
import { getI18n } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function GradingSubjectSelector({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const t = await getI18n(lang);

  try {
    const subjects = await fetchAllSubjects();

    return (
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-xl font-semibold mb-4">
          {t("grading.select_subject")}
        </h1>
        <ul className="space-y-3">
          {subjects.map((s) => (
            <li key={s.id}>
              <Link
                href={`/${lang}/grading/${s.id}`}
                className="block p-3 border rounded hover:bg-gray-100"
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("[GradingSubjectSelector] Failed to load subjects:", error);
    throw createAppError("Failed to load subjects", 500);
  }
}
