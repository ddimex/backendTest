const mongoose = require("mongoose");

const academySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Academy must have a name"],
  },
  address: {
    type: String,
    required: [true, "Academy must have an adress"],
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: false,
    },
  ],
});

const Academy = mongoose.model("Academy", academySchema);
module.exports = Academy;
