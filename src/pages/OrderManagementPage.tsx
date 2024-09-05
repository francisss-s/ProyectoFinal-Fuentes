// src/pages/OrderManagementPage.tsx

import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import Button from "../components/common/Button/Button";
import { db } from "../../firebase-config";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  items: { productId: string; nombre: string; precio: number; cantidad: number }[];
  createdAt: Date;
}

const OrderManagementPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ordenCompra"));
      const ordersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      })) as Order[];
      setOrders(ordersList);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  const handleViewDetails = async (orderId: string) => {
    try {
      const orderDoc = await getDoc(doc(db, "ordenCompra", orderId));
      if (orderDoc.exists()) {
        setSelectedOrder({
          id: orderDoc.id,
          ...orderDoc.data(),
          createdAt: orderDoc.data().createdAt.toDate(),
        } as Order);
      }
    } catch (error) {
      console.error("Error fetching order details: ", error);
    }
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Gestion de ordenes de compra</h1>
      {selectedOrder ? (
        <OrderDetail order={selectedOrder} onBack={handleBackToList} />
      ) : (
        <OrderList orders={orders} onViewDetails={handleViewDetails} />
      )}
    </div>
  );
};

interface OrderListProps {
  orders: Order[];
  onViewDetails: (orderId: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onViewDetails }) => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="border rounded p-4 shadow-md">
          <h3 className="text-lg font-bold">Order ID: {order.id}</h3>
          <p>Customer: {order.customerName}</p>
          <p>Email: {order.customerEmail}</p>
          <p>Created At: {order.createdAt.toDateString()}</p>
          <Button text="Ver detalles" onClick={() => onViewDetails(order.id)} variant="primary" />
        </div>
      ))}
    </div>
  );
};

interface OrderDetailProps {
  order: Order;
  onBack: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, onBack }) => {
  return (
    <div className="border rounded p-4 shadow-md">
      <Button text="Volver a listado" onClick={onBack} variant="secondary" className="mb-4" />
      <h3 className="text-lg font-bold">Order ID: {order.id}</h3>
      <p>Cliente: {order.customerName}</p>
      <p>Email: {order.customerEmail}</p>
      <p>Direccion: {order.customerAddress}</p>
      <p>Fecha Creacion: {order.createdAt.toLocaleDateString('cl')}</p>
      <h4 className="font-bold mt-4">Productos:</h4>
      <ul className="list-disc pl-5">
        {order.items.map((item, index) => (
          <li key={index}>
            {item.nombre} - {item.cantidad} x ${item.precio}
          </li>
        ))}
      </ul>
      <p className="mt-4 font-bold">Total: ${order.items.reduce((total, item) => total + item.precio * item.cantidad, 0).toFixed(2)}</p>
    </div>
  );
};

export default OrderManagementPage;
