import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import main from '../assets/main.svg';
import { Redirect } from 'react-router-dom';
import { useGlobalContext } from '../context';
function Dashboard() {
  const { user } = useGlobalContext();
  const { name, userId, role } = user;
  return (
    <>
      <Wrapper className='section section-center page'>
        <h2>Hello there, {user.name}</h2>
        <p>
          Your ID : <span>{userId}</span>
        </p>
        <p>
          Your Role : <span>{role}</span>
        </p>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  margin: 88px;
  @media (min-width: 992px) {
    p{
      margin-bottom: 0;
    }
    
  }
`;

export default Dashboard;
