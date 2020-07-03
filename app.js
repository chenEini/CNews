const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles.route');
const categoriesRouter = require('./routes/categories.route');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
articlesRouter(app);
categoriesRouter(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log('url not found');
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    const error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(error);
});

module.exports = app;


