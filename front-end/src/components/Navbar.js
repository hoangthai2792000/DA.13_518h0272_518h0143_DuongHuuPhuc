import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
// import logo from "../assets/logo.jpg";
import { FaBars } from "react-icons/fa";
import CartButton from "./CartButton";
import axios from "axios";
import { useGlobalContext } from '../context';

const Navbar = () => {
  const [role, setRole] = useState("");
  const history = useHistory();
  const { user, logoutUser } = useGlobalContext();
  // if(!user) return null;
  return (
    <>
      <section className="navbar-container">
        <div style={{ textAlign: "center" }}>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <h5>TC Sneaker</h5>
          </Link>
        </div>
        <div className="header-page">
          <ul className="p-2">
            <li className="p-2 header-id">
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </Link>
            </li>
            <li className="p-2 header-id">
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "black" }}
              >
                About
              </Link>
            </li>
            <li className="p-2 header-id">
              <Link
                to="/products"
                style={{ textDecoration: "none", color: "black" }}
              >
                Products
              </Link>
            </li>
            {user && user.role === "admin" ? (
              <>
                <li className="p-2 header-id">
                  <Link
                    to="/products-management"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Product Management
                  </Link>
                </li>
                <li className="p-2 header-id">
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
          {!user ? (
            <>
          <div className="p-2">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <button className="d-flex justify-content-center align-items-center p-2 btn-login">
                <ion-icon name="log-in-outline"></ion-icon> Login
              </button>
            </Link>
          </div>
          <div className="p-2">
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "black" }}
            >
              <button className="d-flex justify-content-center align-items-center p-2 btn-login">
                <ion-icon name="log-in-outline"></ion-icon> Register
              </button>
            </Link>
          </div>
          </>
          ) : ( 
          <>
          <div className="p-2">
            <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
              <button className="d-flex justify-content-center align-items-center p-2 btn-login">
                <ion-icon name="log-in-outline"></ion-icon> Cart
              </button>
            </Link>
          </div>
          <div className="p-2">
            {/* <Link
              to="/logout"
              style={{ textDecoration: "none", color: "black" }}
            > */}
              <button className="d-flex justify-content-center align-items-center p-2 btn-login" onClick={() => {
                logoutUser()
                history.push('/dashboard');
              }}>
                <ion-icon name="log-in-outline"></ion-icon> Logout
              </button>
            {/* </Link> */}
          </div>
          </>
           )}
        </div>
      </section>
    </>
  );
};
// const NavContainer = styled.nav`
//   height: 2rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: fixed;
//   z-index: 2;
//   top: 0;
//   left: 0;
//   right: 0;
//   .nav-center {
//     width: 100vw;
//     margin: auto;
//     margin-width: var(--max-width);
//   }
//   .nav-header {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     img {
//       width: 175px;
//       margin-width: -15px;
//     }
//   }
//   .nav-toggle {
//     background: transparent;
//     border: transparent;
//     color: var(--clr-primary-5);
//     cursor: pointer;
//     svg {
//       front-size: 2rem;
//     }
//   }
//   .nav-links {
//     display: none;
//     list-style-type: none;
//   }
//   .cart-btn-wrapper {
//     display: none;
//   }
//   @media (min-width: 992px) {
//     .nav-toggle {
//       display: none;
//     }
//     .nav-center {
//       display: grid;
//       grid-template-columns: auto 1fr auto;
//       align-items: center;
//     }
//     .nav-links {
//       display: flex;
//       justify-content: center;
//       li {
//         margin: 0 0.5rem;
//       }
//       a {
//         color: var(--clr-grey-3);
//         font-size: 1rem;
//         text-transform: capitalize;
//         letter-spacing: var(--spacing);
//         padding: 0.5rem;
//         &:hover {
//           border-bottom: 2px solid var(--clr-primary-7);
//         }
//       }
//     }
//     .cart-btn-wrapper {
//       display: grid;
//     }
//   }
// `;
export default Navbar;
