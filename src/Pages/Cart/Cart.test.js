import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Cart from './Cart';
import { getCartItems, updateCartItemQuantity, removeCartItem } from '../../apis/Api';

// Mock the API calls
jest.mock('../../apis/Api', () => ({
  getCartItems: jest.fn(),
  updateCartItemQuantity: jest.fn(),
  removeCartItem: jest.fn(),
}));

describe('Cart Component', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  test('should display cart items and handle quantity updates', async () => {
    // Mock data for cart items
    const mockCartItems = [
      {
        _id: '1',
        productId: {
          productName: 'Product 1',
          productPrice: 100,
          productImage: 'image1.jpg',
        },
        quantity: 1,
      },
      {
        _id: '2',
        productId: {
          productName: 'Product 2',
          productPrice: 200,
          productImage: 'image2.jpg',
        },
        quantity: 2,
      },
    ];

    // Mock API responses
    getCartItems.mockResolvedValue({ data: mockCartItems });

    render(
      <MemoryRouter> {/* Wrap Cart component with MemoryRouter */}
        <Cart />
      </MemoryRouter>
    );

    // Check if cart items are displayed
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    // Check initial quantity
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    // Simulate incrementing quantity
    fireEvent.click(screen.getAllByText('+')[0]); // Increment first item
    await waitFor(() => {
      expect(updateCartItemQuantity).toHaveBeenCalledWith('1', 2);
    });

    // Simulate decrementing quantity
    fireEvent.click(screen.getAllByText('-')[1]); // Decrement second item
    await waitFor(() => {
      expect(updateCartItemQuantity).toHaveBeenCalledWith('2', 1);
    });

    // Simulate removing an item
    fireEvent.click(screen.getAllByText('-')[1]); // Remove second item
    await waitFor(() => {
      expect(removeCartItem).toHaveBeenCalledWith('2');
    });

    // Check if the item is removed
    await waitFor(() => {
      expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
    });
  });

  test('should handle empty cart', async () => {
    // Mock API responses for empty cart
    getCartItems.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter> {/* Wrap Cart component with MemoryRouter */}
        <Cart />
      </MemoryRouter>
    );

    // Check if empty cart message is displayed
    await waitFor(() => {
      expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    });
  });
});