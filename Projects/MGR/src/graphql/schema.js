import { GraphQLSchema } from 'graphql';
import { RootQuery, Mutation } from './resolver.js';

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

export default schema;
