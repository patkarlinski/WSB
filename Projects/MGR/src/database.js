import mongoose from 'mongoose';

// Funkcja do połączenia z MongoDB
const connectToDatabase = async () => {
    try {
        // Użyj zmiennej środowiskowej MONGO_URI lub domyślnego URI
        const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydatabase';
        
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout na 5 sekund
        });

        console.log(`Połączono z bazą danych MongoDB pod adresem: ${mongoUri}`);
    } catch (err) {
        console.error('Błąd podczas łączenia z bazą danych:', err.message);
    }

    // Obsługa zdarzeń połączenia
    mongoose.connection.on('disconnected', () => {
        console.log('Połączenie z MongoDB zostało rozłączone.');
    });

    mongoose.connection.on('reconnected', () => {
        console.log('Połączenie z MongoDB zostało ponownie ustanowione.');
    });
};

// Funkcja do jawnego tworzenia kolekcji
const createCollection = async () => {
    try {
        const db = mongoose.connection.db;

        // Sprawdź, czy połączenie do bazy danych istnieje
        if (!db) {
            throw new Error('Brak połączenia z bazą danych.');
        }

        // Sprawdź, czy kolekcja "users" już istnieje
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

export { connectToDatabase, createCollection };
