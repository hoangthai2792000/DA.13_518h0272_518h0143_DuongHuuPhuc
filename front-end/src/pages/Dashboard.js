import React, {useEffect, useState } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../context/context';
import axios from 'axios';
import { useParams } from 'react-router'
import PageHero from '../components/PageHero';
import useLocalState from '../utils/localState'
import { Table } from 'react-bootstrap'


const Dashboard = () => {
  const {user, setUser} = useGlobalContext();
  // const { name, userId, role } = user;    
  const [userInfo, setUserInfo] = useState({});
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState()


  const instance = axios.create({
    withCredentials: true,
  })
  const url = `http://localhost:5000/api/v1/user/${user.userId}`
  useEffect(() => {
    instance
      .get(url
      )
      .then((response) => {
        setUserInfo(response.data.user)
        // console.log(userInfo)
        // window.location.reload(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }
)
  // console.log(userInfo)
  const handleUpdateUser = (e) => {
    e.preventDefault()
    hideAlert()
    setLoading(true)
    if (!name || !email || !address || !phoneNumber) {
      showAlert({ text: 'Vui lòng nhập đầy đủ tên, email, địa chỉ và số điện thoại' })
    }
    const instance = axios.create({
      withCredentials: true,
    })
    const url = `http://localhost:5000/api/v1/user/updateUser`
    instance
      .patch(url, {
        name: name,
        email: email,
        address: address,
        phoneNumber: phoneNumber,
      })
      .then((response) => {
        // console.log(response.data.user)
        showAlert({
          text: 'Upload Information Successfully',
          type: 'success',
        })
        setLoading(false)
        window.location.reload(false)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  const handleUpdateUserPassword = (e) => {
    // hideAlert()
    // setLoading(true)
    // if (!oldPassword || !newPassword) {
    //   showAlert({ text: 'Vui lòng nhập mật khẩu cũ và mới' })
    // }
    e.preventDefault()
    const instance = axios.create({
      withCredentials: true,
    })
    const url = `http://localhost:5000/api/v1/user/updateUserPassword`
    instance
      .patch(url, {
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
      .then((response) => {
        // showAlert({
        //   text: 'Update Password Successfully',
        //   type: 'success',
        // })
        // setLoading(false)
        console.log(response)
               
        // window.location.reload(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  // console.log(oldPassword)
  // console.log(newPassword) 
  // console.log(handleUpdateUserPassword)
  // if (!user) return null
  // console.log(user)
  return (
    <>
      <PageHero title={userInfo.name}/>
      <Wrapper>
        <section className='section section-center page'>
          <h2 style={{textAlign: 'center'}}>User Information</h2>
          {/* <!-- Update Modal --> */}
          <div
              className='modal fade'
              id='editModal'
              tabindex='-1'
              aria-labelledby='editModalLabel'
              aria-hidden='true'
            >
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='exampleModalLabel'>
                      Update Information: {userInfo.name}
                    </h5>
                    <button
                      type='button'
                      className='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    ></button>
                  </div>
                  <form onSubmit={handleUpdateUser}>
                    <div className='modal-body'>
                      <div className='form-floating mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          id='floatingInput'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <label for='floatingInput'>Name</label>
                      </div>
                      <div className='form-floating mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          id='floatingAddress'
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <label for='floatingAddress'>Address</label>
                      </div>
                      <div className='form-floating mb-3'>
                        <input
                          type='email'
                          className='form-control'
                          id='floatingEmail'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label for='floatingEmail'>Email</label>
                      </div>
                      <div className='form-floating mb-3'>
                        <input
                          type='number'
                          className='form-control'
                          id='floatingPhoneNumber'
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <label for='floatingPhoneNumber'>Phone Number</label>
                      </div>
                      {alert.show && (
                        <div className={`alert alert-${alert.type}`}>
                          {alert.text}
                        </div>
                      )}
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                      >
                        Close
                      </button>
                      <button type='submit' className='btn btn-primary'>
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          {/* <!-- Update Password Modal --> */}
          <div
              className='modal fade'
              id='editModal'
              tabindex='-1'
              aria-labelledby='editModalLabel'
              aria-hidden='true'
            >
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='exampleModalLabel'>
                      Update Password: {userInfo.name}
                    </h5>
                    <button
                      type='button'
                      className='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    ></button>
                  </div>
                  <form onSubmit={handleUpdateUserPassword}>
                    <div className='modal-body'>
                      <div className='form-floating mb-3'>
                        <input
                          type='number'
                          className='form-control'
                          id='floatingPassword'
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                        
                        <label for='floatingPassword'>Please type Old Password</label>
                      </div>
                      <div className='form-floating mb-3'>
                        <input
                          type='number'
                          className='form-control'
                          id='floatingPassword'
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <label for='floatingPassword'>Please type New Password</label>
                      </div>
                      {/* {alert.show && (
                        <div className={`alert alert-${alert.type}`}>
                          {alert.text}
                        </div>
                      )} */}
                    </div>

                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                      >
                        Close
                      </button>
                      <button type='submit' className='btn btn-primary'>
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          <Table striped bordered hover>
            <thead style={{ textAlign: 'center' }}>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Address</th>
                <th scope='col'>Email</th>
                <th scope='col'>Phone Number</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody style={{ verticalAlign:"middle", textAlign:"center" }}>
              <tr>
                <td>{userInfo.name}</td>
                <td>{userInfo.email}</td>
                <td>{userInfo.address}</td>
                <td>{userInfo.phoneNumber}</td>
                <td
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '50% 50%',
                    verticalAlign: 'middle',
                  }}
                >
                  <button
                    className='btn btn-warning me-3'
                    data-bs-toggle='modal'
                    data-bs-target='#editModal'
                    onClick={() => setUserInfo(userInfo)}
                  >
                    Update User
                  </button>
                  
                  <button
                    className='btn btn-danger'
                    data-bs-toggle='modal'
                    data-bs-target='#deleteModal'
                    onClick={() => setUserInfo(userInfo)}
                  >
                    Update User Password
                  </button>
                  
                </td>
              </tr>
            </tbody>
          </Table>
        </section>
        {/* <h2>Hello there, {user.name}</h2>
        <p>
          Your ID : <span>{userId}</span>
        </p>
        <p>
          Your Role : <span>{role}</span>
        </p> */}
      </Wrapper>
    </>
  )
}
const Wrapper = styled.div`
  p span {
    background: var(--primary-500);
    padding: 0.15rem 0.25rem;
    color: var(--white);
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
  }
`;
export default Dashboard
