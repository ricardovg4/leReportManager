const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now()
        }
    },
    {
        timestamps: true
    }
);

// export model
module.exports = mongoose.model('users', usersSchema);
