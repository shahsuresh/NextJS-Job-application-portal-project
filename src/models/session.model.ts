import mongoose from "mongoose";
import { string } from "zod";

const sessionSchema = new mongoose.Schema(
  {
    token: { type: string },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    userAgent: {
      // to store browser/device infomation
      type: String,
      required: true,
    },
    ipAddress: {
      // to store user ip address
      type: String,
      required: true,
      maxLength: 45,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);

export default Session;
