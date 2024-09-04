import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

import { NavLink } from "react-router-dom";

export const Footer: React.FC = () => {
    return (
        <footer className="bg-fern-frond-50 text-gray-800 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo y Descripción */}
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <h1 className="text-2xl font-bold mb-2">Mi Empresa</h1>
                        <p className="text-sm">Tu descripción aquí, puede ser una frase o lema.</p>
                    </div>

                    {/* Enlaces de Navegación */}
                    <div className="mb-6 md:mb-0">
                        <ul className="flex flex-col md:flex-row items-center md:items-start gap-4">
                            <li>
                                <NavLink to="/" className="hover:text-fern-frond-950">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/productos" className="hover:text-fern-frond-950">Productos</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className="hover:text-fern-frond-950">Sobre Mi</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className="hover:text-fern-frond-950">Contacto</NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Redes Sociales */}
                    <div className="flex justify-center md:justify-end items-center gap-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-fern-frond-950">
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-fern-frond-950">
                            <FaTwitter />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-fern-frond-950">
                            <FaInstagram />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-fern-frond-950">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center mt-8 text-sm">
                    &copy; {new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};
