import { useState } from "react";
import axios from "axios";

import { formatMoney } from "../../utils/money";

export function CartItemDetails({ cartItem, loadCart }) {
  const [beingUpdated, setBeingUpdated] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  }

  const updateQuantity = async () => {
    if (beingUpdated) {
      const prId = cartItem.productId;
      await axios.put(`/api/cart-items/${prId}`, {
        quantity
      });
      loadCart();
      setBeingUpdated(false);

    } else {
      setBeingUpdated(true);
    }
  };

  const setQuantityFunc = (event) => {
    setQuantity(Number(event.target.value));
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      updateQuantity();
    } else if (event.key === 'Escape') {
      setBeingUpdated(false);
    }
  }

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: {beingUpdated
              ? <input type="text" className="quantity-textbox" value={quantity} 
                        onChange={setQuantityFunc}  
                        onKeyDown={handleKeyDown}  />
              : <span className="quantity-label">{cartItem.quantity}</span>
            }
          </span>
          <span className="update-quantity-link link-primary"
            onClick={updateQuantity}>
            Update
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  );
}