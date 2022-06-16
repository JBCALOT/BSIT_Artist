import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box, 
    Container,
    FormControl,
    Dialog,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { StyledButton, StyledTextField } from "../../assets/styles";
import { 
  EditArtist,
 } from "../../redux/slices/ArtistSlice";
 import DateAdapterMoment from "@mui/lab/AdapterMoment";
 import LocalizationProvider from "@mui/lab/LocalizationProvider";
 import DatePicker from "@mui/lab/DatePicker";
 import moment from "moment";

const EditArt = ({data, id}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loading, producer, errors, success } = useSelector(
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

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("f_name", values.f_name);
  formData.append("l_name", values.l_name);
  formData.append("gender", values.gender);
  formData.append("birthday", values.birthday);
  formData.append("info", values.info);
  dispatch(EditArtist({data: formData, id: data._id}));
  setOpen(false);
};

return(

    <><StyledButton onClick={handleOpen}>Edit</StyledButton>
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
