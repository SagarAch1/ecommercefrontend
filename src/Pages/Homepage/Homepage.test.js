import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { productMockData } from "../../__mock__/productMockData";
import {
  getPaginatedProductsApi,
  getSlidersApi,
  getTotalProductsApi,
} from "../../apis/Api";
import Homepage from "./Homepage";

// Mock the api.js
jest.mock("../../apis/Api");

describe("Testing Homepage", () => {
  // Clear all mocks before testing
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should display all products", async () => {
    // Mocking the response for total products and paginated products
    const mockData = productMockData;

    getTotalProductsApi.mockResolvedValue({
      data: {
        count: mockData.length,
      },
    });
    

    getPaginatedProductsApi.mockResolvedValue({
      data: {
        products: mockData,
      },
    });

    getSlidersApi.mockResolvedValue({
      data: {
        sliders: mockData,
      },
    });

    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );

    // Wait for the products to be displayed
    await waitFor(() => {
      mockData.forEach(async (product) => {
        expect(
          await screen.findByText(product.productName)
        ).toBeInTheDocument();
      });
    });
  });
});
