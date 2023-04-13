import React from "react";
import { Button, Card, CardImg } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../Context/Context";

const SingleProduct = ({ product }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  // console.log(product.image)
  return (
    <Card className="product">
      <CardImg
        variant="top"
        style={{height:200}}
        src={product.image.download_url}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle>
          <span>{product.price.split(".")[0]}</span>
          {product.fastDelivery ? (
            <div>Fast Delivery</div>
          ) : (
            <div>4 Days Delivery</div>
          )}
          <Rating rating={product.ratings} />
        </Card.Subtitle>
        {cart.some((p) => p.id === product.id) ? (
          <Button
            onClick={() =>
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: product,
              })
            }
            variant="danger"
          >
            Remove from Cart
          </Button>
        ) : (
          <Button
            onClick={() =>
              dispatch({
                type: "ADD_TO_CART",
                payload: product,
              })
            }
            disabled={product.inStock === 0}
          >
            {product.inStock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default SingleProduct;
