// src/pages/CartPage.tsx

import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

import Button from "../components/common/Button/Button";
import Swal from "sweetalert2";
import { db } from "../../firebase-config";
import { useCart } from "../context/CartContext";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setOrderTotal] = useState<number>(0); // Estado para almacenar el total del pedido

  const handleCheckout = async () => {
    if (!customerName || !customerEmail || !customerAddress) {
      MySwal.fire({
        icon: "warning",
        title: "Faltan campos",
        text: "Por favor, completa todos los campos.",
      });
      return;
    }

    // Calcular el total del pedido
    const total = cart.reduce((sum, { product, quantity }) => sum + product.precio * quantity, 0);
    setOrderTotal(total);

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
      total, // Añadir el total al objeto de datos del pedido
      createdAt: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, "ordenCompra"), orderData);
      const orderId = docRef.id; // Guardar el ID de la orden

      MySwal.fire({
        icon: "success",
        title: "¡Orden completada con éxito!",
        html: `
          <p>Tu ID de orden es: <strong>${orderId}</strong></p>
          <p>Gracias por tu compra, ${customerName}.</p>
          <p>Hemos enviado una confirmación a tu correo electrónico: ${customerEmail}.</p>
          <p>Total de la orden: <strong>$${total.toFixed(2)}</strong></p>
          <p>Tu orden será enviada a: ${customerAddress}</p>
          <p>Si tienes alguna pregunta, por favor contáctanos en support@suyai.com.</p>
        `,
        confirmButtonText: "Cerrar",
      });

      clearCart();
      setShowCheckoutForm(false);
    } catch (error) {
      console.error("Error placing order: ", error);
      MySwal.fire({
        icon: "error",
        title: "Error al realizar la compra",
        text: "Hubo un error al procesar tu orden. Por favor, inténtalo de nuevo.",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Tu carrito de compras</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-700">Tu carrito está vacío</p>
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
                <Button text="Eliminar" onClick={() => removeFromCart(product.id)} variant="danger" />
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
          <div className="text-right flex flex-col p-5">
            <Button text="Vaciar Carrito" onClick={clearCart} variant="danger" />
            <Button text="Proceder a la compra" onClick={() => setShowCheckoutForm(true)} variant="primary"/>
          </div>

          {/* Formulario de compra */}
          {showCheckoutForm && (
            <div className="mt-8 border rounded p-4">
              <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Datos Cliente</h2>
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
                  <label className="block mb-2 text-gray-700">Dirección</label>
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
