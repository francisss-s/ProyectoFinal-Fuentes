// src/components/ProductFilter/ProductFilter.tsx

import { ProductFilterProps } from "../../types/interfaces"; // Importa la interfaz correcta
import React from "react";

const ProductFilter: React.FC<ProductFilterProps> = ({
  nameFilter,
  sizeFilter,
  materialFilter,
  onNameFilterChange,
  onSizeFilterChange,
  onMaterialFilterChange,
  sizes,
  materials,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-center mb-8 gap-4">
      <input
        type="text"
        placeholder="Filter by name"
        value={nameFilter}
        onChange={onNameFilterChange}
        className="border rounded px-2 py-1"
      />
      <select
        value={sizeFilter}
        onChange={onSizeFilterChange}
        className="border rounded px-2 py-1"
      >
        <option value="">Todos los tamaños</option>
        {sizes.map((size, index) => (
          <option key={index} value={size}>
            {size}
          </option>
        ))}
      </select>
      <select
        value={materialFilter}
        onChange={onMaterialFilterChange}
        className="border rounded px-2 py-1"
      >
        <option value="">Todos los materiales</option>
        {materials.map((material, index) => (
          <option key={index} value={material}>
            {material}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilter;
