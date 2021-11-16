import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled as muiStyled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

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



function Workspace(props) {

    const { item, setNum } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [editingSpace, setEditingSpace] = React.useState(false);

    const workspaceName = React.useRef();
    const workspaceDesc = React.useRef();

    const navigate = useNavigate();

    React.useEffect(() => {
        // console.log("tt", navigate)
    }, [])

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
        axios.put(baseUrl + "workspaces/" + item/workspaceName + "/edit", editedSpace, {
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
        console.log("rrr", item);
        axios.delete(baseUrl + 'workspaces/' + item.workspaceName + '/delete', {
            params: {
                workspaceId: item._id
            }
        })
            .then(response => {
                closeOptions();
                setNum(prev => { return prev + 1 })
            })
            .catch(err => {
                console.log(err);
                closeOptions();
            })
    }

    const activeTab = (path) => {
        if (window.location.pathname === path) {
            return { backgroundColor: 'white', color: "red" };
        }
    };

    return (
        <div style={{ border: '2px green solid', backgroundColor: 'pink' }}>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={closeOptions}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => setEditingSpace(true)} className="d-flex justify-content-between">
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
            <div className="container">
                <div className="row">
                    <div className="col-11 p-1">
                        <CustomWidthTooltip title={item.workspaceDesc} followCursor>
                            <NavLink
                                to={`/workspace/${item.workspaceName}/notes`}
                                state={{ workspace: item }}
                                style={activeTab(`/workspace/${item.workspaceName}/notes`)}
                            >
                                <div style={{
                                    width: '100%',
                                    backgroundColor: `/workspace/${item.workspaceName}/notes` === window.location.pathname ? 'white' : 'black'
                                }}>
                                    {item.workspaceName}
                                </div>
                            </NavLink>
                        </CustomWidthTooltip>
                    </div>
                    <div className="col-1 p-1">
                        <MoreVertIcon onClick={expandOptions} style={{ cursor: 'pointer' }} />
                    </div>
                </div>
            </div>
            {
                editingSpace ?
                    <div>
                        <TextField
                            inputRef={workspaceName}
                            id="workspaceName"
                            label="New name"
                            placeholder="eg: Office"
                            variant="standard"
                        />
                        <TextField
                            inputRef={workspaceDesc}
                            id="workspaceDesc"
                            label="New Description"
                            placeholder="Optional"
                            variant="standard"
                        />
                        <div onClick={editWorkspace}>Save</div>
                        <div onClick={() => setEditingSpace(false)}>Cancel</div>
                    </div>
                    :
                    <>
                    </>
            }
        </div >
    )
}

export default Workspace;