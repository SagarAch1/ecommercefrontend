import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createSlidersApi } from "../../apis/Api";

const Slider = () => {
  const navigate = useNavigate();

  const [sliderName, setSliderName] = useState("");
  const [sliderType, setSliderType] = useState("");
  const [sliderImage, setSliderImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImage = (event) => {
    const file = event.target.files[0];
    setSliderImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("sliderName", sliderName);
    formData.append("sliderType", sliderType);
    formData.append("sliderImage", sliderImage);

    createSlidersApi(formData)
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
          toast.error("Failed to add slider");
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
      <h2 style={headingStyle}>Add Slider</h2>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleAdd}>
            <div className="mb-3">
              <label htmlFor="sliderName" style={labelStyle}>
                Slider Name
              </label>
              <input
                value={sliderName}
                onChange={(e) => setSliderName(e.target.value)}
                className="form-control"
                type="text"
                id="sliderName"
                placeholder="Enter your slider name"
                style={formControlStyle}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sliderType" style={labelStyle}>
                Slider Type
              </label>
              <select
                value={sliderType}
                onChange={(e) => setSliderType(e.target.value)}
                className="form-select"
                id="sliderType"
                style={formControlStyle}
              >
                <option value="">Select a slider</option>
                <option value="50%"> 50% </option>
                <option value="25%"> 25% </option>
                <option value="10%">10% </option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="sliderImage" style={labelStyle}>
                Choose Slider Image
              </label>
              <input
                onChange={handleImage}
                type="file"
                className="form-control"
                id="sliderImage"
                style={formControlStyle}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={buttonStyle}
            >
              Add Slider
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
                Slider Image Preview
              </h5>
              <img
                src={previewImage}
                alt="Slider"
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

export default Slider;
