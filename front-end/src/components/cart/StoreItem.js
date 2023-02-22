import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/context'

export function StoreItem({ _id, name, price, image }) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    user,
  } = useGlobalContext()
  const quantity = getItemQuantity(_id)

  return (
    <Link to={`/product/${_id}`}>
      <div>
        <img className='img' src={image[0]} alt='product-img' />
        <footer>
          <h5>{name}</h5>
          <p>{price}</p>
        </footer>
      </div>
    </Link>
  )
}
