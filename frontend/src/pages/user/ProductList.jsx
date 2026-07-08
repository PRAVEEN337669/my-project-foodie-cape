import React, {
  useEffect,
  useState,
  useContext,
  useRef,
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
      const res = await axios.get(`${backendURL}/api/food`);

      console.log("Products API:", res.data);

      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        console.error("Invalid Product Response", res.data);
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

  
const triggerFlyAnimation = (e, product) => {

  if (!cartRef.current) {
    addToCart(product);
    return;
  }

  const startRect = e.currentTarget.getBoundingClientRect();
  const cartRect = cartRef.current.getBoundingClientRect();

  const image =
    product.image?.startsWith("http")
      ? product.image
      : `${backendURL}/uploads/${product.image || "default.jpg"}`;

  setFlyingItem({
    image,
    top: startRect.top,
    left: startRect.left,

    endX: cartRect.left - startRect.left,
    endY: cartRect.top - startRect.top,
  });

  addToCart(product);

  cartRef.current.classList.add("cart-bounce");

  setTimeout(() => {
    cartRef.current?.classList.remove("cart-bounce");
  }, 450);

  setTimeout(() => {
    setFlyingItem(null);
  }, 900);
const filteredProducts = Array.isArray(products)
  ? products.filter((item) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];
};
  return (
    <div className="product-list-page">

      <nav className="custom-navbar">
        <div className="nav-logo">
          <img src={logo} alt="logo" className="brand-logo" />
          <span className="brand-name">
            Foodie <span>Cape</span>
          </span>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search Food..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            style={{ cursor: "pointer" }}
          >
            👤
          </div>

         <div
  ref={cartRef}
  className="cart-icon-wrapper"
  onClick={() => navigate("/cart")}
>
            🛒
            <span className="badge">{cart.length}</span>
          </div>

        </div>
      </nav>
{flyingItem && (
  <img
    src={flyingItem.image}
    alt="Flying Food"
    className="flying-food"
    style={{
      top: flyingItem.top,
      left: flyingItem.left,
      "--end-x": `${flyingItem.endX}px`,
      "--end-y": `${flyingItem.endY}px`,
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
              <div className="food-card-modern" key={p._id}>

                <div className="img-wrapper">
                  <img
                    src={
                      p.image?.startsWith("http")
                        ? p.image
                        : `${backendURL}/uploads/${p.image || "default.jpg"}`
                    }
                    alt={p.name}
                  />
                </div>

                <div className="card-details">

                  <h5>{p.name}</h5>

                  <p>{p.description}</p>

                  <div className="star-rating">
                    {[1,2,3,4,5].map((star)=>(
                      <span
                        key={star}
                        onClick={()=>handleRating(p._id,star)}
                        style={{
                          cursor:"pointer",
                          color:
                            star <= (userRatings[p._id] || 0)
                              ? "#ffc107"
                              : "#ddd",
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
                      onClick={(e)=>triggerFlyAnimation(e,p)}
                    >
                      Add to Cart
                    </button>

                  </div>

                </div>

              </div>
            ))

          ) : (

            <h3
              style={{
                textAlign:"center",
                width:"100%",
                color:"#fff",
              }}
            >
              No Products Available
            </h3>

          )}

        </div>

      </div>

    </div>
  );
}

export default ProductList; 