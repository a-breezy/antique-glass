import { Routes, Route } from "react-router-dom";

import CreateGlass from "./pages/CreateGlass";
import DeleteGlass from "./pages/DeleteGlass";
import EditGlass from "./pages/EditGlass";
import ShowGlass from "./pages/ShowGlass";
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vendor/:id/product/create" element={<CreateGlass />} />
          <Route
            path="/vendor/:id/product/details/:id"
            element={<ShowGlass />}
          />
          <Route path="/vendor/:id/product/edit/:id" element={<EditGlass />} />
          <Route
            path="/vendor/:id/product/delete/:id"
            element={<DeleteGlass />}
          />
        </Routes>
      </VendorProvider>
    </ShoppingCartProvider>
  );
}
