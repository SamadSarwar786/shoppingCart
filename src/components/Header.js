import {
  Badge,
  Button,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { CartState } from "../Context/Context";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();
  return (
    <Navbar className="header" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/">Shopping Cart</Link>
      </Navbar.Brand>
      <Navbar.Text className="search">
        <FormControl
          style={{ width: 500 }}
          placeholder="Search a product"
          className="m-auto"
          onChange={(e) =>
            productDispatch({
              type: "FILTER_BY_SEARCH",
              payload: e.target.value,
            })
          }
        />
      </Navbar.Text>
      <Nav>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-menu-align-end">
            <FaShoppingCart color="white" fontSize="25px" />
            <Badge>{cart.length}</Badge>
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ minWidth: "370px" }} align="end">
            {cart.length > 0 ? (
              <>
                {cart.map((product) => (
                  <span key={product.id} className="cartItem">
                    <img
                      src={product.image}
                      className="cartItemImage"
                      alt={product.name}
                    />
                    <div className="cartItemDetail">
                      <span>{product.name}</span>
                      <span>{product.price.split(".")[0]}</span>
                    </div>
                    <AiFillDelete
                      fontSize="20px"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: product,
                        });
                      }}
                    />
                  </span>
                ))}
                <Link to="/cart">
                  <Button style={{ width: "95%", margin: "0 10px" }}>
                    Go To Cart
                  </Button>
                </Link>
              </>
            ) : (
              <span style={{ padding: "10px" }}>Cart is Empty!</span>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default Header;
