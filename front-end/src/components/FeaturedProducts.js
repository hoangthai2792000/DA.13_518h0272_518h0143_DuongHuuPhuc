import React, {useState, useEffect} from 'react'
import Error from './Error'
import styled from 'styled-components'
import Loading from './Loading'
import Product from './Product'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import axios from 'axios'

const FeaturedProducts = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState();
  console.log(id);
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/v1/product')
      .then((response) => {
        setProductData(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
    }, [id]);

    if (!productData) return null;
      console.log(productData)
  return (
    <Wrapper>
      <div className='featured-title'>
        <h2>Featured Products</h2>
        <div className='underline'></div>
      </div>
      <div className='section-center featured'>
        {productData.slice(0, 3).map((product) => (
          <Product key={product.id} {...product}/>
        ))}
      </div>
      <Link to='/products' className='btn'>
        All Products
      </Link>
    </Wrapper>
  )
};
const Wrapper= styled.section`
  background-color: #f1f5f8;
  color: #102a42;
  padding: 80px 0px;
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
      line-height:24px;
      border-radius: 4px;
    }
  }
  .featured-title{
    color: #102a42;
    text-align: center;
    h2{
      font-size: 40px;
      text-transform: capitalize;
      margin: 0px 0px 12px;
    } 
    .underline{
      background-color: #ab7a5f;
      margin: 0px 700px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
    background-color: #ab7a5f;
    color: black;

  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturedProducts