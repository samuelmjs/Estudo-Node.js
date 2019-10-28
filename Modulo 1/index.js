const express = require('express');

const server = express();

server.use(express.json());

const users = ['Samuel', 'Thiago', 'Lucas'];

//Middleware Global
server.use((req, res, next) => {
    console.time('Request');
    console.log(`Método: ${req.method}; URL: ${req.url}`);

    next();

    console.timeEnd('Request');
});

//Middleware Local. Verificar body
function checkUserExists(req, res, next) {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ error: 'User name is required' });
    }

    return next();
}

//Middleware Local. Verifica usuário no array
function checkUserInArray(req, res, next) {
    const { index } = req.params;
    const user = users[index];

    if (!user) {
        return res.status(400).json({ error: 'User does not exist' });
    }

    req.user = user;

    return next();
}

//busca todos os usuários
server.get('/users', (req, res) => {
    return res.json(users);
});

//busca único usuário
server.get('/users/:index', checkUserInArray, (req, res) => {
    return res.json(req.user);
});

//criar usuário
server.post('/users', checkUserExists, (req, res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
});

//alterar usuário
server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
});

//deletar usuário
server.delete('/users/:index', checkUserInArray, (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);

    return res.send();
});

server.listen(3000);