import React, { useState } from "react";
import { toast } from "react-toastify";
import { forgotPasswordApi, verifyOtp } from "../../apis/Api";

const ForgotPassword = () => {
  const [phone, setPhone] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSendOtp = (e) => {
    e.preventDefault();
    forgotPasswordApi({ phone })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setIsSent(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || 500) {
          toast.error(error.response.data.message);
        }
      });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const data = {
      phone: phone,
      otp: otp,
      newpassword: newPassword,
    };

    verifyOtp(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || 500) {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="container mt-5" style={styles.container}>
        <h3 style={styles.heading}>Forgot Password</h3>
        <p>
          Oops, you forgot your password. We are here to recover your password.
          Please enter your phone number to receive an OTP and reset your
          password.
        </p>
        <form className="w-25">
          <span className="d-flex">
            <h4 style={styles.countryCode}>+977</h4>
            <input
              disabled={isSent}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              className="form-control"
              style={styles.input}
            />
          </span>
          <button
            disabled={isSent}
            onClick={handleSendOtp}
            className="btn"
            style={{ ...styles.button, ...styles.sendButton }}
          >
            Send Otp
          </button>
          {isSent && (
            <>
              <hr />
              <p> OTP has been sent to {phone}☑️</p>
              <input
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter Valid OTP code!"
                type="number"
                className="form-control"
                style={styles.input}
              />
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                type="text"
                className="form-control mt-2"
                placeholder="Set New Password"
                style={styles.input}
              />
              <button
                onClick={handleVerifyOtp}
                className="btn"
                style={{ ...styles.button, ...styles.verifyButton }}
              >
                Verify OTP & Set Password
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

const styles = {
  container: {
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    padding: "20px",
    borderRadius: "10px",
    color: "white",
    marginTop: "60px", // Adjust this value based on your navbar height
  },
  heading: {
    textAlign: "center",
  },
  countryCode: {
    marginRight: "10px",
  },
  input: {
    borderRadius: "5px",
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
  sendButton: {
    backgroundColor: "#007bff",
    color: "white",
  },
  verifyButton: {
    backgroundColor: "#28a745",
    color: "white",
  },
};

export default ForgotPassword;
