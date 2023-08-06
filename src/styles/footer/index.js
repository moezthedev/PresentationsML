import {  IconButton, ListItem, ListItemButton, styled } from "@mui/material";
import { Colors } from '../theme'
export const ButtonFooterIcon = styled(IconButton)(({theme}) => ({
    margin: '1rem 0.1rem ',
    color: '#fff',
    "&:hover": {
        backgroundColor: "transparent",
        color: Colors.Cyan,
    },
    [theme.breakpoints.up('sm')]:{
        margin: '0.1rem',

    }
}));


export const ListItemCenter = styled(ListItem)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    
}));

export const ListItemButtonStyled = styled(ListItemButton)({
    textAlign: 'center',
    padding: 0,
    cursor: 'default',
    "&:hover": {
        backgroundColor: "transparent",
    },
    ".MuiListItemText-secondary": {
        "&:hover": {
            backgroundColor: "transparent",
            color: Colors.Cyan,
            cursor: 'pointer',

        },

    }
})