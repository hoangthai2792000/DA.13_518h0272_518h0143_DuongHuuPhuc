import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../context/context";
import Star from "../components/Star";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PageHero from "../components/PageHero";
import { Button, Card } from "react-bootstrap";

const ProductDetail = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState();
  const [reviews, setReviews] = useState([]);
  const [userRw, setUserRw] = useState("");
  const [selectedRw, setSelectedRw] = useState([]);
  const [newCmt, setNewCmt] = useState("");
  const { user, getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
    useGlobalContext();

  const quantity = getItemQuantity(id);

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

  useEffect(() => {
    const url = `http://localhost:5000/api/v1/review/product/${id}`;
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
  console.log(reviews);

  const handleSendRw = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/v1/review", {
        product: productData._id,
        user: user.userId,
        comment: userRw,
        rating: gradeIndex,
      })
      .then((response) => {
        window.location.reload(false);
        console.log(response);
        setGradeIndex(0);
        setUserRw("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (!productData) return null;
  console.log(productData._id);
  const handleEditRw = async (e) => {
    e.preventDefault();

    const url = `http://localhost:5000/api/v1/review/${selectedRw._id}`;
    console.log(newCmt);
    axios
      .patch(url, {
        comment: newCmt,
        rating: gradeIndex,
        user: user.userId,
      })
      .then((response) => {
        window.location.reload(false);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteRw = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/api/v1/review/${selectedRw._id}`;
    axios
      .delete(url)
      .then((response) => {
        window.location.reload(false);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Wrapper>
      <PageHero title={productData.name} product />
      <section className="section section-center page">
        <Link to="/products" className="btn">
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
              <span id="stars">
                <StarRatings
                  rating={productData.averageRating}
                  starRatedColor="blue"
                  numberOfStars={5}
                  name="rating"
                />
              </span>
            </p>
            <p className="info">
              <span>Brand: </span>
              {productData.brand}
            </p>
            <h5 className="info">
              <span>Price: </span>
              {productData.price}
            </h5>
            <p className="desc">{productData.description}</p>
            <p className="info">
              <span className="me-2">Total Reviews: </span>
              {productData.numberOfReviews}
            </p>
            <hr />
            <div className="mt-auto">
              {quantity === 0 && user ? (
                <Button
                  className="w-100"
                  onClick={() => increaseCartQuantity(id)}
                >
                  + Add To Cart
                </Button>
              ) : (
                <>
                  {user ? (
                    <div
                      className="d-flex align-items-center flex-column"
                      style={{ gap: ".5rem" }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ gap: ".5rem" }}
                      >
                        <Button onClick={() => decreaseCartQuantity(id)}>
                          -
                        </Button>
                        <div>
                          <span className="fs-3">{quantity}</span>
                        </div>
                        <Button onClick={() => increaseCartQuantity(id)}>
                          +
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button className="w-100">
                      <Link to="/login" className="text-muted fw-bold text ">
                        Login to..
                      </Link>
                    </Button>
                  )}
                </>
              )}
            </div>
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
                  <span className="ms-2">
                    {val.user && val.user.name ? val.user.name : "unknow"}
                  </span>
                </p>
                <p>Comment: {val.comment}</p>
                <StarRatings
                  rating={val.rating}
                  starRatedColor="black"
                  numberOfStars={5}
                  name="rating"
                />

                {val.user && user && user.userId === val.user._id ? (
                  <div className="mt-3">
                    <Button
                      className="me-3"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      onClick={() => setSelectedRw(val)}
                    >
                      Edit
                    </Button>
                    <Button
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => setSelectedRw(val)}
                    >
                      Delete
                    </Button>
                  </div>
                ) : null}
                <hr />
                {/* <!-- Edit Modal --> */}
                <div
                  className="modal fade"
                  id="editModal"
                  tabindex="-1"
                  aria-labelledby="editModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Edit your review
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <form onSubmit={handleEditRw}>
                        <div className="modal-body">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              onChange={(e) => setNewCmt(e.target.value)}
                            />
                            <label for="floatingInput">
                              Comment: {selectedRw.comment}
                            </label>
                          </div>
                          <div className="form-floating mb-3">
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
                                    style={
                                      gradeIndex > parseInt(index)
                                        ? activeStar
                                        : {}
                                    }
                                  />
                                ))}
                              </div>
                            </div>
                            <label for="floatingName">Rating</label>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* <!-- Delete Modal --> */}
                <div
                  className="modal fade"
                  id="deleteModal"
                  tabindex="-1"
                  aria-labelledby="deleteModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Delete your review
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <form onSubmit={handleDeleteRw}>
                        <div className="modal-body">
                          <p>Comment: {selectedRw.comment}</p>
                          <StarRatings
                            rating={selectedRw.rating}
                            starRatedColor="black"
                            numberOfStars={5}
                            name="rating"
                          />
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Delete
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
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
  .desc {
    line-height: 2;
    max-width: 45em;
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
  .review-post {
    margin: 50px;
    text-align: justify;
    padding: 8px;
    h1 {
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
`;
export default ProductDetail;
