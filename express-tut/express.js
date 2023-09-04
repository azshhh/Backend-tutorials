const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const courses = require('./courses');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(helmet());
app.use('/api/courses', courses);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug("Morgan enabled...");
}

app.get('/', (req, res) => {
    res.render('index', { title: "Express App", message: 'Hello' });
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));