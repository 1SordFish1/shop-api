const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const appController = require('./controller/app.controller');
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
// app.use(express.json());
// app.use('/data/images', express.static('data/images'));
// const s1 = require('./routes/s1');
// app.use('/s1', s1);
app.get("/", (req, res) => res.send("Express on Vercel"));
app.get('/hello', appController.hello);
app.get('/products', appController.getProducts);
app.get('/products/:id', appController.getProductById);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;