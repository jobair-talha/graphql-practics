const { gql } = require("apollo-server-express");
const User = require("./models/userModel");

// The GraphQL schema
const typeDefs = gql`
  type User {
    name: String
    id: ID
    age: Int
  }
  type Query {
    users: [User]
  }

  type Mutation {
    createUser(name: String!, age: Int!): User
    deleteUser(id: ID!): Boolean
    updateUser(id: ID!, name: String, age: Int): Boolean
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({});
      return users;
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const { name, age } = args;
      const user = new User({ name, age });
      await user.save();
      return user;
    },

    deleteUser: async (parent, args) => {
      const { id } = args;

      let response = false;

      const delete_user = await User.findByIdAndDelete({ _id: id });

      if (delete_user) {
        response = true;
      }

      return response;
    },

    updateUser: async (parent, args) => {
      const { id, name, age } = args;
      let response = false;

      const userData = {
        _id: id,
        name,
        age,
      };

      const updated_data = await User.findByIdAndUpdate(
        { _id: id },
        { $set: userData }
      );

      if (updated_data) {
        response = true;
      }
      return response;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
