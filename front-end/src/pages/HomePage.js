import React from 'react'
import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts'
import Services from '../components/Services'
import Contact from '../components/Contact'
import './HomePage.css'
const HomePage = () => {
  return (
    <main className='homepage'>
      <Hero/>
      <FeaturedProducts/>
      <Services/>
      <Contact/>
    </main>
  )
}

export default HomePage