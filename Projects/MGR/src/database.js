import mongoose from 'mongoose'


// Funkcja do jawnego tworzenia kolekcji
const createCollection = async () => {
    try {
        const db = mongoose.connection.db;

        // Sprawdź, czy kolekcja już istnieje
        const collections = await db.listCollections({ name: 'users' }).toArray();
        if (collections.length === 0) {
            await db.createCollection('users');
            console.log('Kolekcja "users" została utworzona.');
        } else {
            console.log('Kolekcja "users" już istnieje.');
        }
    } catch (err) {
        console.error('Błąd podczas tworzenia kolekcji:', err.message);
    }
};


const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');
        console.log('Sucesfull connnect with MongoDB !');
    } catch (err) {
        console.error('Error while connecting to MongoDB:', err);
    }

    // Event handle
    mongoose.connection.on('disconnected', () => {
        console.log('The connection to MongoDB has been disconnected.');
    });

    mongoose.connection.on('reconnected', () => {
        console.log('The connection to MongoDB has been re-established.');
    });
};


export  {connectToDatabase, createCollection }
