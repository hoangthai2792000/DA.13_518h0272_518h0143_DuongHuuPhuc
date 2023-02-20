import React, { useEffect, useState } from "react";
// import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
// import logo from "../assets/logo.jpg";
import { AiOutlineLogin } from "react-icons/ai";
import { HiUserPlus } from "react-icons/hi2";
import CartButton from "./CartButton";
import axios from "axios";
import styled from "styled-components";
import { useGlobalContext } from '../context';
import { FaShoppingCart, FaUser, FaUserMinus, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  const [role, setRole] = useState("");
  const history = useHistory();
  const { user, logoutUser } = useGlobalContext();
  // if(!user) return null;
  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <h5>TC Sneaker</h5>
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              style={{ textDecoration: "none", color: "black" }}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "black" }}
            >
              Products
            </Link>
          </li>
          {user && user.role === "admin" ? (
            <>
              <li>
                <Link
                  to="/products-management"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Product Management
                </Link>
              </li>
              <li>
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
        <div className="cart-btn-wrapper">
          {!user ? (
            <>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <button className="auth-btn">
                Login <FaUser/>
              </button>
            </Link>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "black" }}
            >
              <button className="auth-btn">
                Register <FaUserPlus/>
              </button>
            </Link>
          </>
          ) : ( 
          <>
            <Link to="/cart" className="cart-btn">
              Cart 
              <span className="cart-container"> 
                <FaShoppingCart/>
              </span>
            </Link>
              <button className="auth-btn" onClick={() => {
                logoutUser()
                history.push('/dashboard');
              }}>
                Logout<FaUserMinus/>
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
    h5{
      font-size: 24px;
    }
  }
  /* .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  } */
  .nav-links {
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
  .cart-btn-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    width: 225px;
  }
  @media (min-width: 992px) {
    /* .nav-toggle {
      display: none;
    } */
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
    }
  }
`
export default Navbar;
