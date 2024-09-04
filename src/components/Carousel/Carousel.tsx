import React, { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";

import { storage } from "../../../firebase-config"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom";

interface CarouselItem {
  image: string;
  text: string;
  category: string;
}

interface CarouselProps {
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ interval = 3000 }) => {
  const [items, setItems] = useState<CarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener URLs de imágenes desde Firebase Storage
    const fetchImages = async () => {
      const images = [
        { name: 'carousel1', texto: 'Descubre las maravillas de los amigurumis grandes.', categoria: 'grande' },
        { name: 'carousel2', texto: 'Descubre las maravillas de los amigurumis de tamaño mediano.', categoria: 'mediano' },
        { name: 'carousel3', texto: 'Descubre las maravillas de los amigurumis más pequeñitos.', categoria: 'pequeño' }
      ];
      const fetchedItems: CarouselItem[] = await Promise.all(
        images.map(async (el) => {
          const imageRef = ref(storage, `carousel/${el.name}.jpg`);
          const imageUrl = await getDownloadURL(imageRef);
          return {
            image: imageUrl,
            text: el.texto,
            category: el.categoria,
          };
        })
      );
      setItems(fetchedItems);
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const changeSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const intervalId = setInterval(changeSlide, interval);

    return () => clearInterval(intervalId);
  }, [items.length, interval]);

  const handleClick = (category: string) => {
    navigate(`/productos?categoria=${category}`);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (items.length === 0) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen las imágenes
  }

  return (
    <div className="relative w-full h-64 overflow-hidden">
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={item.image}
            alt={`slide-${index}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => handleClick(item.category)}
          />
          {/* Div de fondo semi-transparente para mejorar la visibilidad del texto */}
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-beach-800 bg-opacity-70 flex items-center justify-center">
            <div className="text-white text-center">
              <h2 className="text-xl font-bold">{item.text}</h2>
              <p className="text-sm">{item.category}</p>
            </div>
          </div>
        </div>
      ))}
      
      {/* Botones de navegación */}
      <button
        onClick={handlePrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-beach-700 text-white p-2 rounded-full focus:outline-none hover:bg-beach-600"
      >
        &#10094; {/* Símbolo de flecha izquierda */}
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-beach-700 text-white p-2 rounded-full focus:outline-none hover:bg-beach-600"
      >
        &#10095; {/* Símbolo de flecha derecha */}
      </button>
    </div>
  );
};

export default Carousel;
