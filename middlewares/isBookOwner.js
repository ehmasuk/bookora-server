// USE CASE: check if user is owner of the book

import Book from "../models/Book.js";
import error from "../utils/error.js";

const isBookOwner = async (req, _res, next) => {
  try {
    const userId = req.user.id;
    if (!userId) throw error("User not found");

    const bookId = req.params.bookId;
    if (!bookId) throw error("Book id not found in param");

    const book = await Book.findById(bookId);
    if (!book) throw error("Book not found");

    if (book.author !== userId) throw error("You are not the owner of this book");

    next();
  } catch (error) {
    next(error);
  }
};

export default isBookOwner;
