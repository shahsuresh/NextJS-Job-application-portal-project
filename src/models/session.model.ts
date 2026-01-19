import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, index: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

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
      index: true,
    },
  },
  { timestamps: true },
);

const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);

export default Session;
