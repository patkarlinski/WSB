import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull } from 'graphql';
import User from './models/user.js';

// Typ użytkownika
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});