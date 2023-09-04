const Joi = require('joi');
const express = require('express');
const app = express();

// When we call 'express.json()' this method returns middleware, and we call 'app.use()' to use middleware in req processing pipeline.
app.use(express.json())

courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
]

app.get('/api/courses/hello', (req, res) => {
    res.send("Hello World");
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("Course with given ID is not available");
    res.send(course);
})

app.post('/api/courses', (req, res) => {

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    if (result.error) {
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        // In order to read name property from req.body object, we need enabele parsing of JSON objects in body of requests, bcoz by default this feature is not enable in express.
        name: req.body.name
    };

    // Pushing course object into array of courses 
    courses.push(course);
    res.send(course);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));