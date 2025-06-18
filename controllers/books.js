import Book from "../models/Book.js";
import Chapter from "../models/Chapter.js";
import Section from "../models/Section.js";
import User from "../models/User.js";
import error from "../utils/error.js";

// Create a new book
const createBook = async (req, res, next) => {
  try {
    const { title, summary, author, visibility } = req.body;

    if (!title || !author) {
      throw error("Title and author are required");
    }

    const user = await User.findById(author);
    if (!user) {
      throw error("User not found");
    }

    const newBook = new Book({ title, summary, author, visibility });
    await newBook.save();

    return res.status(201).json({ message: "Book created successfully", book: newBook });
  } catch (err) {
    next(err);
  }
};

// Get all books
const getBooks = async (_req, res, next) => {
  try {
    const books = await Book.find();
    return res.status(200).json({ message: "Successfully fetched all books", data: books });
  } catch (err) {
    next(err);
  }
};

// Get book by book Id
const getBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId).populate("chapters");

    if (!book) {
      throw error("Book not found", 404);
    }

    return res.status(200).json({ message: "Book fetched successfully", data: book });
  } catch (err) {
    next(err);
  }
};

// Delete a book by book id
const deleteBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);

    if (!book) {
      throw error("Book not found", 404);
    }
    // get all chapters related to the book
    const chapters = await Chapter.find({ book: bookId });

    // delete all sections related to the chapters
    for (const chapter of chapters) {
      await Section.deleteMany({ chapter: chapter.id });
    }

    // delete all chapters
    await Chapter.deleteMany({ book: bookId });

    // delete the book
    await Book.findByIdAndDelete(bookId);

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Patch (update) a book
const updateBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { title, summary, image, visibility } = req.body;
    const updateData = {};
    if (image) {
      try {
        const uploadedImage = await cloudinary.uploader.upload(image, {
          folder: "bookora",
        });
        updateData.image = uploadedImage.secure_url;
      } catch (error) {
        return res.status(400).json({ message: "Cannot upload image to cloudinary" });
      }
    }

    if (title !== undefined) updateData.title = title;
    if (summary !== undefined) updateData.summary = summary;
    if (visibility !== undefined) updateData.visibility = visibility;

    const book = await Book.findByIdAndUpdate(bookId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      throw error("Book not found", 404);
    }

    return res.status(200).json({ message: "Book updated successfully", data: updateData });
  } catch (err) {
    next(err);
  }
};

export default {
  createBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
};
