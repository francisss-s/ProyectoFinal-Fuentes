import React, { useState } from "react";
import { db, storage } from "../../../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import Swal from "sweetalert2";
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

interface EditarProductoProps {
  producto: Producto;
  onClose: () => void;
  onProductoActualizado: () => void;
}

export const EditarProducto: React.FC<EditarProductoProps> = ({ producto, onClose, onProductoActualizado }) => {
  const [nombre, setNombre] = useState(producto.nombre);
  const [descripcion, setDescripcion] = useState(producto.descripcion);
  const [tamano, setTamano] = useState(producto.tamano);
  const [material, setMaterial] = useState(producto.material);
  const [cantidad, setCantidad] = useState(producto.cantidad);
  const [fotoPortada, setFotoPortada] = useState<File | null>(null);
  const [previewFotoPortada, setPreviewFotoPortada] = useState<string>(producto.fotoPortada);
  const [fotosExtras, setFotosExtras] = useState<File[]>([]);
  const [previewFotosExtras, setPreviewFotosExtras] = useState<string[]>(producto.fotosExtras);
  const [loading, setLoading] = useState(false);

  const handleFotoPortadaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFotoPortada(file);
      setPreviewFotoPortada(URL.createObjectURL(file));
    }
  };

  const handleFotosExtrasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFotosExtras(filesArray);
      const previewArray = filesArray.map((file) => URL.createObjectURL(file));
      setPreviewFotosExtras(previewArray);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let fotoPortadaURL = producto.fotoPortada;

      if (fotoPortada) {
        const storageRef = ref(storage, `productos/${fotoPortada.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, fotoPortada);
        fotoPortadaURL = await getDownloadURL(uploadTask.ref);
      }

      let fotosExtrasURLs = producto.fotosExtras;

      if (fotosExtras.length > 0) {
        fotosExtrasURLs = await Promise.all(
          fotosExtras.map(async (foto) => {
            const storageRef = ref(storage, `productos/${foto.name}`);
            const uploadTask = await uploadBytesResumable(storageRef, foto);
            return await getDownloadURL(uploadTask.ref);
          })
        );
      }

      await updateDoc(doc(db, "productos", producto.id), {
        nombre,
        descripcion,
        tamano,
        material,
        cantidad,
        fotoPortada: fotoPortadaURL,
        fotosExtras: fotosExtrasURLs,
      });

      MySwal.fire({
        icon: "success",
        title: "Producto actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });

      onProductoActualizado();
    } catch (error) {
      console.error("Error al actualizar producto: ", error);
      MySwal.fire({
        icon: "error",
        title: "Hubo un error al actualizar el producto",
        text: "Por favor, inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-50 p-6 rounded shadow-lg w-96 overflow-y-auto max-h-screen">
        <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Tamaño</label>
            <input
              type="text"
              value={tamano}
              onChange={(e) => setTamano(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Material</label>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Cantidad</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="border rounded px-2 py-1 w-full"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Foto de Portada</label>
            <input
              type="file"
              onChange={handleFotoPortadaChange}
              className="border rounded px-2 py-1 w-full"
              accept="image/*"
            />
            <div className="mt-2">
              <img
                src={previewFotoPortada}
                alt="Preview Foto de Portada"
                className="w-32 h-32 object-cover"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2">Fotos Extras</label>
            <input
              type="file"
              onChange={handleFotosExtrasChange}
              className="border rounded px-2 py-1 w-full"
              multiple
              accept="image/*"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {previewFotosExtras.map((foto, index) => (
                <img
                  key={index}
                  src={foto}
                  alt={`Preview Foto Extra ${index + 1}`}
                  className="w-32 h-32 object-cover"
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded mt-4 ml-2"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};
