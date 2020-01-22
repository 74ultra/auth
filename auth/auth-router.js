const express = require('express');
const Users = require('../users/users-model.js');
const bcrypt = require('bcryptjs')

const router = express.Router();

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    Users.insert({ username, password: bcrypt.hashSync(password, 8) })
        .then(id => {
            res.status(201).json({ message: `User ${username} registered`, id })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'There was an error registering the user'})
        })
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('req.body', req.body)
    Users.findByUserName(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)){
                res.status(200).json({ message: `Welcome, ${username}`})
            } else {
                res.status(401).json({ message: 'Invalid credentials' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: `Error logging in`})
        })

})

module.exports = router;
