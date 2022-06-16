import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    TextField,
    TableCell,
    TableRow,
    ListItemText,
    Typography,
  } from "@mui/material";

export const StyledLink = styled(Link)({
    textDecoration: "none",
    color: "black",
  });

  export const StyledTableRow = styled(TableRow)({
    "&:hover": {
      background: "#E9E9E9",
    },
    background: "white",
  });

  export const StyledTableCell = styled(TableCell)({
    textAlign: "center",
  });

  export const BackBtn = styled(Button)({
    background: "#ffb8b2", //button color
    color: "black", //text-color
    marginTop: 1,
    borderRadius:4,
  
    "&:hover": {
      background: "#fff",
      borderColor: "black",
      color:"#f32727"  },
  });

  export const StyledButton = styled(Button)({
    background: "#008037", //button color
    color: "black", //text-color
    marginTop: 5,
    marginBottom: 2,
    marginRight: 4,
    borderRadius:4,
  
    "&:hover": {
      background: "#fff",
      borderColor: "#008037",
      color:"#008037"  },
  });

  export const StyledTextField = styled(TextField)({
    background: "white",
    borderRadius: 3,
    color: "#008037" //text-color
  });