import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import User from '../../models/user.js';
import UserType from '../graphql/userType.js'; // Typ użytkownika

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType), // Zwraca listę użytkowników
            resolve(parent, args) {
                return User.find(); // Pobierz wszystkich użytkowników z MongoDB
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLInt } }, // Argument ID do wyszukiwania użytkownika
            async resolve(parent, args) {
                const user = await User.findOne({ id: args.id });
                if (!user) {
                    throw new Error(`Użytkownik o ID ${args.id} nie został znaleziony.`);
                }
                return user;
            }
        }
    }
});

// Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                try {
                    const nextId = await User.generateNextId(); // Wygeneruj kolejne ID

                    const user = new User({
                        id: nextId,
                        firstName: args.firstName,
                        lastName: args.lastName,
                        email: args.email
                    });

                    return await user.save(); // Zapisz nowego użytkownika do bazy danych
                } catch (err) {
                    throw new Error(`Błąd podczas dodawania użytkownika: ${err.message}`);
                }
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            async resolve(parent, args) {
                try {
                    const updatedUser = await User.findOneAndUpdate(
                        { id: args.id }, // Znajdź użytkownika po ID
                        { $set: args },  // Zaktualizuj dane na podstawie argumentów
                        { new: true }    // Zwróć zaktualizowany dokument
                    );

                    if (!updatedUser) {
                        throw new Error(`Użytkownik o ID ${args.id} nie został znaleziony.`);
                    }

                    return updatedUser;
                } catch (err) {
                    throw new Error(`Błąd podczas aktualizacji użytkownika: ${err.message}`);
                }
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            async resolve(parent, args) {
                try {
                    const deletedUser = await User.findOneAndDelete({ id: args.id });
                    if (!deletedUser) {
                        throw new Error(`Użytkownik o ID ${args.id} nie został znaleziony.`);
                    }

                    return deletedUser;
                } catch (err) {
                    throw new Error(`Błąd podczas usuwania użytkownika: ${err.message}`);
                }
            }
        }
    }
});

export { RootQuery, Mutation };
