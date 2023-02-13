import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
function Signup() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [re_pwd, setRePwd] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "http://localhost:5000/api/v1/auth/register";
    axios
      .post(url, {
        name: fullname,
        email: email,
        password: pwd,
        phoneNumber: phoneNumber,
        address: "bla bla",
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
        {/* <form
          className="form-container d-flex justify-content-center
         align-items-center"
          onSubmit={handleSubmit}
        >
          <h4 style={{ fontWeight: "bold" }}>Quên Mật Khẩu</h4>
          <div
            style={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "5px",
              width: "30%",
              marginTop: "20px",
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
                placeholder={"Nhap email"}
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="mt-2 d-flex justify-content-center">
              <button type="submit" className="btn-login1">
                Lấy lại mật khẩu
              </button>
            </div>
            <p className="small mb-2 mt-2 pb-lg-2">
              <Link
                style={{ textDecoration: "none" }}
                className="text-black-50"
                to="/account/login"
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
                Đăng nhập
              </Link>
            </p>
          </div>
        </form> */}
        <form
          className="form-container d-flex justify-content-center
         align-items-center"
          onSubmit={handleSubmit}
        >
          <h4 style={{ fontWeight: "bold", marginTop: "-10px" }}>Sign Up</h4>
          <div
            style={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "5px",
              width: "30%",
            }}
          >
            <div className="form-group">
              <label htmlFor="fullname" className="form-lable">
                Name
              </label>
              <input
                type="text"
                id="fullname"
                value={fullname}
                placeholder={"Your Full Name"}
                className="form-control"
                onChange={(e) => setFullname(e.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="form-lable">
                Phone
              </label>
              <input
                type="number"
                id="phone"
                value={phoneNumber}
                placeholder={"Phone Number"}
                className="form-control"
                onChange={(e) => setPhoneNumber(e.target.value)}
              ></input>
            </div>
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
            <div className="form-group">
              <label htmlFor="re_pwd" className="form-lable">
                Reenter password
              </label>
              <input
                type="password"
                id="re_pwd"
                value={re_pwd}
                placeholder={"Repeat Password"}
                className="form-control"
                onChange={(e) => setRePwd(e.target.value)}
              ></input>
            </div>
            <div className="mt-2 d-flex justify-content-center">
              <button type="submit" className="btn-signup">
                Sign Up
              </button>
            </div>
            <p className="small mb-2 mt-2 pb-lg-2">
              <Link
                style={{ textDecoration: "none" }}
                className="text-black-50"
                to="/account/login"
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
                Log In
              </Link>
            </p>
          </div>
        </form>
      </section>
    </>
  );
}

export default Signup;
