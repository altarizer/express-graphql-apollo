import { bodyParserGraphQL } from "body-parser-graphql";

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import resolvers from "../src/graphql/resolvers.js";
import compression from "compression";
import fs from "fs";

const typeDefs = fs.readFileSync("./src/graphql/schema.graphql", {
  encoding: "utf-8",
});

const port = 8000;
const app = express();
const httpServer = http.createServer(app);

app.use(bodyParserGraphQL());
app.use(compression()); 

startApolloServer(typeDefs, resolvers)

async function startApolloServer(typeDefs, resolvers) {

  // Same ApolloServer initialization as before
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true, // enable checking scheme, default: true
    playground: true, // enable playgorund default: true 
  });
  // Ensure we wait for our server to start
  await server.start()

  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );
  
  await new Promise((resolve) => httpServer.listen({ port: port }, resolve));
  console.log(`💩 Server ready at: http://localhost:${port}/graphql`);
}
