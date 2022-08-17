import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    Alert,
    AlertTitle,
    Box,
    Container,
    FormControl,
    Grid,
    Snackbar,
    Typography,
  } from "@mui/material";
import { EditButton, LoginButton, StyledTextField, StyledLink, } from "../assets/styles";
import {LoginUserThunk, clearSuccess, clearError } from "../redux/slices/UserSlice";

const LoginUser = () => {
    const { loading, isAuthenticated, errors, success } =
      useSelector((state) => state.user);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [values, setvalues] = useState({
      email: "",
      password: "",
    });

    useEffect(() => {
        if (isAuthenticated){
            navigate("/admin");
        }
      return () => {};
    }, [isAuthenticated, navigate]);

    const onChange = (e) => {
      setvalues({ ...values, [e.target.name]: e.target.value });
    };
    const onClose = (e) => {
      dispatch(clearSuccess());
      dispatch(clearError());
    };

    const onSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      dispatch(LoginUserThunk(formData));
      //dispatch(LoginAdminThunk(formData));
    };
  
    return (
      <Box
        sx={{
            background: "linear-gradient(black, #021707, #008037)",
            pt: 6,
            pb: 5,
            minHeight: "100vh",
        }}
      >
        
        {success && (
          <Snackbar
            open={success}
            autoHideDuration={3000}
            onClose={onClose}
            name="sucess"
          >
            <Alert severity="success" variant="filled">
              <AlertTitle>Success</AlertTitle>
              {success}
            </Alert>
          </Snackbar>
        )}
  
        {errors && (
          <Snackbar
            open={errors}
            autoHideDuration={3000}
            onClose={onClose}
            name="error"
          >
            <Alert severity="error" variant="filled">
              <AlertTitle>Error Login</AlertTitle>
              {errors}
            </Alert>
          </Snackbar>
        )}
        {/* <BackBtn component={StyledLink} to="/">
          Back to Homepage
        </BackBtn> */}
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Box
            sx={{
                bgcolor: "#fff",
                pt: 6,
                pb: 5,
                alignItems: "center",
                p: 3,
                borderRadius: 4,
                boxShadow: 3,
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold", color: "#021707", textAlign: "center" }}>
              LOG IN
            </Typography> <br/>
  
            <FormControl fullWidth>
              <form onSubmit={onSubmit}>
                <StyledTextField
                  margin="normal"
                  size="small"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={onChange}
                  autoComplete="email"
                  autoFocus
                />
                <StyledTextField
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  onChange={onChange}
                  id="password"
                  autoComplete="current-password"
                />
            <Grid item sx={{textAlign: "center", p: 3}}>
                <span align="center" class="material-icons-round">music_note</span>
            </Grid>
                <LoginButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                >
                  Log In
                </LoginButton>
                <EditButton
                  component={StyledLink} to="/"
                  fullWidth
                >
                  Back to Index
                </EditButton>
              </form>
            </FormControl>
  
            <Grid container>
              <Grid item>
                <StyledLink to="/register">
                  Don't have an account? <u>Sign Up</u>
                </StyledLink>
                </Grid>
                </Grid>


            <Grid container>
              <Grid item>
                <StyledLink to="/forgot">
                  Forgot Password
                </StyledLink>
              </Grid>
            </Grid>
          </Box>
        </Container>

      {/* <container>
          <p className = "forgot-password">
            <Link to={'/forgot'}>Forgot Password</Link>
          </p>

      </container> */}

      </Box>
      
    );
  };
  
  
  //export { LoginUser };
export default LoginUser;