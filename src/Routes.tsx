import { Navigate, createBrowserRouter } from "react-router-dom";

import About from "./pages/About";
import App from "./App";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import OrderManagementPage from "./pages/OrderManagementPage";
import ProductDetailPage from "./components/ProductDetailPage/ProductDetailPage";
import ProductManagement from "./pages/ProductManagement";
import ProductsPage  from "./pages/ProductsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        
        children: [
            {
                path: "/",
                element: <Navigate to="/inicio" replace={true} />,
            },
            {
                path: "/inicio",
                element: <HomePage />,
            },
            {
                path: "/productos",
                element: <ProductsPage />,
            },
            {
                path: "/productos/:id", // Ruta dinámica para el detalle del producto
                element: <ProductDetailPage />,
            },
            {
                path: "/gestionproductos",
                element: <ProductManagement />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/gestionOrdenes",
                element: <OrderManagementPage />,
            },
            {
                path: "/carrito",
                element: <CartPage />,
            }
        ]
    },
    {
    path: "*",
    element: <Navigate to="/inicio" replace={true} />,
    }
]);