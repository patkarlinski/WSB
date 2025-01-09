import { Router } from "express";
import User from "../models/user.js";

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

router.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/users', async (req, res) => {
    try {
        // Wygeneruj następne dostępne ID
        const nextId = await generateNextId();

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

router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ id: req.params.id });
        if (!deletedUser) {
            return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        }

        res.status(200).json({ message: 'Użytkownik został usunięty' });
    } catch (err) {
        res.status(500).json({ error: 'Błąd podczas usuwania użytkownika', details: err.message });
    }
});

export default router