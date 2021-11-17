const router = require('express').Router();
var ObjectId = require('mongodb').ObjectId;

let Note = require('../models/note.model');

// get all notes inside a workspace
router.route('/:workspaceName/notes').get((req, res) => {
    Note.find({ workspaceId: ObjectId(req.query.workspaceId) })
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json('Error: ' + err));
});

// add new note to a workspace
router.route('/:workspaceName/notes/add').post((req, res) => {
    Note.find({ noteTitle: req.body.noteTitle }).count()
        .then(count => {
            if (count >= 1) {
                res.json("Note already exists!");
            }
            else {
                const workspaceId = req.body.workspaceId;
                const noteTitle = req.body.noteTitle;
                const noteContent = req.body.noteContent;

                const newNote = new Note({
                    workspaceId,
                    noteTitle,
                    noteContent,
                });

                newNote.save()
                    .then(() => res.json('Note Added!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        });
});

// delete a note from a workspace
router.route('/:workspaceName/note/:noteTitle/delete').delete((req, res) => {
    Note.remove({ _id: ObjectId(req.query.noteId) })
        .then(() => res.json("Note Deleted!"))
        .catch(err => res.status(400).json('Error: ' + err))
})

// edit a note in a workspace
router.route('/:workspaceName/note/:noteTitle/edit').put((req, res) => {
    console.log("yy", req.body.noteTitle, req.body.oldNoteTitle)

    Note.find({ noteTitle: req.body.noteTitle }).count()
        .then(count => {
            if (count >= 1 && req.body.noteTitle != req.body.oldNoteTitle) {
                res.json("Note already exists!");
            }
            else {
                Note.findById(req.query.noteId)
                    .then(note => {
                        note.noteTitle = req.body.noteTitle;
                        note.noteContent = req.body.noteContent;

                        note.save()
                            .then(() => res.json("Note Edited!"))
                            .catch(err => res.status(400).json('Error: ' + err));
                    })
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        });
});

module.exports = router;