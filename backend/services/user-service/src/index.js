const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

const users = [];
const JWT_SECRET = 'your-secret-key'; // In a real app, use a more secure secret from env variables

app.get('/', (req, res) => {
  res.send('User service is running');
});

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send('Please provide name, email, and password.');
  }

  if (users.find(user => user.email === email)) {
    return res.status(400).send('User with this email already exists.');
  }

  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);

  res.status(201).send('User created successfully.');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Please provide email and password.');
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).send('Invalid credentials.');
  }

  const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.listen(port, () => {
  console.log(`User service listening at http://localhost:${port}`);
});
