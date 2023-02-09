import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import "./Hero.css"
const Hero = () => {
  return (
    <Wrapper className='section-center'>
      <article className='content'>
        <h1 className=''>
          Design your <br/>
          comfort zone
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti iure
          quasi odit tenetur unde officiis repudiandae quod deserunt quia eum?
        </p>
      <Link to='/products' className='btn hero-btn'>
        Shop now
      </Link>
    </article>
    <article className='img-container'>
      <img src={logo} alt='nice sneaker' className='main-img'/>
      <img src={logo} alt='nice sneaker1' className='main-img'/>
    </article>
    </Wrapper>
  )
}
const Wrapper = styled.div`
`

export default Hero