import { useEffect } from "react";
import {
    Box, 
    Typography, 
    Card,
    CardActionArea,
    CardContent,
    CardMedia, 
    Grid,
} from "@mui/material";
import Appbar from "../assets/Appbar";
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
    title: "Producers",
    desc: "Manage Producers Information...",
    image: c,
    alt: "Producer",
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
},

/* {
  title: "Gallery",
  desc: "View Artist and Album gallery",
  image: c,
  alt: "gallery",
  to: "#",
}, */
];

return (
<Box  sx={{
        bgcolor: "#021707",
        pb: 5,
        pt: 5,
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