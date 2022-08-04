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
        <Route index element={<Home />} />
        <Route path="/artist" element={<Artist />}/>
        <Route path="/album" element={<Album />}/>
        <Route path="/track" element={<Track />}/>
        <Route path="/producer" element={<Producer />}/>
        <Route path="/gallery" element={<Gallery />}/>
      </Routes>
) : (
    isAuthenticated === false && <Navigate to={"/"} />
    )}
    </>
  );
}

export default Outlet;
