import './TrackingPage.css'
import { Header } from '../../components/Header';
import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

export function TrackingPage({cart}) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTreck = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }

    fetchTreck();
  }, [orderId]);

  if (!order) return null;

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }

  return (
    <>
      <title>Track your order</title>
      <link rel="icon" href="tracking-favicon.png" />
      <Header cart={cart}/>

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {console.log(deliveryPercent)}
            {deliveryPercent === '100' ? "Arriving on " : "Delivered on "}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMM D')}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className="progress-label">
              Preparing
            </div>
            <div className="progress-label current-status">
              Shipped
            </div>
            <div className="progress-label">
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
}