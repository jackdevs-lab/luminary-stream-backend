require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const stationsRouter = require('./routes/stations');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.VERCEL_URL || 'https://streaming-app-flame.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
app.use(express.static(path.join(__dirname, '../public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'text/javascript');
    }
  }
}));

// Routes
app.use('/api/stations', stationsRouter);

// Serve HTML files (optional for backend-only deployment)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/tv', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/tv.html'));
});

app.get('/radio', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/radio.html'));
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});