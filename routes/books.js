import { Router } from "express";
import bookControllers from "../controllers/books.js";
import chapterControllers from "../controllers/chapters.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

// create a new book
router.post("/",isAuthenticated, bookControllers.createBook);

// get all books
router.get("/", bookControllers.getBooks);

// Get book by book Id
router.get("/:bookId", bookControllers.getBook);

// Delete a book by book id
router.delete("/:bookId",isAuthenticated, bookControllers.deleteBook);

// update book by book id
router.patch("/:bookId",isAuthenticated, bookControllers.updateBook);

// get book chapters
router.get("/:bookId/chapters", chapterControllers.getChaptersByBookId);

// create a new chapter
router.post("/:bookId/chapters",isAuthenticated, chapterControllers.createChapter);

// sort chapters
router.post("/:bookId/chapters/sort",isAuthenticated, chapterControllers.sortChapters);

export default router;
