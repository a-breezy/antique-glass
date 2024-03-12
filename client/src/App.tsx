import { Routes, Route } from "react-router-dom";

import CreateGlass from "./pages/CreateGlass";
import DeleteGlass from "./pages/DeleteGlass";
import EditGlass from "./pages/EditGlass";
import ShowGlass from "./pages/ShowGlass";
import Home from "./pages/Home";
import NavBar from "./components/NavBar/NavBar";
import About from "./pages/About"
import Store from "./pages/Store";
import Dashboard from "./pages/Dashboard";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

export default function App ()  {
  return (
    <ShoppingCartProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* create an admin login and signup */}
        {/* <Route path="/vendor" element={<AdminLogIn />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/store" element={<Store />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/glass/create" element={<CreateGlass />} />
        <Route path="/glass/details/:id" element={<ShowGlass />} />
        <Route path="/glass/edit/:id" element={<EditGlass />} />
        <Route path="/glass/delete/:id" element={<DeleteGlass />} />
      </Routes>
    </ShoppingCartProvider>
  );
};
