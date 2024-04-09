const express = require('express');
const app = express();

app.get('/service2', (req, res) => {
  res.send('Response from Service 2');
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Service 2 running on port ${PORT}`);
});