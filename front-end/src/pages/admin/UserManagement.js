import React from "react";
import { useGlobalContext } from "../../context/context";
import styled from "styled-components";
import PageHero from "../../components/PageHero";
const UserManagement = () => {
  const { users } = useGlobalContext();
  console.log(users);
  return (
    <Wrapper>
    <PageHero title='users-management'/>
      <section className="section section-center page">
        <table className="table table-hover">
          <thead style={{ textAlign: 'center' }}>
            <tr>
              <th scope="row">User</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Phone Number</th>
              <th scope='col'>Address</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: 'center' }}>
            {users.map((val, index) => (
              <tr>
                <th scope='row'>{index + 1} </th>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.phoneNumber}</td>
                <td>{val.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .alert {
    margin-top: 3rem;
  }
`
export default UserManagement;
