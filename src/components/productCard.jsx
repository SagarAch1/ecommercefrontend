import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({
  productInformation,
  color,
  onAddToCart,
  onIncrement,
  onDecrement,
  quantity,
}) => {
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddToCart = () => {
    onAddToCart(productInformation._id);
    setSuccessMessage("Added to cart successfully");
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  return (
    <>
      <div className="card fixed-size-card">
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        <span
          style={{
            background: color,
          }}
          className="badge bg-primary position-absolute top-0"
        >
          {productInformation.productCategory}
        </span>
        <img
          src={`http://localhost:5000/products/${productInformation.productImage}`}
          className="card-img-top fixed-size-image"
          alt="..."
        />
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{productInformation.productName}</h5>
            <h5 className="card-title text-danger">
              NPR. {productInformation.productPrice}
            </h5>
          </div>

          <p className="card-text">
            {productInformation.productDescription.slice(0, 50)}
          </p>

          <div className="d-flex align-items-center">
            {/* Default 5-star rating */}
            {[...Array(5)].map((star, index) => (
              <FaStar key={index} color="gold" />
            ))}
          </div>

          <Link
            to={`/review/${productInformation._id}`}
            className="btn btn-link p-0"
          >
            See Review
          </Link>

          {quantity > 0 ? (
            <div className="d-flex align-items-center justify-content-center">
              <button
                className="btn btn-danger"
                onClick={() => onDecrement(productInformation._id)}
              >
                -
              </button>
              <span className="mx-2">{quantity}</span>
              <button
                className="btn btn-danger"
                onClick={() => onIncrement(productInformation._id)}
              >
                +
              </button>
              <Link to="/cart" className="btn btn-dark mx-2">
                Go to Cart
              </Link>
            </div>
          ) : (
            <button className="btn btn-success w-100" onClick={handleAddToCart}>
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
