const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/:file', (req, res) => {
    const file = req.params.file;
    res.download(path.join(__dirname, '../../public/files/', file), (error) => {
        if (error) {
            res.status(400).json({ msg: 'no file found' });
        }
    });
});

module.exports = router;
