import { readFileSync } from 'fs';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import apps from './data/apps.json' assert { type: 'json' };
import tenants from './data/tenants.json' assert { type: 'json' };

import type {
  Tenant,
  Resolvers,
} from './generated/graphql.js';

const typeDefs = readFileSync('./src/schema.graphql', { encoding: 'utf-8' });

type AppDocument = {
  id: string;
  name: string;
  url: string;
  tenantId: string;
}

const resolvers: Resolvers = {
  Query: {
    app: (_, { id }): AppDocument => {
      return apps.find((a) => a.id === id);
    },
    appsForTenant: (_, { tenantId }) => {
      return apps
        .filter((a) => a.tenantId == tenantId);
    },
    tenant: (_, { id }) => {
      return tenants.find((t) => t.id === id);
    },
  },
  App: {
    tenant({ tenantId }: AppDocument): Partial<Tenant> {
      return tenants.find((t) => t.id === tenantId);
    },
  },
  Tenant: {
    apps({ id }: Tenant) {
      return apps.filter((a) => a.tenantId == id);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  App-store server ready at: ${url}`);
