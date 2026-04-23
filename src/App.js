import logo from './logo.svg';
import './App.css';
import Navbar from './Pages/Navbar';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import Footer from './Pages/Footer';
import Admin from './Pages/Admin';
import RestaurantLogin from './Pages/RestaurantLogin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RestaurantAdmin from './Pages/RestaurantAdmin';
import RiderAdmin from './Pages/RiderAdmin';
// import MenuItem from './Pages/MenuItem';
// import Cart from './Pages/CartPage';
import CartPage from './Pages/CartPage';
import IntroSection from './Pages/IntroSection';
import FastDeliverySection from './Pages/FastDeliverySection';
import MenuItem from './Pages/MenuItem';
import PartnerWithUs from './Pages/PatnerWithUs';
import ContactUs from './Pages/ContactUs';
import CuisineTypeItems from './Pages/CuisineTypeItems';
import SearchData from './Pages/SearchData';
import ForgetPassword from './Pages/ForgetPassword';



function App() {
  return (
    <>
      <BrowserRouter>
  <Navbar /> 
  
  <Routes>
    <Route path="/" element={
      <>
        <IntroSection />
        <FastDeliverySection />
      </>
    }/>
    <Route path="/register" element={<Registration />} />
    <Route path="/login" element={<Login />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/restaurant/login" element={<RestaurantLogin />} />
    <Route path="/restaurant/addmenu" element={<RestaurantAdmin />} />
    <Route path="/RiderAdmin" element={<RiderAdmin />} />
    <Route path="/menuitems" element={<MenuItem />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/partnerwithus" element={<PartnerWithUs />} />
    <Route path="/contactus" element={<ContactUs />} ></Route>
    <Route path="/items/:id" element={<CuisineTypeItems />} ></Route>
    <Route path="/search/:query" element={<SearchData />} ></Route>
    <Route path="/forgetPassword" element={<ForgetPassword />} ></Route>
  </Routes>

  <Footer /> 
</BrowserRouter>
    </>
  );
} 

export default App;
