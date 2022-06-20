import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box, 
    Container,
    Dialog,
    Grid,
    Typography,
} from "@mui/material";
import { EditButton, StyledTextField, StyledButton, } from "../../assets/styles";
import { 
  EditProducer,
 } from "../../redux/slices/ProducerSlice";

const EditProd = ({data, id}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loading, producer, errors, success } = useSelector(
    (state) => state.producer
  );
  const dispatch = useDispatch();

const [values, setvalues] = useState({
  producer_name: data.producer_name,
  website: data.website,
  social_media: data.social_media,
});

const handleChange = (e) => {
  setvalues({ ...values, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("producer_name", values.producer_name);
  formData.append("website", values.website);
  formData.append("social_media", values.social_media);
  dispatch(EditProducer({data: formData, id: data._id}));
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
                    Edit Producer
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                        <StyledTextField
                            required
                            fullWidth
                            id="producer_name"
                            label="Producer Name"
                            name="producer_name"
                            size="small"
                            onChange={handleChange}
                            value={values.producer_name} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                        <StyledTextField
                            required
                            fullWidth
                            id="website"
                            label="Website"
                            name="website"
                            size="small"
                            onChange={handleChange}
                            value={values.website} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                        <StyledTextField
                            required
                            fullWidth
                            id="social_media"
                            label="Social Media"
                            name="social_media"
                            size="small"
                            onChange={handleChange}
                            value={values.social_media} />
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

export default EditProd;
