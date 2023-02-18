import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../context";
import Star from "../components/Star";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState();
  const [quantity, setQuantity] = useState();
  const [reviews, setReviews] = useState([]);
  const [userRw, setUserRw] = useState("");

  const [gradeIndex, setGradeIndex] = useState();
  const GRADES = ["Poor", "Fair", "Good", "Very good", "Excellent"];
  const activeStar = {
    fill: "yellow",
  };

  const changeGradeIndex = (index) => {
    setGradeIndex(parseInt(index) + 1);
  };
  console.log(gradeIndex);

  const url = `http://localhost:5000/api/v1/product/${id}`;
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setProductData(response.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);

  console.log(productData);
  const handleIncQuantity = () => {
    console.log("hello");
    setQuantity(quantity + 1);
  };
  const handleDecQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity + 1);
    }
    setQuantity(quantity - 1);
  };
  console.log(quantity);

  const handleAddtoCart = (e) => {
    e.preventDefault();
    console.log(productData);
    console.log(quantity);
  };

  useEffect(() => {
    // const url = `http://localhost:5000/api/v1/review/${id}`;

    const url = `http://localhost:5000/api/v1/review/products/${id}`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.reviews);
        setReviews(response.data.reviews);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (!reviews) return null;

  const { user } = useGlobalContext();

  const handleSendRw = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:5000/api/v1/review",
        {
          product: productData._id,
          user: user.userId,
          comment: userRw,
          rating: gradeIndex,
        }
        // {
        //   withCredentials: true,
        // }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (!productData) return null;
  console.log(productData._id);

  return (
    <>
      <div>
        {productData.image.map((m) => (
          <img src={m} alt="product-img" />
        ))}
      </div>
      <div class="card">
        <div class="card-header">{productData.name}</div>
        <div class="card-body">
          <p>Brand: {productData.brand}</p>
          <p>price: {productData.price}</p>
          <p>
            <span className="me-2">{productData.averageRating}</span>
            <span id="stars">
              <StarRatings
                rating={productData.averageRating}
                starRatedColor="blue"
                numberOfStars={5}
                name="rating"
              />
            </span>
          </p>
          <p>
            <span className="me-2">{productData.numberOfReviews}</span>
            <span>Reviews</span>
          </p>
        </div>
        <div class="card-footer">
          <form onSubmit={handleAddtoCart}>
            <span>
              <FontAwesomeIcon icon={faCaretUp} onClick={handleIncQuantity} />
            </span>
            <span>
              <input
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
            </span>
            <span>
              {quantity > 0 ? (
                <button>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    onClick={handleDecQuantity}
                  />
                </button>
              ) : (
                <button disabled>
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              )}
            </span>
            <div>
              <button className="btn btn-primary" type="submit">
                Add to cart
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>Please...</h1>
          <form onSubmit={handleSendRw}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingReview"
                onChange={(e) => setUserRw(e.target.value)}
              />
              <label for="floatingReview">Your review</label>
            </div>
            <div className="star-rating-container">
              <h1 className="star-rating-result">
                {GRADES[gradeIndex - 1]
                  ? GRADES[gradeIndex - 1]
                  : "You didn't review yet"}
              </h1>
              <div className="star-rating">
                {GRADES.map((value, index) => (
                  <Star
                    index={index}
                    key={value}
                    changeGradeIndex={changeGradeIndex}
                    style={gradeIndex > parseInt(index) ? activeStar : {}}
                  />
                ))}
              </div>
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
        <div style={{ margin: "100px 400px" }}>
          <h1>Reviews</h1>
          <div>
            {reviews.map((val) => (
              <>
                <p>From: {val.user.name}</p>
                <p>Comment: {val.comment}</p>
                <StarRatings
                  rating={val.rating}
                  starRatedColor="black"
                  numberOfStars={5}
                  name="rating"
                />
                {/* // <p>{val.createAt}</p> */}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
