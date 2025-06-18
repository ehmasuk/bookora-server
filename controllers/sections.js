import Chapter from "../models/Chapter.js";
import Section from "../models/Section.js";
import error from "../utils/error.js";

const createSection = async (req, res, next) => {
  try {
    const { chapterId } = req.params;

    const { title, note, content } = req.body;

    if (!title) {
      throw error("Title are required");
    }

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      throw error("Chapter not found");
    }

    const newSection = new Section({ title, chapter: chapterId, note, content });
    await newSection.save();

    chapter.sections.push(newSection.id);
    await chapter.save();

    return res.status(201).json({ message: "Section created successfully", data: newSection });
  } catch (err) {
    next(err);
  }
};

const getSection = async (req, res, next) => {
  try {
    const { sectionId } = req.params;
    const section = await Section.findById(sectionId);
    if (!section) {
      throw error("Section not found", 404);
    }
    return res.status(200).json({ message: "Successfully fetched section", data: section });
  } catch (err) {
    next(err);
  }
};

const getSectionsByChapterId = async (req, res, next) => {
  try {
    const { chapterId } = req.params;
    const chapter = await Chapter.findById(chapterId).populate("sections");
    if (!chapter) {
      throw error("Chapter not found", 404);
    }
    return res.status(200).json({ message: "Successfully fetched sections", data: chapter.sections });
  } catch (err) {
    next(err);
  }
};

const deleteSection = async (req, res, next) => {
  try {
    const { sectionId } = req.params;
    const section = await Section.findByIdAndDelete(sectionId);
    if (!section) {
      throw error("Section not found", 404);
    }
    return res.status(200).json({ message: "Section deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const updateSection = async (req, res, next) => {
  try {
    const { sectionId } = req.params;
    const { title, note, content } = req.body;
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (note !== undefined) updateData.note = note;
    if (content !== undefined) updateData.content = content;
    const section = await Section.findByIdAndUpdate(sectionId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!section) {
      throw error("Section not found", 404);
    }
    return res.status(200).json({ message: "Section updated successfully", data: section });
  } catch (err) {
    next(err);
  }
};

const sortSections = async (req, res, next) => {
  try {
    const { chapterId } = req.params;

    const { sortedSections } = req.body;

    if (!sortedSections) {
      throw error("sortedSections is required");
    }

    const chapter = await Chapter.findById(chapterId);

    if (!chapter) {
      throw error("Chapter not found", 404);
    }

    const idsOfSortedSections = sortedSections.map((section) => section.id);

    chapter.sections = idsOfSortedSections;

    await chapter.save();

    return res.status(200).json({ message: "Successfully sorted sections" });
  } catch (error) {
    next(error);
  }
};

export default {
  createSection,
  getSectionsByChapterId,
  updateSection,
  deleteSection,
  getSection,
  sortSections,
};
