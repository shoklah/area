var express = require('express');
const bodyParser = require("body-parser");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var firebase = require("firebase-admin");
const cors = require('cors');

var app = express();

var serviceAccount = require("./serviceAccountKey.json");

require('./about')(app);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://area-firebase.firebaseio.com"
});

var auth = firebase.auth();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// require('./auth')(app, auth);

require("./routes/services.routes")(app);

module.exports = app;
