const express = require('express');
const cors = require('cors');
const session = require('express-session') // allows creation of cookie sessions
const KnexSessionStore = require('connect-session-knex')(session);
const db = require('./data/db.js')


// some middleware invoked as functions as they can be passed config options

// cookie config
const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'test secret', // determines how we encrypt/decrypt the cookie
    name: 'cookie',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // one day
        secure: process.env.NODE_ENV === 'production' ? true : false, // 'false' is acceptable for development
        httpOnly: true, // prevents javascript manipulation of the cookie
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: db,
        tablename: 'knexsessions',
        sidfieldname: 'sessionid',
        createtable: true,
        clearInterval: 1000 * 60 * 30
    })
}

const server = express();
server.use(cors({
    credentials: true,
    origin: '*'
}));
server.use(express.json());

server.use(session(sessionConfig));

const authRouter = require('./auth/auth-router.js')
server.use('/auth', authRouter);

const usersRouter = require('./users/users-router.js');
server.use('/users', usersRouter);

const port = 6000;

server.listen(port, () => console.log(`Server running on port ${port}`))