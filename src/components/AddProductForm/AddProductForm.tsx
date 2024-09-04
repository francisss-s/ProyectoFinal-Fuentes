import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../firebase-config"; // Asegúrate de tener configurado Firebase
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface AgregarProductoProps {
  onClose: () => void;
}

export const AgregarProducto: React.FC<AgregarProductoProps> = ({ onClose }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tamano, setTamano] = useState("");
  const [material, setMaterial] = useState("");
  const [cantidad, setCantidad] = useState<number>(1); // Estado para la cantidad
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
        fotoPortada: fotoPortadaURL,
        fotosExtras: fotosExtrasURLs,
        creadoEn: new Date(),
      });

      // Resetear formulario
      setNombre("");
      setDescripcion("");
      setTamano("");
      setMaterial("");
      setCantidad(1); // Reinicia la cantidad a 1
      setFotoPortada(null);
      setPreviewFotoPortada(null);
      setFotosExtras([]);
      setPreviewFotosExtras([]);

      MySwal.fire({
        icon: "success",
        title: "Producto agregado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });

      onClose(); // Cierra el modal después de agregar el producto
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
    <form onSubmit={handleSubmit} className="p-4">
      <div>
        <label className="block mb-2 text-blue-700">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border rounded px-2 py-1 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-blue-700">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="border rounded px-2 py-1 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-blue-700">Tamaño</label>
        <input
          type="text"
          value={tamano}
          onChange={(e) => setTamano(e.target.value)}
          className="border rounded px-2 py-1 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-blue-700">Material</label>
        <input
          type="text"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="border rounded px-2 py-1 w-full"
          required
        />
      </div>
      <div>
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
      <div>
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
            className="w-32 h-32 object-cover mt-2"
          />
        )}
      </div>
      <div>
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
              className="w-32 h-32 object-cover"
            />
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="bg-sea-500 hover:bg-sea-600 text-white py-2 px-4 rounded mt-4"
        disabled={loading}
      >
        {loading ? "Guardando..." : "Agregar Producto"}
      </button>
    </form>
  );
};
