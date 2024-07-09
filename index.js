const express = require('express');
const app = express();
app.use(express.json());

let users = [
    { id: 1, name: 'Ali' },
    { id: 2, name: 'Ahmad' }
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

app.post('/users', (req, res) => {
    if (!req.body.name) {
        res.status(400).send('Name is required');
    } else {
        let user = {
            id: users.length + 1,
            name: req.body.name
        };
        users.push(user);
        res.send(user);
    }
});

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users[userIndex].name = req.body.name;
        res.json(users[userIndex]);
    } else {
        res.status(404).send('User not found');
    }
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('User not found');
    }
});



app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
