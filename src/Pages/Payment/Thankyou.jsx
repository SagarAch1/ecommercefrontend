import React from "react";
import { useNavigate } from "react-router-dom";

const Thankyou = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#b3e5fc",
      textAlign: "center",
      padding: "20px",
    },
    image: {
      width: "300px", // Adjust the width as needed
      marginBottom: "20px",
    },
    title: {
      fontSize: "24px",
      color: "#333",
      marginBottom: "10px",
    },
    message: {
      fontSize: "16px",
      color: "#333",
      marginBottom: "30px",
    },
    button: {
      padding: "10px 20px",
      border: "1px solid #333",
      borderRadius: "5px",
      backgroundColor: "#fff",
      color: "#333",
      cursor: "pointer",
      textDecoration: "none",
    },
    footer: {
      marginTop: "30px",
    },
    socialIcons: {
      display: "flex",
      justifyContent: "center",
      marginTop: "10px",
    },
    icon: {
      fontSize: "24px",
      margin: "0 10px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <img src="https://media.istockphoto.com/vectors/text-thank-you-on-green-background-calligraphy-lettering-vector-vector-id649836350?k=6&m=649836350&s=612x612&w=0&h=iouGluvjKkVSq_2DFCKYGh6GMKgfYP0ZAHe-BT8PYDs=" alt="Thank you" style={styles.image} />
      <h1 style={styles.title}>Thank you</h1>
      <p style={styles.message}>
        Your Order has been received. We will be in touch and contact you
        soon.
      </p>
      <button style={styles.button} onClick={() => navigate("/")}>
        Back To Home
      </button>
      <div style={styles.footer}>
        <p>Follow us</p>
        <div style={styles.socialIcons}>
          <i className="fab fa-twitter" style={styles.icon}></i>
          <i className="fab fa-facebook-f" style={styles.icon}></i>
          <i className="fab fa-instagram" style={styles.icon}></i>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
