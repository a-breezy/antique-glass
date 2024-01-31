import React from "react";
import { Routes, Route } from "react-router-dom";

import CreateGlass from "./pages/CreateGlass";
import DeleteGlass from "./pages/DeleteGlass";
import EditGlass from "./pages/EditGlass";
import ShowGlass from "./pages/ShowGlass";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import NavBar from "./components/NavBar/NavBar";

export const App = () => {
  return (
    <ShoppingCartProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/glass/create" element={<CreateGlass />} />
        <Route path="/glass/details/:id" element={<ShowGlass />} />
        <Route path="/glass/edit/:id" element={<EditGlass />} />
        <Route path="/glass/delete/:id" element={<DeleteGlass />} />
      </Routes>
    </ShoppingCartProvider>
  );
};

export default App;
