import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Avatar,
    Box, 
    Container,
    Dialog,
    FormControl,
    Grid,
    InputLabel,
    ImageList,
    ImageListItem,
    MenuItem,
    Select,
    Snackbar,
    Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { StyledButton, StyledTextField, } from "../assets/styles";
import { 
  AddAlbum,
  GetAllAlbum,
 } from "../redux/slices/AlbumSlice";
 import {GetAllProducer} from "../redux/slices/ProducerSlice";
 import {GetAllArtist} from "../redux/slices/ArtistSlice";
 import ArtistInDetails from "./CRUD/ViewArtistInAlbum";
import EditAlbum from "./CRUD/EditAlbum";
import Delete from "./CRUD/Delete";
import Appbar from "../assets/Appbar";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";
import moment from "moment";

const Album = () => {
  useEffect(() => {
    document.title = "BSIT | Albums";
    return () => {};
  }, []);

  function refreshPage() {
      window.location.reload(false);
    };
  const [imagePreview, setimagePreview] = useState([]);
  const [image, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loading, album, errors, success } = useSelector(
    (state) => state.album
  );
  const {artist} = useSelector(
    (state) => state.artist
  );
  const {producer} = useSelector(
    (state) => state.producer
  );

  const dispatch = useDispatch();

const hrs = ["01", "02", "03", "04", "05","06","07","08","09","10","11", "12", "13", "14", "15","16","17","18","19","20","21", "22", "23"];
const mins = ["01", "02", "03", "04", "05","06","07","08","09","10","11", "12", "13", "14", "15","16","17","18","19","20","21", "22", "23", "24", "25","26","27","28","29","30","31", "32", "33", "34", "35","36","37","38","39","40","41", "42", "43", "44", "45","46","47","48","49","50","51", "52", "53", "54", "55","56","57","58","59"];
const secs = ["01", "02", "03", "04", "05","06","07","08","09","10","11", "12", "13", "14", "15","16","17","18","19","20","21", "22", "23", "24", "25","26","27","28","29","30","31", "32", "33", "34", "35","36","37","38","39","40","41", "42", "43", "44", "45","46","47","48","49","50","51", "52", "53", "54", "55","56","57","58","59"];

//Datagrid
const columns = [
  {
    field: "image",
    headerName: "Cover",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 80
    ,
    renderCell: (cellValues) => {
    return(
    <Avatar id={album.id} src={cellValues.row.image[0].url}/>
    );
  }
  },
  {
    field: "album_name",
    headerName: "Album Name",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 200,
  },
  {
    field: "producer",
    headerName: "Producer",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 150,
    valueGetter: (cellValues) => {
      return cellValues.row.producer[0].producer_name;
    },
    sortComparator: (v1, v2) => v1.localeCompare(v2),
  }, 
  {
    field: "artist",
    headerName: "Artist Name",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 200,
    renderCell: (cellValues) => {
        return (
          <><ArtistInDetails
            id={cellValues.row._id}
            data={cellValues.row}
            startIcon={<span class="material-icons-round">info</span>}/>
            <Typography>{cellValues.row.artist[0].f_name + " " + cellValues.row.artist[0].l_name}</Typography></>
          //<StyledLink to={"/"}>{cellValues.row.artist[0].f_name +" "+cellValues.row.artist[0].l_name}</StyledLink>
      );
    },
    sortComparator: (v1, v2) => v1.localeCompare(v2),
  },
   {
    field: "duration",
    headerName: "Duration",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 100,
    valueGetter: (cellValues) =>
    moment(cellValues.row.duration).format("HH:mm:ss"),
    sortComparator: (v1, v2) => new Date(v1) - new Date(v2),
  },
  {
    field: "date_relesed",
    headerName: "Date Released",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 150,
    type: "date",
    valueGetter: (cellValues) =>
    moment(cellValues.row.date_released).format("MMM. DD, YYYY"),
    sortComparator: (v1, v2) => new Date(v1) - new Date(v2),
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
            <EditAlbum
            id={album.id}
            data={cellValues.row}
            startIcon={<span class="mateiral-icons">edit</span>}
          />
         <Delete
            id={cellValues.row._id}
            name={cellValues.row.album_name}
            collection="albums"
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

const [values, setvalues] = useState({
  album_name: "",
  producer: "",
  artist: "",
  duration: "",
  date_released: "",
});

const handleChange = (e) => {
  setvalues({ ...values, [e.target.name]: e.target.value });
};

const onChange = (e) => {
  //console.log(e.target.files);
  const files = Array.from(e.target.files);
  setimagePreview([]);
  setImages([]);
  //console.log(files[0]);
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setimagePreview((oldArray) => [...oldArray, reader.result]);
        setImages((oldArray) => [...oldArray, reader.result]);
      }
    };
    reader.readAsDataURL(file);
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("album_name", values.album_name);
  formData.append("producer", values.producer);
  formData.append("artist", values.artist);
  formData.append("duration", values.duration);
  formData.append("date_released", values.date_released);
  image.forEach((image) => {
    //  * Use append() here instead of set(). in order not replace the current value of the image...
    formData.append("image", image);
  });
  dispatch(AddAlbum({data: formData}));
  refreshPage();
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
  dispatch(GetAllProducer());
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
    <Appbar/><br/>
          <Typography
          variant="h3"
          sx={{ textTransform: "capitalize", color: "white" }}
          align="center"
        >
          <b>
            Albums
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
              Add New Album
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
              {!loading && album && (
                <DataGrid
                  rows={album}
                  columns={columns}
                  getRowId={(row) => row._id}
                  onCellClick={handleCellClick}
                  onRowClick={handleRowClick}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  {...album}
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
              Add New Album
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="album_name"
                  label="Album Name"
                  name="album_name"
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
                    <InputLabel>Producer</InputLabel>
                    <Select
                      label="Producer"
                      name="producer"
                      id="producer"
                      onChange={handleChange}
                    >
                      {!loading &&
                        producer &&
                        producer.map((prd) => (
                          <MenuItem value={prd._id} key={prd}>
                            {prd.producer_name}
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
                      name="artist"
                      id="artist"
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
                 <LocalizationProvider dateAdapter={DateAdapterMoment}>
                  <TimePicker
                    ampm={false}
                    openTo="hours"
                    views={['hours', 'minutes', 'seconds']}
                    inputFormat="HH:mm:ss"
                    mask="__:__:__"
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
                  </Grid>

              <Grid item xs={12} sm={12} md={6}>
              <LocalizationProvider dateAdapter={DateAdapterMoment}>
                <DatePicker
                  disableFuture
                  label="Date Released"
                  openTo="year"
                  views={["year", "month", "day"]}
                  value={moment(values.date_released)}
                  name="date_released"
                  InputProps={{ readOnly: true }}
                  onChange={(newDate) =>
                    setvalues({
                      ...values,
                      date_released: newDate.toDate().toISOString(),
                    })
                  }
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      fullWidth
                      required
                      size="small"               
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
                <StyledButton variant="contained" component="label">
                  <input
                    type="file"
                    name="image"
                    accept="images/*"
                    multiple
                    onChange={onChange}
                    hidden
                  />
                  Upload Album Cover
                </StyledButton>
              </Grid>
              <ImageList cols={8} rowHeight={100}>
              {imagePreview.map((img) => (
                <ImageListItem key={img}>
                  <img
                    src={img}
                    key={img}
                    alt="artist"
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>

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


export default Album;
