import noteService from '../services/note.service.js';

/* [GET] View All Notes */
// Find the notes, Respond with them
const getAllNotes = async (req, res) => {
    try {   
        const notes = await noteService.getAllNotes();
        res.json({ notes });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

/* [GET] View a specific Note by its ID */
// Get id from the url, Find the note using that id, Respond with the note
const getNoteById = async (req, res) => {
    const noteId = req.params.id;
    try {
        const note = await noteService.getNoteById(noteId); 
        res.json({ note });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

/* [POST] Create a Note */
// Get the sent in data from the request body, Create a note with it, Respond with the new note
const createNote = async (req, res) => {
    const { title, description }  = req.body;
    try {
        const note = await noteService.createNote({
            title,
            description
        });
        res.status(201).send({ note });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


/* [PUT] Update a specific Note by its ID */
// Get the id from the url, Get the data from the request body, Find and update the record, Respond with updated record
const updateNoteById = async (req, res) => {
    const noteId = req.params.id;
    const { title, description } = req.body;
    try {
        const note = await noteService.updateNoteById(noteId, {
            title,
            description
        });
        res.json({ note });
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

/* [DELETE] Remove a specific Note by its ID */
// Get id from url, Delete the record, Respond
const deleteNoteById = async (req, res) => {
    const noteId = req.params.id;
    try {
        await noteService.deleteNoteById(noteId);
        res.json({ success: "Record deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const noteController = { getAllNotes, getNoteById, createNote, updateNoteById, deleteNoteById };

export default noteController;