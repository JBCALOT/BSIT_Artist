
import React, {} from 'react';

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
import { EditButton, LoginButton, StyledTextField, StyledLink, StyledButton, } from "../assets/styles";
import {LoginUserThunk, clearSuccess, clearError } from "../redux/slices/UserSlice";


const ForgotPass = () => {
const { loading, isAuthenticated, errors, success } =
      useSelector((state) => state.user);


        return (

            <Box
            sx={{
                background: "linear-gradient(black, #021707, #008037)",
                pt: 6,
                pb: 5,
                minHeight: "100vh",
            }}
          >
            <Container onSubmit={this.handlesubmit}>

              <h3>Forgot Password</h3>

                <Grid className="form-group">

                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Email"
                        
                        onChange={e => this.password = e.target.value}/>

                </Grid>

                <StyledButton className="btn btn-primary btn-block">Submit</StyledButton>

            </Container>
            
        </Box>

        );

    };

export default Forgotpass;


