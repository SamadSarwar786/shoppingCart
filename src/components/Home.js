import { CartState } from "../Context/Context";
import ProductList from "./ProductList";
import Filters from "./Filters";
import { useEffect } from "react";

const Home = () => {
  
  const {
    state: { products },
    productState: { byStock, byFastDelivery, sort, searchQuery, byRating },
  } = CartState();

  function transFormedProducts() {
    let finalProducts = products;

    if (sort) {
      finalProducts = finalProducts.sort((a, b) =>
        sort === "lowtohigh" ? a.price - b.price : b.price - a.price
      );
    }
    if (!byStock) {
      finalProducts = finalProducts.filter((prod) => prod.inStock > 0);
    }
    if (byFastDelivery) {
      finalProducts = finalProducts.filter((prod) => prod.fastDelivery);
    }
    if (byRating) {
      finalProducts = finalProducts.filter((prod) => prod.ratings >= byRating);
    }
    if (searchQuery) {
      finalProducts = finalProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return finalProducts;
  }
  return (
    <div className="home">
      <Filters />
      <ProductList products={transFormedProducts()} />
    </div>
  );
};

export default Home;
