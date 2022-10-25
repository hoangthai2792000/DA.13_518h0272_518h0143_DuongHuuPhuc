import React from 'react'
import {BsPerson} from 'react-icons/bs'
import './Signup.css'
const Signup = () => {
  return (
    <>
        <section className='signup'>
            <div className='container mt-5'>
                <div className='signup-content'>
                    <div className='signup-form'>
                    <h2>Đăng ký tài khoản mới</h2>
                    <form className='register-form'>
                        <div className='form-group'>
                            <label htmlFor='email'>Địa chỉ email</label>
                            <input type='email' name='email' placeholder='Nhập địa chỉ email' required/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='name'>
                                <BsPerson/>
                            </label>
                            <input type='text' name='name' placeholder='Nhập họ tên' required/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='phone'>Số điện thoại</label>
                            <input type='number' name='phone' placeholder='Nhập số điện thoại' required/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='address'>Địa chỉ giao hàng</label>
                            <input type='text' name='address' placeholder='Nhập địa chỉ giao hàng' required/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Mật khẩu</label>
                            <input type='password' name='password' placeholder='Nhập mật khẩu' required/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='cpassword'>Xác nhận mật khẩu</label>
                            <input type='password' name='cpassword'  placeholder='Nhập lại mật khẩu' required/>
                        </div>
                        <div className='form-group form-button'>
                            <button type='submit' name='signup' value='Đăng ký'/>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Signup