// import React, {useEffect, useState} from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import main from '../assets/main.svg';
// import { Redirect } from 'react-router-dom';
// import { useGlobalContext } from '../context/context';
// import useLocalState from '../utils/localState'
// import axios from 'axios';
// import PageHero from "../components/PageHero"

// function Dashboard() {
//   const [user, setUser] = useState()
//   const [selectedProduct, setSelectedProduct] = useState([])

//   const [proName, setProName] = useState()
//   const [proEmail, setproEmail] = useState()
//   const [proAddress, setproAddress] = useState()
//   const [proPhoneNumber, setproPhoneNumber] = useState()

//   const [proOldPassword, setproOldPassword] = useState()
//   const [proNewPassword, setproNewPassword] = useState()

//   const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState()

//   useEffect(() => {
//     axios
//       .get('http://localhost:3000/api/v1/user')
//       .then((response) => {
//         setUser(response.data.user)
//         console.log(user)
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   }, [])
//   // update user information
//   const handleUpdate = (e) => {
//     e.preventDefault()
//     const url = `http://localhost:3000/api/v1/user`
//     axios
//       .patch(url, {
//         name: proName,
//         email: proEmail,
//         address: proAddress,
//         phoneNumber: proPhoneNumber,
//       })
//       .then((response) => {
//         console.log(response)
//         window.location.reload(false)
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   }
//   const handleUpdateUserPassword = (e) => {
//     e.preventDefault()
//     const url = `http://localhost:5000/api/v1/user`
//     axios
//       .patch(url, {
//         OldPassword: proOldPassword,
//         NewPassword: proNewPassword,
//       })
//       .then((response) => {
//         console.log(response)
//         window.location.reload(false)
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   }
//   return (
//     <>
//     <PageHero title='users-info' />
//       <Wrapper>
//       <section className='section section-center page'>
//         <button
//           className='btn btn-primary'
//           data-bs-toggle='modal'
//           data-bs-target='#addModal'
//         >
//           Update Information
//         </button>
//         <div>
//           {/* <!-- Modal --> */}
//           <div
//             className='modal fade'
//             id='addModal'
//             tabindex='-1'
//             aria-labelledby='addModalLabel'
//             aria-hidden='true'
//           >
//             <div className='modal-dialog'>
//               <div className='modal-content'>
//                 <div className='modal-header'>
//                   <h5 className='modal-title' id='exampleModalLabel'>
//                     Update Information
//                   </h5>
//                   <button
//                     type='button'
//                     className='btn-close'
//                     data-bs-dismiss='modal'
//                     aria-label='Close'
//                   ></button>
//                 </div>
//                 <form
//                   onSubmit={handleUpdate}
//                   className={loading ? 'form form-loading' : 'form'}
//                 >
//                   <div className='modal-body'>
//                     <div className='form-floating mb-3'>
//                       <input
//                         type='text'
//                         className='form-control'
//                         id='floatingInput'
//                         onChange={(e) => setProName(e.target.value)}
//                       />
//                       <label for='floatingInput'>Name</label>
//                     </div>
//                     <div className='form-floating mb-3'>
//                       <input
//                         type='email'
//                         className='form-control'
//                         id='floatingEmail'
//                         onChange={(e) => setproEmail(e.target.value)}
//                       />
//                       <label for='floatingEmail'>Email</label>
//                     </div>
//                     <div className='form-floating mb-3'>
//                       <input
//                         type='text'
//                         className='form-control'
//                         id='floatingAddress'
//                         onChange={(e) => setproAddress(e.target.value)}
//                       />
//                       <label for='floatingAddress'>Address</label>
//                     </div>
//                     <div className='form-floating mb-3'>
//                       <input
//                         type='numbet'
//                         className='form-control'
//                         id='floatingAddress'
//                         onChange={(e) => setproAddress(e.target.value)}
//                       />
//                       <label for='floatingAddress'>Address</label>
//                     </div>
//                     <div className='form-floating mb-3'>
//                       <select
//                         id='floatingBrand'
//                         name='floatingBrand'
//                         className='form-control'
//                         onChange={(e) => {
//                           const selectedBrand = e.target.value
//                           setProBrand(selectedBrand)
//                         }}
//                       >
//                         <option selected>
//                           <p className='text-muted'>Select brand</p>
//                         </option>
//                         {brand.map((unit) => (
//                           <option value={unit.value}>{unit.value}</option>
//                         ))}
//                       </select>
//                       <label for='floatingBrand'>Brand</label>
//                     </div>

