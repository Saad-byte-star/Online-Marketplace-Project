import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout";
import Home from "./components/Home/Home.jsx"
import About from "./components/About/About.jsx";
import Advertisement from "./components/Advertisements/Advertisement.jsx"
import AdvertisementDetail from "./components/AdvertisementDetails/AdvertisementDetail.jsx";
import Logout from "./components/Logout/Logout.jsx";
import Verification from "./components/Verification/Verification.jsx";
import Profile from "./components/Profile/Profile.jsx";


function App() {
  return (
  <>
  <Routes>

    <Route path="/">
     <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/category/:id" element={<Advertisement />} />
      <Route path="/advertisement/:id" element={<AdvertisementDetail />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/verification" element={<Verification/>} />
      <Route path="/profile" element={<Profile/>} />






     </Route>
    </Route>

  </Routes>
  </>
  );
}

export default App;
