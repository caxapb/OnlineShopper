import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';
import { PaymentSummary } from '../src/pages/checkout/PaymentSummary';

vi.mock("axios");

describe('PaymentSummary component', () => {
  let paymentSummary;
  let loadCart;
  let user;

  function Location() {
    const location = useLocation();
    return (<div data-testId="url-path">{location.pathname}</div>);
  }

  beforeEach(() => {
    paymentSummary = paymentSummary = {
      totalItems: 3,
      productCostCents: 4275,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 4774,
      taxCents: 477,
      totalCostCents: 5251
    };

    user = userEvent.setup();

    loadCart = vi.fn();
    render(<MemoryRouter> <Location /> <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/> </MemoryRouter>);
  });

  it('displayed info is correct', () => {
    expect(screen.getByText('Items (3):')).toBeInTheDocument();
    expect(screen.getByTestId('payment-summary-product-cost')).toHaveTextContent('$42.75');
  });

  it('places an order correctly', async() => {
    const createOrderButton = screen.getByTestId('create-order-button');
    await user.click(createOrderButton);

    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(loadCart).toHaveBeenCalledTimes(1);

    const locationComponent = screen.getByTestId('url-path');
    expect(locationComponent).toHaveTextContent('/orders');
  });
});