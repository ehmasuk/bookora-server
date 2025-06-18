import Book from "../models/Book.js";
import Chapter from "../models/Chapter.js";
import Section from "../models/Section.js";
import error from "../utils/error.js";

const createChapter = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { title } = req.body;
    if (!title) {
      throw error("Title ,book are required");
    }
    const book = await Book.findById(bookId);
    if (!book) {
      throw error("Book not found");
    }
    const newChapter = new Chapter({ title, book: bookId });
    await newChapter.save();
    book.chapters.push(newChapter.id);
    await book.save();
    return res.status(201).json({ message: "Chapter created successfully", data: newChapter });
  } catch (err) {
    next(err);
  }
};

// get chapters by book id
const getChaptersByBookId = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId).populate("chapters");
    if (!book) {
      throw error("Book not found", 404);
    }
    return res.status(200).json({ message: "Successfully fetched chapters", data: book.chapters });
  } catch (err) {
    next(err);
  }
};

const deleteChapter = async (req, res, next) => {
  try {
    const { chapterId } = req.params;

    const chapter = await Chapter.findById(chapterId);

    if (!chapter) {
      throw error("Chapter not found", 404);
    }

    await Section.deleteMany({ chapter: chapterId });

    await Chapter.findByIdAndDelete(chapterId);

    return res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const updateChapter = async (req, res, next) => {
  try {
    const { chapterId } = req.params;
    const { title } = req.body;
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    const chapter = await Chapter.findByIdAndUpdate(chapterId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!chapter) {
      throw error("Chapter not found", 404);
    }
    return res.status(200).json({ message: "Chapter updated successfully", data: chapter });
  } catch (err) {
    next(err);
  }
};

const sortChapters = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const { sortedChapters } = req.body;

    if (!sortedChapters) {
      throw error("sortedChapters is required");
    }

    const book = await Book.findById(bookId);

    if (!book) {
      throw error("Book not found", 404);
    }

    const idsOfSortedChapters = sortedChapters.map((chapter) => chapter.id);

    book.chapters = idsOfSortedChapters;

    await book.save();

    return res.status(200).json({ message: "Successfully fetched chapters" });
  } catch (error) {
    next(error);
  }
};

export default {
  createChapter,
  getChaptersByBookId,
  deleteChapter,
  updateChapter,
  sortChapters,
};
