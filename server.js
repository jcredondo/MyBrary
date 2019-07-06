if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');

const mongoose = require('mongoose');
const app = express();



app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', error => console.log('Connected to Mongoose'));

app.use('/', indexRouter);
app.use('/authors', authorsRouter);

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log('Server Running');
});