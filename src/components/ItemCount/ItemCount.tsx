import './ItemCount.css';

import React from 'react';

interface ItemCountProps {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

const ItemCount: React.FC<ItemCountProps> = ({ quantity, onIncrement, onDecrement }) => {
    return (
        <div className="item-count">
            <button className="decrement" onClick={onDecrement}>-</button>
            <span className="quantity">{quantity}</span>
            <button className="increment" onClick={onIncrement}>+</button>
        </div>
    );
};

export default ItemCount;
