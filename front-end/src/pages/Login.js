import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "http://localhost:5000/api/v1/auth/login";
    axios
      .post(url, {
        email: email,
        password: pwd,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <section className="login-page">
        <form
          className="form-container d-flex justify-content-center
         align-items-center"
          onSubmit={handleSubmit}
        >
          <h4 style={{ fontWeight: "bold" }}>Log In</h4>
          <div
            style={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "5px",
              width: "30%",
              marginTop: "20px",
              boxShadow: "5px 5px 5px 5px #EBEBEB",
            }}
          >
            <div className="form-group">
              <label htmlFor="email" className="form-lable">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder={"Email"}
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="pwd" className="form-lable">
                Password
              </label>
              <input
                type="password"
                id="pwd"
                value={pwd}
                placeholder={"Password"}
                className="form-control"
                onChange={(e) => setPwd(e.target.value)}
              ></input>
            </div>
            <div className="mt-2 d-flex justify-content-center">
              <button type="submit" className="btn-login1 p-2">
                Login
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <p
                className="small mb-2 mt-2 pb-lg-2 me-2 d-flex justify-content-center
         align-items-center"
              >
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-black-50"
                  to="/forgot"
                >
                  Forgot password?
                </Link>
              </p>
              <p className="small mb-2 mt-2 pb-lg-2">
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-black-50"
                  to="/signup"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
