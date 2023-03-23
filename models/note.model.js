import { default as mongoose } from "mongoose";

const noteSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }},
{
    versionKey: false
});

const Note = mongoose.model("Note", noteSchema);

export default Note;