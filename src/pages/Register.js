import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import {CreateAdminThunk, clearSuccess, clearError } from "../redux/slices/UserSlice";

const LoginUser = () => {
const { loading, isAuthenticated, errors, success} = useSelector((state) => state.user);
const dispatch = useDispatch();
const navigate = useNavigate();
const [password_error, setpassword_error] = useState(null);
const [values, setvalues] = useState({
    username: "",
    email: "",
    password: "",
});
useEffect(() => {
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
      if (values.password === values.c_password) {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      dispatch(CreateAdminThunk(formData));
    } else {
        setpassword_error("Passwords do not match! Please check your input");
      }
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
              SIGN UP
            </Typography> <br/>
  
            <FormControl fullWidth>
              <form onSubmit={onSubmit}>
              <StyledTextField
                  margin="normal"
                  size="small"
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  onChange={onChange}
                  autoComplete="username"
                  autoFocus
                />
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
                <StyledTextField
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  name="c_password"
                  label="Confirm Password"
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
                  Submit
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
          </Box>
        </Container>
      </Box>
    );
  };
  
  //export { LoginUser };
export default LoginUser;