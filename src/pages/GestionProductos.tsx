import React, { useState } from "react";

import { AgregarProducto } from "../components/AddProductForm/AddProductForm";
import { ListaProductos } from "../components/ListaProductos/ProductList";

export const GestionProductos: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Gestión de Productos</h1>

      {/* Botón para abrir el modal de añadir productos */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Añadir Producto
        </button>
      </div>

      {/* Modal para añadir producto */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-50 p-6 rounded shadow-lg w-full max-w-md h-3/4 overflow-y-auto relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-sea-700 hover:text-sea-900"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-blue-600">Agregar Producto</h2>
            <AgregarProducto onClose={handleCloseModal} />
          </div>
        </div>
      )}

      {/* Lista de productos */}
      <ListaProductos />
    </div>
  );
};
