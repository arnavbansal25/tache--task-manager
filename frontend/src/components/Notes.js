import axios from 'axios';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { baseUrl } from '../common/baseUrl';

import SingleNote from './SingleNote';
import AddBoxIcon from '@mui/icons-material/AddBox';

function Notes() {

    const [notes, setNotes] = React.useState([]);
    const [num, setNum] = React.useState(0);
    const [addingNote, setAddingNote] = React.useState(false);

    const location = useLocation();
    const { workspace } = location.state;

    React.useEffect(() => {
        axios.get(baseUrl + `workspace/${workspace.workspaceName}/notes`, {
            params: {
                workspaceId: workspace._id
            }
        })
            .then(response => {
                setNotes(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [num, workspace])

    return (
        <div className="row p-3 px-5" style={{ float: 'left', maxWidth: '100%' }}>
            <AddBoxIcon sx={{ fontSize: 200 }} style={{ cursor: 'pointer', margin: '10px' }} onClick={() => setAddingNote(true)} />
            {
                addingNote ?
                    <SingleNote note={null} workspace={workspace} setNum={setNum} setAddingNote={setAddingNote} />
                    :
                    <>
                    </>
            }
            {
                notes && notes.map((item, index) => (
                    <SingleNote note={item} workspace={workspace} setNum={setNum} setAddingNote={setAddingNote} />
                ))
            }
            
        </div>
    )
}

export default Notes;