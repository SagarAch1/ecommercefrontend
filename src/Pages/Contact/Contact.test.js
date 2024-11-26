import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import { createContactApi } from '../../apis/Api';
import Contact from './Contact';

// Mocking the API and toast
jest.mock('../../apis/Api');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Contact Component Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should send a message and show success toast on successful form submission', async () => {
    // Mock API response
    createContactApi.mockResolvedValue({
      status: 200,
    });

    render(<Contact />);

    // Interacting with form elements
    const firstNameInput = screen.getByPlaceholderText(/First Name \*/i);
    const lastNameInput = screen.getByPlaceholderText(/Last Name/i);
    const phoneInput = screen.getByPlaceholderText(/Phone \*/i);
    const emailInput = screen.getByPlaceholderText(/Email \*/i);
    const messageInput = screen.getByPlaceholderText(/Message/i);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });

    // Simulate user input
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello, I have a question.' } });

    // Submit the form
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Assert API call
      expect(createContactApi).toHaveBeenCalledTimes(1);
      expect(createContactApi).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        phone: '123-456-7890',
        email: 'john.doe@example.com',
        message: 'Hello, I have a question.',
      });

      // Assert toast success message
      expect(toast.success).toHaveBeenCalledWith('Message sent successfully');

      // Assert form reset
      expect(firstNameInput.value).toBe('');
      expect(lastNameInput.value).toBe('');
      expect(phoneInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(messageInput.value).toBe('');
    });
  });

  it('Should show error toast on form submission failure', async () => {
    // Mock API error response
    createContactApi.mockRejectedValue(new Error('Failed to send message'));

    render(<Contact />);

    // Interacting with form elements
    const firstNameInput = screen.getByPlaceholderText(/First Name \*/i);
    const phoneInput = screen.getByPlaceholderText(/Phone \*/i);
    const emailInput = screen.getByPlaceholderText(/Email \*/i);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });

    // Simulate user input
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    // Submit the form
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Assert API call
      expect(createContactApi).toHaveBeenCalledTimes(1);

      // Assert toast error message
      expect(toast.error).toHaveBeenCalledWith('Failed to send message');
    });
  });
});
