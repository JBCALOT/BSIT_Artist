import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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
    Typography,
} from "@mui/material";
import { EditButton, StyledButton, StyledTextField } from "../../assets/styles";
import { 
  EditAlbum,
 } from "../../redux/slices/AlbumSlice";
import {GetAllProducer} from "../../redux/slices/ProducerSlice";
import {GetAllArtist} from "../../redux/slices/ArtistSlice";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";

const EditAlbumm = ({data, id}) => {
  const [imagePreview, setimagePreview] = useState(data.image);
  const [imageChanged, setimageChanged] = useState(false);
  const [image, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loading, album } = useSelector(
    (state) => state.album
  );
  const {artist} = useSelector((state) => state.artist);
  const {producer} = useSelector(
    (state) => state.producer
  );

  const dispatch = useDispatch();

const hrs = ["00", "01", "02", "03", "04", "05","06","07","08","09","10","11", "12", "13", "14", "15","16","17","18","19","20","21", "22", "23"];
const mins = ["00", "01", "02", "03", "04", "05","06","07","08","09","10","11", "12", "13", "14", "15","16","17","18","19","20","21", "22", "23", "24", "25","26","27","28","29","30","31", "32", "33", "34", "35","36","37","38","39","40","41", "42", "43", "44", "45","46","47","48","49","50","51", "52", "53", "54", "55","56","57","58","59"];
const secs = ["00", "01", "02", "03", "04", "05","06","07","08","09","10","11", "12", "13", "14", "15","16","17","18","19","20","21", "22", "23", "24", "25","26","27","28","29","30","31", "32", "33", "34", "35","36","37","38","39","40","41", "42", "43", "44", "45","46","47","48","49","50","51", "52", "53", "54", "55","56","57","58","59"];

const [values, setvalues] = useState({
  album_name: data.album_name,
  producer: data.producer[0]._id,
  artist: data.artist[0]._id,
  hours: data.duration.hours,
  minutes: data.duration.minutes,
  seconds: data.duration.seconds,  
  date_released: data.date_released,
}); 

const handleChange = (e) => {
  setvalues({ ...values, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("album_name", values.album_name);
  formData.append("producer", values.producer);
  formData.append("artist", values.artist);
  formData.append("duration.hours", values.hours);
  formData.append("duration.minutes", values.minutes);
  formData.append("duration.seconds", values.seconds);
  formData.append("date_released", values.date_released);
  if (imageChanged) {
    image.forEach((image) => {
      formData.append("image", image);
    });
  }
  dispatch(EditAlbum({data: formData, id: data._id}));
  setOpen(false);
};

const onChange = (e) => {
  const files = Array.from(e.target.files);
 setimageChanged(true);
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
    reader.readAsDataURL(e.target.files[0]);
  });
};

useEffect(() => {
  dispatch(GetAllArtist());
  return () => {};
}, [dispatch]);
useEffect(() => {
  dispatch(GetAllProducer());
  return () => {};
}, [dispatch]);

return(
      <>   
  <EditButton onClick={handleOpen} startIcon={<span class="material-icons">edit</span>}></EditButton>
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
          Update Album
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
              value={values.album_name} />
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
                value={values.producer}
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
                value={values.artist}
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

          {/* <Grid item xs={12} sm={12} md={6}>
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
                onChange={(newDate) => setvalues({
                  ...values,
                  duration: newDate.toDate().toISOString(),
                })}
                renderInput={(params) => <StyledTextField {...params}
                  fullWidth
                  required
                  size="small" />} />
            </LocalizationProvider>
          </Grid> */}

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
                onChange={(newDate) => setvalues({
                  ...values,
                  date_released: newDate.toDate().toISOString(),
                })}
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    fullWidth
                    required
                    size="small" />
                )} />
            </LocalizationProvider>
          </Grid>
       

        <Grid item xs={12} sm={12} md={6} sx={{flexDirection:"row"}}>
              <Grid>
                  <FormControl
                    required
                    fullWidth
                    size="small"
                    sx={{ backgroundColor: "white" }}
                  >
                    <InputLabel>Hours</InputLabel>
                    <Select
                      name="hours"
                      id="hours"
                      value={values.hours}
                      onChange={handleChange}
                    >
                        {hrs.map(info => (
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
                    <InputLabel>Minutes</InputLabel>
                    <Select
                      name="minutes"
                      id="minutes"
                      value={values.minutes}
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
                      value={values.seconds}
                      onChange={handleChange}
                    >
                        {secs.map(info => (
                      <MenuItem value={info}>{info}</MenuItem>
                    ))} 
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={6} >
                <StyledButton variant="contained" component="label">
                  <input
                    type="file"
                    name="image"
                    accept="images/*"
                    multiple
                    onChange={onChange}
                    hidden
                  />
                  Update Album Image
                </StyledButton>
             
              <ImageList cols={4} rowHeight={100}>
              {imagePreview.map((img) => (
                <ImageListItem key={img.public_id ? img.public_id : img}>
                  <img
                    src={img.url ? img.url : img}
                    key={img.public_id ? img.public_id : img}
                    alt="artist"
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
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


export default EditAlbumm;
