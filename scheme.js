const { gql } = require("apollo-server-express");

const users = [
  { id: 1, name: "a", age: 2 },
  { id: 2, name: "b", age: 2 },
  { id: 3, name: "c", age: 2 },
];

// The GraphQL schema
const typeDefs = gql`
  type User {
    name: String
    id: Int
    age: Int
  }
  type Query {
    hello: String
    users: [User]
  }

  type Mutation {
    createUser(name: String!, age: Int!): User
    deleteUser(id: Int!): Boolean
    updateUser(id: Int!, name: String, age: Int): Boolean
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",
    users: () => users,
  },
  Mutation: {
    createUser: (parent, args) => {
      const { name, age } = args;
      const user = { id: users.length + 1, name, age };
      users.push(user);
      return user;
    },

    deleteUser: (parent, args) => {
      const { id } = args;

      let response = false;

      const findIndex = users.findIndex((user) => user.id === id);

      if (findIndex != -1) {
        users.splice(findIndex, 1);
        response = true;
      }
      return response;
    },

    updateUser: (parent, args) => {
      const { id, name, age } = args;
      let response = false;

      const findIndex = users.findIndex((user) => user.id === id);

      if (findIndex !== -1) {
        if (name) {
          users[findIndex].name = name;
          response = true;
        }
        if (age) {
          users[findIndex].age = age;
          response = true;
        }
      }
      return response;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
