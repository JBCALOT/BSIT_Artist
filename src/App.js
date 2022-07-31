import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./assets/theme";
import { useEffect } from "react";
import Home from "./pages/Home";
import Artist from "./pages/Artist";
import Album from "./pages/Albums";
import Track from "./pages/Tracks";
import Producer from "./pages/Producers";
import Gallery from "./pages/Gallery";
import Index from "./pages/Index";

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
      </Routes>
    </Router>
    </ThemeProvider>
    )}
    </>
  );
}

export default App;