//                     <div className='form-floating mb-3'>
//                       <form>
//                         <div className='form-control'>
//                           {/* search input */}
//                           <input
//                             type='file'
//                             name='image'
//                             id='image'
//                             multiple
//                             onChange={(e) => setProImage(e.target.files)}
//                           />

//                           <button
//                             type='submit'
//                             className='btn btn-primary'
//                             onClick={handleUploadImage}
//                           >
//                             Upload
//                           </button>
//                         </div>
//                         {/* end search input */}
//                       </form>

//                       {alert.show && (
//                         <div className={`alert alert-${alert.type}`}>
//                           {alert.text}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className='modal-footer'>
//                     <button
//                       type='button'
//                       className='btn btn-secondary'
//                       data-bs-dismiss='modal'
//                     >
//                       Close
//                     </button>
//                     <button type='submit' className='btn btn-primary'>
//                       Save
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//         <table className='table table-hover'>
//           <thead style={{ textAlign: 'center' }}>
//             <tr>
//               <th scope='col'>#</th>
//               <th scope='col'>Image</th>
//               <th scope='col'>Name</th>
//               <th scope='col'>Actions</th>
//             </tr>
//           </thead>
//           <tbody style={{ textAlign: 'center' }}>
//             {products.map((val, index) => (
//               <tr>
//                 <th scope='row'>{index + 1} </th>
//                 <td>
//                   <img src={val.image[0]} alt='product-img' width='20%' />
//                 </td>
//                 <td style={{ verticalAlign: 'middle' }}>{val.name}</td>
//                 <td
//                   style={{
//                     display: 'grid',
//                     gridTemplateColumns: '50% 50%',
//                     verticalAlign: 'middle',
//                   }}
//                 >
//                   <button
//                     className='btn btn-warning me-3'
//                     data-bs-toggle='modal'
//                     data-bs-target='#editModal'
//                     onClick={() => setSelectedProduct(val)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className='btn btn-danger'
//                     data-bs-toggle='modal'
//                     data-bs-target='#deleteModal'
//                     onClick={() => setSelectedProduct(val)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {/* <!-- Edit Modal --> */}
//             <div
//               className='modal fade'
//               id='editModal'
//               tabindex='-1'
//               aria-labelledby='editModalLabel'
//               aria-hidden='true'
//             >
//               <div className='modal-dialog'>
//                 <div className='modal-content'>
//                   <div className='modal-header'>
//                     <h5 className='modal-title' id='exampleModalLabel'>
//                       Update product {selectedProduct.name}
//                     </h5>
//                     <button
//                       type='button'
//                       className='btn-close'
//                       data-bs-dismiss='modal'
//                       aria-label='Close'
//                     ></button>
//                   </div>
//                   <form onSubmit={handleEditProduct}>
//                     <div className='modal-body'>
//                       <div className='form-floating mb-3'>
//                         <input
//                           type='text'
//                           className='form-control'
//                           id='floatingInput'
//                           value={selectedProduct.name}
//                           onChange={(e) => setProName(e.target.value)}
//                         />
//                         <label for='floatingInput'>Name</label>
//                       </div>
//                       <div className='form-floating mb-3'>
//                         <input
//                           type='text'
//                           className='form-control'
//                           id='floatingName'
//                           value={selectedProduct.code}
//                           onChange={(e) => setProCode(e.target.value)}
//                         />
//                         <label for='floatingName'>Code</label>
//                       </div>
//                       <div className='form-floating mb-3'>
//                         <input
//                           type='number'
//                           className='form-control'
//                           id='floatingPrice'
//                           value={selectedProduct.price}
//                           onChange={(e) => setProPrice(e.target.value)}
//                         />
//                         <label for='floatingPrice'>Price</label>
//                       </div>
//                       <div className='form-floating mb-3'>
//                         <select
//                           id='floatingBrand'
//                           name='floatingBrand'
//                           className='form-control'
//                           value={selectedProduct.brand}
//                           onChange={(e) => {
//                             const selectedBrand = e.target.value
//                             setProBrand(selectedBrand)
//                           }}
//                         >
//                           <option selected>
//                             <p className='text-muted'>Select brand</p>
//                           </option>
//                           {brand.map((unit) => (
//                             <option value={unit.value}>{unit.value}</option>
//                           ))}
//                         </select>
//                         <label for='floatingBrand'>Brand</label>
//                       </div>
//                       <div className='form-floating mb-3'>
//                         <label>Image</label>
//                         <br />
//                         <div className='images' id='floatingImage'>
//                           {selectedProduct.image
//                             ? selectedProduct.image.map((url) => (
//                                 <div className='imagewrap'>
//                                   <img src={url}></img>
//                                   <button className='btn'>
//                                     <i class='fa fa-close'></i>
//                                   </button>
//                                 </div>
//                               ))
//                             : '?'}
//                         </div>
//                       </div>
//                     </div>
//                     <div className='modal-footer'>
//                       <button
//                         type='button'
//                         className='btn btn-secondary'
//                         data-bs-dismiss='modal'
//                       >
//                         Close
//                       </button>
//                       <button type='submit' className='btn btn-primary'>
//                         Save
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>

