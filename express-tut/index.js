const Joi = require('joi');
const express = require('express');
const app = express();

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
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
})

// HTTP PUT
app.put('/api/courses/:id', (req, res) => {
    // Course Existance check
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("Course with given ID is not available");

    // Course validation
    const { error } = validateCourse(req.body)
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update course
    course.name = req.body.name;
    res.send(course);

})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("Course with given ID is not available");

    //  To delete a particular course in courses array, we need find index of that course.
    const index = courses.indexOf(course);

    // Using splice method to delete object from courses array. Go to the index and remove one object
    courses.splice(index, 1)
    
    // Return course
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