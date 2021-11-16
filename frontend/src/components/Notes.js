import axios from 'axios';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { baseUrl } from '../common/baseUrl';

function Notes(props) {

    const [notes, setNotes] = React.useState([]);

    const location = useLocation();
    const { workspace } = location.state;

    React.useEffect(() => {
        console.log("oo", workspace);
        console.log("tt", workspace._id, workspace.workspaceName);
        axios.get(baseUrl + `workspace/${workspace.workspaceName}/notes`, {
            params: {
                workspaceId: workspace.workspaceId
            }
        })
            .then(response => {
                console.log("eer", response);
            })
            .catch(err => {
                console.log(err);
            })
    }, [workspace])

    return (
        <div>
            notes
        </div>
    )
}

export default Notes;