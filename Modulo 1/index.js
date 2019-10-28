const express = require('express');

const server = express();

server.use(express.json());

const users = ['Samuel', 'Thiago', 'Lucas'];

//busca todos os usuários
server.get('/users', (req, res) => {
    return res.json(users);
});

//busca único usuário
server.get('/users/:index', (req, res) => {
    const { index } = req.params;

    return res.json(users[index]);
});

//criar usuário
server.post('/users', (req, res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
});

//alterar usuário
server.put('/users/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
});

//deletar usuário
server.delete('/users/:index', (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);

    return res.send();
});

server.listen(3000);