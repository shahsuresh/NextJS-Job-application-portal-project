"use client";
import { Button } from "@/components/ui/button";
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
import { redirect } from "next/navigation";

export interface RegistrationFormData {
  fullName: string;
  userId: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "applicant" | "employer";
}

const RegistrationPage: React.FC = () => {
  const initialState: RegisterState = {
    success: false,
    message: "",
  };
  const [state, formAction, isPending] = useActionState(
    registerFormAction,
    initialState
  );
  const [formData, setFormData] = useState<RegistrationFormData>({
    userId: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "applicant",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (state?.success) {
      setFormData({
        userId: "",
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "applicant",
      });
      console.log(formData);
      setTimeout(() => {
        redirect("/login");
      }, 2000);
    }
  }, [state?.success]);

  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4'>
      <Card className='w-full max-w-md shadow-2xl border-0'>
        <CardHeader className='space-y-3 text-center pb-6'>
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
          <form className='space-y-5' action={formAction}>
            {/* Username */}
            <div className='space-y-2'>
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
                  name='fullName'
                  placeholder='Enter Your FullName'
                  required
                  value={formData.fullName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleInputChange("fullName", e.target.value);
                  }}
                  className='pl-11 h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                />
              </div>
            </div>

            {/* UserID */}
            <div className='space-y-2'>
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
                  name='userId'
                  placeholder='Enter Your userid'
                  required
                  value={formData.userId}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleInputChange("userId", e.target.value);
                  }}
                  className='pl-11 h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                />
              </div>
            </div>

            {/* Email */}
            <div className='space-y-2'>
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
                  name='email'
                  placeholder='Enter Your email address'
                  required
                  value={formData.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleInputChange("email", e.target.value);
                  }}
                  className='pl-11 h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                />
              </div>
            </div>

            {/* Password */}
            <div className='space-y-2'>
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
                  name='password'
                  placeholder='Enter Your Password'
                  required
                  value={formData.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleInputChange("password", e.target.value);
                  }}
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
            </div>

            {/* Confirm Password */}
            <div className='space-y-2'>
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
                  name='confirmPassword'
                  placeholder='Enter Your Password Again'
                  required
                  value={formData.confirmPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleInputChange("confirmPassword", e.target.value);
                  }}
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
            </div>

            {/* Role */}
            <div className='space-y-2 '>
              <Label className='text-sm font-semibold text-gray-700'>
                I am*
              </Label>
              <div className=''>
                <Select
                  value={formData.role}
                  name='role'
                  onValueChange={(value: "applicant" | "employer") =>
                    handleInputChange("role", value)
                  }
                >
                  <SelectTrigger className=' w-full h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'>
                    <SelectValue placeholder='Select Your Role' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='applicant'>Job Seeker</SelectItem>
                    <SelectItem value='employer'>Employer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <div className='pt-2'>
              <SubmitButton />
            </div>
            <div className='text-center space-y-2'>
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

const SubmitButton = () => {
  const { data, pending } = useFormStatus();
  return (
    <Button
      type='submit'
      disabled={pending}
      className='w-full h-12 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200'
    >
      {pending ? "Registering..." : " Register"}
    </Button>
  );
};
