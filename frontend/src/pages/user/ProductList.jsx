import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "../user/productlist.css";
import logo from "../../assets/foodie cape logo.png";

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart, cart } = useContext(CartContext);
  const [userRatings, setUserRatings] = useState({});
  const [flyingItem, setFlyingItem] = useState(null);

  const backendURL = "https://foodie-cape.onrender.com";

  // FETCH PRODUCTS (FIXED)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/food`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    fetchProducts();
  }, []);

  const handleRating = (productId, rate) => {
    setUserRatings({ ...userRatings, [productId]: rate });
  };

  // Fly animation
  const triggerFlyAnimation = (e, product) => {
    const btn = e.target.getBoundingClientRect();

    setFlyingItem({
      image:
        product.image && product.image.startsWith("http")
          ? product.image
          : `${backendURL}/uploads/${product.image || "default.jpg"}`,
      top: btn.top,
      left: btn.left
    });

    addToCart(product);

    setTimeout(() => setFlyingItem(null), 900);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-list-page">

      {/* NAVBAR */}
      <nav className="custom-navbar">
        <div className="nav-logo">
          <img src={logo} alt="Foodie Cape" className="brand-logo" />
          <span className="brand-name">Foodie <span>Cape</span></span>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search delicious food..."
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="nav-links">

          <span className="link-item" onClick={() => navigate("/")}>
            Home
          </span>

          <div
            className="profile-nav-item"
            onClick={() => navigate("/profile")}
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <div
              className="user-profile-circle"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#eee"
              }}
            >
              <span style={{ fontSize: "20px" }}>👤</span>
            </div>
          </div>

          <div
            className="cart-icon-wrapper"
            onClick={() => navigate("/cart")}
          >
            <span className="cart-icon">🛒</span>
            <span className="badge">{cart.length}</span>
          </div>

        </div>
      </nav>

      {/* FLY ANIMATION */}
      {flyingItem && (
        <img
          src={flyingItem.image}
          style={{
            position: "fixed",
            zIndex: 1000,
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            pointerEvents: "none",
            top: flyingItem.top,
            left: flyingItem.left
          }}
          alt="flying"
        />
      )}

      {/* CONTENT */}
      <div className="content-container">

        <h2 className="menu-header">𝕆𝕦𝕣 𝔻𝕖𝕝𝕚𝕔𝕚𝕠𝕦𝕤 𝕄𝕖𝕟𝕦</h2>

        <div className="product-grid">
          {filteredProducts.map((p) => (
            <div key={p._id} className="food-card-modern">

              <div className="img-wrapper">
                <img
                  src={
                    p.image && p.image.startsWith("http")
                      ? p.image
                      : `${backendURL}/uploads/${p.image || "default.jpg"}`
                  }
                  alt={p.name}
                />
              </div>

              <div className="card-details">

                <h5 className="item-title">{p.name}</h5>

                {/* STAR RATING */}
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleRating(p._id, star)}
                      style={{
                        cursor: "pointer",
                        color:
                          star <= (userRatings[p._id] || 0)
                            ? "#ffc107"
                            : "#e4e5e9"
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div className="card-footer">
                  <span className="item-price">₹{p.price}</span>

                  <button
                    className="green-add-btn"
                    onClick={(e) => triggerFlyAnimation(e, p)}
                  >
                    Add to Cart
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default ProductList;