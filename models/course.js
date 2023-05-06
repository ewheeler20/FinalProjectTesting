
const db = require("../db")


const Course = db.model("Courses",{
  courseTitle: { type: String, required: true},
  courseDescription: {type: String, required: true},
  subjectArea: {type: String, required: true},
  credits: {type: Number, required: true}
}, { timestamps: true })


module.exports = Course;