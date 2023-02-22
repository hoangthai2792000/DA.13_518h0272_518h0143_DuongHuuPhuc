import React from 'react'
import { useGlobalContext } from '../../context/context'
import styled from 'styled-components'
import PageHero from '../../components/PageHero'
import { Table } from 'react-bootstrap'
const OrderManagement = () => {
  const { orders } = useGlobalContext()
  console.log(orders)
  return (
    <Wrapper>
      <PageHero title='order-management' />
      <section className='section section-center page'>
        <Table striped bordered hover>
          <thead style={{ textAlign: 'center' }}>
            <tr>
              <th>Order</th>
              <th>User</th>
              <th>Products</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: 'center' }}>
            {orders.map((order, index) => (
              <>
                <tr>
                  <td>{index + 1}</td>
                  <td>{order.user}</td>
                  <td>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Number</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.orderItems.map((val, index) => (
                          <>
                            <tr>
                              <td>{index + 1}</td>
                              <td>{val.name}</td>
                              <td>{val.price}</td>
                              <td>{val.amount}</td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </Table>
                  </td>
                  <td style={{ verticalAlign: 'middle' }}>{order.total} VND</td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </section>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  .alert {
    margin-top: 3rem;
  }
`
export default OrderManagement
