import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === "credentials";
      },
    },
    image: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
      default: "credentials",
      enum: ["credentials", "google"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default mongoose.model("User", userSchema);
