import React from "react";
import CartWidget from "./CartWidget";
import "./navBar.css";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
            <a href="#">Productos</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
      <CartWidget />


    </nav>
  );
};

export default NavBar;
