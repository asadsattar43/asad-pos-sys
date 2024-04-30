import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { getOrdersByDate } from './apiSlice';
import { store } from '../store';

describe('getOrdersByDate function', () => {
  it('fetches orders by date', async () => {
    const date = '2024-04-29';
    const response = await getOrdersByDate(date);
    expect(response).toBeTruthy();
    expect(store.getState().orders).toHaveLength(1);
  });

  it('handles error response', async () => {
    const date = '2024-04-29';
    const error = new Error('Error message');
    await getOrdersByDate(date).catch((err) => {
      expect(err).toBe(error);
    });
  });
});