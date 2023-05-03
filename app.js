const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Course = require('./models/course');
var router = express.Router();
var path = __dirname + '/views/';

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://ewheeler18:databasepassword@courses.lgc6iqc.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

// routes
app.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
  });

app.get('/addClasses', (req, res) => {
    res.render('addClasses', { title: 'Add Classes' });
  });

app.get('/courses/create', (req, res) => {
    res.render('create', { title: 'Create a New Course' });
  });

app.get('/viewSchedule', (req, res) => {
    res.render('viewSchedule', { title: 'View Courses' });
  });

app.get('/courses', (req, res)=>{
    Course.find().sort({ createdAt: -1})
    .then((result)=>{
      res.render('index', { title: 'Courses', courses: result});
    })
    .catch((err)=>{
      console.log(err);
    })
  })
  
  app.post('/courses', (req,res)=>{
    console.log(req.body)
    const course = new Course(req.body)
    course.save()
      .then((result)=>{
        res.redirect("/viewSchedule")
      })
      .catch((err)=>{
        console.log(err)
      })  
    });
  
  app.get('/courses/create', (req, res) => {
    res.render('create', { title: 'Create a new course'});
  } );

  //search
  app.get('/courses/:id', (req, res) => {
    const id = req.params.id;
      Course.findById(id)
      .then(result => {
        res.render('details', { course: result, title: 'Course Details' });
      })
      .catch(err => {
        console.log(err);
      });
  });

  //delete
  app.delete('/courses/:id', (req, res) => {
    const id = req.params.id;
      
    Course.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/courses' });
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  app.post('/courses/:id', (req, res) => {
    const id = req.params.id;
    //const { courseName, subjectArea, creditHours, description } = 
    console.log(req.body);
    Course.findByIdAndUpdate(id, req.body, { new: true })
    .then(updatedCourse => {
      res.redirect('/courses/' + updatedCourse.id);
    })
    .catch(err => {
      console.log(err);
    });
  });



  // 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });