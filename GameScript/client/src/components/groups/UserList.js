import React, { useEffect, useState} from "react";
import { getAllUsersByGroup } from "../../modules/groupManager";
import { List, ListItem, ListItemText, Divider, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { UserListItem } from "./UserListItem";

export const UserList = () => {
    const [members, setMembers] = useState([])
    const navigate = useNavigate()
    const {groupId} = useParams()

    useEffect(() => {
        getAllUsersByGroup(groupId)
            .then(res => setMembers(res))
    }, [groupId])

    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
    }

    return (
        <>
        <Box>
            <List sx={style} component="nav" aria-label="user-list">
                {members.map(member => { return <UserListItem user={member} key={member.id}/>})}
            </List>
        </Box>
        </>
    )
}