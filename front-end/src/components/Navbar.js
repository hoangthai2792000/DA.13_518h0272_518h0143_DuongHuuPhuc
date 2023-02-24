import React, { useEffect, useState } from "react";
// import "./Navbar.css";
import { NavLink, Link, useHistory } from "react-router-dom";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
// import logo from "../assets/logo.jpg";
import { AiOutlineLogin } from "react-icons/ai";
import { HiUserPlus } from "react-icons/hi2";
import CartButton from "./CartButton";
import axios from "axios";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import {
  FaBars,
  FaCogs,
  FaList,
  FaShoppingCart,
  FaTable,
  FaTimes,
  FaUser,
  FaUserMinus,
  FaUserPlus,
} from "react-icons/fa";

const Navbar = () => {
  const [role, setRole] = useState("");
  const history = useHistory();
  const { user, logoutUser, openCart, cartQuantity } = useGlobalContext();
  // if(!user) return null;
  const cartStorage = localStorage.getItem("cart");
  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/" style={{ textDecoration: "none", color: "black"}}>
            <h5>TC Sneaker</h5>
          </Link>
          <button type="button" className="nav-toggle">
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/" style={{ textDecoration: "none", color: "black", verticalAlign:"-7px" }}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              style={{ textDecoration: "none", color: "black", verticalAlign:"-7px"}}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "black", verticalAlign:"-7px"}}
            >
              Products
            </Link>
          </li>
          {user ? (
          <li>
            <Link
              to="/user-information"
              style={{ textDecoration: "none", color: "black", verticalAlign:"-7px"}}
            >
              Info
            </Link>
          </li>
          ) : null}
          {user && user.role === "admin" ? (
            <>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  
                >
                  Management
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      to="/users-management"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products-management"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/reviews-management"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Reviews
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/orders-management"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Orders
                    </Link>
                  </li>
                </ul>
              </li>
            </>
          ) : null}
        </ul>
        <div className="cart-btn-wrapper">
          {!user ? (
            <>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <button className="auth-btn">
                  Login <FaUser />
                </button>
              </Link>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                <button className="auth-btn">
                  Register <FaUserPlus />
                </button>
              </Link>
            </>
          ) : (
            <>
              <Button
                onClick={openCart}
                style={{
                  width: "2.7rem",
                  height: "2rem",
                  position: "relative",
                }}
                variant="outline-primary"
                className="rounded-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                >
                  <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                </svg>

                <div
                  className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                  style={{
                    color: "white",
                    width: "1.5rem",
                    height: "1.5rem",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    transform: "translate(25%, 25%)",
                  }}
                >
                  {cartQuantity}
                </div>
              </Button>

              <button
                className="auth-btn"
                onClick={() => {
                  logoutUser();
                  history.push("/dashboard");
                }}
              >
                Logout
                <FaUserMinus />
              </button>
            </>
          )}
        </div>
      </div>
    </NavContainer>
  );
};
const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h5 {
      font-size: 24px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;
    align-items: center;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
  }
`;
export default Navbar;
