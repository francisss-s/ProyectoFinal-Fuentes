// src/components/EditProduct/EditProduct.tsx

import React, { useEffect, useState } from "react";
import { db, storage } from "../../../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { Product } from "../../types/interfaces"; // Asegúrate de importar la interfaz correcta
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface EditProductProps {
  productId: string;
  onClose: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ productId, onClose }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, "productos", productId);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        setProduct({ id: productSnap.id, ...productSnap.data() } as Product);
      } else {
        console.log("No such product!");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({
      ...product!,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, isCoverImage = false) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const storageRef = ref(storage, `productos/${file.name}`);
      const uploadTask = await uploadBytesResumable(storageRef, file);
      const fileURL = await getDownloadURL(uploadTask.ref);

      if (isCoverImage) {
        setProduct({
          ...product!,
          fotoPortada: fileURL,
        });
      } else {
        setProduct({
          ...product!,
          fotosExtras: [...product!.fotosExtras, fileURL],
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productRef = doc(db, "productos", productId);

      await updateDoc(productRef, {
        nombre: product!.nombre,
        descripcion: product!.descripcion,
        tamano: product!.tamano,
        material: product!.material,
        cantidad: product!.cantidad,
        precio: product!.precio,
        fotoPortada: product!.fotoPortada,
        fotosExtras: product!.fotosExtras,
      });

      MySwal.fire({
        icon: "success",
        title: "Product updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      onClose();
    } catch (error) {
      console.error("Error updating product: ", error);
      MySwal.fire({
        icon: "error",
        title: "There was an error updating the product",
        text: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl h-auto overflow-y-auto relative">
        {/* Botón de cerrar en la parte superior */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-sea-700 hover:text-sea-900 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Edit Product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campos del formulario */}
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-blue-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={product.nombre}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-blue-700">Descripción</label>
            <textarea
              name="descripcion"
              value={product.descripcion}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-blue-700">Tamaño</label>
            <input
              type="text"
              name="tamano"
              value={product.tamano}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-blue-700">Material</label>
            <input
              type="text"
              name="material"
              value={product.material}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-blue-700">Cantidad</label>
            <input
              type="number"
              name="cantidad"
              value={product.cantidad}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
              min="1"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-blue-700">Precio</label>
            <input
              type="number"
              name="precio"
              value={product.precio}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-blue-700">Foto de Portada</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, true)}
              className="border rounded px-2 py-1 w-full"
              accept="image/*"
            />
            {product.fotoPortada && (
              <img
                src={product.fotoPortada}
                alt="Preview Foto de Portada"
                className="w-48 h-48 object-cover mt-2 rounded"
              />
            )}
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-blue-700">Fotos Extras</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, false)}
              className="border rounded px-2 py-1 w-full"
              multiple
              accept="image/*"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {product.fotosExtras.map((foto, index) => (
                <img
                  key={index}
                  src={foto}
                  alt={`Preview Foto Extra ${index + 1}`}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          </div>
          <div className="col-span-2 flex justify-between items-center">
            <button
              type="submit"
              className="bg-sea-500 hover:bg-sea-600 text-white py-2 px-4 rounded mt-4"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Actualizar Producto"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-4"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
