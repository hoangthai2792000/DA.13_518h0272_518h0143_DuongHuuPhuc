import React from 'react'
import "./Hero.css";
import { Link } from "react-router-dom";
import MainSneaker from '../assets/sneaker_mainpage.jpg'

const Hero = () => {
  return (
    <section className="homepage">
      <div className="main-homepage">
        <div className='leftmain-homepage'>
          <h1>Welcome to my page</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis alias?</p>
          <Link className="btn btn-shop" to='products'>Shop now</Link>
        </div>
        <div className="rightmain-homepage">
          <img src={MainSneaker} width='550' height='752'/>
        </div>
      </div>
    </section>
  )
}

export default Hero