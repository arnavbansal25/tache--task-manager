const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongoose database connection successful!");
})

const workspaceRouter = require('./routes/workspaces');
const noteRouter = require('./routes/notes');

app.use('/workspaces', workspaceRouter);
app.use('/workspace', noteRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})