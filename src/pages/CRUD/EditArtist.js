import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box, 
    Container,
    FormControl,
    Dialog,
    Grid,
    ImageList,
    ImageListItem,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { EditButton, StyledButton, StyledTextField } from "../../assets/styles";
import { 
  EditArtist,
 } from "../../redux/slices/ArtistSlice";
 import DateAdapterMoment from "@mui/lab/AdapterMoment";
 import LocalizationProvider from "@mui/lab/LocalizationProvider";
 import DatePicker from "@mui/lab/DatePicker";
 import moment from "moment";

const EditArt = ({data, id}) => {
  const [imagePreview, setimagePreview] = useState(data.image);
  const [imageChanged, setimageChanged] = useState(false);
  const [image, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loading, artist, errors, success } = useSelector(
    (state) => state.artist
  );
  const dispatch = useDispatch();

const [values, setvalues] = useState({
    f_name: data.f_name,
    l_name: data.l_name,
    gender: data.gender,
    birthday: data.birthday,
    info: data.info,
});

const handleChange = (e) => {
  setvalues({ ...values, [e.target.name]: e.target.value });
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

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("f_name", values.f_name);
  formData.append("l_name", values.l_name);
  formData.append("gender", values.gender);
  formData.append("birthday", values.birthday);
  formData.append("info", values.info);
  if (imageChanged) {
  image.forEach((image) => {
    formData.append("image", image);
  });
}
  dispatch(EditArtist({data: formData, id: data._id}));
  setOpen(false);
}; 

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
              Edit Artist
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
                  value={values.f_name}                          
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
                  value={values.l_name}                            
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
                  value={values.info}
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
                  Update Artist Image
                </StyledButton>
              </Grid>
              <ImageList cols={8} rowHeight={100}>
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
                Update
              </StyledButton>
            </Box>
          </Container>
        </Box>
      </Dialog></>
);
};

export default EditArt;
