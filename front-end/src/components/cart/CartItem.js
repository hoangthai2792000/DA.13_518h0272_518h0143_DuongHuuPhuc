import { Button, Stack } from "react-bootstrap";
import { useGlobalContext } from "../../context/context";

export function CartItem({ _id, quantity, hiddenBtn }) {
  const {
    removeFromCart,
    products,
    decreaseCartQuantity,
    increaseCartQuantity,
  } = useGlobalContext();
  console.log(hiddenBtn);
  const item = products.find((i) => i._id === _id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.image[0]}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
        alt={item.name}
      />
      <div className="me-auto">
        <div>
          {item.name}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "1.55rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {item.price}
        </div>
      </div>
      <div> {item.price * quantity}</div>
      {!hiddenBtn ? (
        <>
          <div
            className="d-flex align-items-center flex-column"
            style={{ gap: ".5rem" }}
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: ".5rem" }}
            >
              <Button onClick={() => decreaseCartQuantity(_id)}>-</Button>

              <Button onClick={() => increaseCartQuantity(_id)}>+</Button>
            </div>
          </div>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => removeFromCart(item._id)}
          >
            &times;
          </Button>
        </>
      ) : null}
    </Stack>
  );
}
