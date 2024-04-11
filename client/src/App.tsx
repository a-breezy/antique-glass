import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NavBar from "./components/NavBar/NavBar";
import About from "./pages/About";
import Store from "./pages/Store";
import Signup from "./pages/Signup";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard";
import CreateProduct from "./pages/CreateProduct";
import DeleteProduct from "./pages/DeleteProduct";
import EditProduct from "./pages/EditProduct";
import ShowProduct from "./pages/ShowProduct";

import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { VendorProvider } from "./context/VendorContext";


export default function App() {
  return (
    <ShoppingCartProvider>
      <VendorProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/store" element={<Store />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard/:vendorId" element={<Dashboard />} />
          <Route path="/dashboard/:vendorId/create" element={<CreateProduct />} />
          <Route
            path="/dashboard/:vendorId/edit/:productId"
            element={<EditProduct />}
          />
          <Route
            path="/dashboard/:vendorId/delete/:productId"
            element={<DeleteProduct />}
          />
          <Route path="/products/:productId" element={<ShowProduct />} />
        </Routes>
      </VendorProvider>
    </ShoppingCartProvider>
  );
}
