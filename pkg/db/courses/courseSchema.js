const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Course must have a name"],
  },
  address: {
    type: String,
    required: [true, "Course must have an adress"],
  },
  area: {
    type: String,
    required: [true, "Course must have an area"],
  },
  academy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Academy",
    required: false,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
