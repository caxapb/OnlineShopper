import axios from 'axios';
import { useState, useEffect } from 'react';

import './OrdersPage.css'
import { Header } from '../../components/Header';
import { OrdersGrid } from './OrdersGrid';


export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data)
    } 

    fetchOrders();
  }, []);

  return (
    <>
      <link rel="icon" href="orders-favicon.png" />
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
}