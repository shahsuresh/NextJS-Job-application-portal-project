import { COMPANY_TYPES } from "@/config/constants";
import mongoose from "mongoose";

const employerSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      trim: true,
      maxLength: 200,
      required: true,
      default: "Your Company",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 1000,
    },
    avatar_url: {
      type: String,
    },
    banner_image_url: { type: String },
    organization_type: { type: String, enum: COMPANY_TYPES },
    team_size: { type: String },
    year_of_establishment: { type: String },
    website: {
      type: String,
      maxLength: 200,
    },
    location: {
      type: String,
      trim: true,
      maxLength: 200,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Employeer =
  mongoose.models.Employeer || mongoose.model("Employeer", employerSchema);

export default Employeer;
