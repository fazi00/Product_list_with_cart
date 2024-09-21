import { MdOutlineAddShoppingCart } from "react-icons/md";
import data from "../../assets/data/data.json";
import "./card.css";

const Card = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="card-container">
            {data.map((item, index) => (
              <div className="card" key={index}>
                <img src={item.image.desktop} alt={item.name} />

                <button className="btn">
                  <span>
                    <MdOutlineAddShoppingCart />
                  </span>
                  Add to Cart
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
