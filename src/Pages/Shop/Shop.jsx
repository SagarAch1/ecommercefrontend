import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCartApi, getProductsApi } from "../../apis/Api";
import ProductCard from "../../components/productCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getProductsApi()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDiscountClick = () => {
    navigate("/offer");
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
        console.log(error);
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

  return (
    <>
      <div className="container">
        <h2 className="mt-2">Available Products</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {products.map((singleProduct) => (
            <div className="col" key={singleProduct.id}>
              <ProductCard
                productInformation={singleProduct}
                color={"red"}
                onAddToCart={handleAddToCart}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                quantity={cart[singleProduct._id] || 0}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-light text-center">
          <h2>Get Amazing Offers</h2>
          <button
            className="btn btn-primary mt-2"
            onClick={handleDiscountClick}
          >
            Discounts
          </button>
        </div>
      </div>
    </>
  );
};

export default Shop;
