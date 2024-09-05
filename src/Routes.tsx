import { Navigate, createBrowserRouter } from "react-router-dom";

import About from "./pages/About";
import App from "./App";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import OrderManagementPage from "./pages/OrderManagementPage";
import ProductDetailPage from "./components/ProductDetailPage/ProductDetailPage";
import ProductManagement from "./pages/ProductManagement";
import ProductsPage from "./pages/ProductsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,  // Usar index para la ruta raíz
        element: <HomePage />,
      },
      {
        path: "inicio",
        element: <HomePage />,
      },
      {
        path: "productos",
        element: <ProductsPage />,
      },
      {
        path: "productos/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "gestionproductos",
        element: <ProductManagement />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "gestionOrdenes",
        element: <OrderManagementPage />,
      },
      {
        path: "carrito",
        element: <CartPage />,
      },
      {
        path: "*",  // Manejo de rutas no encontradas
        element: <Navigate to="/" replace />,
      },
    ],
    
  },{
    path: "/inicio",
    element: <Navigate to='/' replace/>,
},
]);
