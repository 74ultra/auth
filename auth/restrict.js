const bcrypt = require('bcryptjs');
const Users = require('../users/users-model')


module.exports = (req, res, next) => {
    if(req.session && req.session.user) {
        next()
    } else {
        res.status(403).json({ message: 'Not authorized'})
    }
}