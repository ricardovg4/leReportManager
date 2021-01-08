// dotenv if on development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const router = express.Router();
const userReportrowModel = require('../../models/reportrow.model');
const reportrowAuthorization = require('../../middleware/authorization/reportrowAuthorization');

// Middleware for all
router.use('/:username', reportrowAuthorization);

// find all, get
// router.get('/', (req, res) => {
router.get('/:username', (req, res) => {
    const username = req.params.username;
    const Reportrow = userReportrowModel(username);
    // if query string, perform a DB find query
    const {
        systemReferenceNumber,
        systemReferenceOrigin,
        customerEmail,
        customerPhone,
        caseStatus,
        startDate,
        endDate
    } = req.query;
    const query = {
        ...(systemReferenceNumber
            ? { 'systemReferenceNumber.number': systemReferenceNumber }
            : null),
        ...(systemReferenceOrigin
            ? { 'systemReferenceNumber.origin': systemReferenceOrigin }
            : null),
        ...(customerEmail ? { customerEmail } : null),
        ...(customerPhone ? { customerPhone } : null),
        ...(caseStatus ? { caseStatus } : null),
        ...(startDate && endDate
            ? { date: { $gte: new Date(startDate), $lte: new Date(endDate) } }
            : null)
    };
    console.log(query);
    Reportrow.find({ ...query })
        // exclude fields form response
        .select('-createdAt -updatedAt -__v')
        .then((row) => {
            return res.status(200).json(row);
        })
        .catch((e) => {
            return res.status(400).json({ msg: e });
        });
});

// create one, post
router.post('/:username', async (req, res) => {
    const {
        issue,
        customerName,
        customerPhone,
        customerEmail,
        source,
        // responseMethod,
        response,
        comments,
        requestToCt,
        caseStatus,
        follower,
        solution
    } = req.body;
    if (!issue || !source || !caseStatus) {
        return res
            .status(400)
            .json({ msg: `Please enter all required fields.${missing}` });
    }
    try {
        const username = req.params.username;
        const Reportrow = userReportrowModel(username);
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
router.get('/:username/:id', async (req, res) => {
    console.log(req.params);
    console.log(req.query);
    const username = req.params.username;
    const Reportrow = userReportrowModel(username);
    const id = req.params.id;
    try {
        Reportrow.findById(id)
            .then((row) => {
                res.status(200).json(row);
            })
            .catch((e) => {
                res.status(400).json({ msg: "couldn't find document" });
            });
    } catch (error) {
        res.status(400).json({ msg: error });
    }
});

// update one, put
router.put('/:username/:id', async (req, res) => {
    const username = req.params.username;
    const Reportrow = userReportrowModel(username);
    const id = req.params.id;
    const updatedRow = req.body;
    if (updatedRow.date) {
        delete updatedRow.date;
    }
    Reportrow.findByIdAndUpdate(id, updatedRow)
        .then(() => {
            res.status(200).json({ msg: `${id} updated` });
        })
        .catch((e) => {
            res.status(400).json({ msg: "couldn't update}" });
        });
});

// delete one, delete
router.delete('/:username/:id', (req, res) => {
    const username = req.params.username;
    const Reportrow = userReportrowModel(username);
    const id = req.params.id;
    Reportrow.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ msg: `${id} deleted.` });
        })
        .catch((e) => {
            res.status(400).json({ msg: `couldn't delete` });
        });
});

// WARNING
// router.delete('/deleteall', (req, res) => {
//     Reportrow.deleteMany({})
//         .then(() => {
//             console.log('all deleted');
//             res.status(200).json({ msg: 'all deleted' });
//         })
//         .catch((e) => console.log(e));
// });

module.exports = router;
