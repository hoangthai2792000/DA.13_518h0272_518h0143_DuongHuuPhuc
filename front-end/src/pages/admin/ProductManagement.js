import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductManagement = () => {
  const [products, setProducts] = useState();
  const [selectedProduct, setSelectedProduct] = useState([]);

  const [proName, setProName] = useState();
  const [proPrice, setProPrice] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/product")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditProduct = () => {
    const url = `http://localhost:5000/api/v1/product/${selectedProduct._id}`;
    axios
      .patch(url, {
        name: proName,
        price: proPrice,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteProduct = () => {
    const url = `http://localhost:5000/api/v1/product/${selectedProduct._id}`;
    axios
      .delete(url)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (!products) return null;
  console.log(products);
  console.log(selectedProduct);
  return (
    <>
      <div>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
        >
          Add new product
        </button>
        {/* <!-- Edit Modal --> */}
        <div
          className="modal fade"
          id="addModal"
          tabindex="-1"
          aria-labelledby="addModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalLabel">
                  You want to add new product
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div>
                  <label htmlFor="name">Name:</label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Enter product's name"
                    onChange={(e) => setProName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="price">Price:</label>
                  <input
                    id="price"
                    name="price"
                    placeholder="Enter product's price"
                    onChange={(e) => setProPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((val, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>
                <img src={val.image[0]} alt="product-img" />
              </td>
              <td>{val.name}</td>
              <td>
                <button
                  className="btn btn-warning me-3"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={() => setSelectedProduct(val)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                  onClick={() => setSelectedProduct(val)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {/* <!-- Edit Modal --> */}
          <div
            className="modal fade"
            id="editModal"
            tabindex="-1"
            aria-labelledby="editModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editModalLabel">
                    You want to edit{" "}
                    {selectedProduct.name ? selectedProduct.name : "?"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div>
                    <p>{selectedProduct.name ? selectedProduct.name : "?"}</p>
                    <input
                      placeholder={
                        selectedProduct.name ? selectedProduct.name : "?"
                      }
                      onChange={(e) => setProName(e.target.value)}
                    />
                  </div>
                  <div>
                    <p>{selectedProduct.price ? selectedProduct.price : "?"}</p>
                    <input
                      placeholder={
                        selectedProduct.price ? selectedProduct.price : "?"
                      }
                      onChange={(e) => setProPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEditProduct}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Delete Modal --> */}
          <div
            className="modal fade"
            id="deleteModal"
            tabindex="-1"
            aria-labelledby="deleteModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteModalLabel">
                    You want to delete
                    {selectedProduct.name ? selectedProduct.name : "?"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div>
                    <p>{selectedProduct.name ? selectedProduct.name : "?"}</p>
                  </div>
                  <div>
                    <p>{selectedProduct.price ? selectedProduct.price : "?"}</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
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
    </>
  );
};

export default ProductManagement;
