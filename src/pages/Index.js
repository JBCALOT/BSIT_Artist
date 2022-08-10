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

const a = require("../assets/6.svg").default;
const b = require("../assets/Guest.svg").default;

const Index = () => {
  useEffect(() => {
    document.title = "BSIT | Index";
    return () => {};
  }, []);

  const cards = [
  {
    title: "Login",
    desc: "Manage your music app",
    image: a,
    alt: "Login",
    to: "/login",
},
{
  title: "Continue as Guest",
  desc: "View Artists and Albums",
  image: b,
  alt: "gallery",
  to: "/gallery",
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
          variant="h2"
          sx={{ textTransform: "capitalize", color: "white" }}
          align="center"
        >
          <b>
            Welcome back
          </b>
        </Typography>
<br/>
        <Container sx={{}} maxWidth="xl">
        <Grid container spacing={10}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={6} lg={6} xl={6}>
              <Card
                sx={{
                  height: "100%",
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
export default Index;