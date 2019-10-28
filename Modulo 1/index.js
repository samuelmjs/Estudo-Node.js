const express = require('express');

const server = express();

server.use(express.json());


server.get('/users', (req, res) => {
    return res.json({ message: 'ola'});
})

server.listen(3000);