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
    /* Comparison Query Operators 
        eq (equal)
        ne (not equal)
        gt (greater than)
        gte (greater than or equal to)
        lt (less than)
        lte (less than or equal to)
        in
        nin (not in)
    */

    const courses = await Course
        // .find({ author: 'Redbull', isPublished: true })
        // .find({ price: { $gte: 10 } })
        // .find({ price: { $gte: 10, $lte: 20 } }
        .find({ price: { $in: [10, 20, 30] } })
        .limit(2)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

getCourses();
