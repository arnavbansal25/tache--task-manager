import React from 'react';
import Button from '@mui/material/Button';

import styled from 'styled-components';
import Input from '@mui/material/Input';

import axios from 'axios';
import { baseUrl } from '../common/baseUrl';

const Note = styled.div`
    width: 250px;
    height: 200px;
    min-width: 200px;
    min-height: 150px;
    max-width: 100%;
    max-height: 80vh;
    resize: both;
    overflow: auto;
    background-color: #171a22;
    margin: 10px;
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
                setNum(prev => { return prev + 1 })
                setEditingNote(false);
            })
    }

    return (
        <Note>
            <div className="text-center">
                <input
                    placeholder="Note Title"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    style={{ textAlign: 'center', border: 'none', outline: 'none', backgroundColor: 'transparent', color: 'green' }}
                    onClick={() => setEditingNote(true)}
                />
            </div>
            <div>
                <div className="mb-3">
                    <Input
                        inputRef={noteContent}
                        placeholder="Note Content"
                        multiline
                        defaultValue={note ? note.noteContent : ""}
                        style={{ width: '100%', color: 'white' }}
                        onClick={() => setEditingNote(true)}
                    />
                </div>
                {
                    note ?
                        editingNote ?
                            <div className="d-flex justify-content-evenly mb-3" style={{ width: '100%' }}>
                                <div className="p-2" style={{ cursor: 'pointer', borderRadius: '5px', outline: 'blue solid 1px', color: 'blue' }} onClick={editNote}>Save</div>
                                <div className="p-2" style={{ cursor: 'pointer', borderRadius: '5px', outline: 'red solid 1px', color: 'red' }} onClick={deleteNote}>Delete</div>
                                <div className="p-2" style={{ cursor: 'pointer', borderRadius: '5px', outline: 'red solid 1px', color: 'red' }} onClick={() => setEditingNote(false)}>Cancel</div>
                            </div>
                            :
                            <>
                            </>
                        :
                        <div className="d-flex justify-content-evenly mb-3" style={{ width: '100%' }}>
                            <div className="p-2" style={{ cursor: 'pointer', borderRadius: '5px', outline: 'blue solid 1px', color: 'blue' }} onClick={saveNote}>Save</div>
                            <div className="p-2" style={{ cursor: 'pointer', borderRadius: '5px', outline: 'red solid 1px', color: 'red' }} onClick={() => setAddingNote(false)}>Cancel</div>
                        </div>
                }
            </div>
        </Note>
    )
}

export default SingleNote;