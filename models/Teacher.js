const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const teacherSchema = new mongoose.Schema({
  title: {
    type: String,
    default:"teacher"
  },
  username: {
    type: String,
    required: [true, 'Please enter an username'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  }

});


// fire a function before doc saved to db
teacherSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login student account
teacherSchema.statics.login = async function(username, password) {
  const teacher = await this.findOne({ username });
  if (teacher) {
    const auth = await bcrypt.compare(password, teacher.password);
    if (auth) {
      return teacher;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect username');
};

const Teacher = mongoose.model('teacher', teacherSchema);

module.exports = Teacher;