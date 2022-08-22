import { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Dialog,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { ViewButton } from "../../assets/styles";
import moment from "moment";

const ArtistDetails = ({data, id}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
console.log(data);
return (
    <><ViewButton onClick={handleOpen} startIcon={<span class="material-icons">remove_red_eye</span>}/>
        <Dialog open={open} onClose={handleClose} maxWidth="md">
            <DialogTitle sx={{textAlign: "center"}}>Artist Details</DialogTitle>
              <Box
                sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                alignItems: "center",
                p: 2,
                borderRadius: 10,
                }}
                >
                <Card sx={{ display: "flex" }}>
                    <CardMedia
                        component="img"
                        alt="artist_image"
                        height="400px"
                        image={data.image && Array.isArray(data.image) ? data.image.length > 0 ? data.image[0].url : "https://via.placeholder.com/400/008307?text=Image+Placeholder" : null}/>
                </Card>
            <Grid item xs={12}>
                <Typography variant="h3" sx={{textAlign: "center", mb:4, mt:4, color: "#008037"}}>{data.f_name + " " + data.l_name }</Typography>
                <Typography variant="h5" sx={{textAlign: "center"}}>{data.gender}</Typography>
                <Typography variant="h5" sx={{textAlign: "center"}}>{moment(data.birthday).format("MMMM DD, YYYY")}</Typography>
                <Typography variant="h6" sx={{textAlign: "center", mt:2, color: "#a6a6a6", fontSize: "20px"}}>Additional Information:</Typography>
                <Typography variant="h5" sx={{textAlign: "center", fontStyle:"italic"}}>"{data.info}"</Typography>
            </Grid>
          </Box>
        </Dialog></>

);
};

export default ArtistDetails;