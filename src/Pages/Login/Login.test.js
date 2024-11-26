import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";
import Login from "./Login"; // Component to be tested

// Mocking API (No sending request to real backend)
jest.mock("../../apis/Api");

describe("Login Page Test", () => {
  // Clear all the mock data
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should show error message on failed login", async () => {
    // Rendering login page
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Mocking Login fail response
    const mockResponse = {
      data: {
        success: false,
        message: "Invalid Password!",
      },
    };

    // Config mock resolved value
    loginUserApi.mockResolvedValue(mockResponse);

    // Config that toast error message as a test function
    toast.error = jest.fn();

    // Testing real UI Component
    // 1. Finding input fields
    const email = screen.getByPlaceholderText("email");
    const password = screen.getByPlaceholderText("password");
    const loginBtn = screen.getByText("Login");

    // Simulating the email, password, and login button
    fireEvent.change(email, { target: { value: "test@gmail.com" } });
    fireEvent.change(password, { target: { value: "test123" } });
    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(loginUserApi).toHaveBeenCalledWith({
        email: "test@gmail.com",
        password: "test123",
      });

      // Check if toast.error was called with the correct message
      expect(toast.error).toHaveBeenCalledWith("Invalid Password!");
    });
  });
});
