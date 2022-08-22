import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box, 
    Typography, 
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Collapse,
    Grid,
    IconButton,
    Rating
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { StyledLink } from "../assets/styles";
import { Container } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import {GetAllArtistGuest} from "../redux/slices/ArtistSlice";
import {GetAllAlbumGuest} from "../redux/slices/AlbumSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import moment from "moment";
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Gallery = () => {
const dispatch = useDispatch();
const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [expandalbum, setAlbumExpanded] = useState(false);
  const handleExpandAlbum = () => {
    setAlbumExpanded(!expandalbum);
  };

  useEffect(() => {
    document.title = "BSIT | Gallery";
    return () => {};
  }, []);
  

const {album} = useSelector(
    (state) => state.album
  );
  const {loading, artist} = useSelector(
    (state) => state.artist
  );

  useEffect(() => {
    dispatch(GetAllAlbumGuest());
    return () => {};
  }, [dispatch]);
  useEffect(() => {
    dispatch(GetAllArtistGuest());
    return () => {};
  }, [dispatch]);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#008037"
    },
    "& .MuiRating-iconHover": {
      color: "#008037"
    }
  });

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const ExpandAlbum = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

return (
<Box  sx={{
        bgcolor: "#021707",
        pt: 2,
        pb: 5,
        minHeight: "100vh",
      }}>
<CssBaseline />
    <Container maxWidth="xl">
    <IconButton component={StyledLink} to="/" size="small" color="primary">
          <ArrowBackIosRoundedIcon/>Back to Index
        </IconButton >

        <Typography
          variant="h3"
          sx={{ textTransform: "capitalize", color: "white" }}
          align="center"
        >
          <b>
            Gallery
          </b>
        </Typography>
<br/>
        <Container sx={{}} maxWidth="xl">
        <Typography
          variant="h4"
          sx={{ textTransform: "capitalize", color: "#008037", mb:4 }}
          align="center"
        >
          <b>
            Artists
          </b>
        </Typography>

        <Grid container spacing={3}>
          {!loading && artist && artist.map((art) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <Card
                sx={{
                  height: "auto",
                  width: "100%",
                  display: "flex",
                  position: "sticky",
                  flexDirection: "column",
                  backgroundColor: "white",
                  padding: 1
                }}
              >
                <CardActionArea>
                    <CardMedia
                      sx={{
                        pt: "100%",
                      }}
                      image={art.image && Array.isArray(art.image) ? art.image.length > 0 ? art.image[0].url : "https://via.placeholder.com/400/008307?text=Image+Placeholder" : null}
                      
                    />

                    <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <span class="material-icons">expand_more</span>
                    <Typography variant="h6" sx={{textAlign: "center", mt:1, color: "#008037", transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',}}>{art.f_name + " " + art.l_name}</Typography>
                  </ExpandMore>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent sx={{ flexGrow: 1}}>
                <Grid item xs={12}>
                        <Typography variant="h6" sx={{ textAlign: "center" }}>{art.gender}</Typography>
                        <Typography variant="h6" sx={{ textAlign: "center" }}>{moment(art.birthday).format("MMMM DD, YYYY")}</Typography>
                        <Typography variant="h6" sx={{ textAlign: "center", mt: 1, color: "#a6a6a6", fontSize: "14px" }}>Additional Information:</Typography>
                        <Typography variant="h6" sx={{ textAlign: "center", fontStyle: "italic", fontSize: "22px" }}>"{art.info}"</Typography>
              </Grid>
              </CardContent>
            </Collapse>
          </CardActionArea>
              <StyledRating
                  name="customized-color"
                  defaultValue={0}
                  max={1}
                  getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
                  precision={1}
                  size="small"
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{}} maxWidth="xl">
        <Typography
          variant="h4"
          sx={{ textTransform: "capitalize", color: "#008037", mb:4,mt:4 }}
          align="center"
        >
          <b>
            Albums
          </b>
        </Typography>

        <Grid container spacing={3}>
          {!loading && album && album.map((alb) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <Card
                sx={{
                  height: "auto",
                  width: "100%",
                  display: "flex",
                  position: "sticky",
                  flexDirection: "column",
                  backgroundColor: "white",
                  padding: 1
                }}
              >
                <CardActionArea>
                  <CardMedia
                      sx={{
                        pt: "100%",
                      }}
                      image={alb.image && Array.isArray(alb.image) ? alb.image.length > 0 ? alb.image[0].url : "https://via.placeholder.com/400/008307?text=Image+Placeholder" : null}
                    />
                  <ExpandAlbum
                    expand={expandalbum}
                    onClick={handleExpandAlbum}
                    aria-expanded={expandalbum}
                    aria-label="show more"
                  >
                    <span class="material-icons">expand_more</span>
                    <Typography variant="h6" sx={{textAlign: "center", mt:1, color: "#008037", transform: !expandalbum ? 'rotate(0deg)' : 'rotate(180deg)',}}>{alb.album_name}</Typography>
                  </ExpandAlbum>
                <Collapse in={expandalbum} timeout="auto" unmountOnExit>
                  <CardContent sx={{ flexGrow: 1}}>
                    <Grid item xs={12}>
                      <Typography variant="h6" sx={{ textAlign: "center", mt: 1, color: "#a6a6a6", fontSize: "15px" }}>Duration:</Typography>
                      <Typography variant="h6" sx={{ textAlign: "center" }}>{moment(alb.duration).format("HH:mm:ss")}</Typography>
                      <Typography variant="h6" sx={{ textAlign: "center", mt: 1, color: "#a6a6a6", fontSize: "15px" }}>Date Released:</Typography>
                      <Typography variant="h6" sx={{ textAlign: "center" }}>{moment(alb.date_released).format("MMMM DD, YYYY")}</Typography>
                      <Typography variant="h6" sx={{ textAlign: "center", mt: 1, color: "#a6a6a6", fontSize: "15px" }}>Producer:</Typography>
                      <Typography variant="h6" sx={{ textAlign: "center" }}>{alb.producer[0].producer_name}</Typography>
                    </Grid>
                  </CardContent>
                </Collapse>
              </CardActionArea>
                <StyledRating
                  name="customized-color"
                  defaultValue={0}
                  max={1}
                  getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
                  precision={1}
                  size="small"
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

    </Container>
</Box>
);

};
export default Gallery;