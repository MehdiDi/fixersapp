const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const categories = require('./routes/api/categories');
const annonces = require('./routes/api/annonces');
const offers = require('./routes/api/offers');
const path = require('path');



const app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const db = require('./config/keys').dbURI;
mongoose.connect(db)
        .then(() => console.log('Connected to database.'))
        .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', users);
app.use('/api/categories', categories);
app.use('/api/annonces', annonces);
app.use('/api/offers', offers);

const server = app.listen(port, () => {
    console.log('Server listening to port ' + port);
});

const wsHandler = require('./socketIO/wsHandler');

const _wsHandler = new wsHandler(server);
_wsHandler.listenEvents();

app.set('_wsHandler', _wsHandler);