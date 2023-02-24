import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import url from '../utils/url'
import { useLocalStorage } from '../hooks/useLocalStorage'
import ShoppingCart from '../components/cart/ShoppingCart'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [reviews, setReviews] = useState([])
  const saveUser = (user) => {
    setUser(user)
  }

  const removeUser = () => {
    setUser(null)
  }

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/api/v1/user/showMe`)
      saveUser(data.user)
      console.log(data.user)
    } catch (error) {
      removeUser()
    }
    setIsLoading(false)
  }

  const logoutUser = async () => {
    try {
      await axios.delete('/api/v1/auth/logout')
      removeUser()
    } catch (error) {
      console.log(error)
    }
  }

  //Products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product`)
      console.log(data.products)
      setProducts(data.products)
    } catch (error) {
      setProducts([])
    }
    setIsLoading(false)
  }
  //Products

  //Order
  const fetchOrder = async () => {
    try {
      const instance = axios.create({
        withCredentials: true,
      })

      const { data } = await instance.get(`/api/v1/order`)
      setOrders(data.orders)
    } catch (error) {
      setOrders([])
    }
    setIsLoading(false)
  }
  //Order
  //User
  const fetchUsers = async () => {
    try {
      const instance = axios.create({
        withCredentials: true,
      })
      const { data } = await instance.get(`/api/v1/user`)
      setUsers(data.users)
    } catch (error) {
      setUsers([])
    }
    setIsLoading(false)
  }
  //User
  //Review
  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/v1/review`)
      setReviews(data.reviews)
    } catch (error) {
      setReviews([])
    }
    setIsLoading(false)
  }
  //User
  useEffect(() => {
    fetchUser()
    fetchProducts()
    fetchOrder()
    fetchUsers()
    fetchReviews()
  }, [])
  // Cart context
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage('shopping-cart', [])

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  function getItemQuantity(_id) {
    return cartItems.find((item) => item._id === _id)?.quantity || 0
  }
  function increaseCartQuantity(_id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item._id === _id) == null) {
        return [...currItems, { _id, quantity: 1 }]
      } else {
        return currItems.map((item) => {
          if (item._id === _id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  function decreaseCartQuantity(_id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item._id === _id)?.quantity === 1) {
        return currItems.filter((item) => item._id !== _id)
      } else {
        return currItems.map((item) => {
          if (item._id === _id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  function removeFromCart(_id) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item._id !== _id)
    })
  }

  function clearCart() {
    setCartItems([])
    localStorage.removeItem('shopping-cart')
  }

  // Cart context

  return (
    <AppContext.Provider
      value={{
        isLoading,
        saveUser,
        user,
        logoutUser,
        //products
        products,
        //products
        //orders
        orders,
        //orders
        // users
        users,
        // users
        // reviews
        reviews,
        // reviews
        //Cart context
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        clearCart,
        //Cart context
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppProvider }
