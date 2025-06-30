const mongoose = require("mongoose");
const courseModel = require("../../../models/courseModel");
const cloudinary = require("../../../configs/cloudinary");
const fs = require("fs");
const getCourses = async (req, res) => {
  try {
    const courses = await courseModel.find();
    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found!" });
    }
    res.json(courses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const addCourse = async (req, res) => {
  try {
    const brochureFile = req.files.brochure;
    const result = await cloudinary.uploader.upload(brochureFile.tempFilePath);
    const { name, details, duration, category, trainer } = req.body;
    const brochureUrl = result.url;
    const newCourse = await courseModel.create({
      name,
      details,
      duration,
      brochureUrl,
      category,
      trainer,
      isPublished: true,
    });

    const populatedCourse = await courseModel
      .findById(newCourse._id)
      .populate("trainer")
      .populate("category");
    fs.unlink(brochureFile.tempFilePath, (err) => {
      if (err) console.error("Failed to delete temp file:", err);
    });
    return res.json(populatedCourse);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteCourse = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format!" });
    }
    const deletedCourse = await courseModel.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedCourse) {
      return res.status(404).json({ message: "No course found" });
    }
    return res.json({ message: "deleted course sucessfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updateCourse = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format!" });
    }
    const brochureFile = req.files.brochure;
    const result = await cloudinary.uploader.upload(brochureFile.tempFilePath);

    const brochureUrl = result.url;
    const updatedCourse = await courseModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    const populatedCourse = await courseModel
      .findById(updatedCourse._id)
      .populate("trainer")
      .populate("category");
    return res.json(populatedCourse);
  } catch (error) {
    return res.status(500).json({ meessage: error.message });
  }
};
module.exports = { getCourses, addCourse, deleteCourse, updateCourse };
