// dotenv if on development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = require('./app');

// mongoDB connection
const mongoose = require('mongoose');
const mongoDB = process.env.dbUrl
    ? process.env.dbUrl
    : "there's no mongoDB URL as a ENV variable";
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// start the server by listening on PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`App listening on port ${process.env.PORT}!\n`);
});
