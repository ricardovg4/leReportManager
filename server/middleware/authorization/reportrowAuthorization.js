const reportrowAuthorization = (req, res, next) => {
    const { username, role, reportPermissions } = res.locals.user;

    switch (role) {
        case 'cs representative':
            if (username === req.params.username) {
                next();
            } else {
                return res.status(400).json({ msg: 'unauthorized' });
            }
            break;
        case 'ct reviewer':
            if (reportPermissions.includes(req.params.username)) {
                next();
            } else {
                return res.status(400).json({ msg: 'unauthorized' });
            }
            break;
        default:
            return res.status(400).json({ msg: 'unauthorized' });
            break;
    }

    // const { username, role, permissions } = res.locals.user;
    // Cs representative check
    // const csRepresentativeCheck =
    //     role === 'cs representative' && username === req.params.username;
    // if (csRepresentativeCheck) {
    //     next();
    // } else if (!csRepresentativeCheck) {
    //     res.status(400).json({ msg: 'unauthorized' });
    // }
};

module.exports = reportrowAuthorization;
