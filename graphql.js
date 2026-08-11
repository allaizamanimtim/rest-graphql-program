const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { users, generateId } = require('./restapi');

// ==========================================
// GRAPHQL API (Send & Receive Only)
// ==========================================

// Schema Definition
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    age: Int!
    gender: String!
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, age: Int!, gender: String!): User
  }
`);

// Resolvers
const rootResolvers = {
  // Receive Data (Query)
  getUsers: () => users,
  getUser: ({ id }) => users.find(u => u.id === id),
  
  // Send Data (Mutation)
  createUser: ({ name, age, gender }) => {
    const newUser = {
      id: generateId(),
      name,
      age: Number(age),
      gender
    };
    users.push(newUser);
    return newUser;
  }
};

// Express Middleware export
module.exports = graphqlHTTP({
  schema: schema,
  rootValue: rootResolvers,
  graphiql: true
});
