import './Item.css';

import AddToCart from '../AddToCart/AddToCart';
import React from "react";
import { useNavigate } from 'react-router-dom';

interface ItemProps {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
    rating: { rate: number; count: number };
}

const Item: React.FC<ItemProps> = ({ id, title, price, image, category, rating }) => {
    const navigate = useNavigate();

    const handleItemClick = () => {
        navigate(`/detalle/${id}`);
    };

    const handleAddToCart = (quantity: number) => {
        console.log(`Añadido ${quantity} de ${title} al carrito.`);
    };

    return (
        <div className='item'>
            <img src={image} alt={title} className="item-image" onClick={handleItemClick} />
            <div className="item-content">
                <h2 className="item-title" onClick={handleItemClick}>{title}</h2>
                <p className="item-category">{category}</p>
                <p className="item-price">${price.toFixed(2)}</p>
                <p className="item-rating">Rating: {rating.rate} / 5 ({rating.count} reviews)</p>
                <AddToCart onAddToCart={handleAddToCart} /> {/* Integrar aquí el AddToCart */}
            </div>
        </div>
    );
}

export default Item;
