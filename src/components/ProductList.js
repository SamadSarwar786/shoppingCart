import React from "react";
import SingleProduct from "./SingleProduct";

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <SingleProduct key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
