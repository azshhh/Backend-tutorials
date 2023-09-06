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

// creating an object specifing values to the schmea holding keys
const course = new Course({
    name: 'Node.js Course',
    author: 'Redbull',
    tags: ['node', 'backend'],
    isPublished: true,
});

// To save an object in db, it will take time to access file system. Thats why we are dealing with asynchronous operation. Therefore save() method returns a promise. So we can await it.
const result = await course.save();
console.log(result);
