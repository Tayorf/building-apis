const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', apiRouter);

app.listen(3000, () => console.log('Server listening on port 3000!'));