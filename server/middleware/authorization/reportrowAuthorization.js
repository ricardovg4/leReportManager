const reportrowAuthorization = (req, res, next) => {
    const { username, role, permissions } = res.locals.user;
    // Cs representative check
    const csRepresentativeCheck =
        role === 'cs representative' && username === req.params.username;
    if (csRepresentativeCheck) {
        next();
    } else if (!csRepresentativeCheck) {
        res.status(400).json({ msg: 'unauthorized' });
    }
};

module.exports = reportrowAuthorization;
