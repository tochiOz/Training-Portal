const createError = require('http-errors');
const express = require('express');
const chalk = require('chalk')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const session = require('express-session');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')(session)
dotenv.config()

// database connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}, function(err, client) {
  if (err) console.log(err);
  console.log(chalk.red('Connection passed'));
})

let db = mongoose.connection;

db.once('open', () => console.log('Connected to database'));

// checks if connection to db is a success
db.on('error', console.error.bind(console, 'Database connection error:'));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin')

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({ defaultLayout: 'template', extname: '.hbs'}))
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: true,
    store: new MongoStore({
      mongooseConnection: db
    })
  })
)

//Express Messages middleware
app.use(require('connect-flash')())
app.use(function ( req, res, next) {
  res.locals.message = require('express-messages')(req, res)
  next();
})

//setting routes
app.use('/', indexRouter);
app.use('/trainee', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('error')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
