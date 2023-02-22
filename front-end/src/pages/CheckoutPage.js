import React, { useState } from 'react'
import styled from 'styled-components'
import PageHero from '../components/PageHero'
import { useGlobalContext } from '../context/context'
import { CartItem } from '../components/cart/CartItem'
import { Button, Stack } from 'react-bootstrap'
import axios from 'axios'

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
      <Wrapper className='page'>
        <h1>Checkout here</h1>
        <div className='m-5'>
          {cartItems.map((item) => (
            <CartItem key={item._id} {...item} hiddenBtn={true} />
          ))}
        </div>
        <hr />
        <div>
          <div className='mt-5 me-5 d-flex flex-row-reverse'>
            <p>
              Shipping fee: <span>{shippingFee}</span>
            </p>
          </div>
          <div className='me-5 fw-bold fs-5 d-flex flex-row-reverse'>
            <p>
              Total:
              <span className='ms-2'>
                {cartItems.reduce((total, cartItem) => {
                  const item = products.find((i) => i._id === cartItem._id)
                  return (
                    total + (item?.price || 0) * cartItem.quantity + shippingFee
                  )
                }, 0)}
              </span>
            </p>
          </div>
        </div>
        <div className='d-flex justify-content-center'>
          <Button onClick={handleCheckout}>Payment</Button>
        </div>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div``

export default CheckoutPage
