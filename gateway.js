const express = require('express');
const app = express();
const axios = require('axios');

// Middleware for request transformation
const transformRequest = (req, res, next) => {
  // Modify headers
  req.headers['X-Custom-Header'] = 'Hello from API Gateway';
  // Modify query parameters
  req.query.apiKey = 'your-api-key';
  next();
};

// Routing and proxying logic
app.get('/api/:service', transformRequest, (req, res) => {
  const serviceName = req.params.service;
  const serviceUrl = `http://localhost:3001/${serviceName}`;
  axios.get(serviceUrl, {
    headers: req.headers,
    params: req.query
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.status(500).send('Error proxying request');
    });
});

// Response aggregation route
app.get('/api/aggregate', (req, res) => {
  const service1Url = 'http://localhost:3001/service1'; // Assuming service1 responds at this endpoint
  const service2Url = 'http://localhost:3002/service2'; // Assuming service2 responds at this endpoint

  const requests = [
    axios.get(service1Url, { params: req.query }), // Forward any query params received
    axios.get(service2Url, { params: req.query })
  ];

  Promise.all(requests)
    .then(responses => {
      res.json(responses.map(response => response.data));
    })
    .catch(error => {
      res.status(500).send('Error making requests to services');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
