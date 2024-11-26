import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const user = (() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  })();

  const customMarginStyle = {
    marginLeft: "1rem",
    marginRight: "1rem",
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Successfully logged out");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top"
      style={{ backgroundColor: "#343a40" }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="text-danger">Furniture Fusion</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item" style={customMarginStyle}>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item" style={customMarginStyle}>
              <Link className="nav-link" to="/shop">
                Shop
              </Link>
            </li>
            <li className="nav-item" style={customMarginStyle}>
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item" style={customMarginStyle}>
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item" style={customMarginStyle}>
              <Link className="nav-link" to="/support">
                Support
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <Link to="/search" className="nav-link">
              <i
                className="fa fa-search text-white"
                style={customMarginStyle}
              ></i>
            </Link>
            <Link to="/cart" className="nav-link">
              <i
                className="fas fa-shopping-basket text-white"
                style={customMarginStyle}
              ></i>
            </Link>
            <Link to="/wishlist" className="nav-link">
              <i
                className="fas fa-heart text-white"
                style={customMarginStyle}
              ></i>{" "}
            </Link>
            {user ? (
              <div className="dropdown me-3">
                <button
                  className="btn btn-secondary dropdown-toggle d-flex align-items-center"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user me-2"></i> Welcome, {user.firstName}!
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/contact">
                      Report
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/userorder">
                      My Order
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary me-2">
                  Login
                </Link>
                <Link to="/register" className="btn btn-success">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
