import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Forgot.css";
function Forgot() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    // console.log(email, pwd);
    navigate("/account/login");
  };
  return (
    <>
      <>
        <section className="login-page">
          <form
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
                <button type="submit" className="btn-forgot">
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
          </form>
        </section>
      </>
    </>
  );
}

export default Forgot;
