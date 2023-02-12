import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductPage.css";
import { Link } from "react-router-dom";
const ProductPage = () => {
  const [Product, setProduct] = useState();
  const [imagePro, setImagePro] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/product")
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (!Product) return null;
  console.log(Product);

  const handleSearch = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        "http://localhost:8000/api/v1//api/v1/search-by-image",
        {
          image: imagePro,
        },
        config
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div>
        <form onSubmit={handleSearch}>
          <input type="file" onChange={(e) => setImagePro(e.target.value)} />
          <button type="subtmit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>
      <section className="productpage">
        <div className="product_banner">
          <h3 className="title_banner">Product</h3>
        </div>
        <div className="product_main">
          <div className="left_main">
            <form>
              <div className="form-control">
                <input
                  type="text"
                  name="text"
                  placeholder="Search"
                  className="search-input"
                  value
                />
              </div>

              <div className="form-control">
                <h5>Caterogy</h5>
                <div>
                  <button type="button" name="caterogy" className="null">
                    All
                  </button>
                  <button type="button" name="caterogy" className="null">
                    Nike
                  </button>
                  <button type="button" name="caterogy" className="null">
                    Adidas
                  </button>
                  <button type="button" name="caterogy" className="null">
                    Converse
                  </button>
                  <button type="button" name="caterogy" className="null">
                    Vans
                  </button>
                </div>
              </div>

              <div className="form-control">
                <h5>Price</h5>
                <p className="price">50,000,000</p>
                <input
                  type="range"
                  name="price"
                  min="0"
                  max="500000000"
                  value="20000000"
                />
              </div>
            </form>
            <button type="button" className="clear-btn">
              Clear filters
            </button>
          </div>
          <div className="right_main">
            {Product.products.map((pros) => (
              <Link to={`/products/${pros._id}`}>
                <div>
                  <img className="img" src={pros.image[0]} alt="product-img" />

                  <div className="d-flex intr">
                    <p>{pros.name}</p>
                    <p>{pros.price}</p>
                  </div>
                </div>
              </Link>
            ))}
            {/* <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Code</th>
                  <th scope="col">Price</th>
                  <th scope="col">Brand</th>
                </tr>
              </thead>
              <tbody> {Product.products.map((pros)=>(
                <tr>
                  <th scope="row">1</th>
                  <td><img src={pros.image[0]} alt="coin" /></td>
                  <td>{pros.name}</td>
                  <td>{pros.code}</td>
                  <td>{pros.price}</td>
                  <td>{pros.brand}</td>
                </tr>
              ))}
              </tbody>
            </table> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
