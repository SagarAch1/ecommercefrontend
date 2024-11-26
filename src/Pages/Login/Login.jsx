import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate(); // Use navigate for redirection

  const validate = () => {
    let isValid = true;

    setEmailError("");
    setPasswordError("");

    if (email.trim() === "" || !email.includes("@")) {
      setEmailError("Email is empty or invalid");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Please enter password");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    try {
      const res = await loginUserApi(data);
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);

        localStorage.setItem("token", res.data.token);
        const convertedData = JSON.stringify(res.data.user);
        localStorage.setItem("user", convertedData);

        if (res.data.user.isadmin) {
          navigate("/admin/dashboard");
        } else {
          navigate("/homepage");
        }
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Login failed. Please try again."
        );
      } else if (error.request) {
        toast.error("No response from the server. Please try again.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Login to Furniture Fusion</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email Address
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.formControl}
              placeholder="email"
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
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.formControl}
              required
            />
            {passwordError && <p style={styles.errorText}>{passwordError}</p>}
          </div>
          <button type="submit" style={styles.submitButton}>
            Login
          </button>
        </form>
        <div style={styles.additionalLinks}>
          <Link to="/forgot-password" style={styles.link}>
            Forget password?
          </Link>
        </div>
        <div style={styles.additionalLinks}>
          <span style={styles.additionalText}>Don't have an account? </span>
          <Link to="/Register" style={styles.link}>
            Register
          </Link>
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
  additionalLinks: {
    marginTop: "0.5rem",
    textAlign: "right",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "0.875rem",
  },
  additionalText: {
    fontWeight: "bold",
  },
};

export default Login;
