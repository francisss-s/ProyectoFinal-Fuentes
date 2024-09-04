// src/components/FiltroProductos/FiltroProductos.tsx

import React from "react";

interface FiltroProductosProps {
  nombreFiltro: string;
  tamanoFiltro: string;
  materialFiltro: string;
  onNombreFiltroChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTamanoFiltroChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onMaterialFiltroChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  tamaños: string[];
  materiales: string[];
}

const FiltroProductos: React.FC<FiltroProductosProps> = ({
  nombreFiltro,
  tamanoFiltro,
  materialFiltro,
  onNombreFiltroChange,
  onTamanoFiltroChange,
  onMaterialFiltroChange,
  tamaños,
  materiales,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-center mb-8 gap-4">
      <input
        type="text"
        placeholder="Filtrar por nombre"
        value={nombreFiltro}
        onChange={onNombreFiltroChange}
        className="border rounded px-2 py-1"
      />
      <select
        value={tamanoFiltro}
        onChange={onTamanoFiltroChange}
        className="border rounded px-2 py-1"
      >
        <option value="">Todos los tamaños</option>
        {tamaños.map((tamano, index) => (
          <option key={index} value={tamano}>
            {tamano}
          </option>
        ))}
      </select>
      <select
        value={materialFiltro}
        onChange={onMaterialFiltroChange}
        className="border rounded px-2 py-1"
      >
        <option value="">Todos los materiales</option>
        {materiales.map((material, index) => (
          <option key={index} value={material}>
            {material}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltroProductos;
