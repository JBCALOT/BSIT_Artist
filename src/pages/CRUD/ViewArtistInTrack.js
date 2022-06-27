import { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  GetArtistDetails, 
} from "../../redux/slices/ArtistSlice";
import { StyledLink, ViewArtist } from "../../assets/styles";
import moment from "moment";
//import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";


const ArtistInDetails = ({data, id}) => {
    const [openn, setOpen] = useState(false);
    const dispatch = useDispatch();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
console.log(data);
  
return (
    <><ViewArtist onClick={handleOpen} startIcon={<span class="material-icons-round">info</span>}/>
        <Dialog open={openn} onClose={handleClose} maxWidth="md">
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
                            height="400px" //change to 400x300
                            image={data.artist[0].image ? data.artist[0].image.length > 0 ? data.artist[0].image[0].url : "https://via.placeholder.com/400/008307?text=Image+Placeholder" : null} />
                    </Card>
                     <Grid item xs={12}>
                            <Typography variant="h3" sx={{ textAlign: "center", mb: 4, mt: 4, color: "#008037" }}>{data.artist[0].f_name + " " + data.artist[0].l_name}</Typography>
                            <Typography variant="h5" sx={{ textAlign: "center" }}>{data.artist[0].gender}</Typography>
                            <Typography variant="h5" sx={{ textAlign: "center" }}>{moment(data.artist[0].birthday).format("MMMM DD, YYYY")}</Typography>
                            <Typography variant="h6" sx={{ textAlign: "center", mt: 2, color: "#a6a6a6", fontSize: "20px" }}>Additional Information:</Typography>
                            <Typography variant="h5" sx={{ textAlign: "center", fontStyle: "italic" }}>"{data.artist[0].info}"</Typography>
                        </Grid> 
            </Box>
        </Dialog></>

);
};

export default ArtistInDetails;