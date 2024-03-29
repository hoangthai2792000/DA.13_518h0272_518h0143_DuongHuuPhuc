import axios from 'axios'

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PageHero from '../../components/PageHero'
import useLocalState from '../../utils/localState'

const ProductManagement = () => {
  const [products, setProducts] = useState()
  const [selectedProduct, setSelectedProduct] = useState([])

  const [proName, setProName] = useState()
  const [proPrice, setProPrice] = useState()
  const [proBrand, setProBrand] = useState()
  const [proCode, setProCode] = useState()
  const [proImage, setProImage] = useState([])

  const [imageUrls, setImageUrls] = useState([])
  const [tmpImgs, setTmpImgs] = useState([])

  const brand = [
    { key: 1, value: 'Nike' },
    { key: 2, value: 'Adidas' },
    { key: 3, value: 'Converse' },
    { key: 4, value: 'Vans' },
  ]

  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState()

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
    hideAlert()
    setLoading(true)

    // console.log(proImage)

    if (!proCode) {
      showAlert({ text: 'Please provide product code first' })
      setTimeout(() => hideAlert(), 3000)
    }

    if (!proImage || proImage.length < 1) {
      showAlert({ text: 'Please choose images to upload' })
      setTimeout(() => hideAlert(), 3000)
    }

    let data = new FormData()

    Array.from(proImage).forEach((img) => {
      data.append('image', img)
    })

    const instance = axios.create({
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    instance
      .post(
        `http://localhost:5000/api/v1/product/upload-product-image/${proCode}`,
        data
      )
      .then((response) => {
        // console.log(response.data)
        setImageUrls(response.data.result)
        showAlert({
          text: 'Upload Image Successfully',
          type: 'success',
        })
        setTimeout(() => hideAlert(), 3000)
        setLoading(false)
      })
      .catch((error) => {
        showAlert({ text: error.response.data.msg })
        setTimeout(() => hideAlert(), 3000)
        setLoading(false)
      })
  }

  const handleEditProduct = (e) => {
    e.preventDefault()
    hideAlert()
    setLoading(true)
    const url = `http://localhost:5000/api/v1/product/${selectedProduct._id}`
    const instance = axios.create({
      withCredentials: true,
    })
    instance
      .patch(url, {
        name: proName,
        code: proCode,
        price: proPrice,
        brand: proBrand,
      })
      .then((response) => {
        showAlert({
          text: 'Update Product Successfully',
          type: 'success',
        })
        setTimeout(() => hideAlert(), 3000)
        setLoading(false)
        window.location.reload(false)
      })
      .catch((error) => {
        showAlert({ text: error.response.data.msg })
        setTimeout(() => hideAlert(), 3000)
        setLoading(false)
      })
  }

  const handleDeleteProduct = (e) => {
    e.preventDefault()
    // console.log(selectedProduct.id)

    const url = `http://localhost:5000/api/v1/product/${selectedProduct.id}`

    const instance = axios.create({
      withCredentials: true,
    })

    instance
      .delete(url)
      .then((response) => {
        // console.log(response.data)
        showAlert({
          text: 'Upload Image Successfully',
          type: 'success',
        })
        setTimeout(() => hideAlert(), 3000)
        window.location.reload(false)
      })
      .catch((error) => {
        showAlert({ text: error.response.data.msg })
        setTimeout(() => hideAlert(), 3000)
        // console.log(error)
      })
  }

  const handleAddProduct = (e) => {
    e.preventDefault()
    hideAlert()
    setLoading(true)

    if (!imageUrls || imageUrls.length < 1) {
      showAlert({ text: 'Please upload product images' })
      setTimeout(() => hideAlert(), 3000)
    }

    const instance = axios.create({
      withCredentials: true,
    })

    instance
      .post('http://localhost:5000/api/v1/product', {
        name: proName,
        code: proCode,
        price: proPrice,
        brand: proBrand,
        image: imageUrls,
      })
      .then((response) => {
        showAlert({
          text: 'Add New Product Successfully',
          type: 'success',
        })
        setTimeout(() => hideAlert(), 3000)
        setLoading(false)
        window.location.reload(false)
      })
      .catch((error) => {
        showAlert({ text: error.response.data.msg })
        setTimeout(() => hideAlert(), 3000)
        setLoading(false)
      })
  }

  const handleDeleteImage = (e, imgurl, productCode) => {
    e.preventDefault()
    hideAlert()
    setLoading(true)

    const instance = axios.create({
      withCredentials: true,
    })

    let url = `http://localhost:5000/api/v1/product/delete-image/${productCode}`
    let data = { imageURL: imgurl }

    instance
      .delete(url, { data: data })
      .then((resp) => {
        // console.log(resp.data.product)
        setSelectedProduct(resp.data.product)
        setTimeout(() => hideAlert(), 3000)
        setLoading(false)
      })
      .catch((error) => {
        showAlert({ text: error.response.data.msg })
        setTimeout(() => hideAlert(), 3000)
        setLoading(false)
      })

    console.log(url, productCode)
  }

  if (!products) return null
  // console.log(products)
  // console.log(selectedProduct)
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
                <form
                  onSubmit={handleAddProduct}
                  className={loading ? 'form form-loading' : 'form'}
                >
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
                      <form>
                        <div className='form-control'>
                          <input
                            type='file'
                            name='image'
                            id='image'
                            multiple
                            onChange={(e) => setProImage(e.target.files)}
                          />

                          <button
                            type='submit'
                            className='btn btn-primary'
                            onClick={handleUploadImage}
                          >
                            Upload
                          </button>
                        </div>
                      </form>

                      {alert.show && (
                        <div className={`alert alert-${alert.type}`}>
                          {alert.text}
                        </div>
                      )}
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
                    onClick={() => {
                      setSelectedProduct(val)
                      setTmpImgs(selectedProduct.image)
                    }}
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
                  <form
                    onSubmit={handleEditProduct}
                    className={loading ? 'form form-loading' : 'form'}
                  >
                    <div className='modal-body'>
                      <div className='form-floating mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          id='floatingInput'
                          defaultValue={selectedProduct.name}
                          onChange={(e) => setProName(e.target.value)}
                        />
                        <label for='floatingInput'>Name</label>
                      </div>
                      <div className='form-floating mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          id='floatingName'
                          disabled
                          value={selectedProduct.code}
                          onChange={(e) => setProCode(e.target.value)}
                        />
                        <label for='floatingName'>Code</label>
                      </div>
                      <div className='form-floating mb-3'>
                        <input
                          type='number'
                          className='form-control'
                          id='floatingPrice'
                          defaultValue={selectedProduct.price}
                          onChange={(e) => setProPrice(e.target.value)}
                        />
                        <label for='floatingPrice'>Price</label>
                      </div>
                      <div className='form-floating mb-3'>
                        <select
                          id='floatingBrand'
                          name='floatingBrand'
                          className='form-control'
                          value={selectedProduct.brand}
                          disabled
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
                        <label>Image</label>
                        <br />
                        <div className='images' id='floatingImage'>
                          {selectedProduct.image
                            ? selectedProduct.image.map((url) => (
                                <div className='imagewrap'>
                                  <img src={url}></img>
                                  <button
                                    className='btn'
                                    onClick={(e) =>
                                      handleDeleteImage(
                                        e,
                                        url,
                                        selectedProduct.code
                                      )
                                    }
                                  >
                                    <i class='fa fa-close'></i>
                                  </button>
                                </div>
                              ))
                            : '?'}
                        </div>
                      </div>
                    </div>
                    {alert.show && (
                      <div className={`alert alert-${alert.type}`}>
                        {alert.text}
                      </div>
                    )}
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
const Wrapper = styled.div`
  .alert {
    margin-top: 3rem;
  }
  .imagewrap {
    display: inline-block;
    position: relative;
    width: 33.33%;
    float: left;
  }
  .imagewrap img {
    width: 100%;
    height: auto;
  }
  .imagewrap button {
    position: absolute;
    top: 0;
    right: 0;
  }
  .modal-footer alert {
    clear: both;
  }
`

export default ProductManagement
