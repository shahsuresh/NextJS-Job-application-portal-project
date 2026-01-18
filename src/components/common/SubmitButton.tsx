import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  buttonText: string;
  loadingText?: string;
  isLoading?: boolean;
  className?: string;
}

const SubmitButton = ({
  buttonText,
  loadingText = "Submitting...",
  isLoading = false,
  className,
}: SubmitButtonProps) => {
  return (
    <Button
      type='submit'
      disabled={isLoading}
      aria-busy={isLoading}
      className={cn(
        "w-full h-12 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200",
        className
      )}
    >
      {isLoading ? (
        <span className='flex items-center gap-2'>
          <Loader2 className='h-5 w-5 animate-spin' />
          {loadingText}
        </span>
      ) : (
        buttonText
      )}
    </Button>
  );
};

export default SubmitButton;
