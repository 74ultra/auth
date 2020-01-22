const db = require('../data/db.js');

function find() {
    return db('users').select('id', 'username')
}

module.exports = {
    find
}