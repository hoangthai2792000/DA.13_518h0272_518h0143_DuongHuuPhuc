import React, { useState } from "react";
import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useGlobalContext } from "../../context/context";
import { CartItem } from "./CartItem";
import { Link, useHistory } from "react-router-dom";

const ShoppingCart = ({ isOpen }) => {
  const history = useHistory();
  const [shippingFee, setShippingFee] = useState(30000);
  const { products, closeCart, cartItems, clearCart, cartQuantity } =
    useGlobalContext();
  console.log(cartItems);

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item._id} {...item} />
          ))}
          {cartQuantity > 0 ? (
            <>
              <hr />
              <div className="mt-5">
                <p>
                  Shipping fee: <span>{shippingFee}</span>
                </p>
              </div>
              <div className="ms-auto fw-bold fs-5">
                <p>
                  Total:
                  <span className="ms-2">
                    {cartItems.reduce((total, cartItem) => {
                      const item = products.find((i) => i._id === cartItem._id);
                      return (
                        total +
                        (item?.price || 0) * cartItem.quantity +
                        shippingFee
                      );
                    }, 0)}
                  </span>
                </p>
              </div>
              <Button
                className="fw-bold"
                onClick={() => history.push("/checkout")}
              >
                PROCEED TO CHECKOUT
              </Button>
              <Button className="fw-bold" onClick={() => clearCart()}>
                Clear cart
              </Button>
            </>
          ) : (
            <div style={{textAlign:"center"}}>
              <h2 style={{marginBottom:"1rem", textTransform:"none"}}>Your cart is empty</h2>
            </div>
          )}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default ShoppingCart;
