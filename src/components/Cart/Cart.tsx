// import { CiShoppingCart } from "react-icons/ci";

// import cart from '../../assets/img/cart.png

import { CiShoppingCart } from "react-icons/ci";
import { IconContext } from "react-icons";
import react from 'react';

export const Cart = () => {
  return (
    <IconContext.Provider value={{ className: 'text-3xl hover:text-red-500' }}>
      <div className="flex items-center gap-2 hover:text-fern-frond-800">
        <CiShoppingCart />
      </div>
    </IconContext.Provider>
  );
}