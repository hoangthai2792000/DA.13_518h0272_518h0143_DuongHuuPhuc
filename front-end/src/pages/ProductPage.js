import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PageHero from "../components/PageHero";
import { FaSearch } from "react-icons/fa";
// import "./ProductPage.css";
import { useGlobalContext } from "../context/context";
import { StoreItem } from "../components/cart/StoreItem";
import { Col, Row } from "react-bootstrap";

const ProductPage = ({ _id, name, image }) => {
  const [Product, setProduct] = useState();
  const [imagePro, setImagePro] = useState();
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);
  const [show, setShow] = useState(true);
  const { increaseCartQuantity } = useGlobalContext();
  console.log(typeof cart);

  const handleChange = (item, d) => {
    let ind = 1;
    cart.forEach((data, index) => {
      if (data.id === item.id) {
        ind = index;
      }
    });
    const tempArr = cart;
    tempArr[ind].amount += d;
    if (tempArr[ind].amount === 0) {
      tempArr[ind].amount = 1;
    }
    setCart([...tempArr]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/product")
      .then((response) => {
        // console.log(response.data.products)
        setProduct(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", imagePro, imagePro.type);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:8000/api/v1/search-by-image", data, config)
      .then((response) => {
        setProduct(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function sortCategory(value) {
    if (category === "all" && price === 0) {
      return value;
    } else if (category === "all") {
      return value.price <= parseInt(price);
    }
    return value.brand === category && value.price <= parseInt(price);
  }

  if (!Product) return null;

  return (
    <main>
      <PageHero title="products" />
      <Wrapper className="page">
        <div className="section-center products">
          <div className="content">
            <form onSubmit={handleSearch}>
              <div className="form-control">
                {/* search input */}
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e) => setImagePro(e.target.files[0])}
                />
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </div>
              {/* end search input */}
            </form>
            <form>
              <div className="form-control">
                <h5>Caterogy</h5>
                <div>
                  <button
                    type="button"
                    name="caterogy"
                    className="null"
                    onClick={() => setCategory("all")}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    name="caterogy"
                    className="null"
                    onClick={() => setCategory("Nike")}
                  >
                    Nike
                  </button>
                  <button
                    type="button"
                    name="caterogy"
                    className="null"
                    onClick={() => setCategory("Adidas")}
                  >
                    Adidas
                  </button>
                  <button
                    type="button"
                    name="caterogy"
                    className="null"
                    onClick={() => setCategory("Converse")}
                  >
                    Converse
                  </button>
                  <button
                    type="button"
                    name="caterogy"
                    className="null"
                    onClick={() => setCategory("Vans")}
                  >
                    Vans
                  </button>
                </div>
              </div>
              {/* end of categories */}
              {/* price */}
              <div className="form-control">
                <h5>Price</h5>
                <p className="price">{price}</p>
                <input
                  type="range"
                  name="price"
                  min="0"
                  max="5000000"
                  value="500000"
                  step="500000"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              {/* end of price */}
            </form>
            <button type="button" className="clear-btn">
              Clear filters
            </button>
          </div>
          <div className="products-container">
              {Product.filter(sortCategory).map((pros) => (
                <>
                  <Col key={pros._id}>
                    <StoreItem {...pros} />
                  </Col>
                </>
              ))}
          </div>
        </div>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.section`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }
  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  img {
    height: 175px;
    display: block;
    width: 100%;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }
  .StoreItem{
    
  }
  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;
  }
  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
    .products {
      grid-template-columns: 300px 1fr;
    }
  }
  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
export default ProductPage;
