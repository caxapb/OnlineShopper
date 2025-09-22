import './CheckoutPage.css'
import { CheckoutHeader } from './CheckoutHeader';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export function CheckoutPage({ cart, loadCart }) {
	const [deliveryOptions, setDeliveryOptions] = useState([]);
	const [paymentSummary, setPaymentSummary] = useState(null);

	useEffect(() => {
		axios.get("/api/delivery-options?expand=estimatedDeliveryTime").then((response) => {
			setDeliveryOptions(response.data);
		})
	}, []);

	useEffect(() => {
		axios.get("/api/payment-summary").then((response) => {
			setPaymentSummary(response.data);
		})
	}, [cart]);

	return (
		<>
			<title>Checkout</title>
			<link rel="icon" href="cart-favicon.png" />

			<CheckoutHeader />

			<div className="checkout-page">
				<div className="page-title">Review your order</div>
				<div className="checkout-grid">
					<OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart} />
					<PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
				</div>
			</div>
		</>
	);
}