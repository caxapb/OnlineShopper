import { it, expect, describe, vi, beforeEach } from 'vitest';
import { HomePage } from '../src/pages/home/HomePage';
import { render, screen, within } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';


vi.mock('axios');

describe('HomePage component', () => {
  let loadCart;
  let user; 

  beforeEach(() => {
    loadCart = vi.fn();
    user = userEvent.setup();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === '/api/products') {
        return {
          data: [{
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
              stars: 4.5,
              count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
          },
          {
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            image: "images/products/intermediate-composite-basketball.jpg",
            name: "Intermediate Size Basketball",
            rating: {
              stars: 4,
              count: 127
            },
            priceCents: 2095,
            keywords: ["sports", "basketballs"]
          }]
        };
      }
    });
  });

  it('displays the products correctly', async () => {
    render(<MemoryRouter >
      <HomePage cart={[]} loadCart={loadCart} />
    </MemoryRouter>);
    const productsContainers = await screen.findAllByTestId('product-container');
    expect(productsContainers.length).toBe(2);
    expect(
      within(productsContainers[0]).getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();
    expect(
      within(productsContainers[1]).getByText('Intermediate Size Basketball')
    ).toBeInTheDocument();
  });

  it('add to cart button works', async () => {
    render(<MemoryRouter >
      <HomePage cart={[]} loadCart={loadCart} />
    </MemoryRouter>);
    const productsContainers = await screen.findAllByTestId('product-container');
    const product1 = within(productsContainers[0]);
    const product2 = within(productsContainers[1]);


    const addButton1 = product1.getByTestId('add-to-cart-button');
    const addButton2 = product2.getByTestId('add-to-cart-button');
    const quantitySelector1 = product1.getByTestId('quantity-selector');
    const quantitySelector2 = product2.getByTestId('quantity-selector');
    
    await user.selectOptions(quantitySelector1, '2');
    await user.selectOptions(quantitySelector2, '3');

    await user.click(addButton1);
    await user.click(addButton2);
    
    expect(axios.post).toHaveBeenNthCalledWith(1, '/api/cart-items',
      {productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 2}
    )
    expect(axios.post).toHaveBeenNthCalledWith(2, '/api/cart-items',
      {productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 3}
    )
    expect(loadCart).toHaveBeenCalledTimes(2);
  });
});