# REST API & GraphQL Project

This project contains a Node.js REST API with 5 HTTP methods and a GraphQL API with Query and Mutation capabilities.

## Data Structure
- `id` (ID)
- `name` (String)
- `age` (Number)
- `gender` (String)

## Project Files
- `server.js` - Main Express server entrypoint
- `restapi.js` - REST API endpoints (GET all, GET by ID, POST, PUT, DELETE)
- `graphql.js` - GraphQL schema and resolvers (Query & Mutation)
- `package.json` - Dependencies and scripts

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

## Endpoints
- **REST API:** `http://localhost:3000/api/users`
- **GraphQL API:** `http://localhost:3000/graphql`
