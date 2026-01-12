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
import { Eye, EyeOff, Lock, User, UserCheck } from "lucide-react";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
interface LoginFormData {
  userId: string;

  password: string;
}
const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    userId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4'>
      <Card className='w-full max-w-md shadow-2xl border-0'>
        <CardHeader className='space-y-3 text-center pb-6'>
          <div className='mx-auto w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg'>
            <UserCheck className='w-8 h-8 text-white' />
          </div>
          <CardTitle className='text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
            Login to Job Portal
          </CardTitle>
          <CardDescription className='text-base text-gray-600'>
            Unlock the Possiblities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className='space-y-5' onSubmit={handleSubmit}>
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
            {/* <div className='space-y-2'>
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
                  placeholder='Enter Your email address'
                  required
                  value={formData.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleInputChange("email", e.target.value);
                  }}
                  className='pl-11 h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                />
              </div>
            </div> */}

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

            {/* Submit Button */}
            <div className='pt-2'>
              <Button
                type='submit'
                onClick={handleSubmit}
                className='w-full h-12 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200'
              >
                Login
              </Button>
            </div>
            <div className='text-center space-y-2'>
              <span>Don't have an account? </span>
              <Link href={"/register"} className='text-blue-500'>
                Sign Up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
