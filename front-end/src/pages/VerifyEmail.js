import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { useHistory, useNavigate, useNavigation, useParams } from "react-router-dom";
const VerifyEmail = () => {
  const { token, email } = useParams();
  const history = useHistory();
  const url = `http://localhost:5000/api/v1/auth/verify-email`;

  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    axios
      .post(url, {
        verificationToken: token,
        email: email,
      })
      .then((response) => {
        setIsSuccess(true);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <>
      {isSuccess ? (
        <>
          <h1>Verify Email success</h1>
          <button onClick={() => history.push("/login")}>Login</button>
        </>
      ) : (
        <h1>Verify Email fail</h1>
      )}
    </>
  );
};

export default VerifyEmail;
