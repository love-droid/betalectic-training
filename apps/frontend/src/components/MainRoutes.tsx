import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./HomePage";
import Favourite from "./Favourite";

const Mainroutes: FC = () => {
  return (
    <div className="Mainroutes">
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/Fav"} element={<Favourite />} />
      </Routes>
    </div>
  );
}

export default Mainroutes;
