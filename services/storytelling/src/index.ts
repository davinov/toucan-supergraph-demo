import { readFileSync } from "fs";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import type { Resolvers } from "./generated/graphql.js";

import {
  AppsDataSource,
  DatasetsDataSource,
} from "./data-sources.js";
import type { AppDocument } from "./data-sources.js";

const typeDefs = readFileSync("./src/schema.graphql", { encoding: "utf-8" });

export interface ApolloServerContext {
  dataSources: {
    apps: AppsDataSource;
    datasets: DatasetsDataSource;
  };
}

const resolvers: Resolvers<ApolloServerContext> = {
  Query: {
    visualization: (_, { appUrl, visualizationId }, { dataSources }) => {
      return dataSources.apps.getByURL(appUrl).visualizations.find((v) => v.id === visualizationId)
    },
  },
  App: {
    datasets({ id }, _, { dataSources }) {
      return dataSources.datasets.listForAppId(id);
    },
  },
  Visualization: {
    type({ type }) {
      return type;
    },
    dataset({ datasetId }, _, { dataSources }) {
      return dataSources.datasets.getById(datasetId);
    },
  },
};

const server = new ApolloServer<ApolloServerContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4002 },
  context: async () => ({
    dataSources: {
      apps: new AppsDataSource(),
      datasets: new DatasetsDataSource(),
    },
  }),
});

console.log(`🚀  App-store server ready at: ${url}`);
