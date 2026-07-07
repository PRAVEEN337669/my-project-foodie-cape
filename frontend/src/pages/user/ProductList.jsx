import React, {
  useEffect,
  useState,
  useContext,
  useRef
} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

import "../user/productlist.css";
import logo from "../../assets/foodie cape logo.png";

function ProductList() {

  const navigate = useNavigate();

  const { addToCart, cart } = useContext(CartContext);

  const cartRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userRatings, setUserRatings] = useState({});
  const [flyingItem, setFlyingItem] = useState(null);

  const backendURL =
    import.meta.env.VITE_API_URL ||
    "https://my-project-foodie-cape.onrender.com";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {

      const res = await axios.get(
        `${backendURL}/api/food`
      );

      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        setProducts([]);
      }

    } catch (err) {

      console.error(err);
      setProducts([]);

    }
  };

  const handleRating = (id, rating) => {

    setUserRatings((prev) => ({
      ...prev,
      [id]: rating,
    }));

  };

  // ------------------------------
  // Swiggy Style Flying Animation
  // ------------------------------

  const triggerFlyAnimation = (e, product) => {

    const start = e.currentTarget.getBoundingClientRect();

    if (!cartRef.current) return;

const cart = cartRef.current.getBoundingClientRect();

    const image =
      product.image &&
      product.image.startsWith("http")
        ? product.image
        : `${backendURL}/uploads/${product.image || "default.jpg"}`;

    setFlyingItem({

      image,

      startX: start.left,

      startY: start.top,

      endX: cart.left,

      endY: cart.top,

    });

   addToCart(product);

cartRef.current.classList.add("cart-bounce");

setTimeout(() => {

    cartRef.current.classList.remove("cart-bounce");

},450);

setTimeout(() => {

    setFlyingItem(null);

},1000);
  };

  const filteredProducts = products.filter((item) =>
    item.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  return (
  <div className="product-list-page">

    {/* NAVBAR */}
    <nav className="custom-navbar">

      <div className="nav-logo">
        <img
          src={logo}
          alt="Foodie Cape"
          className="brand-logo"
        />

        <span className="brand-name">
          Foodie <span>Cape</span>
        </span>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search delicious food..."
          className="search-input"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>

      <div className="nav-links">

        <span
          className="link-item"
          onClick={() => navigate("/")}
        >
          Home
        </span>

        <div
          className="profile-nav-item"
          onClick={() => navigate("/profile")}
        >
          👤
        </div>

        <div
          ref={cartRef}
          className={`cart-icon-wrapper ${
            flyingItem ? "cart-bounce" : ""
          }`}
          onClick={() => navigate("/cart")}
        >
          🛒

          <span
className={`badge ${
flyingItem ? "badge-pop" : ""
}`}
key={cart.length}
>
            {cart.length}
          </span>

        </div>

      </div>

    </nav>

    {/* Flying Image */}

    {flyingItem && (

      <img
        src={flyingItem.image}
        alt="Flying Food"
        className="flying-food"
        style={{
          left: flyingItem.startX,
          top: flyingItem.startY,

          "--end-x": `${flyingItem.endX - flyingItem.startX}px`,
          "--end-y": `${flyingItem.endY - flyingItem.startY}px`,
        }}
      />

    )}

    <div className="content-container">

      <h2 className="menu-header">
        Our Delicious Menu
      </h2>

      <div className="product-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((p) => (

            <div
              className="food-card-modern"
              key={p._id}
            >

              <div className="img-wrapper">
<img
src={
p.image?.startsWith("http")
? p.image
: `${backendURL}/uploads/${p.image || "default.jpg"}`
}
              </div>

              <div className="card-details">

                <h5>{p.name}</h5>

                <p>{p.description}</p>

                <div className="star-rating">

                  {[1,2,3,4,5].map((star)=>(

                    <span
                      key={star}
                      onClick={() =>
                        handleRating(p._id,star)
                      }
                      style={{
                        cursor:"pointer",
                        color:
                          star <=
                          (userRatings[p._id]||0)
                            ? "#ffc107"
                            : "#ddd"
                      }}
                    >
                      ★
                    </span>

                  ))}

                </div>

                <div className="card-footer">

                  <span className="item-price">
                    ₹{p.price}
                  </span>

                  <button
                    className="green-add-btn"
                    onClick={(e)=>
                      triggerFlyAnimation(e,p)
                    }
                  >
                    Add to Cart
                  </button>

                </div>

              </div>

            </div>

          ))

        ) : (

          <h2
            style={{
              color:"white",
              textAlign:"center",
              width:"100%"
            }}
          >
            No Products Available
          </h2>

        )}

      </div>

    </div>

  </div>
);

}

export default ProductList;