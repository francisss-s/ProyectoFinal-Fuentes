// src/pages/ProductManagement.tsx

import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

import AddProductForm from "../components/AddProductForm/AddProductForm";
import AdminProductList from "../components/AdminProductList/AdminProductList";
import EditProduct from "../components/EditProduct/EditProduct"; // Importa el componente EditProduct
import { Product } from "../types/interfaces";
import { db } from "../../firebase-config";

const ProductManagement: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false); // Estado para el modal de edición
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null); // Estado para el producto seleccionado

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
        descripcion: doc.data().descripcion,
        tamano: doc.data().tamano,
        material: doc.data().material,
        cantidad: doc.data().cantidad,
        precio: doc.data().precio,
        fotoPortada: doc.data().fotoPortada,
        fotosExtras: doc.data().fotosExtras,
        creadoEn: doc.data().creadoEn.toDate(), // Convierte marca de tiempo de Firebase a Date
      })) as Product[];
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenEditModal = (id: string) => {
    setSelectedProductId(id);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedProductId(null);
  };

  const handleEditProduct = async (id: string) => {
    handleOpenEditModal(id);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, "productos", id));
      setProducts(products.filter((product) => product.id !== id));
      console.log(`Product with id ${id} deleted`);
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Gestion de productos</h1>

      {/* Botón para abrir el modal para añadir productos */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Añadir Producto
        </button>
      </div>

      {/* Modal para añadir producto */}
      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-gray-50 p-6 rounded shadow-lg w-full max-w-md h-3/4 overflow-y-auto relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-sea-700 hover:text-sea-900 focus:outline-none"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-blue-600">Añadir Producto</h2>
            <AddProductForm onClose={handleCloseModal} />
          </div>
        </div>
      )}

      {/* Modal para editar producto */}
      {editModalOpen && selectedProductId && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-gray-50 p-6 rounded shadow-lg w-full max-w-md h-3/4 overflow-y-auto relative">
            <button
              onClick={handleCloseEditModal}
              className="absolute top-2 right-2 text-sea-700 hover:text-sea-900 focus:outline-none"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-blue-600">Editar Producto</h2>
            <EditProduct productId={selectedProductId} onClose={handleCloseEditModal} />
          </div>
        </div>
      )}

      {/* Lista de productos del administrador */}
      <AdminProductList
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

export default ProductManagement;
