import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: [true, "Chapter id is required"],
    },
    note: {
      type: String,
      default: "",
    },
    content: {
      type: Object,
      default: null,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default mongoose.model("Section", sectionSchema);
