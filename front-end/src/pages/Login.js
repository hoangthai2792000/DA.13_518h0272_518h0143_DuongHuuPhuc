import React, { useState } from 'react'
import styled from 'styled-components'
import PageHero  from '../components/PageHero'
import { Link } from 'react-router-dom'
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);
  const handleSubmit = () =>{
    console.log(email,password)
  }
  return (
    <main className='bg-dark'>
      <PageHero title='Login'/>
      <Wrapper className='page section section-center'>
      <section className='login_container'>
        <h2 className='title'>Đăng nhập tài khoản</h2>
        
        <form onSubmit={handleSubmit}>
          <div>
          <label htmlFor="email">
              Email
            </label>
          <input type="email" id="email"
            // ref={userRef}
            value={email}
            onChange={handleEmailInput}
            autoComplete="off"
            // required 
            placeholder='Nhập địa chỉ email'
          />
          </div>
          <div>
          <label htmlFor="password">
              Mật khẩu
            </label>
          <input
            type="password"
            id="password"
            // ref={userRef}
            value={password}
            onChange={handlePasswordInput}
            autoComplete="off"
            // required 
            placeholder='Nhập mật khảu'
          />
          </div>
          
          <div>
            <button className="btn btn-info btn-lg btn-block" type="submit">Đăng nhập</button>
          </div>
          <p>
          <Link to='/forgot'>
            Quên mật khẩu?
          </Link>
          </p>
        </form>
      </section>
      </Wrapper>
    </main>
  )
}
const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    width:225px;

    .cart-btn {
        color: var(--clr-grey-1);
        font-size: 1.5rem;
        letter-spacing: var(--spacing);
        color: var(--clr-grey-1);
        display: flex;
        align-items: center;
    }
    .cart-container {
        display: flex;
        align-items: center;
        position: relative;
        svg {
            height: 1.6rem;
            margin-left: 5px;
        }
    }
    .cart-value {
        position: absolute;
        top: -10px;
        right: -16px;
        background: var(--clr-primary-5);
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 0.75rem;
        color: var(--clr-white);
        padding: 12px;
    }
    .auth-btn {
        display: flex;
        align-items: center;
        background: transparent;
        border-color: transparent;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--clr-grey-1);
        letter-spacing: var(--spacing);
        svg {
        margin-left: 5px;
        }
    }
`

export default Login