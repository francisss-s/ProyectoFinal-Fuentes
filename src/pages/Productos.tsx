// src/pages/Productos.tsx

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import FiltroProductos from "../components/FiltroProductos/FiltroProductos";
import ListaProductosPag from "../components/ListaProductos/ListaProductosPag";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

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

const PaginaProductos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [nombreFiltro, setNombreFiltro] = useState<string>("");
  const [tamanoFiltro, setTamanoFiltro] = useState<string>("");
  const [materialFiltro, setMaterialFiltro] = useState<string>("");
  const navigate = useNavigate(); // Hook para navegar entre rutas

  useEffect(() => {
    fetchProductos();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [nombreFiltro, tamanoFiltro, materialFiltro]);

  const fetchProductos = async () => {
    const productosSnapshot = await getDocs(collection(db, "productos"));
    const productosList = productosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Producto[];
    setProductos(productosList);
    setProductosFiltrados(productosList);
  };

  const obtenerTamañosUnicos = (): string[] => {
    const tamaños = productos.map((producto) => producto.tamano);
    return Array.from(new Set(tamaños));
  };

  const obtenerMaterialesUnicos = (): string[] => {
    const materiales = productos.map((producto) => producto.material);
    return Array.from(new Set(materiales));
  };

  const aplicarFiltros = () => {
    let productosActuales = productos;

    if (nombreFiltro) {
      productosActuales = productosActuales.filter((producto) =>
        producto.nombre.toLowerCase().includes(nombreFiltro.toLowerCase())
      );
    }

    if (tamanoFiltro) {
      productosActuales = productosActuales.filter(
        (producto) => producto.tamano === tamanoFiltro
      );
    }

    if (materialFiltro) {
      productosActuales = productosActuales.filter(
        (producto) => producto.material === materialFiltro
      );
    }

    setProductosFiltrados(productosActuales);
  };

  const handleProductoClick = (id: string) => {
    navigate(`/productos/${id}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Productos</h1>

      {/* Componente de Filtros */}
      <FiltroProductos
        nombreFiltro={nombreFiltro}
        tamanoFiltro={tamanoFiltro}
        materialFiltro={materialFiltro}
        onNombreFiltroChange={(e) => setNombreFiltro(e.target.value)}
        onTamanoFiltroChange={(e) => setTamanoFiltro(e.target.value)}
        onMaterialFiltroChange={(e) => setMaterialFiltro(e.target.value)}
        tamaños={obtenerTamañosUnicos()}
        materiales={obtenerMaterialesUnicos()}
      />

      {/* Componente de Lista de Productos */}
      <ListaProductosPag productos={productosFiltrados} onProductoClick={handleProductoClick} />
    </div>
  );
};

export default PaginaProductos;
