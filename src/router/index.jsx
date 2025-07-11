// configuracion de react router
// definir rutas para luego ser importado a app
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Volunteering from "../pages/Volunteering";
import VolunteerPageInfo from "../pages/VolunteerPageInfo";
import NotFoundPage from "../pages/NotFoundPage";
import MainLayout from "../layouts/MainLayout";
import VolunteerDetailPage from "../pages/VolunteerDetailPage";
//import VolunteerDetailPage from "../pagesVolunteerDetailPage";
import DonatePage from "../pages/DonatePage";
import DonationForm from "../pages/DonationForm";
import SuccessPage from "../pages/SuccessPage";
import CancelPage from "../pages/CancelPage";
function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/volunteerPageInfo" element={<VolunteerPageInfo />} />
        {/** <Route path="/volunteer/booth/:subAreaId" element={<SubAreaDetailPage />} />
        <Route path="/volunteerDetailPage/:areaId" element={<VolunteerDetailPage/>}/> */}
        {/** ruta que espera un parametro dinamico */}
        <Route path="/volunteerDetailPage/:subAreaId" element={<VolunteerDetailPage />} />
        <Route path="/donation-form" element={<DonationForm />} />
        <Route path="/donation" element={<DonatePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path='/volunteering' element={<Volunteering />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes;
