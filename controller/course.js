const express = require("express");
const Course = require("../pkg/db/courses/courseSchema");

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("academy");
    res.render("courses", { Courses: courses });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getOneCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.render("oneCourse", { course });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getCreateCourse = async (req, res) => {
  try {
    res.render("newCourse");
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { name, address, area, academy } = req.body;
    const academyId = academy ? academy : null;
    const newCourse = await Course.create({
      name,
      address,
      area,
      academy: academyId,
    });
    res.redirect("/welcome");
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getEditCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.render("editCourse", { course });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    if (!req.body.academy) {
      req.body.academy = null;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.redirect("/welcome");
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
