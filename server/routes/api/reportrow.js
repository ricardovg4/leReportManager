// dotenv if on development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/users.model');
const createReportrowModel = require('../../models/reportrow.model');

const retrieveUserId = async (token) => {
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;

        // Get user's id
        const user = await User.findById(id);
        console.log('user find');
        if (user) {
            return user.username;
        }
    }
};

// find all, get
router.get('/', async (req, res) => {
    const username = await retrieveUserId(req.cookies.jwt);
    const Reportrow = createReportrowModel(username);
    Reportrow.find({})
        // exclude fields form response
        .select('-createdAt -updatedAt -__v')
        .then((row) => {
            return res.status(200).json(row);
        })
        .catch((e) => {
            res.status(400).json({ msg: e });
        });
});

// create one, post
router.post('/', async (req, res) => {
    const {
        issue,
        customerName,
        customerPhone,
        customerEmail,
        source,
        responseMethod,
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
        const username = await retrieveUserId(req.cookies.jwt);
        const Reportrow = createReportrowModel(username);
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
router.get('/:id', async (req, res) => {
    const username = await retrieveUserId(req.cookies.jwt);
    const Reportrow = createReportrowModel(username);
    const id = req.params.id;
    Reportrow.findById(id)
        .then((row) => {
            res.status(200).json(row);
        })
        .catch((e) => {
            res.status(400).json({ msg: "couldn't find document" });
        });
});

// update one, put
router.put('/:id', async (req, res) => {
    const username = await retrieveUserId(req.cookies.jwt);
    const Reportrow = createReportrowModel(username);
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
router.delete('/:id', (req, res) => {
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
