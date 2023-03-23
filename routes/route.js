import express from 'express';
import noteController from '../controllers/note.controller.js';
import userController from '../controllers/user.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';


const router = express.Router();

// NOTE ROUTES
router.get('/notes', noteController.getAllNotes);
router.get('/notes/:id', noteController.getNoteById);
router.post('/notes', noteController.createNote);
router.put('/notes/:id', noteController.updateNoteById);
router.delete('/notes/:id', noteController.deleteNoteById);

// USER / AUTH ROUTES
router.post('/auth/signup', userController.signup);
router.post('/auth/login', userController.login);
router.get('/auth/logout', userController.logout);
router.get('/auth/check-auth', requireAuth, userController.checkAuth);

export default router;