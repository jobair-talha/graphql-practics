const express = require("express");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;

const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./scheme");
const connectDB = require("./config/db");

// connect Database
connectDB();

// start apollo server
const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });
  console.log(
    `Apollo Server Listening on http://localhost:${process.env.PORT}/graphql`
  );
};

app.get("/", (req, res) => {
  res.json({ message: "Sever is Running" });
});

startApolloServer();

app.listen(port, () => {
  console.log(`Server Listening on http://localhost:${port}`);
});
