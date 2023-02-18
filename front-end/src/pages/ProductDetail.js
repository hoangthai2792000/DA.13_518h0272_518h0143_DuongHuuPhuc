import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../context";

const ProductDetail = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState();
  const [quantity, setQuantity] = useState();
  const [reviews, setReviews] = useState([]);
  const [userRw, setUserRw] = useState("");

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

    const url = `http://localhost:5000/api/v1/review`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        // setReviews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (!reviews) return null;
  console.log(reviews);

  const { user } = useGlobalContext();
  console.log(user);

  const handleSendRw = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:5000/api/v1/review",
        {
          product: productData._id,
        },
        {
          withCredentials: true,
        }
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
        <div>
          <h1>Please...</h1>
          <form onSubmit={handleSendRw}>
            <input type="text" onChange={(e) => setUserRw(e.target.value)} />
            <button type="submit">Send</button>
          </form>
        </div>
        <h1>Reviews</h1>
        <div>
          <p>User:</p>
          <p></p>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
