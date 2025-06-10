import Layout from "@/components/Layout";
import type { ReactNode } from "react";

export default function StudentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
