// src/components/ProductsList/ProductsList.tsx

import { Product, ProductListProps } from "../../types/interfaces";

import Card from "../common/Card/Card";
import React from "react";

const ProductsList: React.FC<ProductListProps> = ({ products, onProductClick, onAddToCart }) => {
  const handleViewDetail = (id: string) => {
    if (onProductClick) {
      onProductClick(id);
    }
  };

  // Manejador de clic para agregar al carrito
  const handleAddToCart = (product: Product, quantity: number) => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
  };

  return (
    <div className="container mx-auto py-8">
      {products.length === 0 ? (
        <p className="text-center text-gray-700">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              product={product}
              showCounter={true}
              showButton={false}
              showStock={true}
              onViewDetail={() => handleViewDetail(product.id)}
              onAddToCart={(product, quantity) => handleAddToCart(product, quantity)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
