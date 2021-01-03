const mongoose = require('mongoose');

const skuStatusSchema = new mongoose.Schema(
    {
        sku: {
            type: String,
            required: true
        },
        warehouse: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// export model
module.exports = mongoose.model('skuStatus', skuStatusSchema);
