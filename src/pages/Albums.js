import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import {
    Box, Container, Typography
} from "@mui/material";


const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

const Album = () => {
    function refreshPage() {
        window.location.reload(false);
      };

return(
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
            Albums
          </b>
        </Typography>
<br/>
</Container>
</Box>
);
};


export default Album;
