import React from 'react'

const Signup = () => {
  return (
        <div className='form-container'>
            <h1>Đăng ký tài khoản mới</h1>
            <div className='email'>
                <label className='form-label' for='email'>Địa chỉ email</label>
                <input name='email' type='email' placeholder='Nhập địa chỉ email' required></input>
            </div>
            <div className='name'>
                <label className='form-label' for='name'>Họ và tên</label>
                <input name='name' type='text' placeholder='Nhập họ tên' required></input>
            </div>
            <div className='phone'>
                <label className='form-label' for='phone'>Số điện thoại</label>
                <input name='name' type='phone' placeholder='Nhập số điện thoại' required></input>
            </div>
            <div className='address'>
                <label className='form-label' for='address'>Địa chỉ giao hàng</label>
                <input name='address' type='text' placeholder='Nhập địa chỉ giao hàng' required></input>
            </div>
            <div className='password'>
                <label className='form-label' for='password'>Mật khẩu</label>
                <input name='password' type='password' placeholder='Nhập mật khẩu' required></input>
            </div>
            <div className='confirmPassword'>
                <label className='form-label' for='confirmPassword'>Xác nhận mật khẩu</label>
                <input name='confirmPassword' type='password' placeholder='Nhập lại mật khẩu'></input>
            <div/>
        </div>
  )
}

export default Signup