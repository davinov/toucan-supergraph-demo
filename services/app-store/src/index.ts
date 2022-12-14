import { readFileSync } from "fs";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import type { Resolvers } from "./generated/graphql.js";

import {
  AppsDataSource,
  TenantsDataSource,
} from "./data-sources.js";
import type { AppDocument, TenantDocument } from "./data-sources.js";

const typeDefs = readFileSync("./src/schema.graphql", { encoding: "utf-8" });

export interface ApolloServerContext {
  dataSources: {
    apps: AppsDataSource;
    tenants: TenantsDataSource;
  };
}

const resolvers: Resolvers<ApolloServerContext> = {
  Query: {
    app: (_, { id }, { dataSources }): AppDocument => {
      return dataSources.apps.getById(id);
    },
    appByURL: (_, { url }, { dataSources }) => {
      return dataSources.apps.getByURL(url);
    },
    appsForTenant: (_, { tenantId }, { dataSources }) => {
      return dataSources.apps.getByTenantId(tenantId);
    },
    tenant: (_, { id }, { dataSources }) => {
      return dataSources.tenants.getById(id);
    },
  },
  App: {
    tenant({ tenantId }, _, { dataSources }) {
      return dataSources.tenants.getById(tenantId);
    },
  },
  Tenant: {
    apps({ id: tenantId }, _, { dataSources }) {
      return dataSources.apps.getByTenantId(tenantId);
    },
  },
};

const server = new ApolloServer<ApolloServerContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4001 },
  context: async () => ({
    dataSources: {
      apps: new AppsDataSource(),
      tenants: new TenantsDataSource(),
    },
  }),
});

console.log(`🚀  App-store server ready at: ${url}`);
