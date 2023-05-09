const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseTitle: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  subjectArea: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;




/*
const db = require("../db")


const Course = db.model("Courses",{
  courseTitle: { type: String, required: true},
  courseDescription: {type: String, required: true},
  subjectArea: {type: String, required: true},
  credits: {type: Number, required: true}
}, { timestamps: true })


module.exports = Course;
*/