"use client";
import { FieldError } from "@/components/common/ErrorMessage";
import SubmitButton from "@/components/common/SubmitButton";
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
import { Textarea } from "@/components/ui/textarea";
import { COMPANY_TYPES, TEAM_SIZES } from "@/config/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Calendar1Icon,
  CircleUserRound,
  Dessert,
  Globe,
  Image,
  MapPin,
  UserCheck2,
  UserPen,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { UpdateEmployerProfileData } from "./completeProfile.action";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import {
  employerProfileValidationSchema,
  IFormInputData,
} from "@/features/auth/validationSchemas";
import { useContext } from "react";
import { CurrentUserContext } from "../_context/CurrentUserContext";

// type ORGANIZATION_TYPE = (typeof COMPANY_TYPES)[number];
// export interface IFormInput {
//   companyName: string;
//   description: string;
//   avatar_url?: string;
//   banner_image_url?: string;
//   team_size: TeamSize;
//   year_of_establishment: string;
//   website?: string;
//   location: string;
//   organization_type: ORGANIZATION_TYPE;
// }

interface EmployerSettingPageProps {
  existingData?: Partial<IFormInputData>;
}

const EmployerSettingPage = ({ existingData }: EmployerSettingPageProps) => {
  //# get loggedin employer data from context

  //   const currentUser = useContext(CurrentUserContext);

  //   if (!currentUser) redirect("/unauthorized");
  //   console.log("CURRENTUSR", currentUser);

  //   const { _id } = currentUser.user;

  //#get existing data  as a prop to prefill the form if needed

  console.log("existingData", existingData);

  //#React Hook form setup
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<IFormInputData>({
    defaultValues: {
      companyName: existingData?.companyName || "",
      description: existingData?.description || "",
      avatar_url: existingData?.avatar_url || "",
      banner_image_url: existingData?.banner_image_url || "",
      team_size: existingData?.team_size || undefined,
      year_of_establishment: existingData?.year_of_establishment,
      website: existingData?.website || "",
      location: existingData?.location || "",
      organization_type: existingData?.organization_type || undefined,
    },
    resolver: zodResolver(employerProfileValidationSchema),
  });

  const onSubmit = async (data: IFormInputData) => {
    const result = await UpdateEmployerProfileData(data);
    if (result.success) {
      toast.success(result.message);
      redirect("/dashboard/employer/profile");
    } else {
      toast.error(result.message);
    }
  };
  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-2'>
      <Card className='w-full max-w-3xl shadow-2xl border-0'>
        <CardHeader className='space-y-0.5 text-center pb-0.5'>
          <div className='mx-auto w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg'>
            <UserPen className='w-8 h-8 text-white' />
          </div>
          <CardTitle className='text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
            Complete Your Profile
          </CardTitle>
          <CardDescription className='text-base text-gray-600'>
            Help candidates know more about your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className='space-y-0.5'
            // action={formAction}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Company Logo */}
            <div className='space-y-1'>
              <Label className='text-sm font-semibold text-gray-700'>
                Company Logo
              </Label>
              <div className='relative'>
                <CircleUserRound className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                <Input
                  {...register("avatar_url")}
                  placeholder='Upload company logo'
                  className='pl-11 h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                />
                <FieldError error={errors.avatar_url?.message} />
              </div>
            </div>
            {/* Cover Image */}
            <div className='space-y-1'>
              <Label className='text-sm font-semibold text-gray-700'>
                Cover Image
              </Label>
              <div className='relative'>
                <Image className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                <Input
                  {...register("banner_image_url")}
                  placeholder='Upload cover image'
                  className='pl-11 h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                />
                <FieldError error={errors.banner_image_url?.message} />
              </div>
            </div>

            {/* companyName */}
            <div className='space-y-1'>
              <Label
                htmlFor='companyName'
                className='text-sm font-semibold text-gray-700'
              >
                Company Name *
              </Label>
              <div className='relative'>
                <Building2 className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <Input
                  type='text'
                  id='companyName'
                  {...register("companyName")}
                  placeholder='Enter Your Company Name'
                  className={`pl-11 h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all ${errors.companyName ? "border-destructive" : ""}`}
                />
                <FieldError error={errors.companyName?.message} />
              </div>
            </div>

            {/* Description */}
            <div className='space-y-1'>
              <Label
                htmlFor='description'
                className='text-sm font-semibold text-gray-700'
              >
                Description *
              </Label>
              <div className='relative'>
                <Dessert className='absolute left-3 top-1/3 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <Textarea
                  id='description'
                  placeholder='Enter description about company'
                  {...register("description")}
                  className='pl-11 h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                />
                <FieldError error={errors.description?.message} />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Organization Type */}
              {/* Organization Type */}
              <div className='space-y-1'>
                <Label className='text-sm font-semibold text-gray-700'>
                  Organization Type *
                </Label>

                <Controller
                  name='organization_type'
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='h-11 w-full'>
                        <Building2 className='mr-2 h-4 w-4 text-gray-400' />
                        <SelectValue placeholder='Select company type' />
                      </SelectTrigger>

                      <SelectContent>
                        {COMPANY_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError error={errors.organization_type?.message} />
              </div>

              {/* Team Size */}
              <div className='space-y-1'>
                <Label className='text-sm font-semibold text-gray-700'>
                  Team Size *
                </Label>
                <Controller
                  name='team_size'
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='h-11 w-full'>
                        <UserCheck2 className='mr-2 h-4 w-4 text-gray-400' />
                        <SelectValue placeholder='Number of employees' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectContent>
                          {TEAM_SIZES.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError error={errors.team_size?.message} />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Year of Establishment */}
              <div className='space-y-1'>
                <Label className='text-sm font-semibold text-gray-700'>
                  Year of Establishment *
                </Label>
                <div className='relative'>
                  <Calendar1Icon className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <Input
                    {...register("year_of_establishment")}
                    maxLength={4}
                    placeholder='YYYY'
                    className='pl-11 h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                  />
                  <FieldError error={errors.year_of_establishment?.message} />
                </div>
              </div>

              {/* Website */}
              <div className='space-y-1'>
                <Label className='text-sm font-semibold text-gray-700'>
                  Website (optional)
                </Label>
                <div className='relative'>
                  <Globe className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <Input
                    {...register("website")}
                    placeholder='https://example.com'
                    className='pl-11 h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                  />
                  <FieldError error={errors.website?.message} />
                </div>
              </div>
            </div>

            {/* location */}
            <div className='space-y-1'>
              <Label
                htmlFor='location'
                className='text-sm font-semibold text-gray-700'
              >
                Location *
              </Label>
              <div className='relative'>
                <MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <Input
                  type='text'
                  id='location'
                  {...register("location")}
                  placeholder='Enter location'
                  className='pl-11 pr-11 h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                />
                <FieldError error={errors.location?.message} />
              </div>
            </div>
            {/* Submit Button */}
            <div className='pt-2'>
              <SubmitButton
                buttonText='Update'
                loadingText='Updating...'
                isLoading={isSubmitting}
                disabled={!isDirty}
              />
            </div>
            {isDirty ? null : (
              <p className='text-sm text-gray-500 mt-0.5 float-end'>
                No changes to Save
              </p>
            )}
            {/* <div className='text-center space-y-1'>
              <span>Already Registered? </span>
              <Link href={"/login"} className='text-blue-500'>
                Login here
              </Link>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployerSettingPage;
