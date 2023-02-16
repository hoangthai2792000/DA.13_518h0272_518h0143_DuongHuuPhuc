import React from 'react'
// import "./Hero.css";
import { Link } from "react-router-dom";
import MainSneaker from '../assets/sneaker_mainpage.jpg'
import styled from 'styled-components';

const Hero = () => {
  return (
    // <section className="homepage">
    //   <div className="main-homepage">
    //     <div>
    //       <h1>Sneaker That You'll Love</h1>
    //       <p className='intro'>A shoe is an item of footwear intended to protect and comfort the human foot while doing various activities. Shoes are also used as an item of decoration.</p>
    //       <Link className="btn btn-shop" to='products'>Shop now</Link>
    //     </div>
    //     <div className="bg-dark">
    //       <img className='main-image' src={MainSneaker} width='550' height='710'/>
    //     </div>
    //   </div>
    // </section>
    <Wrapper className='section-center'>
      <article className='content'>
        <h1>
          Sneakers That You'll Love
        </h1>
        <p>
        A shoe is an item of footwear intended to protect and comfort the human foot while doing various activities. Shoes are also used as an item of decoration.
        </p>
        <Link to='/products' className='btn hero-btn'>
          shop now
        </Link>
      </article>
      <article className='img-container'>
        <img src={MainSneaker} alt='nice table' className='main-img' />
      </article>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  min-height: 60vh;
  color:#102a42;
  display: grid;
  grid-template-columns: 50% 50%;
  margin: 0px 174.6px;
  line-height: 2rem;
  gap: 128px
  align-items:center;
  place-items: center;
  .img-container {
    display: none;
  }
  .content{
    display: block;
  }
  p {
    color: #617d98;
    font-family: -apple-system;
    font-size: 20px;
    line-height: 40px;
    margin:0px 0px 32px;
  }
  h1{
    color:#102a42;
    font-family:-apple-system;
    font-size: 40px;
    font-weight: 700;
    letter-spacing: 1.6px;
    line-height: 48px;
    margin: 0px 0px 32px;
    text-transform: capitalize;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      background-color:#ab7a5f;
      color: black;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      border-radius:4px;
      color:#102a42;
      line-height:24px;
      width: 100%;
      object-fit: fill;
    }

    .img-container::before {
      content: '';
      position: absolute;
      width: 10%;
      height: 80%;
      background: var(--clr-primary-9);
      bottom: 0%;
      left: -8%;
      border-radius: var(--radius);
    }
  }
`
export default Hero