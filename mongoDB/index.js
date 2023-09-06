const mongoose = require('mongoose');

// Connecting to MongoDB server
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.error('MongoDB connection failed.', error));

// Creating schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
});

// Compiling schema with document
const Course = mongoose.model('Course', courseSchema);

// CREATE operation
async function createCourse() {
    const course = new Course({
        name: 'Django Course',
        author: 'Redbull',
        tags: ['python', 'backend'],
        isPublished: true,
    });
    const result = await course.save();
}

// READ operation
async function getCourses() {
    const courses = await Course
        .find({ author: 'Mercedes', isPublished: true })
        .limit(2)
        .sort({ name: 1 })
        .count();
    console.log(courses);
}

// UPDATE operation
async function updateCourse(id) {
    
    // find course usinf findById()
    const course = await Course.findById(id);

    // if not exist, return
    if (!course) return;

    // update keys using set()
    course.set({
        isPublished: true,
        author: 'Ferrari'
    });

    const result = await course.save();
    console.log(result);
}

updateCourse('64f87832bb3e7d35784ce19a');