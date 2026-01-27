"use client";
import {
  Bookmark,
  Briefcase,
  Building,
  CreditCard,
  LayoutDashboard,
  Plus,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import LogoutButton from "./LogoutButton";

const base = "/dashboard/employer";

const navigationItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: base },
  { name: "Profile", icon: User, href: base + "/profile" },
  { name: "Post a Job", icon: Plus, href: base + "/post-job" },
  { name: "My Jobs", icon: Briefcase, href: base + "/myjobs" },
  {
    name: "Saved Candidates",
    icon: Bookmark,
    href: base + "/saved-candidates",
  },
  {
    name: "Plans & Billing",
    icon: CreditCard,
    href: base + "/applications",
  },
  { name: "All Companies", icon: Building, href: base + "/mycompanies" },
  { name: "Settings", icon: Settings, href: base + "/settings" },
];

const EmployerSidebarMenu = () => {
  const pathname = usePathname();

  return (
    <div className='flex h-full flex-col'>
      {/* Logo / Header */}
      <div className='px-6 py-5 border-b'>
        <h2 className='text-lg font-semibold text-green-700 uppercase tracking-wide'>
          Employer Panel
        </h2>
      </div>

      {/* Navigation */}
      <nav className='flex-1 px-3 py-4 space-y-1'>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                isActive
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-700 hover:border-l-2",
              )}
            >
              <Icon
                size={18}
                className={clsx(isActive ? "text-green-600" : "text-gray-400")}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* logout button */}
      <div className='px-2 py-2 border-t text-xs text-gray-400'>
        <LogoutButton />
      </div>
    </div>
  );
};

export default EmployerSidebarMenu;
