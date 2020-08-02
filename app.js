const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/news.routes')(app, express);
require('./routes/member.routes')(app, express);
require('./routes/testimonial.routes')(app, express);
require('./routes/kategori_course.routes')(app, express);
require('./routes/mentor.routes')(app, express);
require('./routes/event.routes')(app, express);
// app.listen(8000, () => {
//   console.log(`Server started on port 8000`);
// });
module.exports = app;
