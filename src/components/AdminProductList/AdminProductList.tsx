// src/components/AdminProductList/AdminProductList.tsx

import Button from "../common/Button/Button"; // Usa el componente de botón reutilizable
import { Product } from "../../types/interfaces"; // Asegúrate de usar la interfaz Product
import React from "react";

interface AdminProductListProps {
  products: Product[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const AdminProductList: React.FC<AdminProductListProps> = ({ products, onEdit, onDelete }) => {
  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Listado de productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded shadow-md p-4 bg-white">
            <img
              src={product.fotoPortada}
              alt={product.nombre}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-xl font-bold text-sea-800">{product.nombre}</h3>
            <p className="text-sea-700 mb-2">Descripcion: {product.descripcion}</p>
            <p className="text-sea-700 mb-2">Tamaño: {product.tamano}</p>
            <p className="text-sea-700 mb-2">Material: {product.material}</p>
            <p className="text-sea-700 mb-2">Stock: {product.cantidad}</p>
            <p className="text-sea-700 mb-2">Precio: ${product.precio??' - '}</p>
            <div className="flex justify-between mt-4">
              <Button text="Editar" onClick={() => onEdit(product.id)} variant="primary" />
              <Button text="Eliminar" onClick={() => onDelete(product.id)} variant="danger" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductList;
