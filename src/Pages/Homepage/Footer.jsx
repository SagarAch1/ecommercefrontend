import React from "react";
import { FaFacebook, FaTwitter, FaGoogle, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4">
      <div className="container text-center text-md-left">
        <div className="row text-center text-md-left mt-3 pb-3">
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Furniture Fuson</h6>
            <p>
              We are here to  help you to buy and sell goods and services.
            </p>
          </div>
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Facilities</h6>
            <p>
              <a href="#!" className="text-white" style={{ textDecoration: "none" }}>
                Good Price
              </a>
            </p>
            <p>
              <a href="#!" className="text-white" style={{ textDecoration: "none" }}>
                Free Delivery
              </a>
            </p>
            <p>
              <a href="#!" className="text-white" style={{ textDecoration: "none" }}>
                Customer Care
              </a>
            </p>
            <p>
              <a href="#!" className="text-white" style={{ textDecoration: "none" }}>
                24 Hour Available
              </a>
            </p>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Categories</h6>
            <p>
              <a href="#!" className="text-white" style={{ textDecoration: "none" }}>
                Used Furniture
              </a>
            </p>
            <p>
              <a href="#!" className="text-white" style={{ textDecoration: "none" }}>
                New Furniture
              </a>
            </p>
            <p>
              <a href="#!" className="text-white" style={{ textDecoration: "none" }}>
                Shipping Rates
              </a>
            </p>
            <p>
              <a href="#!" className="text-white" style={{ textDecoration: "none" }}>
                Help
              </a>
            </p>
          </div>
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
            <p>
              <i className="fas fa-home mr-3"></i> Tarkeshwor, Np, Kathmandu
            </p>
            <p>
              <i className="fas fa-envelope mr-3"></i> infoo@furniturefusion.com
            </p>
            <p>
              <i className="fas fa-phone mr-3"></i> + 977777777
            </p>
            <p>
              <i className="fas fa-print mr-3"></i> + 984000000
            </p>
          </div>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-left">
              © 2024 Copyright:
              <a href="https://furniturefusion.com/" className="text-white" style={{ textDecoration: "none" }}>
                Furniturefusion.com
              </a>
            </p>
          </div>
          <div className="col-md-5 col-lg-4 ml-lg-0">
            <div className="text-center text-md-right">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a className="btn-floating btn-sm text-white" href="#!">
                    <FaFacebook />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn-floating btn-sm text-white" href="#!">
                    <FaTwitter />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn-floating btn-sm text-white" href="#!">
                    <FaGoogle />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn-floating btn-sm text-white" href="#!">
                    <FaLinkedin />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn-floating btn-sm text-white" href="#!">
                    <FaInstagram />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
