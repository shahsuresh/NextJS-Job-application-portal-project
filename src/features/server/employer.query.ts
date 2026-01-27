import connectDB from "@/lib/db";
import Employeer from "@/models/employer.model";
import { getCurrentUser } from "../use-cases/auth.queries";

export const getCurrentEmployerDetails = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.user.role !== "employer") {
    return {
      success: false,
      message: "Unauthorized access",
    };
  }
  const { _id } = currentUser.user;
  try {
    connectDB();
    const employeer = await Employeer.findOne({ userId: _id }).lean();
    if (!employeer)
      return {
        success: true,
        message: "No employer profile found",
      };

    return {
      success: true,
      data: {
        ...employeer,
        userId: _id.toString(),
        createdAt: employeer.createdAt.toISOString(),
        updatedAt: employeer.updatedAt.toISOString(),
      },
      message: "Employer profile fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch employer profile",
    };
  }
};

export function toPlainUser(user: any) {
  return {
    id: user._id.toString(), // ✅ convert ObjectId
    userId: user.userId,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt?.toISOString(), // ✅ Date → string
  };
}
