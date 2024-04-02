const express = require('express');
const app = express();

// Routing and proxying logic will be added here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});