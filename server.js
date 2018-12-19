const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const start = require('./routes/api/start');

// const { MongoClient } = require('mongodb');
// const url = 'mongodb://localhost:27017/';

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys_dev').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/start', start);

// app.get('/', (req, res) => res.send('Hello World'));

const port = process.env.PORT || 5002;

app.listen(port, () => console.log(`StartPIM server port:${port}`));
