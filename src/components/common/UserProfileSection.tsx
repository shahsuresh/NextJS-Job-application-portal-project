import { getCurrentUser } from "@/features/use-cases/auth.queries";
import {
  HomeIcon,
  IdCardLanyard,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { getCurrentEmployerDetails } from "@/features/server/employer.query";

const cardItems = [
  {
    label: "Open Jobs",
    icon: IdCardLanyard,
    bgColor: "bg-amber-100",
    value: 15,
  },
  {
    label: "Saved Candidates",
    icon: UserRoundCheck,
    bgColor: "bg-green-100",
    value: 150,
  },
  { label: "Companies", icon: HomeIcon, bgColor: "bg-violet-100", value: 4 },
];
const UserProfileSection = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/login");
  console.log("CURRENT-USER", currentUser);

  const { role } = currentUser.user;

  if (role === "applicant") {
    return (
      <div className='mt-1'>
        <div className='flex items-center justify-between border-b-2 border-amber-600 mx-1 '>
          <h1>Applicant Dashboard</h1>
          <h2 className='uppercase'>Welcome, {currentUser?.user?.fullName}</h2>
        </div>
      </div>
    );
  }

  const { data } = await getCurrentEmployerDetails();

  console.log("EMP_DATA", data);

  const isProfileCompleted =
    data.companyName &&
    data.description &&
    data.website &&
    data.location &&
    data.organization_type &&
    data.team_size &&
    data.year_of_establishment &&
    data.avatar_url;

  return (
    <div className='mt-0.5'>
      <div className='flex items-center justify-between border-b-2 border-amber-600 '>
        <h1>Dashboard</h1>
        <h2 className='uppercase'>Welcome, {currentUser?.user?.fullName}</h2>
      </div>
      {/* <div className='p-4 h-1/4 bg-amber-100 border-2 shadow-2xl'>
        <h1>Name:{currentUser?.user?.fullName}</h1>
        <h1>Username:{currentUser?.user?.userId}</h1>
        <h1>Email:{currentUser?.user?.email}</h1>
        <h1>Role:{currentUser?.user?.role}</h1>
        <h2 className='h-8 bg-amber-200'>Other Details</h2>
        <h1>IP Address: {currentUser?.session?.ipAddress}</h1>
        <h1>Logged in Via: {currentUser?.session?.userAgent}</h1>
      </div> */}
      <div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
          {cardItems.map((item) => (
            <Card key={item.label} className={`${item.bgColor} `}>
              <CardHeader>
                <CardTitle className='flex gap-2 items-center'>
                  <item.icon className='w-6 h-6 text-amber-700' />
                  {item.label}
                </CardTitle>
              </CardHeader>
              <CardContent className='text-right font-semibold text-xl'>
                {item.value}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {!isProfileCompleted ? (
        <div className=' flex items-center justify-between mt-6 px-4 py-2 bg-red-500 border border-red-600 rounded-lg text-amber-50'>
          <div>
            <div className='flex gap-2 '>
              <UserRoundX />
              <span className='font-semibold'>Incomplete Profile</span>
            </div>
            <h2 className='text-sm'>
              You have not completed your profile yet. Please complete your
              profile to access all features.
            </h2>
          </div>
          <Link href='/dashboard/employer/settings'>
            <Button variant='destructive'>Complete Profile</Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default UserProfileSection;
