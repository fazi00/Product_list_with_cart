import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FiPlus, FiMinus } from "react-icons/fi";
import data from "../../assets/data/data.json";

import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice.ts";
import "./card.css";

const Card = () => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    
  };
  const handleRemoveFromCart = () => {
   
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="card-container">
            {data.map((item, index) => (
              <div className="card" key={index}>
                <img src={item.image.desktop} alt={item.name} />

                <button className="btn">
                  <span className="icon">
                    <MdOutlineAddShoppingCart />
                  </span>
                  <span className="text">Add to Cart</span>

                  {/* Initially hidden, displayed on Hover */}
                  <div className="svg-container">
                    <button
                      className="increment"
                      onClick={() => handleAddToCart}
                    >
                      <span>
                        <FiPlus />
                      </span>
                    </button>
                    <h4 className="quantity">1</h4>
                    <button
                      className="decrement"
                      onClick={() => handleRemoveFromCart}
                    >
                      <span>
                        <FiMinus />
                      </span>
                    </button>
                  </div>
                </button>

                <div className="content">
                  <h4>{item.category}</h4>
                  <h2>{item.name}</h2>
                  <p>${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Card;
