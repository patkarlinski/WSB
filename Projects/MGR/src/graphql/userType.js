import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import User from '../../models/user.js';

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

export default UserType;
