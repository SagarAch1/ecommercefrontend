import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { registerUserApi } from "../../apis/Api";
import Register from "./Register"; // Component to be tested

// Mocking API (No sending request to real backend)
jest.mock("../../apis/Api");

describe("Register Page Test", () => {
  // Clear all the mock data
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should handle registration form submission", async () => {
    // Rendering register page
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Mocking Register response
    const mockResponse = {
      data: {
        success: true,
        message: "Registration successful!",
      },
    };

    // Config mock resolved value
    registerUserApi.mockResolvedValue(mockResponse);

    // Testing real UI Component
    // 1. Finding input fields
    const fullName = screen.getByLabelText("Full Name");
    const phone = screen.getByLabelText("Phone Number");
    const email = screen.getByLabelText("Email Address");
    const password = screen.getByLabelText("Password");
    const confirmPassword = screen.getByLabelText("Confirm Password");
    const registerBtn = screen.getByRole('button', { name: /register/i });

    // Simulating the input fields and register button
    fireEvent.change(fullName, { target: { value: "John Doe" } });
    fireEvent.change(phone, { target: { value: "1234567890" } });
    fireEvent.change(email, { target: { value: "john.doe@example.com" } });
    fireEvent.change(password, { target: { value: "password123" } });
    fireEvent.change(confirmPassword, { target: { value: "password123" } });
    fireEvent.click(registerBtn);

    await waitFor(() => {
      expect(registerUserApi).toHaveBeenCalledWith({
        fullName: "John Doe",
        phone: "1234567890",
        email: "john.doe@example.com",
        password: "password123",
      });
    });
  });
});
