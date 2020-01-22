const express = require('express');
const server = express();

server.use(express.json());

const authRouter = require('./auth/auth-router.js')

server.use('/auth', authRouter);

const port = 6000;

server.listen(port, () => console.log(`Server running on port ${port}`))