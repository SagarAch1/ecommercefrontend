import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addToCartApi,
  getPaginatedProductsApi,
  getSlidersApi,
  getTotalProductsApi,
} from "../../apis/Api";
import ProductCard from "../../components/productCard";
import Footer from "../Homepage/Footer";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [cart, setCart] = useState({});
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    setCurrentPage(pageNumber);

    getPaginatedProductsApi(pageNumber, 4)
      .then((res) => {
        setProducts(res.data.products);
        console.log("Fetched products on page change:", res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTotalProductsApi()
      .then((res) => {
        const totalProducts = res.data.count;
        setTotalPages(Math.ceil(totalProducts / 4));
      })
      .catch((error) => {
        console.log(error);
      });

    getPaginatedProductsApi(page, 4)
      .then((res) => {
        setProducts(res.data.products);
        console.log("Fetched products on initial load:", res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });

    getSlidersApi()
      .then((res) => {
        setSliders(res.data.sliders);
        console.log("Fetched sliders:", res.data.sliders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  const handleDiscountClick = () => {
    navigate("/offer");
  };

  const handleAddToCart = (productId) => {
    console.log(productId);
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
    console.log(cart);

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
      <div
        className="container"
        style={{
          background: "#f8f8f8",
          minHeight: "100vh",
          color: "#333",
          padding: "20px",
        }}
      >
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          style={{ width: "100%" }}
          data-bs-ride="carousel"
          data-bs-interval="2000"
        >
          <div className="carousel-indicators">
            {sliders.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {sliders.map((slider, index) => (
              <div
                key={slider._id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={`http://localhost:5000/sliders/${slider.sliderImage}`}
                  className="d-block w-100"
                  alt={slider.name}
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{slider.name}</h5>
                  <p>{slider.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <h2 className="mt-2">Available</h2>
        <div>
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
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center pt-5">
              <li className="page-item">
                <button
                  className={`page-link ${currentPage === 1 ? "disabled" : ""}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  key={index}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className="page-item">
                <button
                  className={`page-link ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div
          className="mt-4 p-3 bg-light text-center"
          style={{ color: "black" }}
        >
          <h2>Get Amazing Offers</h2>
          <button
            className="btn btn-primary mt-2"
            onClick={handleDiscountClick}
          >
            Discounts
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
