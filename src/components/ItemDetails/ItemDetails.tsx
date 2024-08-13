import './ItemDetails.css';

import React, { useEffect, useState } from "react";

import AddToCart from '../AddToCart/AddToCart';
import { useParams } from 'react-router-dom';

interface ItemDetailsProps {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
    rating: { rate: number; count: number };
}

const ItemDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<ItemDetailsProps | null>(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(response => response.json())
            .then(data => setItem(data));
    }, [id]);

    const handleAddToCart = (quantity: number) => {
        console.log(`Añadido ${quantity} de ${item?.title} al carrito.`);
    };

    if (!item) return <p>Loading...</p>;

    return (
        <div className="item-details">
            <div className="item-details-image">
                <img src={item.image} alt={item.title} />
            </div>
            <div className="item-details-content">
                <h1 className="item-details-title">{item.title}</h1>
                <p className="item-details-price">Price: ${item.price.toFixed(2)}</p>
                <p className="item-details-description">{item.description}</p>
                <p className="item-details-category"><strong>Category:</strong> {item.category}</p>
                <p className="item-details-rating">
                    <strong>Rating:</strong> {item.rating.rate} / 5 ({item.rating.count} reviews)
                </p>
                <AddToCart onAddToCart={handleAddToCart} /> {/* Añade el componente aquí */}
            </div>
        </div>
    );
}

export default ItemDetails;
