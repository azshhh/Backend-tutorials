const Joi = require('joi');
const express = require('express');
const app = express();

// Middleware into request processing pipeline
app.use(express.json())

courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
]

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

//  HTTP GET 
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("Course with given ID is not available");
    res.send(course);
})

//  HTTP POST 
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
})

// HTTP PUT
app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Course with given ID is not available");

    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);

})

// HTTP DELETE
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Course with given ID is not available");

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

// Course validation function
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));