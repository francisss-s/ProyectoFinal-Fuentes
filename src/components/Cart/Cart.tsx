// src/components/Cart/Cart.tsx

import { CiShoppingCart } from "react-icons/ci";
import { IconContext } from "react-icons";
import React from 'react';
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export const Cart: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <IconContext.Provider value={{ className: 'text-3xl hover:text-red-500' }}>
      <div className="flex items-center gap-2 hover:text-fern-frond-800 cursor-pointer" onClick={() => navigate('/carrito')}>
        <CiShoppingCart />
        {totalItems > 0 && <span className="text-sm">{totalItems}</span>}
      </div>
    </IconContext.Provider>
  );
};
