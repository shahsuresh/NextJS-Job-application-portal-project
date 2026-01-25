import connectDB from "@/lib/db";
import Employeer from "@/models/employer.model";

export const getCurrentEmployerDetails = async (userId: string) => {
  try {
    connectDB();
    const employeer = await Employeer.findOne({ userId: userId });
    if (!employeer)
      return {
        success: true,
        message: "No employer profile found",
      };

    return {
      success: true,
      data: employeer,
      message: "Employer profile fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch employer profile",
    };
  }
};
