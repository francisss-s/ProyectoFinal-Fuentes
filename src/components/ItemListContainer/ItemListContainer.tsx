import './ItemListContainer.css';

import React, { useEffect, useState } from "react";

import Item from "../item/Item";
import { useParams } from 'react-router-dom';

interface Item {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
    rating: object;
}

const ItemListContainer = () => {
    const [items, setItems] = useState<Item[]>([]);
    const { category } = useParams<{ category: string }>();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                let url = 'https://fakestoreapi.com/products';
                if (category) {
                    url = `https://fakestoreapi.com/products/category/${category}`;
                }
                
                const response = await fetch(url);
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [category]);

    return (
        <div className='contenedor'>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <Item 
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            image={item.image}
                            description={item.description}
                            category={item.category}
                            rating={item.rating}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemListContainer;
