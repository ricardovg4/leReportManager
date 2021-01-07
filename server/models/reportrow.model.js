const mongoose = require('mongoose');

// child
const systemReferenceNumber = new mongoose.Schema({
    origin: {
        type: String
    },

    number: {
        type: String,
        required: true
    }
});

const reportrowSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            default: Date.now,
            required: true
        },
        // array syntax needed for when the child may be called more than 1 time
        // country: {
        //     type: String,
        //     enum: ['us', 'uk', 'ca', 'de'],
        //     required: true
        // },
        systemReferenceNumber: [systemReferenceNumber],
        issue: {
            type: String,
            required: true
        },
        customerName: {
            type: String
        },
        customerPhone: {
            type: String
        },
        customerEmail: {
            type: String
        },
        source: {
            type: String,
            required: true
        },
        // responseMethod: {
        //     type: String
        // },
        response: {
            type: String
        },
        requestToCt: {
            type: String
        },
        caseStatus: {
            type: String,
            enum: ['pending', 'waiting for cs answer', 'solved'],
            required: true
        },
        follower: {
            type: String
        },
        solution: {
            type: String
        }
    },
    { timestamps: true }
);

const userReportrowModel = (user) => {
    return mongoose.model(`${user}Reportrow`, reportrowSchema);
};

// module.exports = mongoose.model('reportrow', reportrowSchema);
module.exports = userReportrowModel;
