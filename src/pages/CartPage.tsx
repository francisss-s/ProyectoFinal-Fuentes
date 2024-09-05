// src/pages/CartPage.tsx

import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

import Button from "../components/common/Button/Button";
import { db } from "../../firebase-config";
import { useCart } from "../context/CartContext";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const handleCheckout = async () => {
    if (!customerName || !customerEmail || !customerAddress) {
      alert("Please fill in all fields.");
      return;
    }

    const orderData = {
      customerName,
      customerEmail,
      customerAddress,
      items: cart.map(({ product, quantity }) => ({
        productId: product.id,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: quantity,
      })),
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "ordenCompra"), orderData);
      alert("Order placed successfully!");
      clearCart();
      setShowCheckoutForm(false);
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("There was an error placing your order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Tu carrito de compras</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-700">Tu carrito esta vacio</p>
      ) : (
        <div className="space-y-4">
          {cart.map(({ product, quantity }) => (
            <div key={product.id} className="border rounded p-4 shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{product.nombre}</h3>
                <p>{product.descripcion}</p>
                <p>Cantidad: {quantity}</p>
                <p>Precio: ${product.precio * quantity}</p>
              </div>
              <div className="flex items-center">
                <Button text="Remove" onClick={() => removeFromCart(product.id)} variant="danger" />
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                  className="ml-2 p-1 border rounded"
                />
              </div>
            </div>
          ))}
          <div className="text-right flex flex-col *:p-5 *:m-5" >
            <Button text="Clear Cart" onClick={clearCart} variant="danger" />
            <Button text="Proceed to Checkout" onClick={() => setShowCheckoutForm(true)} variant="primary"/>
          </div>

          {/* Formulario de compra */}
          {showCheckoutForm && (
            <div className="mt-8 border rounded p-4">
              <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Checkout</h2>
              <form className="space-y-4">
                <div>
                  <label className="block mb-2 text-gray-700">Nombre</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Email</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Direccion</label>
                  <textarea
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                    required
                  />
                </div>
                <Button text="Confirmar Orden" onClick={handleCheckout} variant="success" />
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
