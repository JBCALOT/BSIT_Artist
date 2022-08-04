import { useDispatch } from "react-redux";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { LogoutAdminThunk } from "../redux/slices/UserSlice";

export default function ButtonAppBar() {
    const Logout = (e) => {
        dispatch(LogoutAdminThunk());
      };
const dispatch = useDispatch();

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {document.title}
          </Typography>
          <IconButton size="large" onClick={Logout}><LogoutIcon/></IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
