// src/components/Carousel/Carousel.tsx

import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importa iconos de FontAwesome
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";

import { storage } from "../../../firebase-config";
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
    return <div className="text-center py-8">Loading...</div>; // Muestra un mensaje de carga mientras se obtienen las imágenes
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
          {/* Fondo semi-transparente para mejorar la visibilidad del texto */}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 py-4 px-6 flex items-center">
            <div className="text-white text-left max-w-md">
              <h2 className="text-2xl font-bold mb-1">{item.text}</h2>
              <p className="text-sm">{item.category}</p>
            </div>
          </div>
        </div>
      ))}
      
      {/* Botones de navegación mejorados */}
      <button
        onClick={handlePrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full focus:outline-none hover:bg-blue-700 shadow-lg"
        aria-label="Previous Slide"
      >
        <FaChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full focus:outline-none hover:bg-blue-700 shadow-lg"
        aria-label="Next Slide"
      >
        <FaChevronRight className="w-4 h-4" />
      </button>

      {/* Puntos de navegación */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 mx-1 rounded-full ${
              index === currentIndex ? "bg-blue-700" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
