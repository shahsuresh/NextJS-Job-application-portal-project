import mongoose from "mongoose";
import { required } from "zod/v4-mini";

const applicantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    biography: {
      type: String,
      trim: true,
      required: true,
      maxLength: 800,
    },
    dateOfBirth: {
      type: Date,
    },
    nationality: {
      type: String,
    },
    maratialStatus: {
      type: String,
      required: true,
      enum: ["Single", "Married", "Divorced"],
      default: "Single",
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Others"],
    },
    experience: {
      type: String,
    },
    education: {
      type: String,
      required: true,
      enum: [
        "none",
        "high school",
        "intermediate",
        "under graduate",
        "masters",
        "phd",
      ],
      default: "high school",
    },
    website_url: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    location: {
      type: String,
      trim: true,
      maxLength: 300,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Applicant =
  mongoose.models.Applicant || mongoose.model("Applicant", applicantSchema);

export default Applicant;
