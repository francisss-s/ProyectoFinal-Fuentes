// src/components/FeaturedProducts/FeaturedProducts.tsx

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import Card from "../common/Card/Card";
import { Product } from "../../types/interfaces";
import { db } from "../../../firebase-config";

const FeaturedProducts: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        console.log(products)
        setFeaturedProducts(products.slice(0, 3)); // Ejemplo: selecciona los primeros 3 productos
      } catch (error) {
        console.error("Error fetching featured products: ", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Productos populares</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredProducts.map((product) => (
          <Card key={product.id} product={product} showCounter={false} showButton={false} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
