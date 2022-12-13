import { readFileSync } from 'fs';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';

import apps from './data/apps.json' assert { type: 'json' };
import tenants from './data/tenants.json' assert { type: 'json' };

const typeDefs = gql(
    readFileSync('./src/schema.graphql', { encoding: 'utf-8' })
);

const resolvers = {
  Query: {
    app: (_parent, args, _contextValue, _info) => {
        return apps.find(a => a.id == args.id);
    },
    appsForTenant: (_parent, args, _contextValue, _info) => {
        return apps.filter(a => a.tenantId == args.tenantId);
    },
  },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  App-store server ready at: ${url}`);
