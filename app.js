const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Course = require('./models/course');
const bodyParser = require("body-parser")
var cors = require("cors")
const { result } = require('lodash');


const dbURI = "mongodb+srv://ewheeler18:databasePassword@Courses.lgc6iqc.mongodb.net/new";

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));


// express app
const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(express.json())

const router = express.Router();

app.use("/api", router)


// register view engine
app.set('view engine', 'ejs');

// middleware & static files

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// routes
app.get('/allCourses', function(req, res) {
  Course.find().sort({createdAt: -1})
  .then((result)=>{
    res.render('allCourses', { 
      title: 'Courses',
      courses: result
      });
  })
    .catch(err => {
      console.log(err);
  })
})


app.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
  });

app.get('/addClasses', (req, res) => {
    res.render('addClasses', { title: 'Add Classes' });
  });

app.get('/courses/create', (req, res) => {
    res.render('create', { title: 'Create a New Course' });
  });

app.get('/allCourses', (req, res) => {
    res.render('allCourses', { title: 'View Courses' });
  });



app.post('/courses', (req, res) => {
  const course = new Course(req.body)
    course.save()
      .then((result)=>{
        res.redirect("allCourses")
      })
      .catch((err)=>{
        console.log(err)
      })  
    });

////
 // app.post('/courses', (req,res)=>{
  //  console.log(req.body)
  //  const course = new Course(req.body)
 //   course.save()
  //    .then((result)=>{
   //     res.redirect("/viewSchedule")
    //  })
    //  .catch((err)=>{
    //    console.log(err)
    //  })  
  //  });
  /////
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