//             {/* <!-- Delete Modal --> */}
//             <div
//               className='modal fade'
//               id='deleteModal'
//               tabindex='-1'
//               aria-labelledby='deleteModalLabel'
//               aria-hidden='true'
//             >
//               <div className='modal-dialog'>
//                 <div className='modal-content'>
//                   <div className='modal-header'>
//                     <h5 className='modal-title' id='deleteModalLabel'>
//                       You want to delete
//                       {selectedProduct.name ? selectedProduct.name : '?'}
//                     </h5>
//                     <button
//                       type='button'
//                       className='btn-close'
//                       data-bs-dismiss='modal'
//                       aria-label='Close'
//                     ></button>
//                   </div>
//                   <div className='modal-body'>
//                     <div>
//                       <p>{selectedProduct.name ? selectedProduct.name : '?'}</p>
//                     </div>
//                     <div>
//                       <p>
//                         {selectedProduct.price ? selectedProduct.price : '?'}
//                       </p>
//                     </div>
//                   </div>
//                   <div className='modal-footer'>
//                     <button
//                       type='button'
//                       className='btn btn-secondary'
//                       data-bs-dismiss='modal'
//                     >
//                       Close
//                     </button>
//                     <button
//                       type='button'
//                       className='btn btn-danger'
//                       onClick={handleDeleteProduct}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </tbody>
//         </table>
//       </section>
//     </Wrapper>
//     </>
//   );
// }

// const Wrapper = styled.div`
//   margin: 88px;
//   .alert {
//     margin-top: 3rem;
//   }
//   .imagewrap {
//     display: inline-block;
//     position: relative;
//     width: 33.33%;
//     float: left;
//   }
//   .imagewrap img {
//     width: 100%;
//     height: auto;
//   }
//   .imagewrap button {
//     position: absolute;
//     top: 0;
//     right: 0;
//   }
//   .modal-footer {
//     clear: both;
//   }
//   @media (min-width: 992px) {
//     p{
//       margin-bottom: 0;
//     }
    
//   }
// `;

// export default Dashboard;
