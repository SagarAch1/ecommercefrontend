import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  getReviewsApi,
  getSingleProductApi,
  submitReviewApi,
} from "../../apis/Api";

const Review = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");
  const [userName, setUserName] = useState(""); // New state for user name

  useEffect(() => {
    getSingleProductApi(productId)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((error) => {
        console.log(error);
      });

    getReviewsApi(productId)
      .then((res) => {
        setReviews(res.data.reviews);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);

  const handleSaveReview = () => {
    const reviewData = {
      productId,
      rating,
      review,
      userName, // Include user name in review data
    };

    submitReviewApi(reviewData)
      .then((res) => {
        alert("Review saved successfully!");
        setReviews([...reviews, res.data.review]);
        setRating(5);
        setReview("");
        setUserName(""); // Clear user name after submitting
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!product) return <div>Loading...</div>;

  const averageRating = reviews.length
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 5;

  return (
    <div className="container mt-5">
      <h2>Review for {product.productName}</h2>
      <img
        src={`http://localhost:5000/products/${product.productImage}`}
        alt={product.productName}
        style={{ width: "200px", height: "200px" }}
      />
      <div>
        <h3>Average Rating: {averageRating.toFixed(1)}</h3>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <FaStar
              key={index}
              size={30}
              color={ratingValue <= averageRating ? "gold" : "gray"}
            />
          );
        })}
      </div>
      <div>
        <h3>Your Rating:</h3>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                style={{ display: "none" }}
              />
              <FaStar
                size={30}
                color={ratingValue <= (hover || rating) ? "gold" : "gray"}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mt-2" onClick={handleSaveReview}>
        Save Review
      </button>
      <div>
        <h3>All Reviews:</h3>
        {reviews.map((review, index) => (
          <div key={index}>
            <div>
              {[...Array(5)].map((star, i) => (
                <FaStar
                  key={i}
                  size={20}
                  color={i < review.rating ? "gold" : "gray"}
                />
              ))}
            </div>
            <p>
              <strong>{review.userName}</strong>: {review.review}
            </p>{" "}
            {/* Display userName */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
