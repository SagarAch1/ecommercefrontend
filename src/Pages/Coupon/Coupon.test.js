// src/Pages/Coupon/Coupon.test.js

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Coupon from './Coupon';
import { getCouponsApi } from '../../apis/Api';

// Mock the API call
jest.mock('../../apis/Api', () => ({
  getCouponsApi: jest.fn(),
}));

const mockCoupons = [
  {
    _id: '1',
    couponName: 'Discount10',
    couponType: 'Percentage',
    couponImage: 'discount10.png',
  },
  {
    _id: '2',
    couponName: 'FreeShipping',
    couponType: 'FreeShipping',
    couponImage: 'freeshipping.png',
  },
];

describe('Coupon Component', () => {
  beforeEach(() => {
    // Mock the API response
    getCouponsApi.mockResolvedValue({ data: { discounts: mockCoupons } });
  });

  test('should display coupons in the table', async () => {
    render(
      <Router>
        <Coupon />
      </Router>
    );

    // Wait for the coupons to be loaded
    await waitFor(() => {
      // Check for coupon names
      expect(screen.getByText('Discount10')).toBeInTheDocument();

      // Use queryAllByText for checking multiple elements
      const freeShippingElements = screen.queryAllByText('FreeShipping');
      expect(freeShippingElements).toHaveLength(2);

      // Check for images
      expect(screen.getAllByAltText('')).toHaveLength(mockCoupons.length);
    });
  });
});
