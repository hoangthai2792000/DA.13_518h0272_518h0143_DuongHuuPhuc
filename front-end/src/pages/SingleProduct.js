import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import './SingleProduct.css'

const SingleProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState();
  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/product/${id}`)
      .then((response) => {
        setProductData(response.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!productData) return null;

  return (
    <>
      <section className="centerdetail-page">
        <Link to='/products' className='btn'>
          back to products
        </Link>
        <div>
          <img src={productData.image[0]} className='productdetail-image' alt="product-img" />
          <img src={productData.image[1]} className='productdetail-image' alt="product-img" />
          <img src={productData.image[2]} className='productdetail-image' alt="product-img" />
          <img src={productData.image[3]} className='productdetail-image' alt="product-img" />
          <img src={productData.image[4]} className='productdetail-image' alt="product-img" />
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
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
