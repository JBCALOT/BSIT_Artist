import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box, 
    Typography, 
    Card,
    CardActionArea,
    CardContent,
    CardMedia, 
    Grid,
    IconButton,
} from "@mui/material";
import Appbar from "../assets/Appbar";
import { Container } from "@mui/system";
import {StyledLink} from "../assets/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { LogoutAdminThunk } from "../redux/slices/UserSlice";

const a = require("../assets/1.svg").default;
const b = require("../assets/2.svg").default;
const c = require("../assets/4.svg").default;
const f = require("../assets/5.svg").default;


const Dashboard = () => {
  useEffect(() => {
    document.title = "BSIT | Home";
    return () => {};
  }, []);

  const Logout = (e) => {
    dispatch(LogoutAdminThunk());
  };

  const cards = [
  {
    title: "Producers",
    desc: "View Producers Information...",
    image: c,
    alt: "Producer",
    to: "/admin/producer",
  },
  {
    title: "Tracks",
    desc: "View Song Tracks...",
    image: a,
    alt: "Tracks",
    to: "/admin/track",
},
{
  title: "Albums",
  desc: "View Albums...",
  image: b,
  alt: "Albums",
  to: "/admin/album",
},
{
  title: "Artists",
  desc: "View Artists Information...",
  image: f,
  alt: "Artists",
  to: "/admin/artist",
},

/* {
  title: "Gallery",
  desc: "View Artist and Album gallery",
  image: c,
  alt: "gallery",
  to: "#",
}, */
];

const dispatch = useDispatch();

return (

<Box  sx={{
        bgcolor: "#021707",
        pb: 5,
        pt: 4,
        minHeight: "100vh",
      }}>
<CssBaseline />
    <Container maxWidth="xl">
      {/* <IconButton size="large" onClick={Logout}><LogoutIcon/></IconButton> */}
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
        <Container sx={{}} maxWidth="xl">
        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
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