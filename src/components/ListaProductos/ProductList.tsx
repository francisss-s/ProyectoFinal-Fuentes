import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

import { EditarProducto } from "../EditProduct/EditProduct"; // Componente de edición
import Swal from "sweetalert2";
import { db } from "../../../firebase-config"; // Asegúrate de tener configurado Firebase
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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

export const ListaProductos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    setLoading(true);
    const productosSnapshot = await getDocs(collection(db, "productos"));
    const productosList = productosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Producto[];
    setProductos(productosList);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "productos", id));
        setProductos(productos.filter((producto) => producto.id !== id));
        Swal.fire(
          'Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        );
      }
    });
  };

  const handleEdit = (producto: Producto) => {
    setProductoSeleccionado(producto);
  };

  const closeModal = () => {
    setProductoSeleccionado(null);
  };

  const handleProductoActualizado = () => {
    fetchProductos();
    closeModal();
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Lista de Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <div key={producto.id} className="border rounded shadow-md p-4 bg-gray-50">
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
            <div className="flex mt-4 space-x-2">
              <button
                onClick={() => handleEdit(producto)}
                className="bg-blue-500 text-white py-1 px-2 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(producto.id)}
                className="bg-red-500 text-white py-1 px-2 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para editar producto */}
      {productoSeleccionado && (
        <EditarProducto 
          producto={productoSeleccionado} 
          onClose={closeModal} 
          onProductoActualizado={handleProductoActualizado} 
        />
      )}
    </div>
  );
};
