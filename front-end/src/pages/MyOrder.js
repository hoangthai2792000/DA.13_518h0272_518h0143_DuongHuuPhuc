// import React, {useEffect, useState } from 'react'
// import styled from 'styled-components';
// import { useGlobalContext } from '../context/context';
// import axios from 'axios';

// const MyOrder = () => {
//     const {user, setUser} = useGlobalContext();
//     const [orders, setOrders] = useGlobalContext();
//     const [MyOrders, setMyOrders] = useState();
//     const url = `http://localhost:5000/api/v1/order/${user.userId}`
//     useEffect(() => {
//     axios
//       .get(url
//       )
//       .then((response) => {
//         setMyOrders(response.data.orders)
//         console.log(setMyOrders)
//         // window.location.reload(false)
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   }
// )
//     return (
//         <p>a</p>
//     )
// }

// export default MyOrder