import React, {useState,setState} from 'react';
import { Link } from 'react-router-dom';
import './Register.css'
function Register() {
    const [values, setValues] = useState ({
        name:"",
        email:"",
        phoneNumber:"",
        address:"",
        password:"",
        cpassword:"",
    });
    const [errors, setErrors] = useState({

    });
    const validations = (values) => {
        const errors = {}
    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value, });
    };

    const handleSubmit = (e) => {
       e.preventDefault();
       setErrors(validate(values));
    };
    return(
        <div>
        <form action='' onSubmit={handleSubmit}>
            <h2>Đăng ký tài khoản mới</h2>
            <div>
                <label htmlFor='email'>Địa chỉ email</label>
                <input type='email' name='email' autoComplete='off' value={values.email} onChange={handleChange} placeholder='Nhập địa chỉ email'/>
            </div>
            <div>
                <label htmlFor='name'>Họ và tên</label>
                <input type='text' name='name' autoComplete='off' value={values.name} onChange={handleChange} placeholder='Nhập họ tên'/>
            </div>
            <div>
                <label htmlFor='phone'>Số điện thoại</label>
                <input type='number' name='phone' autoComplete='off' value={values.phoneNumber} onChange={handleChange} placeholder='Nhập số điện thoại'/>
            </div>
            <div>
                <label htmlFor='address'>Địa chỉ giao hàng</label>
                <input type='text' name='address' autoComplete='off' value={values.address} onChange={handleChange} placeholder='Nhập địa chỉ giao hàng'/>
            </div>
            <div>
                <label htmlFor='password'>Mật khẩu</label>
                <input type='password' name='password' autoComplete='off' value={values.password} onChange={handleChange} placeholder='Nhập mật khẩu'/>
            </div>
            <div>
                <label htmlFor='cpassword'>Xác nhận mật khẩu</label>
                <input type='password' name='cpassword' autoComplete='off' value={values.cpassword} onChange={handleChange} placeholder='Nhập lại mật khẩu'/>
            </div>
            <button type='submit' onClick={handleFormSubmit}>Đăng ký</button>
        </form>
        <span>Bạn đã là thành viên
            <a href='/signin'>
            Đăng nhập tại đây
            </a>
        </span>
        </div>
    )       
}

export default Register