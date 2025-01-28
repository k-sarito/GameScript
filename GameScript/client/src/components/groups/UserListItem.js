import React from "react";
import { ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const UserListItem = ({user}) => {
    const navigate = useNavigate()

    const handleNav = (id) => {
        navigate(`/games/users/${id}`)
    }
    return (
        <ListItem button onClick={() => handleNav(user.id)}>
            <ListItemText primary={user.userName}/>
        </ListItem>
    )
}