"use client";

import { Button } from "../ui/button";
import { Loader2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import ConfirmLogoutModal from "./ConfirmLogoutModal";
import { logoutAction } from "@/app/login/logout.action";

interface LogoutButtonProps {
  buttonText?: string;
  loadingText?: string;
  isLoading?: boolean;
  className?: string;
}

const LogoutButton = ({
  buttonText = "Logout",
  loadingText = "Logging out...",
  isLoading = false,
  className,
}: LogoutButtonProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <Button
        type='submit'
        disabled={isLoading}
        aria-busy={isLoading}
        className={cn(
          "w-full h-12 bg-linear-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer ",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        {isLoading ? (
          <span className='flex items-center gap-2'>
            <Loader2 className='h-4 w-4 animate-spin' />
            {loadingText}
          </span>
        ) : (
          <span className='flex items-center gap-2'>
            {buttonText} <LogOut size={18} />
          </span>
        )}
      </Button>
      <ConfirmLogoutModal
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={logoutAction}
        isLoading={isLoading}
      />
    </>
  );
};

export default LogoutButton;
