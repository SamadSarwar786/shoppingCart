import { Button, FormCheck } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../Context/Context";

const Filters = () => {
  const {
    productState: { byStock, byFastDelivery, sort, searchQuery, byRating },
    productDispatch,
  } = CartState();
  // console.log(byStock, byFastDelivery, sort, searchQuery, byRating);
  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <FormCheck
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id="inline-1"
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowtohigh",
            })
          }
          checked={sort === "lowtohigh" ? true : false}
        />
      </span>
      <span>
        <FormCheck
          inline
          label="Descending"
          name="group1"
          type="radio"
          id="inline-2"
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "hightolow",
            })
          }
          checked={sort === "hightolow" ? true : false}
        />
      </span>
      <span>
        <FormCheck
          inline
          label="Include out of stock"
          name="group1"
          type="checkbox"
          id="inline-3"
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_STOCK",
            })
          }
          checked={byStock}
        />
      </span>
      <span>
        <FormCheck
          inline
          label="Fast Delivery Only"
          name="group1"
          type="checkbox"
          id="inline-4"
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_FASTDELIVERY",
            })
          }
          checked={byFastDelivery}
        />
      </span>
      <span>
        <label style={{ paddingRight: "5px" }}>Rating : </label>
        <Rating
          rating={byRating}
          onClick={(index) =>
            productDispatch({
              type: "FILTER_BY_RATING",
              payload: index + 1,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button
        variant="light"
        onClick={() =>
          productDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filter
      </Button>
    </div>
  );
};

export default Filters;
