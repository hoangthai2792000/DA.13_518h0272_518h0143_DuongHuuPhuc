import React from 'react'
import "./Hero.css";
import { Link } from "react-router-dom";
import MainSneaker from '../assets/sneaker_mainpage.jpg'

const Hero = () => {
  return (
    <section className="homepage">
      <div className="main-homepage">
        <div>
          <h1>Sneaker That You'll Love</h1>
          <p className='intro'>A shoe is an item of footwear intended to protect and comfort the human foot while doing various activities. Shoes are also used as an item of decoration.</p>
          <Link className="btn btn-shop" to='products'>Shop now</Link>
        </div>
        <div className="bg-dark">
          <img className='main-image' src={MainSneaker} width='550' height='710'/>
        </div>
      </div>
    </section>
  )
}

export default Hero