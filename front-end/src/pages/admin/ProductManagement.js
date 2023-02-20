import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PageHero from '../../components/PageHero'

const ProductManagement = () => {
  const [products, setProducts] = useState()
  const [selectedProduct, setSelectedProduct] = useState([])

  const [proName, setProName] = useState()
  const [proPrice, setProPrice] = useState()
  const [proBrand, setProBrand] = useState()
  const [proCode, setProCode] = useState()
  const [proImage, setProImage] = useState()

  const brand = [
    { key: 1, value: 'Nike' },
    { key: 2, value: 'Adidas' },
    { key: 3, value: 'Converse' },
    { key: 4, value: 'Vans' },
  ]

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/v1/product')
      .then((response) => {
        setProducts(response.data.products)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleUploadImage = (e) => {
    e.preventDefault()

    console.log(proImage)
  }

  const handleOnchange = (e) => {
    e.preventDefault()

    // console.log(e.target.files)
    setProImage(e.target.files)
    console.log(proImage)
  }

  const handleEditProduct = (e) => {
    e.preventDefault()
    const url = `http://localhost:5000/api/v1/product/${selectedProduct._id}`
    axios
      .patch(url, {
        name: proName,
        code: proCode,
        price: proPrice,
        brand: proBrand,
        newImages: proImage,
      })
      .then((response) => {
        console.log(response)
        window.location.reload(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleDeleteProduct = (e) => {
    e.preventDefault()
    const url = `http://localhost:5000/api/v1/product/${selectedProduct._id}`
    axios
      .delete(url)
      .then((response) => {
        console.log(response)
        window.location.reload(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleAddProduct = (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:5000/api/v1/product/', {
        name: proName,
        code: proCode,
        price: proPrice,
        brand: proBrand,
        image: proImage,
      })
      .then((response) => {
        console.log(response)
        window.location.reload(false)
      })
      .catch((error) => console.log(error))
  }

  if (!products) return null
  console.log(products)
  console.log(selectedProduct)
  return (
    <Wrapper>
      <PageHero title='products-management' />
      <section className='section section-center page'>
        <button
          className='btn btn-primary'
          data-bs-toggle='modal'
          data-bs-target='#addModal'
        >
          Add new product
        </button>
        <div>
          {/* <!-- Modal --> */}
          <div
            className='modal fade'
            id='addModal'
            tabindex='-1'
            aria-labelledby='addModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLabel'>
                    Add new product
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <form onSubmit={handleAddProduct}>
                  <div className='modal-body'>
                    <div className='form-floating mb-3'>
                      <input
                        type='text'
                        className='form-control'
                        id='floatingInput'
                        onChange={(e) => setProName(e.target.value)}
                      />
                      <label for='floatingInput'>Name</label>
                    </div>
                    <div className='form-floating mb-3'>
                      <input
                        type='text'
                        className='form-control'
                        id='floatingName'
                        onChange={(e) => setProCode(e.target.value)}
                      />
                      <label for='floatingName'>Code</label>
                    </div>
                    <div className='form-floating mb-3'>
                      <input
                        type='number'
                        className='form-control'
                        id='floatingPrice'
                        onChange={(e) => setProPrice(e.target.value)}
                      />
                      <label for='floatingPrice'>Price</label>
                    </div>
                    <div className='form-floating mb-3'>
                      <select
                        id='floatingBrand'
                        name='floatingBrand'
                        className='form-control'
                        onChange={(e) => {
                          const selectedBrand = e.target.value
                          setProBrand(selectedBrand)
                        }}
                      >
                        <option selected>
                          <p className='text-muted'>Select brand</p>
                        </option>
                        {brand.map((unit) => (
                          <option value={unit.value}>{unit.value}</option>
                        ))}
                      </select>
                      <label for='floatingBrand'>Brand</label>
                    </div>

                    <div className='form-floating mb-3'>
                      <form onSubmit={handleUploadImage}>
                        <div className='form-control'>
                          {/* search input */}
                          <input
                            type='file'
                            name='file'
                            id='file'
                            multiple
                            onChange={handleOnchange}
                          />

                          <button type='submit' className='btn btn-primary'>
                            Upload
                          </button>
                        </div>
                        {/* end search input */}
                      </form>
                    </div>
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
        </div>
        <table className='table table-hover'>
          <thead style={{ textAlign: 'center' }}>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Image</th>
              <th scope='col'>Name</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: 'center' }}>
            {products.map((val, index) => (
              <tr>
                <th scope='row'>{index + 1} </th>
                <td>
                  <img src={val.image[0]} alt='product-img' width='20%' />
                </td>
                <td style={{ verticalAlign: 'middle' }}>{val.name}</td>
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
                    onClick={() => setSelectedProduct(val)}
                  >
                    Edit
                  </button>
                  <button
                    className='btn btn-danger'
                    data-bs-toggle='modal'
                    data-bs-target='#deleteModal'
                    onClick={() => setSelectedProduct(val)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {/* <!-- Edit Modal --> */}
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
                      Update product {selectedProduct.name}
                    </h5>
                    <button
                      type='button'
                      className='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    ></button>
                  </div>
                  <form onSubmit={handleEditProduct}>
                    <div className='modal-body'>
                      <div className='form-floating mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          id='floatingInput'
                          onChange={(e) => setProName(e.target.value)}
                        />
                        <label for='floatingInput'>Name</label>
                      </div>
                      <div className='form-floating mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          id='floatingName'
                          onChange={(e) => setProCode(e.target.value)}
                        />
                        <label for='floatingName'>Code</label>
                      </div>
                      <div className='form-floating mb-3'>
                        <input
                          type='number'
                          className='form-control'
                          id='floatingPrice'
                          onChange={(e) => setProPrice(e.target.value)}
                        />
                        <label for='floatingPrice'>Price</label>
                      </div>
                      <div className='form-floating mb-3'>
                        <select
                          id='floatingBrand'
                          name='floatingBrand'
                          className='form-control'
                          onChange={(e) => {
                            const selectedBrand = e.target.value
                            setProBrand(selectedBrand)
                          }}
                        >
                          <option selected>
                            <p className='text-muted'>Select brand</p>
                          </option>
                          {brand.map((unit) => (
                            <option value={unit.value}>{unit.value}</option>
                          ))}
                        </select>
                        <label for='floatingBrand'>Brand</label>
                      </div>
                      <div className='form-floating mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          id='floatingImage'
                          onChange={(e) => setProImage(e.target.value)}
                        />
                        <label for='floatingImage'>Image</label>
                      </div>
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

            {/* <!-- Delete Modal --> */}
            <div
              className='modal fade'
              id='deleteModal'
              tabindex='-1'
              aria-labelledby='deleteModalLabel'
              aria-hidden='true'
            >
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='deleteModalLabel'>
                      You want to delete
                      {selectedProduct.name ? selectedProduct.name : '?'}
                    </h5>
                    <button
                      type='button'
                      className='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    ></button>
                  </div>
                  <div className='modal-body'>
                    <div>
                      <p>{selectedProduct.name ? selectedProduct.name : '?'}</p>
                    </div>
                    <div>
                      <p>
                        {selectedProduct.price ? selectedProduct.price : '?'}
                      </p>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-bs-dismiss='modal'
                    >
                      Close
                    </button>
                    <button
                      type='button'
                      className='btn btn-danger'
                      onClick={handleDeleteProduct}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </tbody>
        </table>
      </section>
    </Wrapper>
  )
}
const Wrapper = styled.div``

export default ProductManagement
