const router = require('express').Router();
var ObjectId = require('mongodb').ObjectId;

let Workspace = require('../models/workspace.model');
let Note = require('../models/note.model');

// get all the workspaces
router.route('/').get((req, res) => {
    Workspace.find().sort({ updatedAt: -1 })
        .then(workspaces => res.json(workspaces))
        .catch(err => res.status(400).json('Error: ' + err));
});

// add new workspace
router.route('/add').post((req, res) => {
    Workspace.find({ workspaceName: req.body.workspaceName }).count()
        .then(count => {
            if (count >= 1) {
                res.json("Workspace already exists!");
            }
            else {
                const workspaceName = req.body.workspaceName;
                const workspaceDesc = req.body.workspaceDesc;

                const newWorkspace = new Workspace({
                    workspaceName,
                    workspaceDesc,
                });

                newWorkspace.save()
                    .then(() => res.json('Workspace Added!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        });
});

// delete workspace along with all its notes
router.route('/:workspaceName/delete').delete((req, res) => {
    Note.remove({ workspaceId: ObjectId(req.query.workspaceId) })
        .then(() => {
            Workspace.remove({ _id: ObjectId(req.query.workspaceId) })
                .then(() => res.json('Workspace deleted!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
});

// edit workspace name or description
router.route('/:workspaceName/edit').put((req, res) => {
    Workspace.find({ workspaceName: req.body.workspaceName }).count()
        .then(count => {
            if (count >= 1) {
                res.json("Workspace already exists!");
            }
            else {
                Workspace.findById(req.query.workspaceId)
                    .then(workspace => {
                        workspace.workspaceName = req.body.workspaceName;
                        workspace.workspaceDesc = req.body.workspaceDesc;

                        workspace.save()
                            .then(() => res.json('Workspace Edited!'))
                            .catch(err => res.status(400).json('Error: ' + err));
                    })
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        });
})

module.exports = router;