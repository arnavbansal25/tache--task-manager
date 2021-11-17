import React from 'react';
import Button from '@mui/material/Button';

import styled from 'styled-components';
import Input from '@mui/material/Input';

import axios from 'axios';
import { baseUrl } from '../common/baseUrl';

const Note = styled.div`
    width: 200px;
    height: 200px;
    min-width: 100px;
    min-height: 50px;
    max-width: 99%;
    max-height: 80vh;
    resize: both;
    overflow: auto;
    background-color: pink;
`

function SingleNote(props) {

    const { note, workspace, setNum, setAddingNote } = props;

    const [noteTitle, setNoteTitle] = React.useState(note ? note.noteTitle : "");
    const [editingNote, setEditingNote] = React.useState(false);

    const noteContent = React.useRef();

    React.useState(() => {
        console.log("tt", note, workspace);
    }, [])

    function saveNote() {
        const newNote = {
            workspaceId: workspace._id,
            noteTitle: noteTitle,
            noteContent: noteContent.current.value
        }

        axios.post(baseUrl + "workspace/" + workspace.workspaceName + "/notes/add", newNote)
            .then(response => {
                setNum(prev => { return prev + 1 });
                setAddingNote(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    function editNote() {
        const editedNote = {
            noteTitle: noteTitle,
            noteContent: noteContent.current.value,
            oldNoteTitle: note.noteTitle
        }

        axios.put(baseUrl + `workspace/${workspace.workspaceName}/note/${noteTitle}/edit`, editedNote, {
            params: {
                noteId: note._id,
            }
        })
            .then(response => {
                console.log("eeee", response);
                setNum(prev => { return prev + 1 });
                setEditingNote(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    function deleteNote() {
        axios.delete(baseUrl + `workspace/${workspace.workspaceName}/note/${noteTitle}/delete`, {
            params: {
                noteId: note._id
            }
        })
        .then(response => {
            setNum(prev => {return prev+1})
            setEditingNote(false);
        })
    }

    return (
        <>
            <Note>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <input
                        placeholder="Note Title"
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                        style={{ textAlign: 'center', border: 'none' }}
                        onClick={() => setEditingNote(true)}
                    />
                    <Input
                        inputRef={noteContent}
                        placeholder="Note Content"
                        multiline
                        defaultValue={note ? note.noteContent : ""}
                        style={{ width: '100%' }}
                        onClick={() => setEditingNote(true)}
                    />
                    {
                        note ?
                            editingNote ?
                                <div className="d-flex justify-content-evenly" style={{ width: '100%' }}>
                                    <Button variant="contained" color="primary" onClick={editNote}>Save</Button>
                                    <Button variant="contained" color="error" onClick={deleteNote}>Delete</Button>
                                    <Button variant="outlined" color="error" onClick={() => setEditingNote(false)}>Cancel</Button>
                                </div>
                                :
                                <>
                                </>
                            :
                            <div className="d-flex justify-content-evenly" style={{ width: '100%' }}>
                                <Button variant="contained" color="primary" onClick={saveNote}>Save</Button>
                                <Button variant="outlined" color="error" onClick={() => setAddingNote(false)}>Cancel</Button>
                            </div>
                    }

                </div>
            </Note>
        </>
    )
}

export default SingleNote;