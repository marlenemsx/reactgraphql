const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

/**
 * Schéma for User
 */
const schema = buildSchema(`
  type User {
    id: String
    name: String
  }

  type Query {
    user(id: String): User
  }
`);

// Maps id to User object
const fakeDatabase = {
  a: {
    id: "a",
    name: "alice"
  },
  b: {
    id: "b",
    name: "bob"
  }
};

/**
 * Root Query
 */
const root = {
  user: ({ id }) => fakeDatabase[id]
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
