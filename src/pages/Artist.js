import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import {
    Box, 
    Container,
    Dialog,
    FormControl,
    Grid,
    ImageList,
    ImageListItem,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { StyledButton, StyledTextField } from "../assets/styles";
import { 
  AddArtist,
  GetAllArtist,
 } from "../redux/slices/ArtistSlice";
 import Appbar from "../assets/Appbar";
import EditArtist from "./CRUD/EditArtist";
import ArtistDetails from "./CRUD/ViewArtistDetails";
import Delete from "./CRUD/Delete";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";

const Artist = () => {
  useEffect(() => {
    document.title = "BSIT | Artists";
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
  const { loading, artist, errors, success } = useSelector(
    (state) => state.artist
  );
  const dispatch = useDispatch();

//Datagrid
const columns = [
  {
    field: "f_name",
    headerName: "First",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 110,
  },
  {
    field: "l_name",
    headerName: "Last",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 110,
  },
  {
    field: "gender",
    headerName: "Gender",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 110,
  },
  {
    field: "birthday",
    headerName: "Birthday",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 150,
    type: "date",
    valueGetter: (cellValues) =>
    moment(cellValues.row.birthday).format("MMM. DD, YYYY"),
    sortComparator: (v1, v2) => new Date(v1) - new Date(v2),
  },
  {
    field: "info",
    headerName: "+Info",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 200,
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 200,
    renderCell: (cellValues) => {
      return (
        <>
        <ArtistDetails
          id={cellValues.row._id}
          data={cellValues.row}
          startIcon={<span class="mateiral-icons">remove_red_eye</span>}
        />
        <EditArtist
          id={artist.id}
          data={cellValues.row}
          startIcon={<span class="mateiral-icons">edit</span>}
        />
        <Delete
          id={cellValues.row._id}
          name={cellValues.row.f_name + cellValues.row.l_name }
          collection="artists"
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
  f_name: "",
  l_name: "",
  gender: "",
  birthday: "",
  info: "",
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
  formData.append("f_name", values.f_name);
  formData.append("l_name", values.l_name);
  formData.append("gender", values.gender);
  formData.append("birthday", values.birthday);
  formData.append("info", values.info);
  image.forEach((image) => {
    //  * Use append() here instead of set(). in order not replace the current value of the image...
    formData.append("image", image);
  });
  dispatch(AddArtist({data: formData}));
  setOpen(false);
};

useEffect(() => {
  dispatch(GetAllArtist());
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
            Artists
          </b>
        </Typography>
<br/>
          <Grid item xs>
            <Box textAlign={"center"}>
            <StyledButton
              onClick={handleOpen}
              margin="10"
              startIcon={<span class="material-icons">add</span>}
              align="center"
            >
              Add Artist
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
              {!loading && artist && (
                <DataGrid
                  rows={artist}
                  columns={columns}
                  getRowId={(row) => row._id}
                  onCellClick={handleCellClick}
                  onRowClick={handleRowClick}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  {...artist}
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
              Add New Artist
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="f_name"
                  label="First Name"
                  name="f_name"
                  size="small"
                  onChange={handleChange}                              
                />
              </Grid> 

               <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="l_name"
                  label="Last Name"
                  name="l_name"
                  size="small"
                  onChange={handleChange}                              
                />
              </Grid>            

              <Grid item xs={12} sm={12} md={6}>
              <FormControl
                fullWidth
                size="small"
                sx={{ backgroundColor: "white" }}
              >
                <InputLabel>Gender</InputLabel>
                <Select
                  label="Gender"
                  onChange={handleChange}
                  name="gender"
                  value={values.gender}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
              <LocalizationProvider dateAdapter={DateAdapterMoment}>
                <DatePicker
                  disableFuture
                  label="Birthday"
                  openTo="year"
                  views={["year", "month", "day"]}
                  value={moment(values.birthday)}
                  name="birthday"
                  InputProps={{ readOnly: true }}
                  onChange={(newDate) =>
                    setvalues({
                      ...values,
                      birthday: newDate.toDate().toISOString(),
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

              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  multiline
                  rows={2}
                  id="info"
                  label="Additional info"
                  name="info"
                  size="small"
                  onChange={handleChange}
                />
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
                  Upload Artist Image
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


export default Artist;
