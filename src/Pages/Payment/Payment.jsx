import KhaltiCheckout from "khalti-checkout-web";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrderApi, getCartItems } from "../../apis/Api";
import myKey from "../../components/Khalti/KhaltiKey";
import axios from "axios";

const Payment = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    number: "",
    address: "",
    landmark: "",
    district: "Choose",
    country: "Nepal",
    paymentMethod: "",
    userId: user._id,
  });

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await getCartItems();
        console.log("Cart Items Response:", res.data);
        setCartItems(res.data);
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const orderData = {
        ...formData,
        cartItems: cartItems.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.productId.productPrice,
        })),
        totalPrice: cartItems.reduce((total, item) => {
          return total + item.productId.productPrice * item.quantity;
        }, 0),
        userId: user.id,
      };

      console.log("Order Data to be Sent:", orderData);

      await createOrderApi(orderData).then((res) => {
        if (res.status === 201) {
          toast.success("Order placed successfully");
          navigate("/thankyou");
        }
      });
    } catch (error) {
      toast.error("Failed to place order");
      console.error("Error placing order", error);
    }
  };

  const selectPaymentMethod = (method) => {
    setFormData({ ...formData, paymentMethod: method });
  };

  const openGoogleMaps = () => {
    window.open(
      "https://www.google.com/maps/@27.7172446,85.3239595,15z?entry=ttu",
      "_blank"
    );
  };

  const grandTotal = cartItems.reduce(
    (total, item) => total + item.productId.productPrice * item.quantity,
    0
  );

  let config = {
    publicKey: myKey.publicTestKey,
    productIdentity: "1234567890",
    productName: "Furniture Fusion",
    productUrl: "http://localhost:3000",
    eventHandler: {
      onSuccess(payload) {
        console.log('payload', payload);
        let data = {
          token: payload.token,
          amount: payload.amount,
        };
  
        let config = {
          headers: { Authorization: myKey.secretKey },
        };
  
        axios
          .post("http://localhost:5000/api/payment/verify-payment", data, config)
          .then((response) => {
            handleSubmit(); // Call the handleSubmit function when payment is successfule
          })
          .catch((error) => {
            console.log(error);
          });
      },
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  const handleKhaltiPayment = () => {
    
    // show payment form if payment is successful, 
    const checkout = new KhaltiCheckout(config);
    checkout.show({ amount: grandTotal * 100 });
    

  

  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{ ...styles.heading, backgroundColor: "#007bff" }}>
          Payment Details
        </h2>
        <button style={styles.backButton} onClick={() => navigate("/cart")}>
          ← Back
        </button>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formSection}>
          <div style={styles.formGroup}>
            <label style={styles.label}>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Number</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Address</label>
            <div style={{ display: "flex" }}>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                style={styles.input}
              />
              <button
                type="button"
                onClick={openGoogleMaps}
                style={styles.smallMapButton}
              >
                Choose on Map
              </button>
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Landmark</label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>District</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="Choose" disabled>
                Choose
              </option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="Lalitpur">Lalitpur</option>
              <option value="Bhaktapur">Bhaktapur</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              readOnly
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Available Payment Methods</label>
            <div style={styles.paymentMethods}>
              <button
                type="button"
                onClick={() => selectPaymentMethod("Cash on Delivery")}
                style={{
                  ...styles.paymentButton,
                  backgroundColor:
                    formData.paymentMethod === "Cash on Delivery"
                      ? "#FF69B4"
                      : "#4CAF50",
                }}
              >
                Cash on Delivery
              </button>
              <button
                type="button"
                onClick={() => selectPaymentMethod("Khalti")}
                style={{
                  ...styles.paymentButton,
                  backgroundColor:
                    formData.paymentMethod === "Khalti" ? "#FF69B4" : "#4CAF50",
                }}
              >
                Khalti
              </button>
            </div>
          </div>
        </div>
        <div style={styles.orderSummary}>
          <h3 style={{ ...styles.orderHeading, backgroundColor: "#007bff" }}>
            Your Order:
          </h3>
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div key={item._id} style={styles.orderItem}>
                  <p>{item.productId.productName}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>
                    Total: $
                    {(item.productId.productPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <p style={styles.total}>Grand Total: ${grandTotal.toFixed(2)}</p>
            </>
          ) : (
            <p>No items in the cart</p>
          )}
          <div style={styles.terms}>
            <input type="checkbox" required />
            <label>
              I agree to{" "}
              <a href="#terms" style={styles.termsLink}>
                Terms of Service
              </a>
            </label>
          </div>
          <button
            type="submit"
            style={{ ...styles.submitButton, backgroundColor: "#4CAF50" }}
            onClick={(e) => {
              e.preventDefault();
              if (formData.paymentMethod === "Khalti") {
                handleKhaltiPayment();
              } else {
                handleSubmit(e);
              }
            }}
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "4px",
  },
  backButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formSection: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  formGroup: {
    flexBasis: "48%",
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  smallMapButton: {
    marginLeft: "10px",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  paymentMethods: {
    display: "flex",
    justifyContent: "space-between",
  },
  paymentButton: {
    flex: "1",
    padding: "10px",
    margin: "5px",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  orderSummary: {
    borderTop: "1px solid #ddd",
    paddingTop: "20px",
  },
  orderHeading: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "4px",
  },
  orderItem: {
    marginBottom: "10px",
  },
  total: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  terms: {
    display: "flex",
    alignItems: "center",
    marginTop: "20px",
  },
  termsLink: {
    color: "#007bff",
    textDecoration: "none",
  },
  submitButton: {
    padding: "10px",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    marginTop: "20px",
  },
};

export default Payment;
