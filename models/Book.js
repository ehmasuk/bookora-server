import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      default: null,
    },
    summary: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chapters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
    visibility: {
      type: String,
      default: "private",
      enum: ["private", "public"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default mongoose.models.Book || mongoose.model("Book", bookSchema);
