const express = require('express');
const router = express.Router();
const Reportrow = require('../../models/reportrow.model');

// find all, get
// router.get("/", userControllr.findAll);

// create one, post
router.post('/', async (req, res) => {
    const { issue, customerName, customerPhone, customerEmail, source, responseMethod, response, comments, requestToCt, caseStatus, follower, solution } = req.body;
    if (!issue || !source || !caseStatus) {
        return res.status(400).json({ msg: 'Please enter all required fields.' });
    }
    try {
        const newReportrow = new Reportrow({ ...req.body });
        newReportrow
            .save()
            .then(() => {
                console.log('row registered');
                res.status(200).json({ msg: 'row entered successfully.' });
            })
            .catch((e) => {
                res.status(400).json({ msg: e });
            });
    } catch (e) {
        res.status(400).json({ msg: e });
    }
});

// find one, get
// router.get("/:id", userControllr.findOne);

// update one, put
// router.put("/:id", userControllr.UpdateUser);

// delete one, delete
// router.delete("/:id", userControllr.delete);

module.exports = router;
