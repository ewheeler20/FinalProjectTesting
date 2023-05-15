const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
  title: {
    type:String,
    default: "student"
  },
  username: {
    type: String,
    required: [true, 'Please enter an username'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  }

});


// fire a function before doc saved to db
studentSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login student account
studentSchema.statics.login = async function(username, password) {
  const student = await this.findOne({ username });
  if (student) {
    const auth = await bcrypt.compare(password, student.password);
    if (auth) {
      return student;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect username');
};

const Student = mongoose.model('student', studentSchema);

module.exports = Student;