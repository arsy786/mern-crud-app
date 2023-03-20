import express from 'express';
import noteController from '../controllers/note.controller.js';

const router = express.Router();

// NOTE ROUTES
router.get('/notes', noteController.getAllNotes);
router.get('/notes/:id', noteController.getNoteById);
router.post('/notes', noteController.createNote);
router.put('/notes/:id', noteController.updateNoteById);
router.delete('/notes/:id', noteController.deleteNoteById);

export default router;