import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import "./CartButton.css"
// import { useProductsContext } from '../context/products_context'
// import { useCartContext } from '../context/cart_context'
// import { useUserContext } from '../context/user_context' 
import { useAuth0 } from "@auth0/auth0-react";

const CartButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Wrapper className='cart-btn-wrapper'>
            <Link to='/cart' style={{textDecoration:"none",borderBottomColor:'red'}} className='cart-btn'>
                Cart
                <span className='cart-container'>
                    <FaShoppingCart/>
                </span>
            </Link>
            <Link to='/login' style={{textDecoration:"none",borderBottomColor:'red'}} className='cart-btn'>
                Login
                <span className='cart-container'>
                    <FaUserPlus/>
                </span>
            </Link>
        </Wrapper>
  )
}
const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    width:225px;
`

export default CartButton