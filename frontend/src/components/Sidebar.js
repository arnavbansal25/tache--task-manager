import React from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


import AddBoxIcon from '@mui/icons-material/AddBox';

import { baseUrl } from '../common/baseUrl';

import Workspace from './Workspace';

function Sidebar() {

    const [workspaces, setWorkspaces] = React.useState([]);
    const [addingSpace, setAddingSpace] = React.useState(false);
    const [num, setNum] = React.useState(0);

    const workspaceName = React.useRef();
    const workspaceDesc = React.useRef();

    React.useEffect(() => {
        axios.get(baseUrl + "workspaces")
            .then(response => {
                console.log("ee", response);
                setWorkspaces(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [num])

    function addNewSpace() {
        const newSpace = {
            workspaceName: workspaceName.current.value,
            workspaceDesc: workspaceDesc.current.value
        }
        axios.post(baseUrl + "workspaces/add", newSpace)
            .then(response => {
                setNum(num+1);
                // setWorkspaces((prev) => {
                //     return [
                //         ...prev,
                //         { workspaceName: workspaceName.current.value, workspaceDesc: workspaceDesc.current.value }
                //     ]
                // })
                setAddingSpace(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>  
            <div className="p-2">
                {
                    workspaces && workspaces.map((item, index) => (
                        <Workspace item={item} setNum={setNum} />
                    ))
                }
                <div style={{ cursor: 'pointer', backgroundColor: 'white' }} onClick={() => setAddingSpace(true)}>
                    <AddBoxIcon />New Workspace
                </div>
                {
                    addingSpace ?
                        <div>
                            <TextField
                                inputRef={workspaceName}
                                id="workspaceName"
                                label="Workspace Name"
                                placeholder="eg: Office"
                                variant="standard"
                            />
                            <TextField
                                inputRef={workspaceDesc}
                                id="workspaceDesc"
                                label="Workspace Description"
                                placeholder="Optional"
                                variant="standard"
                            />
                            <div onClick={addNewSpace}>Save</div>
                            <div onClick={() => setAddingSpace(false)}>Cancel</div>
                        </div>
                        :
                        <>
                        </>
                }
            </div>
        </>
    )
}

export default Sidebar;