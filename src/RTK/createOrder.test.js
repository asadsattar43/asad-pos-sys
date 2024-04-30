import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import CreateOrder from './CreateOrder';
import orderReducer from './orderSlice';
import api from '../RTK/apiSlice';

const store = createStore(orderReducer);

describe('CreateOrder component', () => {
  it('renders form with initial values', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <CreateOrder />
      </Provider>
    );

    expect(getByLabelText('Order Amount')).toHaveValue(0);
    expect(getByLabelText('Order Date and Time')).toHaveValue('');
    expect(getByLabelText('Venue Date')).toHaveValue('');
  });

  it('handles form submission', async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <CreateOrder />
      </Provider>
    );

    const orderAmountInput = getByLabelText('Order Amount');
    const orderDateTimeInput = getByLabelText('Order Date and Time');
    const venueOpenDateInput = getByLabelText('Venue Date');
    const submitButton = getByText('Create Order');

    fireEvent.change(orderAmountInput, { target: { value: 100 } });
    fireEvent.change(orderDateTimeInput, { target: { value: '2024-04-29T14:30:00.000Z' } });
    fireEvent.change(venueOpenDateInput, { target: { value: '2024-04-29' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(store.getState().orders).toHaveLength(1);
    });
  });
});