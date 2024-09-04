// src/components/ListaProductos/ListaProductos.tsx

import React from "react";

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  tamano: string;
  material: string;
  cantidad: number;
  fotoPortada: string;
  fotosExtras: string[];
}

interface ListaProductosProps {
  productos: Producto[];
  onProductoClick: (id: string) => void; // Añadir función de click
}

const ListaProductosPag: React.FC<ListaProductosProps> = ({ productos, onProductoClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="border rounded shadow-md p-4 bg-white cursor-pointer"
          onClick={() => onProductoClick(producto.id)} // Manejar clic en producto
        >
          <img
            src={producto.fotoPortada}
            alt={producto.nombre}
            className="w-full h-48 object-cover mb-4 rounded"
          />
          <h3 className="text-xl font-bold text-sea-800">{producto.nombre}</h3>
          <p className="text-sea-700">{producto.descripcion}</p>
          <p className="text-sea-700">Tamaño: {producto.tamano}</p>
          <p className="text-sea-700">Material: {producto.material}</p>
          <p className="text-sea-700">Cantidad: {producto.cantidad}</p>
        </div>
      ))}
    </div>
  );
};

export default ListaProductosPag
