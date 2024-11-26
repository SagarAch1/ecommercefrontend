import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createProductApi } from "../../apis/Api";

const Product = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImage = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productDescription", productDescription);
    formData.append("productImage", productImage);

    createProductApi(formData)
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
          navigate("/admin/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 500) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to add product");
        }
      });
  };

  const containerStyle = { fontFamily: "'Roboto', sans-serif" };
  const headingStyle = {
    fontWeight: 700,
    marginBottom: "20px",
    textAlign: "center",
  };
  const labelStyle = {
    fontWeight: 700,
    fontSize: "1.1rem",
    color: "#333",
    display: "block",
    marginBottom: "5px",
  };
  const formControlStyle = { fontSize: "1rem", marginBottom: "15px" };
  const buttonStyle = { fontWeight: 700 };
  const textCenterStyle = { textAlign: "center" };
  const imgStyle = { height: "250px", objectFit: "cover", width: "100%" };

  return (
    <div className="container mt-5" style={containerStyle}>
      <h2 style={headingStyle}>Add Product</h2>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleAdd}>
            <div className="mb-3">
              <label htmlFor="productName" style={labelStyle}>
                Product Name
              </label>
              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="form-control"
                type="text"
                id="productName"
                placeholder="Enter your product name"
                style={formControlStyle}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice" style={labelStyle}>
                Product Price
              </label>
              <input
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="form-control"
                type="number"
                id="productPrice"
                placeholder="Enter your product price"
                style={formControlStyle}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productCategory" style={labelStyle}>
                Choose Category
              </label>
              <select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="form-select"
                id="productCategory"
                style={formControlStyle}
              >
                <option value=" furniture">Furniture</option>
                <option value=" furniture">New Furniture</option>
                <option value="used furniture">Used Furniture</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="productDescription" style={labelStyle}>
                Enter Description
              </label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="form-control"
                id="productDescription"
                rows="4"
                style={formControlStyle}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="productImage" style={labelStyle}>
                Choose Product Image
              </label>
              <input
                onChange={handleImage}
                type="file"
                className="form-control"
                id="productImage"
                style={formControlStyle}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={buttonStyle}
            >
              Add Product
            </button>
          </form>
        </div>
        <div className="col-md-6" style={textCenterStyle}>
          {previewImage && (
            <>
              <h5
                style={{
                  ...labelStyle,
                  marginTop: "20px",
                  marginBottom: "15px",
                }}
              >
                Product Image Preview
              </h5>
              <img
                src={previewImage}
                alt="Product"
                className="img-fluid rounded"
                style={imgStyle}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
