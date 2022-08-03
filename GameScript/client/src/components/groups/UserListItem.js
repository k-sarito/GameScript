import React from "react";
import { ListItem, ListItemText } from "@mui/material";

export const UserListItem = ({user}) => {
    return (
        <ListItem button>
            <ListItemText primary={user.userName}/>
        </ListItem>
    )
}