import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Error from './Error'
import Loading from './Loading'
import Product from './Product'

const FeaturedProducts = () => {
  return (
    <div className='featured-center'>
      <div className='title'>
        <h2>Featured products</h2>
        <div className='underline'></div>
      </div>
      <div className='section-center featured'>
    
      </div>
      <Link to='/products' className='btn'>
        All products
      </Link>
    </div>
  )
}


export default FeaturedProducts