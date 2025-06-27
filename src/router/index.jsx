// configuracion de react router
// definir rutas para luego ser importado a app
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Volunteering from "../pages/Volunteering";
import VolunteerPageInfo from "../pages/VolunteerPageInfo";
import NotFoundPage from "../pages/NotFoundPage";
import MainLayout from "../layouts/MainLayout";
//import VolunteerDetailPage from "../pagesVolunteerDetailPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/volunteerPageInfo" element={<VolunteerPageInfo />} />
        <Route path="/volunteerDetailPage/:areaId" element={<VolunteerDetailPage/>}/>
        <Route path='/volunteering' element={<Volunteering />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes;
