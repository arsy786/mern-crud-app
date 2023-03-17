import express from 'express';
import { getAllNotesRoute, getNoteByIdRoute, createNoteRoute, updateNoteByIdRoute, deleteNoteByIdRoute } from '../controller/noteController.js';

const api = express.Router();

// NOTE ROUTE
api.get('/notes', getAllNotesRoute);
api.get('/notes/:id', getNoteByIdRoute);
api.post('/notes', createNoteRoute);
api.put('/notes/:id', updateNoteByIdRoute);
api.delete('/notes/:id', deleteNoteByIdRoute);

export default api;