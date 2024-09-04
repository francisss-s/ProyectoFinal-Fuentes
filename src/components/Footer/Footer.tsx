import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export const Footer: React.FC = () => {
    return (
        <footer className="bg-beach-100 text-gray-800 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                    {/* Logo y Descripción */}
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <h1 className="text-2xl font-bold mb-2 text-beach-800">Arte Suyai</h1>
                        <p className="text-sm text-beach-700">Pequeños amigos, grandes abrazos.</p>
                    </div>

                    {/* Redes Sociales */}
                    <div className="flex justify-center md:justify-end items-center gap-6 mt-4 md:mt-0">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-beach-800 hover:text-beach-600 text-xl">
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-beach-800 hover:text-beach-600 text-xl">
                            <FaTwitter />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-beach-800 hover:text-beach-600 text-xl">
                            <FaInstagram />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-beach-800 hover:text-beach-600 text-xl">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center mt-8 text-sm text-beach-700">
                    &copy; {new Date().getFullYear()} Arte Suyai. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};
