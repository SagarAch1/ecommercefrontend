import React, { useEffect, useState } from "react";
import { getCouponsApi, getOrdersApi, getProductsApi, getSlidersApi } from "../../../apis/Api"; 
import Coupon from "../../Coupon/Coupon";
import Myorder from "../../Homepage/Myorder"; // Ensure Myorder is imported
import Message from "../../Message/Message";
import New from "../../New/New";
import Slider from "../../Coupon/Sliderfetch";

const AdminDashboard = () => {
  const [page, setPage] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [orders, setOrders] = useState([]);
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCoupons();
    fetchOrders();
    fetchSliders();
  }, []);

  const fetchProducts = () => {
    getProductsApi()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCoupons = () => {
    getCouponsApi()
      .then((res) => {
        setCoupons(res.data.coupons);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchSliders = () => {
    getSlidersApi()
      .then((res) => {
        setSlider(res.data.coupons);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchOrders = () => {
    getOrdersApi()
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderPageContent = () => {
    switch (page) {
      case "dashboard":
        return (
          <div>
            <h2>Welcome Home Admin</h2>
          </div>
        );
      case "product":
        return (
          <div>
            <h2>Add Product</h2>
            <New />
          </div>
        );
      case "coupon":
        return (
          <div>
            <h2>Coupon</h2>
            <Coupon />
          </div>
        );
      case "message":
        return (
          <div>
            <h2>Message</h2>
            <Message /> {/* Render the Message component */}
          </div>
        );
        case "slider":
        return (
          <div>
            <h2>Slider</h2>
            <Slider /> {/* Render the Message component */}
          </div>
        );
      case "order":
        return (
          <div>
            <h2>Orders</h2>
            <Myorder orders={orders} />{" "}
            {/* Render the Myorder component with orders */}
          </div>
        );
      case "offer":
      default:
        return (
          <div>
            <h2>Welcome to Admin Dashboard</h2>
          </div>
        );
    }
  };

  const styles = {
    container: {
      padding: "50px",
      backgroundImage: "linear-gradient(to right, #4facfe, #00f2fe)",
      color: "#fff",
    },
    sidebar: {
      backgroundColor: "#333",
      padding: "20px",
      borderRadius: "10px",
    },
    sidebarHeader: {
      color: "#fff",
      marginBottom: "20px",
    },
    sidebarList: {
      listStyle: "none",
      padding: "0",
    },
    sidebarItem: {
      marginBottom: "10px",
    },
    button: {
      width: "100%",
      marginBottom: "10px",
      borderRadius: "5px",
    },
    mainContent: {
      backgroundColor: "#fff",
      color: "#333",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "space-between",
    },
  };

  return (
    <div className="container mt-5" style={styles.container}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div style={styles.sidebar}>
            <h2 style={styles.sidebarHeader}>Admin Dashboard</h2>
            <ul style={styles.sidebarList}>
              <li style={styles.sidebarItem}>
                <button
                  className={`btn btn-${
                    page === "dashboard" ? "primary" : "outline-primary"
                  } btn-block`}
                  onClick={() => setPage("dashboard")}
                  style={styles.button}
                >
                  Dashboard
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button
                  className={`btn btn-${
                    page === "product" ? "primary" : "outline-primary"
                  } btn-block`}
                  onClick={() => setPage("product")}
                  style={styles.button}
                >
                  Product
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button
                  className={`btn btn-${
                    page === "coupon" ? "primary" : "outline-primary"
                  } btn-block`}
                  onClick={() => setPage("coupon")}
                  style={styles.button}
                >
                  Coupon
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button
                  className={`btn btn-${
                    page === "slider" ? "primary" : "outline-primary"
                  } btn-block`}
                  onClick={() => setPage("slider")}
                  style={styles.button}
                >
                  Slider
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button
                  className={`btn btn-${
                    page === "message" ? "primary" : "outline-primary"
                  } btn-block`}
                  onClick={() => setPage("message")}
                  style={styles.button}
                >
                  Message
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button
                  className={`btn btn-${
                    page === "order" ? "primary" : "outline-primary"
                  } btn-block`}
                  onClick={() => setPage("order")}
                  style={styles.button}
                >
                  Order
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div style={styles.mainContent}>{renderPageContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
