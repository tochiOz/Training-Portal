const express = require('express');
const chalk = require('chalk')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const session = require('express-session');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const keys = require('./../config/keys');
const flash = require('connect-flash');
dotenv.config()

// database connection
mongoose.connect(keys.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}, function (err, client) {
  if (err) console.log(err);
  console.log(chalk.red('Connection passed'));
})

let db = mongoose.connection;

db.once('open', () => console.log('Connected to database'));

// checks if connection to db is a success
db.on('error', console.error.bind(console, 'Database connection error:'));

const indexRouter = require('./routes/index'),
      usersRouter = require('./routes/User'),
      Admin = require('./routes/Admin'),
      AdminCategories = require('./routes/AdminCategories'),
      AdminInterestArea = require('./routes/AdminInterestArea'),
      AdminSkill = require('./routes/AdminSkill'),
      AdminUser = require('./routes/AdminUser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({ defaultLayout: 'template', extname: '.hbs'}))
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: keys.SECRET,
    saveUninitialized: false,
    resave: true,
    store: new MongoStore({
      mongooseConnection: db
    })
  })
)

//Express Messages middleware
app.use(flash());
app.use(function (err, req, res, next) {
  //globals (flash)
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");

  next();
})

app.use('/', [ 
  indexRouter, usersRouter, Admin, AdminCategories, AdminInterestArea, AdminSkill, AdminUser 
]);

// // catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.render('error')
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;