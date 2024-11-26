import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUserApi } from "../../apis/Api";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const handleFullName = (e) => {
    setFullName(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validate = () => {
    let isValid = true;

    setFullNameError("");
    setPhoneError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (fullName.trim() === "") {
      setFullNameError("Full name is required");
      isValid = false;
    }
    if (phone.trim() === "") {
      setPhoneError("Phone number is required");
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Phone number is invalid");
      isValid = false;
    }
    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    }

    if (confirmPassword.trim() !== password.trim()) {
      setConfirmPasswordError("Password and Confirm password do not match");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidated = validate();
    if (!isValidated) {
      return;
    }

    const data = {
      fullName: fullName,
      phone: phone,
      email: email,
      password: password,
    };

    registerUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        navigate("/Login"); // Navigate to login page after successful registration
      }
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="fullName" style={styles.label}>
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={handleFullName}
              style={styles.formControl}
              required
            />
            {fullNameError && <p style={styles.errorText}>{fullNameError}</p>}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="phone" style={styles.label}>
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={phone}
              onChange={handlePhone}
              style={styles.formControl}
              required
            />
            {phoneError && <p style={styles.errorText}>{phoneError}</p>}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={handleEmail}
              style={styles.formControl}
              required
            />
            {emailError && <p style={styles.errorText}>{emailError}</p>}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handlePassword}
              style={styles.formControl}
              required
            />
            {passwordError && <p style={styles.errorText}>{passwordError}</p>}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              style={styles.formControl}
              required
            />
            {confirmPasswordError && (
              <p style={styles.errorText}>{confirmPasswordError}</p>
            )}
          </div>
          <button type="submit" style={styles.submitButton}>
            Register
          </button>
        </form>
        <div style={styles.loginContainer}>
          <p style={styles.loginText}>
            Already have an account?{" "}
            <Link to="/Login" style={styles.loginLink}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
    fontFamily: "Arial, sans-serif",
  },
  formContainer: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    width: "100%",
  },
  heading: {
    color: "#333",
    textAlign: "center",
    marginBottom: "1.5rem",
    fontWeight: "bold",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  formControl: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ced4da",
  },
  label: {
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
  errorText: {
    marginTop: "0.25rem",
    fontSize: "0.875rem",
    color: "red",
  },
  submitButton: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1.25rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  loginContainer: {
    marginTop: "1rem",
    textAlign: "center",
  },
  loginText: {
    fontSize: "1rem",
  },
  loginLink: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Register;
