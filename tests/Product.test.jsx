import { it, expect, describe, vi, beforeEach } from 'vitest';
import { Product } from '../src/pages/home/Product';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

vi.mock('axios');

describe('product component', () => {
  let product;
  let loadCart;
  let user;

  beforeEach(() => {
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"]
    };

    loadCart = vi.fn();
    user = userEvent.setup();

    render(<Product product={product} loadCart={loadCart} />);
  });

  it('displays the product details correctly', () => {
    expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument();
    expect(screen.getByText('$10.90')).toBeInTheDocument();
    // set the data-testId attribute in the Product component
    expect(screen.getByTestId("product-image")).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');
    expect(screen.getByText('87')).toBeInTheDocument();

    const quantitySelector = screen.getByTestId("quantity-selector");
    expect(quantitySelector).toHaveValue('1');
  });

  it('quantity can be chosen correctly', async() => {
    const quantitySelector = screen.getByTestId("quantity-selector");
    expect(quantitySelector).toHaveValue('1');

    await user.selectOptions(quantitySelector, '3');
    expect(quantitySelector).toHaveValue('3');

    const addToCartButton = screen.getByTestId('add-to-cart-button');
    await user.click(addToCartButton);
    expect(axios.post).toHaveBeenCalledWith(
      '/api/cart-items', 
      {productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 3}
    );
    expect(loadCart).toHaveBeenCalled();
  })

  it('adds a product to the cart', async () => {

    const addToCartButton = screen.getByTestId('add-to-cart-button');
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith(
      '/api/cart-items', 
      {productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 1}
    );
    expect(loadCart).toHaveBeenCalled();
  });
});