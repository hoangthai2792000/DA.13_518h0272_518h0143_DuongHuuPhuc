import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { FaBars } from "react-icons/fa";
import CartButton from "./CartButton";
import axios from "axios";

const Navbar = () => {
  const [role, setRole] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/user/showMe")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setRole(localStorage.getItem("role"));
  }, []);
  return (

    <>
      <section className="navbar-container">
        <div style={{ textAlign: "center" }}>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <h5>TC Sneaker</h5>
          </Link>
        </div>
        <div className="bao">
          <ul className="p-2">
            <li className="p-2 bao1">
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </Link>
            </li>
            <li className="p-2 bao1">
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "black" }}
              >
                About
              </Link>
            </li>
            <li className="p-2 bao1">
              <Link
                to="/products"
                style={{ textDecoration: "none", color: "black" }}
              >
                Products
              </Link>
            </li>
            {role === "admin" ? (
              <>
                <li className="p-2 bao1">
                  <Link
                    to="/products-management"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Product Management
                  </Link>
                </li>
                <li className="p-2 bao1">
                  <Link
                    to="/reviews-management"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Reviews Management
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
        </div>

        <div className="d-flex logsign">
          {/* {!role ? (
            <> */}
          <div className="p-2">
            <Link
              to="/account/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <button className="d-flex justify-content-center align-items-center p-2 btn-login">
                <ion-icon name="log-in-outline"></ion-icon> Login
              </button>
            </Link>
          </div>
          <div className="p-2">
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "black" }}
            >
              <button className="d-flex justify-content-center align-items-center p-2 btn-login">
                <ion-icon name="log-in-outline"></ion-icon> Signup
              </button>
            </Link>
          </div>
          {/* </>
          ) : ( 
          <>*/}
          <div className="p-2">
            <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
              <button className="d-flex justify-content-center align-items-center p-2 btn-login">
                <ion-icon name="log-in-outline"></ion-icon> Cart
              </button>
            </Link>
          </div>
          <div className="p-2">
            <Link
              to="/logout"
              style={{ textDecoration: "none", color: "black" }}
            >
              <button className="d-flex justify-content-center align-items-center p-2 btn-login">
                <ion-icon name="log-in-outline"></ion-icon> Logout
              </button>
            </Link>
          </div>
          {/* </>
           )} */}
        </div>
      </section>
    </>
  );
};
export default Navbar;
