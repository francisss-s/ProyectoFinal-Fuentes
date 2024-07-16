import React from "react";
import "./CartWidget.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';



const CartWidget = () => {
  return (
    <span>
      <FontAwesomeIcon icon={faShoppingCart} />
    </span>
  );
}
export default CartWidget;