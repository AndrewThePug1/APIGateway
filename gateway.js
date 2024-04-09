const express = require('express');
const app = express();

app.get('/service1', (req, res) => {
  res.send('Response from Service 1');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Service 1 running on port ${PORT}`);
});