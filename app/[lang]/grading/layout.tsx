import Layout from "@/components/Layout";
import type { ReactNode } from "react";

export default function GradingLayout({ children }: { children: ReactNode }) {
  return <Layout>{children}</Layout>;
}
