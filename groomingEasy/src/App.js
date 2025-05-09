import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import NavbarHome from "./layout/NavbarHome";
import Slider from "./pages/Slider";
import Tiles from "./pages/Tiles";
import SalonCatalogSlider from "./pages/SalonCatalogSlider";
import HairStylistSlider from "./pages/HairStylistSlider";
import TrendingFlag from "./pages/TrendingFlag";
import ProductCatalog from "./pages/ProductCatalog";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>

          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Slider />
                <Tiles />
              </>
            }
          />


          <Route
            path="/home"
            element={
              <>
                <NavbarHome />
                <TrendingFlag />
                <SalonCatalogSlider />
                <TrendingFlag text="Trending Stylists In the Town" />
                <HairStylistSlider />
                <TrendingFlag text="Shop Now" />
                <ProductCatalog />
              </>
            }
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
