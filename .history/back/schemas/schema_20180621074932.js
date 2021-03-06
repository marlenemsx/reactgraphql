const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphql = require("graphql");

// Maps id to User object
const fakeDatabase = {
  a: {
    id: "a",
    firstname: "Julien"
  },
  b: {
    id: "b",
    firstname: "Romain"
  }
   c: {
    id: "c",
    firstname: "Yann"
  }
};

// Define the User type
const userType = new graphql.GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: graphql.GraphQLString },
    firstname: { type: graphql.GraphQLString }
  }
});

// Define the Query type
const queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: userType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: (_, { id }) => fakeDatabase[id]
    }
  }
});

const schema = new graphql.GraphQLSchema({ query: queryType });

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(5000);
console.log("Running a GraphQL API server at localhost:5000/graphql");
