import React, { useState, useEffect } from "react";
import { getWishlistApi, removeFromWishlistApi, addToCartApi } from "../../apis/Api";
import ProductCard from "../../components/productCard";
import { toast } from "react-toastify";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    // Fetch wishlist items from the API
    fetchWishlist();
  }, []);

  const fetchWishlist = () => {
    getWishlistApi()
      .then((res) => {
        setWishlist(res.data.wishlist);
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
      });
  };

  const handleAddToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));

    addToCartApi({
      productId: productId,
      quantity: 1,
    })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  const handleIncrement = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: prevCart[productId] + 1,
    }));
  };

  const handleDecrement = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: Math.max(prevCart[productId] - 1, 0),
    }));
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlistApi(productId)
      .then((res) => {
        setWishlist(wishlist.filter((item) => item._id !== productId));
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.error("Error removing from wishlist:", error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>My Wishlist</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {wishlist.map((product) => (
          <div key={product._id} className="col">
            <ProductCard
              productInformation={product}
              color={"#007bff"} // Example color for badge background
              onAddToCart={handleAddToCart}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemoveFromWishlist={handleRemoveFromWishlist}
              quantity={cart[product._id] || 0}
              isWishlistView={true} // Indicates it's rendered in wishlist view
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
