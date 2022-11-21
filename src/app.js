import express from "express";
import { ApolloServer } from "apollo-server-express";
import { bodyParserGraphQL } from "body-parser-graphql";
import resolvers from "../src/graphql/resolvers.js";
import compression from "compression";
import fs from "fs";

const typeDefs = fs.readFileSync("./src/graphql/schema.graphql", {
  encoding: "utf-8",
});

const port = 8000;
const app = express();

app.use(bodyParserGraphQL());
app.use(compression());

startApolloServer(typeDefs, resolvers)

async function startApolloServer(typeDefs, resolvers) {
  // Same ApolloServer initialization as before
  const server = new ApolloServer({ 
    typeDefs, resolvers, 
    introspection: true, // enable checking scheme, default: true
    playground: true, // enable playgorund default: true 
  });

  // Required logic for integrating with Express
  await server.start();

  const app = express();

  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  // Modified server startup
  await new Promise(resolve => app.listen({ port: port }, resolve));
  console.log(`💩 Server ready at http://localhost:${port}${server.graphqlPath}`);
}
