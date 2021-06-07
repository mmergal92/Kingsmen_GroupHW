// DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const port = 3000;
// const filestore = require("session-file-store")(session)


// MIDDLEWARE
// body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'))
// static files middleware
app.use(express.static('public'))
app.use(session({
  // name: "session-id",
  // cookie: { maxAge: 60000, secure: true, httpOnly: true },
  secret: "testingthis", //some random string
  resave: false,
  saveUninitialized: false,
  // store: new filestore()
}));

// CONTROLLERS
// fitting room three
const roomController = require('./controllers/room.js');
app.use('/room', roomController);
// create new users
const userController = require('./controllers/users.js');
app.use('/users', userController);
// new sessions
const sessionController = require('./controllers/sessions.js');
app.use('/sessions', sessionController);


// GET INDEX
app.get('/', (req, res) => {
  req.session.test = 'hey';
  res.render('index.ejs', {});
});


// SEED ROUTE
// NOTE: Do NOT run this route until AFTER you have a create user route up and running, as well as encryption working!
const seed = require('./models/seed.js');
const User = require('./models/users.js');

app.get('/seedAgents', (req, res) => {
  // encrypts the given seed passwords
  seed.forEach((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });
  // seeds the data
  User.create(seed, (err, createdUsers) => {
    // logs created users
    console.log(createdUsers);
    // redirects to index
    res.redirect('/');
  });
});


// CONNECTIONS
app.listen(port, () => {
  console.log('listening on port: ', port);
});

mongoose.connect('mongodb://localhost:27017/kingsman');
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});