import React from "react";
import { useGlobalContext } from "../../context/context";
import styled from "styled-components";
import PageHero from "../../components/PageHero";
const OrderManagement = () => {
  const { orders } = useGlobalContext();
  console.log(orders);
  return (
    <Wrapper>
    <PageHero title='order-management'/>
      {orders.map((order) => (
        <section className="section section-center page">
          <table className="table table-hover">
            <thead style={{ textAlign: 'center' }}>
              <tr>
                <th scope="row">Order</th>
                <th scope='col'>Name</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Total Price</th>
                <th scope='col'>Status</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
              {order.orderItems.map((val, index) => (
                <tr>
                  <th scope='row'>{index + 1} </th>
                  <td>{val.name}</td>
                  <td>{val.amount}</td>
                  <td>{val.price}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .alert {
    margin-top: 3rem;
  }
`
export default OrderManagement;
