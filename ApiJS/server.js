import express from 'express';
const app = express();
app.use(express.json());

let users =[
    {id: 1, name: 'John', email: 'john@gmail.com'},
    {id: 2, name: 'Doe' , email: 'doe@gmail.com'},
    {id: 3, name: 'Smith', email: 'smith@gmail.com'},
];

app.get('/api/users', (_, res) => {
    res.json(users);
});

app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if(!user) {
        return res.status(404).json({message: 'User not found'});
    }
    res.json(user);
});

app.post('/api/users', (req, res) => {
    const {name, email} = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email,
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {name, email} = req.body;

    let user = users.find(user => user.id === id);
    if(!user) {
        return res.status(404).json({message: 'User not found'});
    }

    user.name = name;
    user.email = email;
    res.json(user);
});

app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(user => user.id !== id);
    res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan pada http://localhost:${PORT}`);
});