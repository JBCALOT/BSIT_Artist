import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box, 
    CardActions, 
    Container,
    Dialog,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { EditButton, StyledTextField, StyledButton, } from "../../assets/styles";
import { 
  EditTrack,
 } from "../../redux/slices/TrackSlice";
import {GetAllAlbum} from "../../redux/slices/AlbumSlice";

const EditSongTrack = ({data, id}) => {
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const { loading, track, errors, success } = useSelector((state) => state.track);
const {album} = useSelector((state) => state.album);
  
const dispatch = useDispatch();
  
  const hrs = ["01", "02", "03", "04", "05","06","07","08","09","10","11", "12", "13", "14", "15","16","17","18","19","20","21", "22", "23"];
  const mins = ["01", "02", "03", "04", "05","06","07","08","09","10","11", "12", "13", "14", "15","16","17","18","19","20"];
  const secs = ["01", "02", "03", "04", "05","06","07","08","09","10","11", "12", "13", "14", "15","16","17","18","19","20","21", "22", "23", "24", "25","26","27","28","29","30","31", "32", "33", "34", "35","36","37","38","39","40","41", "42", "43", "44", "45","46","47","48","49","50","51", "52", "53", "54", "55","56","57","58","59"];
  
  const genre = ["Pop", "Country", "R&B", "Rock", "Folk", "Jazz", "Hip-Hop/Rap", "Classical", "Techno", "EDM", "Metal", "Indie", "K-pop", "Reggae", "A capella", "Gospel"];
  
  const [values, setvalues] = useState({
    album: data.album[0]._id,
    track_name: data.track_name,
    genre: data.genre,
    minutes: data.duration.minutes,
    seconds: data.duration.seconds,
  });
  
  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("album", values.album);
    formData.append("track_name", values.track_name);
    formData.append("genre", values.genre);
    formData.append("duration.minutes", values.minutes);
    formData.append("duration.seconds", values.seconds);
    dispatch(EditTrack({data: formData, id: data._id}));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(GetAllAlbum());
    return () => {};
  }, [dispatch]);

  return(

    <><EditButton onClick={handleOpen} startIcon={<span class="material-icons">edit</span>}></EditButton>
    <Dialog open={open} onClose={handleClose} maxWidth="md">
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                alignItems: "center",
                p: 2,
                borderRadius: 5,
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    component="h1"
                    variant="h4"
                    color="text.primary"
                    marginBottom={2}
                >
                    Edit Track
                </Typography>

                <Grid container spacing={2}>

            <Grid item xs={12} sm={12} md={6}>
            <FormControl
                required
                fullWidth
                size="small"
                sx={{ backgroundColor: "white" }}
            >
                <InputLabel>Album</InputLabel>
                <Select
                label="Album"
                name="album"
                id="album"
                onChange={handleChange}
                value={values.album}
                >
                {!loading &&
                    album &&
                    album.map((albm) => (
                    <MenuItem value={albm._id} key={albm}>
                        {albm.album_name}
                    </MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Grid>               

            <Grid item xs={12} sm={12} md={6}>
            <StyledTextField
            required
            fullWidth
            id="track_name"
            label="Song Title"
            name="track_name"
            size="small"
            onChange={handleChange}
            value={values.track_name}                            
            />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
            <FormControl
                required
                fullWidth
                size="small"
                sx={{ backgroundColor: "white" }}
            >
                <InputLabel>Genre</InputLabel>
                <Select
                id="genre"
                name="genre"
                onChange={handleChange}
                value={values.genre}
                >
                    {genre.map(gen => (
                <MenuItem value={gen}>{gen}</MenuItem>
                ))} 
                </Select>
            </FormControl>
        </Grid>  

            <Grid item xs={12} sm={6} md={6}>
                <Grid>
                <FormControl
                    required
                    fullWidth
                    size="small"
                    sx={{ backgroundColor: "white" }}
                >
                    <InputLabel>Minutes</InputLabel>
                    <Select
                    name="minutes"
                    id="minutes"
                    onChange={handleChange}
                    value={values.minutes}
                    >
                        {mins.map(info => (
                    <MenuItem value={info}>{info}</MenuItem>
                    ))} 
                    </Select>
                </FormControl>
                </Grid>
                <Grid>
                <FormControl
                    required
                    fullWidth
                    size="small"
                    sx={{ backgroundColor: "white" }}
                >
                    <InputLabel>Seconds</InputLabel>
                    <Select
                    name="seconds"
                    id="seconds"
                    onChange={handleChange}
                    value={values.seconds}
                    >
                        {secs.map(info => (
                    <MenuItem value={info}>{info}</MenuItem>
                    ))} 
                    </Select>
                </FormControl>
                </Grid>
            </Grid>
 </Grid>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "white",
                        alignItems: "center",
                    }}
                ><br />
                    <StyledButton
                        type="submit"
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Update
                    </StyledButton>
                </Box>
       
            </Container>
        </Box>
    </Dialog></>
);
};

export default EditSongTrack;