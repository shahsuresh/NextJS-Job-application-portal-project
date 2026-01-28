import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/use-cases/auth.queries";
import EmployerSidebarMenu from "@/components/common/EmployerSidebarMenu";
import { CurrentUserProvider } from "./_context/CurrentUserContext";
import { toPlainUser } from "@/features/server/employer.query";

export default async function EmployerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.user.role !== "employer") {
    redirect("/login");
  }

  const plainUser = {
    ...currentUser,
    user: toPlainUser(currentUser.user),
  };

  return (
    <CurrentUserProvider value={plainUser}>
      <div className='min-h-screen bg-gray-50'>
        {/* Sidebar */}
        <aside className='fixed left-0 top-0 h-screen w-64 border-r bg-white overflow-y-auto'>
          <EmployerSidebarMenu />
        </aside>

        {/* Main Content */}
        <main className='ml-64 min-h-screen p-1'>
          <div className=' bg-white p-4 shadow-sm'>{children}</div>
        </main>
      </div>
    </CurrentUserProvider>
  );
}
