// src/pages/ProductDetailPage.tsx

import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";

import Counter from "../common/Counter/Counter"; // Importa el componente Counter
import { Product } from "../../types/interfaces"; // Asegúrate de tener los tipos correctos
import { db } from "../../../firebase-config"; // Importa la configuración de Firebase
import { useCart } from "../../context/CartContext";
import { useParams } from "react-router-dom";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1); // Estado para la cantidad seleccionada

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as Product;
          setProduct({ ...data, id: docSnap.id });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (!product) {
    return <div className="container mx-auto py-8">Product not found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{product.nombre}</h1>
      <img src={product.fotoPortada} alt={product.nombre} className="w-full max-w-md h-auto mb-4" />
      <p className="mb-4">{product.descripcion}</p>

      {/* Contador de cantidad */}
      <div className="flex items-center mb-4">
        <span className="mr-4">Quantity:</span>
        <Counter initialCount={1} min={1} max={product.cantidad} onChange={setQuantity} />
      </div>

      {/* Botón de Agregar al Carrito */}
      <button
        onClick={() => addToCart(product, quantity)} // Utiliza la cantidad seleccionada
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailPage;
