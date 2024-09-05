// src/components/AddProductForm/AddProductForm.tsx

import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../firebase-config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface AddProductFormProps {
  onClose: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onClose }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tamano, setTamano] = useState("");
  const [material, setMaterial] = useState("");
  const [cantidad, setCantidad] = useState<number>(1);
  const [precio, setPrecio] = useState<number>(0);
  const [fotoPortada, setFotoPortada] = useState<File | null>(null);
  const [previewFotoPortada, setPreviewFotoPortada] = useState<string | null>(null);
  const [fotosExtras, setFotosExtras] = useState<File[]>([]);
  const [previewFotosExtras, setPreviewFotosExtras] = useState<string[]>([]);
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
      // Subir foto de portada
      let fotoPortadaURL = "";
      if (fotoPortada) {
        const storageRef = ref(storage, `productos/${fotoPortada.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, fotoPortada);
        fotoPortadaURL = await getDownloadURL(uploadTask.ref);
      }

      // Subir fotos extras
      const fotosExtrasURLs = await Promise.all(
        fotosExtras.map(async (foto) => {
          const storageRef = ref(storage, `productos/${foto.name}`);
          const uploadTask = await uploadBytesResumable(storageRef, foto);
          return await getDownloadURL(uploadTask.ref);
        })
      );

      // Añadir producto a la base de datos
      await addDoc(collection(db, "productos"), {
        nombre,
        descripcion,
        tamano,
        material,
        cantidad,
        precio,
        fotoPortada: fotoPortadaURL,
        fotosExtras: fotosExtrasURLs,
        creadoEn: new Date(),
      });

      // Resetear formulario
      setNombre("");
      setDescripcion("");
      setTamano("");
      setMaterial("");
      setCantidad(1);
      setPrecio(0);
      setFotoPortada(null);
      setPreviewFotoPortada(null);
      setFotosExtras([]);
      setPreviewFotosExtras([]);

      MySwal.fire({
        icon: "success",
        title: "Producto agregado exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });

      onClose();
    } catch (error) {
      console.error("Error al agregar producto: ", error);
      MySwal.fire({
        icon: "error",
        title: "Hubo un error al agregar el producto",
        text: "Por favor, inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

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
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Agregar Producto</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campos del formulario */}
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-blue-700">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-blue-700">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-blue-700">Tamaño</label>
            <input
              type="text"
              value={tamano}
              onChange={(e) => setTamano(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-blue-700">Material</label>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-blue-700">Cantidad</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="border rounded px-2 py-1 w-full"
              min="1"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-blue-700">Precio</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
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
              onChange={handleFotoPortadaChange}
              className="border rounded px-2 py-1 w-full"
              accept="image/*"
            />
            {previewFotoPortada && (
              <img
                src={previewFotoPortada}
                alt="Preview Foto de Portada"
                className="w-48 h-48 object-cover mt-2 rounded"
              />
            )}
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-blue-700">Fotos Extras</label>
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
              {loading ? "Guardando..." : "Agregar Producto"}
            </button>
            {/* Botón para cerrar el modal en la parte inferior */}
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

export default AddProductForm;
