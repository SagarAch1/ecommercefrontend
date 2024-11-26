import axios from "axios";

// Creating Backend Config
const Api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000", // Use environment variable for base URL
  withCredentials: true, // This ensures that cookies are sent with requests
  headers: {
    "Content-Type": "multipart/form-data", // Default content type for form-data requests
  },
});

// Create configuration with authorization headers
const getConfig = () => ({
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Test API
export const testAPI = () => Api.get("/test");

// Register API
export const registerUserApi = (data) => Api.post("/api/user/create", data);

// Login API
export const loginUserApi = (data) => Api.post("/api/user/login", data);

// Create Product API
export const createProductApi = (data) =>
  Api.post("/api/product/create", data, getConfig());

// Get All Products API
export const getProductsApi = () => Api.get("/api/product/get_all_products");

// Get Single Product API
export const getSingleProductApi = (id) =>
  Api.get(`/api/product/get_single_product/${id}`);

// Delete Product API
export const deleteProduct = (id) =>
  Api.delete(`/api/product/delete-product/${id}`, getConfig());

// Update Product API
export const updateProduct = (id, data) =>
  Api.put(`/api/product/update_product/${id}`, data, getConfig());

// Get All Categories API
export const getAllCategory = () => Api.get("/api/category/get_all_categories");

// Paginated Products API
export const getPaginatedProductsApi = (page, limit) =>
  Api.get(`/api/product/pagination?page=${page}&limit=${limit}`);

// Total Products API
export const getTotalProductsApi = () => Api.get("/api/product/count");
export const getTotalSlidersApi = () => Api.get("/api/slider/count");

// Create Coupon API
export const createCouponApi = (data) =>
  Api.post("/api/coupon/create", data, getConfig());

// Get All Coupons API
export const getCouponsApi = () => Api.get("/api/coupon/get_all_discounts");

// Get Single Coupon API
export const getSingleCouponApi = (id) =>
  Api.get(`/api/coupon/get_single_discount/${id}`);

// Discount APIs
export const createDiscountApi = (data) =>
  Api.post("/api/discount/create", data, getConfig());
export const getAllDiscounts = () => Api.get("/api/discount/get_all_discounts");
export const getSingleDiscountApi = (id) =>
  Api.get(`/api/discount/get_single_discount/${id}`);
export const getDiscountByNameApi = (couponName) =>
  Api.get(`/api/discount/single-discount/${couponName}`); // Added API function

// Forgot Password API
export const forgotPasswordApi = (data) =>
  Api.post("/api/user/forgot_password", data);

// Verify OTP API
export const verifyOtp = (data) => Api.post("/api/user/verify_otp", data);

// Create Contact API
export const createContactApi = (data) =>
  Api.post("/api/contact/create", data, getConfig());

// Get All Contacts API
export const getContactsApi = () => Api.get("/api/contact/get_all_contacts");

// Cart APIs
export const addToCartApi = (data) =>
  Api.post("/api/cart/add", data, getConfig());
export const getCartItems = () =>
  Api.get("/api/cart/get_cart_items", getConfig());
export const getCartItemsApi = (userId) =>
  Api.get(`/api/cart/get_cart_items?userId=${userId}`, getConfig());
export const updateCartItemQuantity = (id, quantity) =>
  Api.put(`/api/cart/update_quantity/${id}`, { quantity }, getConfig());
export const removeCartItem = (id) =>
  Api.delete(`/api/cart/remove_item/${id}`, getConfig());

// Order APIs
export const createOrderApi = (data) =>
  Api.post("/api/order/create", data, getConfig());
export const getOrdersApi = () =>
  Api.get("/api/order/get_all_orders", getConfig());
export const CreateSingleOrderApi = (id) =>
  Api.post("/api/order/create_single_order", { id }, getConfig());
export const getSingleOrderApi = (id) =>
  Api.get(`/api/order/get_single_order/${id}`, getConfig());
export const updateOrderStatus = (updateData) => Api.put('/api/order/update_status', updateData, getConfig());

// Wishlist APIs
export const getWishlistApi = () =>
  Api.get("/api/wishlist/get_wishlist", getConfig());
export const addToWishlistApi = (data) =>
  Api.post("/api/wishlist/add", data, getConfig());
export const removeFromWishlistApi = (id) =>
  Api.delete(`/api/wishlist/remove/${id}`, getConfig());

// Review APIs
export const getReviewsApi = (productId) =>
  Api.get(`/api/reviews/${productId}`);
export const submitReviewApi = (data) =>
  Api.post("/api/reviews", data, getConfig());

// Apply Coupon Code API
export const applyCouponCodeApi = (data) =>
  Api.post("/api/coupon/apply", data, getConfig());

// Create Slider API
export const createSlidersApi = (data) =>
  Api.post("/api/slider/create", data, getConfig());

// Get All Sliders API
export const getSlidersApi = () => Api.get("/api/slider/get_all_sliders");

export const getDashboardStats = () =>
  Api.get("/api/dashboard/get_dashboard_stats", getConfig());

export const clearCartApi = () => {
  return axios.delete("/api/cart/clear");



};

export const khaltiApiSend = (data, khaltiConfig) => Api.post("https://khalti.com/api/v2/payment/verify/", data, khaltiConfig);