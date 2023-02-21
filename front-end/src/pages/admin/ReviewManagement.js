import React from 'react'
import PageHero from '../../components/PageHero'
import styled from 'styled-components'
import { useGlobalContext } from "../../context/context";

const ReviewManagement = () => {
  const {reviews } = useGlobalContext();
  console.log(reviews);
  return (
    <Wrapper>
    <PageHero title='reviews-management'/>
      <section className="section section-center page">
        <table className="table table-hover">
          <thead style={{ textAlign: 'center' }}>
            <tr>
              <th scope="row">Review</th>
              <th scope='col'>Name</th>
              <th scope='col'>Product</th>
              <th scope='col'>Comment</th>
              <th scope='col'>Rating</th>

            </tr>
          </thead>
          <tbody style={{ textAlign: 'center' }}>
            {reviews.map((val, index) => (
              <tr>
                <th scope='row'>{index + 1} </th>
                <td>{val.user ? val.user.name: "" }</td>
                <td>{val.product.name}</td>
                <td>{val.comment}</td>
                <td>{val.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Wrapper>
  )
}
const Wrapper = styled.div`
`

export default ReviewManagement