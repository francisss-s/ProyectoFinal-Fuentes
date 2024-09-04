import 'react-toastify/dist/ReactToastify.css';

import Carousel from "../components/Carousel/Carousel"; // Asegúrate de que la ruta sea correcta
import React from "react";

export default function Inicio() {
  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Inicio</h1> */}
      <Carousel interval={5000} />
      <div className="mt-4">Sección de vista rápida</div>
      <div>Sección de productos destacados</div>
      <div>Sección de promociones</div>
    </div>
  );
}
