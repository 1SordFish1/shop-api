const express = require('express');
const app = express();
const port = 7000;

app.use(express.json());
const s1 = require('./routes/s1');
app.use('/s1', s1);

app.listen(port, () => {
  console.log(`Shop app listening at http://localhost:${port}`);
});
