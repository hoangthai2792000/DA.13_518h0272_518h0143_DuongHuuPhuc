import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="d-flex footer">
      <h9 style={{ color: "white", fontWeight: "bold", marginRight: "5px" }}>
        &copy; {new Date().getFullYear()}
        <span
          style={{
            color: "#ab7a5f",
            letterSpacing: "1.5px",
            lineHeight: "20px",
            textAlign: "center",
            fontWeight: "bold",
            marginRight: "5px",
          }}
        >
          TC Sneaker
        </span>
      </h9>
      <h9 style={{ color: "white", fontWeight: "bold", marginRight: "5px" }}>
        All rights reserved
      </h9>
    </footer>
  );
};
export default Footer;
