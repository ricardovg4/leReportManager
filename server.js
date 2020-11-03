const express = require('express');
const path = require('path');

const app = express();

// dotenv if on development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Serve the files on port 3000.
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`App listening on port ${process.env.PORT}!\n`);
});

// use ejs
app.set('view-engine', 'ejs');

app.use('/bulma', express.static(__dirname + '/node_modules/bulma/css/'));

// routes
app.get('/', (req, res) => {
    // res.send('./public/index.html');
    res.render('login.ejs');
});
