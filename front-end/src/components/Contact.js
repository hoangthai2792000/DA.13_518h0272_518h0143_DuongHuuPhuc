import React from 'react'
import styled from 'styled-components'

const Contact = () => {
  return (
    <Wrapper>
      <div className='section-center'>
        <h3>Join our newsletter and get 30% off</h3>
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
              placeholder='enter email'
              name='_replyto'
            />
            <button type='submit' className='submit-btn'>
              subscribe
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  padding: 5rem 0;
  margin: 0px 174.6px;
  h3 {
    text-transform: none;
    margin: 0px 0px 12px;
    font-weight:700;
  }
  p {
    line-height: 2;
    max-width: 45em;
    color: var(--clr-grey-5);
  }
  .contact-form {
    width: 90vw;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .form-input,
  .submit-btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid black;
    border-color:#222222;
  }
  .form-input {
    border-right: none;
    color: grey;
    background-color:#ffffff;
    border-radius: 4px 0px 0px 4px;
  }
  .submit-btn {
    border-radius: 0px 4px 4px 0px;
    background-color: #ab7a5f;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    cursor: pointer;
    transition: var(--transition);
    color: black;
  }
  .form-input::placeholder {
    color: black;
    text-transform: capitalize;
  }
  .submit-btn:hover {
    color: white;
  }
  @media (min-width: 992px) {
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 8rem;
      margin-top: 2rem;
    }
    p {
      margin-bottom: 0;
    }
  }
  @media (min-width: 1280px) {
    padding: 15rem 0;
  }
`

export default Contact