import { getCurrentEmployerDetails } from "@/features/server/employer.query";
import EmployerSettingPage from "./EmployerSettingPage";
import { IFormInputData } from "@/features/auth/validationSchemas";

const Settings = async () => {
  const existingProfileData = await getCurrentEmployerDetails();
  console.log("EX_PROFILE_DATA", existingProfileData);

  const { data } = existingProfileData;

  return (
    <>
      <EmployerSettingPage existingData={data} />
    </>
  );
};

export default Settings;
