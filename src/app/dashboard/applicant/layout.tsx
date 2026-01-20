import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/use-cases/auth.queries";

export default async function ApplicantDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.user.role !== "applicant") {
    redirect("/login");
  }
  return <>{children}</>;
}
