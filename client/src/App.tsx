import { Routes, Route } from "react-router-dom";

import CreateGlass from "./pages/CreateProduct";
import DeleteGlass from "./pages/DeleteProduct";
import EditGlass from "./pages/EditGlass";
import ShowGlass from "./pages/ShowProduct";
import Home from "./pages/Home";
import NavBar from "./components/NavBar/NavBar";
import About from "./pages/About";
import Store from "./pages/Store";
import Dashboard from "./pages/Dashboard";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import Login from "./components/Login/Login";
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
          {/* create login and signup */}
          <Route path="/login" element={<Login />} />
          {/* <Route path='/signup' element={<Signup />} /> */}
          <Route path="/dashboard/:vendorId" element={<Dashboard />} />
          <Route path="/dashboard/:vendorId/create" element={<CreateGlass />} />
          <Route path="/dashboard/:vendorId/edit/:productId" element={<EditGlass />} />
          <Route path="/dashboard/:vendorId/delete/:productId" element={<DeleteGlass />} />
          <Route path="/products/:productId" element={<ShowGlass />} />
        </Routes>
      </VendorProvider>
    </ShoppingCartProvider>
  );
}
