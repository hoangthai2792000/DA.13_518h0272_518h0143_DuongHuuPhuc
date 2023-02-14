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
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: grey;
    font-size: 1rem;
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
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
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