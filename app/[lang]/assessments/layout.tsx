import Layout from "@/components/Layout";
import React, { ReactNode } from "react";

export default function AssessmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
