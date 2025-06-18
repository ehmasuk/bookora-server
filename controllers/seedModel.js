import Book from "../models/Book.js";
import Chapter from "../models/Chapter.js";
import Section from "../models/Section.js";
import User from "../models/User.js";

const seedBooks = async (_req, res, next) => {
  try {
    await Book.deleteMany({});
    return res.status(200).json({ message: "Books deleted" });
  } catch (error) {
    next(error);
  }
};
const seedChapters = async (_req, res, next) => {
  try {
    await Chapter.deleteMany({});
    return res.status(200).json({ message: "Chapters deleted" });
  } catch (error) {
    next(error);
  }
};
const seedSections = async (_req, res, next) => {
  try {
    await Section.deleteMany({});
    return res.status(200).json({ message: "Sections deleted" });
  } catch (error) {
    next(error);
  }
};
const seedUsers = async (_req, res, next) => {
  try {
    await User.deleteMany({});
    return res.status(200).json({ message: "Sections deleted" });
  } catch (error) {
    next(error);
  }
};

export default {
  seedBooks,
  seedSections,
  seedChapters,
  seedUsers,
};
