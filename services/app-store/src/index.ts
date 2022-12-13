import { readFileSync } from 'fs';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import type {
  Tenant,
  Resolvers,
} from './generated/graphql.js';

import { AppsDataSource, TenantsDataSource } from './data-sources.js';
import type { AppDocument, TenantDocument } from './data-sources.js';

const typeDefs = readFileSync('./src/schema.graphql', { encoding: 'utf-8' });

export interface ApolloServerContext {
  dataSources: {
    apps: AppsDataSource;
    tenants: TenantsDataSource;
  };
}

const resolvers: Resolvers = {
  Query: {
    app: (_, { id }, { dataSources }): AppDocument => {
      return dataSources.apps.getById(id);
    },
    appsForTenant: (_, { tenantId }, { dataSources }) => {
      return dataSources.apps.getByTenantId(tenantId);
    },
    tenant: (_, { id }, { dataSources }) => {
      return dataSources.tenants.getById(id);
    },
  },
  App: {
    tenant({ tenantId }: AppDocument, _, { dataSources }): Partial<Tenant> {
      return dataSources.tenants.getById(tenantId);
    },
  },
  Tenant: {
    apps({ id: tenantId }: Tenant, _, { dataSources }) {
      return dataSources.apps.getByTenantId(tenantId);
    },
  },
};

const server = new ApolloServer<ApolloServerContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => ({
    dataSources: {
      apps: new AppsDataSource(),
      tenants: new TenantsDataSource(),
    }
  })
});

console.log(`🚀  App-store server ready at: ${url}`);
