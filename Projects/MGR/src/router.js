import { Router } from "express";
import User from "../models/user.js";
import { param, validationResult } from 'express-validator';


const router = Router()


router.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Pobierz wszystkich użytkowników
        res.status(200).json({
            message: 'Lista użytkowników',
            data: users,
        });
    } catch (err) {
        res.status(500).json({
            error: 'Błąd podczas pobierania użytkowników',
            details: err.message,
        });
    }
});

router.put(
    '/users/:id',
    [
        // Walidacja parametru id
        param('id')
            .isInt({ gt: 0 }) // Sprawdź, czy id jest liczbą całkowitą większą od 0
            .withMessage('ID musi być liczbą całkowitą większą od 0'),
    ],
    async (req, res) => {
        // Sprawdzenie wyników walidacji
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const id = parseInt(req.params.id); // Konwertuj id na liczbę

            // Znajdź użytkownika po polu "id" i zaktualizuj go
            const updatedUser = await User.findOneAndUpdate(
                { id }, // Szukaj użytkownika po polu "id"
                req.body, // Dane do aktualizacji
                { new: true } // Zwróć zaktualizowany dokument
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
            }

            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);


router.post('/users', async (req, res) => {
    try {
        // Wygeneruj następne dostępne ID za pomocą metody statycznej modelu User
        const nextId = await User.generateNextId();

        // Stwórz nowego użytkownika
        const newUser = new User({
            id: nextId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        });

        // Zapisz użytkownika w bazie danych
        await newUser.save();

        res.status(201).json({
            message: 'Użytkownik został pomyślnie dodany!',
            user: newUser,
        });
    } catch (err) {
        res.status(500).json({
            error: 'Błąd podczas dodawania użytkownika',
            details: err.message,
        });
    }
});


router.delete(
    '/users/:id',
    [
        // Walidacja parametru id
        param('id')
            .isInt({ gt: 0 }) // Sprawdź, czy id jest liczbą całkowitą większą od 0
            .withMessage('ID musi być liczbą całkowitą większą od 0'),
    ],
    async (req, res) => {
        // Sprawdzenie wyników walidacji
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const id = parseInt(req.params.id); // Konwertuj id na liczbę

            // Znajdź i usuń użytkownika po polu "id"
            const deletedUser = await User.findOneAndDelete({ id }); 

            if (!deletedUser) {
                return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
            }

            res.status(200).json({ message: 'Użytkownik został usunięty' });
        } catch (err) {
            res.status(500).json({ error: 'Błąd podczas usuwania użytkownika', details: err.message });
        }
    }
);

export default router