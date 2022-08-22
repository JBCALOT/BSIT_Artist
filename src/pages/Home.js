import { useEffect } from "react";
import {
    Box, 
    Typography, 
    Card,
    CardActionArea,
    CardContent,
    CardMedia, 
    Grid,
    Divider,
    Paper,
} from "@mui/material";
import Appbar from "../assets/Appbar";
import { Container } from "@mui/system";
import {StyledLink} from "../assets/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import { GetAllAlbum } from "../redux/slices/AlbumSlice";
import { GetAllTracks } from "../redux/slices/TrackSlice";

const a = require("../assets/1.svg").default;
const b = require("../assets/2.svg").default;
const c = require("../assets/4.svg").default;
const f = require("../assets/5.svg").default;

const Dashboard = () => {
  useEffect(() => {
    document.title = "BSIT | Home";
    return () => {};
  }, []);

  const dispatch = useDispatch();

  const { long} = useSelector(
    (state) => state.album
  );
  const { longtrack} = useSelector(
    (state) => state.track
  );

  useEffect(() => {
    dispatch(GetAllAlbum());
    return () => {};
  }, [dispatch]);
  useEffect(() => {
    dispatch(GetAllTracks());
    return () => {};
  }, [dispatch]);

  const cards = [
  {
    title: "Producers",
    desc: "Manage Producers Information...",
    image: c,
    alt: "Producers",
    to: "/admin/producer",
  },
  {
    title: "Tracks",
    desc: "Manage Song Tracks...",
    image: a,
    alt: "Tracks",
    to: "/admin/track",
},
{
  title: "Albums",
  desc: "Manage Albums...",
  image: b,
  alt: "Albums",
  to: "/admin/album",
},
{
  title: "Artists",
  desc: "Manage Artists Information...",
  image: f,
  alt: "Artists",
  to: "/admin/artist",
}
];

return (
<Box  sx={{
        bgcolor: "#021707",
        pb: 5,
        pt: 7,
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
            My Dashboard
          </b>
        </Typography>
<br/>

    <Container sx={{ py: 4 }} maxWidth="xl" >
      <Grid container xs={12} sm={12} md={12} lg={12} spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            position: "sticky",
            flexDirection: "column",
            backgroundColor: "#008037",
            padding: 2,
          }}>
            <Typography sx={{color:"white", mb:2,}}>Longest Album Duration</Typography>
            <CardMedia
            sx={{
              pt: "100%",
            }}
            image={long ? long.image[0].url  : null}
            />

            <Typography sx={{color:"white", mt:2}}>{long ? long.album_name + " - " + long.duration.hours + ":" + long.duration.minutes + ":" + long.duration.seconds: null}</Typography>

          </Card>
        </Grid>

        {/* Artists with Most Albums  */}
        <Grid item xs={12} sm={6} md={4} lg={4}>
            <Paper elevation={12}>
              <>
                <iframe
                  title="MostAlbums"
                  style={{
                    background: "#fff",
                    border: "none",
                    borderRadius: "2px",
                    maxWidth: "100%",
                  }}
                  width="650"
                  height="530"
                  src="https://charts.mongodb.com/charts-project-0-mvuco/embed/charts?id=62f387ce-026e-4dcb-8961-7ed8891dfc39&maxDataAge=60&theme=light&autoRefresh=true"
                ></iframe>
              </>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            position: "sticky",
            flexDirection: "column",
            backgroundColor: "#000",
            padding: 2,
          }}>
            <Typography sx={{color:"white", mb:2,}}>Longest Track Duration</Typography>
            <CardMedia
            sx={{
              pt: "100%",
            }}
            image={a}
            alt="longest-track-duration"
            />
            <Typography sx={{color:"white", mt:2}}>{longtrack ? longtrack.track_name + " - " + longtrack.duration.minutes + ":" + longtrack.duration.seconds + " minutes" : null}</Typography>

          </Card>
        </Grid>

      </Grid>
      </Container>
      <br/>
      <Divider/>
      <br/>

      <Container sx={{}} maxWidth="xl">
        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={3} lg={3} xl={3}>
              <Card
                sx={{
                  height: "100%",
                  width: "108%",
                  display: "flex",
                  position: "sticky",
                  flexDirection: "column",
                  backgroundColor: "black"
                }}
              >
                <CardActionArea>
                  <StyledLink to={card.to}>
                    <CardMedia
                      sx={{
                        pt: "100%",
                      }}
                      image={card.image}
                      alt={card.alt}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>                     
                        <Typography gutterBottom variant="h5" color ="white">
                          {card.title}
                        </Typography>
                      <Typography color="GrayText">
                        {card.desc}
                      </Typography>
                    </CardContent>
                  </StyledLink>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

    </Container>
</Box>
);
};
export default Dashboard;