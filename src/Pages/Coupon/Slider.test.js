import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { createSlidersApi } from "../../apis/Api";
import Slider from "./Slider"; // Component to be tested

// Mocking API (No sending request to real backend)
jest.mock("../../apis/Api");

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn();

describe("Slider Component Test", () => {
  // Clear all the mock data after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should create a slider when the form is submitted", async () => {
    // Rendering the slider page
    render(
      <BrowserRouter>
        <Slider />
      </BrowserRouter>
    );

    // Mocking Slider create response
    const mockResponse = {
      status: 201,
      data: {
        message: "Slider added successfully",
      },
    };

    // Configure mock resolved value
    createSlidersApi.mockResolvedValue(mockResponse);

    // Configure toast success message as a test function
    toast.success = jest.fn();

    // Testing the UI Component
    // 1. Finding input fields and button
    const sliderName = screen.getByPlaceholderText(/Enter your slider name/i);
    const sliderType = screen.getByLabelText(/Slider Type/i);
    const sliderImage = screen.getByLabelText(/Choose Slider Image/i);
    const submitBtn = screen.getByRole("button", { name: /Add Slider/i });

    // Simulating the input and form submission
    fireEvent.change(sliderName, { target: { value: "New Slider" } });
    fireEvent.change(sliderType, { target: { value: "50%" } });

    // Simulate file upload
    const file = new File(["dummy content"], "example.png", { type: "image/png" });
    fireEvent.change(sliderImage, { target: { files: [file] } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      // Assert that createSlidersApi was called with the correct parameters
      expect(createSlidersApi).toHaveBeenCalledTimes(1);
      const formData = new FormData();
      formData.append("sliderName", "New Slider");
      formData.append("sliderType", "50%");
      formData.append("sliderImage", file);

      // Extract FormData from the mock
      const callArgs = createSlidersApi.mock.calls[0][0];

      // Check FormData content
      const entries = [...callArgs.entries()];
      expect(entries).toEqual([...formData.entries()]);

      // Check if toast.success was called with the correct message
      expect(toast.success).toHaveBeenCalledWith("Slider added successfully");
    });
  });
});
