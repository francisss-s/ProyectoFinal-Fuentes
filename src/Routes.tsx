import { Navigate, createBrowserRouter } from "react-router-dom";

import About from "./pages/About";
import App from "./App";
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