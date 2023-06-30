const express = require("express");
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;
const connect = require("./src/database/connect");
const configPassport = require("./src/auth/configPassport");
const User = require('./src/database/schemas/User');

const morgan = require("morgan");
const path = require('path');
const passport = require("passport");
const flash = require('connect-flash');
const router = require("./src/routes");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

configPassport(passport, User);
app.use(morgan("dev"));
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require('express-session')({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

async function start() {
  try {
    await connect(uri);
    app.listen(port, console.log(`http://localhost:${port}`));
  } catch (error) {
    console.error(error.message);
  }
}

start();