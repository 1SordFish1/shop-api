const express = require('express');
const app = express();
// const cors = require('cors');
const port = 5000;
const serverless = require('serverless-http');
const env = process.env.ENVIRONMENT || 'dev';
const allowedOrigins = ['http://localhost:4200'];

console.log('env..', env);

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'x-api-key']
// }));

// Handle preflight
// app.options('*', cors());
// app.use(express.json());
// app.use('/data/images', express.static('data/images'));
// const s1 = require('./routes/s1');
// app.use('/s1', s1);

// if (env === 'prod') {
//   // Serverless for Vercel
  // module.exports = serverless(app);
// } else {
//   // Local dev with app.listen
//   app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
//   });
// }
