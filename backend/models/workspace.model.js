const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workspaceSchema = new Schema({
    workspaceName: { type: String, required: true },
    workspaceDesc: { type: String }
}, {
    timestamps: true,
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

module.exports = Workspace;