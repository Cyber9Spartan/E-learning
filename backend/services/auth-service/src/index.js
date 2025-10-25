const express = require('express');
const app = express();
app.use(express.json());

app.get('/health', (req,res) => res.json({status:'auth ok'}));
app.post('/login', (req,res) => {
  // demo token
  const user = { id: 1, username: req.body.username || 'demo' };
  res.json({ token: 'demo-token', user });
});

app.get('/profile', (req,res) => {
  res.json({ username: 'demo-user', preferredLanguage: 'en' });
});

const PORT = 4001;
app.listen(PORT, ()=>console.log('Auth service on', PORT));
