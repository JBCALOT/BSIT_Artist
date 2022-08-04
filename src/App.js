import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./assets/theme";
import { useEffect } from "react";

import Gallery from "./pages/Gallery";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserOutlet from "./pages/outlet/UserOutlet";
import { GetAuthDetails } from "./redux/slices/UserSlice";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(GetAuthDetails());
    //console.log(process.env.REACT_APP_API_HOST);
    return () => {};
  }, [dispatch]);
  return (
    <>
      {!loading && (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path='/gallery' element={<Gallery/>}/>
        <Route path="/admin/*" element={<UserOutlet />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
    </ThemeProvider>
    )}
    </>
  );
}

export default App;
