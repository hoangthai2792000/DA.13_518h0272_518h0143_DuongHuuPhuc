import React from 'react'

import './Contact.css'

const Contact = () => {
  return (
      <div className='section-center'>
        <h3>Join our newsletter and get 20% off</h3>
        <div className='content'>
          <p>
          A shoe is an item of footwear intended to protect and comfort the human foot while doing various activities. 
          Shoes are also used as an item of decoration.
          </p>
          <form
            className='contact-form'
            action='your form spree id'
            method='POST'
          >
            <input
              type='email'
              className='form-input'
              placeholder='enter email'
              name='_replyto'
            />
            <button type='submit' className='submit-btn'>
              subscribe
            </button>
          </form>
        </div>
      </div>
  )
}


export default Contact