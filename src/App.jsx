import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./pages/product/Product";
import Payment from "./pages/product/Payment";
import Create from "./pages/product/Create";
import Cart from "./pages/product/Cart";
import ListOrdered from "./pages/product/ListOrdered";
import Homepage from "./admin/home/Homepage";
import OwnerPage from "./owner/OwnerPage";
import ListAccounts from "./admin/home/ListAccounts";
import ListCards from "./admin/home/ListCards";
import ListOrders from "./admin/home/ListOrders";
import Dashboard from "./pages/Dashboard/dashboard";
import Login from "./pages/login/login";
import Shop from "./admin/home/Shop/Shop";
import EventDetails from "./components/eventDetails/EventDetails";
import { CartProvider } from "./pages/product/CartContext";
import DashboardVendor from "./pages/VendorDashboard/VendorDashboard";
import SalesShopOrder from "./pages/product/Product";
import MobileDetector from "./MobileDetector";

function App() {
  return (
    <MobileDetector>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:shopId/products" element={<SalesShopOrder />} />
            <Route path="/ListAccounts" element={<ListAccounts />} />
            <Route path="/ListCards" element={<ListCards />} />
            <Route path="/ListOrders" element={<ListOrders />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/VendorDash" element={<DashboardVendor />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/ListOrdered" element={<ListOrdered />} />
            <Route path="/event/:id" element={<EventDetails />} />
          </Routes>
        </Router>
      </CartProvider>
    </MobileDetector>
  );
}

export default App;
