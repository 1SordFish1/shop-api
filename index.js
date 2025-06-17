const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const allowedOrigins = ['http://localhost:4200', 'https://shop-seven-amber.vercel.app/'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-key']
}));

// Handle preflight
app.options('*', cors());
app.use(express.json());
app.use('/data/images', express.static('data/images'));
const s1 = require('./routes/s1');
app.use('/s1', s1);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;