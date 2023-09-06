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
        name: 'Dummy Course',
        author: 'Redbull',
        tags: ['python', 'backend'],
        isPublished: true,
    });
    const result = await course.save();
    console.log(result);
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
    const result = await Course.update({ _id: id }, {
        $set: {
            author: 'Redbull',
            isPublished: false
        }
    });
    console.log(result);
}

// DELETE operation
async function deleteCourse(id) {
    // const result = await Course.deleteOne({ _id: id });
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

deleteCourse('64f88af648d3b911f8b66248');