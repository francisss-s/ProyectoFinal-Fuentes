// src/pages/DetalleProducto.tsx

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import ImageViewer from "../VisorImagenes/VisorImagenes";
import { db } from "../../../firebase-config";
import { useParams } from "react-router-dom";

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

const DetalleProducto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducto = async () => {
      if (!id) return;
      const productoRef = doc(db, "productos", id);
      const productoSnap = await getDoc(productoRef);
      if (productoSnap.exists()) {
        setProducto({ id: productoSnap.id, ...productoSnap.data() } as Producto);
      } else {
        console.error("Producto no encontrado");
      }
      setLoading(false);
    };

    fetchProducto();
  }, [id]);

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (!producto) {
    return <div className="text-center">Producto no encontrado</div>;
  }

  const imagenes = [producto.fotoPortada, ...producto.fotosExtras]; // Combinar todas las imágenes

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">{producto.nombre}</h1>
      
      {/* Visor de Imágenes */}
      <ImageViewer imagenes={imagenes} />

      {/* Detalles del Producto */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <p className="text-sea-700 mb-2">{producto.descripcion}</p>
        <p className="text-sea-700 mb-2"><strong>Tamaño:</strong> {producto.tamano}</p>
        <p className="text-sea-700 mb-2"><strong>Material:</strong> {producto.material}</p>
        <p className="text-sea-700"><strong>Cantidad:</strong> {producto.cantidad}</p>
      </div>
    </div>
  );
};

export default DetalleProducto;
