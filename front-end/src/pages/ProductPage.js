import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ProductPage.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import PageHero from '../components/PageHero';
const ProductPage = () => {
  const [Product, setProduct] = useState()
  const [imagePro, setImagePro] = useState()
  const [category, setCategory] = useState("all");

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/v1/product')
      .then((response) => {
        setProduct(response.data.products)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()

    console.log(imagePro)

    const data = new FormData()
    data.append('image', imagePro, imagePro.type)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    axios
      .post('http://localhost:8000/api/v1/search-by-image', data, config)
      .then((response) => {
        setProduct(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  function sortCategory(value) {
    if (category === "all") {
      return value;
    }
    return value.brand === category;
  }
  if(!Product) return null
  return (
    <main>
    <div className='product_banner'>
      <h3 className='title_banner'>Product</h3>
    </div>
    <Wrapper className='page'>
      <section className='section-center products'>
        <div className='product_main'>
          <div className='left_main'>
            <form>
              <div>
                <form onSubmit={handleSearch}>
                  <input
                    type='file'
                    name='file'
                    id='file'
                    onChange={(e) => setImagePro(e.target.files[0])}
                  />
                  <button type='subtmit' className='btn btn-primary'>
                    Search
                  </button>
                </form>
              </div>

              <div className='form-control'>
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

              <div className='form-control'>
                <h5>Price</h5>
                <p className='price'>50,000,000</p>
                <input
                  type='range'
                  name='price'
                  min='0'
                  max='500000000'
                  value='20000000'
                />
              </div>
            </form>
            <button type='button' className='clear-btn'>
              Clear filters
            </button>
          </div>
          <div className='right_main'>
          {Product.filter(sortCategory).map((pros) => (
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
          </div>
        </div>
      </section>
    </Wrapper>
    </main>
  )
};
const Wrapper = styled.section`
  color: #102a42;
  line-height: 2rem;
  gap: 4rem 2rem;
  grid-template-columns: 50% 50%;
`

export default ProductPage
