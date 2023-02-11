import React from "react";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Services from "../components/Services";
import Contact from "../components/Contact";
import "./HomePage.css";
import { Link } from "react-router-dom";
import MainSneaker from '../assets/sneaker_mainpage.jpg'

const HomePage = () => {
  return (
    <>
    <section className="homepage">
      <div className="main-homepage">
        <div>
          <h1>Sneakers that you'll love</h1>
          <p className="intro">A shoe is an item of footwear intended to protect and comfort the human foot while doing various activities. Shoes are also used as an item of decoration.
          </p>
          <Link className="btn btn-shop" to='products'>Shop now</Link>
        </div>
        <div>
          <img src={MainSneaker} className='main-image' width='550' height='710'/>
        </div>
      </div>
    </section>
    <FeaturedProducts/>
    <Services/>
    <Contact/>
    </>
  );
};

export default HomePage;
