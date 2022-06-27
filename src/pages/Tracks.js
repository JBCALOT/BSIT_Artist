import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {
    Box,
    Card,
    CardMedia, 
    CardActions, 
    Container,
    Dialog,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { StyledButton, StyledTextField } from "../assets/styles";
import { 
  AddTrack,
  GetAllTracks,
 } from "../redux/slices/TrackSlice";
 import {GetAllAlbum} from "../redux/slices/AlbumSlice";
 import {GetAllArtist, GetArtistDetails, } from "../redux/slices/ArtistSlice";

 import ArtistInDetails from "./CRUD/ViewArtistInTrack";
 import AlbumInDetails from "./CRUD/ViewAlbumInTrack";

import EditTrack from "./CRUD/EditTrack";
import Delete from "./CRUD/Delete";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import moment from "moment";

const Track = () => {

  useEffect(() => {
    document.title = "BSIT | Tracks";
    return () => {};
  }, []);

  function refreshPage() {
      window.location.reload(false);
    };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const params = useParams();

  const { loading, track, errors, success } = useSelector(
    (state) => state.track
  );
  const { artist } = useSelector(
    (state) => state.artist
  );
  
  const {album} = useSelector(
    (state) => state.album
  );

  const dispatch = useDispatch();

const hrs = ["01", "02", "03", "04", "05","06","07","08","09","10","11", "12", "13", "14", "15","16","17","18","19","20","21", "22", "23"];
const mins = ["01", "02", "03", "04", "05","06","07","08","09","10","11", "12", "13", "14", "15","16","17","18","19","20"];
const secs = ["01", "02", "03", "04", "05","06","07","08","09","10","11", "12", "13", "14", "15","16","17","18","19","20","21", "22", "23", "24", "25","26","27","28","29","30","31", "32", "33", "34", "35","36","37","38","39","40","41", "42", "43", "44", "45","46","47","48","49","50","51", "52", "53", "54", "55","56","57","58","59"];

const genre = ["Pop", "Country", "R&B", "Rock", "Folk", "Jazz", "Hip-Hop/Rap", "Classical", "Techno", "EDM", "Metal", "Indie", "K-pop", "Reggae", "A capella", "Gospel"];

//Datagrid
const columns = [
  {
    field: "album",
    headerName: "Album Name",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 200,
    /* valueGetter: (cellValues) => {
      return cellValues.row.album[0].album_name;
    },*/
    renderCell: (cellValues) => {
      return (
       <><AlbumInDetails
          id={cellValues.row.id}
          data={cellValues.row}
          startIcon={<span class="material-icons-round">info</span>}/>
          <Typography>{cellValues.row.album[0].album_name}</Typography>
          </>
     );
      }, 
    sortComparator: (v1, v2) => v1.localeCompare(v2),
  },
   {
    field: "artist_name",
    headerName: "Artist",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 200,
    renderCell: (cellValues) => {
      return (
       <><ArtistInDetails
          id={cellValues.row.id}
          data={cellValues.row}
          startIcon={<span class="material-icons-round">info</span>}/>
         <Typography>{cellValues.row.artist[0].f_name + " " + cellValues.row.artist[0].l_name}</Typography></>
        //<StyledButton component={StyledLink} to={`/artist/${artist._id}`}>artist</StyledButton >
        //<StyledButton onClick={artistInfo}>artist</StyledButton >
        //<ArtistInDetails params={`${cellValues.row.id}`}/>
        //<StyledLink to={`/artist/${artist._id}`}>artist</StyledLink>
    );
  },
    sortComparator: (v1, v2) => v1.localeCompare(v2),
  }, 
  {
    field: "track_name",
    headerName: "Song Title",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 200,
  },
  {
    field: "genre",
    headerName: "Genre",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 200,
  },
  {
    field: "duration",
    headerName: "Duration",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 100,
    valueGetter: (cellValues) => {
      return (cellValues.row.duration.minutes + ":" + cellValues.row.duration.seconds);
    },
    sortComparator: (v1, v2) => v1.localeCompare(v2),
  },
  {
    field: "action",
    headerName: "Actions",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 150,
    renderCell: (cellValues) => {
      return (
        <>
          <EditTrack
            id={track.id}
            data={cellValues.row}
            startIcon={<span class="mateiral-icons">edit</span>}
          />
         <Delete
            id={cellValues.row._id}
            name={cellValues.row.track_name}
            collection="tracks"
            data={cellValues.row} 
          />
        </>
      );
    },
    sortable: false,
  },
];
const handleCellClick = (param, e) => {
  e.stopPropagation();
};
const handleRowClick = (param, e) => {
  e.stopPropagation();
};

/* const artistInfo = () => {
  infoOpen(true);
  <ArtistInDetails artist={`/artist/${cellValues.row._id}`}/>
};
 */

const [values, setvalues] = useState({
  album: "",
  artist_name: "",
  track_name: "",
  genre: "",
  minutes: "",
  seconds: "",
});

const handleChange = (e) => {
  setvalues({ ...values, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("album", values.album);
  formData.append("artist_name", values.artist_name);

  formData.append("track_name", values.track_name);
  formData.append("genre", values.genre);
  formData.append("duration.minutes", values.minutes);
  formData.append("duration.seconds", values.seconds);
  dispatch(AddTrack({data: formData}));
  setOpen(false);
};

useEffect(() => {
  dispatch(GetAllAlbum());
  return () => {};
}, [dispatch]);

 useEffect(() => {
  dispatch(GetAllArtist());
  return () => {};
}, [dispatch]);

useEffect(() => {
  dispatch(GetAllTracks());
  return () => {};
}, [dispatch]);

return(
<Box  sx={{
        background: "linear-gradient(black, #021707, #008037)",
        pt: 5,
        pb: 5,
        minHeight: "100vh",
      }}>
<CssBaseline />

    <Container maxWidth="xl">
          <Typography
          variant="h3"
          sx={{ textTransform: "capitalize", color: "white" }}
          align="center"
        >
          <b>
            Tracks
          </b>
        </Typography>
<br/>
          <Grid item xs>
            <Box textAlign={"center"}>
            <StyledButton
              onClick={handleOpen}
              //margin="10"
              startIcon={<span class="material-icons">add</span>}
              align="center"
            >
              Add New Track
            </StyledButton>
            <StyledButton onClick={refreshPage}>⟳</StyledButton>
            </Box>          
           </Grid>
        <br/>
 <Grid item sm flexDirection={"column"}>
          <Box
            sx={{
              bgcolor: "background.paper 0",
              pt: 3,
              pb: 6,
              borderColor: "#021707"
            }}
          >
            <div style={{ height: 525, width: "auto"}}>
              {!loading && track && (
                <DataGrid
                  rows={track}
                  columns={columns}
                  getRowId={(row) => row._id}
                  onCellClick={handleCellClick}
                  onRowClick={handleRowClick}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  {...track}
                  sx={{
                    color: "white",
                    borderStyle: "none",
                  }}
                />
              )}
            </div>
          </Box>
        </Grid>

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
              Add New Track
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
                  <FormControl
                    required
                    fullWidth
                    size="small"
                    sx={{ backgroundColor: "white" }}
                  >
                    <InputLabel>Artist</InputLabel>
                    <Select
                      label="Artist"
                      name="artist_name"
                      id="artist_name"
                      onChange={handleChange}
                    >
                     {!loading &&
                        artist &&
                        artist.map((a) => (
                          <MenuItem value={a._id} key={a}>
                            {a.f_name + " " + a.l_name}
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
                    >
                        {genre.map(gen => (
                      <MenuItem value={gen}>{gen}</MenuItem>
                    ))} 
                    </Select>
                  </FormControl>
              </Grid>

               {/*  <Grid item xs={12} sm={12} md={6}>
                 <LocalizationProvider dateAdapter={DateAdapterMoment}>
                  <TimePicker
                    clearable
                    ampm={false}
                    openTo="minutes"
                    views={['minutes', 'seconds']}
                    inputFormat="mm:ss"
                    mask="__:__"
                    label="Duration"
                    name="duration"
                    value={moment(values.duration)}
                    onChange={(newDate) =>
                      setvalues({
                        ...values,
                        duration: newDate.toDate().toISOString(),
                      })
                    }
                    renderInput={(params) => 
                    <StyledTextField {...params}
                    fullWidth
                    required
                    size="small" />}
                    />
                  </LocalizationProvider>
                  </Grid>  */}  

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
            ><br/>
              <StyledButton
                type="submit"
                variant="contained"
                onClick={handleSubmit}
              >
                Add
              </StyledButton>
            </Box>
          </Container>
        </Box>
      </Dialog>
      <br />
</Container>
</Box>
);
};

export default Track;