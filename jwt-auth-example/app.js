const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Secret key for signing JWT
const SECRET_KEY = 'your_secret_key';

// Mock user data for demonstration
const users = [
  {
    id: 1,
    username: 'john',
    password: 'password123' // In a real-world scenario, passwords should be hashed.
  }
];

// Route to login and get a JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received username:', username);
  console.log('Received password:', password);

  // Check if user exists
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Create JWT payload
  const payload = {
    id: user.id,
    username: user.username
  };

  // Sign the token with a 1-hour expiration time
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

  // Return the token
  res.json({ token });
});

// Route to get protected data (requires a valid JWT)
app.get('/protected', (req, res) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization header:', authHeader); // Log the token received
  
  if (!authHeader) {
    return res.status(403).json({ message: 'Token is required' });
  }

  // Extract the token from the 'Bearer <token>' format
  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err); // Log error details
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Return protected data
    res.json({ message: 'This is protected data', user: decoded });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
