import React from "react";

// definimos la interfaz de las propiedades
interface ItemListContainerProps {
    texto: string;
}


const ItemListContainer: React.FC<ItemListContainerProps> = ({texto}) => {

    return (
        <div>
            <h1>{texto}</h1>
        </div>
    );
}

export default ItemListContainer;