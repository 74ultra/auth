const router = require('express').Router();
const Users = require('./users-model.js');
const Ausers = require('./auser-model.js')
const restrict = require('../auth/restrict.js')

router.get('/', restrict, (req, res) => {
    console.log('Hello')
    Ausers.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: `There was an error retrieving users`})
        })
})

module.exports = router;