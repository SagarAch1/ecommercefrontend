import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProductApi } from '../../apis/Api';
import Product from './Product';

// Mocking the API and URL.createObjectURL
jest.mock('../../apis/Api');
global.URL.createObjectURL = jest.fn();

describe('Product Component Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should create a product when the form is submitted', async () => {
    render(
      <BrowserRouter>
        <Product />
      </BrowserRouter>
    );

    // Mocking the API response
    const mockResponse = {
      status: 201,
      data: {
        message: 'Product added successfully',
      },
    };

    createProductApi.mockResolvedValue(mockResponse);
    toast.success = jest.fn();

    // Interacting with form elements
    const productName = screen.getByPlaceholderText(/Enter your product name/i);
    const productPrice = screen.getByPlaceholderText(/Enter your product price/i);
    const productCategory = screen.getByLabelText(/Choose Category/i);
    const productDescription = screen.getByLabelText(/Enter Description/i);
    const productImage = screen.getByLabelText(/Choose Product Image/i);
    const submitBtn = screen.getByRole('button', { name: /Add Product/i });

    // Simulate user input
    fireEvent.change(productName, { target: { value: 'Test Product' } });
    fireEvent.change(productPrice, { target: { value: '49.99' } });
    fireEvent.change(productCategory, { target: { value: 'used furniture' } });
    fireEvent.change(productDescription, { target: { value: 'This is a test product description.' } });

    // Simulate file upload
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    fireEvent.change(productImage, { target: { files: [file] } });

    // Submit the form
    fireEvent.click(submitBtn);

    await waitFor(() => {
      // Assert API call
      expect(createProductApi).toHaveBeenCalledTimes(1);
      const formData = new FormData();
      formData.append('productName', 'Test Product');
      formData.append('productPrice', '49.99');
      formData.append('productCategory', 'used furniture');
      formData.append('productDescription', 'This is a test product description.');
      formData.append('productImage', file);

      const callArgs = createProductApi.mock.calls[0][0];
      const entries = [...callArgs.entries()];
      expect(entries).toEqual([...formData.entries()]);

      // Assert toast success message
      expect(toast.success).toHaveBeenCalledWith('Product added successfully');
    });
  });

  it('Should show error toast on API error', async () => {
    render(
      <BrowserRouter>
        <Product />
      </BrowserRouter>
    );

    // Mocking the API response
    const mockError = {
      response: { status: 500, data: { message: 'Internal Server Error' } },
    };

    createProductApi.mockRejectedValue(mockError);
    toast.error = jest.fn();

    // Interacting with form elements
    const productName = screen.getByPlaceholderText(/Enter your product name/i);
    const productPrice = screen.getByPlaceholderText(/Enter your product price/i);
    const productCategory = screen.getByLabelText(/Choose Category/i);
    const productDescription = screen.getByLabelText(/Enter Description/i);
    const productImage = screen.getByLabelText(/Choose Product Image/i);
    const submitBtn = screen.getByRole('button', { name: /Add Product/i });

    // Simulate user input
    fireEvent.change(productName, { target: { value: 'Test Product' } });
    fireEvent.change(productPrice, { target: { value: '49.99' } });
    fireEvent.change(productCategory, { target: { value: 'used furniture' } });
    fireEvent.change(productDescription, { target: { value: 'This is a test product description.' } });

    // Simulate file upload
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    fireEvent.change(productImage, { target: { files: [file] } });

    // Submit the form
    fireEvent.click(submitBtn);

    await waitFor(() => {
      // Assert API call
      expect(createProductApi).toHaveBeenCalledTimes(1);

      // Assert error toast message
      expect(toast.error).toHaveBeenCalledWith('Internal Server Error');
    });
  });
});
