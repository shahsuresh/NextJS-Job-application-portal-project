import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/use-cases/auth.queries";
import EmployerSidebarMenu from "@/components/common/EmployerSidebarMenu";

export default async function EmployerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.user.role !== "employer") {
    redirect("/login");
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <aside className='w-64 border-r bg-white   '>
        <EmployerSidebarMenu />
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-3'>
        <div className='rounded-xl bg-white p-6 shadow-sm'>{children}</div>
      </main>
    </div>
  );
}
