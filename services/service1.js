const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Service 1');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Service 1 running on port ${PORT}`);
});