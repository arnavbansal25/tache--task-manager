import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import Input from '@mui/material/Input';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import styled from 'styled-components';
import axios from 'axios';

import { baseUrl } from '../common/baseUrl';

const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 500,
    },
});

const WorkspaceLink = styled.div`
    width: 100%;
    padding: 10px;
    // border: '1px solid green';
    border-radius: 10px;
    background-color: ${props => `/workspace/${props.ws.workspaceName}/notes` === window.location.pathname ? '#238636' : '#171a22'};
    // border-left: ${props => `/workspace/${props.ws.workspaceName}/notes` === window.location.pathname ? '10px solid purple' : 'none'};
    color: white;
    margin-bottom: 5px;
`

function Workspace(props) {

    const { item, setNum } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [editingSpace, setEditingSpace] = React.useState(false);

    const workspaceName = React.useRef();
    const workspaceDesc = React.useRef();

    const navigate = useNavigate();

    const expandOptions = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const closeOptions = () => {
        setAnchorEl(null);
    };

    function editWorkspace() {
        const editedSpace = {
            workspaceName: workspaceName.current.value,
            workspaceDesc: workspaceDesc.current.value
        }
        axios.put(baseUrl + "workspaces/" + item / workspaceName + "/edit", editedSpace, {
            params: {
                workspaceId: item._id
            }
        })
            .then(response => {
                setNum(prev => { return prev + 1 });
                setEditingSpace(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    function deleteWorkspace() {
        axios.delete(baseUrl + 'workspaces/' + item.workspaceName + '/delete', {
            params: {
                workspaceId: item._id
            }
        })
            .then(response => {
                closeOptions();
                setNum(prev => { return prev + 1 })
                setEditingSpace(false);
                closeOptions();
                navigate("workspaces/");
            })
            .catch(err => {
                console.log(err);
                closeOptions();
            })
    }

    return (
        <div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={closeOptions}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => { setEditingSpace(true); closeOptions() }} className="d-flex justify-content-between">
                    <div>
                        Edit
                    </div>
                    <div>
                        <EditIcon fontSize="small" />
                    </div>
                </MenuItem>
                <MenuItem onClick={deleteWorkspace} className="d-flex justify-content-between">
                    <div>
                        Delete &nbsp;
                    </div>
                    <div>
                        <DeleteIcon fontSize="small" />
                    </div>
                </MenuItem>
            </Menu>
            <div className="d-flex justify-content-between">
                <div style={{ width: '90%' }}>
                    <NavLink
                        to={`/workspace/${item.workspaceName}/notes`}
                        state={{ workspace: item }}
                        style={{textDecoration: 'none'}}
                    >
                        <CustomWidthTooltip title="Paper Description" followCursor>
                            <WorkspaceLink ws={item}>
                                {item.workspaceName}
                            </WorkspaceLink>
                        </CustomWidthTooltip>
                    </NavLink>
                </div >
                <div style={{ width: '10%' }}>
                    <MoreVertIcon onClick={expandOptions} style={{ cursor: 'pointer', color: 'white' }} />
                </div>
            </div >
            {
                editingSpace ?
                    <div className="d-flex flex-column justify-content-between p-2 mb-3" style={{ height: '150px' }}>
                        <Input
                            inputRef={workspaceName}
                            placeholder="Name"
                            autoComplete='off'
                            style={{ color: 'white' }}
                            focused
                            defaultValue={item.workspaceName}
                        />
                        <Input
                            inputRef={workspaceDesc}
                            placeholder="Description"
                            autoComplete='off'
                            style={{ color: 'white' }}
                            focused
                            defaultValue={item.workspaceDesc}
                        />
                        <div className="d-flex justify-content-evenly">
                            <div className="p-2" style={{ cursor: 'pointer', borderRadius: '5px', outline: 'blue solid 1px', color: 'blue' }} onClick={editWorkspace}>Save</div>
                            <div className="p-2" style={{ cursor: 'pointer', borderRadius: '5px', outline: 'red solid 1px', color: 'red' }} onClick={() => setEditingSpace(false)}>Cancel</div>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default Workspace;