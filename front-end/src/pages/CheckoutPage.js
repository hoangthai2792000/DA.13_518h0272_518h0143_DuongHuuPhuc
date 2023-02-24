import React, { useState } from 'react'
import styled from 'styled-components'
import PageHero from '../components/PageHero'
import { useGlobalContext } from '../context/context'
import { CartItem } from '../components/cart/CartItem'
import { Button, Stack } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

const CheckoutPage = () => {
  const { cartItems, products, quantity, user } = useGlobalContext()
  const [shippingFee, setShippingFee] = useState(30000)
  console.log(cartItems)
  const handleCheckout = (e) => {
    e.preventDefault()

    const url = 'http://localhost:5000/api/v1/order'

    const instance = axios.create({
      withCredentials: true,
    })

    instance
      .post(url, {
        items: cartItems,
        shippingFee: shippingFee,
        user: user.userId,
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <main>
      <PageHero title='checkout' />
      <Wrapper className='section section-center'>
        <h1>Checkout here</h1>
        <div className='content'>
          <h5>item</h5>
          {/* <h5>Name</h5>
          <h5>Price</h5> */}
          <h5>subtotal</h5>
          <span></span>
        </div>
        <Stack direction="horizontal" gap={5} className="d-grid align-items-center">
          {cartItems.map((item) => (
            <CartItem key={item._id} {...item} hiddenBtn={true}/>
          ))}
        </Stack>
        <hr />
        <div className='link-container'>
          <Link to='/products' className='link-btn'>
            continue shopping
          </Link>
        </div>
        <div className='carts-total'>
          <article>
            <p>
              Shipping fee: <span>{shippingFee}</span>
            </p>
            <hr />
            <h4>
              order total :
              <span>
                {cartItems.reduce((total, cartItem) => {
                  const item = products.find((i) => i._id === cartItem._id)
                  return (
                    total + (item?.price || 0) * cartItem.quantity + shippingFee
                  )
                }, 0)}
              </span>
            </h4>
          </article>
        </div>
        <div className='d-flex justify-content-center'>
          <Button onClick={handleCheckout}>Payment</Button>
        </div>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  .carts-total{
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 5rem;
    }
    h4,
    h5,
    p {
      display: grid;
      grid-template-columns: 200px 1fr;
    }
    p {
      text-transform: capitalize;
    }
    h4 {
      margin-top: 2rem;
    }
  }
  .content{
    display: none;
  }
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
  @media (min-width: 776px) {
    display: block;
    justify-content: flex-end;
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr ;
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
    .btn {
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
    }
  }`

export default CheckoutPage
