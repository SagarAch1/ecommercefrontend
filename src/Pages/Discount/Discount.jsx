import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createCouponApi } from "../../apis/Api";

const Discount = () => {
  const navigate = useNavigate();

  const [couponName, setCouponName] = useState("");
  const [couponType, setCouponType] = useState("");
  const [couponImage, setCouponImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImage = (event) => {
    const file = event.target.files[0];
    setCouponImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("couponName", couponName);
    formData.append("couponType", couponType);
    formData.append("couponImage", couponImage);

    createCouponApi(formData)
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
          toast.error("Failed to add coupon");
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
      <h2 style={headingStyle}>Add Discount</h2>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleAdd}>
            <div className="mb-3">
              <label htmlFor="couponName" style={labelStyle}>
                Discount Name
              </label>
              <input
                value={couponName}
                onChange={(e) => setCouponName(e.target.value)}
                className="form-control"
                type="text"
                id="couponName"
                placeholder="Enter your discount name"
                style={formControlStyle}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="couponType" style={labelStyle}>
                Discount Type
              </label>
              <select
                value={couponType}
                onChange={(e) => setCouponType(e.target.value)}
                className="form-select"
                id="couponType"
                style={formControlStyle}
              >
                <option value="">Select a discount</option>
                <option value="50%">Copy This Code For 50% OFF</option>
                <option value="25%">Copy This Code For 25% OFF</option>
                <option value="10%">Copy This Code For 10% OFF</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="couponImage" style={labelStyle}>
                Choose Discount Image
              </label>
              <input
                onChange={handleImage}
                type="file"
                className="form-control"
                id="couponImage"
                style={formControlStyle}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={buttonStyle}
            >
              Add Discount
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
                Discount Image Preview
              </h5>
              <img
                src={previewImage}
                alt="Discount"
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

export default Discount;
