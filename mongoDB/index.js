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
        name: 'Django Course',
        author: 'Redbull',
        tags: ['python', 'backend'],
        isPublished: true,
    });
    const result = await course.save();
}

async function getCourses() {
    const courses = await Course
        .find({ author: 'Redbull', isPublished: true })
        .limit(2)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

getCourses();
