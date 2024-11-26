import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCouponsApi } from "../../apis/Api";

const Coupon = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Discounts"); // Redirect to the route for adding a new coupon
  };

  // State for storing fetched coupons
  const [coupons, setCoupons] = useState([]);

  // Call the API to fetch all coupons initially (Page Load)
  useEffect(() => {
    getCouponsApi()
      .then((res) => {
        // Set the fetched coupons to state
        setCoupons(res.data.discounts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ textAlign: "right" }}>
        <button
          onClick={handleClick}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginTop: "40px",
            marginLeft: "20px",
            borderRadius: "8px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          New Coupon
        </button>
      </div>

      <table
        className="table mt-2"
        style={{
          marginTop: "20px",
          width: "100%",
          borderCollapse: "collapse",
          borderSpacing: "0",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid black", // Set border color of the table
        }}
      >
        <thead
          className="table-primary"
          style={{ backgroundColor: "#343a40", color: "black" }}
        >
          <tr>
            <th style={tableHeaderStyle}>Coupon Name</th>
            <th style={tableHeaderStyle}>Coupon Type</th>
            <th style={tableHeaderStyle}>Coupon Image</th>
            <th style={tableHeaderStyle}>Coupon Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id}>
              <td>{coupon.couponName}</td>
              <td>{coupon.couponType}</td>
              <td>
                <img
                  src={`http://localhost:5000/discounts/${coupon.couponImage}`}
                  alt=""
                  style={{ width: "40px", height: "40px" }}
                />
              </td>
              <td>
                <Link
                  to={`/admin/update-coupon/${coupon._id}`}
                  className="btn btn-primary"
                >
                  Edit
                </Link>
                <button className="btn btn-danger ms-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Style object for table headers and cells
const tableHeaderStyle = {
  padding: "12px",
  border: "1px solid black", // Set border color of table headers
  textAlign: "left",
};

export default Coupon;
