const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const allowedOrigins = ['http://localhost:4200'];

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

module.exports = app;
// if (process.env.ENVIRONMENT === "prod") {
//   module.exports = app;
// } else {
//   app.listen(port, () => {
//     console.log(`Shop app listening at http://localhost:${port}`);
//   });
// }

