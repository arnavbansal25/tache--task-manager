import React from 'react';
import axios from 'axios';
import Input from '@mui/material/Input';

import AddCircleIcon from '@mui/icons-material/AddCircle';

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
                setNum(num + 1);
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
            <div className="p-3" style={{ backgroundColor: '#0c1017', maxHeight: '100vh', overflowY: 'scroll' }}>
                {
                    addingSpace ?
                        <div className="d-flex flex-column justify-content-between p-2 mb-3" style={{height: '150px'}}>
                            <Input
                                inputRef={workspaceName}
                                placeholder="Name"
                                autoComplete='off'
                                style={{color: 'white'}}
                                focused
                            />
                            <Input
                                inputRef={workspaceDesc}
                                placeholder="Description"
                                autoComplete='off'
                                style={{color: 'white'}}
                                focused
                            />
                            <div className="d-flex justify-content-evenly">
                                <div className="p-2" style={{ cursor: 'pointer', borderRadius: '5px', outline: 'blue solid 1px', color: 'blue' }} onClick={addNewSpace}>Save</div>
                                <div className="p-2" style={{ cursor: 'pointer', borderRadius: '5px', outline: 'red solid 1px', color: 'red' }} onClick={() => setAddingSpace(false)}>Cancel</div>
                            </div>
                        </div>
                        :
                        <div className="d-flex justify-content-center p-2 px-4 mb-3" style={{ cursor: 'pointer', backgroundColor: 'white', borderRadius: '10px' }} onClick={() => setAddingSpace(true)}>
                            <div className="me-2">
                                <AddCircleIcon />
                            </div>
                            <div>
                                New
                            </div>
                        </div>
                }
                {
                    workspaces && workspaces.map((item, index) => (
                        <Workspace item={item} setNum={setNum} />
                    ))
                }
            </div>
        </>
    )
}

export default Sidebar;