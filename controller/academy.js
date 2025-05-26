const express = require("express");
const Academy = require("../pkg/db/academies/academySchema");

exports.getAllAcademies = async (req, res) => {
  try {
    const academies = await Academy.find();
    res.render("academies", { Academies: academies });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getOneAcademy = async (req, res) => {
  try {
    const academy = await Academy.findById(req.params.id).populate("courses");
    console.log(academy);
    res.render("oneAcademy", { academy });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getCreateAcademy = async (req, res) => {
  try {
    res.render("newAcademy");
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createAcademy = async (req, res) => {
  try {
    const { name, address, courses } = req.body;

    const courseIds = courses
      ? courses.map((course) => mongoose.Types.ObjectId(course))
      : [];

    const newAcademy = await Academy.create({
      name,
      address,
      courses: courseIds,
    });

    res.redirect("/academies");
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getEditAcademy = async (req, res) => {
  try {
    const academy = await Academy.findById(req.params.id);
    res.render("editAcademy", { academy });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateAcademy = async (req, res) => {
  try {
    if (!req.body.courses) {
      req.body.courses = null;
    }

    const updatedAcademy = await Academy.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.redirect("/academies");
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteAcademy = async (req, res) => {
  try {
    await Academy.findByIdAndDelete(req.params.id);
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
