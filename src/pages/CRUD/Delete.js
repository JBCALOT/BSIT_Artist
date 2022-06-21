import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteAlbum } from "../../redux/slices/AlbumSlice";
import { DeleteArtist } from "../../redux/slices/ArtistSlice";
import { DeleteProducer } from "../../redux/slices/ProducerSlice";
import { DeleteTrack } from "../../redux/slices/TrackSlice";
import { DltButton } from "../../assets/styles";

const Delete = ({ id, name, collection, ...rest }) => {
    const [OpenModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const dialogOpen = () => {
      setOpenModal(true);
    };
    const handleClose = () => {
      setOpenModal(false);
    };
  
    const handleYes = () => {
      switch (collection) {
        case "producers":
          dispatch(DeleteProducer({ id: id }));
          navigate("/producer");
          break;
        case "artists":
          dispatch(DeleteArtist({ id: id }));
          navigate("/artist");
          break;
        case "albums":
          dispatch(DeleteAlbum({ id: id }));
          navigate("/album");
          break;
        case "tracks":
          dispatch(DeleteTrack({ id: id }));
          navigate("/track");
          break;
        /* case "rating":
          dispatch(DeleteRating({ id: id }));
          navigate("/rating");
          break; */
  
        default:
          break;
      }
      setOpenModal(false);
    };
    return (
      <>
        <DltButton
          startIcon={<span class="material-icons">delete_forever</span>}
          color="error"
          onClick={dialogOpen}
        ></DltButton>
        <Dialog onClose={handleClose} open={OpenModal}>
          <DialogTitle>Delete {name} ?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to permanently delete {name}? This cannot be
              undone.
            </DialogContentText>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleYes}>Yes</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  
  export default Delete;