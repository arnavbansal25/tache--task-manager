const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    workspaceId: { type: Schema.Types.ObjectId, required: true },
    noteTitle: { type: String, required: true },
    noteContent: { type: String },
}, {
    timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;