// configuracion de react router
// definir rutas para luego ser importado a app
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Volunteering from "../pages/Volunteering";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/volunteering" element={<Volunteering />} />
    </Routes>
  );
}

export default AppRoutes;
