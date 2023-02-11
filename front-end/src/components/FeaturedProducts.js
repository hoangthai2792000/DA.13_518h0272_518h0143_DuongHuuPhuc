import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Error from './Error'
import Loading from './Loading'
import Product from './Product'
import './FeaturedProducts.css'
const FeaturedProducts = () => {
  
  return (
    <section className='featured-products'>
      <div className='title'>
        <h2>Featured Products</h2>
        <div className='underline'></div>
      </div>
      
      <div className='section-center featured'></div>
      <Link to='/products' className='btn'>
        All products
      </Link>
    </section>
  )
}


export default FeaturedProducts