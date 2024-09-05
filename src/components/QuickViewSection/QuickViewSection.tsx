// src/components/QuickViewSection/QuickViewSection.tsx

import Button from "../common/Button/Button";
import React from "react";

// Asegúrate de que la ruta sea correcta

const QuickViewSection: React.FC = () => {
  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/path/to/background-image.jpg)' }}></div>
      
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Quick View</h2>
        <p className="text-gray-700 mb-6">
          Descrubre 
        </p>
        
        {/* Botones para navegar a diferentes secciones */}
        <div className="flex gap-4">
          <Button
            text="View Collections"
            onClick={() => console.log("Navigate to collections")}
            variant="primary"
          />
          <Button
            text="Featured Categories"
            onClick={() => console.log("Navigate to categories")}
            variant="secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default QuickViewSection;
