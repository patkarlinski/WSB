import app from './server.js'
import { connectToDatabase, createCollection } from './database.js';
import seedDatabase from './seeds.js';

const startApp = async () => {
    try {
        // Połączenie z bazą danych
        await connectToDatabase();
        console.log('Połączono z bazą danych.');

        // Tworzenie kolekcji
        await createCollection();
        console.log('Kolekcje zostały utworzone.');

        // Seedowanie bazy danych
        await seedDatabase();
        console.log('Baza danych została zainicjalizowana.');

        // Uruchomienie serwera
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Aplikacja nasłuchuje na porcie ${PORT}`);
        });
    } catch (err) {
        console.error('Błąd podczas uruchamiania aplikacji:', err.message);
        process.exit(1); // Zakończ proces w przypadku błędu krytycznego
    }
};

startApp();
