import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./assets/theme";
import Home from "./pages/Home";
import Artist from "./pages/Artist";
import Album from "./pages/Albums";
import Track from "./pages/Tracks";
import Producer from "./pages/Producers";


function App() {
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/artist" element={<Artist />}></Route>
        <Route path="/album" element={<Album />}></Route>
        <Route path="/track" element={<Track />}></Route>
        <Route path="/producer" element={<Producer />}></Route>

      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
