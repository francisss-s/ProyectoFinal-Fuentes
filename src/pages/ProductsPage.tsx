// src/pages/ProductsPage.tsx

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate, useSearchParams } from "react-router-dom"; // Importa useSearchParams para leer parámetros de la URL

import { Product } from "../types/interfaces";
import ProductFilter from "../components/ProductFilter/ProductFilter";
import ProductsList from "../components/ProductsList/ProductsList";
import { db } from "../../firebase-config";
import { useCart } from "../context/CartContext";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [sizeFilter, setSizeFilter] = useState<string>("");
  const [materialFilter, setMaterialFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Obtén la función addToCart del contexto
  const [searchParams] = useSearchParams(); // Hook para obtener los parámetros de búsqueda de la URL

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const productsSnapshot = await getDocs(collection(db, "productos"));
        const productsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productsList);
        setFilteredProducts(productsList);
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Aplicar filtros basados en los parámetros de URL
    const sizeParam = searchParams.get("size");
    if (sizeParam) {
      setSizeFilter(sizeParam);
    }
  }, [searchParams]);

  const applyFilters = useCallback(() => {
    let currentProducts = products;

    if (nameFilter) {
      currentProducts = currentProducts.filter((product) =>
        product.nombre.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (sizeFilter) {
      currentProducts = currentProducts.filter(
        (product) => product.tamano === sizeFilter
      );
    }

    if (materialFilter) {
      currentProducts = currentProducts.filter(
        (product) => product.material === materialFilter
      );
    }

    setFilteredProducts(currentProducts);
  }, [products, nameFilter, sizeFilter, materialFilter]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const uniqueSizes = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.tamano)));
  }, [products]);

  const uniqueMaterials = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.material)));
  }, [products]);

  const handleProductClick = (id: string) => {
    navigate(`/productos/${id}`);
  };

  // Añade al carrito desde la lista de productos
  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity);
  };

  if (loading) {
    return <div className="container mx-auto py-8 text-center">Loading products...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Products</h1>

      <ProductFilter
        nameFilter={nameFilter}
        sizeFilter={sizeFilter}
        materialFilter={materialFilter}
        onNameFilterChange={(e) => setNameFilter(e.target.value)}
        onSizeFilterChange={(e) => setSizeFilter(e.target.value)}
        onMaterialFilterChange={(e) => setMaterialFilter(e.target.value)}
        sizes={uniqueSizes}
        materials={uniqueMaterials}
      />

      <ProductsList
        products={filteredProducts}
        onProductClick={handleProductClick}
        onAddToCart={handleAddToCart} // Pasar la función handleAddToCart
      />
    </div>
  );
};

export default ProductsPage;
