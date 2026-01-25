"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmLogoutModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function ConfirmLogoutModal({
  open,
  onCancel,
  onConfirm,
  isLoading,
}: ConfirmLogoutModalProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>
          <AlertDialogDescription className='font-medium'>
            Are you sure you want to log out?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className='bg-red-600 hover:bg-red-700'
          >
            {isLoading ? "Logging out..." : "Logout"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
