const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);

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

// Tell express to use the webpack-dev-middleware and use the webpack.dev.js
// configuration file as a base.
// app.use(
//     webpackDevMiddleware(compiler, {
//         publicPath: config.output.publicPath
//     })
// );

// routes
app.get('/a', (req, res) => {
    // res.send('./public/index.html');
    res.render('login.ejs');
});
