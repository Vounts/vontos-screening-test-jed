import { Metadata } from "next";

export const baseMetaData: Metadata = {
  title:
    "Vontos Grading Module | Empowering Educators with Smart Assessment Tools",
  description:
    "Vontos Grading Module helps educators manage and evaluate student performance through domain-based assessments. Fast, accurate, and secure.",
  keywords: [
    "grading system",
    "student assessments",
    "education technology",
    "Vontos",
    "teacher tools",
    "domain-based grading",
    "competency-based education",
    "school grading module",
  ],
  authors: [{ name: "Vounts", url: "https://vontos.io" }],
  creator: "Vounts",
  publisher: "Vounts",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Vontos Grading Module",
    description:
      "Efficiently assess and manage student grades using the Vontos Grading Module.",
    url: "https://vontos.io/grading",
    siteName: "Vontos",
    images: [
      {
        url: "https://vontos.io/images/og-grading.png",
        width: 1200,
        height: 630,
        alt: "Vontos Grading Module",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vontos Grading Module",
    description:
      "Smart, scalable grading system for educators and academic institutions.",
    images: ["https://vontos.io/images/og-grading.png"],
    creator: "@vontosapp",
  },
  metadataBase: new URL("https://vontos.io"),
};
