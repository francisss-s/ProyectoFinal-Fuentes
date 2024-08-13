import "./navBar.css";

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

import CartWidget from "./CartWidget";

const NavBar = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    navigate(`/categoria/${category}`);
  };

  return (
    <nav className="navbar">
      <ul>
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <a href="/contacto">Contacto</a>
        </li>
        <li className="navbar-item dropdown">
          <a href="#">Categorías</a>
          <ul className="dropdown-content">
            {categories.map(category => (
              <li key={category} className="dropdown-item" onClick={() => handleCategoryClick(category)}>
                {category}
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <CartWidget />
    </nav>
  );
};

export default NavBar;
