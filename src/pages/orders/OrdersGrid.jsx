import { OrderHeader } from "./OrderHeader";
import { OrderDetailsGrid } from "./OrderDetailsGrid";


export function OrdersGrid({orders, cart, loadCart}) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            <OrderHeader order={order}/>
            <OrderDetailsGrid order={order} cart={cart} loadCart={loadCart} />
          </div>
        );
      })}

    </div>
  );
}