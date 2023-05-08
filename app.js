const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Course = require('./models/course');
const bodyParser = require("body-parser")
var cors = require("cors")

mongoose.connect("mongodb+srv://ewheeler18:databasePassword@courses.lgc6iqc.mongodb.net/courses?retryWrites=true&w=majority",
                 {useNewUrlParser: true,
                 useUnifiedTopology: true }
                 )


// express app
const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined'))

const router = express.Router();

app.use("/api", router)

app.listen(process.env.PORT || 3000)



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

router.get("/courses", (req, res) => {
  Course.find()
    .then(courses => {
      res.json(courses)
    })
    .catch(err => {
      res.status(400).send(err)
  })
})

router.post('/courses', (req, res) => {
  const course = new Course(req.body);
  course.save()
    .then(savedCourse => res.status(200).json(savedCourse))
    .catch(err => res.status(400).send(err));
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