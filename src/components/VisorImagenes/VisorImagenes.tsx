// src/components/ImageViewer/ImageViewer.tsx

import React, { useState } from "react";

interface ImageViewerProps {
  imagenes: string[];
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imagenes }) => {
  const [imagenActual, setImagenActual] = useState<number>(0);

  const cambiarImagen = (index: number) => {
    if (index < 0) {
      setImagenActual(imagenes.length - 1);
    } else if (index >= imagenes.length) {
      setImagenActual(0);
    } else {
      setImagenActual(index);
    }
  };

  return (
    <div className="relative w-full md:w-1/2 mx-auto">
      {/* Imagen actual */}
      <img
        src={imagenes[imagenActual]}
        alt={`Imagen ${imagenActual + 1}`}
        className="w-full h-96 object-cover rounded-lg shadow-md"
      />
      
      {/* Botones de navegación */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-l"
        onClick={() => cambiarImagen(imagenActual - 1)}
      >
        ◀
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-r"
        onClick={() => cambiarImagen(imagenActual + 1)}
      >
        ▶
      </button>

      {/* Puntos de navegación */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {imagenes.map((_, index) => (
          <span
            key={index}
            className={`block w-3 h-3 rounded-full ${index === imagenActual ? 'bg-blue-500' : 'bg-gray-300'} cursor-pointer`}
            onClick={() => cambiarImagen(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageViewer;
