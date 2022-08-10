import { useDispatch } from "react-redux";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { LogoutAdminThunk } from "../redux/slices/UserSlice";
import { StyledLink } from "./styles";
import { ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import { AlbumRounded, HomeRounded, InterpreterModeRounded, LibraryMusicRounded, PortraitRounded } from "@mui/icons-material";

export default function ButtonAppBar() {
    const Logout = (e) => {
        dispatch(LogoutAdminThunk());
      };
const dispatch = useDispatch();

const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        
      >
        <MenuItem onClick={handleClose} component={StyledLink} to={"/admin"}>
          <ListItemIcon><HomeRounded sx={{color: "#008037"}}/></ListItemIcon>
          <ListItemText sx={{pl:1}}> Home</ListItemText>
          </MenuItem>
        <MenuItem onClick={handleClose} component={StyledLink} to={"/admin/producer"}>
          <ListItemIcon><PortraitRounded sx={{color: "#008037"}}/></ListItemIcon>
          <ListItemText sx={{pl:1}}> Producers</ListItemText>
          </MenuItem>
        <MenuItem onClick={handleClose} component={StyledLink} to={"/admin/track"}>
        <ListItemIcon><AlbumRounded sx={{color: "#008037"}}/></ListItemIcon>
            <ListItemText sx={{pl:1}}> Tracks</ListItemText>
          </MenuItem>
        <MenuItem onClick={handleClose} component={StyledLink} to={"/admin/album"}>
          <ListItemIcon><LibraryMusicRounded sx={{color: "#008037"}}/></ListItemIcon>
          <ListItemText sx={{pl:1}}> Albums</ListItemText>
          </MenuItem>
        <MenuItem onClick={handleClose} component={StyledLink} to={"/admin/artist"}>
          <ListItemIcon><InterpreterModeRounded sx={{color: "#008037"}}/></ListItemIcon>
          <ListItemText sx={{pl:1}}> Artists</ListItemText>
          </MenuItem>
      </Menu>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {document.title}
          </Typography>
          <IconButton size="large" onClick={Logout}><LogoutIcon/></IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
