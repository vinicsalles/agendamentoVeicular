import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login/index";
import ListarCadastros from "../Pages/ListarCadastros/index";
import Home from "../Pages/Home/index";
import Agendar from "../Pages/Agendar/index";
import NotFound from "../Pages/NotFound/index";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/agendamentos" element={<ListarCadastros />} />
      <Route path="/agendar" element={<Agendar />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
