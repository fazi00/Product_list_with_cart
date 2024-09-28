import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FiPlus, FiMinus } from "react-icons/fi";
import data from "../../../public/assets/data/data.json";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";
import "./card.css";

interface Product {
  name: string;
  image: string;
  price: number;
}

const Card: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems); // Moved outside

  const handleAddToCart = (item: Product) => {
    dispatch(
      addToCart({
        name: item.name,
        price: item.price,
        quantity: 1,
        totalPrice: item.price,
        image: item.image,
      })
    );
  };

  const handleIncrementQuantity = (name: string) => {
    dispatch(incrementQuantity(name));
  };

  const handleDecrementQuantity = (name: string) => {
    const cartItem = cartItems.find((item) => item.name === name);
    if (cartItem && cartItem.quantity > 1) {
      dispatch(decrementQuantity(name));
    } else {
      dispatch(removeFromCart(name));
    }
  };

  return (
    <section>
      <div className="container">
        <div className="card-container">
          {data.map((item) => {
            const cartItem = cartItems.find(
              (cartItem) => cartItem.name === item.name
            ); // Look for the cart item

            return (
              <div className="card" key={item.name}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={`${cartItem ? "highlight-border" : ""}`}
                />

                {!cartItem ? (
                  <button className="btn" onClick={() => handleAddToCart(item)}>
                    <span className="icon">
                      <MdOutlineAddShoppingCart />
                    </span>
                    <span className="text">Add to Cart</span>
                  </button>
                ) : (
                  <div className="btn quantity-container">
                    <button
                      className="increment"
                      onClick={() => handleIncrementQuantity(item.name)}
                    >
                      <span>
                        <FiPlus />
                      </span>
                    </button>
                    <h4 className="quantity">{cartItem?.quantity}</h4>
                    <button
                      className="decrement"
                      onClick={() => handleDecrementQuantity(item.name)}
                    >
                      <span>
                        <FiMinus />
                      </span>
                    </button>
                  </div>
                )}

                <div className="content">
                  <h4>{item.category}</h4>
                  <h2>{item.name}</h2>
                  <p>${item.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Card;
