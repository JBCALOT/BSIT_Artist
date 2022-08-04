import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import {
    Box, 
    Container,
    Dialog,
    Grid,
    Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { StyledButton, StyledTextField } from "../assets/styles";
import { 
  AddProducer,
  GetAllProducer,
 } from "../redux/slices/ProducerSlice";
import EditProd from "./CRUD/EditProducer";
import Delete from "./CRUD/Delete";
import Appbar from "../assets/Appbar";

const Producer = () => {

  useEffect(() => {
    document.title = "BSIT | Producers";
    return () => {};
  }, []);
 
  function refreshPage() {
      window.location.reload(false);
    };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loading, producer, errors, success } = useSelector(
    (state) => state.producer
  );
  const dispatch = useDispatch();

//Datagrid
const columns = [
  {
    field: "producer_name",
    headerName: "Producer",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 150,
  },
  {
    field: "website",
    headerName: "Website",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 160,
  },{
    field: "social_media",
    headerName: "Social Media",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 160,
  },
  {
    headerName: "Actions",
    flex: 1,
    headerAlign: "center",
    align: "center",
    minWidth: 150,
    renderCell: (cellValues) => {
      return (
        <>
           <EditProd
            id={producer.id}
            data={cellValues.row}
            startIcon={<span class="mateiral-icons">edit</span>}
          />
          <Delete
            id={cellValues.row._id}
            name={cellValues.row.producer_name}
            collection="producers"
            data={cellValues.row} 
          />
        </>
      );
    },
    sortable: false,
  },
];
const handleCellClick = (param, e) => {
  e.stopPropagation();
};
const handleRowClick = (param, e) => {
  e.stopPropagation();
};

const [values, setvalues] = useState({
  producer_name: "",
  website: "",
  social_media: "",
});

const handleChange = (e) => {
  setvalues({ ...values, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("producer_name", values.producer_name);
  formData.append("website", values.website);
  formData.append("social_media", values.social_media);
  dispatch(AddProducer({data: formData}));
  //refreshPage();
  setOpen(false);
};

useEffect(() => {
  dispatch(GetAllProducer());
  return () => {};
}, [dispatch]);

return(
<Box  sx={{
        background: "linear-gradient(black, #021707, #008037)",
        pt: 5,
        pb: 5,
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
            Producers
          </b>
        </Typography>
<br/>
          <Grid item xs>
            <Box textAlign={"center"}>
            <StyledButton
              onClick={handleOpen}
              margin="10"
              startIcon={<span class="material-icons">add</span>}
              align="center"
            >
              Add Producer
            </StyledButton>
            <StyledButton onClick={refreshPage}>⟳</StyledButton>
            </Box>          
           </Grid>
        <br/>
 <Grid item sm flexDirection={"column"}>
          <Box
            sx={{
              bgcolor: "background.paper 0",
              pt: 3,
              pb: 6,
              borderColor: "#021707"
            }}
          >
            <div style={{ height: 525, width: "auto"}}>
              {!loading && producer && (
                <DataGrid
                  rows={producer}
                  columns={columns}
                  getRowId={(row) => row._id}
                  onCellClick={handleCellClick}
                  onRowClick={handleRowClick}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  {...producer}
                  sx={{
                    color: "white",
                    borderStyle: "none",
                  }}
                />
              )}
            </div>
          </Box>
        </Grid>

        <Dialog open={open} onClose={handleClose} maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            alignItems: "center",
            p: 2,
            borderRadius: 5,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h4"
              color="text.primary"
              marginBottom={2}
            >
              Add New Producer
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="producer_name"
                  label="Producer Name"
                  name="producer_name"
                  size="small"
                  onChange={handleChange}                              
                />
              </Grid>            

              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="website"
                  label="Website"
                  name="website"
                  size="small"
                  onChange={handleChange}                 
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="social_media"
                  label="Social Media"
                  name="social_media"
                  size="small"
                  onChange={handleChange}
                  
                />
              </Grid>          
            </Grid>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                alignItems: "center",
              }}
            ><br/>
              <StyledButton
                type="submit"
                variant="contained"
                onClick={handleSubmit}
              >
                Add
              </StyledButton>
            </Box>
          </Container>
        </Box>
      </Dialog>
      <br />

</Container>
</Box>
);
};


export default Producer;
