const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Course = require('./models/course');


// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+smongodb+srv://ewheeler18:databasepassword@courses.lgc6iqc.mongodb.net/?retryWrites=true&w=majorityrv://ewheeler:Quakers20@cluster0.wgeve3c.mongodb.nemongodb+srv://ewheeler18:Quakers20@courses.lgc6iqc.mongodb.net/?retryWrites=true&w=majorityt/?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// routes
app.get('/', (req, res) => {
    res.redirect('/index');
  });

app.get('/addClasses', (req, res) => {
    res.render('addClasses', { title: 'Add Classes' });
  });

app.get('/courses/create', (req, res) => {
    res.render('create', { title: 'Create a New Course' });
  });







  // 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });