const express = require('express');
const cors = require('cors');
const restApi = require('./restapi');
const graphqlMiddleware = require('./graphql');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mount REST API routes (/api/users)
app.use('/api/users', restApi.router);

// Mount GraphQL API route (/graphql)
app.use('/graphql', graphqlMiddleware);

// Start Server
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(` Server is running on http://localhost:${PORT}`);
  console.log(` REST API:    http://localhost:${PORT}/api/users`);
  console.log(` GraphQL API: http://localhost:${PORT}/graphql`);
  console.log(`===================================================`);
});
