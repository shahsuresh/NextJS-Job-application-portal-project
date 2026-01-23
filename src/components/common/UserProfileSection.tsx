import { getCurrentUser } from "@/features/use-cases/auth.queries";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { LucideLogOut, PowerOffIcon } from "lucide-react";
import { logoutAction } from "@/app/login/logout.action";

const UserProfileSection = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/login");
  console.log("CURRENT-USER", currentUser);
  return (
    <div className='mt-0.5'>
      <div className='flex items-center justify-between p-2 border-2 border-amber-600 rounded-xl'>
        <h1>Dashboard Page</h1>
        <h2>Welcome {currentUser?.user?.fullName}</h2>
        <span>
          <Button onClick={logoutAction}>
            <LucideLogOut />
          </Button>
        </span>
      </div>
      <div className='p-4 h-1/4 bg-amber-100 border-2 shadow-2xl'>
        <h1>Name:{currentUser?.user?.fullName}</h1>
        <h1>Username:{currentUser?.user?.userId}</h1>
        <h1>Email:{currentUser?.user?.email}</h1>
        <h1>Role:{currentUser?.user?.role}</h1>
        <h2 className='h-8 bg-amber-200'>Other Details</h2>
        <h1>IP Address: {currentUser?.session?.ipAddress}</h1>
        <h1>Logged in Via: {currentUser?.session?.userAgent}</h1>
      </div>
    </div>
  );
};

export default UserProfileSection;
