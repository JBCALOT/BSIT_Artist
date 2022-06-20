import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box, 
    Typography, 
    Card,
    CardActionArea,
    CardContent,
    CardMedia, 
    Grid
} from "@mui/material";
import { Container } from "@mui/system";
import {StyledLink} from "../assets/styles";
import CssBaseline from "@mui/material/CssBaseline";

const a = require("../assets/1.svg").default;
const b = require("../assets/2.svg").default;
const c = require("../assets/4.svg").default;
const f = require("../assets/5.svg").default;


const Dashboard = () => {
  useEffect(() => {
    document.title = "BSIT | Home";
    return () => {};
  }, []);

  const cards = [
  {
    title: "Tracks",
    desc: "View Song Tracks...",
    image: a,
    alt: "Tracks",
    to: "/track",
},
{
  title: "Albums",
  desc: "View Albums...",
  image: b,
  alt: "Albums",
  to: "/album",
},
{
  title: "Artists",
  desc: "View Artists Information...",
  image: f,
  alt: "Artists",
  to: "/artist",
},
{
  title: "Producers",
  desc: "View Producers Information...",
  image: c,
  alt: "Producer",
  to: "/producer",
},
{
  title: "My Playlist",
  desc: "View my playlist",
  image: c,
  alt: "playlist",
  to: "#",
},
];

const dispatch = useDispatch();

return (

<Box  sx={{
        bgcolor: "#021707",
        pt: 6,
        pb: 5,
        minHeight: "100vh",
      }}>
<CssBaseline />
    <Container maxWidth="xl">
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