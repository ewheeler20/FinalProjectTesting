/* These are new files I have made
while following along to professor 
Hamby's videos. I watched through
the first 4 and I believe the
next one is about authentication.
The videos walk you through the steps
of something similar to a project
in the book. The videos help explain
and show why it is set up the way it is.
The files I made so far are not all
fully functional though. I'm not sure 
if it is being affected at all by other
files as well because I haven't isolated
the files and tested it yet but most of the
backend was working. It seems to be the
grabbing of the data and transferring to
the front end that doesn't work because
you can see it when you request it in
the back but not when you print it out
on the page. This is the same problem
that we were struggling with before.
Problems:
-Can post/add course on the back-end but won't
display on the front-end.
-Add course page button won't actually add
the course. If we go this route then
we will probably be able to put the
functionality into the page Caleb
styled. 
-Delete page dropdown isn't filling
with the courses. We could probably
change the format of how this is set
up.

I feel as though if we all watch
through the videos, then we will
all be on the same page on what each
page/process should look or do and we
can help each other out. I think we will
also be able to communicate better
with professor Hamby if we are still
not understanding it. He made an
announncement about the videos not
necessarily being a full rewrite but
could help. I think watching the
videos was beneficial to me in just
understanding the project.Look 
through the files and watch the 
videos and let me know your thoughts.
The videos are really long but 1.5
speed helps.

The file names have NEW in front so
they aren't going to work. If we choose
to use it, we can add onto it and change
the name. I followed along with the videos
so I used VS code. I haven't tried doing
it in replit. You could probably copy the
file format and then copy the code into
the files and work with it on VS code. 
Like I said, I do have some errors, but
we all would have a better idea of how 
to go about it. */




const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://ewheeler18:databasePassword@courses.lgc6iqc.mongodb.net/?retryWrites=true&w=majority",
                 {useNewUrlParser: true})

module.exports = mongoose;