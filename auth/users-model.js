const db = require('../data/db.js');

function insert(user) {
    return db('users')
        .insert(user, 'id')
        .then(([id]) => id)
}

function findBy(where){
    return db('users')
        .where(where)
}

function findByUserName(username) {
    return db('users')
        .where('username', username).first()
}

module.exports = {
    insert,
    findBy,
    findByUserName
};