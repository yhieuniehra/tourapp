// functions/server.js
const express = require('express');
const serverless = require('serverless-http');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { connectdb } = require('../config/connectdb.js');
const router = require('../routes/root.js');
const tripRouter = require('../routes/trip.js');

const app = express();

// Kết nối MongoDB
connectdb();

// Cấu hình middleware
app.set('view engine', "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// Hardcoded credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'baochung123';

// Route to show the login page
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login Page' });
});

// Route to handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check credentials
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    req.session.loggedIn = true;
    req.session.username = username;
    res.redirect('/trips');
  } else {
    res.send('Invalid credentials, please try again.');
  }
});

// Định tuyến cho trang chủ và trips
app.use("/", router);
app.use("/trips", tripRouter);

// Export app dưới dạng một Netlify function
module.exports.handler = serverless(app);
