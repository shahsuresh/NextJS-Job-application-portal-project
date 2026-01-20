"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, User, UserCheck2, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { ChangeEvent, useActionState, useEffect, useState } from "react";
import registerFormAction, { RegisterState } from "./registerForm.action";
import { useFormStatus } from "react-dom";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import SubmitButton from "@/components/common/SubmitButton";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserValidationSchema } from "@/features/auth/validationSchemas";
import { FieldError } from "@/components/common/ErrorMessage";

export interface RegistrationFormData {
  _id?: string;
  fullName: string;
  userId: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "applicant" | "employer" | "admin";
}

const RegistrationPage: React.FC = () => {
  const initialState: RegisterState = {
    success: false,
    message: "",
  };
  // const [state, formAction, isPending] = useActionState(
  //   registerFormAction,
  //   initialState
  // );
  //! react-hook-form setup to handle form

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerUserValidationSchema),
  });

  //# onSubmit function to call server Action
  const router = useRouter();

  const onSubmit = async (data: RegistrationFormData) => {
    const result = await registerFormAction(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    if (data.role === "applicant") {
      router.push("/dashboard/applicant");
    } else if (data.role === "employer") {
      router.push("/dashboard/employer");
    } else {
      router.push("/login");
    }
  };

  // console.log(watch("fullName"));

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // useEffect(() => {
  //   if (!state.message) return;

  //   if (state.success) {
  //     toast.success(state.message);

  //     setTimeout(() => {
  //       redirect("/login");
  //     }, 1000);
  //   } else {
  //     toast.error(state.message);
  //   }
  // }, [state]);

  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-2'>
      <Card className='w-full max-w-md shadow-2xl border-0'>
        <CardHeader className='space-y-0.5 text-center pb-0.5'>
          <div className='mx-auto w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg'>
            <UserCheck2 className='w-8 h-8 text-white' />
          </div>
          <CardTitle className='text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
            Join Our Job Portal
          </CardTitle>
          <CardDescription className='text-base text-gray-600'>
            Create Your Account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className='space-y-0.5'
            // action={formAction}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Username */}
            <div className='space-y-1'>
              <Label
                htmlFor='fullName'
                className='text-sm font-semibold text-gray-700'
              >
                FullName
              </Label>
              <div className='relative'>
                <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <Input
                  type='text'
                  id='fullName'
                  {...register("fullName")}
                  placeholder='Enter Your FullName'
                  className='pl-11 h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                />
                <FieldError error={errors.fullName?.message} />
              </div>
            </div>

            {/* UserID */}
            <div className='space-y-1'>
              <Label
                htmlFor='userId'
                className='text-sm font-semibold text-gray-700'
              >
                Username
              </Label>
              <div className='relative'>
                <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <Input
                  type='text'
                  id='userId'
                  placeholder='Enter Your userid'
                  {...register("userId")}
                  className='pl-11 h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                />
                <FieldError error={errors.userId?.message} />
              </div>
            </div>

            {/* Email */}
            <div className='space-y-1'>
              <Label
                htmlFor='email'
                className='text-sm font-semibold text-gray-700'
              >
                Email
              </Label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <Input
                  type='email'
                  id='email'
                  {...register("email")}
                  placeholder='Enter Your email address'
                  className='pl-11 h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                />
              </div>
              <FieldError error={errors.email?.message} />
            </div>

            {/* Password */}
            <div className='space-y-1'>
              <Label
                htmlFor='password'
                className='text-sm font-semibold text-gray-700'
              >
                Password
              </Label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <Input
                  type={showPassword ? "text" : "password"}
                  id='password'
                  {...register("password")}
                  placeholder='Enter Your Password'
                  className='pl-11 pr-11 h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                >
                  {showPassword ? (
                    <EyeOff className='w-5 h-5' />
                  ) : (
                    <Eye className='w-5 h-5' />
                  )}
                </button>
              </div>
              <FieldError error={errors.password?.message} />
            </div>

            {/* Confirm Password */}
            <div className='space-y-1'>
              <Label
                htmlFor='confirmPassword'
                className='text-sm font-semibold text-gray-700'
              >
                Confirm Password
              </Label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  id='confirmPassword'
                  {...register("confirmPassword")}
                  placeholder='Enter Your Password Again'
                  className='pl-11 pr-11 h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                >
                  {showConfirmPassword ? (
                    <EyeOff className='w-5 h-5' />
                  ) : (
                    <Eye className='w-5 h-5' />
                  )}
                </button>
              </div>
              <FieldError error={errors.confirmPassword?.message} />
            </div>

            {/* Role */}
            <div className='space-y-1 '>
              <Label className='text-sm font-semibold text-gray-700'>
                I am*
              </Label>
              <div className='w-full'>
                <Controller
                  name='role'
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='h-11 w-full'>
                        <SelectValue placeholder='Select your role' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='applicant'>Job Seeker</SelectItem>
                        <SelectItem value='employer'>Employer</SelectItem>
                        <SelectItem value='admin'>Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className='pt-2'>
              <SubmitButton
                buttonText='Register'
                loadingText='Regestering'
                isLoading={isSubmitting}
              />
            </div>
            <div className='text-center space-y-1'>
              <span>Already Registered? </span>
              <Link href={"/login"} className='text-blue-500'>
                Login here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationPage;
