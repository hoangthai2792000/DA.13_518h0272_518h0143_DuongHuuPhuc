import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token, email } = useParams();
  const navigate = useNavigate();
  const url = `http://localhost:5000/api/v1/auth/verify-email`;
  useEffect(() => {
    axios
      .post(url, {
        verificationToken: token,
        email: email,
      })
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <>
      <h1>VerifyEmail</h1>
    </>
  );
};

export default VerifyEmail;
