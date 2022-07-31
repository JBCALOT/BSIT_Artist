import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home";
import Artist from "../Artist";
import Album from "../Albums";
import Track from "../Tracks";
import Producer from "../Producers";
import Gallery from "../Gallery";

function Outlet() {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      {loading === false && isAuthenticated ? (
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/artist" element={<Artist />}></Route>
        <Route path="/album" element={<Album />}></Route>
        <Route path="/track" element={<Track />}></Route>
        <Route path="/producer" element={<Producer />}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
      </Routes>
) : (
    isAuthenticated === false && <Navigate to={"/index"} />
    )}
    </>
  );
}

export default Outlet;
