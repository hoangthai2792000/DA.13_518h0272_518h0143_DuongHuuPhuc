import React from 'react'
import styled from 'styled-components'
import './Contact.css'

const Contact = () => {
  return (
      <div className='section-center'>
        <h3>Join our newsletter and get 15% off</h3>
        <div className='content'>
          <p>
          A shoe is an item of footwear intended to protect and comfort the human foot while doing various activities. Shoes are also used as an item of decoration.
          </p>
          <form
            className='contact-form'
            action='your form spree id'
            method='POST'
          >
            <input
              type='email'
              className='form-input'
              placeholder='Enter email'
              name='_replyto'
            />
            <button type='submit' className='submit-btn'>
              Subscribe
            </button>
          </form>
        </div>
      </div>
  )
}

export default Contact