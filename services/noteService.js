import Note from "../models/Note.js";

/* [GET] View All Notes */
// Find the notes, then return them
const getAllNotes = async () => {
    try {
        const notes = await Note.find();
        return notes;
    } catch (error) {
        res.status(400); // 
        console.error('Could not get notes');
    }   
}

/* [GET] View a specific Note by its ID */
// Get id from the url, check if note exists, find the note using the id, return the note
const getNoteById = async (id) => {
    try {
        const doesNoteExist = await Note.exists({ _id: id });
        if (doesNoteExist) {
            const note = await Note.findById(id);
            return note;
        }
    } catch (error) {
        throw new Error('Could not get note by ID');
    };
}

/* [POST] Create a Note */
// Get the sent in data from the request body, Create a note with it, return the new note
const createNote = async (body) => {
    try {
        const { title, description } = body;
        const note = await Note.create({ title, description });
        return note;
    } catch (error) {
        throw new Error('Could not add note');
    }
}

/* [PUT] Update a specific Note by its ID */
// check if Note with id exists, Get the id from the url, get the data from the request body, 
// find and update the record, find updated now, return with updated record
const updateNoteById = async (id, body) => {
    try {
        const doesNoteExist = await Note.exists({ _id: id });
        if (doesNoteExist) {
            const { title, description } = body;
            await Note.findByIdAndUpdate(id, {
                title,
                description
            });
            const note = await Note.findById(id);
            return note;
        }
    } catch (error) {
        throw new Error('Could not update note');
    }
}

/* [DELETE] Remove a specific Note by its ID */
// check if Note with id exists, Get id from url, Delete the record
const deleteNoteById = async (id) => {
    try {
        const doesNoteExist = await Note.exists({ _id: id });
        if (doesNoteExist) {
            await Note.findByIdAndDelete({ _id: id });
        }
    } catch (error) {
        throw new Error('Could not delete note!')
    }
}

export { getAllNotes, getNoteById, createNote, updateNoteById, deleteNoteById };