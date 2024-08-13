import './AddToCart.css';

import React, { useState } from 'react';

import ItemCount from '../ItemCount/ItemCount';

interface AddToCartProps {
    onAddToCart: (quantity: number) => void;
}

const AddToCart: React.FC<AddToCartProps> = ({ onAddToCart }) => {
    const [quantity, setQuantity] = useState<number>(1);

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleAddToCart = () => {
        onAddToCart(quantity);
    };

    return (
        <div className="add-to-cart">
            <ItemCount quantity={quantity} onIncrement={handleIncrement} onDecrement={handleDecrement} />
            <button className="add-button" onClick={handleAddToCart}>
                Añadir al Carrito
            </button>
        </div>
    );
}

export default AddToCart;
