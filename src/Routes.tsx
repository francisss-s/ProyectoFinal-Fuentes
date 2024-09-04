import { Navigate, createBrowserRouter } from "react-router-dom";

import About from "./pages/About";
import App from "./App";
import DetalleProducto from "./components/DetalleProducto/DetalleProducto";
import { GestionProductos } from "./pages/GestionProductos";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";

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
                element: <Inicio />,
            },
            {
                path: "/productos",
                element: <Productos />,
            },
            {
                path: "/productos/:id", // Ruta dinámica para el detalle del producto
                element: <DetalleProducto />,
            },
            {
                path: "/gestionproductos",
                element: <GestionProductos />,
            },
            {
                path: "/about",
                element: <About />,
            }
        ]
    },
    {
    path: "/*",
    element: <Navigate to="/inicio" replace={true} />,
    }
]);