import axios from "axios";
import React, { useEffect, useState } from "react";

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [userRw, setUserRw] = useState("");

  const url = "http://localhost:5000/api/v1/review";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (!reviews) return null;
  console.log(reviews);
  return (
    <>
      
    </>
  );
};

export default ReviewManagement;
