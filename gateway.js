const express = require('express');
const app = express();
const axios = require('axios');

// Routing and proxying logic will be added here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

app.get('/api/:service', (req, res) => {
  const serviceName = req.params.service;
  const serviceUrl = `http://localhost:3001/${serviceName}`;
axios.get(serviceUrl)
  .then(response => {
    res.send(response.data);
  })
  .catch(error => {
    res.status(500).send('Error proxying request');
  });
  res.send(`Proxying request to ${serviceName} service`);
});