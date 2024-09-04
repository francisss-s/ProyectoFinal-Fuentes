import { useEffect, useState } from "react";

import { Cart } from "../Cart/Cart";
import { CiMenuBurger } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.png";

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // Detectar si estamos en mobile o desktop al renderizar
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    // Ejecutar la función una vez cuando el componente se monta
    handleResize();

    // Añadir event listener para el resize del navegador
    window.addEventListener("resize", handleResize);

    // Cleanup event listener al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="bg-beach-100 font-[Poppins] shadow-md">
      <nav className="flex justify-between items-center w-[92%] mx-auto py-4 relative">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img className="w-16 h-16 cursor-pointer" src={logo} alt="Logo" />
          <h1 className="text-xl font-bold text-beach-800">Arte Suyai</h1>
        </div>

        {/* Menu Links */}
        <div
          className={`nav-links md:static absolute duration-500 md:min-h-fit min-h-auto rounded-md pb-5 bg-beach-100 left-0 w-full flex items-center md:w-auto px-5 ${
            open ? "flex-col top-[100%]" : "hidden"
          }`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <NavLink className="text-beach-800 hover:text-beach-600" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text-beach-800 hover:text-beach-600"
                to="/productos"
              >
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text-beach-800 hover:text-beach-600"
                to="/gestionproductos"
              >
                Gestion Productos
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text-beach-800 hover:text-beach-600"
                to="/about"
              >
                Sobre Mi
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Burger Menu and Cart */}
        <div className="flex items-center gap-6">
          <CiMenuBurger
            onClick={handleMenu}
            className="text-3xl cursor-pointer md:hidden text-beach-800"
          />
        </div>
        <Cart />
      </nav>
    </header>
  );
};
