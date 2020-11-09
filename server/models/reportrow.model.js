const mongoose = require('mongoose');

const systemReferenceNumber = new mongoose.Schema({
    orderidAmazon: {
        type: String
    },
    orderidMagento: {
        type: String
    },
    asin: {
        type: String
    },
    sku: {
        type: String
    }
});
const reportrowSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            default: Date.now(),
            required: true
        },
        systemReferenceNumber: systemReferenceNumber,
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
        responseMethod: {
            type: String
        },
        response: {
            type: String
        },
        comments: {
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

module.exports = mongoose.model('reportrow', reportrowSchema);
