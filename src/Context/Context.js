import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { faker } from "@faker-js/faker";
import { cartReducer, productReducer } from "./Reducer";
import axios from "axios";

const Cart = createContext();

faker.seed(99);

const Context = ({ children }) => {
  const [imgArr, setimgArr] = useState([]);
  useEffect(() => {
    axios
      .get("https://picsum.photos/v2/list")
      .then((response) => setimgArr(response.data));
  }, []);

  // console.log(imgArr.length);

  const products = [...Array(20)].map(() => {
    return {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      // image: faker.image.cats(50, 50, true),
      image: imgArr.length > 0 ? imgArr[Math.floor(Math.random() * 30)] : "",

      inStock: faker.random.numeric(1, {
        allowLeadingZeros: true,
        bannedDigits: ["5", "8", "9", "6"],
      }),
      fastDelivery: faker.datatype.boolean(),
      ratings: faker.random.numeric(1, {
        bannedDigits: ["0", "6", "7", "8", "9"],
      }),
    };
  });
  // console.log(products);

  const initialValue = {
    cart: [],
    products: products,
  };
  const [state, dispatch] = useReducer(cartReducer, initialValue);
  useEffect(() => {
    dispatch({
      type: "UPDATE",
      payload: initialValue,
    });
  }, [imgArr.length]);
  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    searchQuery: "",
    byRating: 0,
  });

  return (
    <Cart.Provider value={{ state, dispatch, productDispatch, productState }}>
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
