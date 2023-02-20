import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../context";
import Star from "../components/Star"; 
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PageHero from "../components/PageHero";

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
    <Wrapper>
      <PageHero title={productData.name} product />
      <section className="section section-center page">
        <Link to='/products' className='btn'>
          back to products
        </Link>
        <div class="product-center">
          <div className="box">
            <Carousel useKeyboardArrows={true}>
              {productData.image.map((m) => (
                <div className="slide"> 
                  <img src={m} alt="product-img" /> 
                </div>
            ))}   
            </Carousel>   
          </div>
          <section className="content">
            <h2>{productData.name}</h2>
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
            <p className="info"><span>Brand: </span>{productData.brand}</p>
            <h5 className="info"><span>Price: </span>{productData.price}</h5>
            <p className="info">
              <span className="me-2">Total Reviews: </span> {productData.numberOfReviews}
            </p>
            <hr/>
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
          </section>
        </div>
        <div className="card-footer">
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
          </div>
          <div className="review-post">
              <h1>Reviews</h1>
              <div>
                {reviews.map((val) => (
                  <>
                    <p>
                      From: 
                      {val.user && val.user.name ? val.user.name: "unknow"}
                    </p>
                    <p>Comment: {val.comment}</p>
                    <StarRatings
                      rating={val.rating}
                      starRatedColor="black"
                      numberOfStars={5}
                      name="rating"
                    />
                    <hr/>
                  </>
                ))}
              </div>
            </div>
      </section>
      
    </Wrapper>
  );
};
const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }

  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }
  .review-post{
    margin: 50px;
    text-align: justify;
    padding: 8px;
    h1{
      text-align: center;
    }
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`
export default ProductDetail;
