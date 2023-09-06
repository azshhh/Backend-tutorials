const mongoose = require('mongoose');

// Connecting to MongoDB server
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.error('MongoDB connection failed.', error));

// Schema structures our document in mDB database.
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
});

// compiling schema into model which gives a class
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'MongoDB Course',
        author: 'Ferrai',
        tags: ['JavaScript', 'backend'],
        isPublished: true,
    });
    const result = await course.save();
}

async function getCourses() {
    /* 
        syntax: /pattern/
            ^ -> reprensts start
            $ -> reprensts end
            .*Red.* -> reprensts anywhere in a string from 0 to len index
            i -> case sensitive
    */

    const courses = await Course
        // .find({ author: 'Redbull', isPublished: true })

        // Starts with Red and case sensitive
        .find({ author: /^Fer/i })

        // Ends with bull and case sensitive
        // .find({ author: /bull$/i })

        // Conatins Red and case sensitive
        // .find({ author: /.*Red.*/i })
        
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

// createCourse();
getCourses();
