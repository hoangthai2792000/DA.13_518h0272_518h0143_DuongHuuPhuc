import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import CartTotal from './CartTotal'

const CartContent = () => {
  return (
    <Wrapper className='section section-center'>
       <div className='content'>
        <h5>item</h5>
        <h5>price</h5>
        <h5>quantity</h5>
        <h5>subtotal</h5>
        <span></span>
      </div>
      <hr />
      {/* {cart.map((item) => {
        return <CartItem key={item.id} {...item} />
      })} */}
      <hr />
      <div className='link-container'>
        <Link to='/products' className='link-btn'>
          continue shopping
        </Link>
        <button
          type='button'
          className='link-btn clear-btn'
        //   onClick={clearCart}
        >
          clear shopping cart
        </button>
      </div>
      <CartTotal />
    </Wrapper>
  )
}
const Wrapper = styled.main`

display: none;

.link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
}
.link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
}
.clear-btn {
    background: var(--clr-black);
}
@media (min-width: 776px) {
    display: block;
    .content {
      display: grid;
      grid-template-columns: 316px 1fr 1fr 1fr auto;
      justify-items: center;
      column-gap: 1rem;
      h5 {
        color: var(--clr-grey-5);
        font-weight: 400;
      }
    }
    span {
      width: 2rem;
      height: 2rem;
    }
    hr {
      margin-top: 1rem;
      margin-bottom: 3rem;
    }
  }
`

export default CartContent