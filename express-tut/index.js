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
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // If not existing, return 404
    if (!course) res.status(404).send("Course with given ID is not available");

    // Validating new way 
    // const result = validateCourse(req.body);
    // Object destructuring 
    const { error } = validateCourse(req.body)
    // If invalid, return 400 - bad request
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update course
    course.name = req.body.name;
    // return the updated course
    res.send(course);

})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    //  This is an 'target object' it has to props -> error and value, with object destructuring we can access these props
    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));