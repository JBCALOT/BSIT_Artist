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
        case "producer":
          dispatch(DeleteProducer({ id: id }));
          navigate("/producer");
          break;
        case "artist":
          dispatch(DeleteArtist({ id: id }));
          navigate("/artist");
          break;
        case "album":
          dispatch(DeleteAlbum({ id: id }));
          navigate("/album");
          break;
       /*  case "track":
          dispatch(DeletePetVaccineThunk({ id: id }));
          break;
        case "rating":
          dispatch(DeleteAnnThunk({ id: id }));
          navigate("/admin/announcements");
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