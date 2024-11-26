import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { createCouponApi } from "../../apis/Api";
import Discount from "./Discount";

// Mocking the API and URL.createObjectURL
jest.mock("../../apis/Api");
global.URL.createObjectURL = jest.fn();

describe("Discount Component Test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should create a discount when the form is submitted", async () => {
    render(
      <BrowserRouter>
        <Discount />
      </BrowserRouter>
    );

    // Mocking the API response
    const mockResponse = {
      status: 201,
      data: {
        message: "Discount added successfully",
      },
    };

    createCouponApi.mockResolvedValue(mockResponse);
    toast.success = jest.fn();

    // Interacting with form elements
    const couponName = screen.getByPlaceholderText(/Enter your discount name/i);
    const couponType = screen.getByLabelText(/Discount Type/i);
    const couponImage = screen.getByLabelText(/Choose Discount Image/i);
    const submitBtn = screen.getByRole("button", { name: /Add Discount/i });

    // Simulate user input
    fireEvent.change(couponName, { target: { value: "New Discount" } });
    fireEvent.change(couponType, { target: { value: "50%" } });

    // Simulate file upload
    const file = new File(["dummy content"], "discount.png", { type: "image/png" });
    fireEvent.change(couponImage, { target: { files: [file] } });

    // Submit the form
    fireEvent.click(submitBtn);

    await waitFor(() => {
      // Assert API call
      expect(createCouponApi).toHaveBeenCalledTimes(1);
      const formData = new FormData();
      formData.append("couponName", "New Discount");
      formData.append("couponType", "50%");
      formData.append("couponImage", file);

      const callArgs = createCouponApi.mock.calls[0][0];
      const entries = [...callArgs.entries()];
      expect(entries).toEqual([...formData.entries()]);

      // Assert toast success message
      expect(toast.success).toHaveBeenCalledWith("Discount added successfully");
    });
  });
});

