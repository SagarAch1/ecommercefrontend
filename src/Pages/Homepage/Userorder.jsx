import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { getSingleOrderApi } from "../../apis/Api";

const Userorder = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [startDate, setStartDate] = useState(new Date(2020, 6, 31));
  const [endDate, setEndDate] = useState(new Date(2020, 7, 3));

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    getSingleOrderApi(user.id)
      .then((response) => {
        if (response.status === 200) {
          const fetchedOrders = response.data.data.map((order) => ({
            orderId: order.orderId,
            firstName: order.firstName,
            lastName: order.lastName,
            address: order.address,
            number: order.number,
            cartItems: order.cartItems.map((item) => ({
              productId: item.productId._id,
              productName: item.productId.productName,
              productCategory: item.productId.productCategory,
              productImage: item.productId.productImage,
              productPrice: item.productId.productPrice,
              imageUrl: item.productId.imageUrl,
              price: item.productId.price,
              quantity: item.quantity,
            })),
            createdAt: new Date(order.createdAt).toLocaleDateString(),
            status: order.status || "Pending",
            totalPrice: order.totalPrice,
          }));
          setOrders(fetchedOrders);
          setFilteredOrders(fetchedOrders);
        } else {
          toast.error("Failed to fetch orders");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while fetching orders");
      });
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    applyFilters(orders, newFilter, startDate, endDate);
  };

  const handleSearch = () => {
    applyFilters(orders, filter, startDate, endDate);
  };

  const applyFilters = (orders, filter, startDate, endDate) => {
    const newFilteredOrders = orders.filter((order) => {
      const isInDateRange =
        new Date(order.createdAt) >= startDate &&
        new Date(order.createdAt) <= endDate;
      const isInStatusFilter =
        filter === "All" ||
        (order.status && order.status.toLowerCase() === filter.toLowerCase());
      return isInDateRange && isInStatusFilter;
    });
    setFilteredOrders(newFilteredOrders);
  };

  const handleGetBack = () => {
    window.location.reload(); // Example of refreshing the page; you may have a better way to handle this in your app
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Orders</h2>
      <div style={styles.nav}>
        <div style={styles.navItem} onClick={() => handleFilterChange("All")}>
          All orders
        </div>
        <div
          style={styles.navItem}
          onClick={() => handleFilterChange("Shipping")}
        >
          Shipping
        </div>
        <div
          style={styles.navItem}
          onClick={() => handleFilterChange("Pending")}
        >
          Pending
        </div>
        <div
          style={styles.navItem}
          onClick={() => handleFilterChange("Completed")}
        >
          Completed
        </div>
        <div
          style={styles.navItem}
          onClick={() => handleFilterChange("Cancelled")}
        >
          Cancelled
        </div>
      </div>
      <div style={styles.filters}>
        <div style={styles.dateRange}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd MMM yyyy"
          />
          <span>To</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd MMM yyyy"
          />
        </div>
        <button style={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
        <button style={styles.getBackButton} onClick={handleGetBack}>
          Get Back
        </button>
      </div>
      {filteredOrders.map((order) => (
        <div style={styles.orderContainer} key={order.orderId}>
          <div style={styles.orderHeader}>
            <span>ORDER - {order.orderId}</span>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Product Name</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Product Price</th>
                <th style={styles.th}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((item) => (
                <tr key={item.productId}>
                  <td style={styles.td}>
                    <img
                      src={`http://localhost:5000/products/${item.productImage}`}
                      alt={item.productName}
                      style={styles.image}
                    />
                  </td>
                  <td style={styles.td}>{item.productName}</td>
                  <td style={styles.td}>{item.productCategory}</td>
                  <td style={styles.td}>{item.productPrice}</td>
                  <td style={styles.td}>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.orderFooter}>
            <div>
              Order by: {order.firstName} {order.lastName}
            </div>
            <div>Number: {order.number}</div>
            <div>Order Date: {order.createdAt}</div>
            <div>Shipping info: {order.address}</div>
            <div>Total Price: {order.totalPrice}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f4f8",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  nav: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  navItem: {
    cursor: "pointer",
    padding: "10px 20px",
    borderBottom: "2px solid transparent",
    color: "#007BFF",
  },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  dateRange: {
    display: "flex",
    justifyContent: "space-between",
    width: "300px",
  },
  searchButton: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  getBackButton: {
    padding: "10px 20px",
    backgroundColor: "#DC3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  orderContainer: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  th: {
    borderBottom: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
  },
  td: {
    borderBottom: "1px solid #ddd",
    padding: "10px",
  },
  image: {
    width: "50px",
    height: "50px",
  },
  orderFooter: {
    display: "flex",
    justifyContent: "space-between",
  },
};

export default Userorder;
