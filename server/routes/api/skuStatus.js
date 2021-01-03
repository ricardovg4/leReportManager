const SkuStatus = require('../../models/skuStatus.model');
const express = require('express');
const router = express.Router();

// router.post('/', (req, res) => {
//     console.log(req.body);
//     SkuStatus.insertMany(req.body).then(() => {
//         console.log('inserted');
//     });
// });

router.get('/:sku', (req, res) => {
    // const { sku } = req.body;
    const sku = req.params.sku;
    console.log(sku);
    SkuStatus.find({ sku: { $regex: sku, $options: 'i' } })
        .select('-createdAt -updatedAt -__v -_id')
        .then((sku) => {
            return res.status(200).json(sku);
        })
        .catch((e) => {
            return res.status(400).json({ msg: e });
        });
});

module.exports = router;
